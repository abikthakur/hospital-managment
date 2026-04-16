import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, User, Layers, BedDouble, Receipt, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/patients', label: 'Patients', icon: Users },
    { path: '/doctors', label: 'Doctors', icon: User },
    { path: '/departments', label: 'Departments', icon: Layers },
    { path: '/rooms', label: 'Rooms', icon: BedDouble },
    { path: '/billing', label: 'Billing', icon: Receipt },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BedDouble className="text-white w-6 h-6" />
          </div>
          <h1 className="font-bold text-lg text-slate-800 leading-tight">CareHub<br/><span className="text-sm font-normal text-slate-500">Admin Panel</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="text-sm">
              <p className="font-semibold text-slate-800">{user?.name}</p>
              <p className="text-slate-500 text-xs truncate max-w-[150px]">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center h-16">
          <h2 className="text-xl font-semibold text-slate-800 capitalize">
            {location.pathname.split('/')[1] || 'Dashboard'}
          </h2>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
