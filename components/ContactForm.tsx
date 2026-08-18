"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeCard } from "./QRCodeCard";
import { LocationMap } from "./LocationMap";

const PACKAGES = [
  {
    id: "1",
    code: "Package 01 — The Foundation",
    name: "The Foundation",
    short: "Brand identity only",
    range: "₦500K — ₦2M",
    bridge: false,
  },
  {
    id: "2",
    code: "Package 02 — The Structure",
    name: "The Structure",
    short: "Brand + Digital + Presence",
    range: "₦1.5M — ₦5M",
    bridge: false,
  },
  {
    id: "3",
    code: "Package 03 — The Elevation",
    name: "The Elevation",
    short: "Brand + Digital + Space",
    range: "₦5M — ₦20M",
    bridge: false,
  },
  {
    id: "4",
    code: "Package 04 — The Master Plan",
    name: "The Master Plan",
    short: "Full transformation",
    range: "₦15M — ₦50M+",
    bridge: true,
  },
  {
    id: "res-arch",
    code: "Residential Architecture",
    name: "Residential Architecture",
    short: "Modern Bungalows, Duplexes & Private Homes",
    range: "Starting from ₦1.5M",
    bridge: false,
  },
  {
    id: "res-master",
    code: "Residential Masterplan",
    name: "Residential Masterplan",
    short: "Luxury Villas, Compounds & Multiple Buildings",
    range: "Starting from ₦4.5M",
    bridge: false,
  },
] as const;

const BUDGET_STEPS = [
  "₦500K – ₦1M",
  "₦1M – ₦2M",
  "₦2M – ₦3.5M",
  "₦3.5M – ₦5M",
  "₦5M – ₦8M",
  "₦8M – ₦12M",
  "₦12M – ₦20M",
  "₦20M – ₦30M",
  "₦30M – ₦50M",
  "₦50M+",
];

const BUDGET_DESCRIPTIONS = [
  "Ideal for conceptual sketches, floor plans, and foundational space layouts.",
  "Ideal for standard private residential renovations and detailed 3D interior design.",
  "Ideal for complete private bungalows, duplex structures, and site layout designs.",
  "Ideal for luxury villa designs, private family compounds, and advanced spatial rendering.",
  "Ideal for high-end boutique hotels, compound masterplanning, and structural engineering.",
  "Ideal for large-scale multi-unit housing estates and commercial building layouts.",
  "Ideal for premium resort layouts, industrial masterplans, and public space designs.",
  "Ideal for complete commercial complexes, structural frameworks, and masterplanning.",
  "Ideal for large-scale urban design, shopping centers, and mixed-use estate plans.",
  "Bespoke enterprise contracts, institutional blueprints, and full-service estate execution.",
];

const TIMELINES = [
  "ASAP / urgent",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
  "Flexible / exploring",
] as const;

type Step = 1 | 2 | 3 | 4;

const initialFields = {
  name: "",
  email: "",
  phone: "",
  role: "",
  company: "",
  location: "",
  packageId: "1",
  industry: "",
  projectDescription: "",
  coreProblem: "",
  budgetIndex: 0,
  timeline: "" as string,
  decisionMaker: "",
  priorExperience: "",
  referralSource: "",
  existingAssets: "",
  inspirationUrl: "",
  additionalNotes: "",
};

function ContactFormInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const pkg = searchParams?.get("package") || searchParams?.get("pkg");
    if (pkg && ["1", "2", "3", "4", "res-arch", "res-master"].includes(pkg)) {
      let defaultBudgetIdx = 0;
      if (pkg === "2" || pkg === "res-arch") defaultBudgetIdx = 2; // ₦2M – ₦3.5M
      if (pkg === "3" || pkg === "res-master") defaultBudgetIdx = 4; // ₦5M – ₦8M
      if (pkg === "4") defaultBudgetIdx = 8; // ₦30M – ₦50M

      setFields((f) => ({
        ...f,
        packageId: pkg,
        budgetIndex: defaultBudgetIdx,
      }));
    }
  }, [searchParams]);

  const handlePackageChange = (id: string) => {
    let defaultBudgetIdx = 0;
    if (id === "2" || id === "res-arch") defaultBudgetIdx = 2; // ₦2M – ₦3.5M
    if (id === "3" || id === "res-master") defaultBudgetIdx = 4; // ₦5M – ₦8M
    if (id === "4") defaultBudgetIdx = 8; // ₦30M – ₦50M

    setFields((f) => ({
      ...f,
      packageId: id,
      budgetIndex: defaultBudgetIdx,
    }));
  };

  const progress = useMemo(() => {
    return [1, 2, 3, 4].map((s) => ({
      num: s as Step,
      done: s < step,
      active: s === step,
    }));
  }, [step]);

  const set = (k: keyof typeof fields, v: string | number) => {
    setFields((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const next = { ...e };
      delete next[k as string];
      return next;
    });
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "Required";
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      e.email = "Valid email required";
    if (!fields.phone.trim()) e.phone = "Required";
    if (!fields.role.trim()) e.role = "Required";
    if (!fields.company.trim()) e.company = "Required";
    if (!fields.location.trim()) e.location = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!fields.industry.trim()) e.industry = "Required";
    if (!fields.projectDescription.trim()) e.projectDescription = "Required";
    if (!fields.coreProblem.trim()) e.coreProblem = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!fields.decisionMaker.trim()) e.decisionMaker = "Required";
    if (!fields.priorExperience.trim()) e.priorExperience = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep4 = () => {
    const e: Record<string, string> = {};
    if (!fields.referralSource.trim()) e.referralSource = "Required";
    if (
      fields.inspirationUrl.trim() &&
      !/^https?:\/\/.+/.test(fields.inspirationUrl.trim())
    ) {
      e.inspirationUrl = "Must start with http:// or https://";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateStep4()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          role: fields.role.trim(),
          company: fields.company.trim(),
          location: fields.location.trim(),
          packageName: selectedPkg.name,
          packageCode: selectedPkg.code,
          packageId: selectedPkg.id,
          industry: fields.industry.trim(),
          projectDescription: fields.projectDescription.trim(),
          coreProblem: fields.coreProblem.trim(),
          budgetRange: BUDGET_STEPS[fields.budgetIndex] ?? "",
          timeline: fields.timeline,
          decisionMaker: fields.decisionMaker.trim(),
          priorExperience: fields.priorExperience.trim(),
          referralSource: fields.referralSource.trim(),
          existingAssets: fields.existingAssets.trim(),
          inspirationUrl: fields.inspirationUrl.trim(),
          additionalNotes: fields.additionalNotes.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPkg = PACKAGES.find((p) => p.id === fields.packageId)!;

  if (success) {
    return (
      <div className="contact-page">
        <div className="contact-sidebar">
          <Link href="/" className="contact-back">
            ← Back to site
          </Link>
        </div>
        <div className="contact-main">
          <div className="success-panel">
            <h2>Brief Received.</h2>
            <p>
              Thank you, {fields.name.split(" ")[0]}. Your commission details have been registered. 
              Our partners are already reviewing your project parameters. Expect a 
              thoughtful response at <strong style={{ color: "var(--white)" }}>{fields.email}</strong>.
            </p>
            <div className="success-summary">
              <strong>Summary</strong>
              <br />
              <br />
              <strong>Company:</strong> {fields.company}
              <br />
              <strong>Package:</strong> {selectedPkg.code}
              <br />
              <strong>Budget band:</strong> {BUDGET_STEPS[fields.budgetIndex]}
              <br />
              <strong>Timeline:</strong> {fields.timeline}
              <br />
              <strong>Industry:</strong> {fields.industry}
              <br />
              <br />
              If anything needs clarifying, we&apos;ll reach out directly.
            </div>
            <Link href="/" className="btn-primary">
              Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <aside className="contact-sidebar">
        <Link href="/" className="contact-back" style={{ display: "block", marginBottom: 24 }}>
          ← Back to site
        </Link>
        <div className="contact-sidebar-title">
          START A
          <br />
          <span style={{ color: "var(--gold)" }}>PROJECT</span>
        </div>
        <p className="contact-sidebar-body">
          Tell us what you&apos;re building. We architect brand, digital, space,
          and — when it fits — culture, as one system.
        </p>

        <div className="contact-preview-label">Package focus</div>
        <div className="contact-preview-grid">
          {PACKAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`contact-preview-card ${fields.packageId === p.id ? "active" : ""} ${p.bridge ? "bridge" : ""}`.trim()}
              onClick={() => handlePackageChange(p.id)}
            >
              <div className="cp-name">{p.name}</div>
              <div className="cp-range">{p.range}</div>
            </button>
          ))}
        </div>

        <div className="contact-detail-block">
          <div className="footer-contact-label">Email Inquiries</div>
          <a href="mailto:support@mindvestglobalresources.com.ng">support@mindvestglobalresources.com.ng</a>
          <div className="footer-contact-label" style={{ marginTop: 16 }}>
            Direct WhatsApp / Phone
          </div>
          <a
            href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20initiating%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--gold)", fontWeight: 500 }}
          >
            09119059859 (WhatsApp Chat) →
          </a>
          <div className="footer-contact-label" style={{ marginTop: 16 }}>
            Instagram
          </div>
          <a
            href="https://instagram.com/elevationstudio.ng"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--gold)", fontWeight: 500 }}
          >
            @elevationstudio.ng →
          </a>
          <div className="footer-contact-label" style={{ marginTop: 16 }}>
            Location Base
          </div>
          <div className="footer-contact-value" style={{ fontSize: 14 }}>
            Ogun — Lagos Corridor · Nigeria
          </div>

          <div style={{ marginTop: 20 }}>
            <LocationMap height="240px" />
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <QRCodeCard compact />
          </div>
        </div>
      </aside>

      <div className="contact-main">
        <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
          <div className="form-progress">
            {progress.map((p) => (
              <div
                key={p.num}
                className={`form-progress-step ${p.done ? "done" : ""} ${p.active ? "active" : ""}`.trim()}
              />
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="form-step-title">About you</div>
              <p className="form-step-hint">Step 1 of 4 — who we&apos;re partnering with.</p>
              <div className="form-grid">
                <div className={`form-field ${errors.name ? "error" : ""}`}>
                  <label htmlFor="name">Full name *</label>
                  <input
                    id="name"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <div className="field-error">{errors.name}</div>
                  )}
                </div>
                <div className={`form-field ${errors.email ? "error" : ""}`}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <div className="field-error">{errors.email}</div>
                  )}
                </div>
                <div className={`form-field ${errors.phone ? "error" : ""}`}>
                  <label htmlFor="phone">Phone *</label>
                  <input
                    id="phone"
                    value={fields.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <div className="field-error">{errors.phone}</div>
                  )}
                </div>
                <div className={`form-field ${errors.role ? "error" : ""}`}>
                  <label htmlFor="role">Your role *</label>
                  <input
                    id="role"
                    value={fields.role}
                    onChange={(e) => set("role", e.target.value)}
                  />
                  {errors.role && (
                    <div className="field-error">{errors.role}</div>
                  )}
                </div>
                <div className={`form-field ${errors.company ? "error" : ""}`}>
                  <label htmlFor="company">Company / organisation *</label>
                  <input
                    id="company"
                    value={fields.company}
                    onChange={(e) => set("company", e.target.value)}
                    autoComplete="organization"
                  />
                  {errors.company && (
                    <div className="field-error">{errors.company}</div>
                  )}
                </div>
                <div className={`form-field ${errors.location ? "error" : ""}`}>
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    value={fields.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                  {errors.location && (
                    <div className="field-error">{errors.location}</div>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-step-title">Your project</div>
              <p className="form-step-hint">Step 2 of 4 — scope and intent.</p>

              <div className="form-field" style={{ marginBottom: 24 }}>
                <label>Package *</label>
                <div className="package-radios">
                  {PACKAGES.map((p) => (
                    <div
                      key={p.id}
                      className={`package-radio ${p.bridge ? "bridge" : ""}`.trim()}
                    >
                      <input
                        type="radio"
                        name="package"
                        id={`pkg-${p.id}`}
                        checked={fields.packageId === p.id}
                        onChange={() => handlePackageChange(p.id)}
                      />
                      <label htmlFor={`pkg-${p.id}`}>
                        <strong>{p.name}</strong>
                        {p.short} · {p.range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-grid full">
                <div className={`form-field ${errors.industry ? "error" : ""}`}>
                  <label htmlFor="industry">Industry / sector *</label>
                  <input
                    id="industry"
                    value={fields.industry}
                    onChange={(e) => set("industry", e.target.value)}
                  />
                  {errors.industry && (
                    <div className="field-error">{errors.industry}</div>
                  )}
                </div>
                <div
                  className={`form-field ${errors.projectDescription ? "error" : ""}`}
                >
                  <label htmlFor="projectDescription">Project description *</label>
                  <textarea
                    id="projectDescription"
                    value={fields.projectDescription}
                    onChange={(e) => set("projectDescription", e.target.value)}
                  />
                  {errors.projectDescription && (
                    <div className="field-error">{errors.projectDescription}</div>
                  )}
                </div>
                <div
                  className={`form-field ${errors.coreProblem ? "error" : ""}`}
                >
                  <label htmlFor="coreProblem">Core problem to solve *</label>
                  <textarea
                    id="coreProblem"
                    value={fields.coreProblem}
                    onChange={(e) => set("coreProblem", e.target.value)}
                  />
                  {errors.coreProblem && (
                    <div className="field-error">{errors.coreProblem}</div>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-step-title">Investment & timeline</div>
              <p className="form-step-hint">Step 3 of 4 — how you&apos;re resourcing this.</p>

              <div className="form-field">
                <div className="budget-slider-container">
                  <div className="budget-slider-header">
                    <span className="budget-slider-label">Investment Range</span>
                    <span className="budget-slider-value">{BUDGET_STEPS[fields.budgetIndex]}</span>
                  </div>
                  <input
                    type="range"
                    className="budget-slider"
                    min={0}
                    max={BUDGET_STEPS.length - 1}
                    step={1}
                    value={fields.budgetIndex}
                    style={{ "--value-percent": `${(fields.budgetIndex / (BUDGET_STEPS.length - 1)) * 100}%` } as React.CSSProperties}
                    onChange={(e) =>
                      set("budgetIndex", Number.parseInt(e.target.value, 10))
                    }
                  />
                  <div className="budget-slider-ticks">
                    <span>Min: ₦500K</span>
                    <span className="slider-tick-mid">₦8M</span>
                    <span>Max: ₦50M+</span>
                  </div>
                  <div className="budget-description-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="description-icon">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span><strong>Project Scope:</strong> {BUDGET_DESCRIPTIONS[fields.budgetIndex]}</span>
                  </div>
                </div>
              </div>

              <div className="form-grid full">
                <div
                  className={`form-field ${errors.decisionMaker ? "error" : ""}`}
                >
                  <label htmlFor="decisionMaker">Decision-maker context *</label>
                  <textarea
                    id="decisionMaker"
                    placeholder="Who signs off, internal stakeholders, approval path…"
                    value={fields.decisionMaker}
                    onChange={(e) => set("decisionMaker", e.target.value)}
                  />
                  {errors.decisionMaker && (
                    <div className="field-error">{errors.decisionMaker}</div>
                  )}
                </div>
                <div
                  className={`form-field ${errors.priorExperience ? "error" : ""}`}
                >
                  <label htmlFor="priorExperience">Prior agency / build experience *</label>
                  <textarea
                    id="priorExperience"
                    placeholder="What worked or didn’t before?"
                    value={fields.priorExperience}
                    onChange={(e) => set("priorExperience", e.target.value)}
                  />
                  {errors.priorExperience && (
                    <div className="field-error">{errors.priorExperience}</div>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="form-step-title">Final details</div>
              <p className="form-step-hint">Step 4 of 4 — context and references.</p>
              <div className="form-grid full">
                <div
                  className={`form-field ${errors.referralSource ? "error" : ""}`}
                >
                  <label htmlFor="referralSource">How did you hear about us? *</label>
                  <input
                    id="referralSource"
                    value={fields.referralSource}
                    onChange={(e) => set("referralSource", e.target.value)}
                  />
                  {errors.referralSource && (
                    <div className="field-error">{errors.referralSource}</div>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="existingAssets">Existing brand / design assets</label>
                  <textarea
                    id="existingAssets"
                    placeholder="Links to folders, brand files, or ‘starting from scratch’"
                    value={fields.existingAssets}
                    onChange={(e) => set("existingAssets", e.target.value)}
                  />
                </div>
                <div
                  className={`form-field ${errors.inspirationUrl ? "error" : ""}`}
                >
                  <label htmlFor="inspirationUrl">Inspiration URL (optional)</label>
                  <input
                    id="inspirationUrl"
                    placeholder="https://"
                    value={fields.inspirationUrl}
                    onChange={(e) => set("inspirationUrl", e.target.value)}
                  />
                  {errors.inspirationUrl && (
                    <div className="field-error">{errors.inspirationUrl}</div>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="additionalNotes">Anything else we should know?</label>
                  <textarea
                    id="additionalNotes"
                    value={fields.additionalNotes}
                    onChange={(e) => set("additionalNotes", e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {submitError && (
            <p style={{ color: "#e88", marginTop: 16, fontSize: 14 }}>
              {submitError}
            </p>
          )}

          <div className="form-nav-btns">
            {step > 1 ? (
              <button type="button" className="btn-ghost" onClick={goBack}>
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <button type="button" className="btn-primary" onClick={goNext}>
                Continue
              </button>
            ) : (
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Sending…" : "Submit brief"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="contact-page" style={{ padding: 40, color: "var(--gold)" }}>Loading proposal form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
