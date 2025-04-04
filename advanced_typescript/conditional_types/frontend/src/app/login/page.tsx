'use client';

import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="space-y-4">
          <button
            onClick={() => login('admin')}
            className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90"
          >
            Login as Admin
          </button>
          <button
            onClick={() => login('editor')}
            className="w-full bg-secondary text-secondary-foreground py-2 rounded hover:bg-secondary/80"
          >
            Login as Editor
          </button>
          <button
            onClick={() => login('viewer')}
            className="w-full bg-destructive text-destructive-foreground py-2 rounded hover:bg-destructive/90"
          >
            Login as Viewer
          </button>
        </div>
      </div>
    </div>
  );
}