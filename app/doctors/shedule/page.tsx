"use client";

import { useMemo, useState } from "react";
import { Plus, Search, List, Grid3X3 } from "lucide-react";

interface Schedule {
  id: number;
  doctor: string;
  specialization: string;
  day: string;
  from: string;
  to: string;
}

export default function DoctorSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      doctor: "Dr. Mick Thompson",
      specialization: "Cardiologist",
      day: "Monday",
      from: "09:00 AM",
      to: "01:00 PM",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      specialization: "Orthopedic Surgeon",
      day: "Tuesday",
      from: "10:00 AM",
      to: "02:00 PM",
    },
    {
      id: 3,
      doctor: "Dr. John Smith",
      specialization: "Neurosurgeon",
      day: "Friday",
      from: "11:00 AM",
      to: "04:00 PM",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [query, setQuery] = useState("");
  const [dayFilter, setDayFilter] = useState<string>("All");
  const [view, setView] = useState<'table' | 'cards'>("table");

  const [form, setForm] = useState<Omit<Schedule, "id">>({
    doctor: "",
    specialization: "",
    day: "",
    from: "",
    to: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingSchedule) {
      // update
      setSchedules((prev) =>
        prev.map((s) =>
          s.id === editingSchedule.id ? { ...editingSchedule, ...form } : s
        )
      );
    } else {
      // add new
      const newSchedule: Schedule = {
        id: schedules.length + 1,
        ...form,
      };
      setSchedules([...schedules, newSchedule]);
    }
    setShowForm(false);
    setEditingSchedule(null);
    setForm({ doctor: "", specialization: "", day: "", from: "", to: "" });
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setForm({
      doctor: schedule.doctor,
      specialization: schedule.specialization,
      day: schedule.day,
      from: schedule.from,
      to: schedule.to,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return schedules
      .filter((s) => (dayFilter === 'All' ? true : s.day === dayFilter))
      .filter((s) => (s.doctor + s.specialization + s.day).toLowerCase().includes(q));
  }, [schedules, query, dayFilter]);

  return (
    <div className="p-4 sm:p-6 bg-white-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-semibold">Doctor Schedule</h1>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white w-full sm:w-auto">
            <Search className="w-4 h-4 text-gray-500" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by doctor, specialization, day" className="outline-none text-sm bg-transparent" />
          </div>
          <div className="hidden md:flex items-center gap-2">
            {['All','Monday','Tuesday','Wednesday','Thursday','Friday'].map((d)=> (
              <button key={d} onClick={()=>setDayFilter(d)} className={`px-3 py-1 rounded-full text-sm border ${dayFilter===d ? 'bg-indigo-600 text-white border-indigo-600' : ''}`}>{d}</button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={()=>setView('table')} className={`p-2 border rounded ${view==='table' ? 'bg-gray-100' : ''}`} aria-label="Table view"><List className="w-4 h-4" /></button>
            <button onClick={()=>setView('cards')} className={`p-2 border rounded ${view==='cards' ? 'bg-gray-100' : ''}`} aria-label="Card view"><Grid3X3 className="w-4 h-4" /></button>
          </div>
          <button onClick={()=>setShowForm(true)} className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Schedule
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-white-200 rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Total Schedules</p><p className="text-xl font-semibold">{filtered.length}</p></div>
        <div className="bg-white-200 rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Unique Doctors</p><p className="text-xl font-semibold">{new Set(filtered.map(s=>s.doctor)).size}</p></div>
        <div className="bg-white-200 rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Days Covered</p><p className="text-xl font-semibold">{new Set(filtered.map(s=>s.day)).size}</p></div>
      </div>

      {view === 'table' ? (
        <div className="bg-white-200 rounded-lg shadow-md overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-[640px] w-full border-collapse">
            <thead className="bg-gray-300">
              <tr>
                <th className="text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-600">Doctor</th>
                <th className="text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-600">Specialization</th>
                <th className="text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-600">Day</th>
                <th className="text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-600">From</th>
                <th className="text-left px-3 sm:px-4 py-2 text-sm font-medium text-gray-600">To</th>
                <th className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((schedule) => (
                <tr key={schedule.id} className="border-t">
                  <td className="px-3 sm:px-4 py-2">{schedule.doctor}</td>
                  <td className="px-3 sm:px-4 py-2">{schedule.specialization}</td>
                  <td className="px-3 sm:px-4 py-2">{schedule.day}</td>
                  <td className="px-3 sm:px-4 py-2">{schedule.from}</td>
                  <td className="px-3 sm:px-4 py-2">{schedule.to}</td>
                  <td className="px-3 sm:px-4 py-2">
                    <button onClick={() => handleEdit(schedule)} className="px-2 py-1 text-sm text-indigo-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(schedule.id)} className="ml-2 px-2 py-1 text-sm text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div key={s.id} className="bg-white-200 rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{s.doctor}</p>
                  <p className="text-sm text-gray-500">{s.specialization}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full border">{s.day}</span>
              </div>
              <div className="mt-3 text-sm">
                <p><span className="text-gray-500">From:</span> {s.from}</p>
                <p><span className="text-gray-500">To:</span> {s.to}</p>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={() => handleEdit(s)} className="px-3 py-1 text-sm border rounded">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="px-3 py-1 text-sm border rounded text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white-200 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editingSchedule ? "Edit Schedule" : "Add Schedule"}
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="doctor"
                placeholder="Doctor Name"
                value={form.doctor}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={form.specialization}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="day"
                placeholder="Day (e.g. Monday)"
                value={form.day}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="from"
                placeholder="From (e.g. 09:00 AM)"
                value={form.from}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="to"
                placeholder="To (e.g. 01:00 PM)"
                value={form.to}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSchedule(null);
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {editingSchedule ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-gray-600 text-sm py-6">
        2025 © Healthcare, All Rights Reserved
      </footer>
    </div>
  );
}
