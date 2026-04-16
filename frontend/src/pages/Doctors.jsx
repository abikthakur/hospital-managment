import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', department: '', specialization: '', contact: '' });

  const fetchData = async () => {
    try {
      const [docRes, depRes] = await Promise.all([
        axios.get('/doctors'),
        axios.get('/departments')
      ]);
      setDoctors(docRes.data);
      setDepartments(depRes.data);
      if(depRes.data.length > 0) setFormData(prev => ({...prev, department: depRes.data[0]._id}));
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/doctors', formData);
      toast.success('Doctor added');
      setShowModal(false);
      fetchData();
      setFormData({ name: '', department: departments[0]?._id, specialization: '', contact: '' });
    } catch (error) {
      toast.error('Failed to add doctor');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Doctors Directory</h2>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition">
          Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doc => (
          <div key={doc._id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col items-center">
             <div className="w-16 h-16 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full text-2xl font-bold mb-4">
               {doc.name.charAt(0)}
             </div>
             <h3 className="text-lg font-bold text-slate-800">{doc.name}</h3>
             <p className="text-indigo-600 text-sm font-medium">{doc.department?.name}</p>
             <p className="text-slate-500 text-sm mt-2">{doc.specialization}</p>
             <p className="text-slate-400 text-xs mt-2">{doc.contact}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">Add Doctor</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Name" className="w-full border p-2 rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <select className="w-full border p-2 rounded-lg" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
              <input required placeholder="Specialization" className="w-full border p-2 rounded-lg" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
              <input required placeholder="Contact" className="w-full border p-2 rounded-lg" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
              
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

export default Doctors;
