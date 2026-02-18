import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Call API to create account and mark onboarding complete
      console.log('Account created:', { accountName, email });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up your treasury account</CardTitle>
          <CardDescription>
            Complete your account setup to start managing your treasury
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="My Treasury Account"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                minLength={3}
              />
            </div>

            {user?.walletAddress && !user?.email && (
              <div className="space-y-2">
                <Label htmlFor="email">Email for Notifications</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {user?.walletAddress && (
              <div className="rounded-lg border p-3 bg-blue-50">
                <div className="text-sm font-medium">Connected Wallet</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  {user.walletAddress}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
