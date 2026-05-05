import { Router, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { Request } from 'express';

// Extend AuthRequest to include multer file
type AuthUploadRequest = AuthRequest & { file?: Express.Multer.File };

const router = Router();
router.use(authMiddleware);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  }
});

router.post('/resume', upload.single('resume'), async (req: AuthUploadRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const cldRes = await cloudinary.uploader.upload(dataURI, {
      folder: `jobnest/users/${req.user._id}/resumes`,
      resource_type: 'raw'
    });

    res.json({ url: cldRes.secure_url });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
