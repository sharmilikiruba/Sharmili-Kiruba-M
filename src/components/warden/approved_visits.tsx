"use client"
import React, { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Users,
  BarChart3,
  Search,
  Loader2
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import apiClient from '@/lib/api-client'
import { RequestDetailsModal } from './pending_req/RequestDetailsModal'
import { Request } from './pending_req/types'

const ApprovedVisitsPage = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [approvedRequests, setApprovedRequests] = useState<any[]>([])
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const fetchApprovedRequests = async () => {
    try {
      setIsLoading(true)
      // 1. Resolve Hostel ID
      const profileRes = await apiClient.get(`/warden/profile/${user?.id}`)
      if (profileRes.data.success) {
        const hostelId = profileRes.data.data.profile.hostel_id

        if (hostelId) {
          // 2. Fetch Approved Visitors
          const params = searchTerm ? { query: searchTerm } : {}
          const res = await apiClient.get(`/warden/visitors/approved/${hostelId}`, { params })
          if (res.data.success) {
            setApprovedRequests(res.data.data.map((r: any) => ({
              ...r, // Keep raw data for details
              id: `REQ-${r.visitor_id.toString().padStart(4, '0')}`,
              student: r.student?.fullName || 'N/A',
              room: r.student?.room_no || 'N/A',
              visitor: r.name,
              relation: r.relation || 'N/A',
              visitDate: new Date(r.visit_date).toLocaleDateString(),
              approvedTime: r.approved_time || r.visit_from_time,
              status: 'Approved'
            })))
          }
        }
      }
    } catch (error) {
      console.error('Error fetching approved requests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = async (request: any) => {
    try {
      // First set basic info from the row
      const initialRequest = mapBackendToFrontend(request.rawData || request); // Adjust based on how we store it
      setSelectedRequest(initialRequest);
      setIsModalOpen(true);

      // Fetch full details
      const visitorId = request.visitor_id || request.id.replace('REQ-', '').replace(/^0+/, '');
      const res = await apiClient.get(`/warden/visitors/${visitorId}`);
      if (res.data.success) {
        setSelectedRequest(mapBackendToFrontend(res.data.data));
      }
    } catch (error) {
      console.error('Error fetching visitor details:', error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchApprovedRequests()
    }
  }, [user, searchTerm])

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Approved Visits
              </h1>
              <p className="text-gray-600">
                {approvedRequests.length} approved visitor requests
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Approved Requests
                  </h2>

                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search by student or visitor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                </div>
              </div>

              {isLoading && approvedRequests.length === 0 ? (
                <div className="py-20 text-center">
                  <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
                  <p className="text-lg font-medium text-gray-600">Retrieving approved visits...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Request ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Visitor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Visit Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Approved Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {approvedRequests.length > 0 ? (
                        approvedRequests.map((request) => (
                          <tr
                            key={request.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm font-semibold">
                              {request.id}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium">
                                {request.student}
                              </div>
                              <div className="text-xs text-gray-500">
                                {request.room}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium">
                                {request.visitor}
                              </div>
                              <div className="text-xs text-gray-500">
                                {request.relation}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {request.visitDate}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-blue-600">
                              {request.approvedTime}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleViewDetails(request)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-12 text-center text-sm text-gray-500 italic"
                          >
                            No matching approved records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          onApprove={() => { }} // Not needed for approved visits
          onReject={() => { }} // Not needed for approved visits
        />
      )}
    </div>
  )
}

export default ApprovedVisitsPage
