import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, Lock, LockOpen, MoreVertical } from 'lucide-react';

const mockAssets = [
  { id: '1', name: 'Algo', symbol: 'ALGO', icon: '◆', total: '100 ALGO', reserved: '100 ALGO', quarantined: '100 ALGO', locked: false },
  { id: '2', name: 'Avalanche', symbol: 'AVAX', icon: '🔺', total: '100001 AVAX', reserved: '100001 AVAX', quarantined: '100001 AVAX', locked: false },
  { id: '3', name: 'Binance', symbol: 'BNB', icon: '◆', total: '12 BNB', reserved: '12 BNB', quarantined: '12 BNB', locked: false },
  { id: '4', name: 'Bitcoin', symbol: 'BTC', icon: '₿', total: '19 BTC', reserved: '19 BTC', quarantined: '19 BTC', locked: true },
  { id: '5', name: 'Ether', symbol: 'ETH', icon: '◆', total: '221.0097785 ETH', reserved: '221.0097785 ETH', quarantined: '221.0097785 ETH', locked: false },
  { id: '6', name: 'Ether', symbol: 'ETH', icon: '◆', total: '22.098761 ETH', reserved: '22.098761 ETH', quarantined: '22.098761 ETH', locked: false },
  { id: '7', name: 'Polygon', symbol: 'MATIC', icon: '◆', total: '50.0000026 MATIC', reserved: '50.0000026 MATIC', quarantined: '50.0000026 MATIC', locked: true },
  { id: '8', name: 'Solana', symbol: 'SOL', icon: '◆', total: '0.002412 SOL', reserved: '0.002412 SOL', quarantined: '0.002412 SOL', locked: false },
  { id: '9', name: 'Tether', symbol: 'USDT', icon: '₮', total: '0.002412 USDT', reserved: '0.002412 USDT', quarantined: '0.002412 USDT', locked: false },
];

export default function AssetsPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Account Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">&lt;Account name&gt;</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ledgers available</span>
              <div className="flex gap-1">
                <Badge variant="secondary" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">1</Badge>
                <Badge variant="secondary" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">2</Badge>
                <Badge variant="secondary" className="rounded-full w-6 h-6 p-0 flex items-center justify-center bg-blue-600 text-white">3</Badge>
                <span className="text-sm text-muted-foreground">+5</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <span>Release quarantined transfers</span>
              <Badge variant="secondary">33</Badge>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Quick transfer</Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-6">
            <button className="pb-3 border-b-2 border-blue-600 text-sm font-medium">Overview</button>
            <button className="pb-3 text-sm text-muted-foreground hover:text-foreground">Transactions</button>
            <button className="pb-3 text-sm text-muted-foreground hover:text-foreground">Transaction orders</button>
            <button className="pb-3 text-sm text-muted-foreground hover:text-foreground">Manifests</button>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                Total balance
                <span className="text-xs">ⓘ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">654,975.06 USD</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <span>↑</span>
                <span>+32,908 USD</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                Reserved
                <span className="text-xs">ⓘ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20,213.00 USD</div>
              <div className="text-sm text-red-600 flex items-center gap-1">
                <span>↓</span>
                <span>-124</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                Quarantined
                <span className="text-xs">ⓘ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">59,878.65 USD</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <span>↑</span>
                <span>+0.01%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assets</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="text-blue-600">◉ Columns</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="text-blue-600">
                  My Custom Filter 1 ×
                </Button>
              </div>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by lorem ipsum"
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium">Name ↕</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Total balance ↕</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Reserved ↕</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Quarantined ↕</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Lock status ↕</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockAssets.map((asset) => (
                    <tr key={asset.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                            {asset.icon}
                          </div>
                          <span className="font-medium">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{asset.total}</td>
                      <td className="px-4 py-3">{asset.reserved}</td>
                      <td className="px-4 py-3">{asset.quarantined}</td>
                      <td className="px-4 py-3">
                        {asset.locked ? (
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 gap-1">
                            <Lock className="h-3 w-3" />
                            Locked
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 gap-1">
                            <LockOpen className="h-3 w-3" />
                            Unlocked
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <select className="border rounded px-2 py-1 text-sm">
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="text-sm text-muted-foreground">12,345 Results</span>
              </div>

              <div className="flex items-center gap-2">
                <select className="border rounded px-2 py-1 text-sm">
                  <option>1</option>
                </select>
                <span className="text-sm text-muted-foreground">of 492 pages</span>
                <Button variant="outline" size="sm">&gt;</Button>
                <Button variant="outline" size="sm">&gt;&gt;</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
