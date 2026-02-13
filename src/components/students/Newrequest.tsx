'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X, Save, Send, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NewVisitorRequestPage = () => {
  const router = useRouter();
  const studentInfo = {
    name: '',
    rollNumber: '',
    hostelName: '',
    roomNumber: '',
    profileImage: ''
  };

  const [formData, setFormData] = useState({
    visitorName: '',
    mobileNumber: '',
    relation: '',
    visitorPhoto: null,
    idProofType: '',
    idProofNumber: '',
    visitorAddress: '',
    purpose: '',
    visitDate: '',
    visitStartTime: '',
    visitEndTime: '',
    accompanyingPersons: '0'
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showDraftMessage, setShowDraftMessage] = useState(false);

  // Load draft from memory on component mount
  useEffect(() => {
    const savedDraft = getDraft();
    if (savedDraft) {
      setFormData(savedDraft.formData);
      if (savedDraft.photoPreview) {
        setPhotoPreview(savedDraft.photoPreview);
      }
    }
  }, []);

  // Helper functions for draft management (using in-memory storage)
  const drafts: any = {};
  const requests: any[] = [];

  const saveDraft = (data: any) => {
    drafts['visitorRequestDraft'] = {
      formData: data,
      photoPreview: photoPreview,
      savedAt: new Date().toISOString()
    };
  };

  const getDraft = () => {
    return drafts['visitorRequestDraft'] || null;
  };

  const clearDraft = () => {
    delete drafts['visitorRequestDraft'];
  };

  const saveRequests = (requestsData: any) => {
    if (typeof window !== 'undefined') {
      (window as any).visitorRequests = requestsData;
    }
  };

  const getRequests = () => {
    if (typeof window !== 'undefined' && (window as any).visitorRequests) {
      return (window as any).visitorRequests;
    }
    return [];
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhotoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData({ ...formData, visitorPhoto: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData({ ...formData, visitorPhoto: null });
  };

  const handleSaveDraft = () => {
    saveDraft(formData);
    setShowDraftMessage(true);
    setTimeout(() => setShowDraftMessage(false), 3000);
    alert('Draft saved successfully! You can continue editing later.');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      clearDraft();
      setFormData({
        visitorName: '',
        mobileNumber: '',
        relation: '',
        visitorPhoto: null,
        idProofType: '',
        idProofNumber: '',
        visitorAddress: '',
        purpose: '',
        visitDate: '',
        visitStartTime: '',
        visitEndTime: '',
        accompanyingPersons: '0'
      });
      setPhotoPreview(null);
      alert('Form cancelled and draft cleared.');
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.visitorName || !formData.mobileNumber || !formData.relation ||
      !formData.purpose || !formData.visitDate) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    // Create new request object with structure matching MyRequests page
    const newRequest = {
      id: Date.now().toString(),
      requestId: `REQ${Date.now().toString().slice(-6)}`,
      visitorName: formData.visitorName,
      relation: formData.relation,
      visitDate: new Date(formData.visitDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      purpose: formData.purpose,
      status: 'Pending',
      visitorDetails: {
        phone: formData.mobileNumber,
        email: '', // Not collected in form
        address: formData.visitorAddress,
        idProof: `${formData.idProofType} - ${formData.idProofNumber}`,
      },
      visitDetails: {
        startTime: formData.visitStartTime || '-',
        endTime: formData.visitEndTime || '-',
        reason: formData.purpose
      },
      qrCode: ''
    };

    // Save to requests storage (using window for temporary persistence across pages)
    // In a real app, this would be an API call
    const existingRequests = getRequests();
    // Add new request to the beginning of the list
    const updatedRequests = [newRequest, ...existingRequests];
    saveRequests(updatedRequests);

    console.log('Submitting form:', newRequest);

    // Clear draft after successful submission
    clearDraft();

    // Reset form
    setFormData({
      visitorName: '',
      mobileNumber: '',
      relation: '',
      visitorPhoto: null,
      idProofType: '',
      idProofNumber: '',
      visitorAddress: '',
      purpose: '',
      visitDate: '',
      visitStartTime: '',
      visitEndTime: '',
      accompanyingPersons: '0'
    });
    setPhotoPreview(null);

    // Redirect to My Requests page
    router.push('/student/myrequest');
  };

  const handleBackClick = () => {
    if (confirm('Do you want to save your progress as a draft before going back?')) {
      handleSaveDraft();
    }
    // In a real app, you would use router.back() here
    alert('Going back...');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {showDraftMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Draft saved successfully!
        </div>
      )}

      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Visitor Request</h2>
            <p className="text-gray-600">Submit a request for visitor entry</p>
          </div>
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Student Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Student Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Visitor Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                ) : (
                  <label className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                    <Upload size={18} />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof Type</label>
                <select
                  value={formData.idProofType}
                  onChange={(e) => handleInputChange('idProofType', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select ID type</option>
                  <option value="Aadhaar">Aadhaar Card</option>
                  <option value="PAN">PAN Card</option>
                  <option value="DL">Driving License</option>
                  <option value="Voter">Voter ID</option>
                  <option value="Passport">Passport</option>
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Visit Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              onClick={handleSaveDraft}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
            >
              <Save size={18} />
              Save Draft
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Send size={18} />
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVisitorRequestPage;
