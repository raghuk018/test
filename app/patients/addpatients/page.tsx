"use client";

import { useEffect, useState } from "react";

interface DoctorForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  dob: string;
  department: string;
  experience: string;
  designation: string;
  languages: string;
  license: string;
  gender: string;
  bloodGroup: string;
  bio: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  sessionDay: string;
  from: string;
  to: string;
  appointmentType: string;
  duration: string;
  bookings: string;
  fee: string;
  degree: string;
  university: string;
  award: string;
  certification: string;
}

export default function AddDoctorPage() {
  const [form, setForm] = useState<DoctorForm>({
    name: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    experience: "",
    designation: "",
    languages: "",
    license: "",
    gender: "",
    bloodGroup: "",
    bio: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    sessionDay: "",
    from: "",
    to: "",
    appointmentType: "",
    duration: "",
    bookings: "",
    fee: "",
    degree: "",
    university: "",
    award: "",
    certification: "",
  });

  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load patients list from backend
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/patients');
        if (!res.ok) throw new Error('Failed to fetch patients');
        const data = await res.json();
        if (cancelled) return;
        setDoctorsList(data);
      } catch (e: any) {
        setError(e.message || 'Failed to load patients');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.name || !form.username || !form.email || !form.phone) {
      alert("Please fill at least Name, Username, Email, and Phone");
      return;
    }

    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Failed to create patient');
      }
      // Re-fetch patients
      const listRes = await fetch('/api/patients');
      const data = await listRes.json();
      setDoctorsList(data);
      setForm({
      name: "",
      username: "",
      email: "",
      phone: "",
      dob: "",
      department: "",
      experience: "",
      designation: "",
      languages: "",
      license: "",
      gender: "",
      bloodGroup: "",
      bio: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      sessionDay: "",
      from: "",
      to: "",
      appointmentType: "",
      duration: "",
      bookings: "",
      fee: "",
      degree: "",
      university: "",
      award: "",
      certification: "",
      });

      alert("✅ Patient added successfully!");
    } catch (e: any) {
      alert(e.message || 'Failed to add patient');
    }
  };

  return (
    <div className="p-8 bg-white-200 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">New Patient</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white-200 p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="border p-2 rounded"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-2 rounded"
            />
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded" />
            <input
              name="languages"
              value={form.languages}
              onChange={handleChange}
              placeholder="Languages Spoken"
              className="border p-2 rounded"
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Blood Group</option>
              <option>A+</option>
              <option>B+</option>
              <option>O+</option>
              <option>AB+</option>
              <option>A-</option>
              <option>B-</option>
              <option>O-</option>
              <option>AB-</option>
            </select>
          </div>
          <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="About Patient" className="border p-2 rounded w-full mt-3" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save Patient
        </button>
      </form>

      {/* Current Patients */}
      {loading && <div className="mt-4 text-sm text-gray-500">Loading...</div>}
      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
      {doctorsList.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Patients</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctorsList.map((p: any) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.id}</td>
                  <td className="py-2">{p.name}</td>
                  <td className="py-2 text-right">
                    <button
                      onClick={async () => {
                        if (!confirm('Delete this patient?')) return;
                        await fetch(`/api/patients?id=${p.id}`, { method: 'DELETE' });
                        const res = await fetch('/api/patients');
                        const data = await res.json();
                        setDoctorsList(data);
                      }}
                      className="px-2 py-1 border rounded hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
