'use client';

import { useState } from 'react';
import {
  Check,
  X,
  Eye,
  Search,
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';

interface Request {
  id: string;
  studentName: string;
  hostelBlock: string;
  room: string;
  visitorName: string;
  relation: string;
  date: string;
  time: string;
  purpose: string;
  priority: 'Normal' | 'Urgent';
  visitorPhoto: string;
  visitorDetails: {
    mobile: string;
    email: string;
    address: string;
    idProof: string;
  };
}

const initialRequests: Request[] = [
  {
    id: 'VR001',
    studentName: 'Rahul Sharma',
    hostelBlock: 'Krishna Hostel',
    room: 'Room A-204',
    visitorName: 'Suresh Sharma',
    relation: 'Father',
    date: 'Jan 06, 2026',
    time: '10:00',
    purpose: 'Family Visit',
    priority: 'Normal',
    visitorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    visitorDetails: {
      mobile: '+91 98765 43210',
      email: 'suresh.sharma@example.com',
      address: '123, Civil Lines, Jaipur, Rajasthan',
      idProof: 'Aadhaar Card - XXXX 1234'
    }
  },
  {
    id: 'VR002',
    studentName: 'Amit Patel',
    hostelBlock: 'Saraswati Hostel',
    room: 'Room B-105',
    visitorName: 'Priya Patel',
    relation: 'Sister',
    date: 'Jan 07, 2026',
    time: '14:30',
    purpose: 'Document Delivery',
    priority: 'Urgent',
    visitorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    visitorDetails: {
      mobile: '+91 98765 87654',
      email: 'priya.patel@example.com',
      address: '45, MG Road, Ahmedabad, Gujarat',
      idProof: 'Driving License - DL1234567890'
    }
  },
];

export default function PendingRequestsPage() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter requests
  const filteredRequests = requests.filter(req =>
    req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id: string, name: string) => {
    if (confirm(`Are you sure you want to APPROVE the request for ${name}?`)) {
      setRequests(prev => prev.filter(req => req.id !== id));
      // In a real app, this would make an API call to update status to 'Approved'
      alert(`Request ${id} has been Approved.`);
    }
  };

  const handleReject = (id: string, name: string) => {
    if (confirm(`Are you sure you want to REJECT the request for ${name}?`)) {
      setRequests(prev => prev.filter(req => req.id !== id));
      // In a real app, this would make an API call to update status to 'Rejected'
      alert(`Request ${id} has been Rejected.`);
    }
  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pending Requests</h1>
        <p className="text-gray-500 mt-1">
          {requests.length} requests awaiting your decision
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Visitor Requests
          </h2>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Request ID</th>
                <th className="text-left px-6 py-3 font-medium">Student</th>
                <th className="text-left px-6 py-3 font-medium">Visitor</th>
                <th className="text-left px-6 py-3 font-medium">Visit Date</th>
                <th className="text-left px-6 py-3 font-medium">Purpose</th>
                <th className="text-left px-6 py-3 font-medium">Priority</th>
                <th className="text-center px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {req.id}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {req.studentName}
                      </p>
                      <p className="text-xs text-gray-500">{req.room}</p>
                    </td>

                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={req.visitorPhoto}
                        alt="visitor"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {req.visitorName}
                        </p>
                        <p className="text-xs text-gray-500">{req.relation}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-gray-900">{req.date}</p>
                      <p className="text-xs text-gray-500">{req.time}</p>
                    </td>

                    <td className="px-6 py-4">{req.purpose}</td>

                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${req.priority === 'Urgent'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                        }`}>
                        {req.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleApprove(req.id, req.visitorName)}
                          className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors"
                          title="Approve Request"
                        >
                          <Check className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handleReject(req.id, req.visitorName)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
                          title="Reject Request"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => handleViewDetails(req)}
                          className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No pending requests found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  ID: <span className="font-mono text-gray-700">{selectedRequest.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${selectedRequest.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {selectedRequest.priority}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* Visitor Profile */}
              <div className="flex items-start gap-6 mb-8">
                <img
                  src={selectedRequest.visitorPhoto}
                  alt={selectedRequest.visitorName}
                  className="w-24 h-24 rounded-2xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{selectedRequest.visitorName}</h4>
                  <p className="text-gray-600 font-medium mb-3">{selectedRequest.relation}</p>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{selectedRequest.visitorDetails.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{selectedRequest.visitorDetails.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{selectedRequest.visitorDetails.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Info */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Student Details
                  </h5>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{selectedRequest.studentName}</p>
                    <p className="text-xs text-gray-600">{selectedRequest.hostelBlock}</p>
                    <p className="text-xs text-gray-600">{selectedRequest.room}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <h5 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Visit Schedule
                  </h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">{selectedRequest.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-gray-900">{selectedRequest.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Purpose:</span>
                      <span className="font-medium text-gray-900">{selectedRequest.purpose}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Proof Section */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  ID Verification
                </h5>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
                  <div className="text-sm text-blue-800">
                    <span className="font-semibold">ID Proof Provided:</span> {selectedRequest.visitorDetails.idProof}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer (Actions) */}
            <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  handleReject(selectedRequest.id, selectedRequest.visitorName);
                  setIsModalOpen(false);
                }}
                className="px-5 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                Reject Request
              </button>
              <button
                onClick={() => {
                  handleApprove(selectedRequest.id, selectedRequest.visitorName);
                  setIsModalOpen(false);
                }}
                className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition-all hover:shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Approve Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
