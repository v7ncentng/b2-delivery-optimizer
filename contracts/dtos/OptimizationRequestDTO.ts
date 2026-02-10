export interface GeoPoint {
  lat: number
  lng: number
}

export interface Capacity {
  weight: number
  volume: number
  units: number
}

export interface VehicleDTO {
  id: string
  startLocation: GeoPoint
  endLocation: GeoPoint
  capacity: Capacity
  maxRouteDuration: number
}

export interface DeliveryDTO {
  id: string
  address: string
  location: GeoPoint
  serviceTime: number
  demand: Capacity
}

export interface OptimizationRequestDTO {
  vehicles: VehicleDTO[]
  deliveries: DeliveryDTO[]
}