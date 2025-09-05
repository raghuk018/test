"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Router for redirect
import {
  FaUserMd,
  FaUser,
  FaCalendarCheck,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";

// ---------- Stats ----------
const stats = [
  {
    title: "Doctors",
    value: 2,
    change: "+5%",
    color: "bg-blue-500",
    icon: <FaUserMd className="w-6 h-6 text-white" />,
  },
  {
    title: "Patients",
    value: 8,
    change: "+2%",
    color: "bg-red-500",
    icon: <FaUser className="w-6 h-6 text-white" />,
  },
  {
    title: "Appointment",
    value: 1,
    change: "-15%",
    color: "bg-blue-500",
    icon: <FaCalendarCheck className="w-6 h-6 text-white" />,
  },
  {
    title: "Revenue",
    value: "$55,000",
    change: "+5%",
    color: "bg-green-500",
    icon: <FaDollarSign className="w-6 h-6 text-white" />,
  },
];

// ---------- Appointment Status ----------
const appointmentStatus = [
  { id: 1, patient: "Ravi", doctor: "Dr.sk gupta", date: "2025-10-01", status: "Pending" },
  { id: 2, patient: "Ajathh", doctor: "Dr. srikant", date: "2025-10-02", status: "Completed" },
  { id: 3, patient: "Vikas ", doctor: "Dr.keshavullu", date: "2025-10-03", status: "Cancelled" },
];

// ---------- Appointments ----------
const appointments = [
  { id: 1, type: "Dental Checkup", date: "2025-10-02T10:30", status: "completed" },
  { id: 2, type: "General Consultation", date: "2025-10-05T14:00", status: "pending" },
  { id: 3, type: "Eye Checkup", date: "2025-10-07T11:15", status: "cancelled" },
];

// ---------- Popular Doctors ----------
const popularDoctors = [
  { id: 1, name: "Dr. aryannaa", specialty: "Dentist", image: "1.png", patients: 120 },
  { id: 2, name: "Dr.sheshuu", specialty: "Cardiologist", image: "1.png", patients: 95 },
  { id: 3, name: "Dr. Neha", specialty: "Neurologist", image: "1.png", patients: 80 },
];

// ---------- Pie Chart Data ----------
const data = [
  { name: "Cardiology", value: 214 },
  { name: "Dental", value: 150 },
  { name: "Neurology", value: 121 },
];
const COLORS = ["#6C63FF", "#9A55FF", "#4A3AFF"];

// ---------- Doctors Schedule ----------
const doctors = [
  { name: "Dr. Sarah Johnson", specialty: "Orthopedic Surgeon", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Dr. Emily Carter", specialty: "Pediatrician", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Dr. David Lee", specialty: "Gynecologist", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Michael Smith", specialty: "Cardiologist", image: "https://randomuser.me/api/portraits/men/75.jpg" },
];

// ---------- Treatments ----------
const treatments = [
  { name: "Cardiology", count: 4556, income: 5985 },
  { name: "Radiology", count: 4125, income: 5194 },
  { name: "Dental Surgery", count: 1796, income: 2716 },
  { name: "Orthopaedics", count: 3827, income: 4682 },
  { name: "General Medicine", count: 9894, income: 9450 },
];

export default function Dashboard() {
  const [filter, setFilter] = useState("All Type");
  const [doctorFilter, setDoctorFilter] = useState("Weekly");
  const [period, setPeriod] = useState("Weekly");

  const router = useRouter(); // ✅ Router instance

  // ✅ Redirect function for Book Now
  const handleBookNow = () => {
    router.push("/admin/new-appointment");
  };

  // ---------- Calendar logic ----------
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };
  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const filteredAppointments = appointments.filter(
    (appt) => filter === "All Type" || appt.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="p-6 space-y-8">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="space-x-2">
          <Link href="/admin/new-appointment">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </Link>
          <Link href="/admin/shedulity">
            <button className="bg-white-200 border border-gray-300 px-4 py-2 rounded-md shadow hover:bg-gray-50 transition">
              Schedule Availability
            </button>
          </Link>
        </div>
      </div>

      {/* ---------- Stats Cards ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white-200 shadow rounded-lg p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
                <h2 className="text-sm font-medium text-gray-500">{stat.title}</h2>
              </div>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <span className={`mt-1 text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {stat.change} in last 4 Days
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Appointment Status ---------- */}
      <div className="bg-white-200 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Appointment Status</h2>
        <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full text-left border-collapse">
          <thead>
            <tr className="bg-white-200">
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointmentStatus.map((appt) => (
              <tr key={appt.id} className="hover:bg-white-200">
                <td className="p-2 border">{appt.patient}</td>
                <td className="p-2 border">{appt.doctor}</td>
                <td className="p-2 border">{appt.date}</td>
                <td className="p-2 border">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appt.status === "Completed" ? "bg-green-100 text-green-600"
                      : appt.status === "Pending" ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                    }`}>
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* ---------- Calendar + Appointments ---------- */}
      <div className="bg-white-200 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Appointments</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>All Type</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Calendar */}
        <div className="flex items-center justify-between mb-2">
          <button onClick={prevMonth} className="px-2 py-1 bg-white-200 rounded hover:bg-gray-200">◀</button>
          <h3 className="font-semibold">{months[currentMonth]} {currentYear}</h3>
          <button onClick={nextMonth} className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">▶</button>
        </div>
        <div className="grid grid-cols-7 text-center text-[12px] sm:text-sm font-medium text-gray-500 mb-2">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map((day) => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div key={i} className="py-2 text-sm rounded hover:bg-blue-100 cursor-pointer">{i + 1}</div>
          ))}
        </div>

        {/* Appointment Cards */}
        <div className="mt-6 space-y-3">
          {filteredAppointments.map((appt) => (
            <div key={appt.id} className={`p-4 rounded-lg flex items-center justify-between ${
                appt.status === "completed" ? "bg-green-50"
                : appt.status === "cancelled" ? "bg-red-50"
                : "bg-yellow-50"}`}>
              <div>
                <h4 className="font-semibold text-gray-800">{appt.type}</h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCalendarAlt />
                  {new Date(appt.date).toLocaleString("en-GB", {
                    weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex -space-x-2">
                <img src="1.png" alt="patient" className="w-8 h-8 rounded-full border" />
                <img src="1.png" alt="doctor" className="w-8 h-8 rounded-full border" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Popular Doctors ---------- */}
      <div className="bg-white-200 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Popular Doctors</h2>
          <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularDoctors.map((doc) => (
            <div key={doc.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center space-x-4">
                <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-full border" />
                <div>
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.specialty}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Patients this {doctorFilter}: <span className="font-semibold">{doc.patients}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Extra Row: Top Dept + Schedule + Income ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Departments */}
        <div className="bg-white-200shadow-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Top 3 Departments</h2>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="clinic">Clinic</option>
              <option value="cardiology">Cardiology</option>
              <option value="eye">Eye Checkup</option>
            </select>
          </div>
          <PieChart width={250} height={250}>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={90} innerRadius={50} dataKey="value">
              {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
          </PieChart>
          <div className="text-center font-semibold -mt-8">
            Total Patient <br /> 138
          </div>
        </div>

        {/* Doctors Schedule */}
        <div className="bg-white-200 shadow-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Doctors Schedule</h2>
            <button className="text-blue-600 text-sm">View All</button>
          </div>
          <div className="flex justify-around text-center mb-4">
            <div><p className="text-xl font-bold">48</p><p className="text-sm text-gray-500">Available</p></div>
            <div><p className="text-xl font-bold">28</p><p className="text-sm text-gray-500">Unavailable</p></div>
            <div><p className="text-xl font-bold">12</p><p className="text-sm text-gray-500">Leave</p></div>
          </div>
          {doctors.map((doc, i) => (
            <div key={i} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.specialty}</p>
                </div>
              </div>
              {/* ✅ Redirect when clicking Book Now */}
              <button
                onClick={handleBookNow}
                className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Income By Treatment */}
        <div className="bg-white-200 shadow-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Income By Treatment</h2>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <ul>
            {treatments.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b text-sm">
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.count} Appointments</p>
                </div>
                <p className="font-semibold">${t.income.toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
