import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const GetReadingUrl = async (req, res) => {
  const { filename } = req.body;

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `images/${filename}`,
  });

  const URL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  res.json(URL);
};

const GetUploadingUrl = async (req, res) => {
  const { filename, contentType } = req.body;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `images/${filename}`,
    ContentType: contentType,
  });

  const URL = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  res.json(URL);
};

export { GetReadingUrl, GetUploadingUrl };
