"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Calendar, Users, Square, Plus } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Added router

// ✅ Demo data for Stat Cards
const data1 = [5, 7, 6, 8, 5, 9, 6].map((v, i) => ({ day: i, value: v }));
const data2 = [3, 5, 4, 6, 5, 7, 6].map((v, i) => ({ day: i, value: v }));
const data3 = [2, 4, 3, 5, 6, 4, 3].map((v, i) => ({ day: i, value: v }));

// ✅ Demo data for Appointments Chart
const appointmentsData = [
  { month: "Jan", total: 350, completed: 200 },
  { month: "Feb", total: 270, completed: 190 },
  { month: "Mar", total: 290, completed: 185 },
  { month: "Apr", total: 260, completed: 180 },
  { month: "May", total: 330, completed: 200 },
  { month: "Jun", total: 210, completed: 160 },
  { month: "Jul", total: 220, completed: 170 },
  { month: "Aug", total: 180, completed: 150 },
  { month: "Sep", total: 250, completed: 210 },
  { month: "Oct", total: 190, completed: 205 },
  { month: "Nov", total: 310, completed: 215 },
  { month: "Dec", total: 390, completed: 220 },
];

// ✅ Recent Appointments Demo Data
const initialAppointments = [
  {
    id: 1,
    name: "John Carter",
    type: "Checkup",
    department: "Cardiology",
    date: "01 Sep 2025",
    time: "10:30 AM",
    status: "Upcoming",
    image: "/1.png",
  },
  {
    id: 2,
    name: "Emily Watson",
    type: "Consultation",
    department: "Neurology",
    date: "31 Aug 2025",
    time: "03:15 PM",
    status: "Upcoming",
    image: "/1.png",
  },
  {
    id: 3,
    name: "Michael Lee",
    type: "Follow-up",
    department: "Orthopedics",
    date: "30 Aug 2025",
    time: "01:00 PM",
    status: "Cancelled",
    image: "/1.png",
  },
];

// ✅ StatCard component
function StatCard({
  title,
  value,
  percent,
  percentType,
  icon,
  color,
  chartData,
}: {
  title: string;
  value: number;
  percent: number;
  percentType: "up" | "down";
  icon: React.ReactNode;
  color: string;
  chartData: { day: number; value: number }[];
}) {
  return (
    <div className="bg-white-200 rounded-2xl shadow p-5 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-600">{title}</h2>
        <div
          className={`p-2 rounded-lg border ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>

      <div className="flex items-baseline gap-2 ">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <span
          className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
            percentType === "up"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {percentType === "up" ? "+" : "-"}
          {percent}%
        </span>
      </div>

      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar
              dataKey="value"
              fill={
                color.includes("indigo")
                  ? "#4F46E5"
                  : color.includes("red")
                  ? "#DC2626"
                  : "#059669"
              }
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p
        className={`text-xs font-medium flex items-center gap-1 ${
          percentType === "up" ? "text-green-600" : "text-red-600"
        }`}
      >
        {percentType === "up" ? "↑" : "↓"} {percent}% in last 7 Days
      </p>
    </div>
  );
}

// ✅ Dashboard component
export default function Dashboard() {
  const router = useRouter(); // ✅ Hook for navigation
  const [recentAppointments, setRecentAppointments] = useState(initialAppointments);
  const [chartFilter, setChartFilter] = useState<"total" | "completed">("total");
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    type: "",
    department: "",
    date: "",
    time: "",
    status: "Upcoming",
    image: "/1.png",
  });

  // New state for clickable stat filter
  const [selectedStat, setSelectedStat] = useState<null | "total" | "online" | "cancelled">(null);

  // Filtered appointments
  const filteredAppointments = recentAppointments.filter((a) => {
    if (!selectedStat) return true;
    if (selectedStat === "total") return true;
    if (selectedStat === "online") return a.type.toLowerCase().includes("online");
    if (selectedStat === "cancelled") return a.status === "Cancelled";
    return true;
  });

  // ✅ Updated navigation instead of alerts
  const handleStartAppointment = () => router.push("/admin/new-appointment");
  const handleChatNow = () => router.push("/admin/chats");
  const handleVideoConsult = () => router.push("/admin/calls");

  const updateAppointmentStatus = (id: number, newStatus: string) => {
    setRecentAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleAddAppointment = () => {
    const newId =
      recentAppointments.length > 0
        ? recentAppointments[recentAppointments.length - 1].id + 1
        : 1;
    setRecentAppointments([...recentAppointments, { ...newAppointment, id: newId }]);
    setShowModal(false);
    setNewAppointment({
      name: "",
      type: "",
      department: "",
      date: "",
      time: "",
      status: "Upcoming",
      image: "https://via.placeholder.com/60",
    });
  };

  return (
    <div className="space-y-8">
      {/* 🔹 Top Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div onClick={() => setSelectedStat(selectedStat === "total" ? null : "total")}>
          <StatCard
            title="Total Appointments"
            value={10}
            percent={5}
            percentType="up"
            icon={<Calendar className="text-indigo-600" size={20} />}
            color="border-indigo-600"
            chartData={data1}
          />
        </div>

        <div onClick={() => setSelectedStat(selectedStat === "online" ? null : "online")}>
          <StatCard
            title="Online Consultations"
            value={5}
            percent={5}
            percentType="down"
            icon={<Users className="text-red-600" size={20} />}
            color="border-red-600"
            chartData={data2}
          />
        </div>

        <div onClick={() => setSelectedStat(selectedStat === "cancelled" ? null : "cancelled")}>
          <StatCard
            title="Cancelled Appointments"
            value={5}
            percent={5}
            percentType="up"
            icon={<Square className="text-green-600" size={20} />}
            color="border-green-600"
            chartData={data3}
          />
        </div>
      </div>

      {/* 🔹 Upcoming Appointment + Appointments Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Appointment */}
        <div className="bg-white-200 rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <div className="flex items-center gap-4">
            <img src="/1.png" alt="Doctor" className="w-14 h-14 rounded-full" />
            <div>
              <p className="font-medium">Andrew Billard</p>
              <p className="text-xs text-gray-500">#AP455698</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>
              <Calendar className="w-4 h-4 inline mr-2" />
              Monday, 31 Mar 2025 - 06:30 PM
            </p>
            <p>
              <strong>Department:</strong> Cardiology
            </p>
            <p>
              <strong>Type:</strong> Online Consultation
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleStartAppointment}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Start Appointment
            </button>
            <button
              onClick={handleChatNow}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Chat Now
            </button>
            <button
              onClick={handleVideoConsult}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Video Consultation
            </button>
          </div>
        </div>

        {/* Appointments Chart */}
        <div className="bg-white-200 rounded-2xl shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Appointments</h2>
            <select
              value={chartFilter}
              onChange={(e) =>
                setChartFilter(e.target.value as "total" | "completed")
              }
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="total">Total</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey={chartFilter}
                fill={chartFilter === "total" ? "#4F46E5" : "#16A34A"}
              />
              <Line type="monotone" dataKey="completed" stroke="#16A34A" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Recent Appointments */}
      <div className="bg-white-200 rounded-2xl shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Appointments</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-md"
          >
            <Plus size={16} /> Add Appointment
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {filteredAppointments.map((a) => (
            <li
              key={a.id}
              className="py-3 flex items-center justify-between hover:bg-gray-300 px-2 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <img src={a.image} alt={a.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium text-gray-800">{a.name}</p>
                  <p className="text-xs text-gray-500">
                    {a.type} - {a.department}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {a.date} - {a.time}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    a.status === "Upcoming"
                      ? "bg-blue-100 text-blue-600"
                      : a.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {a.status}
                </span>
                {a.status === "Upcoming" && (
                  <div className="mt-2 flex gap-2 justify-end">
                    <button
                      onClick={() => updateAppointmentStatus(a.id, "Completed")}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(a.id, "Cancelled")}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔹 Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white-200 p-6 rounded-xl w-96 shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Add New Appointment</h2>
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full border px-2 py-1 rounded"
              value={newAppointment.name}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Appointment Type"
              className="w-full border px-2 py-1 rounded"
              value={newAppointment.type}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, type: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full border px-2 py-1 rounded"
              value={newAppointment.date}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, date: e.target.value })
              }
            />
            <input
              type="time"
              className="w-full border px-2 py-1 rounded"
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, time: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded bg-red-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAppointment}
                className="px-3 py-1 rounded bg-green-500 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Footer */}
      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
