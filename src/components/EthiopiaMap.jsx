import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function EthiopiaMap({ onViewFullMap }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center coordinates for Ethiopia
    const map = L.map(mapContainerRef.current, {
      center: [9.03, 38.74],
      zoom: 6,
      zoomControl: false, // We'll add custom positioned zoom control
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Standard OpenStreetMap tiles or CartoDB Voyager light tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Custom Zoom controls on top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Risk Zones Shading (Circle Overlays)
    // Tigray / Mekele Risk Zone (Critical Red)
    L.circle([13.4967, 39.4769], {
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: 0.25,
      radius: 120000,
      stroke: true,
      weight: 1.5
    }).addTo(map);

    // Afar Drought Risk Zone (High Orange)
    L.circle([11.75, 41.00], {
      color: '#f97316',
      fillColor: '#f97316',
      fillOpacity: 0.2,
      radius: 100000,
      stroke: true,
      weight: 1
    }).addTo(map);

    // Gofa Landslide Risk Zone (High Orange)
    L.circle([6.3, 36.8], {
      color: '#f97316',
      fillColor: '#f97316',
      fillOpacity: 0.2,
      radius: 90000,
      stroke: true,
      weight: 1
    }).addTo(map);

    // Map Locations & Risk Pins
    const locations = [
      { name: 'Mekele', lat: 13.4967, lng: 39.4769, level: 'critical', label: 'Mekele', text: 'Earthquake Felt & Critical Risk' },
      { name: 'Bahir Dar', lat: 11.5942, lng: 37.3908, level: 'low', label: 'Bahir Dar', text: 'Stable Conditions' },
      { name: 'Addis Ababa', lat: 9.0300, lng: 38.7400, level: 'medium', label: 'Addis Ababa', text: 'Capital District Monitoring' },
      { name: 'Dire Dawa', lat: 9.6009, lng: 41.8501, level: 'low', label: 'Dire Dawa', text: 'Normal Operations' },
      { name: 'Harar', lat: 9.3139, lng: 42.1182, level: 'low', label: 'Harar', text: 'No Active Warnings' },
      { name: 'Nekemte', lat: 9.0833, lng: 36.5500, level: 'medium', label: 'Nekemte', text: 'Heavy Rainfall Alert' },
      { name: 'Jimma', lat: 7.6734, lng: 36.8344, level: 'medium', label: 'Jimma', text: 'Landslide Watch' },
      { name: 'Hawassa', lat: 7.0621, lng: 38.4763, level: 'low', label: 'Hawassa', text: 'Normal Water Levels' },
      { name: 'Gofa / Southern', lat: 6.2000, lng: 36.7000, level: 'high', label: 'Gofa Zone', text: 'Landslide Risk Active' },
      { name: 'Gambella', lat: 8.2472, lng: 34.5916, level: 'critical', label: 'Gambella', text: 'Flash Flood Warning' },
      { name: 'Afar Region', lat: 11.5000, lng: 40.8000, level: 'high', label: 'Afar', text: 'Drought Warning' }
    ];

    locations.forEach(loc => {
      let pinClass = 'low';
      let iconSymbol = '✓';
      if (loc.level === 'critical') {
        pinClass = 'critical';
        iconSymbol = '⚠️';
      } else if (loc.level === 'high') {
        pinClass = 'high';
        iconSymbol = '🔥';
      } else if (loc.level === 'medium') {
        pinClass = 'medium';
        iconSymbol = '▲';
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-div-icon',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div class="custom-map-pin ${pinClass}">
              ${iconSymbol}
            </div>
            <div style="background: rgba(255,255,255,0.92); border: 1px solid #cbd5e1; padding: 2px 6px; border-radius: 6px; font-size: 10px; font-weight: 700; color: #1e293b; white-space: nowrap; margin-top: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              ${loc.label}
            </div>
          </div>
        `,
        iconSize: [40, 45],
        iconAnchor: [20, 22]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: var(--font-main); padding: 4px;">
          <h4 style="margin: 0 0 4px 0; color: #0f172a; font-weight: 800; font-size: 13px;">${loc.name}</h4>
          <p style="margin: 0; color: #475569; font-size: 11px; font-weight: 600;">Status: <span style="text-transform: capitalize; color: ${loc.level === 'critical' ? '#ef4444' : loc.level === 'high' ? '#f97316' : '#10b981'}">${loc.level}</span></p>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 11px;">${loc.text}</p>
        </div>
      `);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="map-container-relative">
      <div ref={mapContainerRef} className="leaflet-map-frame" />

      {/* Risk Level Floating Legend */}
      <div className="map-risk-legend">
        <h5>Risk Level</h5>
        <div className="risk-level-list">
          <div className="risk-level-item">
            <span className="risk-color-dot low"></span>
            <span>Low</span>
          </div>
          <div className="risk-level-item">
            <span className="risk-color-dot medium"></span>
            <span>Medium</span>
          </div>
          <div className="risk-level-item">
            <span className="risk-color-dot high"></span>
            <span>High</span>
          </div>
          <div className="risk-level-item">
            <span className="risk-color-dot critical"></span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      {/* Button to View Full Map */}
      <button className="btn-view-full-map" onClick={onViewFullMap}>
        <span>View Full Map</span>
        <span>&rsaquo;</span>
      </button>
    </div>
  );
}
