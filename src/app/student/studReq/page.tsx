import NewVisitorRequestPage from "@/components/students/Newrequest";
import DashboardLayout from "@/components/shared/layout";

export default function StudReq() {
  return (
    <DashboardLayout userRole="student" userName="Rahul Sharma" userEmail="rahul.sharma@example.com" hostelInfo="Krishna Hostel" roomInfo="Room A-204">
      <NewVisitorRequestPage />
    </DashboardLayout>
  )
}