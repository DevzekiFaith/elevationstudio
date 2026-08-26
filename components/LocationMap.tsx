"use client";

import { useEffect, useRef, useState } from "react";

export function LocationMap({ height = "420px" }: { height?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordinates centered on the Ogun — Lagos Corridor (Lagos-Ibadan Expressway / Berger Corridor)
  const location: [number, number] = [6.6852, 3.4158];

  useEffect(() => {
    if (!mapRef.current) return;

    let mapInstance: any = null;

    // Load Leaflet CSS and JS dynamically to avoid server-side render issues
    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const scriptId = "leaflet-js";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initLeafletMap = () => {
      if (!mapRef.current || !window.L) return;

      // Avoid double initialization
      if ((mapRef.current as any)._leaflet_id) {
        setMapLoaded(true);
        return;
      }

      const L = window.L;
      mapInstance = L.map(mapRef.current, {
        center: location,
        zoom: 11,
        zoomControl: false,
        attributionControl: true
      });

      // If CARTO API key is provided, use CARTO tiles; otherwise use Esri ArcGIS Dark Gray Canvas (100% free, no API key required, zero throttling)
      const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY;

      if (cartoKey) {
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20
        }).addTo(mapInstance);
      } else {
        // Esri ArcGIS Dark Gray Base
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; OpenStreetMap',
          maxZoom: 16
        }).addTo(mapInstance);

        // Esri ArcGIS Dark Gray Labels & Roads overlay
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 16
        }).addTo(mapInstance);
      }

      // Custom Zoom Control at the bottom right
      L.control.zoom({ position: "bottomright" }).addTo(mapInstance);

      // Custom marker with gold pulse effect
      const customIcon = L.divIcon({
        className: "custom-gold-marker",
        html: '<div class="marker-glow-pin"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });

      const marker = L.marker(location, { icon: customIcon }).addTo(mapInstance);

      // Luxury dark info window/popup
      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="map-popup-eyebrow">OPERATIONAL HQ</div>
          <div class="map-popup-title">Elevation Studio</div>
          <div class="map-popup-desc">Ogun — Lagos Corridor · Nigeria</div>
          <a href="https://wa.me/2349119059859" target="_blank" class="map-popup-link">Contact Studio Lead →</a>
        </div>
      `, {
        className: "custom-dark-popup",
        closeButton: true
      });

      // Open popup by default
      marker.openPopup();

      setMapLoaded(true);
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = () => {
        initLeafletMap();
      };
      document.head.appendChild(script);
    } else {
      if (window.L) {
        initLeafletMap();
      } else {
        script.addEventListener("load", initLeafletMap);
      }
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div
      style={{ height }}
      className="relative w-full rounded-2xl overflow-hidden border border-[#333336] bg-[#0c0c0e] shadow-2xl"
    >
      <div ref={mapRef} className="w-full h-full" style={{ zIndex: 1 }} />

      {!mapLoaded && (
        <div className="absolute inset-0 bg-[#0c0c0e] flex flex-col items-center justify-center gap-3 p-6 text-center z-10 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin" />
          <div className="font-mono text-xs text-[var(--gold)] uppercase tracking-wider">
            Loading Interactive Studio Location Map...
          </div>
        </div>
      )}

      <style>{`
        /* Leaflet custom dark theme overrides */
        .leaflet-container {
          background: #0c0c0e !important;
          font-family: var(--font-syne), sans-serif;
        }
        .leaflet-bar {
          border: 1px solid #333336 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
          background: #141418 !important;
          border-radius: 4px !important;
          overflow: hidden;
        }
        .leaflet-bar a {
          background: #141418 !important;
          color: #d4a843 !important;
          border-bottom: 1px solid #333336 !important;
          transition: all 0.2s ease;
        }
        .leaflet-bar a:hover {
          background: #222226 !important;
          color: #fff !important;
        }
        .leaflet-bar a.leaflet-disabled {
          background: #0e0e12 !important;
          color: #555 !important;
        }
        .leaflet-control-attribution {
          background: rgba(12, 12, 14, 0.8) !important;
          color: rgba(244, 240, 232, 0.4) !important;
          font-size: 9px !important;
          border-top-left-radius: 4px;
        }
        .leaflet-control-attribution a {
          color: #d4a843 !important;
        }
        
        /* Custom Glowing Marker Pin */
        .custom-gold-marker {
          background: transparent;
          border: none;
        }
        .marker-glow-pin {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #d4a843;
          border: 2px solid #ffffff;
          box-shadow: 0 0 15px #d4a843, 0 0 30px #d4a843;
          animation: marker-pulse 2s infinite ease-in-out;
        }
        @keyframes marker-pulse {
          0% { transform: scale(1); box-shadow: 0 0 12px rgba(212,168,67,0.7); }
          50% { transform: scale(1.15); box-shadow: 0 0 20px rgba(212,168,67,0.95), 0 0 30px rgba(212,168,67,0.4); }
          100% { transform: scale(1); box-shadow: 0 0 12px rgba(212,168,67,0.7); }
        }

        /* Custom Popup styling */
        .custom-dark-popup .leaflet-popup-content-wrapper {
          background: #0c0c0e !important;
          border: 1px solid #d4a843 !important;
          border-radius: 8px !important;
          padding: 0 !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6) !important;
        }
        .custom-dark-popup .leaflet-popup-content {
          margin: 0 !important;
          padding: 0 !important;
        }
        .custom-dark-popup .leaflet-popup-tip {
          background: #0c0c0e !important;
          border-left: 1px solid #d4a843 !important;
          border-bottom: 1px solid #d4a843 !important;
          box-shadow: none !important;
        }
        .custom-dark-popup .leaflet-popup-close-button {
          color: #a1a1aa !important;
          padding: 8px 10px 0 0 !important;
          font-size: 16px !important;
        }
        .custom-dark-popup .leaflet-popup-close-button:hover {
          color: #fff !important;
          background: transparent !important;
        }

        /* Inner Popup card content */
        .map-popup-card {
          padding: 14px 18px;
          min-width: 220px;
        }
        .map-popup-eyebrow {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px;
          color: #d4a843;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .map-popup-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .map-popup-desc {
          font-size: 12px;
          color: #a1a1aa;
          margin-bottom: 10px;
        }
        .map-popup-link {
          display: inline-block;
          color: #d4a843;
          font-size: 11px;
          text-decoration: none;
          font-weight: 600;
          font-family: var(--font-dm-mono), monospace;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .map-popup-link:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
}

// Global window declaration for TypeScript
declare global {
  interface Window {
    google: any;
    initElevationMap: () => void;
    L: any;
  }
}
