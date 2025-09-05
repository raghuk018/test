"use client";

import { useEffect, useState } from "react";
import { Calendar, MoreVertical, Plus, Search, SlidersHorizontal } from "lucide-react";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Thompson",
    specialization: "Cardiologist",
    available: "Mon, 20 Jan 2025",
    fee: 499,
    image: "/1.png",
  },
  {
    id: 2,
    name: "Dr. Johnson",
    specialization: "Orthopedic Surgeon",
    available: "Wed, 22 Jan 2025",
    fee: 450,
    image: "/1.png",
  },
  {
    id: 3,
    name: "Dr. Carter",
    specialization: "Pediatrician",
    available: "Fri, 24 Jan 2025",
    fee: 300,
    image: "/1.png",
  },
];

export default function DoctorGridPage() {
  const [doctorList, setDoctorList] = useState(initialDoctors);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    available: "",
    fee: "",
    image: "/1.png",
  });
  const [bookingDoctor, setBookingDoctor] = useState<any>(null);
  const [appointment, setAppointment] = useState({
    patientName: "",
    patientPhone: "",
    appointmentTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load doctors from backend
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/doctors");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        if (cancelled) return;
        const mapped = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          specialization: d.specialization || "General",
          available: new Date().toDateString(),
          fee: 0,
          image: "/1.png",
        }));
        setDoctorList(mapped);
      } catch (e: any) {
        setError(e.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Filter doctors
  const filteredDoctors = doctorList
    .filter((doc) => (filter === "All" ? true : doc.specialization === filter))
    .filter((doc) => (query ? (doc.name + doc.specialization).toLowerCase().includes(query.toLowerCase()) : true));

  // ✅ Add new doctor (persists to DB)
  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialization) return;
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newDoctor.name, specialization: newDoctor.specialization }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to create doctor');
      }
      // Re-fetch doctors to reflect real-time list
      setLoading(true);
      const listRes = await fetch('/api/doctors');
      const data = await listRes.json();
      const mapped = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        specialization: d.specialization || 'General',
        available: new Date().toDateString(),
        fee: 0,
        image: '/1.png',
      }));
      setDoctorList(mapped);
      setNewDoctor({ name: '', specialization: '', available: '', fee: '', image: '/1.png' });
      setShowForm(false);
    } catch (e: any) {
      alert(e.message || 'Failed to add doctor');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Book appointment
  const handleBookAppointment = async () => {
    if (!bookingDoctor || !appointment.appointmentTime || !appointment.patientName) return;
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: bookingDoctor.id,
          patientName: appointment.patientName,
          appointmentTime: new Date(appointment.appointmentTime).toISOString(),
          mode: 'online',
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to book appointment');
      }
      alert(`Appointment booked with ${bookingDoctor.name}`);
      setBookingDoctor(null);
      setAppointment({ patientName: '', patientPhone: '', appointmentTime: '' });
    } catch (e: any) {
      alert(e.message || 'Booking failed');
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Doctors
          <span className="ml-2 text-sm text-gray-500">{filteredDoctors.length} results</span>
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
            <Search className="w-4 h-4 text-gray-500" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search doctors" className="outline-none text-sm bg-transparent" />
          </div>
          <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="border px-3 py-2 rounded-md text-sm">
            <option value="All">All</option>
            {[...new Set(doctorList.map((d)=>d.specialization))].map((spec)=> (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          <button onClick={()=>setShowForm(!showForm)} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700">
            <Plus className="w-4 h-4" /> New Doctor
          </button>
        </div>
      </div>

      {/* New Doctor Form */}
      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="font-semibold mb-3">Add New Doctor</h2>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={newDoctor.specialization}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, specialization: e.target.value })
              }
              className="border p-2 rounded"
            />
            <input type="date" placeholder="Available Date" value={newDoctor.available} onChange={(e)=> setNewDoctor({ ...newDoctor, available: e.target.value })} className="border p-2 rounded" />
            <input
              type="number"
              placeholder="Fee"
              value={newDoctor.fee}
              onChange={(e) => setNewDoctor({ ...newDoctor, fee: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleAddDoctor}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Doctor
          </button>
        </div>
      )}

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-4 flex items-start gap-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{doctor.name}</h2>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
              <p className="text-sm text-gray-500">
                Available : {doctor.available}
              </p>
              <p className="text-sm font-medium text-indigo-600">
                Starts From : ${doctor.fee}
              </p>
              <div className="mt-2 flex gap-2">
                <a href={`/doctors/docterdetailes`} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">View</a>
                <button onClick={() => setBookingDoctor(doctor)} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded">Book</button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
              <button onClick={() => setBookingDoctor(doctor)} className="text-gray-400 hover:text-indigo-600">
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="font-semibold mb-4">
              Book Appointment with {bookingDoctor.name}
            </h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={appointment.patientName}
              onChange={(e) =>
                setAppointment({ ...appointment, patientName: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Patient Phone"
              value={appointment.patientPhone}
              onChange={(e) =>
                setAppointment({ ...appointment, patientPhone: e.target.value })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="datetime-local"
              value={appointment.appointmentTime}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  appointmentTime: e.target.value,
                })
              }
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setBookingDoctor(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
