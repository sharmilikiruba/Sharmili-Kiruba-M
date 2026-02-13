'use client'

import { Camera, Users, UserPlus, X } from 'lucide-react'
import { useState } from 'react'

export default function WalkInRegistration() {
  const [showPhoto] = useState(true)
  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    relation: '',
    student: '',
    idProofType: '',
    idProofNumber: '',
    purposeOfVisit: '',
    remarks: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleCancel = () => {
    setFormData({
      visitorName: '',
      mobileNumber: '',
      relation: '',
      student: '',
      idProofType: '',
      idProofNumber: '',
      purposeOfVisit: '',
      remarks: '',
    })
  }

  return (
    <div className="flex-1 w-full opacity-100">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="student"
                    value={formData.student}
                    onChange={handleInputChange}
                    placeholder="Enter student name & room"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
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
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  <UserPlus className="h-5 w-5" />
                  Register & Notify Warden
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
