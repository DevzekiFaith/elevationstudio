"use client";

import { useState } from "react";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const phoneNumber = "2349119059859";

  const options = [
    {
      title: "General Project Brief",
      subtitle: "Discuss brand, web, or space needs",
      text: "Hello Elevation Studio, I would like to discuss a project brief for my business.",
    },
    {
      title: "Package Consultation",
      subtitle: "Inquire about Foundation to Master Plan",
      text: "Hello Elevation Studio, I would like to inquire about your service packages and scope.",
    },
    {
      title: "Direct WhatsApp Call / Chat",
      subtitle: "Speak directly with Studio Lead Zeki Ubor",
      text: "Hello Zeki, I would like to schedule a quick conversation regarding Elevation Studio.",
    },
  ];

  const getWhatsAppLink = (text: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="whatsapp-floating-wrap">
      {open && (
        <div className="whatsapp-popup">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-header-info">
              <span className="online-dot" />
              <div>
                <div className="whatsapp-title">Elevation Studio Direct</div>
                <div className="whatsapp-sub">Typically responds within minutes</div>
              </div>
            </div>
            <button
              type="button"
              className="whatsapp-close"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp Popup"
            >
              ✕
            </button>
          </div>

          <div className="whatsapp-popup-body">
            <p className="whatsapp-prompt">
              Select an option to start a direct conversation on WhatsApp:
            </p>
            <div className="whatsapp-options">
              {options.map((opt, idx) => (
                <a
                  key={idx}
                  href={getWhatsAppLink(opt.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-option-card"
                  onClick={() => setOpen(false)}
                >
                  <div className="wa-opt-title">{opt.title}</div>
                  <div className="wa-opt-sub">{opt.subtitle}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="whatsapp-popup-footer">
            <a
              href={getWhatsAppLink("Hello Elevation Studio, I'm reaching out directly from your website.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-direct-btn"
            >
              Open Direct Chat (09119059859) →
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        className="whatsapp-launcher"
        onClick={() => setOpen(!open)}
        aria-label="Contact on WhatsApp"
        title="Direct WhatsApp Inquiry"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="whatsapp-launcher-badge">WhatsApp</span>
      </button>
    </div>
  );
}
