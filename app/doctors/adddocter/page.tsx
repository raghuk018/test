"use client";

import { useState } from "react";

export default function AddDoctorPage() {
  const [form, setForm] = useState({
    name: "",
    photo: "",
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // ✅ handle form submit with API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // ✅ Basic validation
    if (!form.name || !form.email || !form.phone || !form.department) {
      setMessage("⚠️ Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Example API endpoint (replace with your backend URL)
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ Doctor added successfully!");
        setForm({
          name: "",
          photo: "",
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
      } else {
        setMessage("❌ Failed to add doctor. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("🚨 Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white-200 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">New Doctor</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white-200 p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name *" className="border p-2 rounded" />
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handlePhoto} className="border p-2 rounded w-full" />
            </div>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border p-2 rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className="border p-2 rounded" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className="border p-2 rounded" />
            <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 rounded" />
            <input name="experience" value={form.experience} onChange={handleChange} placeholder="Years of Experience" className="border p-2 rounded" />
            <input name="department" value={form.department} onChange={handleChange} placeholder="Department *" className="border p-2 rounded" />
            <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="border p-2 rounded" />
            <input name="license" value={form.license} onChange={handleChange} placeholder="Medical License Number" className="border p-2 rounded" />
            <input name="languages" value={form.languages} onChange={handleChange} placeholder="Languages Spoken" className="border p-2 rounded" />
            <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="border p-2 rounded">
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
          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">Photo preview</p>
              <img src={preview} alt="Preview" className="w-24 h-24 rounded-full border" />
            </div>
          )}
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="About Doctor"
            className="border p-2 rounded w-full mt-3"
          />
        </div>

        {/* Address Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="address1" value={form.address1} onChange={handleChange} placeholder="Address 1" className="border p-2 rounded" />
            <input name="address2" value={form.address2} onChange={handleChange} placeholder="Address 2" className="border p-2 rounded" />
            <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-2 rounded" />
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" />
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
            <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-2 rounded" />
          </div>
        </div>

        {/* Appointment Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Appointment Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="appointmentType" value={form.appointmentType} onChange={handleChange} placeholder="Appointment Type" className="border p-2 rounded" />
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Appointment Duration (minutes)" className="border p-2 rounded" />
            <input name="bookings" value={form.bookings} onChange={handleChange} placeholder="Max Bookings Per Slot" className="border p-2 rounded" />
            <input name="fee" value={form.fee} onChange={handleChange} placeholder="Consultation Fee" className="border p-2 rounded" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Use doctor details page to configure detailed availability slots.</p>
        </div>

        {/* Education Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Educational Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="degree" value={form.degree} onChange={handleChange} placeholder="Educational Degree" className="border p-2 rounded" />
            <input name="university" value={form.university} onChange={handleChange} placeholder="University" className="border p-2 rounded" />
            <input name="award" value={form.award} onChange={handleChange} placeholder="Awards & Recognition" className="border p-2 rounded" />
            <input name="certification" value={form.certification} onChange={handleChange} placeholder="Certifications" className="border p-2 rounded" />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-between items-center">
          <button type="submit" disabled={loading} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            {loading ? "Saving..." : "Save Doctor"}
          </button>
          {message && <p className="text-sm">{message}</p>}
        </div>
      </form>

      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
