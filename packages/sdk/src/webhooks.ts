import crypto from "crypto";

export const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";

/**
 * Provides helper functions to work with Linear webhooks
 */
export class LinearWebhooks {
  public constructor(private secret: string) {}

  /**
   * Verify the webhook signature
   * @param rawBody The webhook request raw body.
   * @param signature The signature to verify.
   * @param timestamp The `webhookTimestamp` field from the request parsed body.
   */
  public verify(rawBody: Buffer, signature: string, timestamp: number): boolean {
    const verificationBuffer = Buffer.from(crypto.createHmac("sha256", this.secret).update(rawBody).digest("hex"));
    const signatureBuffer = Buffer.from(signature);

    if (verificationBuffer.length !== signatureBuffer.length) {
      throw new Error("Invalid webhook signature");
    }

    if (!crypto.timingSafeEqual(verificationBuffer, signatureBuffer)) {
      throw new Error("Invalid webhook signature");
    }

    const timeDiff = Math.abs(new Date().getTime() - timestamp);
    // Throw error if more than one minute delta between provided ts and current time
    if (timeDiff > 1000 * 60) {
      throw new Error("Invalid webhook timestamp");
    }

    return true;
  }
}
