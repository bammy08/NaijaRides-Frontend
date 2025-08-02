'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
