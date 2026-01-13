import ScanEntry from "@/components/guard/scan_entry";
import DashboardLayout from "@/components/shared/layout";

export default function ScanEntrybtn() {
  return (
    <DashboardLayout userRole="guard" userName="Ram Kumar" userEmail="ram.guard@example.com" hostelInfo="Main Gate">
      <ScanEntry />
    </DashboardLayout>
  )
}