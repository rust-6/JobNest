import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();

const generateAccess = (id: string) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
const generateRefresh = (id: string) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'r_secret', { expiresIn: '7d' });

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, username, password } = req.body;
    
    // minimal validation for MVP layout
    if (!name || !email || !username || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = new User({
      name, email, username, passwordHash
    });
    
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, password } = req.body;
    
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const accessToken = generateAccess(user.id);
    const refreshToken = generateRefresh(user.id);
    
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenHash = hashedRefresh;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      }
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  // In a real implementation we would require auth and clear the DB token here.
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
});

export default router;
