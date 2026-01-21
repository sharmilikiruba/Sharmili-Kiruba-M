import DashboardLayout from "@/components/shared/layout";
import HostelStudents from "@/components/warden/hostel_students/hostel_student";

export default function HostelStudentPage() {
  return (
    <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
    <HostelStudents />
    </DashboardLayout>
  )
}