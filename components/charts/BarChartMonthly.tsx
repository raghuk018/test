'use client'

import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Users, CalendarDays, Stethoscope } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', appointments: 120, patients: 80 },
  { month: 'Feb', appointments: 150, patients: 95 },
  { month: 'Mar', appointments: 170, patients: 110 },
  { month: 'Apr', appointments: 140, patients: 90 },
  { month: 'May', appointments: 200, patients: 130 },
  { month: 'Jun', appointments: 180, patients: 120 },
  { month: 'Jul', appointments: 220, patients: 150 },
  { month: 'Aug', appointments: 210, patients: 140 },
  { month: 'Sep', appointments: 190, patients: 125 },
  { month: 'Oct', appointments: 230, patients: 160 },
  { month: 'Nov', appointments: 210, patients: 140 },
  { month: 'Dec', appointments: 250, patients: 170 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 shadow rounded-xl">
          <CardContent className="flex items-center gap-3">
            <Users className="text-brand-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-lg font-semibold">1,245</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4 shadow rounded-xl">
          <CardContent className="flex items-center gap-3">
            <CalendarDays className="text-brand-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-lg font-semibold">985</p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-4 shadow rounded-xl">
          <CardContent className="flex items-center gap-3">
            <Stethoscope className="text-brand-500" size={28} />
            <div>
              <p className="text-sm text-gray-500">Doctors</p>
              <p className="text-lg font-semibold">32</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appointments Bar Chart */}
        <Card className="p-4 shadow rounded-xl">
          <h2 className="text-base font-semibold mb-4">Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Patients Line Chart */}
        <Card className="p-4 shadow rounded-xl">
          <h2 className="text-base font-semibold mb-4">Monthly Patients</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
