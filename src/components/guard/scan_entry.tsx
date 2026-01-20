"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, QrCode, CheckCircle, XCircle, Phone,
  AlertTriangle, User, LogOut, Clock, ShieldCheck
} from 'lucide-react';

// Define the visitor type for clarity
type VisitorStatus = 'OUTSIDE' | 'INSIDE';

export default function ScanEntry() {
  const router = useRouter();
  const [step, setStep] = useState<'scan' | 'process'>('scan');
  const [qrCode, setQrCode] = useState('');

  // Simulated State: In a real app, this comes from your backend after scanning
  const [visitorMode, setVisitorMode] = useState<VisitorStatus>('OUTSIDE');

  const [checklist, setChecklist] = useState({
    photoMatches: false,
    idProofVerified: false,
    studentConfirmed: false,
  });

  // Mock Data
  const visitorData = {
    name: 'Kiran Sharma',
    relation: 'Mother',
    phone: '+91 98888 12346',
    aadhar: 'XXXX-XXXX-5678',
    studentName: 'Rahul Sharma',
    room: 'A-204',
    hostel: 'Krishna Hostel',
    purpose: 'Family Visit',
    approvedTime: '14:00 - 17:00',
    entryTime: '01:40 PM',
    durationInside: '02h 15m',
    isOverdue: false,
  };

  const handleScanAction = () => {
    // Logic: If QR matches an active "Inside" record, set mode to 'INSIDE' (Exit process)
    // For this demo, let's just toggle or logic it:
    setStep('process');
  };

  const handleFinalize = (action: 'entry' | 'exit' | 'deny') => {
    console.log(`Action: ${action} recorded for ${visitorData.name}`);
    router.push('/Guard/guard_dashboard');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => step === 'process' ? setStep('scan') : router.push('/Guard/guard_dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {step === 'scan' ? 'Visitor Scanner' : (visitorMode === 'OUTSIDE' ? 'Verify Entry' : 'Verify Exit')}
          </h1>
          <p className="text-gray-600">Scan QR to manage hostel access</p>
        </div>
      </div>

      {step === 'scan' ? (
        /* --- STEP 1: SCANNING UI --- */
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="bg-gray-50 rounded-xl p-12 mb-6 flex flex-col items-center justify-center min-h-[350px] border-2 border-dashed border-gray-200">
            <QrCode className="w-32 h-32 text-blue-500 mb-4 opacity-50" />
            <p className="text-gray-500 font-medium text-center">Place the visitor's QR code within the frame</p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              placeholder="Or enter pass ID manually"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {/* Toggle for demo purposes to show both Entry/Exit flows */}
            <div className="flex gap-2 mb-2">
              <button onClick={() => setVisitorMode('OUTSIDE')} className={`flex-1 text-xs py-1 rounded ${visitorMode === 'OUTSIDE' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>Simulate Entry</button>
              <button onClick={() => setVisitorMode('INSIDE')} className={`flex-1 text-xs py-1 rounded ${visitorMode === 'INSIDE' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}>Simulate Exit</button>
            </div>
            <button
              onClick={handleScanAction}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify QR Code
            </button>
          </div>
        </div>
      ) : (
        /* --- STEP 2: VERIFICATION UI (Conditional Rendering) --- */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 space-y-6">
            {/* Status Alert */}
            <div className={`p-4 rounded-xl border flex items-center gap-4 ${visitorMode === 'OUTSIDE' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
              {visitorMode === 'OUTSIDE' ? <CheckCircle className="text-green-500 w-8 h-8" /> : <Clock className="text-blue-500 w-8 h-8" />}
              <div>
                <h3 className="font-bold text-gray-900">{visitorMode === 'OUTSIDE' ? 'Authorized Pass' : 'Visitor Currently Inside'}</h3>
                <p className="text-sm text-gray-600">{visitorMode === 'OUTSIDE' ? 'Ready for check-in' : `Entered at ${visitorData.entryTime}`}</p>
              </div>
            </div>

            {/* Combined Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{visitorData.name}</h3>
                  <p className="text-sm text-gray-500">{visitorData.relation} • {visitorData.phone}</p>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Visiting Student</p>
                  <p className="text-gray-900 font-medium">{visitorData.studentName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-gray-900 font-medium">{visitorData.hostel}, Room {visitorData.room}</p>
                </div>
                {visitorMode === 'INSIDE' && (
                  <>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Entry Time</p>
                      <p className="text-gray-900 font-medium">{visitorData.entryTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Time Spent</p>
                      <p className="text-blue-600 font-bold">{visitorData.durationInside}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Dynamic Checklist / Overdue Warning */}
            {visitorMode === 'OUTSIDE' ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-600" /> Entry Checklist</h3>
                <div className="space-y-3">
                  {['photoMatches', 'idProofVerified', 'studentConfirmed'].map((key) => (
                    <label key={key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded text-blue-600"
                        checked={checklist[key as keyof typeof checklist]}
                        onChange={() => setChecklist(prev => ({ ...prev, [key]: !prev[key as keyof typeof checklist] }))}
                      />
                      <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : visitorData.isOverdue && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <p className="text-sm font-medium">This visitor has exceeded the allotted time window. Please verify reason for delay.</p>
              </div>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold mb-4 text-gray-900">Actions</h3>

              {visitorMode === 'OUTSIDE' ? (
                <div className="space-y-3">
                  <button onClick={() => handleFinalize('entry')} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                    <CheckCircle className="w-5 h-5" /> Confirm Entry
                  </button>
                  <button onClick={() => handleFinalize('deny')} className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-bold hover:bg-red-100 flex items-center justify-center gap-2 transition-colors">
                    <XCircle className="w-5 h-5" /> Deny Entry
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button onClick={() => handleFinalize('exit')} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2 transition-colors">
                    <LogOut className="w-5 h-5" /> Confirm Exit
                  </button>
                  <button className="w-full bg-white border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <AlertTriangle className="w-5 h-5 text-amber-500" /> Report Issue
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <button onClick={() => alert('Calling...')} className="w-full text-sm flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 py-2">
                  <Phone className="w-4 h-4" /> Call Student
                </button>
                <button onClick={() => alert('Alerting Warden...')} className="w-full text-sm flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 py-2">
                  <AlertTriangle className="w-4 h-4" /> Emergency: Warden
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}