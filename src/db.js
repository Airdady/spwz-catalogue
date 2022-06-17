import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const database = mongoose
  .connect(process.env.DATABASE_URL, options)
  .then(() => console.log('Connected to database.'))
  .catch((err) => console.error('Error connecting to database:', err.message));

export default database;
