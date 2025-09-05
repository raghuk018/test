"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutDashboard, User, AppWindow } from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [patientsOpen, setPatientsOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={()=>setDrawer(true)} className="md:hidden fixed bottom-4 right-4 z-40 bg-indigo-600 text-white px-4 py-2 rounded-full shadow">
        Menu
      </button>

      {/* Sidebar */}
      <aside className={`w-64 bg-black border-r min-h-screen p-4 hidden md:block`}>
        <h2 className="text-lg font-semibold text-white mb-4">Main Menu</h2>
                
        {/* Dashboard Dropdown */}
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full px-2 py-2 text-left text-white hover:text-indigo-600 font-medium font-semibold"
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Sub-menu */}
          {open && (
            <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
              <li>
                <Link href="/admin" className="block text-white  font-semibold hover:text-indigo-600">
                  Admin Dashboard
                </Link>
              </li>

              {/* Doctor Dropdown */}
              <li>
                <button
                  onClick={() => setDoctorOpen(!doctorOpen)}
                  className="flex items-center justify-between w-full  font-semibold text-white hover:text-indigo-600"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Doctor
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${doctorOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {doctorOpen && (
                  <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                    <li>
                      <Link href="/doctors" className="block text-white font-semibold hover:text-indigo-600">
                        Doctor Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/doctors/docterdetailes"
                        className="block text-white  font-semibold hover:text-indigo-600"
                      >
                        Doctor Details
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/doctors/adddocter"
                        className="block text-white  font-semibold hover:text-indigo-600"
                      >
                        Add Doctor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/doctors/docters"
                        className="block text-white font-semibold  hover:text-indigo-600"
                      >
                        Doctor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/doctors/shedule"
                        className="block text-white font-semibold  hover:text-indigo-600"
                      >
                        Doctor Schedule
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}

          {/* Patients Dropdown */}
          <li>
            <button
              onClick={() => setPatientsOpen(!patientsOpen)}
              className="flex items-center justify-between w-full text-white font-semibold hover:text-indigo-600"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Patients
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${patientsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {patientsOpen && (
              <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                <li>
                  <Link
                    href="/patients"
                    className="block text-white font-semibold hover:text-indigo-600"
                  >
                    Patients Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/patients/patientslist"
                    className="block text-white  font-semibold hover:text-indigo-600"
                  >
                    Patients List
                  </Link>
                </li>
                <li>
                  <Link
                    href="/patients/patientsdetailes"
                    className="block text-white  font-semibold hover:text-indigo-600"
                  >
                    Patients Details
                  </Link>
                </li>
                <li>
                  <Link
                    href="/patients/addpatients"
                    className="block text-white font-semibold  hover:text-indigo-600"
                  >
                    Add Patients
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Applications Dropdown */}
          <li>
            <button
              onClick={() => setApplicationsOpen(!applicationsOpen)}
              className="flex items-center justify-between w-full  font-semibold text-white hover:text-indigo-600"
            >
              <span className="flex items-center gap-2">
                <AppWindow className="w-4 h-4" />
                Applications
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  applicationsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {applicationsOpen && (
              <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                <li>
                  <Link
                    href="/admin/chats"
                    className="block text-white font-semibold hover:text-indigo-600"
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/calls"
                    className="block text-white font-semibold hover:text-indigo-600"
                  >
                    Calls
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/calender"
                    className="block text-white font-semibold hover:text-indigo-600"
                  >
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/contact"
                    className="block text-white font-semibold hover:text-indigo-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </div>
      </aside>

      {/* Drawer for mobile */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setDrawer(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-black p-4 overflow-y-auto">
            <button onClick={()=>setDrawer(false)} className="text-white mb-3">Close</button>
            {/* Reuse menu by rendering the same block */}
            <div>
              {/* Dashboard Dropdown */}
              <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-2 py-2 text-left text-white hover:text-indigo-600 font-medium font-semibold">
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                  <li>
                    <Link href="/admin" className="block text-white  font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Admin Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={() => setDoctorOpen(!doctorOpen)} className="flex items-center justify-between w-full  font-semibold text-white hover:text-indigo-600">
                      <span className="flex items-center gap-2"><User className="w-4 h-4" />Doctor</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${doctorOpen ? "rotate-180" : ""}`} />
                    </button>
                    {doctorOpen && (
                      <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                        <li><Link href="/doctors" className="block text-white font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Doctor Dashboard</Link></li>
                        <li><Link href="/doctors/docterdetailes" className="block text-white  font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Doctor Details</Link></li>
                        <li><Link href="/doctors/adddocter" className="block text-white  font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Add Doctor</Link></li>
                        <li><Link href="/doctors/docters" className="block text-white font-semibold  hover:text-indigo-600" onClick={()=>setDrawer(false)}>Doctor</Link></li>
                        <li><Link href="/doctors/shedule" className="block text-white font-semibold  hover:text-indigo-600" onClick={()=>setDrawer(false)}>Doctor Schedule</Link></li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}

              {/* Patients */}
              <button onClick={() => setPatientsOpen(!patientsOpen)} className="flex items-center justify-between w-full text-white font-semibold hover:text-indigo-600 mt-3">
                <span className="flex items-center gap-2"><User className="w-4 h-4" />Patients</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${patientsOpen ? "rotate-180" : ""}`} />
              </button>
              {patientsOpen && (
                <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                  <li><Link href="/patients" className="block text-white font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Patients Dashboard</Link></li>
                  <li><Link href="/patients/patientslist" className="block text-white  font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Patients List</Link></li>
                  <li><Link href="/patients/patientsdetailes" className="block text-white  font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Patients Details</Link></li>
                  <li><Link href="/patients/addpatients" className="block text-white font-semibold  hover:text-indigo-600" onClick={()=>setDrawer(false)}>Add Patients</Link></li>
                </ul>
              )}

              {/* Applications */}
              <button onClick={() => setApplicationsOpen(!applicationsOpen)} className="flex items-center justify-between w-full  font-semibold text-white hover:text-indigo-600 mt-3">
                <span className="flex items-center gap-2"><AppWindow className="w-4 h-4" />Applications</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${applicationsOpen ? "rotate-180" : ""}`} />
              </button>
              {applicationsOpen && (
                <ul className="ml-6 mt-2 space-y-2 border-l pl-3">
                  <li><Link href="/admin/chats" className="block text-white font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Chat</Link></li>
                  <li><Link href="/admin/calls" className="block text-white font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Calls</Link></li>
                  <li><Link href="/admin/calender" className="block text-white font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Calendar</Link></li>
                  <li><Link href="/admin/contact" className="block text-white font-semibold hover:text-indigo-600" onClick={()=>setDrawer(false)}>Contact</Link></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">{children}</div>
    </>
  );
}
