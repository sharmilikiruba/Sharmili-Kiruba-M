import VisitorHistory from "@/components/students/vistor_history";
import DashboardLayout from "@/components/shared/layout";

export default function VisitorHistoryPage() {
  return (
    <DashboardLayout userRole="student" userName="Rahul Sharma" userEmail="rahul.sharma@example.com" hostelInfo="Krishna Hostel" roomInfo="Room A-204">
      <VisitorHistory />
    </DashboardLayout>
  )
}