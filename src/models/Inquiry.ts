import { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projectType: { type: String },
  budget: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['UNREAD', 'READ', 'ARCHIVED'], default: 'UNREAD' },
}, {
  timestamps: true,
});

const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);
export default Inquiry;