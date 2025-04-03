import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <p>ID가 없습니다.</p>
      <h1 className="text-4xl font-bold text-white p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Home
        </Link>
      </h1>
    </div>
  );
}
