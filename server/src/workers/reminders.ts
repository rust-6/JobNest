import { Queue, Worker, Job } from 'bullmq';
import { JobReferral } from '../models/JobReferral';
import { User } from '../models/User';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
};

export const reminderQueue = new Queue('reminders', { connection });

export const reminderWorker = new Worker('reminders', async (job: Job) => {
  if (job.name === 'check-reminders') {
    const today = new Date();
    // Find all referrals with followUpDate <= today and not snoozed
    const pendingReferrals = await JobReferral.find({
      followUpDate: { $lte: today },
      $or: [
        { reminderSnoozedTo: { $exists: false } },
        { reminderSnoozedTo: { $lte: today } }
      ]
    }).populate('userId');

    for (const ref of pendingReferrals) {
      const user = ref.userId as unknown as import('../models/User').IUser;
      
      if (user && user.notifPrefs?.email) {
        // Pseudo logic: send generic reminder email
        console.log(`Sending reminder email to ${user.email} for ${ref.companyName}`);
      }
      
      // Update follow up date to clear it or push it into the future
      // ref.followUpDate = null;
      // await ref.save();
    }
  }
}, { connection });

// Optional: add a repeatable job to run every day at 8 AM
// reminderQueue.add('check-reminders', {}, { repeat: { cron: '0 8 * * *' } });

console.log('BullMQ worker initialized');
