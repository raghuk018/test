"use client";
import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTint,
  FaUserMd,
  FaVenusMars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Link from "next/link";

export default function DoctorProfile() {
  const [availability, setAvailability] = useState({
    Monday: ["11:30 AM - 12:30 PM"],
    Tuesday: ["10:00 AM - 11:00 AM"],
    Wednesday: ["02:00 PM - 03:00 PM"],
    Thursday: ["11:00 AM - 12:00 PM"],
    Friday: ["04:00 PM - 05:00 PM"],
  });

  const [sections, setSections] = useState({
    bio: true,
    education: false,
    awards: false,
    certifications: false,
  });

  const [activeDay, setActiveDay] = useState<keyof typeof availability>("Monday");
  const services = [
    { name: "General Consultation", price: 40 },
    { name: "ECG", price: 60 },
    { name: "Heart Screening", price: 120 },
  ];
  const reviews = [
    { by: "James A.", rating: 5, text: "Very attentive and helpful. Highly recommend." },
    { by: "Diana R.", rating: 4, text: "Clear explanation and on-time appointment." },
  ];

  const toggleSection = (section: keyof typeof sections) => {
    setSections({ ...sections, [section]: !sections[section] });
  };

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
            <h2 className="text-xl font-semibold">Dr. Guptha</h2>
            <p className="text-gray-600">MBBS, MD, Cardiology</p>
            <p className="text-sm text-gray-500">
              El Clinic • Downtown Medical Clinic
            </p>
            <span className="text-green-600 font-medium">Available</span>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-lg font-bold text-gray-800">$499 / 30 Min</p>
          <div className="flex gap-2 justify-end">
            <Link href="/admin/new-appointment">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">Book Appointment</button>
            </Link>
            <a href="tel:+15454645468" className="px-3 py-2 border rounded">Call</a>
            <a href="mailto:guptha@example.com" className="px-3 py-2 border rounded">Email</a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="col-span-2 space-y-6">
          {/* Availability (tabbed by day) */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Availability</h3>
            <div className="flex gap-2 mb-3 flex-wrap">
              {Object.keys(availability).map((d) => (
                <button key={d} onClick={() => setActiveDay(d as keyof typeof availability)} className={`px-3 py-1 rounded border text-sm ${activeDay === d ? 'bg-blue-600 text-white border-blue-600' : ''}`}>{d}</button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {availability[activeDay].map((slot, i) => (
                <button key={i} onClick={() => alert(`Booking slot: ${activeDay} - ${slot}`)} className="px-3 py-1 rounded border text-sm hover:bg-blue-50">
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3
              className="text-lg font-semibold flex justify-between cursor-pointer"
              onClick={() => toggleSection("bio")}
            >
              Short Bio{" "}
              {sections.bio ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {sections.bio && (
              <p className="text-gray-600 mt-2">
                Dr. Guptha has been practicing family medicine for over 10
                years. He has extensive experience in managing chronic
                illnesses, preventive care, and treating a wide range of medical
                conditions for patients of all ages.
              </p>
            )}
          </div>

          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3
              className="text-lg font-semibold flex justify-between cursor-pointer"
              onClick={() => toggleSection("education")}
            >
              Education Information{" "}
              {sections.education ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {sections.education && (
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
                <li>
                  Boston Medicine Institution –{" "}
                  <span className="font-medium">MD</span> (1990 – 1992)
                </li>
                <li>
                  Harvard Medical School, Boston –{" "}
                  <span className="font-medium">MBBS</span> (1985 – 1990)
                </li>
              </ul>
            )}
          </div>

          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3
              className="text-lg font-semibold flex justify-between cursor-pointer"
              onClick={() => toggleSection("awards")}
            >
              Awards & Recognition{" "}
              {sections.awards ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {sections.awards && (
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
                <li>Top Doctor Award (2023)</li>
                <li>Patient Choice Award (2022)</li>
              </ul>
            )}
          </div>

          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3
              className="text-lg font-semibold flex justify-between cursor-pointer"
              onClick={() => toggleSection("certifications")}
            >
              Certifications{" "}
              {sections.certifications ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {sections.certifications && (
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
                <li>
                  Certification by the American Board of Family Medicine (ABFM),
                  2015
                </li>
                <li>American Heart Association, 2024</li>
              </ul>
            )}
          </div>

          {/* Services & Pricing */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Services & Pricing</h3>
            <ul className="divide-y">
              {services.map((s, i) => (
                <li key={i} className="flex items-center justify-between py-2">
                  <span>{s.name}</span>
                  <span className="font-medium">${s.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews */}
          <div className="bg-white-200 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Patient Reviews</h3>
            <ul className="space-y-3">
              {reviews.map((r, i) => (
                <li key={i} className="border rounded p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.by}</span>
                    <span className="text-yellow-500">{"★".repeat(r.rating)}<span className="text-gray-300">{"★".repeat(5 - r.rating)}</span></span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-white-200 p-4 rounded-lg shadow space-y-4">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <FaUserMd className="inline text-blue-600 mr-2" /> Medical License:
              MLS65659839
            </p>
            <p>
              <FaPhone className="inline text-blue-600 mr-2" />{" "}
              <a href="tel:+15454645468">+1 54546 45468</a>
            </p>
            <p>
              <FaEnvelope className="inline text-blue-600 mr-2" />{" "}
              <a href="mailto:guptha@example.com">guptha@example.com</a>
            </p>
            <p>
              <FaMapMarkerAlt className="inline text-blue-600 mr-2" />{" "}
              <a
                href="https://maps.google.com/?q=dilshuknager+4-16/2a"
                target="_blank"
              >
                dilshuknager 4-16/2a
              </a>
            </p>
            <p>
              <FaBirthdayCake className="inline text-blue-600 mr-2" /> 25 Jan
              1990
            </p>
            <p>
              <FaTint className="inline text-blue-600 mr-2" /> Blood Group: O+
            </p>
            <p>
              <FaUserMd className="inline text-blue-600 mr-2" /> Experience: 1
              Year
            </p>
            <p>
              <FaVenusMars className="inline text-blue-600 mr-2" /> Gender: Male
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
