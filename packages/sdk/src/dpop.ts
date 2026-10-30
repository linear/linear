/**
 * Asymmetric JWS algorithms usable for DPoP proofs
 */
export type DPoPAlgorithm =
  "ES256" | "ES384" | "ES512" | "PS256" | "PS384" | "PS512" | "RS256" | "RS384" | "RS512" | "EdDSA";

/**
 * Signs DPoP proofs (RFC 9449) with a key held anywhere: in memory, WebCrypto, a remote KMS or an HSM
 */
export interface DPoPSigner {
  /** The JWS algorithm the key signs with */
  alg: DPoPAlgorithm;
  /** The public key, embedded in every proof. Must not contain private key members */
  publicJwk: JsonWebKey;
  /**
   * Sign the JWS signing input (`base64url(header).base64url(payload)`)
   *
   * Must return a JWS-encoded signature. For ECDSA this is the raw `r || s` concatenation,
   * not the DER encoding most KMS providers return: see `derToJoseSignature`.
   */
  sign(signingInput: Uint8Array<ArrayBuffer>): Promise<Uint8Array>;
}

/**
 * The request a DPoP proof is bound to
 */
export interface DPoPProofClaims {
  /** HTTP method of the request */
  htm: string;
  /** HTTP URL of the request. Query and fragment are dropped */
  htu: string;
  /** Access token sent with the request, bound through the `ath` claim. Omit for token endpoint requests */
  accessToken?: string;
  /** Latest nonce provided by the server through the `DPoP-Nonce` header */
  nonce?: string;
}

const textEncoder = new TextEncoder();

function base64UrlEncode(input: Uint8Array | string): string {
  const bytes = typeof input === "string" ? textEncoder.encode(input) : input;
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Keep only the public members of a JWK, dropping private parts and WebCrypto metadata such as `key_ops` and `ext`
 */
function toPublicJwk({ kty, crv, x, y, n, e }: JsonWebKey): JsonWebKey {
  return Object.fromEntries(Object.entries({ kty, crv, x, y, n, e }).filter(([, value]) => value !== undefined));
}

/**
 * Create a signed DPoP proof JWT for a single request
 *
 * The LinearClient creates these automatically when configured with a `dpop` signer.
 * Use this directly to create proofs for OAuth token endpoint requests.
 *
 * @param signer the signer holding the DPoP key
 * @param claims the request to bind the proof to
 * @returns the proof to send in the `DPoP` header
 */
export async function createDPoPProof(
  signer: DPoPSigner,
  { htm, htu, accessToken, nonce }: DPoPProofClaims
): Promise<string> {
  const { origin, pathname } = new URL(htu);

  const header = { typ: "dpop+jwt", alg: signer.alg, jwk: toPublicJwk(signer.publicJwk) };
  const payload = {
    jti: crypto.randomUUID(),
    htm,
    htu: `${origin}${pathname}`,
    iat: Math.floor(Date.now() / 1000),
    ...(accessToken
      ? { ath: base64UrlEncode(new Uint8Array(await crypto.subtle.digest("SHA-256", textEncoder.encode(accessToken)))) }
      : {}),
    ...(nonce ? { nonce } : {}),
  };

  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signature = await signer.sign(textEncoder.encode(signingInput));

  return `${signingInput}.${base64UrlEncode(signature)}`;
}

/**
 * Resolve the JWS algorithm and WebCrypto sign parameters for a key
 */
function getWebCryptoSignParams(key: CryptoKey): {
  alg: DPoPAlgorithm;
  params: AlgorithmIdentifier | EcdsaParams | RsaPssParams;
} {
  const { name } = key.algorithm;

  if (name === "ECDSA") {
    const { namedCurve } = key.algorithm as EcKeyAlgorithm;
    const curves: Record<string, [DPoPAlgorithm, string]> = {
      "P-256": ["ES256", "SHA-256"],
      "P-384": ["ES384", "SHA-384"],
      "P-521": ["ES512", "SHA-512"],
    };
    const curve = curves[namedCurve];
    if (curve) {
      return { alg: curve[0], params: { name, hash: curve[1] } };
    }
  }

  if (name === "RSA-PSS" || name === "RSASSA-PKCS1-v1_5") {
    const hash = (key.algorithm as RsaHashedKeyAlgorithm).hash.name;
    const bits = { "SHA-256": 256, "SHA-384": 384, "SHA-512": 512 }[hash];
    if (bits) {
      return name === "RSA-PSS"
        ? { alg: `PS${bits}` as DPoPAlgorithm, params: { name, saltLength: bits / 8 } }
        : { alg: `RS${bits}` as DPoPAlgorithm, params: { name } };
    }
  }

  if (name === "Ed25519") {
    return { alg: "EdDSA", params: { name } };
  }

  throw new Error(`Unsupported DPoP key algorithm: ${name}`);
}

/**
 * Create a DPoP signer from a WebCrypto key pair. The private key may be non-extractable
 *
 * @param keyPair the key pair to sign proofs with
 * @returns a signer for the LinearClient `dpop` option
 */
export async function dpopSignerFromCryptoKeyPair({ privateKey, publicKey }: CryptoKeyPair): Promise<DPoPSigner> {
  const { alg, params } = getWebCryptoSignParams(privateKey);
  const publicJwk = toPublicJwk(await crypto.subtle.exportKey("jwk", publicKey));

  return {
    alg,
    publicJwk,
    sign: async signingInput => new Uint8Array(await crypto.subtle.sign(params, privateKey, signingInput)),
  };
}

/**
 * Convert a DER-encoded ECDSA signature, as returned by most KMS providers, into the JWS `r || s` encoding
 *
 * @param der the DER-encoded ECDSA signature
 * @param alg the ECDSA algorithm the signature was created with
 * @returns the JWS-encoded signature
 */
export function derToJoseSignature(der: Uint8Array, alg: "ES256" | "ES384" | "ES512"): Uint8Array {
  const size = { ES256: 32, ES384: 48, ES512: 66 }[alg];
  let offset = 0;

  function readLength(): number {
    const first = der[offset++];
    if (first < 0x80) {
      return first;
    }
    let length = 0;
    for (let i = 0; i < (first & 0x7f); i++) {
      length = (length << 8) | der[offset++];
    }
    return length;
  }

  function readInteger(): Uint8Array {
    if (der[offset++] !== 0x02) {
      throw new Error("Invalid DER signature: expected an INTEGER");
    }
    const length = readLength();
    let value = der.subarray(offset, offset + length);
    offset += length;

    /** Strip the sign padding and left-pad to the fixed component size */
    while (value.length > size && value[0] === 0) {
      value = value.subarray(1);
    }
    if (value.length > size) {
      throw new Error(`Invalid DER signature: component too long for ${alg}`);
    }
    const padded = new Uint8Array(size);
    padded.set(value, size - value.length);
    return padded;
  }

  if (der[offset++] !== 0x30) {
    throw new Error("Invalid DER signature: expected a SEQUENCE");
  }
  readLength();

  const signature = new Uint8Array(size * 2);
  signature.set(readInteger(), 0);
  signature.set(readInteger(), size);
  return signature;
}

/**
 * Whether a `WWW-Authenticate` header asks the client to retry with a server-provided DPoP nonce
 */
function requiresDPoPNonce(wwwAuthenticate: string | null): boolean {
  return (
    !!wwwAuthenticate && /(^|[\s,])DPoP\s/i.test(wwwAuthenticate) && /error="use_dpop_nonce"/.test(wwwAuthenticate)
  );
}

/**
 * Create a fetch function that sends a DPoP-bound access token with a fresh proof on every request
 *
 * Tracks the server-provided nonce and retries once when the server rejects a proof for a missing or stale nonce.
 *
 * @param signer the signer holding the DPoP key
 * @param accessToken the DPoP-bound access token
 */
export function createDPoPFetch(
  signer: DPoPSigner,
  accessToken: string
): (url: string, init: RequestInit) => Promise<Response> {
  let nonce: string | undefined;

  async function send(url: string, init: RequestInit): Promise<{ response: Response; nonceUsed?: string }> {
    const nonceUsed = nonce;
    const headers = new Headers(init.headers);
    headers.set("Authorization", `DPoP ${accessToken}`);
    headers.set(
      "DPoP",
      await createDPoPProof(signer, { htm: init.method ?? "GET", htu: url, accessToken, nonce: nonceUsed })
    );

    const response = await globalThis.fetch(url, { ...init, headers });
    nonce = response.headers.get("DPoP-Nonce") ?? nonce;

    return { response, nonceUsed };
  }

  return async (url, init) => {
    const { response, nonceUsed } = await send(url, init);

    if (response.status === 401 && nonce !== nonceUsed && requiresDPoPNonce(response.headers.get("WWW-Authenticate"))) {
      return (await send(url, init)).response;
    }

    return response;
  };
}
