"use client";

import { useState } from "react";

export function QRCodeCard({ compact = false }: { compact?: boolean }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const url = "https://elevationstudio.vercel.app/";
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
    ctx.fillText("elevationstudio.vercel.app", screenX + screenW / 2, qrY + qrSize + 75);

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
          // Modern Clipboard API for images
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 3000);
        } catch (e) {
          // Fallback to downloading if clipboard write fails
          handleDownloadPhoneQR();
        }
      }, "image/png");
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  if (compact) {
    return (
      <div className="qr-compact-card">
        <div className="phone-mockup-compact">
          <div className="phone-compact-screen">
            <img
              src={qrImageUrl}
              alt="Scan QR Code to open Elevation Studio on Mobile"
              width={100}
              height={100}
              className="qr-img"
            />
          </div>
        </div>
        <div className="qr-compact-info">
          <div className="qr-compact-title">Scan on Mobile</div>
          <div className="qr-compact-url">elevationstudio.vercel.app</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              className="qr-btn-sm"
              onClick={handleCopyLink}
            >
              {copiedLink ? "✓ Link Copied" : "Copy Link"}
            </button>
            <button
              type="button"
              className="qr-btn-sm"
              onClick={handleDownloadPhoneQR}
            >
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
        <div className="qr-eyebrow">DIGITAL ACCESS POINT</div>
        <h3 className="qr-card-title">
          EXPERIENCE <span style={{ color: "var(--gold)" }}>ELEVATION</span> ON MOBILE
        </h3>
        <p className="qr-card-sub">
          Scan the QR Code with your smartphone camera to launch the interactive studio portfolio, case archives, and direct project briefs instantly.
        </p>
      </div>

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
                  <div className="phone-app-brand">ELEVATION <span>STUDIO</span></div>
                  <div className="phone-app-badge">PORTFOLIO</div>
                </div>

                <div className="phone-qr-stage">
                  <div className="phone-scan-line" />
                  <img
                    src={qrImageUrl}
                    alt="Elevation Studio QR Code (https://elevationstudio.vercel.app/)"
                    width={180}
                    height={180}
                    className="phone-qr-image"
                  />
                  <div className="phone-qr-center-badge">ES</div>
                </div>

                <div className="phone-app-footer">
                  <div className="phone-app-url">elevationstudio.vercel.app</div>
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
            <span className="qr-url-label">CANONICAL LINK:</span>
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
            <button
              type="button"
              className="qr-action-btn secondary"
              onClick={handleCopyLink}
            >
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
    </div>
  );
}
