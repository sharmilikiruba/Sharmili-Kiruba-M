'use client'

import { Camera, Users, UserPlus, X, Loader2, CheckCircle2, AlertCircle, SwitchCamera, Upload } from 'lucide-react'
import { useState } from 'react'
import apiClient from '@/lib/api-client'
import CameraCapture from '@/components/shared/CameraCapture'

// No StudentSuggestion interface needed

export default function WalkInRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relation: '',
    roll_no: '',
    id_proof_type: '',
    id_proof_no: '',
    visit_purpose: '',
    remarks: '',
    visitor_photo: null as string | null,
    email: '',
  })

  const [showCamera, setShowCamera] = useState(false);

  // Student Search State removed

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name: fieldName, value } = e.target
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }


  const handlePhotoCapture = (blob: Blob, base64: string) => {
    setFormData(prev => ({
      ...prev,
      visitor_photo: base64
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          visitor_photo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Visitor name is required';
    if (!formData.phone.trim()) return 'Mobile number is required';
    if (!formData.relation) return 'Relation is required';
    if (!formData.roll_no.trim()) return 'Student Roll Number is required';
    if (!formData.id_proof_type) return 'ID proof type is required';
    if (!formData.id_proof_no.trim()) return 'ID proof number is required';
    if (!formData.visit_purpose) return 'Purpose of visit is required';

    // Email is optional but must be valid if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Invalid email address';
    }

    return null;
  };

  // handleSelectStudent removed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true)
      setError(null)

      // Step 1: Register the visitor
      const registrationPayload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        relation: formData.relation,
        roll_no: formData.roll_no,
        id_proof_type: formData.id_proof_type,
        id_proof_no: formData.id_proof_no,
        visit_purpose: formData.visit_purpose,
        remarks: formData.remarks,
        visit_date: new Date().toISOString().split('T')[0]
      }

      console.log('Registering walk-in...', registrationPayload);
      const registrationResponse = await apiClient.post('/guard/visitor/walk-in', registrationPayload)

      if (registrationResponse.data.success) {
        const visitorId = registrationResponse.data.data.visitor_id;

        // Step 2: Upload photo if available
        if (formData.visitor_photo) {
          try {
            console.log('Uploading photo for visitor:', visitorId);
            await apiClient.post('/guard/visitor/walk-in/upload-photo', {
              visitorId: visitorId,
              image: formData.visitor_photo // Sending base64 string
            });
          } catch (photoError: any) {
            console.error('Error uploading photo:', photoError);
            // We don't block the whole process if only photo upload fails, 
            // but we might want to inform the user.
            setError('Visitor registered successfully, but photo upload failed.');
          }
        }

        setSuccess('Walk-in registered and Checked In successfully! QR code sent to visitor for exit.')
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
      name: '',
      phone: '',
      relation: '',
      roll_no: '',
      id_proof_type: '',
      id_proof_no: '',
      visit_purpose: '',
      remarks: '',
      visitor_photo: null,
      email: '',
    })
  }

  return (
    <div className="flex-1 w-full opacity-100 pb-10">
      <main className="flex-1 p-4 sm:p-8">
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

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                Visitor Registration
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              {formData.visitor_photo ? (
                <div className="mb-8 text-center">
                  <img
                    src={formData.visitor_photo}
                    alt="Visitor"
                    className="w-48 h-48 object-cover rounded-lg mx-auto mb-4 border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, visitor_photo: null }))}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : showCamera ? (
                <CameraCapture
                  onCapture={handlePhotoCapture}
                  onClose={() => setShowCamera(false)}
                  title="Visitor Photo"
                />
              ) : (
                <div className="mb-8 flex flex-col items-center gap-4">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowCamera(true)}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                    >
                      <Camera className="w-4 h-4" />
                      Take Photo
                    </button>
                    <label className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visitor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="visitor@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                    Student Roll Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleInputChange}
                    placeholder="Enter student roll number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="id_proof_type"
                    value={formData.id_proof_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select ID type</option>
                    <option value="Aadhar">Aadhar</option>
                    <option value="PAN">PAN</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Passport">Passport</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="id_proof_no"
                    value={formData.id_proof_no}
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
                  name="visit_purpose"
                  value={formData.visit_purpose}
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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 order-1 sm:order-2 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <UserPlus className="h-5 w-5" />
                  )}
                  {isLoading ? 'Registering...' : 'Confirm Registration'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 order-2 sm:order-1 flex items-center justify-center gap-2 px-6 py-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-bold transition-all active:scale-[0.98]"
                >
                  <X className="h-5 w-5" />
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
