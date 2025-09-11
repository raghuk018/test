"use client";

import { useState } from "react";
import { FiSend, FiSmile, FiPaperclip } from "react-icons/fi";

const users = [
  { id: 1, name: "jhon", status: "online", lastMsg: "Hey Sam! Did you check out the new logo design?", time: "10:10 AM", unread: 0, avatar: "/1.png" },
  { id: 2, name: "watson", status: "offline", lastMsg: "How are you today?", time: "08:26 AM", unread: 5, avatar: "/1.png" },
  { id: 3, name: "lee", status: "offline", lastMsg: "Here are some files", time: "Yesterday", unread: 5, avatar: "/1.png" },
];

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState([
    { from: "Mark Smith", text: "Hey Sam! Did you check out the new logo design?", time: "02:39 PM" },
    { from: "You", text: "Not yet. Can you send it here?", time: "02:40 PM" },
    { from: "Mark Smith", text: "Sure! Please check the below logo Attached!!!", time: "02:41 PM" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "You", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-white-200">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white-200 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        <input className="w-full p-2 border rounded mb-4" placeholder="Search Keyword" />
        <h3 className="text-gray-500 text-sm mb-2">All Messages</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center justify-between p-2 cursor-pointer rounded hover:bg-gray-100 ${
                selectedUser.id === user.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.lastMsg}</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">{user.time}</div>
              {user.unread > 0 && <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{user.unread}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white-200">
          <div className="flex items-center gap-2">
            <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">{selectedUser.name}</h3>
              <p className="text-xs text-green-500">{selectedUser.status}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-sm p-2 rounded-lg shadow bg-gray-300">{msg.text}</div>
              <span className="text-xs text-gray-400 ml-2 self-end">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 border-t p-3 bg-white-200">
          <button className="p-2 text-gray-500 hover:text-blue-500"><FiSmile /></button>
          <button className="p-2 text-gray-500 hover:text-blue-500"><FiPaperclip /></button>
          <input
            className="flex-1 p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something..."
          />
          <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"><FiSend /></button>
        </div>
      </main>
      
    </div>
  );
}
