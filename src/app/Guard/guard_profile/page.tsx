import GuardProfile from "@/components/guard/profile/guard_profile";
import DashboardLayout from "@/components/shared/layout";

export default function Reports() {
  return (
    <DashboardLayout userRole="guard" userName="Ram Kumar" userEmail="ram.guard@example.com" hostelInfo="Main Gate">
      <GuardProfile />
    </DashboardLayout>
  )
}