"use client";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaTint, FaUserMd, FaVenusMars } from "react-icons/fa";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import { FiPhone, FiMail, FiPrinter } from "react-icons/fi";
import Link from "next/link";
export default function DoctorProfile() {
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

  const prescriptions = [
    { title: "Blood Pressure Medication", date: "20 Apr 2025", url: "/1.png" },
    { title: "Pain Relief", date: "03 Mar 2025", url: "/1.png" },
  ];

  const visits = [
    { date: "24 Aug 2025", doctor: "Dr. Sarah Johnson", purpose: "General Checkup", status: "Completed" },
    { date: "14 Jun 2025", doctor: "Dr. David Lee", purpose: "Orthopedic Review", status: "Completed" },
  ];
  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start bg-white-200 p-4 rounded-lg shadow mb-6 gap-4">
        <div className="flex gap-4 items-center">
          <img
            src="/1.png"
            alt="Doctor"
            className="w-24 h-24 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">raghuvarma</h2>
            <p className="text-gray-600">degree</p>
            <p className="text-sm text-gray-500">i am fron hydrabad</p>
            <span className="text-green-600 font-medium">last visited 20 aguest 2025</span>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-lg font-bold text-gray-800">Need an appointment?</p>
          <div className="flex gap-2 justify-end">
            <Link href="/admin/new-appointment">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">Book Appointment</button>
            </Link>
            <a href="tel:9833424322" className="px-3 py-2 border rounded flex items-center gap-2"><FiPhone /> Call</a>
            <a href="mailto:ragu@example.com" className="px-3 py-2 border rounded flex items-center gap-2"><FiMail /> Email</a>
            <button onClick={() => window.print()} className="px-3 py-2 border rounded flex items-center gap-2"><FiPrinter /> Print</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white-200 p-4 rounded-lg shadow"><p className="text-xs text-gray-500">Age</p><p className="text-xl font-semibold">23</p></div>
            <div className="bg-white-200 p-4 rounded-lg shadow"><p className="text-xs text-gray-500">Blood Group</p><p className="text-xl font-semibold">O+</p></div>
            <div className="bg-white-200 p-4 rounded-lg shadow"><p className="text-xs text-gray-500">Allergies</p><p className="text-xl font-semibold">None</p></div>
          </div>

          {/* Short Bio */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Short Bio</h3>
            <p className="text-gray-600">
              Mr. raghuvarma is a 23-year-old patient with a medical history that spans over 10 years. He has been actively managing chronic health conditions and following preventive care measures. His treatment journey includes regular check-ups, lifestyle adjustments, and ongoing management for a wide range of medical concerns to support long-term well-being.
            </p>
          </div>

          {/* Education Information */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Education Information</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>
                kshatriya jr college – <span className="font-medium">inter</span> (2020 – 2022)
              </li>
              <li>
                nobel degree college in dilshuknager hydrabad, – <span className="font-medium">bba</span> (2022 – 2024)
              </li>
            </ul>
          </div>

          {/* Prescriptions */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Prescriptions</h3>
            <ul className="space-y-3">
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

          {/* Recent Visits */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Visits</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Date</th>
                  <th className="py-2">Doctor</th>
                  <th className="py-2">Purpose</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((v, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{v.date}</td>
                    <td className="py-2">{v.doctor}</td>
                    <td className="py-2">{v.purpose}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${v.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </div>

        {/* Right Sidebar */}
        <div className="bg-white-200 p-4 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p><FaUserMd className="inline text-blue-600 mr-2" /> Medical License: MLS65659839</p>
            <p><FaPhone className="inline text-blue-600 mr-2" /> 9833424322</p>
            <p><FaEnvelope className="inline text-blue-600 mr-2" /> ragu@example.com</p>
            <p><FaMapMarkerAlt className="inline text-blue-600 mr-2" /> dilshuknager 4-16/2a</p>
            <p><FaBirthdayCake className="inline text-blue-600 mr-2" /> 25 Jan 2026</p>
            <p><FaTint className="inline text-blue-600 mr-2" /> Blood Group: O+</p>
            
            <p><FaVenusMars className="inline text-blue-600 mr-2" /> Gender: Male</p>
          </div>
        </div>
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
  );
}
