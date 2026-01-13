import DashboardLayout from "@/components/shared/layout";
import WardenReports from "@/components/warden/warden_report";

export default function WardenReportsPage() {
  return (
    <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
      <WardenReports />
    </DashboardLayout>
  )
}