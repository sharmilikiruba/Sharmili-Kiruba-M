import DashboardLayout from "@/components/shared/layout";
import ReportsPage from "@/components/admin/reports/admin_reports";

export default function ReportAnalysis() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <ReportsPage/>
    </DashboardLayout>
  )
}   