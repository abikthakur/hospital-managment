import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // New bill state
  const [patientId, setPatientId] = useState('');
  const [roomCharges, setRoomCharges] = useState(0);
  const [doctorFees, setDoctorFees] = useState(0);
  const [medicineCharges, setMedicineCharges] = useState(0);
  const [otherCharges, setOtherCharges] = useState(0);

  const fetchData = async () => {
    try {
      const [billRes, patientRes] = await Promise.all([
        axios.get('/bills'),
        axios.get('/patients')
      ]);
      setBills(billRes.data);
      setPatients(patientRes.data.filter(p => p.status === 'Admitted'));
    } catch {
      toast.error('Failed to load billing data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!patientId) return toast.error('Select a patient');
    try {
      await axios.post('/bills', { patientId, roomCharges, doctorFees, medicineCharges, otherCharges });
      toast.success('Bill generated');
      fetchData();
      setRoomCharges(0); setDoctorFees(0); setMedicineCharges(0); setOtherCharges(0);
    } catch {
      toast.error('Failed to generate bill');
    }
  };

  const markPaid = async (id) => {
    try {
      await axios.put(`/bills/${id}/status`, { status: 'Paid' });
      toast.success('Bill marked as paid');
      fetchData();
    } catch {
      toast.error('Failed to update status');
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Billing History</h2>
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total ($)</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.map(b => (
                <tr key={b._id}>
                  <td className="px-6 py-4">{b.patient?.name}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(b.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">${b.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {b.status === 'Unpaid' && (
                      <button onClick={() => markPaid(b._id)} className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Mark Paid</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-8">
          <h3 className="font-semibold text-lg mb-4">Generate Bill</h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <select className="w-full border p-2 rounded-lg" value={patientId} onChange={e => setPatientId(e.target.value)}>
              <option value="">Select Admitted Patient...</option>
              {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            <div>
              <label className="text-xs text-slate-500">Room Charges</label>
              <input type="number" className="w-full border p-2 rounded-lg mt-1" value={roomCharges} onChange={e => setRoomCharges(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Doctor Fees</label>
              <input type="number" className="w-full border p-2 rounded-lg mt-1" value={doctorFees} onChange={e => setDoctorFees(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Medicine Charges</label>
              <input type="number" className="w-full border p-2 rounded-lg mt-1" value={medicineCharges} onChange={e => setMedicineCharges(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Other Charges</label>
              <input type="number" className="w-full border p-2 rounded-lg mt-1" value={otherCharges} onChange={e => setOtherCharges(e.target.value)} />
            </div>
            <div className="pt-4 border-t flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>${Number(roomCharges) + Number(doctorFees) + Number(medicineCharges) + Number(otherCharges)}</span>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">Generate</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Billing;
