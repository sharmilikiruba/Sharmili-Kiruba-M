"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, QrCode, AlertTriangle, User, CheckCircle, LogOut } from 'lucide-react';

export default function ScanExit() {
  const router = useRouter();
  const [step, setStep] = useState<'scan' | 'verify'>('scan');
  const [qrCode, setQrCode] = useState('');

  // Mock visitor data (in real app, this would come from QR scan)
  const visitorData = {
    name: 'Dr. Mohan Kumar',
    visiting: 'Amit Kumar',
    room: 'C-310',
    entryTime: '01:40 PM',
    currentTime: '09:24 AM',
    durationInside: '91h 44m',
    exceeded: true,
    verificationStatus: {
      photoVerified: true,
      idVerified: true,
      studentConfirmed: true,
    },
  };

  const handleScanVerify = () => {
    // Simulate QR code scan
    setStep('verify');
  };

  const handleConfirmExit = () => {
    // In real app, record exit in database
    router.push('/Guard/guard_dashboard');
  };

  const handleReportIssue = () => {
    // Implement issue reporting
    alert('Reporting issue...');
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => step === 'verify' ? setStep('scan') : router.push('/Guard/guard_dashboard')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scan Exit</h1>
          <p className="text-gray-600 mt-1">Record visitor exit from hostel</p>
        </div>
      </div>

      {step === 'scan' ? (
        // QR Scan Step
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Scan QR Code</h2>

            <div className="bg-gray-50 rounded-xl p-12 mb-6 flex flex-col items-center justify-center min-h-[400px]">
              <QrCode className="w-32 h-32 text-gray-400 mb-4" />
              <p className="text-gray-600">Position QR code in camera view</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Or enter code manually</p>
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Enter QR code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              onClick={handleScanVerify}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              Scan / Verify
            </button>
          </div>
        </div>
      ) : (
        // Verification Step
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Duration Warning */}
          {visitorData.exceeded && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-12 h-12 text-amber-500" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{visitorData.durationInside} Inside</h3>
                  <p className="text-gray-600">Visitor has exceeded expected duration</p>
                </div>
              </div>
            </div>
          )}

          {/* Visitor Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visitor Details</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{visitorData.name}</h4>
                <p className="text-gray-600">Visiting: {visitorData.visiting}</p>
                <p className="text-gray-600">Room: {visitorData.room}</p>
              </div>
            </div>
          </div>

          {/* Visit Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Timeline</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Entry Time</p>
                <p className="text-lg font-semibold text-gray-900">{visitorData.entryTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Time</p>
                <p className="text-lg font-semibold text-gray-900">{visitorData.currentTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration Inside</p>
                <p className="text-lg font-semibold text-gray-900">{visitorData.durationInside}</p>
              </div>
            </div>
          </div>

          {/* Entry Verification Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Entry Verification Status</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-900 font-medium">Photo Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-900 font-medium">ID Verified</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-900 font-medium">Student Confirmed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleConfirmExit}
              className="bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Confirm Exit
            </button>
            <button
              onClick={handleReportIssue}
              className="bg-white border border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:border-red-600 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5" />
              Report Issue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}