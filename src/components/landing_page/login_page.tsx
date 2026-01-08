'use client'

import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('Student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const roles = ['Student', 'Warden', 'Admin', 'Guard']

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    setError('')

    switch (selectedRole) {
      case 'Admin':
        router.push('/admin/dashboard')
        break
      case 'Warden':
        router.push('/warden/dashboard')
        break
      case 'Guard':
        router.push('/guard/dashboard')
        break
      case 'Student':
        router.push('/student/dashboard')
        break
      default:
        router.push('/login')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
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
                className="w-full px-4 py-3 border rounded-lg"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-3 border rounded-lg"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-3 border rounded-lg pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            {/* Remember */}
            <div className="flex justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => router.push('/forgot-password')}
                className="text-sm text-blue-600"
              >
                Forgot password?
              </button>
            </div>

            {/* Login */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Login
            </button>

            <p className="text-center text-sm text-gray-500">
              Demo: enter any credentials
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 text-center">
        <button
          onClick={() => router.push('/login/homepage')}
          className="text-blue-600 flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>
    </div>
  )
}
