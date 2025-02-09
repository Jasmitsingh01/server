import { config } from "dotenv";

config({
  path: "../*.env",
});
import { v2 as cloudinary } from "cloudinary";
import error from "./Error.js";

cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

async function UploadImageOnline(file_Path) {
  try {
    const upload = await cloudinary.uploader.upload(file_Path, {
      public_id: "event_management",
    });
    if (!upload) {
      throw new error("file is not Uploaded Online", 500);
    }
    console.log(upload.secure_url);
    return upload.url;
  } catch (error) {
    console.error(error);
  }
}

export default UploadImageOnline;
