import { config } from "dotenv";

config({
  path: "../*.env",
});
import { v2 as cloudinary } from "cloudinary";
import error from "./Error.js";

cloudinary.config({
  cloud_name: "ddz3nwfab",
  api_key: "964481165133155",
  api_secret: "ZmqAXdzbeHvaU5hT5S2y0eN5Opg",
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
