import React from 'react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Ensure Leaflet is imported

// Define the type for each data point (street address)
interface AddressData {
  lat: number;
  lng: number;
  taxDifference: number;
}

// Define the props for the Map component
interface MapProps {
  data: AddressData[];
}

const MapCape: React.FC<MapProps> = ({ data }) => {
  return (
    <MapContainer
      center={[43.65, -70.25]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      whenCreated={(mapInstance) => {
        // Fix for missing icon issues in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {data.map((address, index) => (
        <CircleMarker
          key={index}
          center={[address.lat, address.lng]} // Type array of [number, number]
          radius={5}
          fillColor={getColor(address.taxDifference)} // Dynamically set color
          fillOpacity={0.8}
          stroke={false}
        />
      ))}
    </MapContainer>
  );
};

// Function to determine color based on tax difference
const getColor = (taxDifference: number): string => {
  return taxDifference > 0 ? 'red' : 'green';
};

export default MapCape;
