import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockAccounts = [
  { id: '1', name: 'USD Account', balance: 10000, currency: 'USD' },
  { id: '2', name: 'EUR Account', balance: 8500, currency: 'EUR' },
];

const mockTransactions = [
  { id: '1', date: '2026-02-18', description: 'Payment received', amount: 5000, status: 'completed' },
  { id: '2', date: '2026-02-17', description: 'Wire transfer', amount: -2500, status: 'completed' },
  { id: '3', date: '2026-02-16', description: 'Payment sent', amount: -1500, status: 'pending' },
];

export default function AccountOverview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Account Overview</h1>
        <p className="text-sm text-muted-foreground">Manage your treasury accounts and transactions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAccounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {account.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: account.currency,
                }).format(account.balance)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: Today, 10:30 AM
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="space-y-1">
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-xs text-muted-foreground">{tx.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={tx.amount > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(tx.amount)}
                  </div>
                  <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
