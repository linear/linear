import { createHash, generateKeyPairSync, sign } from "crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LinearClient } from "../index.js";
import { createDPoPProof, createWebCryptoDPoPSigner, DPoPSigner } from "../oauth/index.js";
import { LinearErrorType } from "../types.js";

const API_URL = "https://api.example.com/graphql";
const ACCESS_TOKEN = "dpop-access-token";

/** An ES256 signer holding its key outside the SDK, like a KMS-backed signer would */
function createSigner(): DPoPSigner {
  const { privateKey, publicKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });

  return {
    alg: "ES256",
    publicJwk: publicKey.export({ format: "jwk" }),
    sign: async signingInput => sign("sha256", signingInput, { key: privateKey, dsaEncoding: "ieee-p1363" }),
  };
}

function decodeSegment(segment: string): Record<string, unknown> {
  return JSON.parse(Buffer.from(segment, "base64url").toString());
}

/** Decode a proof and check its signature against the embedded public key */
async function decodeProof(proof: string) {
  const [header, payload, signature] = proof.split(".");
  const decodedHeader = decodeSegment(header);
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    decodedHeader.jwk as JsonWebKey,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["verify"]
  );
  const valid = await crypto.subtle.verify(
    { name: "ECDSA", hash: "SHA-256" },
    publicKey,
    Buffer.from(signature, "base64url"),
    new TextEncoder().encode(`${header}.${payload}`)
  );

  return { header: decodedHeader, payload: decodeSegment(payload), valid };
}

describe("createDPoPProof", () => {
  it("creates a signed proof bound to the request and access token", async () => {
    const signer = createSigner();
    const proof = await createDPoPProof(signer, {
      htm: "POST",
      htu: `${API_URL}?query=1#fragment`,
      accessToken: ACCESS_TOKEN,
      nonce: "server-nonce",
    });
    const { header, payload, valid } = await decodeProof(proof);

    expect(valid).toBe(true);
    expect(header).toEqual({
      typ: "dpop+jwt",
      alg: "ES256",
      jwk: { kty: "EC", crv: "P-256", x: expect.any(String), y: expect.any(String) },
    });
    expect(payload).toEqual({
      jti: expect.any(String),
      htm: "POST",
      htu: API_URL,
      iat: expect.any(Number),
      ath: createHash("sha256").update(ACCESS_TOKEN).digest("base64url"),
      nonce: "server-nonce",
    });
  });

  it.each([
    ["post", "POST"],
    ["Get", "GET"],
    ["patch", "patch"],
  ])("normalizes method %s to %s like fetch does", async (htm, expected) => {
    const proof = await createDPoPProof(createSigner(), { htm, htu: API_URL });
    const { payload } = await decodeProof(proof);

    expect(payload.htm).toEqual(expected);
  });

  it("only embeds the public members of the signer's key", async () => {
    const { privateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
    const signer: DPoPSigner = {
      alg: "ES256",
      publicJwk: { ...privateKey.export({ format: "jwk" }), key_ops: ["sign"], ext: true },
      sign: async signingInput => sign("sha256", signingInput, { key: privateKey, dsaEncoding: "ieee-p1363" }),
    };
    const { header, valid } = await decodeProof(await createDPoPProof(signer, { htm: "POST", htu: API_URL }));

    expect(valid).toBe(true);
    expect(header.jwk).toEqual({ kty: "EC", crv: "P-256", x: expect.any(String), y: expect.any(String) });
  });

  it("omits ath and nonce when not provided", async () => {
    const proof = await createDPoPProof(createSigner(), {
      htm: "POST",
      htu: "https://api.example.com/oauth/token",
    });
    const { payload } = await decodeProof(proof);

    expect(payload).not.toHaveProperty("ath");
    expect(payload).not.toHaveProperty("nonce");
  });

  it("uses a unique jti for every proof", async () => {
    const signer = createSigner();
    const proofs = await Promise.all([1, 2].map(() => createDPoPProof(signer, { htm: "POST", htu: API_URL })));
    const [first, second] = await Promise.all(proofs.map(decodeProof));

    expect(first.payload.jti).not.toEqual(second.payload.jti);
  });
});

const RSA_PARAMS = { modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) };

describe("createWebCryptoDPoPSigner", () => {
  it("signs proofs with a non-extractable key", async () => {
    const keyPair = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, false, ["sign", "verify"]);
    const signer = await createWebCryptoDPoPSigner(keyPair);
    const { header, valid } = await decodeProof(await createDPoPProof(signer, { htm: "POST", htu: API_URL }));

    expect(valid).toBe(true);
    expect(header).toEqual(expect.objectContaining({ alg: "ES256" }));
    expect(header.jwk).toEqual({ kty: "EC", crv: "P-256", x: expect.any(String), y: expect.any(String) });
  });

  it("creates RS256 signers from RSASSA-PKCS1-v1_5 SHA-256 keys", async () => {
    const keyPair = await crypto.subtle.generateKey(
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256", ...RSA_PARAMS },
      false,
      ["sign", "verify"]
    );
    const signer = await createWebCryptoDPoPSigner(keyPair);

    expect(signer.alg).toEqual("RS256");
    expect(signer.publicJwk).toEqual({ kty: "RSA", n: expect.any(String), e: "AQAB" });
  });

  it.each([
    ["ECDSA P-384", { name: "ECDSA", namedCurve: "P-384" }],
    ["RSASSA-PKCS1-v1_5 SHA-512", { name: "RSASSA-PKCS1-v1_5", hash: "SHA-512", ...RSA_PARAMS }],
    ["RSA-PSS", { name: "RSA-PSS", hash: "SHA-256", ...RSA_PARAMS }],
    ["Ed25519", { name: "Ed25519" }],
  ] as const)("rejects %s keys", async (_, params) => {
    const keyPair = (await crypto.subtle.generateKey(params, false, ["sign", "verify"])) as CryptoKeyPair;

    await expect(createWebCryptoDPoPSigner(keyPair)).rejects.toThrow("Unsupported DPoP key");
  });
});

describe("LinearClient with dpop", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubFetch(...responses: Response[]) {
    const fetch = vi.fn<(url: string, init: RequestInit) => Promise<Response>>();
    responses.forEach(response => fetch.mockResolvedValueOnce(response));
    vi.stubGlobal("fetch", fetch);
    return fetch;
  }

  function viewerResponse(headers?: Record<string, string>) {
    return Response.json({ data: { viewer: { id: "viewerId" } } }, { headers });
  }

  function useNonceResponse(nonce: string) {
    return new Response(null, {
      status: 401,
      headers: { "DPoP-Nonce": nonce, "WWW-Authenticate": 'DPoP error="use_dpop_nonce"' },
    });
  }

  async function proofNonce(init: RequestInit) {
    const { payload } = await decodeProof(new Headers(init.headers).get("DPoP") ?? "");
    return payload.nonce;
  }

  it("sends the access token with a DPoP proof", async () => {
    const fetch = stubFetch(viewerResponse());
    const client = new LinearClient({ accessToken: ACCESS_TOKEN, dpop: createSigner(), apiUrl: API_URL });

    expect(await client.viewer).toEqual(expect.objectContaining({ id: "viewerId" }));
    expect(client.options).not.toHaveProperty("fetch");

    const [url, init] = fetch.mock.calls[0];
    const headers = new Headers(init.headers);
    const { payload, valid } = await decodeProof(headers.get("DPoP") ?? "");

    expect(url).toEqual(API_URL);
    expect(headers.get("Authorization")).toEqual(`DPoP ${ACCESS_TOKEN}`);
    expect(valid).toBe(true);
    expect(payload).toEqual(expect.objectContaining({ htm: "POST", htu: API_URL }));
  });

  it("does not let configured headers override DPoP authorization", async () => {
    const fetch = stubFetch(viewerResponse());
    const client = new LinearClient({
      accessToken: ACCESS_TOKEN,
      dpop: createSigner(),
      apiUrl: API_URL,
      headers: { authorization: "Bearer other" },
    });
    await client.viewer;

    expect(new Headers(fetch.mock.calls[0][1].headers).get("Authorization")).toEqual(`DPoP ${ACCESS_TOKEN}`);
  });

  it("retries once with the server nonce and reuses it for later requests", async () => {
    const fetch = stubFetch(
      useNonceResponse("nonce-1"),
      viewerResponse(),
      viewerResponse({ "DPoP-Nonce": "nonce-2" }),
      viewerResponse()
    );
    const client = new LinearClient({ accessToken: ACCESS_TOKEN, dpop: createSigner(), apiUrl: API_URL });

    await client.viewer;
    await client.viewer;
    await client.viewer;

    const nonces = await Promise.all(fetch.mock.calls.map(([, init]) => proofNonce(init)));
    expect(nonces).toEqual([undefined, "nonce-1", "nonce-1", "nonce-2"]);
  });

  it("gives up after one nonce retry", async () => {
    const fetch = stubFetch(useNonceResponse("nonce-1"), useNonceResponse("nonce-1"));
    const client = new LinearClient({ accessToken: ACCESS_TOKEN, dpop: createSigner(), apiUrl: API_URL });

    await expect(client.viewer).rejects.toEqual(expect.objectContaining({ type: LinearErrorType.AuthenticationError }));
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it.each([
    [{ apiKey: "api-key" }, "requires an OAuth accessToken"],
    [{ accessToken: ACCESS_TOKEN, apiKey: "api-key" }, "requires an OAuth accessToken"],
    [{ accessToken: `Bearer ${ACCESS_TOKEN}` }, "without a Bearer prefix"],
  ])("rejects invalid credentials %o", async (credentials, message) => {
    const dpop = createSigner();

    expect(() => new LinearClient({ ...credentials, dpop })).toThrow(message);
  });
});
