// Results page only: types for map, route list, and edits
// Edit page input: addresses, time buffers, vehicle capacity, delivery times, notes.
// VROOM/OSRM output: route order, coordinates, travel times.

// Decipher between whether a delivery is a deadline (by) or an exact time (at)
export type DeliveryTimeType= "by" | "at";

// Concatenate the delivery time type and the time
export interface TimeWindow {
  kind: DeliveryTimeType; // "by" or "at"
  time: string; // e.g time is 11:00
}

// Data for a single delivery stop
export interface Stop {
  id: string; // id of the stop number (e.g stop-1)
  address: string; // address of the stop
  lat: number; // coordinates for the stop (latitude and longitude) that comes from OSRM results
  lng: number;
  sequence: number; // order in the route that comes from OSRM results
  capacityUsed: number; // how much capacity is used for the stop (e.g 5 boxes)
  timeWindow: TimeWindow; // time type and time for the stop
  deliveryNotes: string; // notes for the stop
}

// The definition of what a vehicle is (one driver and capacity for the vehicle)
export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
}

// The definition of what a route is (one driver, their stop in order, and the path to draw for the route)
export interface Route {
  vehicleId: string; // id of the vehicle (e.g vehicle-1)
  driverName: string; // name of the driver (e.g Jim)
  stops: Stop[]; // list of stops for the route
  geometry?: { lat: number; lng: number }[]; // ordered list of coordinates for the route (that'll be used for drawing the route on the map)
}

// The definition for what the response page will get (list of Routes), alongside the option to allow late deliveries (allowLateDeliveries) and add how much extra time to add to the route for more realistic travel times (traffic, unloading, etc.)
export interface RoutesResponse {
  timeBufferMinutes?: number;
  allowLateDeliveries?: boolean;
  routes: Route[];
}
