// pages/api/uploadcsv.js
import multer from 'multer';
import csv from 'csv-parse';
import mongoose from 'mongoose';
import { Readable } from 'stream';
import nextConnect from 'next-connect';

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage()
});

// Connect to MongoDB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema and model for the data
const DataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const DataModel = mongoose.model('Datass', DataSchema);

const uploadMiddleware = upload.single('file');

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = [];

    const stream = Readable.from(file.buffer.toString());

    stream
      .pipe(csv({ columns: true }))
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        try {
          await DataModel.insertMany(data);
          res.status(200).json({ message: 'Data uploaded successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Error inserting data into MongoDB' });
        }
      })
      .on('error', (error) => {
        res.status(500).json({ error: 'Error parsing CSV file' });
      });
  });
};

export default handler;
