'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X, Save, Send } from 'lucide-react';

const NewVisitorRequestPage = () => {
  const router = useRouter();

  const studentInfo = {
    name: 'Rahul Sharma',
    rollNumber: '21CS101',
    hostelName: 'Krishna Hostel',
    roomNumber: 'A-204',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">New Visitor Request</h2>
                <p className="text-gray-600">Submit a request for visitor entry</p>
              </div>
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Student Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Student Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                    <p className="text-base font-semibold text-gray-900">{studentInfo.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                    <p className="text-base font-semibold text-gray-900">{studentInfo.rollNumber}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hostel</label>
                    <p className="text-base font-semibold text-gray-900">{studentInfo.hostelName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                    <p className="text-base font-semibold text-gray-900">{studentInfo.roomNumber}</p>
                  </div>
                </div>
              </div>

              {/* Visitor Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Visitor Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visitor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter visitor's full name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relation <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                      <option>Select relation</option>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Brother</option>
                      <option>Sister</option>
                      <option>Guardian</option>
                      <option>Friend</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visitor Photo</label>
                    <button className="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600">
                      <Upload size={18} />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof Type</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                      <option>Select ID type</option>
                      <option>Aadhaar Card</option>
                      <option>PAN Card</option>
                      <option>Driving License</option>
                      <option>Voter ID</option>
                      <option>Passport</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Proof Number</label>
                    <input
                      type="text"
                      placeholder="Enter ID number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Visit Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Visit Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Visit <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                      <option>Select purpose</option>
                      <option>Family Visit</option>
                      <option>Academic Discussion</option>
                      <option>Emergency</option>
                      <option>Document Delivery</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visit Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="dd-mm-yyyy"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visit Time</label>
                    <input
                      type="time"
                      placeholder="--:--"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Duration</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                      <option>Select duration</option>
                      <option>1-2 hours</option>
                      <option>2-4 hours</option>
                      <option>Half day</option>
                      <option>Full day</option>
                      <option>Multiple days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Location</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                      <option>Select location</option>
                      <option>Hostel Room</option>
                      <option>Visitor's Lounge</option>
                      <option>Campus Garden</option>
                      <option>Cafeteria</option>
                      <option>Library</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accompanying Persons</label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      defaultValue="0"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  onClick={handleBackClick}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                  <Save size={18} />
                  Save Draft
                </button>

                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <Send size={18} />
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewVisitorRequestPage;