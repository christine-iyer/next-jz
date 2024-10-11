// // components/Map.tsx
// import React from 'react';
// import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
// import L from 'leaflet';

// // Define the type for each data point (street address)
// interface AddressData {
//   lat: number;
//   lng: number;
//   taxDifference: number;
// }

// // Define the props for the Map component
// interface MapProps {
//   data: AddressData[];
// }

// const Leafy: React.FC<MapProps> = ({ data }) => {
//   return (
//     <MapContainer
//       center={[43.65, -70.25]}
//       zoom={13}
//       style={{ height: '100vh', width: '100%' }}
//       whenCreated={(mapInstance) => {
//         // Fix for missing icon issues in Leaflet
//         delete (L.Icon.Default.prototype as any)._getIconUrl;
//         L.Icon.Default.mergeOptions({
//           iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//           iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//           shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
//         });
//       }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//       {data.map((address, index) => (
//         <CircleMarker
//           key={index}
//           center={[address.lat, address.lng]} // Type array of [number, number]
//           radius={5}
//           fillColor={getColor(address.taxDifference)} // Dynamically set color
//           fillOpacity={0.8}
//           stroke={false}
//         />
//       ))}
//     </MapContainer>
//   );
// };

// // Function to determine color based on tax difference
// const getColor = (taxDifference: number): string => {
//   return taxDifference > 0 ? 'red' : 'green';
// };

// export default Leafy;
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface MapProps {
  data: { lat: number; lng: number; taxDifference: number }[];
}

const Leafy: React.FC<MapProps> = ({ data }) => {
  const mapRef = useRef<L.Map | null>(null); // Reference for map instance

  useEffect(() => {
    // Fix Leaflet's default icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x.src,
      iconUrl: markerIcon.src,
      shadowUrl: markerShadow.src,
    });

    // Check if the map is already initialized to avoid multiple maps
    if (!mapRef.current) {
      const map = L.map('map').setView([43.65107, -70.25030], 13);
      mapRef.current = map; // Save the map instance

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
    }

    // Clear existing markers before adding new ones
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add markers to the map based on data
    data.forEach(({ lat, lng, taxDifference }) => {
      L.marker([lat, lng])
        .addTo(mapRef.current!)
        .bindPopup(`Tax Difference: ${taxDifference}`);
    });

  }, [data]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default Leafy;

