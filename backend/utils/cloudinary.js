// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// export const uploadOnCloudinary = async (file) => {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   try {
//     const result = await cloudinary.uploader.upload(file);
//     console.log(result);
//     fs.unlinkSync(file);
//     return result.secure_url;
//   } catch (error) {
//     console.log("upload error", error);
//     if (fs.existsSync(file)) {
//       fs.unlinkSync(file);
//     }
//     return null;
//   }
// };

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

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
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
