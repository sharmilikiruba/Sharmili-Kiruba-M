'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, X, Save, Send, Trash2, Loader2, SwitchCamera, Upload } from 'lucide-react';
import CameraCapture from '@/components/shared/CameraCapture';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import apiClient, { uploadPhoto } from '@/lib/api-client';

const NewVisitorRequestPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingStudent, setFetchingStudent] = useState(true);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    rollNumber: '',
    hostelName: '',
    roomNumber: '',
    profileImage: '',
    student_id: 0
  });

  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    visitorEmail: '',
    relation: '',
    gender: 'M',
    visitorPhoto: null,
    idProofType: 'Aadhar',
    idProofNumber: '',
    visitorAddress: '',
    purpose: 'Family Visit',
    visitDate: '',
    visitStartTime: '',
    visitEndTime: '',
    accompanyingPersons: '0'
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showDraftMessage, setShowDraftMessage] = useState(false);

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setFetchingStudent(true);
        const response = await apiClient.get(`/students/profile/${user?.id}`);
        if (response.data.success) {
          const data = response.data.data.student;
          setStudentInfo({
            name: data.fullName,
            rollNumber: data.rollNumber,
            hostelName: data.hostel?.hostel_name || 'N/A',
            roomNumber: data.room?.room_no || 'N/A',
            profileImage: '', // No profile image in student entity yet
            student_id: data.student_id
          });
        }
      } catch (error) {
        console.error('Error fetching student info:', error);
      } finally {
        setFetchingStudent(false);
      }
    };

    if (user?.id) {
      fetchStudent();
    }
  }, [user]);

  // Handle persistence in local storage during form filling
  const DRAFT_KEY = `visitor_draft_local_${user?.id}`;

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhotoCapture = (url: string, blob: Blob) => {
    setPhotoPreview(url);
    setFormData({ ...formData, visitorPhoto: url as any });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        const url = await uploadPhoto(file);
        setPhotoPreview(url);
        setFormData({ ...formData, visitorPhoto: url as any });
      } catch (error: any) {
        alert('Failed to upload photo: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData({ ...formData, visitorPhoto: null });
  };

  const handleSaveDraft = async () => {
    try {
      setIsLoading(true);
      const payload = {
        name: formData.visitorName,
        phone: formData.mobileNumber,
        relation: formData.relation,
        gender: formData.gender,
        id_proof_type: formData.idProofType,
        id_proof_no: formData.idProofNumber,
        address: formData.visitorAddress,
        visit_purpose: formData.purpose,
        visit_date: formData.visitDate,
        visit_from_time: formData.visitStartTime,
        visit_to_time: formData.visitEndTime,
        student_id: studentInfo.student_id,
        accompanying_persons: parseInt(formData.accompanyingPersons) || 0,
        visitor_photo: photoPreview,
        email: formData.visitorEmail
      };

      const response = await apiClient.post('/visitors/draft', payload);
      if (response.data.success) {
        setShowDraftMessage(true);
        setTimeout(() => setShowDraftMessage(false), 3000);
        alert('Draft saved to cloud successfully!');
      }
    } catch (error: any) {
      alert('Failed to save draft: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      setFormData({
        visitorName: '',
        mobileNumber: '',
        visitorEmail: '',
        relation: '',
        gender: 'M',
        visitorPhoto: null,
        idProofType: 'Aadhar',
        idProofNumber: '',
        visitorAddress: '',
        purpose: 'Family Visit',
        visitDate: '',
        visitStartTime: '',
        visitEndTime: '',
        accompanyingPersons: '0'
      });
      setPhotoPreview(null);
      alert('Form reset successfully.');
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.visitorName || !formData.mobileNumber || !formData.relation ||
      !formData.purpose || !formData.visitDate) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    if (!studentInfo.student_id) {
      alert('Student identification not loaded yet. Please wait a moment.');
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        name: formData.visitorName,
        phone: formData.mobileNumber,
        relation: formData.relation,
        gender: formData.gender,
        id_proof_type: formData.idProofType,
        id_proof_no: formData.idProofNumber,
        address: formData.visitorAddress,
        visit_purpose: formData.purpose,
        visit_date: formData.visitDate,
        visit_from_time: formData.visitStartTime,
        visit_to_time: formData.visitEndTime,
        student_id: studentInfo.student_id,
        accompanying_persons: parseInt(formData.accompanyingPersons) || 0,
        visitor_photo: photoPreview,
        email: formData.visitorEmail
      };

      const response = await apiClient.post('/visitors/submit', payload);
      if (response.data.success) {
        alert('Visitor request submitted successfully!');
        router.push('/student/myrequest');
      }
    } catch (error: any) {
      alert('Submission failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    if (confirm('Do you want to save your progress as a draft before going back?')) {
      handleSaveDraft();
    }
    router.back();
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto pb-10">
      {showDraftMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Draft saved successfully!
        </div>
      )}

      <div>
        <div className="mb-6 sm:mb-8 flex items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">New Visitor Request</h2>
            <p className="text-gray-600 text-sm mt-0.5">Submit a request for visitor entry</p>
          </div>
          <button
            onClick={handleBackClick}
            className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors border border-gray-200 shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Student Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                <p className="text-base font-semibold text-gray-900">{studentInfo.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <p className="text-base font-semibold text-gray-900">{studentInfo.rollNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hostel</label>
                <p className="text-base font-semibold text-gray-900">{studentInfo.hostelName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <p className="text-base font-semibold text-gray-900">{studentInfo.roomNumber}</p>
              </div>
            </div>
          </div>

          {/* Visitor Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Visitor Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visitor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.visitorName}
                  onChange={(e) => handleInputChange('visitorName', e.target.value)}
                  placeholder="Enter visitor's full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.visitorEmail}
                  onChange={(e) => handleInputChange('visitorEmail', e.target.value)}
                  placeholder="Enter visitor's email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relation <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.relation}
                  onChange={(e) => handleInputChange('relation', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select relation</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-2">
                  {['M', 'F', 'Other'].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{g === 'M' ? 'Male' : g === 'F' ? 'Female' : 'Other'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visitor Photo</label>
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Visitor"
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : showCamera ? (
                  <CameraCapture
                    onCapture={handlePhotoCapture}
                    onClose={() => setShowCamera(false)}
                    title="Visitor Photo"
                  />
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCamera(true)}
                      className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                    >
                      <Camera size={18} />
                      <span>Take Photo</span>
                    </button>
                    <label className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                      <Upload size={18} />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof Type</label>
                <select
                  value={formData.idProofType}
                  onChange={(e) => handleInputChange('idProofType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="Aadhar">Aadhar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof Number</label>
                <input
                  type="text"
                  value={formData.idProofNumber}
                  onChange={(e) => handleInputChange('idProofNumber', e.target.value)}
                  placeholder="Enter ID number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Visitor Address</label>
                <textarea
                  value={formData.visitorAddress}
                  onChange={(e) => handleInputChange('visitorAddress', e.target.value)}
                  placeholder="Enter visitor's permanent address"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Visit Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Visit Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Visit <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select purpose</option>
                  <option value="Family Visit">Family Visit</option>
                  <option value="Academic">Academic Discussion</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Document">Document Delivery</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visit Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => handleInputChange('visitDate', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visit From Time</label>
                <input
                  type="time"
                  value={formData.visitStartTime}
                  onChange={(e) => handleInputChange('visitStartTime', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visit To Time</label>
                <input
                  type="time"
                  value={formData.visitEndTime}
                  onChange={(e) => handleInputChange('visitEndTime', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accompanying Persons</label>
                <input
                  type="number"
                  value={formData.accompanyingPersons}
                  onChange={(e) => handleInputChange('accompanyingPersons', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <X size={18} />
              Reset
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
              Save Draft
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={18} />}
              Submit Request
            </button>
          </div>
        </div>
      </div >
    </div >
  );
};

export default NewVisitorRequestPage;
