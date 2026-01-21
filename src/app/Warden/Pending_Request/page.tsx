import DashboardLayout from "@/components/shared/layout";
import PendingRequestsPage from "@/components/warden/pending_req/pending_req";

export default function PendingRequestPage() {
  return (
    <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
      <PendingRequestsPage />
    </DashboardLayout>
  )
}