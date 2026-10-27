import { Notice } from "../models/notice.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addNotice = async (req, res) => {
  try {
    const {
      noticeTitle,
      category,
      priority,
      status,
      description,
      publishDate,
      expiryDate,
    } = req.body;

    if (!noticeTitle) {
      return res.status(400).json({ message: "Notice title is required!" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required!" });
    }

    const files = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileUrl = await uploadOnCloudinary(file.path);

        if (!fileUrl) {
          return res.status(500).json({ message: "Attachment upload failed" });
        }

        files.push(fileUrl);
      }
    }

    const notice = await Notice.create({
      noticeTitle,
      category,
      priority,
      status,
      description,
      files,
      publishDate,
      expiryDate: expiryDate || undefined,
    });

    return res
      .status(201)
      .json({ notice, message: "Notice created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Failed to create notice", error: error.message });
  }
};
