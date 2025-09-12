import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 flex items-center justify-center p-4">
      <main className="flex flex-col items-center justify-center text-center">
        {/* Card */}
        <div className="bg-blue-100 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 md:gap-6 w-full max-w-sm sm:max-w-md">
          {/* Profile Image */}
          <div className="relative w-24 h-24 md:w-32 md:h-28">
            <Image
              src="/1.png" // 🔹 Replace with your image path
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />
          </div>
          {/* Text */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Expert Healthcare Solutions</h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
           Providing compassionate care and advanced medical services for you and your family. 
          </p>
          {/* Button */}
         <Link href="/admin">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow transition text-sm md:text-base">
                     Get Care Now
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
