import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly resolve root .env.local path
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
// Fallback check for standard .env if .env.local wasn't found
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const USERNAME = 'faysalwani9086@gmail.com';              // Set your admin username
const PLAIN_PASSWORD = '*6005537335Fl*#'; // Set your admin password

if (!MONGODB_URI) {
  console.error('\nError: MONGODB_URI was not detected in .env.local or .env');
  console.log('Ensure .env.local exists in your root project directory.\n');
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function run() {
  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash(PLAIN_PASSWORD, 10);
  
  await Admin.findOneAndUpdate(
    { username: USERNAME },
    { username: USERNAME, password: hashedPassword },
    { upsert: true, returnDocument: 'after' }
  );

  console.log(`\n✓ Admin user "${USERNAME}" successfully created/updated in MongoDB.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Database Operation Failed:', err);
  process.exit(1);
});