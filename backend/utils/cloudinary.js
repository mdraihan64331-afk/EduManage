import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;

    const extension = file.split(".").pop().toLowerCase();

    const resourceType = ["pdf", "doc", "docx"].includes(extension)
      ? "raw"
      : "auto";

    const result = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
    });

    console.log("Cloudinary URL:", result.secure_url);

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return result.secure_url;
  } catch (error) {
    console.log("Cloudinary upload error:", error);

    if (file && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return null;
  }
};

export default uploadOnCloudinary;
