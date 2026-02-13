'use client';

import { useState, useMemo } from 'react';
import { Request } from './types';
import { PendingRequestsView } from './PendingRequestsView';
import { RequestDetailsModal } from './RequestDetailsModal';
import { ActionRemarksModal } from './ActionRemarksModal';

const initialRequests: Request[] = [];

export default function PendingRequestsPage() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState<{ open: boolean; type: 'Approve' | 'Reject'; requestId: string; visitorName: string } | null>(null);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req =>
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  const handleApprove = (id: string, name: string) => {
    setActionModal({ open: true, type: 'Approve', requestId: id, visitorName: name });
  };

  const handleReject = (id: string, name: string) => {
    setActionModal({ open: true, type: 'Reject', requestId: id, visitorName: name });
  };

  const handleConfirmAction = (remarks: string, startTime?: string, endTime?: string) => {
    if (!actionModal) return;
    const { type, requestId } = actionModal;

    setRequests(prev => prev.filter(req => req.id !== requestId));
    // In a real app, this would make an API call with the remarks/reason and times
    console.log(`${type} request ${requestId} with remarks: ${remarks}, time: ${startTime}-${endTime}`);
    alert(`Request ${requestId} has been ${type}ed.`);
    setActionModal(null);
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

      {actionModal && (
        <ActionRemarksModal
          isOpen={actionModal.open}
          type={actionModal.type}
          visitorName={actionModal.visitorName}
          onClose={() => setActionModal(null)}
          onConfirm={handleConfirmAction}
        />
      )}
    </>
  );
}
