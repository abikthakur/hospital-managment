import { useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // new room form
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState('General');
  const [floor, setFloor] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');

  const fetchData = async () => {
    try {
      const [roomRes, patientRes] = await Promise.all([
        axios.get('/rooms'),
        axios.get('/patients')
      ]);
      setRooms(roomRes.data);
      setPatients(patientRes.data.filter(p => p.status === 'Admitted')); // only admitted can be assigned
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/rooms', { roomNumber, type, floor, pricePerDay });
      toast.success('Room added');
      fetchData();
      setRoomNumber(''); setFloor(''); setPricePerDay('');
    } catch {
      toast.error('Failed to add room');
    }
  };

  const handleAssign = async (roomId, patientId) => {
    if(!patientId) return toast.error('Select a patient');
    try {
      await axios.put(`/rooms/${roomId}/assign`, { patientId });
      toast.success('Assigned');
      fetchData();
    } catch {
      toast.error('Failed to assign');
    }
  };

  const handleVacate = async (roomId) => {
    try {
      await axios.put(`/rooms/${roomId}/vacate`);
      toast.success('Vacated');
      fetchData();
    } catch {
      toast.error('Failed to vacate');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Rooms Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map(r => (
            <div key={r._id} className={`p-5 rounded-xl border shadow-sm ${r.isAvailable ? 'bg-white border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{r.roomNumber} <span className="text-sm font-normal text-slate-500">({r.type})</span></h3>
                <span className={`px-2 py-1 text-xs rounded-full ${r.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {r.isAvailable ? 'Available' : 'Occupied'}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4">Floor {r.floor} • ${r.pricePerDay}/day</p>

              {!r.isAvailable ? (
                <div className="mt-4 pt-4 border-t border-red-200 flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Patient: {r.currentPatient?.name || 'Unknown'}</span>
                  <button onClick={() => handleVacate(r._id)} className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Vacate</button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                  <select id={`assign-${r._id}`} className="text-sm border flex-1 p-1 rounded">
                    <option value="">Select Patient...</option>
                    {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                  <button onClick={() => {
                    const sel = document.getElementById(`assign-${r._id}`);
                    handleAssign(r._id, sel.value);
                  }} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Assign</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-8">
          <h3 className="font-semibold text-lg mb-4">Add Room</h3>
          <form onSubmit={handleAddRoom} className="space-y-4">
            <input required placeholder="Room Number (e.g. 101)" className="w-full border p-2 rounded-lg" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
            <select className="w-full border p-2 rounded-lg" value={type} onChange={e => setType(e.target.value)}>
              <option>General</option>
              <option>Semi-Private</option>
              <option>Private</option>
              <option>ICU</option>
            </select>
            <input required placeholder="Floor" className="w-full border p-2 rounded-lg" value={floor} onChange={e => setFloor(e.target.value)} />
            <input required type="number" placeholder="Price Per Day ($)" className="w-full border p-2 rounded-lg" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} />
            <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">Add Room</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
