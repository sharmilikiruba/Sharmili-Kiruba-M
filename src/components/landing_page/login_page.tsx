'use client'

import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ForgotPasswordModal from './forgot-password-modal'

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('Student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)

  const roles = ['Student', 'Warden', 'Admin', 'Guard']

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    setError('')

    switch (selectedRole) {
      case 'Admin':
        router.push('/Admin/Admin_dashboard')
        break
      case 'Warden':
        router.push('/Warden/WardenDashboard')
        break
      case 'Guard':
        router.push('/Guard/guard_dashboard')
        break
      case 'Student':
        router.push('/student/student_dashboard')
        break
      default:
        router.push('/login')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">

        {/* Header */}
        <div className="text-center pt-16 pb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">HVMS</h1>
          <p className="text-gray-600 text-lg">
            Hostel Visitor Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="flex-1 flex items-start justify-center px-4 pb-16">
          <div className="bg-white rounded-2xl shadow-xl border w-full max-w-md p-8">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-gray-600 mb-6">
              Enter your credentials to access your dashboard
            </p>

            <div className="space-y-6">

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Login As
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email or Mobile
                </label>
                <input
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email or mobile"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              {/* Remember */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login */}
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pb-8 text-center">
          <button
            onClick={() => router.push('/login/homepage')}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </>
  )
}