'use client';

import { useState } from 'react';
import {
  Search,
  Eye,
  X,
  Calendar,
  Clock,
  User,
  Home,
  Tag,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

/* ---------------- TYPES ---------------- */

interface Request {
  id: string;
  requestId: string;
  visitorName: string;
  relation: string;
  visitDate: string;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  visitorDetails: {
    phone: string;
    email: string;
    address: string;
    idProof: string;
  };
  visitDetails: {
    entryTime: string;
    exitTime: string;
    reason?: string;
  };
  qrCode?: string;
}

/* ---------------- SAMPLE DATA ---------------- */

const sampleRequests: Request[] = [
  {
    id: '1',
    requestId: 'VR001',
    visitorName: 'Suresh Sharma',
    relation: 'Father',
    visitDate: 'Jan 06, 2026',
    purpose: 'Family Visit',
    status: 'Pending',
    visitorDetails: {
      phone: '+91 98765 43210',
      email: 'suresh.sharma@email.com',
      address: '123 Main Street, Mumbai',
      idProof: 'Aadhar - XXXX 1234',
    },
    visitDetails: {
      entryTime: '02:00 PM',
      exitTime: '06:00 PM',
    },
  },
  {
    id: '2',
    requestId: 'VR002',
    visitorName: 'Kiran Sharma',
    relation: 'Mother',
    visitDate: 'Jan 04, 2026',
    purpose: 'Family Visit',
    status: 'Approved',
    visitorDetails: {
      phone: '+91 98765 43211',
      email: 'kiran.sharma@email.com',
      address: 'Mumbai',
      idProof: 'Aadhar - XXXX 5678',
    },
    visitDetails: {
      entryTime: '07:45 PM',
      exitTime: '10:00 PM',
    },
    qrCode: 'QR_VR002_APPROVED',
  },
];

const allStatuses = ['All Status', 'Pending', 'Approved', 'Rejected'];

/* ---------------- PAGE ---------------- */

export default function MyRequestsPage() {
  const router = useRouter();

  const [requests] = useState<Request[]>(sampleRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const filteredRequests = requests.filter((r) => {
    const matchName = r.visitorName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      selectedStatus === 'All Status' || r.status === selectedStatus;
    return matchName && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white p-6 rounded-lg border flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Rahul Sharma</h1>
            <p className="text-gray-600">Krishna Hostel • Room A-204</p>
          </div>

          <button
            onClick={() => router.push('/student/studReq')}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            New Request
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by visitor name"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-4 pr-10 py-2 border rounded-lg"
            >
              {allStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {[
                  'Request ID',
                  'Visitor',
                  'Relation',
                  'Date',
                  'Purpose',
                  'Status',
                  'Action',
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs text-gray-600 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{r.requestId}</td>
                  <td className="px-6 py-4">{r.visitorName}</td>
                  <td className="px-6 py-4">{r.relation}</td>
                  <td className="px-6 py-4">{r.visitDate}</td>
                  <td className="px-6 py-4">{r.purpose}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedRequest(r)}
                      className="flex items-center gap-2 text-blue-600"
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatusBadge({ status }: { status: Request['status'] }) {
  const colors = {
    Pending: 'bg-yellow-500',
    Approved: 'bg-green-600',
    Rejected: 'bg-red-600',
  };

  return (
    <span className={`${colors[status]} text-white px-3 py-1 rounded-full text-xs`}>
      {status}
    </span>
  );
}

function RequestDetailModal({
  request,
  onClose,
}: {
  request: Request;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Request {request.requestId}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <p><strong>Visitor:</strong> {request.visitorName}</p>
        <p><strong>Purpose:</strong> {request.purpose}</p>

        {request.status === 'Approved' && request.qrCode && (
          <div className="bg-blue-50 p-4 rounded text-center">
            <p className="font-mono">{request.qrCode}</p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-gray-900 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
