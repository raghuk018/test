"use client";

import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function DashboardStats() {
  // Example chart data
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Doctors",
        data: [40, 50, 60, 70, 80, 60, 90],
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Patients",
        data: [400, 500, 450, 600, 550, 500, 650],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
      },
    ],
  };

  const appointmentData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: [1500, 1800, 1200, 1600, 1400, 1300, 1700],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 6000, 5500, 7000, 6800, 7200, 7500],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium shadow hover:bg-indigo-700 transition">
            + New Appointment
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-md font-medium shadow hover:bg-gray-100 transition">
            Schedule Availability
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doctors */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full">
                📅
              </div>
              <span className="font-semibold text-gray-700">Doctors</span>
            </div>
            <span className="text-green-500 font-bold">+95%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">247</h2>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        {/* Patients */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full">
                🧑‍🤝‍🧑
              </div>
              <span className="font-semibold text-gray-700">Patients</span>
            </div>
            <span className="text-green-500 font-bold">+25%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">4178</h2>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        {/* Appointment */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                📅
              </div>
              <span className="font-semibold text-gray-700">Appointment</span>
            </div>
            <span className="text-red-500 font-bold">-15%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">12178</h2>
          <Bar data={appointmentData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>

        {/* Revenue */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full">
                💰
              </div>
              <span className="font-semibold text-gray-700">Revenue</span>
            </div>
            <span className="text-green-500 font-bold">+25%</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">$55,1240</h2>
          <Line data={revenueData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
}
