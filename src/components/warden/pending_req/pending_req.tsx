'use client';

import { useState, useMemo } from 'react';
import { Request } from './types';
import { PendingRequestsView } from './PendingRequestsView';
import { RequestDetailsModal } from './RequestDetailsModal';

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
  const filteredRequests = useMemo(() => {
    return requests.filter(req =>
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <>
      <PendingRequestsView
        requestsCount={requests.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filteredRequests={filteredRequests}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewDetails={handleViewDetails}
      />

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApprove={(id, name) => {
            handleApprove(id, name);
            handleCloseModal();
          }}
          onReject={(id, name) => {
            handleReject(id, name);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
}
