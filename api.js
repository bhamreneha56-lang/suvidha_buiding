import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Camera, Upload, RefreshCw, Shield,
  CheckCircle2, XCircle, AlertCircle, Loader2,
  ScanLine, Info, AlertTriangle
} from 'lucide-react';
import { recognizeCode } from '../services/ocr';
import {
  extractCylinderCode,
  parseCylinderCode,
  getCylinderStatus,
  formatDate,
} from '../utils/dateUtils';

/* ─────────────── Safety checklist shown after result ─────────────── */
const SAFETY_TIPS = [
  'Always check the test date before accepting a cylinder delivery.',
  'Inspect the cylinder for dents, rust, or damage before use.',
  'Ensure the safety cap and seal are intact.',
  'Store cylinders in well-ventilated areas away from heat sources.',
  'Never modify or tamper with the cylinder valve.',
  'In case of gas leak, do NOT switch on/off any electrical appliances.',
];

/* ─────────────── Status config ─────────────── */
const STATUS_CONFIG = {
  valid: {
    label: 'SAFE TO USE',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.35)',
    icon: CheckCircle2,
    msg: 'This cylinder is within its test validity period.',
  },
  expired: {
    label: 'EXPIRED – DO NOT USE',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.35)',
    icon: XCircle,
    msg: 'The test due date has passed. Return this cylinder to your distributor immediately.',
  },
  invalid: {
    label: 'CODE UNREADABLE',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.35)',
    icon: AlertCircle,
    msg: 'Could not detect a valid code. Try again with better lighting or enter the code manually.',
  },
};

/* ─────────────── Component ─────────────── */
const LpgCylinderSafety = () => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [mode, setMode] = useState('idle'); // idle | camera | processing | result
  const [capturedImage, setCapturedImage] = useState(null);
  const [rawText, setRawText] = useState('');
  const [detectedCode, setDetectedCode] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [useManual, setUseManual] = useState(false);
  const [result, setResult] = useState(null); // { status, parsed }
  const [ocrProgress, setOcrProgress] = useState(0);
  const [cameraError, setCameraError] = useState(false);

  /* ── Capture from webcam ── */
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      processImage(imageSrc);
    }
  }, [webcamRef]);

  /* ── Upload from gallery ── */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target.result;
      setCapturedImage(src);
      processImage(src);
    };
    reader.readAsDataURL(file);
  };

  /* ── OCR Processing ── */
  const processImage = async (imageSrc) => {
    setMode('processing');
    setOcrProgress(0);
    try {
      const text = await recognizeCode(imageSrc, (p) => {
        setOcrProgress(Math.round(p * 100));
      });
      setRawText(text);
      const code = extractCylinderCode(text);
      setDetectedCode(code || '');
      const status = getCylinderStatus(code);
      const parsed = parseCylinderCode(code);
      setResult({ status, parsed });
      setMode('result');
    } catch (err) {
      console.error(err);
      setResult({ status: 'invalid', parsed: null });
      setMode('result');
    }
  };

  /* ── Manual code check ── */
  const checkManualCode = () => {
    const code = manualCode.trim().toUpperCase();
    const status = getCylinderStatus(code);
    const parsed = parseCylinderCode(code);
    setDetectedCode(code);
    setResult({ status, parsed });
    setMode('result');
  };

  /* ── Reset ── */
  const reset = () => {
    setCapturedImage(null);
    setRawText('');
    setDetectedCode('');
    setManualCode('');
    setUseManual(false);
    setResult(null);
    setOcrProgress(0);
    setMode('idle');
  };

  const cfg = result ? STATUS_CONFIG[result.status] : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: '1.5rem 1rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Link
            to="/lpg-profile"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'var(--color-primary)', fontSize: '0.85rem',
              fontWeight: 600, textDecoration: 'none', marginBottom: '1rem',
            }}
          >
            <ArrowLeft size={16} /> Back to LPG Services
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg,#f59e0b,#d97706)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={26} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text)', margin: 0 }}>
                Cylinder Safety Check
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Expiry / Test Due Date Verification
              </p>
            </div>
          </div>

          {/* Info banner */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 12, padding: '0.75rem 1rem', marginTop: '1rem',
          }}>
            <Info size={16} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
              Look for the <strong style={{ color: 'var(--color-text)' }}>ABCD–YY</strong> code stamped on the <strong style={{ color: 'var(--color-text)' }}>handle / stay collar</strong> of your cylinder.
              Example: <strong style={{ color: '#f59e0b' }}>B‑26</strong> means valid through June 2026.
            </p>
          </div>
        </div>

        {/* ═══════════════ IDLE STATE ═══════════════ */}
        {mode === 'idle' && (
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 20, padding: '2rem', textAlign: 'center',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg,#f59e0b22,#d9770622)',
              border: '2px dashed #f59e0b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <ScanLine size={36} color="#f59e0b" />
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
              Scan the Cylinder Code
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
              Use your camera or upload a photo of the cylinder's handle area.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 320, margin: '0 auto' }}>
              <button
                onClick={() => setMode('camera')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  padding: '0.85rem 1.5rem', borderRadius: 12, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(245,158,11,0.3)', transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Camera size={20} /> Use Camera
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'var(--color-surface)', color: 'var(--color-text)',
                  fontWeight: 600, fontSize: '0.9rem',
                  padding: '0.85rem 1.5rem', borderRadius: 12,
                  border: '1.5px solid var(--color-border)', cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <Upload size={18} /> Upload from Gallery
              </button>

              <button
                onClick={() => setUseManual(v => !v)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                {useManual ? 'Hide manual entry' : 'Enter code manually instead'}
              </button>

              {useManual && (
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <input
                    type="text"
                    value={manualCode}
                    onChange={e => setManualCode(e.target.value)}
                    placeholder="e.g. B-26"
                    maxLength={5}
                    style={{
                      flex: 1, padding: '0.65rem 1rem', borderRadius: 10,
                      border: '1.5px solid var(--color-border)',
                      background: 'var(--color-bg)', color: 'var(--color-text)',
                      fontSize: '0.95rem', fontWeight: 700, letterSpacing: 2,
                      outline: 'none', textTransform: 'uppercase',
                    }}
                  />
                  <button
                    onClick={checkManualCode}
                    disabled={!manualCode.trim()}
                    style={{
                      padding: '0.65rem 1.1rem', borderRadius: 10,
                      background: 'var(--color-primary)', color: '#fff',
                      border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                    }}
                  >
                    Check
                  </button>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        )}

        {/* ═══════════════ CAMERA STATE ═══════════════ */}
        {mode === 'camera' && (
          <div style={{
            background: '#0b0f19', borderRadius: 20, overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}>
            {/* Live feed */}
            <div style={{ position: 'relative' }}>
              {!cameraError ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={0.92}
                  videoConstraints={{ facingMode: 'environment' }}
                  onUserMediaError={() => setCameraError(true)}
                  style={{ width: '100%', display: 'block', maxHeight: 420, objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  height: 280, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 12,
                  color: '#fff', fontSize: '0.9rem',
                }}>
                  <AlertTriangle size={36} color="#f59e0b" />
                  <span>Camera access denied or unavailable.</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '0.6rem 1.2rem', borderRadius: 10, background: '#f59e0b',
                      color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700,
                    }}
                  >
                    Upload Photo Instead
                  </button>
                </div>
              )}

              {/* Overlay guide */}
              {!cameraError && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {/* Cut-out rectangle */}
                  <div style={{
                    width: 240, height: 90,
                    border: '2.5px solid #f59e0b',
                    borderRadius: 10,
                    boxShadow: '0 0 0 2000px rgba(0,0,0,0.45)',
                    position: 'relative',
                  }}>
                    {/* Corner decorators */}
                    {[['0','0'],['0','auto'],['auto','0'],['auto','auto']].map(([t,b], i) => (
                      <div key={i} style={{
                        position: 'absolute',
                        top: t !== 'auto' ? -3 : undefined,
                        bottom: b === 'auto' ? undefined : -3,
                        left: i % 2 === 0 ? -3 : undefined,
                        right: i % 2 !== 0 ? -3 : undefined,
                        width: 14, height: 14,
                        borderTop: (i < 2) ? '3px solid #f59e0b' : 'none',
                        borderBottom: (i >= 2) ? '3px solid #f59e0b' : 'none',
                        borderLeft: (i % 2 === 0) ? '3px solid #f59e0b' : 'none',
                        borderRight: (i % 2 !== 0) ? '3px solid #f59e0b' : 'none',
                      }} />
                    ))}
                  </div>
                  <span style={{
                    marginTop: 8, color: '#fff', fontSize: '0.75rem',
                    fontWeight: 600, letterSpacing: 0.5,
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                    background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: 20,
                  }}>
                    Align code on cylinder handle inside the box
                  </span>
                </div>
              )}
            </div>

            {/* Camera controls */}
            <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={capturePhoto}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                  padding: '0.75rem 1.75rem', borderRadius: 12,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
                }}
              >
                <Camera size={18} /> Take Photo
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: 'rgba(255,255,255,0.1)', color: '#fff',
                  fontWeight: 600, fontSize: '0.9rem',
                  padding: '0.75rem 1.25rem', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                }}
              >
                <Upload size={16} /> Gallery
              </button>
              <button
                onClick={reset}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)',
                  fontWeight: 600, fontSize: '0.85rem',
                  padding: '0.75rem 1rem', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
          </div>
        )}

        {/* ═══════════════ PROCESSING STATE ═══════════════ */}
        {mode === 'processing' && (
          <div style={{
            background: 'var(--color-surface)', border: '1px solid var(--color-border)',
            borderRadius: 20, padding: '2.5rem 2rem', textAlign: 'center',
          }}>
            {capturedImage && (
              <img src={capturedImage} alt="Captured"
                style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 12, marginBottom: '1.5rem' }}
              />
            )}
            <Loader2 size={40} color="#f59e0b" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
            <h3 style={{ fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>Analysing Image…</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Running OCR to extract the cylinder code
            </p>
            {/* Progress bar */}
            <div style={{ background: 'var(--color-border)', borderRadius: 99, height: 6, overflow: 'hidden', maxWidth: 300, margin: '0 auto' }}>
              <div style={{
                height: '100%', background: 'linear-gradient(90deg,#f59e0b,#d97706)',
                borderRadius: 99, width: `${ocrProgress}%`, transition: 'width 0.3s ease',
              }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>{ocrProgress}%</p>
          </div>
        )}

        {/* ═══════════════ RESULT STATE ═══════════════ */}
        {mode === 'result' && result && cfg && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Captured thumbnail */}
            {capturedImage && (
              <div style={{ borderRadius: 16, overflow: 'hidden', maxHeight: 180 }}>
                <img src={capturedImage} alt="Scanned" style={{ width: '100%', objectFit: 'cover', maxHeight: 180 }} />
              </div>
            )}

            {/* Status Card */}
            <div style={{
              background: cfg.bg, border: `2px solid ${cfg.border}`,
              borderRadius: 20, padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem' }}>
                <cfg.icon size={32} color={cfg.color} />
                <div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.07em',
                    color: cfg.color, textTransform: 'uppercase', display: 'block',
                  }}>
                    {cfg.label}
                  </span>
                  {detectedCode && (
                    <span style={{
                      fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-text)',
                      letterSpacing: '0.12em',
                    }}>
                      {detectedCode}
                    </span>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
                {cfg.msg}
              </p>

              {result.parsed && (
                <div style={{
                  background: 'rgba(0,0,0,0.06)', borderRadius: 12, padding: '0.875rem 1rem',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem',
                }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Test Quarter</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', margin: '2px 0 0' }}>{result.parsed.quarterLabel}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Valid Until</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', margin: '2px 0 0' }}>{formatDate(result.parsed.validUntil)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Year</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', margin: '2px 0 0' }}>{result.parsed.year}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Status</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 800, color: cfg.color, margin: '2px 0 0', textTransform: 'capitalize' }}>{result.status}</p>
                  </div>
                </div>
              )}

              {/* Manual override if OCR missed */}
              {result.status === 'invalid' && (
                <div style={{ marginTop: '0.875rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                    Enter code manually:
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      value={manualCode}
                      onChange={e => setManualCode(e.target.value)}
                      placeholder="e.g. B-26"
                      maxLength={5}
                      style={{
                        flex: 1, padding: '0.6rem 0.875rem', borderRadius: 10,
                        border: '1.5px solid var(--color-border)',
                        background: 'var(--color-bg)', color: 'var(--color-text)',
                        fontSize: '0.9rem', fontWeight: 700, letterSpacing: 2,
                        outline: 'none', textTransform: 'uppercase',
                      }}
                    />
                    <button
                      onClick={checkManualCode}
                      disabled={!manualCode.trim()}
                      style={{
                        padding: '0.6rem 1rem', borderRadius: 10,
                        background: 'var(--color-primary)', color: '#fff',
                        border: 'none', cursor: 'pointer', fontWeight: 700,
                      }}
                    >
                      Check
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Safety Checklist */}
            <div style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 20, padding: '1.25rem 1.5rem',
            }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Shield size={15} color="#10b981" /> Safety Checklist
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {SAFETY_TIPS.map((tip, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    <CheckCircle2 size={14} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: 'linear-gradient(135deg,#f59e0b,#d97706)',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                  padding: '0.75rem 1.5rem', borderRadius: 12,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(245,158,11,0.3)',
                }}
              >
                <RefreshCw size={16} /> Scan Again
              </button>
              <Link
                to="/lpg-profile"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'var(--color-surface)', color: 'var(--color-text)',
                  fontWeight: 600, fontSize: '0.9rem',
                  padding: '0.75rem 1.25rem', borderRadius: 12,
                  border: '1.5px solid var(--color-border)', textDecoration: 'none',
                }}
              >
                <ArrowLeft size={14} /> Back to LPG Services
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default LpgCylinderSafety;
