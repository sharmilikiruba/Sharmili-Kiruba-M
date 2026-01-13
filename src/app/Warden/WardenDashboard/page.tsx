import WardenDashboard from "@/components/warden/dashboard";
import DashboardLayout from "@/components/shared/layout";

export default function WardenDashboardPage() {
  return (
    <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
      <WardenDashboard />
    </DashboardLayout>
  )
}