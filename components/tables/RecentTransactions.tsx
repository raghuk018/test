'use client'

import { useEffect, useState } from "react";

type Txn = { id: number; title: string; amount: number; date: string };

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Txn[]>([]);
  const [selected, setSelected] = useState<Txn | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/transactions');
        const json = await res.json();
        setTransactions(json.transactions || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading transactions…</div>;
  }

  return (
    <div className="bg-white-200 shadow rounded-lg p-4">
      <h3 className="font-semibold mb-3">Recent Payments</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2">Title</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="py-2">{t.title}</td>
              <td className="py-2 font-medium">${t.amount}</td>
              <td className="py-2">{new Date(t.date).toLocaleString()}</td>
              <td className="py-2 text-right">
                <button onClick={() => setSelected(t)} className="text-blue-600">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-md shadow-lg w-96 p-4" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-semibold mb-2">Payment Details</h4>
            <div className="text-sm space-y-1">
              <p><span className="text-gray-500">Title:</span> {selected.title}</p>
              <p><span className="text-gray-500">Amount:</span> ${selected.amount}</p>
              <p><span className="text-gray-500">Date:</span> {new Date(selected.date).toLocaleString()}</p>
              <p><span className="text-gray-500">Transaction ID:</span> {selected.id}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setSelected(null)} className="px-3 py-1 rounded border">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



