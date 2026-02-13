'use client'

import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('Student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const roles = ['Student', 'Warden', 'Admin', 'Guard']

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      // ✅ Pass role to backend
      const loggedInUser = await login(email, password, selectedRole)

      // ✅ Validate backend response
      if (!loggedInUser || typeof loggedInUser !== 'object') {
        throw new Error('Invalid response from server')
      }

      // ✅ Safe role handling
      const role = String(loggedInUser.role || selectedRole).toLowerCase()

      switch (role) {
        case 'admin':
          router.push('/Admin/Admin_dashboard')
          break
        case 'warden':
          router.push('/Warden/WardenDashboard')
          break
        case 'guard':
          router.push('/Guard/guard_dashboard')
          break
        case 'student':
          router.push('/student/student_dashboard')
          break
        default:
          throw new Error('Unknown user role')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err?.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
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
                  onClick={() => router.push('/login/forgot-password')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Login
                  </>
                )}
              </button>

              {/* Register */}
              <button
                onClick={() => router.push('/login/registration')}
                className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                Register Admin
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
    </>
  )
}
