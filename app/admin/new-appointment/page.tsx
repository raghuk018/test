"use client";

import { useState } from "react";

export default function AppointmentsPage() {
  const [form, setForm] = useState({
    patientName: "",
    patientPhone: "",
    appointmentTime: "",
    doctorId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: Number(form.doctorId),
          patientName: form.patientName,
          patientPhone: form.patientPhone,
          appointmentTime: form.appointmentTime,
          mode: "online",
        }),
      });

      if (!res.ok) throw new Error("Failed to book appointment");
      const data = await res.json();

      alert(
        `✅ Appointment booked with ${data.doctor.name} on ${new Date(
          data.date
        ).toLocaleString()}`
      );

      // reset form
      setForm({
        patientName: "",
        patientPhone: "",
        appointmentTime: "",
        doctorId: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded-xl overflow-hidden">
      {/* 🔹 Top Image Banner */}
      <div className="w-full h-40">
        <img
          src="/1.png" // 👈 put your image inside /public folder with this name
          alt="Appointment Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔹 Form Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📅 Book an Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Patient Phone */}
          <div>
            <label className="block text-sm font-medium">Patient Phone</label>
            <input
              type="tel"
              name="patientPhone"
              value={form.patientPhone}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Doctor ID */}
          <div>
            <label className="block text-sm font-medium">Doctor ID</label>
            <input
              type="number"
              name="doctorId"
              value={form.doctorId}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Appointment Time */}
          <div>
            <label className="block text-sm font-medium">Appointment Time</label>
            <input
              type="datetime-local"
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
