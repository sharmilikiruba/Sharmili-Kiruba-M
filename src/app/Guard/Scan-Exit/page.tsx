import ScanExit from "@/components/guard/scan_exit";
import DashboardLayout from "@/components/shared/layout";

export default function Reports() {
  return (
    <DashboardLayout userRole="guard" userName="Ram Kumar" userEmail="ram.guard@example.com" hostelInfo="Main Gate">
      <ScanExit />
    </DashboardLayout>
  )
}