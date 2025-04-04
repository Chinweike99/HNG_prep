import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      // Ensure file exists and is not an array (if multiple files are allowed)
      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      // Ensure the file is of type 'formidable.File'
      if (!file || !(file instanceof formidable.File)) {
        return res.status(400).json({ error: 'No valid file uploaded' });
      }

      const fileName = path.basename(file.filepath);
      const fileUrl = `/uploads/${fileName}`;

      res.status(200).json({
        success: 1,
        file: {
          url: fileUrl,
        },
      });
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
