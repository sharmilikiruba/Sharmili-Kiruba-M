import StudentDashboardPage from "@/components/students/dashboard";
import DashboardLayout from "@/components/shared/layout";

export default function StudDashboard() {
   return(
    <DashboardLayout userRole="student" userName="John Doe" userEmail="john@example.com">
     <StudentDashboardPage/>
    </DashboardLayout>
   )
}