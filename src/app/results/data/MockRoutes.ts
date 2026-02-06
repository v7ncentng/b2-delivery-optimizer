// Mock route data for delivery optimizer
// 2 drivers, 4 stops each (Davis, CA)
import type { RoutesResponse, Route, Stop, TimeWindow } from "../types";

function tw(kind: "by" | "at", time: string): TimeWindow {
  return { kind, time };
}

// Driver 1's stops
const stopsDriver1: Stop[] = [
  { id: "stop-1", address: "230 1st St, Davis", lat: 38.552, lng: -121.748, sequence: 1, capacityUsed: 5, timeWindow: tw("by", "09:00"), deliveryNotes: "Office lobby" },
  { id: "stop-2", address: "404 2nd St, Davis", lat: 38.546, lng: -121.746, sequence: 2, capacityUsed: 3, timeWindow: tw("by", "09:30"), deliveryNotes: "Leave at door" },
  { id: "stop-3", address: "615 3rd St, Davis", lat: 38.54, lng: -121.744, sequence: 3, capacityUsed: 7, timeWindow: tw("at", "10:00"), deliveryNotes: "Back entrance" },
  { id: "stop-4", address: "820 4th St, Davis", lat: 38.534, lng: -121.742, sequence: 4, capacityUsed: 4, timeWindow: tw("by", "10:30"), deliveryNotes: "" },
];

// Driver 2's stops
const stopsDriver2: Stop[] = [
  { id: "stop-5", address: "201 B St, Davis", lat: 38.538, lng: -121.758, sequence: 1, capacityUsed: 6, timeWindow: tw("by", "09:15"), deliveryNotes: "Side door" },
  { id: "stop-6", address: "305 C St, Davis", lat: 38.539, lng: -121.738, sequence: 2, capacityUsed: 3, timeWindow: tw("by", "09:45"), deliveryNotes: "" },
  { id: "stop-7", address: "410 D St, Davis", lat: 38.54, lng: -121.722, sequence: 3, capacityUsed: 5, timeWindow: tw("at", "10:15"), deliveryNotes: "Call on arrival" },
  { id: "stop-8", address: "522 E St, Davis", lat: 38.541, lng: -121.708, sequence: 4, capacityUsed: 7, timeWindow: tw("by", "10:45"), deliveryNotes: "Fragile" },
];

// Defining the list of routes
const mockRoutes: Route[] = [
  { vehicleId: "vehicle-1", driverName: "Jim", stops: stopsDriver1 },
  { vehicleId: "vehicle-2", driverName: "Jennifer", stops: stopsDriver2 },
];

// Defining the response data from the API for the Results page
export const mockRoutesResponse: RoutesResponse = {
  timeBufferMinutes: 15,
  allowLateDeliveries: false,
  routes: mockRoutes,
};
