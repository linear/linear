import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fetch, { Headers } from "node-fetch";
import { LinearClient } from "@linear/sdk";
import { NextFunction } from "express";
import { IncomingMessage, ServerResponse } from "http";

const linearClient = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });
const storage = multer.memoryStorage();
const upload = multer({ storage });
const formHandler = upload.single("file");

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await runMiddleware(req, res, formHandler);
  const multerFile = (req as NextApiRequest & { file: Express.Multer.File }).file;

  try {
    const url = await uploadFileToLinear(multerFile);
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const config = {
  api: {
    // Disable Next.js default body parsing, let multer parse the form data
    bodyParser: false,
  },
};

/** Uploads a file to Linear, returning the uploaded URL. */
async function uploadFileToLinear(file: Express.Multer.File): Promise<string> {
  const uploadPayload = await linearClient.fileUpload(file.mimetype, file.originalname, file.size);

  if (!uploadPayload.success || !uploadPayload.uploadFile) {
    throw new Error("Failed to request upload URL");
  }

  const uploadUrl = uploadPayload.uploadFile.uploadUrl;
  const assetUrl = uploadPayload.uploadFile.assetUrl;

  // Make sure to copy the response headers for the PUT request
  const headers = new Headers();

  // It is important that the content-type of the request matches the value passed as the first argument to `fileUpload`.
  headers.set("Content-Type", file.mimetype);
  headers.set("Cache-Control", "public, max-age=31536000");
  uploadPayload.uploadFile.headers.forEach(({ key, value }) => headers.set(key, value));

  try {
    await fetch(uploadUrl, {
      // Note PUT is important here, other verbs will not work.
      method: "PUT",
      body: file.buffer,
      headers,
    });

    return assetUrl;
  } catch (e) {
    throw new Error("Failed to upload file to Linear", { cause: e });
  }
}

/** Wrapper for Express.js style middleware in a serverless function */
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void | Promise<void>
) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
