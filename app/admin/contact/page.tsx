"use client";

import { useMemo, useState } from "react";
import { Phone, Video, Mail, Search, Plus } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

const contacts: Contact[] = [
  { id: 1, name: "Ramesh Kumar", email: "ramesh@example.com", phone: "+91 98765 43210", avatar: "/1.png" },
  { id: 2, name: "Sita Rani", email: "sita@example.com", phone: "+91 98765 11111", avatar: "/1.png" },
  { id: 3, name: "Arjun Patel", email: "arjun@example.com", phone: "+91 91234 56789", avatar: "/1.png" },
  { id: 4, name: "Priya Sharma", email: "priya@example.com", phone: "+91 93456 12345", avatar: "/1.png" },
  { id: 5, name: "Piyush Sharma", email: "piyus@example.com", phone: "+91 93456 34345", avatar: "/1.png" },
  { id: 6, name: "Lala Sharma", email: "lala@example.com", phone: "+91 93456 12345", avatar: "/1.png" },
  { id: 7, name: "Ramesh Kumar", email: "ramesh2@example.com", phone: "+91 98765 43211", avatar: "/1.png" },
  { id: 8, name: "Sita Rani", email: "sita2@example.com", phone: "+91 98765 11112", avatar: "/1.png" },
  { id: 9, name: "Arjun Patel", email: "arjun2@example.com", phone: "+91 91234 56780", avatar: "/1.png" },
  { id: 10, name: "Priya Sharma", email: "priya2@example.com", phone: "+91 93456 12346", avatar: "/1.png" },
  { id: 11, name: "Piyush Sharma", email: "piyus2@example.com", phone: "+91 93456 34346", avatar: "/1.png" },
  { id: 12, name: "Lala Sharma", email: "lala2@example.com", phone: "+91 93456 12346", avatar: "/1.png" },
];

export default function ContactsPage() {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [query, setQuery] = useState("");
  const [list, setList] = useState<Contact[]>(contacts);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return list.filter((c) => (c.name + c.email + c.phone).toLowerCase().includes(q));
  }, [list, query]);

  return (
    <div className="flex flex-col items-center p-4 md:p-6 min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
            <Search className="w-4 h-4 text-gray-500" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name, email, phone" className="outline-none text-sm bg-transparent" />
          </div>
          <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"><Plus className="w-4 h-4" /> New</button>
        </div>
      </div>

      {/* Contact List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={c.avatar}
              alt={c.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{c.name}</h2>
              <p className="text-gray-500 text-sm">{c.email}</p>
              <p className="text-gray-500 text-sm">{c.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Contact Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
            <button onClick={()=>setShowForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
            <h2 className="font-semibold mb-3">New Contact</h2>
            <div className="space-y-3">
              <input value={newContact.name} onChange={(e)=>setNewContact({...newContact, name: e.target.value})} placeholder="Name" className="border p-2 rounded w-full" />
              <input value={newContact.email} onChange={(e)=>setNewContact({...newContact, email: e.target.value})} placeholder="Email" className="border p-2 rounded w-full" />
              <input value={newContact.phone} onChange={(e)=>setNewContact({...newContact, phone: e.target.value})} placeholder="Phone" className="border p-2 rounded w-full" />
              <button onClick={()=>{ const id = list.length+1; const contact = { id, avatar: '/1.png', ...newContact } as Contact; setList([contact, ...list]); setShowForm(false); setNewContact({ name: '', email: '', phone: '' }); }} className="w-full bg-indigo-600 text-white rounded py-2">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <div className="flex flex-col items-center">
              <img
                src={selected.avatar}
                alt={selected.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <p className="text-gray-600">{selected.email}</p>
              <p className="text-gray-600">{selected.phone}</p>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={()=> window.open(`tel:${selected.phone}`)}>
                  <Phone className="w-5 h-5" /> Call
                </button>
                <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={()=> window.open('/admin/calls', '_self')}>
                  <Video className="w-5 h-5" /> Video
                </button>
                <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={()=> window.open(`mailto:${selected.email}`)}>
                  <Mail className="w-5 h-5" /> Mail
                </button>
              </div>
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
