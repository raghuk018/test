'use client'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'


export default function StatCard({ title, value, change, prefix }: { title:string; value:number; change:number; prefix?:string }){
const up = change >= 0
return (
<div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4">
<div className="text-sm text-gray-500">{title}</div>
<div className="mt-2 flex items-end justify-between">
<div className="text-2xl font-semibold">{prefix}{value.toLocaleString()}</div>
<div className={`flex items-center text-xs px-2 py-1 rounded-full ${up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
{up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {Math.abs(change)}% 7d
</div>
</div>
</div>
)
}