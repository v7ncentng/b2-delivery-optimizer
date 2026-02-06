"use client";

import { useCallback } from "react";
import { LoadScriptNext, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import type { Route } from "../types";

const DAVIS_CENTER = { lat: 38.5449, lng: -121.7405 };
const ROUTE_COLORS = ["#2563eb", "#16a34a"]; // blue, green

type MapComponentProps = {
  routes: Route[];
};

export default function MapComponent({ routes }: MapComponentProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? "";

  const onMapLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      routes.forEach((route) => {
        route.stops.forEach((s) => bounds.extend({ lat: s.lat, lng: s.lng }));
      });
      map.fitBounds(bounds, 48);
    },
    [routes]
  );

  if (!apiKey) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-zinc-100 text-zinc-600">
        Missing NEXT_PUBLIC_GOOGLE_MAPS_KEY
      </div>
    );
  }

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        center={DAVIS_CENTER}
        zoom={11}
        onLoad={onMapLoad}
        mapContainerStyle={{ width: "100%", height: "100%", minHeight: "70vh" }}
        mapContainerClassName="w-full min-h-[70vh] rounded-lg"
      >
        {routes.map((route, routeIndex) => {
          const color = ROUTE_COLORS[routeIndex % ROUTE_COLORS.length];
          const sortedStops = [...route.stops].sort((a, b) => a.sequence - b.sequence);
          const path = sortedStops.map((s) => ({ lat: s.lat, lng: s.lng }));

          return (
            <div key={route.vehicleId}>
              <Polyline
                path={path}
                options={{
                  strokeColor: color,
                  strokeWeight: 5,
                  strokeOpacity: 0.9,
                }}
              />
              {sortedStops.map((stop) => (
                <Marker
                  key={stop.id}
                  position={{ lat: stop.lat, lng: stop.lng }}
                  title={stop.address}
                />
              ))}
            </div>
          );
        })}
      </GoogleMap>
    </LoadScriptNext>
  );
}
