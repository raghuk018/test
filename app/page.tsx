import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Card */}
        <div className="bg-blue-100 shadow-xl rounded-2xl p-8 flex flex-col items-center gap-6 w-[350px] sm:w-[400px]">
          {/* Profile Image */}
          <div className="relative w-28 h-28">
            <Image
              src="/1.png" // 🔹 Replace with your image path
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-gray-800">Expert Healthcare Solutions</h1>
          <p className="text-gray-600 text-center">
           Providing compassionate care and advanced medical services for you and your family.
          </p>

          {/* Button */}
         <Link href="/admin">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow transition">
              Get Care Now
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
