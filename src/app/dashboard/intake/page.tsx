'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Upload, Mic, Link as LinkIcon, MapPin, FileText } from 'lucide-react';

type IntakeMode = 'website_url' | 'business_text' | 'pdf_document' | 'voice_note' | 'maps_link';
type IntakeReport = {
  businessProfile?: {
    businessName?: string;
    businessCategory?: string;
    location?: string;
    targetAudience?: string;
    services?: string[];
    currentWeaknesses?: string[];
    missingGrowthOpportunities?: string[];
  };
  autoSummary?: {
    oneLiner?: string;
    biggestGrowthProblem?: string;
    biggestOpportunity?: string;
    quickWin30Day?: string;
  };
  scores?: {
    businessHealthScore?: number;
    aiVisibilityScore?: number;
    leadConversionScore?: number;
    contentConsistencyScore?: number;
  };
  todayActions?: string[];
};

type SpeechWindow = Window & {
  webkitSpeechRecognition?: new () => {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
    onerror: ((event: unknown) => void) | null;
    start: () => void;
    stop: () => void;
  };
};

export default function IntakePage() {
  const router = useRouter();
  const [mode, setMode] = useState<IntakeMode>('website_url');
  const [sourceValue, setSourceValue] = useState('');
  const [businessText, setBusinessText] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reportPreview, setReportPreview] = useState<IntakeReport | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const startVoiceCapture = () => {
    const w = window as SpeechWindow;
    const Recognition = w.webkitSpeechRecognition;
    if (!Recognition) {
      setError('Voice capture is not supported in this browser. Please paste voice text manually.');
      return;
    }
    setError('');
    const recognition = new Recognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceText((prev) => `${prev} ${transcript}`.trim());
      setIsRecording(false);
    };
    recognition.onerror = () => {
      setError('Voice recognition failed. Try again.');
      setIsRecording(false);
    };
    setIsRecording(true);
    recognition.start();
  };

  useEffect(() => {
    fetch('/api/intake/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.report) {
          setReportPreview(data.report as IntakeReport);
        }
      })
      .catch(() => {
        // no-op
      });
  }, []);

  const validateInput = () => {
    if ((mode === 'website_url' || mode === 'maps_link') && !sourceValue.trim()) {
      return 'Please enter a URL.';
    }
    if (mode === 'website_url' && !/^https?:\/\//i.test(sourceValue.trim())) {
      return 'Website URL should start with http:// or https://';
    }
    if (mode === 'maps_link' && !/^https?:\/\//i.test(sourceValue.trim())) {
      return 'Maps link should start with http:// or https://';
    }
    if (mode === 'business_text' && businessText.trim().length < 20) {
      return 'Please provide more business details (minimum 20 characters).';
    }
    if (mode === 'voice_note' && voiceText.trim().length < 10) {
      return 'Please record or paste voice transcript.';
    }
    if (mode === 'pdf_document' && !pdfFile) {
      return 'Please upload a PDF file.';
    }
    return '';
  };

  const runAnalysis = async () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const formData = new FormData();
      formData.append('sourceType', mode);
      formData.append('sourceValue', sourceValue);
      formData.append('businessText', businessText);
      formData.append('voiceText', voiceText);
      if (pdfFile) formData.append('pdfFile', pdfFile);

      const response = await fetch('/api/intake/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Analysis failed');
      }
      setReportPreview(data.report as IntakeReport);
      setSuccessMessage('Analysis completed. Dashboard summary is updated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
        <h1 className="text-3xl font-bold text-slate-900">Paste Once. Grow Daily.</h1>
        <p className="text-slate-600 mt-2">
          Provide website URL, text, PDF, voice, or Google Maps link. Saadhyam AI automatically builds your business growth report.
        </p>
      </Card>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {[
            { id: 'website_url', label: 'Website', icon: LinkIcon },
            { id: 'business_text', label: 'Business Text', icon: FileText },
            { id: 'pdf_document', label: 'PDF', icon: Upload },
            { id: 'voice_note', label: 'Voice', icon: Mic },
            { id: 'maps_link', label: 'Maps Link', icon: MapPin },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id as IntakeMode)}
                className={`p-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 ${
                  mode === item.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        {(mode === 'website_url' || mode === 'maps_link') && (
          <input
            value={sourceValue}
            onChange={(e) => setSourceValue(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder={mode === 'website_url' ? 'https://yourbusiness.com' : 'https://maps.google.com/...'}
          />
        )}

        {mode === 'business_text' && (
          <textarea
            value={businessText}
            onChange={(e) => setBusinessText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 min-h-36"
            placeholder="Paste your business details..."
          />
        )}

        {mode === 'pdf_document' && (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg px-3 py-2"
          />
        )}

        {mode === 'voice_note' && (
          <div className="space-y-3">
            <textarea
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 min-h-32"
              placeholder="Record voice or paste transcript..."
            />
            <Button variant="outline" onClick={startVoiceCapture}>
              {isRecording ? 'Recording...' : 'Start Voice Capture'}
            </Button>
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <Button onClick={runAnalysis} loading={loading}>
            Run Auto Analysis
          </Button>
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button variant="outline" onClick={() => router.push('/dashboard/generate')}>
            Use in Generate
          </Button>
        </div>
        {error ? <p className="text-sm text-red-600 mt-3">{error}</p> : null}
        {successMessage ? <p className="text-sm text-emerald-700 mt-3">{successMessage}</p> : null}
      </Card>

      {reportPreview ? (
        <div className="space-y-4">
          <Card className="bg-emerald-50 border-emerald-200">
            <h3 className="font-bold text-slate-900 mb-2">Business Summary</h3>
            <p className="text-sm text-slate-700 mb-3">{reportPreview.autoSummary?.oneLiner || '-'}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
              <p><span className="font-semibold">Business:</span> {reportPreview.businessProfile?.businessName || '-'}</p>
              <p><span className="font-semibold">Category:</span> {reportPreview.businessProfile?.businessCategory || '-'}</p>
              <p><span className="font-semibold">Location:</span> {reportPreview.businessProfile?.location || '-'}</p>
              <p><span className="font-semibold">Audience:</span> {reportPreview.businessProfile?.targetAudience || '-'}</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <p className="text-xs text-slate-500">Business Health</p>
              <p className="text-2xl font-bold">{reportPreview.scores?.businessHealthScore ?? '-'}/100</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-500">AI Visibility</p>
              <p className="text-2xl font-bold">{reportPreview.scores?.aiVisibilityScore ?? '-'}/100</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-500">Lead Conversion</p>
              <p className="text-2xl font-bold">{reportPreview.scores?.leadConversionScore ?? '-'}/100</p>
            </Card>
            <Card>
              <p className="text-xs text-slate-500">Content Consistency</p>
              <p className="text-2xl font-bold">{reportPreview.scores?.contentConsistencyScore ?? '-'}/100</p>
            </Card>
          </div>

          <Card>
            <h3 className="font-bold text-slate-900 mb-2">Do This Today</h3>
            <ul className="space-y-1 text-sm text-slate-700">
              {(reportPreview.todayActions || []).slice(0, 5).map((task) => (
                <li key={task}>- {task}</li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
