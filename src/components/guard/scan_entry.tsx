import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, QrCode, CheckCircle, XCircle, Phone, AlertTriangle, User } from 'lucide-react';

export default function ScanEntry() {
  const router = useRouter();
  const [step, setStep] = useState<'scan' | 'verify'>('scan');
  const [qrCode, setQrCode] = useState('');
  const [checklist, setChecklist] = useState({
    photoMatches: false,
    idProofVerified: false,
    studentConfirmed: false,
  });

  // Mock visitor data (in real app, this would come from QR scan)
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
    priority: 'Normal',
  };

  const handleScanVerify = () => {
    // Simulate QR code scan
    if (qrCode.trim() !== '') {
      setStep('verify');
    }
  };

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleConfirmEntry = () => {
    // In real app, save entry to database
    router.push('/guard');
  };

  const handleDenyEntry = () => {
    // In real app, log denial reason
    router.push('/guard');
  };

  const handleCallStudent = () => {
    // Implement call functionality
    alert('Calling student...');
  };

  const handleCallWarden = () => {
    // Implement call functionality
    alert('Calling warden...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
            H
          </div>
          <div>
            <h1 className="font-semibold text-lg">HVMS</h1>
            <p className="text-xs text-gray-400">Visitor Management</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <button 
            onClick={() => router.push('/guard')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-medium">Dashboard</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg mb-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Scan Entry</span>
          </button>

          <button 
            onClick={() => router.push('/scan-exit')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Scan Exit</span>
          </button>

          <button 
            onClick={() => router.push('/walk-in-registration')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="font-medium">Walk-in Registration</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium">Active Visitors</span>
          </button>
        </nav>

        <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
          © 2026 University HVMS
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>/guard/scan-entry</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden">
                <img src="/api/placeholder/36/36" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Ramesh Yadav</div>
                <div className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full inline-block">GUARD</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6 flex items-center gap-4">
            <button 
              onClick={() => step === 'verify' ? setStep('scan') : router.push('/guard')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Scan Entry</h1>
              <p className="text-gray-600 mt-1">Verify visitor QR code for entry</p>
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
              {/* Valid Pass Alert */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Valid Pass</h3>
                    <p className="text-gray-600">Visitor is authorized to enter</p>
                  </div>
                </div>
              </div>

              {/* Visitor Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visitor Details</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{visitorData.name}</h4>
                    <p className="text-gray-600">{visitorData.relation}</p>
                    <p className="text-gray-600">{visitorData.phone}</p>
                    <p className="text-gray-600">Aadhar Card: {visitorData.aadhar}</p>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Student Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Student Name</p>
                    <p className="font-semibold text-gray-900">{visitorData.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Room</p>
                    <p className="font-semibold text-gray-900">{visitorData.room}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Hostel</p>
                    <p className="font-semibold text-gray-900">{visitorData.hostel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Purpose</p>
                    <p className="font-semibold text-gray-900">{visitorData.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Approved Time</p>
                    <p className="font-semibold text-gray-900">{visitorData.approvedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Priority</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {visitorData.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Verification Checklist</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checklist.photoMatches}
                      onChange={() => handleChecklistChange('photoMatches')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-gray-900 group-hover:text-blue-600">Photo matches visitor</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checklist.idProofVerified}
                      onChange={() => handleChecklistChange('idProofVerified')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-gray-900 group-hover:text-blue-600">ID proof verified</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={checklist.studentConfirmed}
                      onChange={() => handleChecklistChange('studentConfirmed')}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-gray-900 group-hover:text-blue-600">Student confirmed visitor</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleConfirmEntry}
                  className="bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Confirm Entry
                </button>
                <button
                  onClick={handleDenyEntry}
                  className="bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Deny Entry
                </button>
              </div>

              {/* Additional Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCallStudent}
                  className="bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Student
                </button>
                <button
                  onClick={handleCallWarden}
                  className="bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  Call Warden
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}