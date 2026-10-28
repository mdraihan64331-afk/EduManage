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

    if (!noticeTitle?.trim()) {
      return res.status(400).json({
        message: "Notice title is required!",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Description is required!",
      });
    }

    const files = [];

    if (req.files?.length > 0) {
      for (const file of req.files) {
        const uploadedFile = await uploadOnCloudinary(file.path);

        if (!uploadedFile) {
          return res.status(500).json({
            message: "Attachment upload failed",
          });
        }

        files.push({
          url: uploadedFile.url,
          size: uploadedFile.size,
          name: file.originalname,
        });
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

    return res.status(201).json({
      notice,
      message: "Notice created successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Failed to create notice",
      error: error.message,
    });
  }
};

export const getAllNotice = async (req, res) => {
  try {
    const notice = await Notice.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(notice);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch notices",
    });
  }
};
