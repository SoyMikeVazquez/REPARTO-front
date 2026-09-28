import React, { useEffect, useRef, useState } from 'react';

interface RouteMapProps {
  origin: [number, number];       // [lat, lng]
  destination: [number, number];  // [lat, lng]
  routeCoords: [number, number][]; // [[lat, lng], ...]
  originName?: string;
  destinationName?: string;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  origin,
  destination,
  routeCoords,
  originName = 'Origen',
  destinationName = 'Destino',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);

  // Load Leaflet dynamically
  useEffect(() => {
    // Check if Leaflet is already loaded in the window
    if ((window as any).L) {
      setIsLeafletLoaded(true);
      return;
    }

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.id = 'leaflet-css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.id = 'leaflet-js';
    script.onload = () => {
      setIsLeafletLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Clean up script/link tags only if they exist
      const loadedLink = document.getElementById('leaflet-css');
      const loadedScript = document.getElementById('leaflet-js');
      if (loadedLink) document.head.removeChild(loadedLink);
      if (loadedScript) document.body.removeChild(loadedScript);
    };
  }, []);

  // Initialize and update map
  useEffect(() => {
    if (!isLeafletLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Clean up previous markers & polylines
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    // Initialize map if not already done
    if (!mapInstanceRef.current) {
      // Set up custom icon paths to prevent leaflet default image load errors
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
      });

      // Light/modern Voyager tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Create custom pins
    const startIcon = L.divIcon({
      html: `<div style="background: #E53E3E; width: 14px; height: 14px; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 8px rgba(229, 62, 62, 0.6);"></div>`,
      className: '',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    const endIcon = L.divIcon({
      html: `<div style="background: #3182ce; width: 14px; height: 14px; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 8px rgba(49, 130, 206, 0.6);"></div>`,
      className: '',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    // Add start marker (branch)
    const startMarker = L.marker(origin, { icon: startIcon })
      .addTo(map)
      .bindPopup(`<strong>${originName}</strong><br/>Punto de origen`);
    markersRef.current.push(startMarker);

    // Add end marker (destination)
    const endMarker = L.marker(destination, { icon: endIcon })
      .addTo(map)
      .bindPopup(`<strong>${destinationName}</strong><br/>Punto de entrega`);
    markersRef.current.push(endMarker);

    // Draw route polyline
    if (routeCoords.length > 0) {
      const polyline = L.polyline(routeCoords, {
        color: '#E53E3E',
        weight: 4,
        opacity: 0.8,
        lineCap: 'round',
      }).addTo(map);
      polylineRef.current = polyline;
    }

    // Auto zoom & pan map to fit the route bounds
    try {
      const bounds = L.latLngBounds([origin, destination]);
      map.fitBounds(bounds, { padding: [30, 30] });
    } catch (e) {
      map.setView(origin, 13);
    }

    // Force map size recalculation
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

  }, [isLeafletLoaded, origin, destination, routeCoords, originName, destinationName]);

  // Clean up map instance on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!isLeafletLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          color: '#a0aec0',
          fontSize: '13px',
          fontFamily: 'sans-serif'
        }}>
          Cargando mapa interactivo...
        </div>
      )}
      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '100%', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }} 
      />
    </div>
  );
};
