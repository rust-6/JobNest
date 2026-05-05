import { Router, Response } from 'express';
import { AuthRequest, authMiddleware } from '../middleware/auth';
import { JobReferral } from '../models/JobReferral';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const filters: any = { userId: req.user._id };
    
    // Quick filtering
    if (req.query.status) filters.status = req.query.status;
    if (req.query.company) filters.companyName = { $regex: req.query.company, $options: 'i' };
    
    const referrals = await JobReferral.find(filters).sort({ dateApplied: -1 });
    res.json(referrals);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const jobData = { ...req.body, userId: req.user._id };
    
    // Setup initial status history
    jobData.statusHistory = [{
      status: jobData.status || 'Applied',
      note: 'Initial entry'
    }];
    
    const newReferral = new JobReferral(jobData);
    await newReferral.save();
    
    res.status(201).json(newReferral);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referral = await JobReferral.findOne({ _id: req.params.id, userId: req.user._id });
    if (!referral) {
      res.status(404).json({ message: 'Referral not found' });
      return;
    }
    res.json(referral);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referral = await JobReferral.findOne({ _id: req.params.id, userId: req.user._id });
    if (!referral) {
      res.status(404).json({ message: 'Referral not found' });
      return;
    }

    const updates = req.body;
    let statusChanged = false;

    // Check if status changed to append to history
    if (updates.status && updates.status !== referral.status) {
      statusChanged = true;
    }

    Object.assign(referral, updates);
    
    if (statusChanged) {
      referral.statusHistory.push({
        status: updates.status,
        note: updates.statusNote || 'Status updated via PATCH',
        changedAt: new Date()
      });
    }

    await referral.save();
    res.json(referral);

  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const referral = await JobReferral.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!referral) {
      res.status(404).json({ message: 'Referral not found' });
      return;
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
