"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  Video,
  PhoneIncoming,
  PhoneOutgoing,
  X,
  User,
} from "lucide-react";

type CallLog = {
  id: number;
  name: string;
  type: "incoming" | "outgoing" | "missed";
  time: string;
  duration?: string;
};

const callHistory: CallLog[] = [
  { id: 1, name: "Mark Smith", type: "incoming", time: "Today 10:30 AM", duration: "15m" },
  { id: 2, name: "Eugene Sikora", type: "outgoing", time: "Yesterday 08:15 PM", duration: "5m" },
  { id: 3, name: "Robert Fassett", type: "missed", time: "Yesterday 06:45 PM" },
];

export default function CallsPage() {
  const [active, setActive] = useState<"none" | "voice" | "video">("none");
  const [mute, setMute] = useState(false);
  const [hold, setHold] = useState(false);
  const [dialPad, setDialPad] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [messages, setMessages] = useState<Array<{ from: "You" | "Remote"; text: string; ts: number }>>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (active === "none" || hold) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active, hold]);

  const resetCall = () => {
    setActive("none");
    setMute(false);
    setHold(false);
    setDialPad(false);
    setSeconds(0);
    setMessages([]);
    setInput("");
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = Date.now();
    setMessages((prev) => [...prev, { from: "You", text: input, ts: now }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "Remote", text: active === "voice" ? "I can hear you clearly!" : "Your video is clear, thanks.", ts: Date.now() },
      ]);
    }, 900);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white-200">
      {/* Sidebar - Call History */}
      <aside className="md:w-1/3 w-full md:border-r bg-white-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Call History</h2>
        <ul className="space-y-3">
          {callHistory.map((call) => (
            <li
              key={call.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{call.name}</p>
                <p className="text-xs text-gray-500">{call.time}</p>
                {call.duration && (
                  <p className="text-xs text-gray-400">Duration: {call.duration}</p>
                )}
              </div>
              {call.type === "incoming" && <PhoneIncoming className="w-5 h-5 text-green-500" />}
              {call.type === "outgoing" && <PhoneOutgoing className="w-5 h-5 text-blue-500" />}
              {call.type === "missed" && <X className="w-5 h-5 text-red-500" />}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-between p-4 md:p-6">
        {/* Buttons */}
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => setActive("voice")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow flex items-center gap-2"
          >
            <Phone className="w-5 h-5" /> Start Voice Call
          </button>
          <button
            onClick={() => setActive("video")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow flex items-center gap-2"
          >
            <Video className="w-5 h-5" /> Start Video Call
          </button>
        </div>

        {/* Top Status */}
        <div className="text-center">
          {active === "voice" && (
            <h1 className="text-2xl font-bold mb-2">Voice Call • {Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}</h1>
          )}
          {active === "video" && (
            <h1 className="text-2xl font-bold mb-2">Video Call • {Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}</h1>
          )}
          {active === "none" && <h1 className="text-xl font-semibold text-gray-600">No Active Call</h1>}
        </div>

        {/* Bottom Section with UI preview */}
        <div className="flex-1 flex items-center justify-center">
          {active === "voice" && (
            <div className="flex gap-6">
              <div className="flex flex-col items-center bg-white-200 shadow-lg rounded-2xl p-6 w-72">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex flex-col items-center">
                    <User className="w-12 h-12 text-gray-400" />
                    <span className="text-xs mt-1">You</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <User className="w-12 h-12 text-gray-400" />
                    <span className="text-xs mt-1">Mark Smith</span>
                  </div>
                </div>
                <h2 className="font-semibold mb-1">Voice Call</h2>
                <p className="text-gray-500 text-sm">Talking with Mark Smith...</p>
              <div className="mt-3 flex gap-2">
                <button onClick={()=>setMute(!mute)} className={`px-3 py-1 text-sm border rounded ${mute? 'bg-gray-200':''}`}>{mute? 'Unmute':'Mute'}</button>
                <button onClick={()=>setHold(!hold)} className={`px-3 py-1 text-sm border rounded ${hold? 'bg-gray-200':''}`}>{hold? 'Resume':'Hold'}</button>
                <button onClick={()=>setDialPad((d)=>!d)} className="px-3 py-1 text-sm border rounded">Dial</button>
              </div>
              {dialPad && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((n)=> (
                    <button key={String(n)} className="w-12 h-10 border rounded">{String(n)}</button>
                  ))}
                </div>
              )}
                <button onClick={resetCall} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow">End Call</button>
              </div>
              <div className="w-80 bg-white-200 rounded-2xl shadow p-4 flex flex-col">
                <h3 className="font-semibold mb-2">In-call chat</h3>
                <div className="flex-1 overflow-y-auto space-y-2">
                  {messages.map((m,i)=> (
                    <div key={i} className={`text-sm ${m.from==='You' ? 'text-right' : ''}`}>
                      <span className={`inline-block px-2 py-1 rounded ${m.from==='You' ? 'bg-indigo-100' : 'bg-gray-200'}`}>{m.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && sendMessage()} placeholder="Type a message" className="flex-1 border rounded px-2 py-1" />
                  <button onClick={sendMessage} className="px-3 py-1 bg-indigo-600 text-white rounded">Send</button>
                </div>
              </div>
            </div>
          )}

          {active === "video" && (
            <div className="flex gap-6 items-start">
              <div className="bg-white-200 shadow-lg rounded-2xl p-4 w-[520px]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-40 bg-black/10 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">You</span>
                  </div>
                  <div className="h-40 bg-black/20 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-700">Eugene Sikora</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=>setMute(!mute)} className={`px-3 py-1 text-sm border rounded ${mute? 'bg-gray-200':''}`}>{mute? 'Unmute':'Mute'}</button>
                  <button onClick={()=>setHold(!hold)} className={`px-3 py-1 text-sm border rounded ${hold? 'bg-gray-200':''}`}>{hold? 'Resume':'Hold'}</button>
                  <button onClick={()=>setDialPad((d)=>!d)} className="px-3 py-1 text-sm border rounded">Dial</button>
                  <button onClick={resetCall} className="ml-auto px-3 py-1 bg-red-500 text-white rounded">End</button>
                </div>
                {dialPad && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((n)=> (
                      <button key={String(n)} className="h-10 border rounded">{String(n)}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-80 bg-white-200 rounded-2xl shadow p-4 flex flex-col">
                <h3 className="font-semibold mb-2">In-call chat</h3>
                <div className="flex-1 overflow-y-auto space-y-2">
                  {messages.map((m,i)=> (
                    <div key={i} className={`text-sm ${m.from==='You' ? 'text-right' : ''}`}>
                      <span className={`inline-block px-2 py-1 rounded ${m.from==='You' ? 'bg-indigo-100' : 'bg-gray-200'}`}>{m.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && sendMessage()} placeholder="Type a message" className="flex-1 border rounded px-2 py-1" />
                  <button onClick={sendMessage} className="px-3 py-1 bg-indigo-600 text-white rounded">Send</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
    </div>
  );
}
