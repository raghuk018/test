'use client'

import { useState, useEffect, useRef } from "react";
import { ChevronDown, User, Settings } from "lucide-react";

type TriggerVariant = 'avatar' | 'icon';

export default function ProfileDropdown({ trigger = 'avatar' }: { trigger?: TriggerVariant }) {
  const [open, setOpen] = useState(false);
  const [showOtherProfiles, setShowOtherProfiles] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={() => setOpen(!open)} aria-haspopup="menu" aria-expanded={open} className="flex items-center gap-2 focus:outline-none">
        {trigger === 'icon' ? (
          // person icon trigger (to match topbar icons)
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-600">
            <path d="M20 21a8 8 0 10-16 0" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <>
            <img src="/1.png" alt="Profile" className="w-8 h-8 rounded-full border" />
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border p-4 z-50">
          <div className="flex items-center gap-3 pb-3 border-b">
            <img src="/1.png" alt="Profile" className="w-12 h-12 rounded-full border" />
            <div>
              <h3 className="font-semibold">Personal</h3>
              <p className="text-sm text-gray-500">kanikarmraghu…@gmail.com</p>
              <p className="text-xs text-green-600 font-medium">● Sync is on</p>
            </div>
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-sm w-full text-left">
              <User className="w-4 h-4 text-gray-600" /> Set up new personal profile
            </button>
            <button onClick={() => setShowOtherProfiles(!showOtherProfiles)} className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg text-sm w-full text-left">
              <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-gray-600" /> Other profiles</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showOtherProfiles ? 'rotate-180' : ''}`} />
            </button>
            {showOtherProfiles && (
              <div className="mx-2 mt-1 mb-2 rounded-lg border bg-gray-50">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <img src="/1.png" alt="Profile A" className="w-6 h-6 rounded-full border" />
                  <span className="text-sm">Work</span>
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <img src="/1.png" alt="Profile B" className="w-6 h-6 rounded-full border" />
                  <span className="text-sm">Guest</span>
                </button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 text-blue-600 text-sm">Add profile</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


