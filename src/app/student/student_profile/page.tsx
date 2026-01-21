import StudentProfile from "@/components/students/profile";
import DashboardLayout from "@/components/shared/layout";

export default function StudProfile() {
   return (
      <DashboardLayout userRole="student" userName="Rahul Sharma" userEmail="rahul.sharma@example.com" hostelInfo="Krishna Hostel" roomInfo="Room A-204">
         <StudentProfile />
      </DashboardLayout>
   )
}