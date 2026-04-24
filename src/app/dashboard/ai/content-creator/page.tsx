'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { AccessRestricted } from '@/components/RoleGuard';
import { useCurrentUserRole } from '@/hooks/useCurrentUserRole';
import { hasToolAccess } from '@/lib/dashboardData';
import { Sparkles, Copy, Heart, Share2, Download } from 'lucide-react';

export default function ContentCreatorPage() {
  const { userRole } = useCurrentUserRole();
  const [contentType, setContentType] = useState<'instagram' | 'reels' | 'festival'>('instagram');
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contents, setContents] = useState<
    Array<{ id: number; type: 'instagram' | 'reels' | 'festival'; content: string; likes: number; comments: number; saves: number }>
  >([]);

  if (!hasToolAccess(userRole, 'content-creator')) {
    return <AccessRestricted userRole={userRole} toolId="content-creator" />;
  }

  const contentTypes = [
    { id: 'instagram', label: '📸 Instagram Caption', emoji: '📸' },
    { id: 'reels', label: '🎬 Reels Script', emoji: '🎬' },
    { id: 'festival', label: '🎉 Festival Post', emoji: '🎉' },
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const mockContents = [
        {
          id: 1,
          type: contentType,
          content:
            '✨ Transform your look with our new collection! 💅\n\nSpring into style with our latest designs. Every piece tells a story of elegance and confidence.\n\n🌸 Limited time offer: 30% off on first booking\n\n#StyleBlogger #FashionTrends #NewCollection',
          likes: 1243,
          comments: 89,
          saves: 234,
        },
        {
          id: 2,
          type: contentType,
          content:
            '🎯 This season demands attention to detail\n\nOur expert team brings you personalized service that turns heads. Quality over quantity, always.\n\n📞 Book your appointment today\n\n#QualityService #ExpertTeam #TrendSetters',
          likes: 987,
          comments: 156,
          saves: 345,
        },
      ];

      setContents(mockContents);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-4 bg-gradient-to-br from-pink-600 to-pink-500 text-white rounded-lg">
          <Sparkles size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Content Creator AI</h1>
          <p className="text-gray-600">Generate Instagram posts, reels scripts & festival content</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Content Type Selector */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Content Type</h3>
            <div className="space-y-2">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id as 'instagram' | 'reels' | 'festival')}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    contentType === type.id
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Input Card */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Your Topic</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your business, product, or the message you want to convey..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 resize-none text-sm"
            />
            <Button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              variant="primary"
              className="w-full mt-3"
            >
              {isGenerating ? '✨ Creating...' : '🚀 Generate Content'}
            </Button>
          </Card>

          {/* Quick Templates */}
          <Card>
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Quick Templates</h4>
            <div className="space-y-2">
              {[
                'Salon new service promo',
                'Product launch announcement',
                'Customer testimonial',
                'Behind-the-scenes',
              ].map((template, i) => (
                <button
                  key={i}
                  onClick={() => setInput(template)}
                  className="text-xs w-full p-2 bg-pink-50 text-pink-700 rounded hover:bg-pink-100 text-left"
                >
                  {template}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Content Display */}
        <div className="lg:col-span-3">
          {contents.length > 0 ? (
            <div className="space-y-4">
              {contents.map((content) => (
                <Card key={content.id} className="bg-gradient-to-br from-pink-50 to-rose-50">
                  <div className="space-y-4">
                    {/* Content */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                        {content.content}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-pink-600 font-semibold">
                          <Heart size={16} /> {content.likes}
                        </div>
                        <p className="text-xs text-gray-500">Likes</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-blue-600 font-semibold">
                          <Share2 size={16} /> {content.comments}
                        </div>
                        <p className="text-xs text-gray-500">Comments</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-purple-600 font-semibold">
                          ↗️ {content.saves}
                        </div>
                        <p className="text-xs text-gray-500">Saves</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1 flex items-center justify-center gap-2"
                      >
                        <Copy size={16} /> Copy
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-dashed border-pink-300">
              <div className="text-center py-16">
                <Sparkles size={48} className="mx-auto text-pink-300 mb-4 opacity-50" />
                <p className="text-gray-600 font-semibold">No content generated yet</p>
                <p className="text-gray-500 text-sm mt-2">
                  Pick a content type, describe your topic, and let AI create engaging posts
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
