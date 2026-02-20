'use client'

import { Camera, Users, UserPlus, X, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import apiClient from '@/lib/api-client'

interface StudentSuggestion {
  id: number;
  fullName: string;
  rollNumber: string;
  roomNumber: string;
}

export default function WalkInRegistration() {
  const [showPhoto] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    relation: '',
    student_id: '',
    studentSearch: '',
    idProofType: '',
    idProofNumber: '',
    purposeOfVisit: '',
    remarks: '',
  })

  // Student Search State
  const [studentSuggestions, setStudentSuggestions] = useState<StudentSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchStudents = async (query: string) => {
    if (query.length < 2) {
      setStudentSuggestions([])
      return
    }

    try {
      setIsSearching(true)
      const response = await apiClient.get('/warden/students', {
        params: { query }
      })

      if (response.data.success) {
        const mapped = response.data.data.map((s: any) => ({
          id: s.student_id,
          fullName: s.name || s.fullName,
          rollNumber: s.roll_no || s.rollNumber,
          roomNumber: s.room_no || s.roomNumber
        }))
        setStudentSuggestions(mapped)
        setShowSuggestions(true)
      }
    } catch (err) {
      console.error('Error searching students:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'studentSearch') {
      searchStudents(value)
      if (formData.student_id) {
        setFormData(prev => ({ ...prev, student_id: '' }))
      }
    }
  }

  const handleSelectStudent = (student: StudentSuggestion) => {
    setFormData(prev => ({
      ...prev,
      student_id: student.id.toString(),
      studentSearch: `${student.fullName} (${student.rollNumber}) - Room: ${student.roomNumber}`
    }))
    setShowSuggestions(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.student_id) {
      setError('Please select a student from the lookup')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const payload = {
        name: formData.visitorName,
        phone: formData.mobileNumber,
        relation: formData.relation,
        student_id: parseInt(formData.student_id),
        id_proof_type: formData.idProofType,
        id_proof_no: formData.idProofNumber,
        visit_purpose: formData.purposeOfVisit,
        remarks: formData.remarks,
        visit_date: new Date().toISOString().split('T')[0]
      }

      const response = await apiClient.post('/visitor/walk-in', payload)

      if (response.data.success) {
        setSuccess('Walk-in registered successfully! QR code sent to visitor.')
        handleCancel()
        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(null), 5000)
      }
    } catch (err: any) {
      console.error('Error registering walk-in:', err)
      setError(err.response?.data?.message || 'Failed to register walk-in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      visitorName: '',
      mobileNumber: '',
      relation: '',
      student_id: '',
      studentSearch: '',
      idProofType: '',
      idProofNumber: '',
      purposeOfVisit: '',
      remarks: '',
    })
    setStudentSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="flex-1 w-full opacity-100">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
              <CheckCircle2 className="h-5 w-5" />
              <p>{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-2 mb-8">
              <Users className="h-6 w-6 text-gray-700" />
              <h1 className="text-2xl font-bold text-gray-900">
                Visitor Information
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              {showPhoto && (
                <div className="mb-8 flex justify-center">
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center w-48 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <Camera className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Take Photo</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visitor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="visitorName"
                    value={formData.visitorName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select relation</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Relative">Relative</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Lookup <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="studentSearch"
                      value={formData.studentSearch}
                      onChange={handleInputChange}
                      placeholder="Search by name or roll number..."
                      className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10 ${formData.student_id ? 'border-green-300 bg-green-50' : 'border-gray-300'}`}
                      autoComplete="off"
                      required
                    />
                    <div className="absolute right-3 top-3">
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      ) : (
                        <Search className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {showSuggestions && studentSuggestions.length > 0 && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                      {studentSuggestions.map((student) => (
                        <button
                          key={student.id}
                          type="button"
                          onClick={() => handleSelectStudent(student)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 flex flex-col"
                        >
                          <span className="font-medium text-gray-900">{student.fullName}</span>
                          <span className="text-xs text-gray-500">Roll: {student.rollNumber} | Room: {student.roomNumber}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {showSuggestions && studentSuggestions.length === 0 && formData.studentSearch.length >= 2 && !isSearching && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-sm text-gray-500">
                      No students found
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="idProofType"
                    value={formData.idProofType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select ID type</option>
                    <option value="Aadhaar">Aadhaar Card</option>
                    <option value="PAN">PAN Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="idProofNumber"
                    value={formData.idProofNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Visit <span className="text-red-500">*</span>
                </label>
                <select
                  name="purposeOfVisit"
                  value={formData.purposeOfVisit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select purpose</option>
                  <option value="Personal Visit">Personal Visit</option>
                  <option value="Academic">Academic</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Official">Official</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <UserPlus className="h-5 w-5" />
                  )}
                  {isLoading ? 'Registering...' : 'Register & Notify Warden'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  <X className="h-5 w-5" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
