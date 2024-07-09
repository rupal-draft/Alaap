import "dotenv/config";
import cloudinary from "cloudinary";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import { readFileSync } from "fs";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

export const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};
export const videoUpload = async (req, res) => {
  try {
    const { video } = req.files;
    if (!video) return res.status(404).send("No Video found!");

    const params = {
      Bucket: "sociofy-bucket",
      Key: `${nanoid()}.${video.type.split("/")[1]}`,
      Body: readFileSync(video.path),
      ACL: "public-read",
      ContentType: video.type,
    };
    S3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (err) {
    console.error(err);
  }
};
export const removeImage = async (req, res) => {
  const { image } = req.body;
  const deletePhoto = (publicId) => {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(publicId, (result) => {
        resolve(result);
      });
    });
  };
  const photoPublicId = image.public_id;
  try {
    await deletePhoto(photoPublicId);
    res.status(200).json({ status: true });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ error: "Error deleting photo" });
  }
};

export const removeVideo = async (req, res) => {
  try {
    if (req.userId != req.params.id) {
      return res.status(400).send("Unauthorized");
    }
    const { Bucket, Key } = req.body;

    const params = {
      Bucket,
      Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      console.log(data);
      res.send({ ok: true });
    });
  } catch (err) {
    console.log(err);
  }
};
