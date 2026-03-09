"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, CameraOff, AlertCircle, RefreshCw } from 'lucide-react';

interface QRScannerProps {
    onScanSuccess: (decodedText: string) => void;
    onScanFailure?: (error: string) => void;
    isActive: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure, isActive }) => {
    const [error, setError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [hasCamera, setHasCamera] = useState(true);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isTransitioning = useRef(false);
    const regionId = "qr-reader-region";

    useEffect(() => {
        let isMounted = true;

        const syncScanner = async () => {
            if (isActive) {
                await startScanner();
            } else {
                await stopScanner();
            }
        };

        syncScanner();

        return () => {
            isMounted = false;
            stopScanner();
        };
    }, [isActive]);

    const startScanner = async () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        setIsInitializing(true);
        setError(null);

        try {
            // Ensure any existing scanner is stopped first
            if (scannerRef.current) {
                try {
                    if (scannerRef.current.isScanning) {
                        await scannerRef.current.stop();
                    }
                    scannerRef.current.clear();
                } catch (e) {
                    console.warn("Error cleaning up previous scanner", e);
                }
            }

            // Small delay to ensure the container is rendered
            await new Promise(resolve => setTimeout(resolve, 200));

            const html5QrCode = new Html5Qrcode(regionId);
            scannerRef.current = html5QrCode;

            const config = {
                fps: 20, // Higher FPS for smoother scanning
                qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
                    const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
                    const qrboxSize = Math.floor(minEdge * 0.7);
                    return {
                        width: qrboxSize,
                        height: qrboxSize
                    };
                },
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                aspectRatio: 1.0
            };

            await html5QrCode.start(
                { facingMode: "environment" }, // Prefer back camera (environment) 
                config,
                (decodedText) => {
                    onScanSuccess(decodedText);
                },
                (errorMessage) => {
                    // Failure callback is noisy, we usually ignore it
                }
            );
        } catch (err: any) {
            console.error("Camera access error:", err);
            if (err.toString().includes("NotAllowedError")) {
                setError("Camera permission denied. Please allow access in browser settings.");
            } else if (err.toString().includes("NotFoundError")) {
                setHasCamera(false);
                setError("No camera found on this device.");
            } else {
                setError("Failed to access camera. Ensure no other app is using it.");
            }
        } finally {
            setIsInitializing(false);
            isTransitioning.current = false;
        }
    };

    const stopScanner = async () => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;

        if (scannerRef.current) {
            try {
                if (scannerRef.current.isScanning) {
                    await scannerRef.current.stop();
                }
                scannerRef.current.clear();
                scannerRef.current = null;
            } catch (err) {
                console.error("Failed to stop scanner:", err);
            }
        }
        isTransitioning.current = false;
    };

    return (
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-gray-800 bg-black shadow-2xl">
            {/* Scanner Region */}
            <div id={regionId} className="w-full h-[280px] sm:h-[350px]"></div>

            {/* Overlay UI */}
            {!isActive && !error && !isInitializing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 text-white p-6 text-center">
                    <CameraOff className="w-12 h-12 mb-4 opacity-50" />
                    <p className="font-medium">Scanner is inactive</p>
                </div>
            )}

            {isInitializing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 text-white">
                    <RefreshCw className="w-10 h-10 mb-4 animate-spin text-blue-400" />
                    <p className="font-medium">Requesting Camera Access...</p>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 text-white p-6 text-center">
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <h4 className="font-bold mb-2">Camera Error</h4>
                    <p className="text-sm opacity-90 mb-4">{error}</p>
                    <button
                        onClick={startScanner}
                        className="px-4 py-2 bg-white text-red-900 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                </div>
            )}

            {/* Scanning Indicator (only when active and no error) */}
            {isActive && !error && !isInitializing && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse shadow-lg border border-white/20">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    SCANNING LIVE
                </div>
            )}
        </div>
    );
};

export default QRScanner;
