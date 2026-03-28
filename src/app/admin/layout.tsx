import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1a1a2e] text-white">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              &larr; Docs
            </Link>
            <span className="text-gray-600">|</span>
            <span className="font-semibold text-sm">Admin</span>
          </div>
          <span className="text-xs text-gray-500">muzigal-zoo</span>
        </div>
      </header>
      {children}
    </div>
  );
}
