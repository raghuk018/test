export type KPI = {
label: 'Doctors' | 'Patients' | 'Appointments' | 'Revenue'
value: number
change7d: number
prefix?: string
}


export type SevenDayPoint = { date: string; value: number }


export type AppointmentRow = {
id: string
doctor: { name: string }
patient: { name: string }
datetime: string
mode: 'Online' | 'In-Person'
status: 'Confirmed' | 'Cancelled' | 'Pending'
}


export type PatientLite = { id: string; name: string; visits: number }
export type Transaction = { id: string; title: string; amount: number; date: string }
export type DepartmentPie = { name: string; value: number }


export type DashboardPayload = {
kpis: KPI[]
doctors7d: SevenDayPoint[]
patients7d: SevenDayPoint[]
revenue7d: SevenDayPoint[]
appointmentMonthly: { month: string; Completed: number; Ongoing: number; Scheduled: number }[]
departments: DepartmentPie[]
appointments: AppointmentRow[]
topPatients: PatientLite[]
transactions: Transaction[]
doctorAvailability: { available: number; unavailable: number; leave: number; names: string[] }
}