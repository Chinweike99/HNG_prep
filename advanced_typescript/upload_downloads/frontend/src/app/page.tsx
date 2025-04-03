// import FileUpload from '@/components/FileUpload';

import FileUpload from "./components/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">File Upload & Download Demo</h1>
        <FileUpload />
      </div>
    </main>
  );
}