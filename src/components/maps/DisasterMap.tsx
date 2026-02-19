"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDisasters } from "@/hooks/use-api";
import type { Disaster } from "@/lib/api";

// Fix for default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const severityColors: Record<string, string> = {
    critical: "#ef4444",
    warning: "#f59e0b",
    watch: "#38bdf8",
};

// Fallback disaster data for when backend is unavailable
const fallbackDisasters: Disaster[] = [
    {
        _id: "d1",
        type: "Flood",
        severity: "critical",
        title: "Mumbai Coastal Flood",
        description: "Heavy flooding in coastal areas",
        location: { type: "Point", coordinates: [72.8777, 19.076] },
        affectedRadius: 15000,
        status: "active",
        timestamp: new Date().toISOString(),
    },
    {
        _id: "d2",
        type: "Earthquake",
        severity: "warning",
        title: "Gujarat Seismic Activity",
        description: "Moderate seismic activity detected",
        location: { type: "Point", coordinates: [70.0, 23.0] },
        affectedRadius: 25000,
        status: "active",
        timestamp: new Date().toISOString(),
    },
    {
        _id: "d3",
        type: "Cyclone",
        severity: "critical",
        title: "Odisha Cyclone Warning",
        description: "Category 2 cyclone approaching coast",
        location: { type: "Point", coordinates: [85.8245, 20.2961] },
        affectedRadius: 50000,
        status: "active",
        timestamp: new Date().toISOString(),
    },
];

export default function DisasterMap() {
    const [isMounted, setIsMounted] = useState(false);
    const { data: disasters } = useDisasters();

    const displayDisasters = disasters && disasters.length > 0 ? disasters : fallbackDisasters;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-muted/20">
                <p className="text-muted-foreground animate-pulse">Loading Map Data...</p>
            </div>
        );
    }

    return (
        <MapContainer
            center={[20.5937, 78.9629]} // Center of India
            zoom={5}
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {displayDisasters.map((disaster) => {
                // GeoJSON stores [lng, lat], Leaflet expects [lat, lng]
                const lat = disaster.location.coordinates[1];
                const lng = disaster.location.coordinates[0];
                const color = severityColors[disaster.severity] || "#3b82f6";

                return (
                    <div key={disaster._id}>
                        <Marker position={[lat, lng]}>
                            <Popup>
                                <strong>{disaster.title}</strong><br />
                                <span style={{ color }}>{disaster.severity.toUpperCase()}</span> — {disaster.type}<br />
                                {disaster.description}
                            </Popup>
                        </Marker>
                        {disaster.affectedRadius > 0 && (
                            <Circle
                                center={[lat, lng]}
                                radius={disaster.affectedRadius}
                                pathOptions={{
                                    color,
                                    fillColor: color,
                                    fillOpacity: 0.1,
                                    weight: 1,
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </MapContainer>
    );
}
