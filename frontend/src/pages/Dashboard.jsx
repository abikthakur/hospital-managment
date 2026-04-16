import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Users, User, BedDouble, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-4 rounded-lg ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!stats) return <div>Failed to load stats.</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.totalPatients} icon={Users} colorClass="bg-blue-500" />
        <StatCard title="Total Doctors" value={stats.totalDoctors} icon={User} colorClass="bg-emerald-500" />
        <StatCard title="Available Rooms" value={`${stats.availableRooms}/${stats.totalRooms}`} icon={BedDouble} colorClass="bg-purple-500" />
        <StatCard title="Total Revenue ($)" value={stats.totalRevenue} icon={DollarSign} colorClass="bg-amber-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">Recent Admitted Patients</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Age/Gender</th>
                <th className="px-6 py-4 font-medium">Disease</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentPatients?.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                  <td className="px-6 py-4 text-slate-600">{p.age} / {p.gender}</td>
                  <td className="px-6 py-4 text-slate-600">{p.disease}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'Admitted' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{new Date(p.admissionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {stats.recentPatients?.length === 0 && (
            <div className="p-8 text-center text-slate-500">No patients found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
