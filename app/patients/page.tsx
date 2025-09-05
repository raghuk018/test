"use client";

import { FaUserMd, FaHeartbeat, FaNotesMedical } from "react-icons/fa";
import { MdOutlineBloodtype } from "react-icons/md";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
export default function PatientDashboard() {
  const doctors = [
    { name: "Dr. Mick Thompson", role: "Cardiologist", bookings: 20, img: "1.png" },
    { name: "Dr. Sarah Johnson", role: "Orthopedic Surgeon", bookings: 15, img: "1.png" },
    { name: "Dr. Emily Carter", role: "Pediatrician", bookings: 12, img: "1.png" },
    { name: "Dr. David Lee", role: "Gynecologist", bookings: 8, img: "1.png" },
    { name: "Dr. Anna Kim", role: "Psychiatrist", bookings: 6, img: "1.png" },
    { name: "Dr. Carlos Rivera", role: "Dermatologist", bookings: 11, img: "1.png" },
    { name: "Dr. Priya Nair", role: "Endocrinologist", bookings: 7, img: "1.png" },
    { name: "Dr. Ahmed Khan", role: "ENT Specialist", bookings: 9, img: "1.png" },
    { name: "Dr. Julia Park", role: "Neurologist", bookings: 10, img: "1.png" },
    { name: "Dr. Robert Chen", role: "General Physician", bookings: 18, img: "1.png" },
  ];

  const prescriptions = [
    { title: "Cardiology Prescription", date: "20 Apr 2025", url: "/1.png" },
    { title: "Dentist Prescription", date: "25 Mar 2025", url: "/1.png" },
    { title: "Dentist Prescription", date: "16 Mar 2025", url: "/1.png" },
    { title: "Dentist Prescription", date: "12 Feb 2025", url: "/1.png" },
    { title: "Cardiology Prescription", date: "04 Jan 2025", url: "/1.png" },
  ];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const closePreview = () => setPreviewUrl(null);
  const handleView = (url: string) => setPreviewUrl(url);
  const handleDownload = async (url: string, filename: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const activities = [
    { color: "green", text: "Appointment with Primary Care Physician", date: "24 aguest 2025, 10:55 AM" },
    { color: "red", text: "Blood Pressure Check (Home Monitoring)", date: "24 oct 2025, 11:00 AM" },
    { color: "yellow", text: "Physical Therapy Session Knee strengthening exercises", date: "24 sep 2025, 11:00 AM" },
    { color: "blue", text: "Discuss dietary changes to manage blood sugar levels and weight", date: "24 dec 2025, 11:00 AM" },
  ];

  return (
    <div className="p-6 bg-white-200 min-h-screen">
      {/* Header */}
       <div className="text-right">
      <p className="text-lg font-bold text-gray-800">Need an appointment?</p>
      <Link href="/admin/new-appointment">
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
          Book Appointment
        </button>
      </Link>
    </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className=" bg-white-200 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total Appointments</span>
            <FaUserMd className="text-2xl text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold mt-2">24</h3>
          <p className="text-green-600 text-sm mt-1">+5% in last 7 Days</p>
        </div>

        <div className=" bg-white-200 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Online Consultations</span>
            <FaNotesMedical className="text-2xl text-red-500" />
          </div>
          <h3 className="text-2xl font-bold mt-2">36</h3>
          <p className="text-red-600 text-sm mt-1">-15% in last 7 Days</p>
        </div>

        <div className=" bg-white-200 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Blood Pressure</span>
            <MdOutlineBloodtype className="text-2xl text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold mt-2">89 g/dl</h3>
          <p className="text-green-600 text-sm mt-1">+5%</p>
        </div>

        <div className=" bg-white-200 rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Heart Rate</span>
            <FaHeartbeat className="text-2xl text-pink-500" />
          </div>
          <h3 className="text-2xl font-bold mt-2">87 bpm</h3>
          <p className="text-green-600 text-sm mt-1">+5%</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctors List */}
        <div className=" bg-white-200 rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">My Doctors</h2>
            <Link href="/doctors" className="text-sm text-blue-600 hover:underline">View all</Link>
          </div>
          <ul className="space-y-3">
            {doctors.map((doc, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-full object-cover border" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.role}</p>
                  </div>
                </div>
                <Link href="/patients/patientsdetailes" className="text-xs text-red-600 border border-red-400 px-2 py-1 rounded-md hover:bg-red-50">
                  {doc.bookings} Bookings
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Prescriptions */}
        <div className=" bg-white-200 rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Prescriptions</h2>
            <button onClick={() => alert('Coming soon: export all prescriptions')} className="text-sm text-blue-600 hover:underline">Export all</button>
          </div>
          <ul className="space-y-4">
            {prescriptions.map((p, i) => (
              <li key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleView(p.url)} className="p-2 text-gray-600 hover:text-indigo-600" aria-label="View prescription">
                    <AiOutlineEye />
                  </button>
                  <button onClick={() => handleDownload(p.url, `${p.title.replace(/\s+/g,'_')}.png`)} className="p-2 text-gray-600 hover:text-indigo-600" aria-label="Download prescription">
                    <AiOutlineDownload />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className=" bg-white-200 rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {activities.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`w-3 h-3 rounded-full mt-1 ${
                    a.color === "green"
                      ? "bg-green-500"
                      : a.color === "red"
                      ? "bg-red-500"
                      : a.color === "yellow"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></span>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{a.text}</span>
                  </p>
                  <p className="text-xs text-gray-500">{a.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Preview Modal */}
        {previewUrl && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closePreview}>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Prescription Preview</h3>
                <button onClick={closePreview} className="text-gray-600 hover:text-black">✕</button>
              </div>
              <img src={previewUrl} alt="Prescription" className="max-h-[70vh] w-full object-contain" />
            </div>
          </div>
        )}
          <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
      </div>
    </div>
  );
}
