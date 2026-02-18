import AppLayout from '@/components/layout/AppLayout';
import AccountOverview from '@/components/dashboard/AccountOverview';

export default function DashboardPage() {
  return (
    <AppLayout>
      <AccountOverview />
    </AppLayout>
  );
}
