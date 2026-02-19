'use client';

import { useState, useMemo, useEffect } from 'react';
import { Request } from './types';
import { PendingRequestsView } from './PendingRequestsView';
import { RequestDetailsModal } from './RequestDetailsModal';
import { ActionRemarksModal } from './ActionRemarksModal';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import { Loader2 } from 'lucide-react';

export default function PendingRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wardenInfo, setWardenInfo] = useState<any>(null);
  const [actionModal, setActionModal] = useState<{ open: boolean; type: 'Approve' | 'Reject'; requestId: string; visitorName: string } | null>(null);

  const mapBackendToFrontend = (r: any): Request => ({
    id: r.visitor_id.toString(),
    visitorName: r.name,
    studentName: r.student?.fullName || 'N/A',
    hostelBlock: r.student?.hostel?.name || 'N/A',
    room: r.student?.room_no || 'N/A',
    relation: r.relation || 'N/A',
    date: new Date(r.visit_date).toLocaleDateString(),
    time: `${r.visit_from_time} - ${r.visit_to_time}`,
    purpose: r.visit_purpose || 'N/A',
    priority: r.visit_purpose === 'Urgent' ? 'Urgent' : 'Normal',
    visitorPhoto: r.visitor_photo || '',
    visitorDetails: {
      mobile: r.phone || 'N/A',
      email: r.email || 'N/A',
      address: r.address || 'N/A',
      idProof: `${r.id_proof_type}: ${r.id_proof_no}`
    }
  });

  const fetchPendingRequests = async () => {
    try {
      setIsLoading(true);
      // 1. Get Warden Profile
      const profileRes = await apiClient.get(`/warden/profile/${user?.id}`);
      if (profileRes.data.success) {
        const profile = profileRes.data.data.profile;
        setWardenInfo(profile);
        const hostelId = profile.hostel_id;

        if (hostelId) {
          // 2. Fetch Pending Requests
          const res = await apiClient.get(`/warden/visitors/pending/${hostelId}`);
          if (res.data.success) {
            setRequests(res.data.data.map(mapBackendToFrontend));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPendingRequests();
    }
  }, [user]);

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

  const handleConfirmAction = async (remarks: string, startTime?: string, endTime?: string) => {
    if (!actionModal || !wardenInfo) return;
    const { type, requestId } = actionModal;

    try {
      if (type === 'Approve') {
        await apiClient.patch(`/warden/visitors/${requestId}/approve`, {
          remarks,
          approvedTime: startTime ? `${startTime}-${endTime}` : undefined,
          employeeId: wardenInfo.emp_id
        });
      } else {
        await apiClient.patch(`/warden/visitors/${requestId}/reject`, {
          reason: remarks,
          employeeId: wardenInfo.emp_id
        });
      }

      setRequests(prev => prev.filter(req => req.id !== requestId));
      setActionModal(null);
    } catch (error) {
      console.error(`Error performing ${type} action:`, error);
      alert(`Failed to ${type} the request. Please try again.`);
    }
  };

  const handleViewDetails = async (request: Request) => {
    try {
      setSelectedRequest(request);
      setIsModalOpen(true);
      // Fetch full details if needed (optional since list might have most, but good to follow user's GET request)
      const res = await apiClient.get(`/warden/visitors/${request.id}`);
      if (res.data.success) {
        const fullData = res.data.data;
        setSelectedRequest(mapBackendToFrontend(fullData));
      }
    } catch (error) {
      console.error('Error fetching visitor details:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-lg font-medium text-gray-600">Loading pending requests...</p>
        </div>
      </div>
    );
  }

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
