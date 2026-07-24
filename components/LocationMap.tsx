"use client";

import { useEffect, useRef, useState } from "react";

// Dark-gold luxury Google Map style JSON for Elevation Studio
const darkGoldMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0c0c0e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0c0c0e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#a1a1aa" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d4a843" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#71717a" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#141418" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e1e24" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#141418" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d4a843" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2d2618" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d4a843" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#060608" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3f3f46" }],
  },
];

export function LocationMap({ height = "420px" }: { height?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDKalq2mDOQcZqItOhrNEVZ8TlgiSnS6TQ";

  // Coordinates centered on the Ogun — Lagos Corridor (Lagos-Ibadan Expressway / Berger Corridor)
  const location = { lat: 6.6852, lng: 3.4158 };

  useEffect(() => {
    if (!mapRef.current) return;

    // Check if google maps script is already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    const scriptId = "google-maps-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initElevationMap`;
      script.async = true;
      script.defer = true;

      window.initElevationMap = () => {
        initMap();
      };

      document.head.appendChild(script);
    } else {
      window.initElevationMap = () => {
        initMap();
      };
    }

    function initMap() {
      if (!mapRef.current || !window.google || !window.google.maps) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 11,
        styles: darkGoldMapStyle,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      // Custom marker marker icon
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Elevation Studio HQ — Ogun - Lagos Corridor",
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#d4a843",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });

      // Info Window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="background:#0c0c0e; color:#ffffff; padding:12px 16px; border-radius:4px; font-family:sans-serif; max-width:240px; border:1px solid #d4a843;">
            <div style="font-size:10px; color:#d4a843; font-weight:700; letter-spacing:1px; margin-bottom:4px;">OPERATIONAL HQ</div>
            <div style="font-size:14px; font-weight:700; margin-bottom:4px;">Elevation Studio</div>
            <div style="font-size:12px; color:#a1a1aa; margin-bottom:8px;">Ogun — Lagos Corridor · Nigeria</div>
            <a href="https://wa.me/2349119059859" target="_blank" style="color:#d4a843; font-size:11px; text-decoration:none; font-weight:600;">Contact Studio Lead (09119059859) →</a>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      setMapLoaded(true);
    }
  }, [apiKey]);

  return (
    <div className="location-map-container" style={{ height }}>
      {/* Map Header */}
      <div className="location-map-header">
        <div className="location-map-tag">
          <span className="gold-dot" />
          <span>OPERATIONAL HEADQUARTERS</span>
        </div>
        <h4 className="location-map-title">OGUN — LAGOS CORRIDOR HUB</h4>
      </div>

      {/* Map Viewport Canvas */}
      <div className="location-map-viewport">
        <div ref={mapRef} className="location-map-canvas" />

        {/* Fallback dark iframe embed if JS API is initializing */}
        {!mapLoaded && (
          <iframe
            title="Elevation Studio Ogun-Lagos Corridor HQ Map"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Ogun+Lagos+Corridor,Nigeria&zoom=11`}
          />
        )}
      </div>

      {/* Map Footer Bar */}
      <div className="location-map-footer">
        <div className="map-coord-text">LOCATION COORDS: 6.6852° N, 3.4158° E</div>
        <a
          href="https://maps.google.com/?q=Ogun+Lagos+Corridor,Nigeria"
          target="_blank"
          rel="noopener noreferrer"
          className="map-open-link"
        >
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
}

// Global TypeScript declarations for Google Maps window object
declare global {
  interface Window {
    google: any;
    initElevationMap: () => void;
  }
}
