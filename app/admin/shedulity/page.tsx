"use client";

import { useEffect, useState } from "react";
import { Search, Calendar, Eye } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 🔹 Fallback Doctors List (used until backend loads)
const fallbackDoctors = [
  {
    id: 1,
    name: "Dr. Guptha",
    specialty: "Cardiologist",
    department: "Cardiology",
    phone: "8899003322",
    photo: "/1.png",
    availability: ["M", "T", "F"],
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    phone: "9012347392",
    photo: "/1.png",
    availability: ["W", "T", "F"],
  },
  {
    id: 3,
    name: "Dr. Emily",
    specialty: "Pediatrician",
    department: "Pediatrics",
    phone: "9876543033",
    photo: "/1.png",
    availability: ["M", "S"],
  },
  {
    id: 4,
    name: "Dr. David Lee",
    specialty: "Gynecologist",
    department: "Gynecology",
    phone: "9080706050",
    photo: "/1.png",
    availability: ["T", "F", "S"],
  },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function DoctorSchedule() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Calendar state
  const [calendarOpenId, setCalendarOpenId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 🔹 Doctors from backend
  const [doctors, setDoctors] = useState<any[]>(fallbackDoctors);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        if (isCancelled) return;
        // Map backend doctors to UI shape
        const mapped = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          specialty: d.specialization || "General",
          department: d.specialization || "General",
          phone: d.phone || "-",
          photo: "/1.png",
          availability: ["M", "T", "W"],
        }));
        setDoctors(mapped);
      } catch (e: any) {
        setError(e.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      isCancelled = true;
    };
  }, []);

  // 🔹 Book appointment via backend
  const bookAppointment = async (doctor: any, date: Date | null) => {
    if (!date) return;
    const patientName = window.prompt("Enter patient name to book appointment:");
    if (!patientName) return;

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctor.id,
          patientName,
          appointmentTime: date.toISOString(),
          mode: "online",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to book appointment");
      }

      const data = await res.json();
      alert(`✅ Appointment booked with ${doctor.name} on ${new Date(data.date).toLocaleString()}`);
    } catch (e: any) {
      alert(`❌ ${e.message || "Booking failed"}`);
    }
  };

  // 🔹 Filtered + Sorted doctors
  const filteredDoctors = doctors
    .filter((doc) => doc.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "department") return a.department.localeCompare(b.department);
      return 0;
    });

  // 🔹 Export to CSV
  const handleExport = () => {
    const headers = ["Name,Department,Phone,Specialty,Availability"];
    const rows = doctors.map(
      (d) =>
        `${d.name},${d.department},${d.phone},${d.specialty},${d.availability.join(
          " "
        )}`
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doctor_schedule.csv";
    a.click();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Doctor Schedule{" "}
          <span className="ml-2 text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            Total Doctors: {doctors.length}
          </span>
        </h2>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => setSortBy("name")}
            className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sort By: Name
          </button>
          <button
            onClick={() => setSortBy("department")}
            className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sort By: Department
          </button>
          <button
            onClick={handleExport}
            className="border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading && (
          <div className="p-4 text-sm text-gray-500">Loading doctors...</div>
        )}
        {error && (
          <div className="p-4 text-sm text-red-600">{error}</div>
        )}
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">Doctor</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                {/* Doctor Info */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{doc.name}</p>
                    <p className="text-gray-500 text-xs">{doc.specialty}</p>
                  </div>
                </td>

                {/* Department */}
                <td className="px-6 py-4">{doc.department}</td>

                {/* Phone */}
                <td className="px-6 py-4">{doc.phone}</td>

                {/* Availability */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {days.map((day, idx) => (
                      <span
                        key={idx}
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium ${
                          doc.availability.includes(day)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right flex gap-2 justify-end relative">
                  <button
                    onClick={() =>
                      setCalendarOpenId(calendarOpenId === doc.id ? null : doc.id)
                    }
                    className="p-2 rounded-md bg-gray-100 hover:bg-indigo-100 text-indigo-600"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>

                  {/* Inline Calendar */}
                  {calendarOpenId === doc.id && (
                    <div className="absolute right-12 top-0 z-50 bg-white p-2 shadow-lg rounded-md">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          setCalendarOpenId(null);
                          bookAppointment(doc, date);
                        }}
                        inline
                      />
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setShowDetails(true);
                    }}
                    className="p-2 rounded-md bg-gray-100 hover:bg-indigo-100 text-indigo-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor Details Modal */}
      {showDetails && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">👨‍⚕️ Doctor Details</h3>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedDoctor.photo}
                alt={selectedDoctor.name}
                className="w-16 h-16 rounded-full border object-cover"
              />
              <div>
                <p className="font-semibold">{selectedDoctor.name}</p>
                <p className="text-gray-500">{selectedDoctor.specialty}</p>
              </div>
            </div>
            <p>
              <b>Department:</b> {selectedDoctor.department}
            </p>
            <p>
              <b>Phone:</b> {selectedDoctor.phone}
            </p>
            <p>
              <b>Available Days:</b> {selectedDoctor.availability.join(", ")}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
