import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { JobReferral } from '../models/JobReferral';

const router = Router();
router.use(authMiddleware);

router.get('/summary', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;

    const total = await JobReferral.countDocuments({ userId });
    const pending = await JobReferral.countDocuments({ userId, status: { $in: ['Applied', 'Referred', 'Screening'] } });
    const interviewed = await JobReferral.countDocuments({ userId, status: 'Interview' });
    const offers = await JobReferral.countDocuments({ userId, status: { $in: ['Offer', 'Selected'] } });
    const rejected = await JobReferral.countDocuments({ userId, status: 'Rejected' });

    res.json({ total, pending, interviewed, offers, rejected });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/funnel', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;

    // Aggregation for the conversion funnel charts
    const pipeline = [
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ];

    const distribution = await JobReferral.aggregate(pipeline);

    // Map distribution into a structured funnel format
    const funnelMap: Record<string, number> = {};
    distribution.forEach((item) => {
      funnelMap[item._id] = item.count;
    });

    const funnelData = [
      { name: 'Applied', value: (funnelMap['Applied'] || 0) + (funnelMap['Referred'] || 0) },
      { name: 'Interview', value: funnelMap['Interview'] || 0 },
      { name: 'Offer', value: funnelMap['Offer'] || 0 },
      { name: 'Selected', value: funnelMap['Selected'] || 0 }
    ];

    res.json(funnelData);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
