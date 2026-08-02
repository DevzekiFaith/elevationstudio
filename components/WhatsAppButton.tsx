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

          <div className="whatsapp-popup-footer flex flex-col gap-2">
            <a
              href="https://instagram.com/elevationstudio.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded font-mono text-xs text-center font-semibold block"
            >
              Follow @elevationstudio.ng on Instagram 📸
            </a>
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

      <div className="flex items-center gap-3">
        <a
          href="https://instagram.com/elevationstudio.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-launcher bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all border border-white/20"
          title="Follow Elevation Studio on Instagram (@elevationstudio.ng)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          <span className="font-mono text-xs font-semibold tracking-wider">@elevationstudio.ng</span>
        </a>

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
    </div>
  );
}
