import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Car, MessageSquare, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalInquiries: 0,
    newInquiries: 0,
    verifiedCars: 0,
    popularBrands: [] as { brand: string; count: number }[],
    recentActivity: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch total cars
      const { count: totalCars } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true });

      // Fetch verified cars
      const { count: verifiedCars } = await supabase
        .from('cars')
        .select('*', { count: 'exact', head: true })
        .eq('isVerified', true);

      // Fetch total inquiries
      const { count: totalInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      // Fetch new inquiries
      const { count: newInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      // Fetch popular brands
      const { data: brandsData } = await supabase
        .from('cars')
        .select('brand')
        .order('brand');

      const brandCounts = brandsData?.reduce((acc: any, car) => {
        acc[car.brand] = (acc[car.brand] || 0) + 1;
        return acc;
      }, {}) || {};

      const popularBrands = Object.entries(brandCounts)
        .map(([brand, count]) => ({ brand, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Fetch recent activity (recent inquiries)
      const { data: recentActivity } = await supabase
        .from('inquiries')
        .select(`
          *,
          car:cars(brand, model, year)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      setStats({
        totalCars: totalCars || 0,
        totalInquiries: totalInquiries || 0,
        newInquiries: newInquiries || 0,
        verifiedCars: verifiedCars || 0,
        popularBrands,
        recentActivity: recentActivity || []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Cars</p>
              <p className="text-3xl font-bold text-white">{stats.totalCars}</p>
            </div>
            <div className="bg-orange-500/20 text-orange-500 p-3 rounded-xl">
              <Car className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Verified Cars</p>
              <p className="text-3xl font-bold text-white">{stats.verifiedCars}</p>
            </div>
            <div className="bg-green-500/20 text-green-500 p-3 rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Inquiries</p>
              <p className="text-3xl font-bold text-white">{stats.totalInquiries}</p>
            </div>
            <div className="bg-blue-500/20 text-blue-500 p-3 rounded-xl">
              <MessageSquare className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">New Inquiries</p>
              <p className="text-3xl font-bold text-white">{stats.newInquiries}</p>
            </div>
            <div className="bg-yellow-500/20 text-yellow-500 p-3 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Popular Brands */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-orange-500" />
            Popular Brands
          </h3>
          <div className="space-y-4">
            {stats.popularBrands.map((brand, index) => (
              <div key={brand.brand} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{brand.brand}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/10 rounded-full h-2 w-20 mr-3">
                    <div 
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(brand.count / stats.totalCars) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm">{brand.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-orange-500" />
            Recent Activity
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="bg-blue-500/20 text-blue-500 p-2 rounded-lg">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-semibold">{activity.name}</span> inquired about{' '}
                    {activity.car && `${activity.car.brand} ${activity.car.model}`}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;