import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

export default function LocationMap() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('locations')
        .select('*');

      if (error) console.error("Supabase error:", error);
      if (data) setLocations(data);
    }

    fetchLocations();
  }, []);

  return (
    <MapContainer center={[47.6062, -122.3321]} zoom={6} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map(loc => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.name}</strong><br />
            Lat: {loc.lat}, Lng: {loc.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
