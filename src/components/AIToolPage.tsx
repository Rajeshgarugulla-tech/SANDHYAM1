'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { iconRegistry } from '@/lib/iconRegistry';

interface AIToolPageProps {
  iconName: keyof typeof iconRegistry;
  title: string;
  description: string;
  inputPlaceholder: string;
  examples?: string[];
}

export default function AIToolPage({
  iconName,
  title,
  description,
  inputPlaceholder,
  examples,
}: AIToolPageProps) {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState('');

  const Icon = iconRegistry[iconName];

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setResult(
        `Generated result for: "${input}"\n\nThis is a placeholder. Connect to your AI API to generate real content.`
      );
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <Icon size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-600">{description}</p>
          </div>
        </div>
      </Card>

      {/* Input Section */}
      <Card className="border border-slate-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Describe your request
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              Be specific for better results. Include details about your business, target audience, or goals.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? '⚡ Generating...' : '✨ Generate'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setInput('');
                setResult('');
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Examples Section */}
      {examples && examples.length > 0 && (
        <Card className="border border-slate-200">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">📝 Example Requests</h3>
            <div className="space-y-2">
              {examples.map((example, idx) => (
                <div
                  key={idx}
                  onClick={() => setInput(example)}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-lg cursor-pointer transition-colors text-sm text-slate-700 hover:text-blue-600"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Result Section */}
      {result && (
        <Card className="border border-emerald-200 bg-emerald-50">
          <div className="space-y-3">
            <h3 className="font-semibold text-emerald-900">✅ Generated Result</h3>
            <div className="bg-white border border-emerald-200 rounded-lg p-4 whitespace-pre-wrap text-sm text-slate-700 max-h-96 overflow-y-auto">
              {result}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  alert('Copied to clipboard!');
                }}
              >
                📋 Copy
              </Button>
              <Button variant="outline" size="sm">
                💾 Save
              </Button>
              <Button variant="outline" size="sm">
                🔄 Regenerate
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Info Section */}
      <Card className="border border-slate-200 bg-blue-50">
        <div className="space-y-2">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> The more details you provide, the better the AI-generated result will be. Include your business type, target audience, and specific goals.
          </p>
        </div>
      </Card>
    </div>
  );
}
