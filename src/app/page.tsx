import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <Link href="/chat" className="text-blue-400 hover:text-blue-300">
          Chat Move 🌟
        </Link>
      </h1>
    </div>
  );
}
