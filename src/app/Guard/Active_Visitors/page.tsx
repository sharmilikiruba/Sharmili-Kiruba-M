import ActiveVisitors from "@/components/guard/active_visitors";
import DashboardLayout from "@/components/shared/layout";

export default function Reports() {
  return (
    <DashboardLayout>
      <ActiveVisitors />
    </DashboardLayout>
  )
}