'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Request } from './myrequest/types';
import { MyRequestsView } from './myrequest/MyRequestsView';
import { RequestDetailModal } from './myrequest/RequestDetailModal';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import { Loader2 } from 'lucide-react';

/* ---------------- CONSTANTS ---------------- */

const allStatuses = ['All Status', 'Pending', 'Approved', 'Rejected'];

/* ---------------- CONTAINER ---------------- */

export default function MyRequestsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mapBackendToFrontend = (v: any): Request => ({
    id: v.visitor_id.toString(),
    requestId: `REQ-${v.visitor_id.toString().padStart(4, '0')}`,
    visitorName: v.name,
    relation: v.relation,
    visitDate: new Date(v.visit_date).toLocaleDateString(),
    purpose: v.visit_purpose,
    status: v.request_status,
    visitorDetails: {
      phone: v.phone,
      address: v.address,
      idProof: v.id_proof_type + ' ' + v.id_proof_no
    },
    visitDetails: {
      reason: v.visit_purpose
    },
    qrCode: v.qr_code,
    remarks: v.remarks,
    rejectionReason: v.rejection_reason,
    approvedStartTime: v.approved_start_time,
    approvedEndTime: v.approved_end_time
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        // 1. Get student profile to resolve student_id
        const profileRes = await apiClient.get(`/students/profile/${user?.id}`);
        if (profileRes.data.success) {
          const sid = profileRes.data.data.student.student_id;

          // 2. Fetch Requests
          const res = await apiClient.get(`/visitors/student/${sid}`);
          if (res.data.success) {
            const mapped = res.data.data.map(mapBackendToFrontend);
            setRequests(mapped);
          }
        }
      } catch (error) {
        console.error('Error fetching student requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchRequests();
    }
  }, [user]);

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchName = r.visitorName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchStatus =
        selectedStatus === 'All Status' || r.status === selectedStatus;
      return matchName && matchStatus;
    });
  }, [requests, searchTerm, selectedStatus]);

  const handleOpenNewRequest = () => {
    router.push('/student/studReq');
  };

  const handleViewRequest = async (request: Request) => {
    try {
      // Fetch fresh details for the specific request
      const res = await apiClient.get(`/visitors/${request.id}`);
      if (res.data.success) {
        setSelectedRequest(mapBackendToFrontend(res.data.data));
      } else {
        setSelectedRequest(request);
      }
    } catch (error) {
      console.error('Error fetching request details:', error);
      setSelectedRequest(request);
    }
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-lg font-medium text-gray-600">Loading your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MyRequestsView
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        allStatuses={allStatuses}
        filteredRequests={filteredRequests}
        onOpenNewRequest={handleOpenNewRequest}
        onViewRequest={handleViewRequest}
      />

      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
