'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    role: 'business_owner',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Signup failed');
      }
      localStorage.setItem('saadhyam_user_role', data.user.role);
      router.push('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h1>
          <p className="text-gray-600">Create your free account in 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="Priya Sharma"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Business Name"
            type="text"
            name="businessName"
            placeholder="My Salon"
            value={formData.businessName}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            helperText="At least 8 characters"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
            >
              <option value="business_owner">Business Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
