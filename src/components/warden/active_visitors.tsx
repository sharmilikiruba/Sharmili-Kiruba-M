"use client"

import React, { useState, useEffect } from "react"
import { Search, Phone, Clock, Loader2, User } from "lucide-react"
import { useAuth } from '@/context/AuthContext'
import apiClient from '@/lib/api-client'
import { RequestDetailsModal } from './pending_req/RequestDetailsModal'
import { Request } from './pending_req/types'

export default function ActiveVisitorsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeVisitors, setActiveVisitors] = useState<any[]>([])
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

  const fetchActiveVisitors = async () => {
    try {
      setIsLoading(true)
      // 1. Resolve Hostel ID
      const profileRes = await apiClient.get(`/warden/profile/${user?.id}`)
      if (profileRes.data.success) {
        const hostelId = profileRes.data.data.profile.hostel_id

        if (hostelId) {
          // 2. Fetch Active Visitors
          const params = searchTerm ? { query: searchTerm } : {}
          const res = await apiClient.get(`/warden/visitors/active/${hostelId}`, { params })
          if (res.data.success) {
            setActiveVisitors(res.data.data.map((v: any) => ({
              id: v.visitor_id,
              visitorName: v.name,
              studentName: v.student?.fullName || 'N/A',
              room: v.student?.room_no || 'N/A',
              phone: v.phone || 'N/A',
              since: v.logs && v.logs.length > 0 ? v.logs[0].entry_time : '-',
              status: 'In Premise',
              photo: v.visitor_photo
            })))
          }
        }
      }
    } catch (error) {
      console.error('Error fetching active visitors:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = async (visitor: any) => {
    try {
      setSelectedRequest(mapBackendToFrontend(visitor));
      setIsModalOpen(true);
      const res = await apiClient.get(`/warden/visitors/${visitor.id}`);
      if (res.data.success) {
        setSelectedRequest(mapBackendToFrontend(res.data.data));
      }
    } catch (error) {
      console.error('Error fetching visitor details:', error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchActiveVisitors()
    }
  }, [user, searchTerm])

  return (
    <main className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Active Visitors</h1>
        <p className="text-gray-600 text-sm md:text-base">
          {activeVisitors.length} visitors currently inside the premises
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Currently Active
          </h2>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Visitor Cards */}
        {isLoading && activeVisitors.length === 0 ? (
          <div className="py-20 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-lg font-medium text-gray-600">Tracking active visitors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {activeVisitors.length > 0 ? (
              activeVisitors.map((visitor) => (
                <div
                  key={visitor.id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gray-50/50"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar / Photo */}
                      {visitor.photo ? (
                        <img src={visitor.photo} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                          {visitor.visitorName.charAt(0)}
                        </div>
                      )}

                      {/* Info */}
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {visitor.visitorName}
                        </p>
                        <p className="text-sm text-gray-600 font-medium">
                          Visiting {visitor.studentName}
                        </p>
                        <p className="text-xs text-gray-500">Room: {visitor.room_no}</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      {visitor.status}
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    {/* Entry Time */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">Entered at:</span> {visitor.since}
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700">Phone:</span> {visitor.phone}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium italic">No visitors currently active in the hostel.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          onApprove={() => { }}
          onReject={() => { }}
        />
      )}
    </main>
  )
}
