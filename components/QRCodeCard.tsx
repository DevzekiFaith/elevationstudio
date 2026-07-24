"use client";

import { useState } from "react";

export function QRCodeCard({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const url = "https://elevationstudio.vercel.app/";

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
    url
  )}&color=d4a843&bgcolor=0c0c0e`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = "Elevation_Studio_QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <button
            type="button"
            className="qr-btn-sm"
            onClick={handleCopyLink}
          >
            {copied ? "✓ Copied Link" : "Copy Link"}
          </button>
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
            <span>Ready for Print Collateral & Pitch Decks</span>
          </div>

          <h4 className="qr-panel-heading">Mobile Portfolio QR Code</h4>
          <p className="qr-panel-desc">
            Use this vector QR code across physical blueprints, estate exhibition banners, physical business cards, and PDF project briefs to convert offline partners directly into live client leads.
          </p>

          <div className="qr-url-box">
            <span className="qr-url-label">CANONICAL LINK:</span>
            <span className="qr-url-text">{url}</span>
          </div>

          <div className="qr-panel-actions">
            <button
              type="button"
              className="qr-action-btn primary"
              onClick={handleDownloadQR}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download High-Res QR (PNG)
            </button>

            <button
              type="button"
              className="qr-action-btn secondary"
              onClick={handleCopyLink}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {copied ? "✓ Link Copied to Clipboard" : "Copy Live Website Link"}
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
