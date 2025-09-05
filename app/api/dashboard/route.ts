import { NextResponse } from "next/server";

// Define the type (you can also move this to a separate types file)
interface DashboardPayload {
  kpis: { label: string; value: number; change7d: number; prefix?: string }[];
  doctors7d: { date: string; value: number }[];
  patients7d: { date: string; value: number }[];
  revenue7d: { date: string; value: number }[];
  appointmentMonthly: { month: string; Completed: number; Ongoing: number; Scheduled: number }[];
  departments: { name: string; value: number }[];
  appointments: {
    id: string;
    doctor: { name: string };
    patient: { name: string };
    datetime: string;
    mode: string;
    status: string;
  }[];
  topPatients: { id: string; name: string; visits: number }[];
  transactions: { id: string; title: string; amount: number; date: string }[];
  doctorAvailability: { available: number; unavailable: number; leave: number; names: string[] };
}

// Helper to generate last 7 days data
function make7(seed: number) {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return { date: d.toISOString().slice(0, 10), value: Math.max(5, ((i + 1) * seed) % 80) };
  });
}

export async function GET() {
  const payload: DashboardPayload = {
    kpis: [
      { label: "Doctors", value: 247, change7d: 3 },
      { label: "Patients", value: 4178, change7d: 6 },
      { label: "Appointments", value: 12178, change7d: 4 },
      { label: "Revenue", value: 551240, change7d: 8, prefix: "$" },
    ],
    doctors7d: make7(9),
    patients7d: make7(13),
    revenue7d: make7(21).map((p) => ({ ...p, value: p.value * 1200 })),
    appointmentMonthly: [
      { month: "Jan", Completed: 420, Ongoing: 120, Scheduled: 80 },
      { month: "Feb", Completed: 460, Ongoing: 140, Scheduled: 95 },
      { month: "Mar", Completed: 510, Ongoing: 150, Scheduled: 100 },
      { month: "Apr", Completed: 480, Ongoing: 160, Scheduled: 110 },
      { month: "May", Completed: 530, Ongoing: 170, Scheduled: 120 },
      { month: "Jun", Completed: 520, Ongoing: 160, Scheduled: 130 },
      { month: "Jul", Completed: 490, Ongoing: 155, Scheduled: 125 },
      { month: "Aug", Completed: 510, Ongoing: 150, Scheduled: 100 },
      { month: "Sep", Completed: 500, Ongoing: 140, Scheduled: 90 },
      { month: "Oct", Completed: 560, Ongoing: 160, Scheduled: 100 },
      { month: "Nov", Completed: 540, Ongoing: 150, Scheduled: 95 },
      { month: "Dec", Completed: 580, Ongoing: 170, Scheduled: 110 },
    ],
    departments: [
      { name: "Cardiology", value: 284 },
      { name: "General", value: 205 },
      { name: "Neurology", value: 139 },
    ],
    appointments: [
      {
        id: "a1",
        doctor: { name: "Dr. John Smith" },
        patient: { name: "Alexa Adams" },
        datetime: new Date().toISOString(),
        mode: "Online",
        status: "Confirmed",
      },
      {
        id: "a2",
        doctor: { name: "Dr. Lisa Wells" },
        patient: { name: "Evan Carter" },
        datetime: new Date(Date.now() + 86400000).toISOString(),
        mode: "In-Person",
        status: "Pending",
      },
      {
        id: "a3",
        doctor: { name: "Dr. Rachel Green" },
        patient: { name: "Dennis Gill" },
        datetime: new Date(Date.now() + 2 * 86400000).toISOString(),
        mode: "Online",
        status: "Cancelled",
      },
    ],
    topPatients: [
      { id: "p1", name: "James Adams", visits: 23 },
      { id: "p2", name: "Diana Rose", visits: 21 },
      { id: "p3", name: "Sarah Cole", visits: 19 },
      { id: "p4", name: "Ethan Clark", visits: 18 },
      { id: "p5", name: "John Price", visits: 17 },
    ],
    transactions: [
      { id: "t1", title: "General Check-up", amount: 40, date: new Date().toISOString() },
      { id: "t2", title: "X-Ray", amount: 120, date: new Date().toISOString() },
      { id: "t3", title: "Online Consultation", amount: 25, date: new Date().toISOString() },
    ],
    doctorAvailability: {
      available: 48,
      unavailable: 28,
      leave: 12,
      names: ["Dr. Sarah Johnson", "Dr. Steven Joseph", "Dr. Emily Carter", "Dr. David Lee", "Dr. Michael Smith"],
    },
  };

  return NextResponse.json(payload);
}
