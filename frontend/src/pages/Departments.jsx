import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get('/departments');
      setDepartments(data);
    } catch {
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDepartments(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/departments', { name, description });
      toast.success('Department created');
      fetchDepartments();
      setName(''); setDescription('');
    } catch {
      toast.error('Failed to create department');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Departments</h2>
        {departments.map(d => (
          <div key={d._id} className="bg-white p-5 rounded-xl border flex justify-between items-start shadow-sm">
            <div>
              <h3 className="font-bold text-lg text-indigo-700">{d.name}</h3>
              <p className="text-slate-600 mt-1">{d.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-8">
          <h3 className="font-semibold text-lg mb-4">Add Department</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Department Name" className="w-full border p-2 rounded-lg focus:ring focus:border-indigo-500" value={name} onChange={e => setName(e.target.value)} />
            <textarea placeholder="Description" rows={4} className="w-full border p-2 rounded-lg focus:ring focus:border-indigo-500" value={description} onChange={e => setDescription(e.target.value)} />
            <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Departments;
