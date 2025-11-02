import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const mockCerts = {
  'M/HTC/FIC/825': {
    registrationNumber: 'M/HTC/FIC/825',
    studentName: 'Sample Student',
    course: 'Foundations in Computing',
    courseDuration: '6 Months',
    dateOfAward: '2024-08-15',
    image:
      'https://res.cloudinary.com/dldtfwvxa/image/upload/v1761794277/hitec_qelt8j.jpg',
  },
};

const Verify = () => {
  const [certNo, setCertNo] = useState('');
  const [result, setResult] = useState(null); // null | { ok: boolean, data?: any }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const key = certNo.trim();
    await new Promise((r) => setTimeout(r, 500));
    const data = mockCerts[key];
    if (data) setResult({ ok: true, data });
    else setResult({ ok: false });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-4">
          {/* Card */}
          <div className="bg-card rounded-brand shadow-brand-lg border border-border overflow-hidden">
            {/* Card Header */}
            <div className="bg-primary/10 border-b border-border px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Icon name="ShieldCheck" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Verify Credentials</h1>
                <p className="text-sm text-muted-foreground">Enter the certificate registration number to verify authenticity.</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <form onSubmit={onVerify} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Certificate Number</label>
                  <div className="flex gap-3">
                    <Input
                      placeholder="e.g., M/HTC/FIC/825"
                      value={certNo}
                      onChange={(e) => setCertNo(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" loading={loading} iconName="Search">
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Case-sensitive. Use the exact format printed on the certificate.</p>
                </div>
              </form>

              {/* Results */}
              <div className="mt-6 space-y-4">
                {result && result.ok && (
                  <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-green-900">
                    <div className="flex items-start gap-3">
                      <Icon name="BadgeCheck" className="mt-0.5" />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-1">Certificate Verified</h2>
                        <p className="mb-4 text-sm">
                          The registration number {result.data.registrationNumber} is valid and issued by Hi-tec College.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-muted-foreground">Student Name</div>
                            <div className="font-medium">{result.data.studentName}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-muted-foreground">Course</div>
                            <div className="font-medium">{result.data.course}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-muted-foreground">Course Duration</div>
                            <div className="font-medium">{result.data.courseDuration}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-muted-foreground">Date of Award</div>
                            <div className="font-medium">{result.data.dateOfAward}</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="block text-sm text-muted-foreground mb-2">Image</span>
                          <img
                            src={result.data.image}
                            alt="Certificate or student"
                            className="max-h-64 rounded border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {result && !result.ok && (
                  <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-900">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertTriangle" className="mt-0.5" />
                      <div>
                        <h2 className="text-lg font-semibold mb-1">Certificate Invalid</h2>
                        <p className="text-sm">Not a valid certificate.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Verify;
