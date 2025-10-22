import { Router } from "express";
import multer from "multer";
import { storagePut } from "./storage";

const router = Router();

// メモリストレージを使用（ファイルをメモリに一時保存）
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MBまで
  },
  fileFilter: (req, file, cb) => {
    // 画像ファイルのみ許可
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('画像ファイルのみアップロード可能です'));
    }
  }
});

// 単一ファイルアップロード
router.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "ファイルがアップロードされていません" });
    }

    // ファイル名を生成（タイムスタンプ + ランダム文字列 + 元のファイル名）
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const sanitizedOriginalName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `announcements/${timestamp}_${randomStr}_${sanitizedOriginalName}`;

    // ストレージにアップロード
    const result = await storagePut(fileName, req.file.buffer, req.file.mimetype);

    res.json({ 
      success: true,
      url: result.url,
      key: result.key 
    });
  } catch (error) {
    console.error("アップロードエラー:", error);
    res.status(500).json({ 
      error: "アップロードに失敗しました",
      message: error instanceof Error ? error.message : "不明なエラー"
    });
  }
});

// 複数ファイルアップロード
router.post("/api/upload/multiple", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: "ファイルがアップロードされていません" });
    }

    // 各ファイルをアップロード
    const uploadPromises = req.files.map(async (file) => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 9);
      const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
      const fileName = `announcements/${timestamp}_${randomStr}_${sanitizedOriginalName}`;

      const result = await storagePut(fileName, file.buffer, file.mimetype);
      return {
        url: result.url,
        key: result.key,
        originalName: file.originalname
      };
    });

    const results = await Promise.all(uploadPromises);

    res.json({ 
      success: true,
      files: results
    });
  } catch (error) {
    console.error("複数ファイルアップロードエラー:", error);
    res.status(500).json({ 
      error: "アップロードに失敗しました",
      message: error instanceof Error ? error.message : "不明なエラー"
    });
  }
});

export default router;

