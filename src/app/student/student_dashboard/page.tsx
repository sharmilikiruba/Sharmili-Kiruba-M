import StudentDashboardPage from "@/components/students/dashboard";
import DashboardLayout from "@/components/shared/layout";

export default function StudDashboard() {
   return (
      <DashboardLayout userRole="student" userName="Rahul Sharma" userEmail="rahul.sharma@example.com" hostelInfo="Krishna Hostel" roomInfo="Room A-204">
         <StudentDashboardPage />
      </DashboardLayout>
   )
}