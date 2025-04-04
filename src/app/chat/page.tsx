import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen bg-gray-900">
      <h1 className="flex w-sm text-center text-4xl font-bold text-white p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <Link
          href="/chat/joseok"
          className="w-1/1 text-blue-400 hover:text-blue-300"
        >
          JOSEOK
        </Link>
      </h1>
      <h1 className="flex w-sm text-center text-4xl font-bold text-white p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <Link
          href="/chat/yumi"
          className="w-1/1 text-blue-400 hover:text-blue-300"
        >
          YUMI
        </Link>
      </h1>
    </div>
  );
}
