import type { Metadata, Viewport } from "next";
import "./globals.css";
import SidebarLayout from "@/components/Sidebar";
import { Search, Bell, Calendar, Moon, User } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

export const metadata: Metadata = {
  title: "Clinic Admin Dashboard",
  description: "Admin panel for managing doctors, patients, and appointments",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
        {/* 🔹 Top Navbar */}
        <header className="w-full bg-white border-b flex items-center justify-between px-4 sm:px-6 py-3 shadow-sm relative">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img src="/01.png" alt="Logo" className="w-30 h-5 rounded-full" />
            <span className="font-bold text-lg">Healthcare</span>
          </div>

          {/* Middle: Search */}
          <div className="hidden sm:block flex-1 max-w-md mx-2 sm:mx-6">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none px-2 flex-1 text-sm"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <a href="https://calendar-link.com" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 text-gray-600 cursor-pointer" />
              </a>
              <a href="https://user-link.com" target="_blank" rel="noopener noreferrer">
                <User className="w-5 h-5 text-gray-600 cursor-pointer" />
              </a>
              <a href="https://moon-link.com" target="_blank" rel="noopener noreferrer">
                <Moon className="w-5 h-5 text-gray-600 cursor-pointer" />
              </a>
              <a href="https://bell-link.com" target="_blank" rel="noopener noreferrer">
                <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              </a>
            </div>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* 🔹 Main Layout: Sidebar + Page Content */}
        <div className="flex flex-1">
          <SidebarLayout>{children}</SidebarLayout>
        </div>
      </body>
    </html>
  );
}
 