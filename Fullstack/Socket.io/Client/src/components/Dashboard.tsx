import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to your Dashboard</CardTitle>
          <CardDescription>
            You are successfully logged in!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Name</h3>
                <p className="mt-1 text-lg">{user.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Email</h3>
                <p className="mt-1 text-lg">{user.email}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide">Member Since</h3>
              <p className="mt-1 text-lg">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage your account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 