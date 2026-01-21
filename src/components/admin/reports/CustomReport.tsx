import React, { useState } from 'react';
import { Eye, FileText, Download, X, AlertTriangle } from 'lucide-react';
import { VisitorStat } from './types';

export function CustomReport({ visitorData }: { visitorData: VisitorStat[] }) {
    const [selectedFields, setSelectedFields] = useState({
        visitorName: true,
        studentName: true,
        hostel: true,
        visitDate: true,
        entryTime: true,
        exitTime: true,
        duration: true,
        purpose: true,
        status: true,
    });

    const [sortBy, setSortBy] = useState('visitDate');
    const [sortOrder, setSortOrder] = useState('desc');
    const [exportFormat, setExportFormat] = useState('excel');
    const [showPreview, setShowPreview] = useState(false);
    const [savedConfigs, setSavedConfigs] = useState<any[]>([]);

    const sampleData = visitorData.map(stat => ({
        visitorName: stat.visitor,
        studentName: stat.student,
        hostel: 'Krishna Hostel',
        visitDate: stat.date,
        entryTime: stat.entryTime,
        exitTime: stat.exitTime,
        duration: stat.duration,
        purpose: stat.purpose,
        status: stat.status,
    }));

    const handleFieldToggle = (field: keyof typeof selectedFields) => {
        setSelectedFields({ ...selectedFields, [field]: !selectedFields[field] });
    };

    const handlePreview = () => {
        if (Object.values(selectedFields).filter(Boolean).length === 0) {
            alert('Please select at least one field to preview');
            return;
        }
        setShowPreview(true);
    };

    const handleSaveConfiguration = () => {
        const configName = prompt('Enter a name for this configuration:');
        if (!configName) return;
        setSavedConfigs([...savedConfigs, { id: Date.now(), name: configName, fields: selectedFields, sortBy, sortOrder, exportFormat, savedAt: new Date().toISOString() }]);
        alert(`Configuration "${configName}" saved successfully!`);
    };

    const handleExport = async () => {
        const filteredData = sampleData.map(row => {
            const filtered: any = {};
            Object.keys(selectedFields).forEach(key => {
                if (selectedFields[key as keyof typeof selectedFields]) {
                    filtered[key] = row[key as keyof typeof row];
                }
            });
            return filtered;
        });
        // Simplified export for logic encapsulation
        alert(`Exporting ${filteredData.length} records as ${exportFormat}... (Logic in container)`);
    };

    const getFieldLabel = (field: string) => field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Custom Report Builder</h1>
                <p className="text-slate-600">Build your own report by selecting fields and filters</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Select Fields</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                        {['visitorName', 'studentName', 'hostel', 'visitDate', 'entryTime'].map(f => (
                            <label key={f} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                <input type="checkbox" checked={selectedFields[f as keyof typeof selectedFields]} onChange={() => handleFieldToggle(f as keyof typeof selectedFields)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                                <span className="text-sm text-slate-700">{getFieldLabel(f)}</span>
                            </label>
                        ))}
                    </div>
                    <div className="space-y-3">
                        {['exitTime', 'duration', 'purpose', 'status'].map(f => (
                            <label key={f} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                <input type="checkbox" checked={selectedFields[f as keyof typeof selectedFields]} onChange={() => handleFieldToggle(f as keyof typeof selectedFields)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                                <span className="text-sm text-slate-700">{getFieldLabel(f)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-8">
                    <div>
                        <label className="text-sm font-medium text-slate-600 mb-2 block">Sort By</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="visitDate">Visit Date</option>
                            <option value="visitorName">Visitor Name</option>
                            <option value="duration">Duration</option>
                            <option value="studentName">Student Name</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-600 mb-2 block">Sort Order</label>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200 flex gap-4">
                    <button onClick={handlePreview} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                        <Eye className="w-5 h-5" /> Preview Report
                    </button>
                    <button onClick={handleSaveConfiguration} className="px-6 py-3 border-2 border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                        <FileText className="w-5 h-5 inline-block mr-2" /> Save Config
                    </button>
                    <button onClick={handleExport} className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30">
                        <Download className="w-5 h-5 inline-block mr-2" /> Export
                    </button>
                </div>
            </div>

            {showPreview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800">Report Preview</h2>
                            <button onClick={() => setShowPreview(false)}><X className="w-6 h-6 text-slate-500" /></button>
                        </div>
                        <div className="flex-1 overflow-auto p-8">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 border-b-2 border-slate-300">
                                        {Object.entries(selectedFields).map(([k, v]) => v && <th key={k} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">{getFieldLabel(k)}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleData.map((row, idx) => (
                                        <tr key={idx} className="border-b border-slate-200">
                                            {Object.entries(selectedFields).map(([k, v]) => v && <td key={k} className="px-4 py-3 text-sm text-slate-700">{row[k as keyof typeof row]}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
