import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Hostel } from './types';
import { ViewField } from '../users/UserComponents';

interface HostelViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    hostel: Hostel | null;
    wardenDetails?: {
        empId?: string;
        dateOfJoining?: string;
        address?: string;
        email?: string;
        contact?: string;
    };
}

export const HostelViewModal: React.FC<HostelViewModalProps> = ({ isOpen, onClose, hostel, wardenDetails }) => {
    const [hostelData, setHostelData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHostelDetails = async () => {
            if (!hostel?.hostel_id) return;

            setLoading(true);
            try {
                const apiClient = (await import('@/lib/api-client')).default;
                const response = await apiClient.get(`/admin/hostels/${hostel.hostel_id}`);
                if (response.data.success) {
                    setHostelData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching hostel details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && hostel) {
            fetchHostelDetails();
        }
    }, [isOpen, hostel]);

    if (!isOpen || !hostel) return null;

    const displayData = hostelData || hostel;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                    <h2 className="text-xl font-bold text-gray-900">Hostel Details</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading hostel details...</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-600 border-b pb-2">Basic Information</h3>
                            <ViewField label="Hostel Name" value={displayData.hostel_name || displayData.name} />
                            <ViewField label="Address" value={displayData.location || displayData.address} />
                            <ViewField label="Type" value={displayData.hostel_type || displayData.type} />
                            <div className="grid grid-cols-2 gap-4">
                                <ViewField label="Total Rooms" value={(displayData.total_rooms || displayData.rooms || 0).toString()} />
                                <ViewField label="Capacity" value={(displayData.capacity || hostel?.capacity || (displayData.total_rooms ? displayData.total_rooms * 2 : 0) || 0).toString()} />
                            </div>
                            <ViewField label="Status" value={displayData.status || 'Active'} />
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-600 border-b pb-2">Warden Information</h3>
                            {Array.isArray(displayData.wardens) && displayData.wardens.length > 0 ? (
                                <div className="space-y-6">
                                    {displayData.wardens.map((w: any, index: number) => (
                                        <div key={w.warden_id || index} className={`${index > 0 ? 'pt-4 border-t border-gray-100' : ''}`}>
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Warden {displayData.wardens.length > 1 ? index + 1 : ''}</h4>
                                            <ViewField label="Warden Name" value={w.name || w.user?.username || 'Unknown'} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <ViewField label="Employee ID" value={w.emp_id || 'N/A'} />
                                                <ViewField label="Contact" value={w.phone || w.user?.phone || 'N/A'} />
                                            </div>
                                            <ViewField label="Email" value={w.user?.email || 'N/A'} />
                                            <ViewField label="Joining Date" value={w.joining_date || 'N/A'} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ViewField label="Warden Name" value={displayData.warden_name || displayData.warden || 'Unassigned'} />
                            )}
                        </section>
                    </div>
                )}

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
