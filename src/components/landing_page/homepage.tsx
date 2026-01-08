'use client'

import { Shield, Users, CheckCircle, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HVMSLanding() {
  const router = useRouter()

  const handleLogin = () => {
    // Redirect to login page
    router.push('/login/login_page')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HVMS</h1>
              <p className="text-sm text-gray-600">Hostel Visitor Management</p>
            </div>
          </div>
          <button 
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Hostel Visitor
            <br />
            <span className="text-blue-600">Management System</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Secure Visitor Entry & Exit Management for University Hostels. Streamline
            approvals, verify visitors, and maintain complete security records.
          </p>
          <button 
            onClick={handleLogin}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Login to Continue
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {/* Secure Entry */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Secure Entry
            </h3>
            <p className="text-gray-600 text-center text-sm">
              QR-based verification ensures only approved visitors enter
            </p>
          </div>

          {/* Role-Based Access */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Role-Based Access
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Students, Wardens, Guards, and Admins with specific permissions
            </p>
          </div>

          {/* Quick Approvals */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Quick Approvals
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Streamlined request and approval workflow
            </p>
          </div>

          {/* Multi-Hostel */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              Multi-Hostel
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Manage visitors across multiple hostels efficiently
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}