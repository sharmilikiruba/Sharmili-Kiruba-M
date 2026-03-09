"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft, CheckCircle, XCircle, Phone,
  AlertTriangle, User, LogOut, ShieldCheck,
  QrCode, Camera, Upload, Image as ImageIcon, Loader2
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import QRScanner from './QRScanner';
import { Html5Qrcode } from 'html5-qrcode';

type VisitorStatus = 'OUTSIDE' | 'INSIDE';
type ActiveTab = 'entry' | 'exit';

interface VisitorData {
  id: number;
  name: string;
  relation: string;
  phone: string;
  aadhar: string;
  studentName: string;
  room_no: string;
  hostel_name: string;
  purpose: string;
  approvedTime: string;
  entryTime: string;
  durationInside: string;
  isOverdue: boolean;
  photoUrl: string | null;
}

const EMPTY_VISITOR: VisitorData = {
  id: 0, name: '', relation: '', phone: '', aadhar: '',
  studentName: '', room_no: '', hostel_name: '', purpose: '',
  approvedTime: '', entryTime: '', durationInside: '',
  isOverdue: false, photoUrl: null
};

export default function ScanEntry() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const photoUploadInputRef = useRef<HTMLInputElement>(null);
  const isProcessingScan = useRef(false);
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();
  const initialVisitorId = searchParams.get('visitorId');

  // ── Core UI state ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    searchParams.get('mode') === 'exit' ? 'exit' : 'entry'
  );
  const [step, setStep] = useState<'scan' | 'process'>('scan');
  const [qrCode, setQrCode] = useState('');
  const [scannerActive, setScannerActive] = useState(false);

  // visitorMode is determined purely by backend (activeLog presence)
  const [visitorMode, setVisitorMode] = useState<VisitorStatus>('OUTSIDE');

  // ── Loading / feedback state ───────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [tabMismatchError, setTabMismatchError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ── Visitor data ───────────────────────────────────────────────────────────
  const [visitorData, setVisitorData] = useState<VisitorData>(EMPTY_VISITOR);
  const [checklist, setChecklist] = useState({
    photoMatches: false,
    idProofVerified: false,
    studentConfirmed: false,
  });
  const [visitorPhoto, setVisitorPhoto] = useState<string | null>(null);

  // ── Live timer for exit page ───────────────────────────────────────────────
  const [liveCurrentTime, setLiveCurrentTime] = useState('');
  const [liveDuration, setLiveDuration] = useState('');
  const [entryTimeRaw, setEntryTimeRaw] = useState<Date | null>(null);

  // Live clock — only runs when on exit process page
  useEffect(() => {
    if (visitorMode === 'INSIDE' && step === 'process' && entryTimeRaw) {
      const tick = () => {
        const now = new Date();
        setLiveCurrentTime(
          now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        );
        const diffMs = now.getTime() - entryTimeRaw.getTime();
        const totalMinutes = Math.floor(diffMs / 60000);
        setLiveDuration(`${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`);
      };
      tick();
      durationTimerRef.current = setInterval(tick, 60000);
      return () => { if (durationTimerRef.current) clearInterval(durationTimerRef.current); };
    }
  }, [visitorMode, step, entryTimeRaw]);

  // Handle initial visitor ID via query param
  useEffect(() => {
    if (initialVisitorId) handleVerifyQR(initialVisitorId);
  }, [initialVisitorId]);

  // Start scanner on mount
  useEffect(() => {
    setScannerActive(true);
    return () => setScannerActive(false);
  }, []);

  // ── Tab switch — resets everything and restarts scanner ────────────────────
  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setStep('scan');
    setError('');
    setTabMismatchError('');
    setQrCode('');
    setVisitorData(EMPTY_VISITOR);
    setChecklist({ photoMatches: false, idProofVerified: false, studentConfirmed: false });
    setVisitorPhoto(null);
    setEntryTimeRaw(null);
    setLiveDuration('');
    setLiveCurrentTime('');
    setVisitorMode('OUTSIDE');
    isProcessingScan.current = false;
    setScannerActive(false);
    setTimeout(() => setScannerActive(true), 300);
  };

  // ── QR scan handlers ───────────────────────────────────────────────────────
  const handleScanSuccess = async (scannedData: string) => {
    if (isProcessingScan.current) return;
    isProcessingScan.current = true;

    let finalToken = scannedData;
    if (scannedData.includes('http')) {
      try {
        const url = new URL(scannedData);
        finalToken = url.searchParams.get('token') || url.pathname.split('/').pop() || scannedData;
      } catch (e) { console.error("URL parsing failed", e); }
    }

    setQrCode(finalToken);
    setScannerActive(false);
    await handleVerifyQR(finalToken);
    setTimeout(() => { isProcessingScan.current = false; }, 1000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setError('');
    try {
      const regionId = "qr-reader-region-hidden";
      const region = document.getElementById(regionId);
      if (!region) throw new Error("QR reader region not found.");

      const html5QrCode = new Html5Qrcode(regionId);
      // scanFile returns decoded text if successful
      const decodedText = await html5QrCode.scanFile(file, true);
      await handleScanSuccess(decodedText);
      // Clean up after success
      await html5QrCode.clear();
    } catch (err: any) {
      console.error("QR File scan error:", err);
      setError("Could not find a valid QR code in this image. Ensure the code is clear and well-lit.");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleVisitorPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setVisitorPhoto(e.target?.result as string);
    reader.readAsDataURL(file);
    setIsUploading(true);
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('visitorId', visitorData.id.toString());
    try {
      const res = await apiClient.post('/visitors/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        setVisitorData(prev => ({ ...prev, photoUrl: res.data.photoUrl }));
        setChecklist(prev => ({ ...prev, photoMatches: true }));
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  // ── KEY FIX: Tab mismatch guard ────────────────────────────────────────────
  // After QR verify, if result doesn't match active tab → show actionable error
  // instead of silently switching pages (which caused the original bug).
  const handleVerifyQR = async (token: string) => {
    setIsLoading(true);
    setError('');
    setTabMismatchError('');

    try {
      const res = await apiClient.post('/guard/scan', { qrData: token });
      if (res.data.success) {
        const data = res.data.data;
        const isInsideNow = !!data.hasActiveLog;

        // Visitor already inside but guard is on Entry tab
        if (activeTab === 'entry' && isInsideNow) {
          setTabMismatchError(
            `${data.name} is already inside. Switch to Exit Mode to check them out.`
          );
          setScannerActive(false);
          setIsLoading(false);
          return;
        }

        // Visitor not checked in yet but guard is on Exit tab
        if (activeTab === 'exit' && !isInsideNow) {
          setTabMismatchError(
            `${data.name} hasn't checked in yet. Switch to Entry Mode to allow entry.`
          );
          setScannerActive(false);
          setIsLoading(false);
          return;
        }

        if (data.activeLog?.entryTime) {
          setEntryTimeRaw(new Date(data.activeLog.entryTime));
        }

        setVisitorData({
          id: data.id,
          name: data.name,
          relation: data.relation || 'Visitor',
          phone: data.phone,
          aadhar: data.idProofNumber,
          studentName: data.studentName || 'N/A',
          room_no: data.room_no || 'N/A',
          hostel_name: data.hostel_name || 'N/A',
          purpose: data.purpose,
          approvedTime: new Date(data.createdAt).toLocaleString(),
          entryTime: data.activeLog
            ? new Date(data.activeLog.entryTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            : '',
          durationInside: data.activeLog ? 'Calculating...' : '',
          isOverdue: false,
          photoUrl: data.photoUrl
        });

        if (data.verificationStatus) {
          setChecklist({
            photoMatches: data.verificationStatus.photoVerified || false,
            idProofVerified: data.verificationStatus.idVerified || false,
            studentConfirmed: data.verificationStatus.studentConfirmed || false,
          });
        }

        setVisitorMode(isInsideNow ? 'INSIDE' : 'OUTSIDE');
        setStep('process');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Invalid or Expired QR Code';
      setError(message);
      setScannerActive(
        !(message.toLowerCase().includes('already checked out') || message.toLowerCase().includes('completed'))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = async (action: 'entry' | 'exit' | 'deny') => {
    if (action === 'deny') { router.push('/Guard/guard_dashboard'); return; }
    if (action === 'entry' && (!checklist.photoMatches || !checklist.idProofVerified)) {
      setError("Please complete all verification checks before confirming entry.");
      return;
    }
    try {
      if (isLoading) return;
      setIsLoading(true);
      const endpoint = action === 'entry' ? '/guard/confirm-entry' : '/guard/confirm-exit';
      const res = await apiClient.post(endpoint, { visitorId: visitorData.id });
      if (res.data.success) {
        setSuccessMessage(`${action === 'entry' ? 'Entry' : 'Exit'} Confirmed Successfully`);
        setTimeout(() => router.push('/Guard/guard_dashboard'), 2000);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || `Failed to confirm ${action}`;
      setError(message);
      if (message.toLowerCase().includes('already checked out')) {
        setTimeout(() => router.push('/Guard/guard_dashboard'), 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (successMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{successMessage}</h2>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  // ── Shared scan UI ─────────────────────────────────────────────────────────
  const ScanUI = () => (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Camera */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-900">Live Camera Preview</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs px-3 py-1 rounded-full font-medium bg-blue-50 text-blue-600 flex items-center gap-1 hover:bg-blue-100"
            >
              <Upload className="w-3 h-3" /> Upload QR
            </button>
            <button
              onClick={() => setScannerActive(!scannerActive)}
              className={`text-xs px-3 py-1 rounded-full font-medium ${scannerActive ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
            >
              {scannerActive ? 'Stop Camera' : 'Start Camera'}
            </button>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
        <QRScanner isActive={scannerActive} onScanSuccess={handleScanSuccess} onScanFailure={(err) => console.log(err)} />
        <div className="mt-4 flex gap-4 text-xs text-gray-500 justify-center">
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Center QR Code</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Ensure Good Lighting</div>
        </div>
      </div>

      {/* Manual entry + errors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center space-y-4">
        <h3 className="font-bold text-gray-900">Manual Entry</h3>
        <div className="relative">
          <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            placeholder="Enter pass ID / Token manually"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <button
          onClick={() => handleVerifyQR(qrCode)}
          disabled={isLoading || !qrCode}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-blue-400"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify ID Manually'}
        </button>

        {/* Tab mismatch — with one-click switch button */}
        {tabMismatchError && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">{tabMismatchError}</p>
                <button
                  onClick={() => switchTab(activeTab === 'entry' ? 'exit' : 'entry')}
                  className={`mt-2 text-xs font-bold underline hover:opacity-80 ${activeTab === 'entry' ? 'text-orange-600' : 'text-blue-600'
                    }`}
                >
                  Switch to {activeTab === 'entry' ? 'Exit' : 'Entry'} Mode →
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>
    </div>
  );

  // ── Exit process page ──────────────────────────────────────────────────────
  const ExitPage = () => (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Visitor Details</h3>
        </div>
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-14 sm:h-14 bg-gray-100 rounded-2xl sm:rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md">
            {visitorData.photoUrl
              ? <img src={visitorData.photoUrl} alt="Visitor" className="w-16 h-16 sm:w-14 sm:h-14 rounded-2xl sm:rounded-full object-cover" />
              : <User className="w-8 h-8 text-gray-400" />}
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-lg font-bold text-gray-900">{visitorData.name}</h4>
            <p className="text-sm text-gray-500 font-medium">Visiting: <span className="text-gray-700">{visitorData.studentName}</span></p>
            <p className="text-sm text-gray-500 font-medium">Room: <span className="text-gray-700">{visitorData.room_no}</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Visit Timeline</h3>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Entry Time</p>
            <p className="text-base font-semibold text-gray-900">{visitorData.entryTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Time</p>
            <p className="text-base font-semibold text-gray-900">{liveCurrentTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Duration Inside</p>
            <p className="text-base font-semibold text-gray-900">{liveDuration || visitorData.durationInside}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Entry Verification Status</h3>
        </div>
        <div className="p-5 grid grid-cols-3 gap-4">
          {[
            { key: 'photoMatches', label: 'Photo Verified' },
            { key: 'idProofVerified', label: 'ID Verified' },
            { key: 'studentConfirmed', label: 'Student Confirmed' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${checklist[key as keyof typeof checklist] ? 'text-blue-500' : 'text-gray-300'}`} />
              <span className="text-sm text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {visitorData.isOverdue && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-medium">This visitor has exceeded the allotted time window. Please verify reason for delay.</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium border border-red-100 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      <button
        onClick={() => handleFinalize('exit')}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogOut className="w-5 h-5" /> Confirm Exit</>}
      </button>
    </div>
  );

  // ── Entry process page ─────────────────────────────────────────────────────
  const EntryPage = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="p-4 rounded-xl border flex items-center gap-4 bg-green-50 border-green-200">
          <CheckCircle className="text-green-500 w-8 h-8" />
          <div>
            <h3 className="font-bold text-gray-900">Authorized Pass</h3>
            <p className="text-sm text-gray-600">Ready for check-in</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" /> Visitor Identity Verification
            </h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                {visitorPhoto ? 'Retake Photo' : 'Capture Photo'}
              </button>
              <button
                type="button"
                onClick={() => photoUploadInputRef.current?.click()}
                className="text-sm text-gray-600 font-medium hover:underline"
              >
                Upload Photo
              </button>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="w-32 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden relative">
              {visitorPhoto ? <img src={visitorPhoto} alt="Visitor" className="w-full h-full object-cover" /> : <ImageIcon className="w-10 h-10 text-gray-400" />}
              {isUploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-6 h-6 text-white animate-spin" /></div>}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">Take a live photo of the visitor to verify against the pass. This photo will be stored for security records.</p>
              <input type="file" ref={photoInputRef} className="hidden" accept="image/*" capture="user" onChange={handleVisitorPhotoUpload} />
              <input type="file" ref={photoUploadInputRef} className="hidden" accept="image/*" onChange={handleVisitorPhotoUpload} />
              {visitorPhoto && !isUploading && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                  <CheckCircle className="w-3 h-3" /> PHOTO UPLOADED
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-2xl sm:rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{visitorData.name}</h3>
              <p className="text-sm text-gray-500 font-medium uppercase text-[10px] tracking-widest">{visitorData.relation} • {visitorData.phone}</p>
            </div>
          </div>
          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-center sm:text-left">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Visiting Student</p>
              <p className="text-gray-900 font-bold">{visitorData.studentName}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Residence Location</p>
              <p className="text-gray-900 font-bold">{visitorData.hostel_name}, RM {visitorData.room_no}</p>
            </div>
          </div>
        </div>

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
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold mb-4 text-gray-900">Actions</h3>
          <div className="space-y-3">
            <button onClick={() => handleFinalize('entry')} disabled={isLoading || isUploading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors disabled:bg-blue-400">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle className="w-5 h-5" /> Confirm Entry</>}
            </button>
          </div>

        </div>
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium border border-red-100">{error}</div>
        )}
      </div>
    </div>
  );

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto pb-10">
      <div id="qr-reader-region-hidden" className="hidden"></div>

      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <button
          onClick={() => step === 'process' ? setStep('scan') : router.push('/Guard/guard_dashboard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors bg-white shadow-sm border border-gray-100 shrink-0"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {step === 'process'
              ? (visitorMode === 'INSIDE' ? 'Scan Exit pass' : 'Allow entry')
              : 'Visitor Scanner'}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-0.5">
            {step === 'process'
              ? (visitorMode === 'INSIDE' ? 'Confirm visitor departure' : 'Complete verification check')
              : 'Scan QR or upload image to manage access'}
          </p>
        </div>
      </div>

      {/* Tab Bar — only visible on scan step */}
      {step === 'scan' && (
        <>
          <div className="mb-6 flex gap-1 bg-gray-200/50 p-1 rounded-xl w-full sm:w-fit">
            <button
              onClick={() => switchTab('entry')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'entry' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <ShieldCheck className="w-4 h-4" /> Entry
            </button>
            <button
              onClick={() => switchTab('exit')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'exit' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </div>

          {/* Active tab hint */}
          <div className={`mb-6 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold w-full sm:w-fit flex items-center gap-2 shadow-sm ${activeTab === 'entry'
            ? 'bg-blue-600 text-white border-transparent'
            : 'bg-orange-600 text-white border-transparent'
            }`}>
            {activeTab === 'entry'
              ? <><QrCode className="w-4 h-4 text-white/80" /> SCAN PASS CODE FOR ENTRY</>
              : <><QrCode className="w-4 h-4 text-white/80" /> SCAN PASS CODE FOR DEPARTURE</>
            }
          </div>
        </>
      )}

      {/* Content */}
      {step === 'scan' ? (
        <ScanUI />
      ) : visitorMode === 'INSIDE' ? (
        <ExitPage />
      ) : (
        <EntryPage />
      )}
    </div>
  );
}