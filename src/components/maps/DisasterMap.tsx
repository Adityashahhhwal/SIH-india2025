"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

export default function DisasterMap() {
    const [isMounted, setIsMounted] = useState(false);

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

            {/* Example Markers */}
            <Marker position={[28.6139, 77.2090]}>
                <Popup>
                    <strong>New Delhi</strong><br />
                    Command Center HQ
                </Popup>
            </Marker>

            <Marker position={[19.0760, 72.8777]}>
                <Popup>
                    <strong>Mumbai</strong><br />
                    Flood Warning: Severe
                </Popup>
            </Marker>

            <Marker position={[13.0827, 80.2707]}>
                <Popup>
                    <strong>Chennai</strong><br />
                    Cyclone Shelter Active
                </Popup>
            </Marker>

        </MapContainer>
    );
}
