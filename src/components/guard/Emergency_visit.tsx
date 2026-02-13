'use client';

import { useState, useRef } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  User,
  Phone,
  Camera,
  FileText,
  Clock
} from 'lucide-react';

interface FormData {
  visitorName: string;
  mobileNumber: string;
  relation: string;
  idProofType: string;
  idProofNumber: string;
  visitorPhoto: string | null;
  hostel: string;
  student: string;
  emergencyReason: string;
}


const idProofTypes = [
  'Aadhar Card',
  'PAN Card',
  'Driving License',
  'Voter ID',
  'Passport',
  'Other Government ID'
];

const hostels = [
  'Krishna Hostel',
  'Saraswati Hostel',
  'Vivekananda Hostel',
  'Ramanujan Hostel',
  'APJ Abdul Kalam Hostel'
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
    visitorName: '',
    mobileNumber: '',
    relation: '',
    idProofType: '',
    idProofNumber: '',
    visitorPhoto: null,
    hostel: '',
    student: '',
    emergencyReason: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          visitorPhoto: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      alert('Unable to access camera. Please upload a photo instead.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        setFormData(prev => ({
          ...prev,
          visitorPhoto: photoData
        }));
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.visitorName.trim()) {
      newErrors.visitorName = 'Visitor name is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Invalid mobile number';
    }

    if (!formData.relation) {
      newErrors.relation = 'Relation is required';
    }

    if (!formData.idProofType) {
      newErrors.idProofType = 'ID proof type is required';
    }

    if (!formData.idProofNumber.trim()) {
      newErrors.idProofNumber = 'ID proof number is required';
    }

    if (!formData.visitorPhoto) {
      newErrors.visitorPhoto = 'Visitor photo is required';
    }

    if (!formData.hostel) {
      newErrors.hostel = 'Hostel selection is required';
    }

    if (!formData.emergencyReason.trim()) {
      newErrors.emergencyReason = 'Emergency reason is required';
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          visitorName: '',
          mobileNumber: '',
          relation: '',
          idProofType: '',
          idProofNumber: '',
          visitorPhoto: null,
          hostel: '',
          student: '',
          emergencyReason: ''
        });
      }, 3000);
    }, 1500);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Emergency Visit Registration
          </h1>
          <p className="text-gray-600">Register unplanned emergency visitors</p>
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
                <h3 className="font-semibold text-green-900">Emergency Visit Registered Successfully!</h3>
                <p className="text-sm text-green-700">Warden and Admin have been notified. A temporary pass has been issued.</p>
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Visitor Details</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Visitor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visitor Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleInputChange}
                  placeholder="Enter visitor name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.visitorName ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.visitorName && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitorName}</p>
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
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
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
                  name="idProofType"
                  value={formData.idProofType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.idProofType ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select ID type</option>
                  {idProofTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.idProofType && (
                  <p className="text-red-500 text-xs mt-1">{errors.idProofType}</p>
                )}
              </div>

              {/* ID Proof Number */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Proof Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="idProofNumber"
                  value={formData.idProofNumber}
                  onChange={handleInputChange}
                  placeholder="Enter ID proof number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.idProofNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.idProofNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.idProofNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Visitor Photo Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Camera className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Visitor Photo <span className="text-red-500">*</span>
              </h2>
            </div>

            {formData.visitorPhoto ? (
              <div className="text-center">
                <img
                  src={formData.visitorPhoto}
                  alt="Visitor"
                  className="w-48 h-48 object-cover rounded-lg mx-auto mb-4 border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, visitorPhoto: null }))}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove Photo
                </button>
              </div>
            ) : showCamera ? (
              <div className="text-center">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full max-w-md mx-auto rounded-lg mb-4 border-2 border-gray-200"
                />
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Capture Photo
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    <Camera className="w-4 h-4" />
                    Capture Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Upload Photo
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            )}
            {errors.visitorPhoto && (
              <p className="text-red-500 text-xs mt-2 text-center">{errors.visitorPhoto}</p>
            )}
          </div>

          {/* Visit Details Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Visit Details</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Hostel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hostel <span className="text-red-500">*</span>
                </label>
                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.hostel ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select hostel</option>
                  {hostels.map(hostel => (
                    <option key={hostel} value={hostel}>{hostel}</option>
                  ))}
                </select>
                {errors.hostel && (
                  <p className="text-red-500 text-xs mt-1">{errors.hostel}</p>
                )}
              </div>

              {/* Student */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student (if applicable)
                </label>
                <input
                  type="text"
                  name="student"
                  value={formData.student}
                  onChange={handleInputChange}
                  placeholder="Enter student name & room"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Emergency Reason */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="emergencyReason"
                  value={formData.emergencyReason}
                  onChange={handleInputChange}
                  placeholder="Describe the emergency situation..."
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.emergencyReason ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.emergencyReason && (
                  <p className="text-red-500 text-xs mt-1">{errors.emergencyReason}</p>
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
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                Register Emergency Visit
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}