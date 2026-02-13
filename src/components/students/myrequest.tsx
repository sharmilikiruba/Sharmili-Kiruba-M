'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Request } from './myrequest/types';
import { MyRequestsView } from './myrequest/MyRequestsView';
import { RequestDetailModal } from './myrequest/RequestDetailModal';

/* ---------------- SAMPLE DATA ---------------- */

const sampleRequests: Request[] = [];

const allStatuses = ['All Status', 'Pending', 'Approved', 'Rejected'];

/* ---------------- CONTAINER ---------------- */

export default function MyRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<Request[]>(sampleRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    // Load requests from window object (temporary storage simulated as a data source)
    if (typeof window !== 'undefined' && (window as any).visitorRequests) {
      const storedRequests = (window as any).visitorRequests as Request[];
      const combinedRequests = [...storedRequests, ...sampleRequests];

      // simplistic deduplication by ID
      const uniqueRequests = Array.from(
        new Map(combinedRequests.map(item => [item.id, item])).values()
      );

      setRequests(uniqueRequests);
    }
  }, []);

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

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

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
