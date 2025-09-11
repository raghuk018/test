"use client";

import Image from "next/image";
import { useState } from "react";
import { MoreVertical, Calendar } from "lucide-react";

export default function PatientsList() {
  const initialPatients = [
    {
      id: 1,
      name: "ajju",
      age: 26,
      gender: "Male",
      phone: "9802002288",
      doctor: "Dr. Mick Thompson",
      specialty: "Cardiologist",
      doctorImg: "/1.png",
      patientImg: "/1.png",
      address: "hydrbad,india",
      lastVisit: "2025-04-30",
      status: "Available",
    },
    {
      id: 2,
      name: "Susmitha",
      age: 21,
      gender: "Female",
      phone: "9809002211",
      doctor: "Dr. Sarah Johnson",
      specialty: "Orthopedic Surgeon",
      doctorImg: "/1.png",
      patientImg: "/1.png",
      address: "hydrbad,india",
      lastVisit: "2025-04-15",
      status: "Unavailable",
    },
    // ... other patients
  ];

  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [sortRecent, setSortRecent] = useState(true);

  const filteredPatients = patients
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortRecent) return 0;
      return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
    });

  // ✅ Add new patient
  const addPatient = () => {
    const name = prompt("Enter patient name:");
    if (!name) return;
     const age = prompt("Enter age:") || "0";
  const gender = prompt("Enter gender (Male/Female):") || "Male";
  const phone = prompt("Enter phone number:") || "0000000000";
  const address = prompt("Enter address:") || "Unknown";

    const newPatient = {
      id: patients.length + 1,
      name,
      age: parseInt(age),
      gender,
      phone,
      doctor: "Dr. Mick Thompson",
      specialty: "Cardiologist",
      doctorImg: "/1.png",
      patientImg: "/1.png",
      address: "Unknown",
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Available",
    };

    setPatients([newPatient, ...patients]);
  };

  // ✅ Toggle status
  const toggleStatus = (id: number) => {
    setPatients(
      patients.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Available" ? "Unavailable" : "Available" }
          : p
      )
    );
  };

  // ✅ Export CSV
  const exportCSV = () => {
    const headers = Object.keys(patients[0]);
    const csv = [
      headers.join(","),
      ...patients.map((row) => headers.map((field) => row[field as keyof typeof row]).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "patients.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-bold">Patients List</h2>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md text-sm">Total Patients : {patients.length}</span>
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <button onClick={exportCSV} className="px-3 py-1 border rounded-md">Export</button>
          <button onClick={addPatient} className="px-3 py-1 bg-indigo-600 text-white rounded-md">+ New Patient</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-72"
        />
        <div className="flex gap-2">
          <button onClick={() => setSortRecent(!sortRecent)} className="px-3 py-1 border rounded-md">
            Sort By: {sortRecent ? "Recent" : "None"}
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="overflow-x-auto bg-white-200 border rounded-lg shadow -mx-4 sm:mx-0">
        <table className="min-w-[720px] w-full text-sm">
          <thead className="bg-white-200 text-gray-600">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Last Visit</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <Image src={p.patientImg} alt={p.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-gray-500 text-xs">{p.age}, {p.gender}</p>
                  </div>
                </td>
                <td className="p-3">{p.phone}</td>
                <td className="p-3 flex items-center gap-3">
                  <Image src={p.doctorImg} alt={p.doctor} width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-semibold">{p.doctor}</p>
                    <p className="text-gray-500 text-xs">{p.specialty}</p>
                  </div>
                </td>
                <td className="p-3">{p.address}</td>
                <td className="p-3">{p.lastVisit}</td>
                <td className="p-3">
                  <span
                    onClick={() => toggleStatus(p.id)}
                    className={`cursor-pointer px-2 py-1 rounded-md text-xs ${
                      p.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="p-2 border rounded-md">
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded-md">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
