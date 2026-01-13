import EmergencyVisit from "@/components/guard/Emergency_visit";
import DashboardLayout from "@/components/shared/layout";

export default function EmergencyVisitPage() {
  return (
    <DashboardLayout userRole="guard" userName="Ram Kumar" userEmail="ram.guard@example.com" hostelInfo="Main Gate">
      <EmergencyVisit />
    </DashboardLayout>
  )
}