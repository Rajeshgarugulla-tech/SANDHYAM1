'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { useLanguageStore } from '@/lib/useLanguage';

type GenerateTab = 'analysis' | 'content' | 'ads' | 'whatsapp' | 'website';
type GenerateResult = Record<string, unknown>;

export default function GeneratePage() {
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<GenerateTab>('content');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    businessName: 'My Salon',
    category: 'salon',
    businessType: 'salon',
    contentType: 'instagram_caption',
    messageType: 'followup',
    webContentType: 'about',
    goal: 'Increase bookings',
    audience: 'Women 25-45',
    budget: '₹1000-5000',
    keyMessage: 'New services',
    context: '',
  });

  useEffect(() => {
    fetch('/api/intake/latest')
      .then((res) => res.json())
      .then((data) => {
        const profile = data?.report?.businessProfile;
        if (profile) {
          setFormData((prev) => ({
            ...prev,
            businessName: profile.businessName || prev.businessName,
            category: profile.businessCategory || prev.category,
            keyMessage: profile.missingGrowthOpportunities?.[0] || prev.keyMessage,
            context: profile.currentWeaknesses?.join(', ') || prev.context,
          }));
        }
      })
      .catch(() => {
        // Keep defaults
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateContent = async () => {
    setLoading(true);
    setError('');
    try {
      let endpoint = '';
      let payload: Record<string, unknown> = {
        businessName: formData.businessName,
        category: formData.category,
        language: language,
      };

      switch (activeTab) {
        case 'analysis':
          endpoint = '/api/generate/analysis';
          payload = {
            ...payload,
            description: formData.context || 'A growing business',
            challenges: '',
            targetAudience: formData.audience,
          };
          break;
        case 'content':
          endpoint = '/api/generate/content';
          payload = {
            ...payload,
            contentType: formData.contentType,
            keyMessage: formData.keyMessage,
            postType: formData.keyMessage,
          };
          break;
        case 'ads':
          endpoint = '/api/generate/ads';
          payload = {
            ...payload,
            goal: formData.goal,
            audience: formData.audience,
            budget: formData.budget,
          };
          break;
        case 'whatsapp':
          endpoint = '/api/generate/whatsapp';
          payload = {
            ...payload,
            messageType: formData.messageType,
            context: { customerType: 'potential' },
          };
          break;
        case 'website':
          endpoint = '/api/generate/website';
          payload = {
            ...payload,
            contentType: formData.webContentType,
            context: { story: formData.context || 'Passionate entrepreneur' },
          };
          break;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Generation failed');
      }
      setResult(data.data);
    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Error generating content.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const tabs = [
    { id: 'analysis', label: '📊 Business Analysis', icon: '📊' },
    { id: 'content', label: '✍️ Content', icon: '✍️' },
    { id: 'ads', label: '📢 Ads', icon: '📢' },
    { id: 'whatsapp', label: '💬 WhatsApp', icon: '💬' },
    { id: 'website', label: '🌐 Website', icon: '🌐' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate AI Content</h2>
        <p className="text-gray-600">
          Choose what you want to create and let our AI do the heavy lifting
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as GenerateTab);
              setResult(null);
            }}
            className={`px-4 py-2.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Generation Form */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {tabs.find((t) => t.id === activeTab)?.label}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder="My Salon"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="salon">Salon</option>
              <option value="gym">Gym</option>
              <option value="shop">Shop</option>
              <option value="freelancer">Freelancer</option>
              <option value="restaurant">Restaurant</option>
              <option value="clinic">Clinic</option>
            </select>
          </div>
        </div>

        {/* Tab-specific inputs */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                name="contentType"
                value={formData.contentType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="instagram_caption">Instagram Caption</option>
                <option value="reels_script">Reels Script</option>
                <option value="festival_post">Festival Post</option>
              </select>
            </div>
            <Input
              label="Key Message"
              name="keyMessage"
              value={formData.keyMessage}
              onChange={handleInputChange}
              placeholder="What's your main message?"
            />
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              label="Goal"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="Increase bookings"
            />
            <Input
              label="Target Audience"
              name="audience"
              value={formData.audience}
              onChange={handleInputChange}
              placeholder="Women 25-45"
            />
            <Input
              label="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="₹1000-5000"
            />
          </div>
        )}

        {activeTab === 'whatsapp' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Type
            </label>
            <select
              name="messageType"
              value={formData.messageType}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              <option value="followup">Follow-up Sequence</option>
              <option value="closing">Closing Script</option>
              <option value="offer">Offer Message</option>
            </select>
          </div>
        )}

        {activeTab === 'website' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Type</label>
            <select
              name="webContentType"
              value={formData.webContentType}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              <option value="about">About Page</option>
              <option value="services">Services Page</option>
            </select>
          </div>
        )}

        {(activeTab === 'analysis' || activeTab === 'website') && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Info
            </label>
            <textarea
              name="context"
              value={formData.context}
              onChange={(e) => setFormData({ ...formData, context: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Tell us more about your business..."
            />
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={generateContent} loading={loading} size="lg">
            ✨ Generate Now
          </Button>
          <Button variant="outline" size="lg">
            View History
          </Button>
        </div>
      </Card>

      {/* Result Display */}
      {result && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">✅ Generated Content</h3>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Ready to use
            </span>
          </div>

          <div className="bg-white p-4 rounded-lg mb-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
              variant="primary"
            >
              📋 Copy
            </Button>
            <Button variant="secondary">🔄 Regenerate</Button>
            <Button variant="outline">💾 Save</Button>
            <Button variant="outline">🔗 Share</Button>
          </div>
        </Card>
      )}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {/* Usage Stats */}
      <Card>
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 This Month&apos;s Usage</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">18</p>
            <p className="text-sm text-gray-600">Content pieces</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Ad copies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-600">WhatsApp scripts</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">2</p>
            <p className="text-sm text-gray-600">Analysis reports</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          💡 Upgrade to Pro for unlimited generations
        </p>
      </Card>
    </div>
  );
}
