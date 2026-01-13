import DashboardLayout from "@/components/shared/layout";
import WardenProfile from "@/components/warden/warden_profile";

export default function WardenProfilePage() {
  return (
    <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
      <WardenProfile />
    </DashboardLayout>
  )
}