'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  User,
  Phone,
  Camera,
  FileText,
  Clock,
  Loader2,
  SwitchCamera,
  Upload
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import CameraCapture from '@/components/shared/CameraCapture';

interface FormData {
  name: string;
  phone: string;
  relation: string;
  id_proof_type: string;
  id_proof_no: string;
  visitor_photo: string | null;
  roll_no: string;
  visit_purpose: string;
  email: string;
}

// No StudentSuggestion interface needed


const idProofTypes = [
  'Aadhar',
  'PAN',
  'Driving License',
  'Voter ID',
  'Passport',
  'Other'
];

const relations = [
  'Parent',
  'Sibling',
  'Friend',
  'Relative',
  'Other'
];


export default function EmergencyVisit() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    relation: '',
    id_proof_type: '',
    id_proof_no: '',
    visitor_photo: null,
    roll_no: '',
    visit_purpose: '',
    email: ''
  });

  // Student Search State removed

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name: fieldName, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldName as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
  };

  // searchStudents removed

  // handleSelectStudent removed


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
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Visitor name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid mobile number';
    }

    if (!formData.relation) {
      newErrors.relation = 'Relation is required';
    }

    if (!formData.id_proof_type) {
      newErrors.id_proof_type = 'ID proof type is required';
    }

    if (!formData.id_proof_no.trim()) {
      newErrors.id_proof_no = 'ID proof number is required';
    }

    if (!formData.visitor_photo) {
      newErrors.visitor_photo = 'Visitor photo is required';
    }

    if (!formData.roll_no.trim()) {
      newErrors.roll_no = 'Student Roll Number is required';
    }

    if (!formData.visit_purpose.trim()) {
      newErrors.visit_purpose = 'Emergency reason is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // We'll add a generic error or handle it specifically
      alert('Invalid email address');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        relation: formData.relation,
        id_proof_type: formData.id_proof_type,
        id_proof_no: formData.id_proof_no,
        roll_no: formData.roll_no,
        visit_purpose: formData.visit_purpose,
        visitor_photo: formData.visitor_photo,
        visit_date: new Date().toISOString().split('T')[0]
      };

      const res = await apiClient.post('/guard/emergency', {
        visitorData: payload
      });

      if (res.data.success) {
        setShowSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            relation: '',
            id_proof_type: '',
            id_proof_no: '',
            visitor_photo: null,
            roll_no: '',
            visit_purpose: ''
          });
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error registering emergency visit:', error);
      alert(error.response?.data?.message || 'Failed to register emergency visit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-8 pb-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-start gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors bg-white shadow-sm border border-gray-100 shrink-0"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Emergency Visit
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-0.5">Register unplanned emergency visitors</p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Emergency Visit Registered and Checked In!</h3>
                <p className="text-sm text-green-700">Warden and Admin have been notified. A temporary pass has been issued for exit.</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emergency Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Emergency Visit Only</h3>
                <p className="text-sm text-amber-800">
                  This form is for emergency situations only. A temporary pass will be issued with limited validity.
                  Warden and Admin will be automatically notified.
                </p>
              </div>
            </div>
          </div>

          {/* Visitor Details Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Visitor Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Visitor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visitor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter visitor name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="visitor@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Relation to Student */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relation to Student <span className="text-red-500">*</span>
                </label>
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.relation ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select relation</option>
                  {relations.map(relation => (
                    <option key={relation} value={relation}>{relation}</option>
                  ))}
                </select>
                {errors.relation && (
                  <p className="text-red-500 text-xs mt-1">{errors.relation}</p>
                )}
              </div>

              {/* ID Proof Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="id_proof_type"
                  value={formData.id_proof_type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.id_proof_type ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select ID type</option>
                  {idProofTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.id_proof_type && (
                  <p className="text-red-500 text-xs mt-1">{errors.id_proof_type}</p>
                )}
              </div>

              {/* ID Proof Number */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="id_proof_no"
                  value={formData.id_proof_no}
                  onChange={handleInputChange}
                  placeholder="Enter ID proof number"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.id_proof_no ? 'border-red-500 bg-red-50/10' : 'border-gray-200 hover:border-gray-300'
                    }`}
                />
                {errors.id_proof_no && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.id_proof_no}</p>
                )}
              </div>
            </div>
          </div>

          {/* Visitor Photo Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Camera className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Visitor Photo <span className="text-red-500">*</span>
              </h2>
            </div>

            {formData.visitor_photo ? (
              <div className="text-center">
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
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
                <div className="flex justify-center gap-4">
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
            {errors.visitor_photo && (
              <p className="text-red-500 text-xs mt-2 text-center">{errors.visitor_photo}</p>
            )}
          </div>

          {/* Visit Details Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Visit Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Lookup */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="roll_no"
                  value={formData.roll_no}
                  onChange={handleInputChange}
                  placeholder="Enter student roll number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.roll_no ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.roll_no && (
                  <p className="text-red-500 text-xs mt-1">{errors.roll_no}</p>
                )}
              </div>

              {/* Emergency Reason */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="visit_purpose"
                  value={formData.visit_purpose}
                  onChange={handleInputChange}
                  placeholder="Describe the emergency situation..."
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.visit_purpose ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.visit_purpose && (
                  <p className="text-red-500 text-xs mt-1">{errors.visit_purpose}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Pass Restrictions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Emergency Pass Restrictions</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Validity: 2 hours only</li>
                  <li>• Single entry only - no re-entry</li>
                  <li>• Mandatory exit scan required</li>
                  <li>• Will be logged as EMERGENCY_VISIT in reports</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-lg hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] disabled:bg-red-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-6 w-6 text-white" />
                Processing...
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                Initiate Emergency Check-in
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
