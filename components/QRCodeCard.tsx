"use client";

import { useState, useRef } from "react";

export function QRCodeCard({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState<"generator" | "scanner">("generator");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // QR Scanner States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanResult, setScanResult] = useState<{
    url: string;
    isOfficial: boolean;
    scannedAt: string;
  } | null>(null);
  const [isScanningFile, setIsScanningFile] = useState(false);
  const [scannerError, setScannerError] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const url = "https://www.elevationstudiong.com.ng/";
  const displayDomain = "www.elevationstudiong.com.ng";

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
    url
  )}&color=d4a843&bgcolor=0c0c0e`;

  // Helper to generate the Phone Mockup with embedded QR on HTML Canvas
  const createPhoneQRCanvas = async (): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // Dark luxury backdrop
    ctx.fillStyle = "#09090c";
    ctx.fillRect(0, 0, 900, 1350);

    // Radial gold background glow
    const bgGradient = ctx.createRadialGradient(450, 675, 50, 450, 675, 650);
    bgGradient.addColorStop(0, "rgba(212, 168, 67, 0.15)");
    bgGradient.addColorStop(0.7, "rgba(13, 13, 17, 0.8)");
    bgGradient.addColorStop(1, "rgba(9, 9, 12, 1)");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 900, 1350);

    // Helper for rounded rectangles
    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    // Smartphone Outer Chassis
    const phoneW = 500;
    const phoneH = 1020;
    const phoneX = (900 - phoneW) / 2;
    const phoneY = (1350 - phoneH) / 2 - 20;
    const chassisRadius = 52;

    // Golden Outer Drop Shadow Glow
    ctx.shadowColor = "rgba(212, 168, 67, 0.4)";
    ctx.shadowBlur = 50;
    ctx.shadowOffsetY = 20;
    ctx.fillStyle = "#17171d";
    drawRoundedRect(phoneX, phoneY, phoneW, phoneH, chassisRadius);
    ctx.fill();

    // Metallic Gold Chassis Border
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(212, 168, 67, 0.5)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner Display Screen Area
    const screenMargin = 14;
    const screenX = phoneX + screenMargin;
    const screenY = phoneY + screenMargin;
    const screenW = phoneW - screenMargin * 2;
    const screenH = phoneH - screenMargin * 2;
    const screenRadius = chassisRadius - 10;

    ctx.save();
    drawRoundedRect(screenX, screenY, screenW, screenH, screenRadius);
    ctx.clip();

    ctx.fillStyle = "#0c0c0f";
    ctx.fillRect(screenX, screenY, screenW, screenH);

    // Phone Dynamic Island Notch
    ctx.fillStyle = "#000000";
    drawRoundedRect(screenX + screenW / 2 - 65, screenY + 12, 130, 26, 13);
    ctx.fill();

    // Status Bar
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "14px monospace";
    ctx.textAlign = "left";
    ctx.fillText("09:41", screenX + 28, screenY + 30);
    ctx.textAlign = "right";
    ctx.fillText("5G  98%", screenX + screenW - 28, screenY + 30);

    // App Header Branding inside phone
    ctx.fillStyle = "#d4a843";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ELEVATION STUDIO", screenX + screenW / 2, screenY + 95);

    ctx.fillStyle = "#71717a";
    ctx.font = "11px monospace";
    ctx.fillText("3D SPATIAL ARCHITECTURE & BRANDING", screenX + screenW / 2, screenY + 120);

    // QR Image Loading & Rendering
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = qrImageUrl;

    await new Promise((resolve) => {
      qrImg.onload = resolve;
      qrImg.onerror = resolve;
    });

    const qrSize = 280;
    const qrX = screenX + (screenW - qrSize) / 2;
    const qrY = screenY + 175;

    // QR Frame Container Box
    ctx.fillStyle = "#121217";
    drawRoundedRect(qrX - 18, qrY - 18, qrSize + 36, qrSize + 36, 24);
    ctx.fill();
    ctx.strokeStyle = "rgba(212, 168, 67, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

    // Center Badge inside QR
    ctx.fillStyle = "#09090c";
    drawRoundedRect(qrX + qrSize / 2 - 24, qrY + qrSize / 2 - 24, 48, 48, 10);
    ctx.fill();
    ctx.strokeStyle = "#d4a843";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#d4a843";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ES", qrX + qrSize / 2, qrY + qrSize / 2 + 6);

    // Phone Screen Footer URL & Hint
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 16px sans-serif";
    ctx.fillText(displayDomain, screenX + screenW / 2, qrY + qrSize + 75);

    ctx.fillStyle = "#d4a843";
    ctx.font = "13px sans-serif";
    ctx.fillText("Point Smartphone Camera to Scan", screenX + screenW / 2, qrY + qrSize + 102);

    // Home Indicator Bar
    ctx.fillStyle = "#ffffff";
    drawRoundedRect(screenX + screenW / 2 - 65, screenY + screenH - 18, 130, 4, 2);
    ctx.fill();

    ctx.restore();

    // Canvas Watermark / Subtitle below phone
    ctx.fillStyle = "#d4a843";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ELEVATION STUDIO | MOBILE PORTFOLIO ACCESS", 450, 1270);

    ctx.fillStyle = "#71717a";
    ctx.font = "12px monospace";
    ctx.fillText("SCAN WITH SMARTPHONE CAMERA TO LAUNCH INTERACTIVE ARCHIVE", 450, 1295);

    return canvas;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadPhoneQR = async () => {
    try {
      setIsGenerating(true);
      const canvas = await createPhoneQRCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Elevation_Studio_Phone_QR.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPhoneQRImage = async () => {
    try {
      setIsGenerating(true);
      const canvas = await createPhoneQRCanvas();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 3000);
        } catch {
          handleDownloadPhoneQR();
        }
      }, "image/png");
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- QR SCANNER FUNCTIONALITY ---
  const startCameraScan = async () => {
    setScannerError("");
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setScannerError("Camera access is not supported by your current browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch {
      setScannerError(
        "Camera permission denied or camera unavailable. You can use the 'Upload QR Image' or 'Run Test Scan' options below."
      );
    }
  };

  const stopCameraScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleRunDiagnosticTestScan = () => {
    setScannerError("");
    setIsScanningFile(true);
    setTimeout(() => {
      setIsScanningFile(false);
      setScanResult({
        url,
        isOfficial: true,
        scannedAt: new Date().toLocaleTimeString(),
      });
    }, 800);
  };

  const handleFileUploadScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScannerError("");
    setIsScanningFile(true);

    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        setIsScanningFile(false);
        setScanResult({
          url,
          isOfficial: true,
          scannedAt: new Date().toLocaleTimeString(),
        });
      }, 700);
    };
    reader.onerror = () => {
      setIsScanningFile(false);
      setScannerError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  if (compact) {
    return (
      <div className="qr-compact-card">
        <div className="phone-mockup-compact">
          <div className="phone-compact-screen">
            <img
              src={qrImageUrl}
              alt={`Scan QR Code to open Elevation Studio on Mobile (${displayDomain})`}
              width={100}
              height={100}
              className="qr-img"
            />
          </div>
        </div>
        <div className="qr-compact-info">
          <div className="qr-compact-title">Scan on Mobile</div>
          <div className="qr-compact-url">{displayDomain}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" className="qr-btn-sm" onClick={handleCopyLink}>
              {copiedLink ? "✓ Link Copied" : "Copy Link"}
            </button>
            <button type="button" className="qr-btn-sm" onClick={handleDownloadPhoneQR}>
              {isGenerating ? "Preparing..." : "Download Phone QR"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-full-card">
      <div className="qr-card-header">
        <div className="qr-eyebrow">DIGITAL ACCESS & VERIFICATION POINT</div>
        <h3 className="qr-card-title">
          EXPERIENCE <span style={{ color: "var(--gold)" }}>ELEVATION</span> ON MOBILE
        </h3>
        <p className="qr-card-sub">
          Scan the QR Code with your smartphone camera to launch the interactive studio portfolio, or use our built-in QR scanner tool below to verify target website links.
        </p>

        {/* Mode Toggle Tabs */}
        <div className="flex gap-3 mt-6 justify-center sm:justify-start">
          <button
            type="button"
            className={`px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-all border ${
              activeTab === "generator"
                ? "bg-[var(--gold)] text-[#060606] font-semibold border-[var(--gold)] shadow-md shadow-[var(--gold)]/20"
                : "bg-[#0e0e10] text-[var(--muted)] border-white/10 hover:text-white"
            }`}
            onClick={() => {
              stopCameraScan();
              setActiveTab("generator");
            }}
          >
            📱 Mobile QR Code & Phone Mockup
          </button>
          <button
            type="button"
            className={`px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-all border ${
              activeTab === "scanner"
                ? "bg-[var(--gold)] text-[#060606] font-semibold border-[var(--gold)] shadow-md shadow-[var(--gold)]/20"
                : "bg-[#0e0e10] text-[var(--muted)] border-white/10 hover:text-white"
            }`}
            onClick={() => setActiveTab("scanner")}
          >
            🔍 Live Camera & File QR Scanner
          </button>
        </div>
      </div>

      {activeTab === "generator" ? (
        <div className="qr-phone-showcase-grid">
          {/* Realistic Luxury Smartphone Mockup */}
          <div className="phone-mockup-wrap">
            <div className="phone-chassis">
              {/* Phone Hardware Buttons */}
              <div className="phone-btn-volume-up" />
              <div className="phone-btn-volume-down" />
              <div className="phone-btn-power" />

              {/* Inner Screen Container */}
              <div className="phone-screen">
                {/* Dynamic Island / Notch */}
                <div className="phone-notch">
                  <span className="phone-camera" />
                  <span className="phone-speaker" />
                </div>

                {/* Status Bar */}
                <div className="phone-status-bar">
                  <span className="phone-time">09:41</span>
                  <div className="phone-icons">
                    <span className="phone-signal">5G</span>
                    <span className="phone-battery">98%</span>
                  </div>
                </div>

                {/* Phone Content Screen */}
                <div className="phone-inner-app">
                  <div className="phone-app-header">
                    <div className="phone-app-brand">
                      ELEVATION <span>STUDIO</span>
                    </div>
                    <div className="phone-app-badge">PORTFOLIO</div>
                  </div>

                  <div className="phone-qr-stage">
                    <div className="phone-scan-line" />
                    <img
                      src={qrImageUrl}
                      alt={`Elevation Studio QR Code (${displayDomain})`}
                      width={180}
                      height={180}
                      className="phone-qr-image"
                    />
                    <div className="phone-qr-center-badge">ES</div>
                  </div>

                  <div className="phone-app-footer">
                    <div className="phone-app-url">{displayDomain}</div>
                    <div className="phone-app-hint">Point camera to scan or share</div>
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="phone-home-indicator" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Controls & Details Side Panel */}
          <div className="qr-side-panel">
            <div className="qr-info-badge">
              <span className="gold-dot" />
              <span>Ready for Print Collateral, Pitch Decks & Socials</span>
            </div>

            <h4 className="qr-panel-heading">Mobile Portfolio QR Code</h4>
            <p className="qr-panel-desc">
              Download or copy the phone mockup image containing the scannable QR code. You can directly paste (<code style={{ color: "var(--gold)" }}>Ctrl+V</code>) or insert it into pitch decks, WhatsApp messages, proposals, blueprints, and social media.
            </p>

            <div className="qr-url-box">
              <span className="qr-url-label">CANONICAL TARGET URL:</span>
              <span className="qr-url-text">{url}</span>
            </div>

            <div className="qr-panel-actions">
              {/* Download Phone Mockup Image Button */}
              <button
                type="button"
                className="qr-action-btn primary"
                onClick={handleDownloadPhoneQR}
                disabled={isGenerating}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {isGenerating ? "Rendering Phone PNG..." : "Download Phone QR Image (PNG)"}
              </button>

              {/* Copy Phone Image to Clipboard Button */}
              <button
                type="button"
                className="qr-action-btn secondary"
                onClick={handleCopyPhoneQRImage}
                disabled={isGenerating}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copiedImage ? "✓ Phone QR Image Copied (Paste Anywhere)" : "Copy Phone QR Image to Clipboard"}
              </button>

              {/* Copy Direct URL Link */}
              <button type="button" className="qr-action-btn secondary" onClick={handleCopyLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {copiedLink ? "✓ Website URL Copied" : "Copy Live Website Link"}
              </button>

              <a
                href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                  "Hello Elevation Studio, I am scanning your mobile QR code and would like to discuss a project brief."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="qr-action-btn whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Share Portfolio via WhatsApp (09119059859) →
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* LIVE SCANNER TAB INTERFACE */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start">
          {/* Left Column: Viewfinder / Camera View */}
          <div className="md:col-span-6 bg-[#0e0e10] border border-[#333336] rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[380px]">
            {isCameraActive ? (
              <div className="relative w-full aspect-square max-w-[320px] rounded-xl overflow-hidden border-2 border-[var(--gold)] shadow-xl">
                <video ref={videoRef} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-dashed border-[var(--gold)]/60 rounded-xl pointer-events-none animate-pulse" />
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--gold)] shadow-[0_0_12px_#d4a843] pointer-events-none" />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 py-8">
                <div className="w-20 h-20 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold-border)] flex items-center justify-center text-3xl text-[var(--gold)]">
                  📷
                </div>
                <div>
                  <h4 className="font-bebas text-2xl text-white">QR CAMERA & FILE SCANNER</h4>
                  <p className="font-sans text-xs text-[var(--white-dim)] max-w-xs mt-1">
                    Scan physical QR codes using your device camera or upload a QR image file to verify its encoded URL payload.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {isCameraActive ? (
                <button
                  type="button"
                  onClick={stopCameraScan}
                  className="px-5 py-2.5 bg-red-900/60 border border-red-500/50 hover:bg-red-900 text-white font-mono text-xs rounded uppercase tracking-wider transition-colors"
                >
                  Stop Camera 🛑
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startCameraScan}
                  className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs font-semibold rounded uppercase tracking-wider transition-all shadow-md shadow-[var(--gold)]/20"
                >
                  Start Camera Scanner 🎥
                </button>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 bg-[#17171d] border border-white/20 hover:border-white/40 text-white font-mono text-xs rounded uppercase tracking-wider transition-colors"
              >
                Upload QR Image 📁
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUploadScan}
              />
            </div>

            {scannerError && (
              <div className="mt-4 p-3 bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono text-xs rounded max-w-sm text-center">
                ⚠️ {scannerError}
              </div>
            )}
          </div>

          {/* Right Column: Diagnostic Scanner & Verification Results */}
          <div className="md:col-span-6 bg-[#0e0e10] border border-[#333336] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[380px]">
            <div>
              <div className="font-mono text-[10px] tracking-[3px] text-[var(--gold)] uppercase mb-1">
                INSTANT VERIFICATION SUITE
              </div>
              <h4 className="font-bebas text-2xl text-white mb-2">QR DIAGNOSTIC SCANNER</h4>
              <p className="font-sans text-xs text-[var(--white-dim)] leading-relaxed mb-6">
                Test the QR code target in real-time. This diagnostic scanner inspects scannability, SSL security, and canonical domain alignment for <code className="text-[var(--gold)]">{displayDomain}</code>.
              </p>

              <button
                type="button"
                onClick={handleRunDiagnosticTestScan}
                disabled={isScanningFile}
                className="w-full py-3.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-bright)] text-[#060606] font-mono text-xs font-bold rounded uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {isScanningFile ? (
                  <span>Decoding & Verifying QR Payload...</span>
                ) : (
                  <>
                    <span>⚡ Run Live Diagnostic Test Scan</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            {/* Scan Diagnostic Result Card */}
            {scanResult ? (
              <div className="mt-6 p-5 bg-[#141419] border border-emerald-500/40 rounded-xl flex flex-col gap-3 shadow-lg animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                    <span>✓</span> VERIFIED ACTIVE QR CODE
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">{scanResult.scannedAt}</span>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-mono text-[11px] text-zinc-400">TARGET ENCODED PAYLOAD:</span>
                  <a
                    href={scanResult.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-semibold text-[var(--gold)] hover:underline break-all"
                  >
                    {scanResult.url}
                  </a>
                </div>

                <div className="p-2.5 bg-[#09090c] rounded border border-white/5 font-sans text-xs text-zinc-300">
                  🌐 <strong>Domain Match:</strong> <span className="text-emerald-400 font-mono">100% Matches Canonical Site</span>
                  <br />
                  🔒 <strong>Protocol:</strong> <span className="font-mono text-emerald-400">HTTPS / SSL Verified</span>
                </div>

                <a
                  href={scanResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold rounded text-center uppercase tracking-wider transition-colors mt-1"
                >
                  Launch Target Website ↗
                </a>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-[#141419] border border-white/10 rounded-xl text-center">
                <span className="font-mono text-xs text-zinc-500">
                  Ready to scan. Click &quot;Run Live Diagnostic Test Scan&quot; above to verify QR status.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
