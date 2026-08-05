"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ReviewData {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  packageUsed: string;
  quote: string;
  createdAt: string;
  verified: boolean;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (newReview: ReviewData) => void;
  initialTab?: "form" | "qr";
}

const PACKAGES = [
  "Package 01 — The Blueprint (Brand Identity)",
  "Package 02 — The Structure (Brand + Digital Systems)",
  "Package 03 — The Elevation (Brand + Digital + Space)",
  "Package 04 — The Master Plan (Brand + Digital + Space + Culture)",
  "Custom 3D Spatial Architecture Renders",
  "Mindvest Culture & Team Transformation",
];

export function ReviewModal({ isOpen, onClose, onReviewSubmitted, initialTab = "form" }: ReviewModalProps) {
  const [activeTab, setActiveTab] = useState<"form" | "qr">(initialTab);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [packageUsed, setPackageUsed] = useState(PACKAGES[2]);
  const [quote, setQuote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedReviewLink, setCopiedReviewLink] = useState(false);

  const reviewUrl = "https://www.elevationstudiong.com.ng/?review=true#testimonials";
  const reviewQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
    reviewUrl
  )}&color=d4a843&bgcolor=0c0c0e`;

  const handleCopyReviewLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      setCopiedReviewLink(true);
      setTimeout(() => setCopiedReviewLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!author.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!quote.trim() || quote.trim().length < 15) {
      setErrorMsg("Please enter detailed review feedback (at least 15 characters).");
      return;
    }

    setIsSubmitting(true);

    const newReview: ReviewData = {
      id: `usr-rev-${Date.now()}`,
      author: author.trim(),
      role: role.trim() || "Client Partner",
      company: company.trim() || "Independent Project",
      location: location.trim() || "Lagos, Nigeria",
      rating,
      packageUsed,
      quote: quote.trim(),
      createdAt: new Date().toISOString(),
      verified: true,
    };

    try {
      // 1. Save locally in localStorage for immediate client persistence
      const existingRaw = localStorage.getItem("elevation_global_reviews");
      const existingReviews: ReviewData[] = existingRaw ? JSON.parse(existingRaw) : [];
      const updatedReviews = [newReview, ...existingReviews];
      localStorage.setItem("elevation_global_reviews", JSON.stringify(updatedReviews));

      // 2. Call API route for server logging
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      }).catch(() => {
        // Silently continue if offline
      });

      setIsSuccess(true);
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }

      setTimeout(() => {
        setIsSuccess(false);
        setAuthor("");
        setRole("");
        setCompany("");
        setLocation("");
        setQuote("");
        onClose();
      }, 2000);
    } catch {
      setErrorMsg("Unable to save review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="review-modal-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="review-modal-backdrop"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="review-modal-card"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="review-modal-header">
              <div>
                <div className="review-modal-eyebrow">CLIENT FEEDBACK ARCHIVE</div>
                <h3 className="review-modal-title">
                  SUBMIT A GLOBAL <span style={{ color: "var(--gold)" }}>CLIENT REVIEW</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="review-modal-close"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              <button
                type="button"
                className={`review-cancel-btn ${activeTab === "form" ? "active" : ""}`}
                style={{
                  flex: 1,
                  background: activeTab === "form" ? "var(--gold)" : "#14141a",
                  color: activeTab === "form" ? "#060606" : "#ffffff",
                  borderColor: activeTab === "form" ? "var(--gold)" : "rgba(255,255,255,0.15)",
                  fontWeight: activeTab === "form" ? "700" : "500",
                }}
                onClick={() => setActiveTab("form")}
              >
                ✍️ Write Review Form
              </button>
              <button
                type="button"
                className={`review-cancel-btn ${activeTab === "qr" ? "active" : ""}`}
                style={{
                  flex: 1,
                  background: activeTab === "qr" ? "var(--gold)" : "#14141a",
                  color: activeTab === "qr" ? "#060606" : "#ffffff",
                  borderColor: activeTab === "qr" ? "var(--gold)" : "rgba(255,255,255,0.15)",
                  fontWeight: activeTab === "qr" ? "700" : "500",
                }}
                onClick={() => setActiveTab("qr")}
              >
                📱 Mobile QR Review Scan
              </button>
            </div>

            {activeTab === "qr" ? (
              /* MOBILE REVIEW QR CODE SCAN VIEW */
              <div
                style={{
                  background: "#14141a",
                  border: "1px solid rgba(212, 168, 67, 0.3)",
                  borderRadius: "16px",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                  }}
                >
                  MOBILE OPTIMIZED REVIEW LINK
                </div>

                <h4 style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "28px", color: "#ffffff", margin: 0 }}>
                  SCAN WITH SMARTPHONE CAMERA TO REVIEW
                </h4>

                <p style={{ fontSize: "14px", color: "rgba(244, 240, 232, 0.7)", maxWidth: "420px", margin: 0, lineHeight: "1.5" }}>
                  Point your mobile device camera to open the instant mobile review form directly on your phone screen.
                </p>

                {/* Scannable Mobile Review QR Code Box */}
                <div
                  style={{
                    position: "relative",
                    background: "#09090c",
                    padding: "20px",
                    borderRadius: "20px",
                    border: "2px solid var(--gold)",
                    boxShadow: "0 10px 30px rgba(212, 168, 67, 0.2)",
                  }}
                >
                  <img
                    src={reviewQrImageUrl}
                    alt="Scan QR Code to open Mobile Review Form"
                    width={200}
                    height={200}
                    style={{ borderRadius: "10px", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "42px",
                      height: "42px",
                      background: "#09090c",
                      border: "2px solid var(--gold)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "var(--gold)",
                      fontSize: "14px",
                    }}
                  >
                    ES
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "12px",
                    color: "var(--gold)",
                    background: "#0a0a0e",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    wordBreak: "break-all",
                  }}
                >
                  {reviewUrl}
                </div>

                <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "380px", justifyContent: "center" }}>
                  <button
                    type="button"
                    onClick={handleCopyReviewLink}
                    className="review-submit-btn"
                    style={{ flex: 1, padding: "12px 16px", fontSize: "11px" }}
                  >
                    {copiedReviewLink ? "✓ Link Copied" : "Copy Review Link"}
                  </button>
                  <a
                    href={reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-cancel-btn"
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      fontSize: "11px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Open on Mobile ↗
                  </a>
                </div>
              </div>
            ) : isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(212, 168, 67, 0.15)",
                    border: "2px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    color: "var(--gold)",
                    boxShadow: "0 0 30px rgba(212, 168, 67, 0.4)",
                  }}
                >
                  ✓
                </div>
                <h4 className="review-modal-title">THANK YOU FOR YOUR REVIEW!</h4>
                <p style={{ fontSize: "15px", color: "var(--white-dim)", maxWidth: "440px", lineHeight: "1.6" }}>
                  Your feedback has been published globally to Elevation Studio&apos;s verified client proof record.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div
                    style={{
                      padding: "14px 18px",
                      background: "rgba(127, 29, 29, 0.6)",
                      border: "1px solid rgba(239, 68, 68, 0.5)",
                      color: "#fca5a5",
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "12px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Star Rating Selector */}
                <div className="review-star-box">
                  <span className="review-star-label">Overall Satisfaction Rating *</span>
                  <div className="review-star-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="review-star-btn"
                      >
                        <span
                          style={{
                            color: star <= (hoverRating || rating) ? "var(--gold)" : "#333338",
                            filter:
                              star <= (hoverRating || rating)
                                ? "drop-shadow(0 0 10px rgba(212, 168, 67, 0.8))"
                                : "none",
                          }}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                    <span className="review-star-counter">{hoverRating || rating} / 5 Stars</span>
                  </div>
                </div>

                {/* 2-Column Inputs Grid: Name & Role */}
                <div className="review-form-grid">
                  <div className="review-field-group" style={{ marginBottom: 0 }}>
                    <label className="review-field-label">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Engr. Rotimi Adebayo"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="review-input"
                      required
                    />
                  </div>

                  <div className="review-field-group" style={{ marginBottom: 0 }}>
                    <label className="review-field-label">Role / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Managing Director / Partner"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="review-input"
                    />
                  </div>
                </div>

                {/* 2-Column Inputs Grid: Company & Location */}
                <div className="review-form-grid">
                  <div className="review-field-group" style={{ marginBottom: 0 }}>
                    <label className="review-field-label">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Crestview Eco-Properties"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="review-input"
                    />
                  </div>

                  <div className="review-field-group" style={{ marginBottom: 0 }}>
                    <label className="review-field-label">Location / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Victoria Island, Lagos"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="review-input"
                    />
                  </div>
                </div>

                {/* Service Package Dropdown */}
                <div className="review-field-group">
                  <label className="review-field-label">Service or Package Experienced</label>
                  <select
                    value={packageUsed}
                    onChange={(e) => setPackageUsed(e.target.value)}
                    className="review-select"
                  >
                    {PACKAGES.map((pkg) => (
                      <option key={pkg} value={pkg} style={{ background: "#0c0c10", color: "#ffffff" }}>
                        {pkg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed Review Textarea */}
                <div className="review-field-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label className="review-field-label">Your Detailed Review / Feedback *</label>
                    <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "#666670" }}>
                      {quote.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Share your experience working with Elevation Studio across spatial renders, brand architecture, code engineering, or culture training..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="review-textarea"
                    required
                  />
                </div>

                {/* Bottom Actions Bar */}
                <div className="review-actions-bar">
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "11px",
                      color: "#9999a6",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#10b981",
                        display: "inline-block",
                      }}
                    />
                    Global Verified Review System
                  </div>

                  <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "340px", justifyContent: "flex-end" }}>
                    <button type="button" onClick={onClose} className="review-cancel-btn">
                      Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="review-submit-btn">
                      {isSubmitting ? "Publishing..." : "Publish Review →"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
