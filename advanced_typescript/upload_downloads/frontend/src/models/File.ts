import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  filename: string;
  originalName: string;
  size: number;
  createdAt: Date;
  content: string; // Storing CSV content as string for simplicity
}

const FileSchema: Schema = new Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

export default mongoose.models.File || mongoose.model<IFile>('File', FileSchema);