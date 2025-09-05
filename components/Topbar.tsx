'use client'

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-gray-800">Clinic Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">Admin</span>
        <img
          src="/1.png"
          alt="Admin"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  )
}
