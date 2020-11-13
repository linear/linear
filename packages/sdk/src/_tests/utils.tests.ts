import { serializeUserAgent } from "../utils";

describe("serializeUserAgent", () => {
  it("handles empty", async () => {
    const result = serializeUserAgent({});
    expect(result).toBe("");
  });

  it("handles one property", async () => {
    const result = serializeUserAgent({ "@linear/sdk": "0.1.2" });
    expect(result).toBe("@linear/sdk@0.1.2");
  });

  it("handles multiple properties", async () => {
    const result = serializeUserAgent({
      "@linear/sdk": "0.1.2",
      "@linear/dfl": "1.2.3",
    });
    expect(result).toBe("@linear/sdk@0.1.2 @linear/dfl@1.2.3");
  });

  it("handles uri encoding of value", async () => {
    const result = serializeUserAgent({
      "test/@1];a": '@/22]";qwed',
    });
    expect(result).toBe("test/@1];a@%40%2F22%5D%22%3Bqwed");
  });
});
