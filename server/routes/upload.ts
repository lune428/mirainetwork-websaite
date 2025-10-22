import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `announcement-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("画像ファイルのみアップロード可能です（JPEG, PNG, GIF, WebP）"));
    }
  },
});

// Upload single image
router.post("/image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "画像ファイルが選択されていません" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: imageUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ error: "画像のアップロードに失敗しました" });
  }
});

// Upload multiple images
router.post("/images", upload.array("images", 5), (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: "画像ファイルが選択されていません" });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({
      success: true,
      urls: imageUrls,
      filenames: req.files.map((f) => f.filename),
    });
  } catch (error) {
    console.error("Images upload error:", error);
    res.status(500).json({ error: "画像のアップロードに失敗しました" });
  }
});

// Delete image
router.delete("/image/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: "画像を削除しました" });
    } else {
      res.status(404).json({ error: "画像が見つかりません" });
    }
  } catch (error) {
    console.error("Image delete error:", error);
    res.status(500).json({ error: "画像の削除に失敗しました" });
  }
});

export default router;

