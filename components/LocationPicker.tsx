/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type LocationData = {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type Props = {
  defaultLabel: string;
  onSelect: (location: LocationData) => void;
};

// Fix marker icon issues in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationPicker: React.FC<Props> = ({ defaultLabel, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<LocationData | null>(null);

  const handleSearch = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();
    setResults(data);
  };

  const selectLocation = (place: any) => {
    const location: LocationData = {
      address: place.display_name,
      coordinates: {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
      },
    };
    setSelected(location);
    setResults([]);
    onSelect(location); // Corrected from onChange
  };

  return (
    <div className="space-y-3 mb-6">
      <label className="block font-medium">{defaultLabel}</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="border rounded bg-white max-h-40 overflow-y-auto">
          {results.map((place, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => selectLocation(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <>
          <p className="text-sm text-gray-600">{selected.address}</p>
          <MapContainer
            center={[selected.coordinates.lat, selected.coordinates.lng]}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker
              position={[selected.coordinates.lat, selected.coordinates.lng]}
            />
          </MapContainer>
        </>
      )}
    </div>
  );
};

export default LocationPicker;
