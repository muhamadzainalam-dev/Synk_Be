import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "REMOVED",
    secretAccessKey: "REMOVED",
  },
});

const GetReadingUrl = async (req, res) => {
  const { filename } = req.body;

  const command = new GetObjectCommand({
    Bucket: "synk-app-media-bucket",
    Key: `images/${filename}`,
  });

  const URL = await getSignedUrl(s3Client, command);

  res.json(URL);
};

const GetUploadingUrl = async (req, res) => {
  const { filename, contentType } = req.body;

  console.log(filename, contentType);

  const command = new PutObjectCommand({
    Bucket: "synk-app-media-bucket",
    Key: `images/${filename}`,
    ContentType: contentType,
  });

  const URL = await getSignedUrl(s3Client, command);

  res.json(URL);
};

export { GetReadingUrl, GetUploadingUrl };
