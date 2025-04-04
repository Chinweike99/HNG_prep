import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import File from '../../../../models/File';
// import dbConnect from '@/lib/db';
// import File from '@/models/File';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const file = await File.findById(params.id);

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Create a response with the file content
    const response = new NextResponse(file.content);
    
    // Set headers for file download
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set(
      'Content-Disposition',
      `attachment; filename="${file.originalName}"`
    );

    return response;
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Error downloading file' },
      { status: 500 }
    );
  }
}