import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, User, Calendar, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Inquiry } from '../../types/car';

const InquiryManagement: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          car:cars(brand, model, year, price)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setInquiries(inquiries.map(inquiry => 
        inquiry.id === id ? { ...inquiry, status: status as any } : inquiry
      ));
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    filterStatus === '' || inquiry.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'interested': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading inquiries...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Inquiry Management</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="bg-orange-500/20 text-orange-500 p-2 rounded-lg mr-3">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{inquiry.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {inquiry.car && `${inquiry.car.brand} ${inquiry.car.model} (${inquiry.car.year})`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(inquiry.status)}`}>
                  {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                </span>
                <select
                  value={inquiry.status}
                  onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-orange-500" />
                <span>{inquiry.phone}</span>
              </div>
              {inquiry.email && (
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2 text-orange-500" />
                  <span>{inquiry.email}</span>
                </div>
              )}
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {inquiry.message && (
              <div className="bg-white/5 rounded-lg p-3 mb-4">
                <p className="text-gray-300 text-sm">{inquiry.message}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Inquiry #{inquiry.id.slice(0, 8)}
              </div>
              <button
                onClick={() => setSelectedInquiry(inquiry)}
                className="flex items-center px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all duration-300 text-sm"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400">No inquiries found</div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 backdrop-blur-md rounded-2xl max-w-md w-full border border-white/20 shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Inquiry Details</h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Customer Name</label>
                  <p className="text-white font-semibold">{selectedInquiry.name}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <p className="text-white">{selectedInquiry.phone}</p>
                </div>

                {selectedInquiry.email && (
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedInquiry.email}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-400">Car Interest</label>
                  <p className="text-white">
                    {selectedInquiry.car && `${selectedInquiry.car.brand} ${selectedInquiry.car.model} (${selectedInquiry.car.year})`}
                  </p>
                </div>

                {selectedInquiry.message && (
                  <div>
                    <label className="text-sm text-gray-400">Message</label>
                    <p className="text-white bg-white/5 p-3 rounded-lg">{selectedInquiry.message}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-400">Date</label>
                  <p className="text-white">{new Date(selectedInquiry.created_at).toLocaleString()}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      updateInquiryStatus(selectedInquiry.id, e.target.value);
                      setSelectedInquiry({...selectedInquiry, status: e.target.value as any});
                    }}
                    className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="interested">Interested</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;</parameter>