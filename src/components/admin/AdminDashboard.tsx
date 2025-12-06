import React, { useState, useEffect } from 'react';
import { Car, Plus, Users, MessageSquare, BarChart3, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import CarManagement from './CarManagement';
import InquiryManagement from './InquiryManagement';
import Analytics from './Analytics';
import ChatManagement from './ChatManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [stats, setStats] = useState({
    totalCars: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalViews: 0
  });
  const { user, signOut } = useAuth();

  const tabs = [
    { id: 'cars', label: 'Car Management', icon: Car },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'cars':
        return <CarManagement />;
      case 'inquiries':
        return <InquiryManagement />;
      case 'chat':
        return <ChatManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <CarManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-orange-500 text-white p-2 rounded-lg mr-3">
                <span className="font-bold text-lg">BM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Balach Motors</h1>
                <p className="text-sm text-orange-400">Admin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white">{user?.email}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Quick Stats */}
          <div className="p-4 mt-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-orange-500">{stats.totalCars}</div>
                <div className="text-xs text-gray-400">Total Cars</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-blue-400">{stats.newInquiries}</div>
                <div className="text-xs text-gray-400">New Inquiries</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;</parameter>