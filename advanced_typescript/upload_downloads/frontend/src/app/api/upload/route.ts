import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'csv-parse/sync';
import dbConnect from '../../lib/db';
import File from '../../../models/File';

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const content = buffer.toString('utf-8');

    parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    const newFile = new File({
      filename: file.name,
      originalName: file.name,
      size: file.size,
      content: content,
    });

    await newFile.save();

    return NextResponse.json({
      message: 'File uploaded successfully',
      id: newFile._id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    );
  }
}