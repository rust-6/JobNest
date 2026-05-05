import mongoose, { Document, Schema } from 'mongoose';

export interface IStatusHistory {
  status: string;
  changedAt: Date;
  note?: string;
}

export interface IJobReferral extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  role: string;
  jobUrl?: string;
  referralPerson?: string;
  dateApplied: Date;
  status: 'Applied' | 'Referred' | 'Screening' | 'Interview' | 'Offer' | 'Selected' | 'Rejected' | 'Ghosted';
  priority?: 'Low' | 'Medium' | 'High';
  notes?: string;
  resumeLink?: string;
  followUpDate?: Date;
  reminderSnoozedTo?: Date;
  statusHistory: IStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const jobReferralSchema = new Schema<IJobReferral>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    companyName: { type: String, required: true, index: true },
    role: { type: String, required: true },
    jobUrl: { type: String },
    referralPerson: { type: String },
    dateApplied: { type: Date, required: true, default: Date.now, index: true },
    status: {
      type: String,
      required: true,
      enum: ['Applied', 'Referred', 'Screening', 'Interview', 'Offer', 'Selected', 'Rejected', 'Ghosted'],
      default: 'Applied'
    },
    priority: { type: String, enum: ['Low', 'Medium', 'High'] },
    notes: { type: String },
    resumeLink: { type: String },
    followUpDate: { type: Date },
    reminderSnoozedTo: { type: Date },
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        note: { type: String }
      }
    ]
  },
  { timestamps: true }
);

// Optional: Compound index for typical queries
jobReferralSchema.index({ userId: 1, status: 1, dateApplied: -1 });

export const JobReferral = mongoose.model<IJobReferral>('JobReferral', jobReferralSchema);
