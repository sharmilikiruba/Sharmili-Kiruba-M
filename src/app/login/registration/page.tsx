'use client'

import { RegisterAdminForm } from "@/components/landing_page/registrationform"
import { useRouter } from "next/navigation"

export default function RegistrationPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <RegisterAdminForm onBackToLogin={() => router.push('/login/login_page')} />
            </div>
        </div>
    )
}
