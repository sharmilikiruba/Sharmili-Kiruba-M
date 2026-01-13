import WalkInRegistration from "@/components/guard/walkin_registration";
import DashboardLayout from "@/components/shared/layout";

export default function Reports() {
  return (
    <DashboardLayout userRole="guard" userName="Ram Kumar" userEmail="ram.guard@example.com" hostelInfo="Main Gate">
      <WalkInRegistration />
    </DashboardLayout>
  )
}