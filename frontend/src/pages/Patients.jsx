import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit } from 'lucide-react';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', contact: '', address: '', disease: '' });

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get('/patients');
      setPatients(data);
    } catch (error) {
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/patients', formData);
      toast.success('Patient added');
      setShowModal(false);
      fetchPatients();
      setFormData({ name: '', age: '', gender: 'Male', contact: '', address: '', disease: '' });
    } catch (error) {
      toast.error('Failed to add patient');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete patient?')) return;
    try {
      await axios.delete(`/patients/${id}`);
      toast.success('Patient deleted');
      fetchPatients();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Patients List</h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
          <Plus className="w-4 h-4" /> Add Patient
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Details</th>
                <th className="px-6 py-4 font-medium">Disease</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                  <td className="px-6 py-4 text-slate-600">{p.age}y / {p.gender}<br/><span className="text-xs text-slate-400">{p.contact}</span></td>
                  <td className="px-6 py-4 text-slate-600">{p.disease}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'Admitted' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        {patients.length === 0 && <div className="p-8 text-center text-slate-500">No patients found.</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">Add New Patient</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input required placeholder="Name" className="w-full border p-2 rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <input required type="number" placeholder="Age" className="w-full border p-2 rounded-lg" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                <select className="w-full border p-2 rounded-lg" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <input required placeholder="Contact Number" className="w-full border p-2 rounded-lg" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
              </div>
              <div>
                <input required placeholder="Address" className="w-full border p-2 rounded-lg" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <input required placeholder="Disease" className="w-full border p-2 rounded-lg" value={formData.disease} onChange={e => setFormData({...formData, disease: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
