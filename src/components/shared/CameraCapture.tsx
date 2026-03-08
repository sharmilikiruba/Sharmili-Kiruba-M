"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, CameraOff, RefreshCw, SwitchCamera, X, Check } from 'lucide-react';

interface CameraCaptureProps {
    onCapture: (blob: Blob, base64: string) => void;
    onClose: () => void;
    title?: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose, title = "Capture Photo" }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceIdx, setActiveDeviceIdx] = useState(0);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const stopStream = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    const startCamera = useCallback(async (device?: MediaDeviceInfo) => {
        stopStream();
        setIsInitializing(true);
        setError(null);

        try {
            const constraints: MediaStreamConstraints = {
                video: device
                    ? { deviceId: { exact: device.deviceId } }
                    : { facingMode: "environment" } // Default to back camera on mobile
            };

            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);

            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }

            // Get all video input devices if not already done
            if (devices.length === 0) {
                const allDevices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = allDevices.filter(d => d.kind === 'videoinput');
                setDevices(videoDevices);

                // Find current device index
                if (device) {
                    const idx = videoDevices.findIndex(d => d.deviceId === device.deviceId);
                    if (idx !== -1) setActiveDeviceIdx(idx);
                }
            }
        } catch (err: any) {
            console.error("Camera access error:", err);
            if (err.name === "NotAllowedError") {
                setError("Camera permission denied. Please allow access in browser settings.");
            } else {
                setError("Could not access camera. Ensure no other app is using it.");
            }
        } finally {
            setIsInitializing(false);
        }
    }, [devices.length, stopStream]);

    useEffect(() => {
        startCamera();
        return () => stopStream();
    }, []);

    const switchCamera = () => {
        if (devices.length < 2) return;
        const nextIdx = (activeDeviceIdx + 1) % devices.length;
        setActiveDeviceIdx(nextIdx);
        startCamera(devices[nextIdx]);
    };

    const capturePhoto = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const base64 = canvas.toDataURL('image/jpeg', 0.8);
            setCapturedImage(base64);

            canvas.toBlob((blob) => {
                if (blob) {
                    // Keep preview, let user confirm
                }
            }, 'image/jpeg', 0.8);
        }
    };

    const confirmCapture = () => {
        if (capturedImage) {
            // Convert base64 to blob for the callback
            fetch(capturedImage)
                .then(res => res.blob())
                .then(blob => {
                    onCapture(blob, capturedImage);
                    onClose();
                });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">

                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-gray-800 bg-gray-900">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Camera className="w-5 h-5 text-blue-400" /> {title}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-400 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Viewport */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                    {!capturedImage ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                            />

                            {isInitializing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                                    <RefreshCw className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                                    <p>Initializing Camera...</p>
                                </div>
                            )}

                            {error && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                                    <CameraOff className="w-16 h-16 text-red-500 mb-4" />
                                    <p className="text-lg font-medium mb-4">{error}</p>
                                    <button onClick={() => startCamera()} className="bg-white text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                                        <RefreshCw className="w-4 h-4" /> Try Again
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                    )}
                </div>

                {/* Controls */}
                <div className="p-6 bg-gray-900 flex items-center justify-center gap-6">
                    {!capturedImage ? (
                        <>
                            {devices.length > 1 && (
                                <button
                                    onClick={switchCamera}
                                    className="p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all border border-gray-700"
                                    title="Switch Camera"
                                >
                                    <SwitchCamera className="w-6 h-6" />
                                </button>
                            )}

                            <button
                                onClick={capturePhoto}
                                disabled={isInitializing || !!error}
                                className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                <div className="w-16 h-16 rounded-full border-4 border-gray-900 flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-gray-900" />
                                </div>
                            </button>

                            <div className="w-14"></div> {/* Spacer for symmetry if switch btn is present */}
                        </>
                    ) : (
                        <div className="flex gap-4 w-full px-4">
                            <button
                                onClick={() => setCapturedImage(null)}
                                className="flex-1 bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-gray-700 transition-all border border-gray-700 flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" /> Retake
                            </button>
                            <button
                                onClick={confirmCapture}
                                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <Check className="w-5 h-5" /> Use Photo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CameraCapture;
