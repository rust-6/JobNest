import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  refreshTokenHash?: string;
  notifPrefs: {
    email: boolean;
    inApp: boolean;
    digestFreq: 'daily' | 'weekly';
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    passwordHash: { type: String, required: true },
    refreshTokenHash: { type: String },
    notifPrefs: {
      email: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
      digestFreq: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
