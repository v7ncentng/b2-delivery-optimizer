// Vehicle Entity

export class Vehicle {
  public readonly id: string
  public readonly startLat: number
  public readonly startLng: number
  public readonly endLat: number
  public readonly endLng: number
  public readonly capacityWeight: number
  public readonly maxRouteDuration: number

  constructor(params: {
    id: string
    startLat: number
    startLng: number
    endLat: number
    endLng: number
    capacityWeight: number
    maxRouteDuration: number
  }) {
    const {
      id,
      startLat,
      startLng,
      endLat,
      endLng,
      capacityWeight,
      maxRouteDuration
    } = params

    this.assertValidCoordinate(startLat, startLng)
    this.assertValidCoordinate(endLat, endLng)

    if (capacityWeight <= 0) {
      throw new Error("Vehicle capacity must be greater than 0")
    }

    if (maxRouteDuration <= 0) {
      throw new Error("Vehicle maxRouteDuration must be greater than 0")
    }

    this.id = id
    this.startLat = startLat
    this.startLng = startLng
    this.endLat = endLat
    this.endLng = endLng
    this.capacityWeight = capacityWeight
    this.maxRouteDuration = maxRouteDuration
  }

  private assertValidCoordinate(lat: number, lng: number) {
    if (lat < -90 || lat > 90) {
      throw new Error(`Invalid latitude: ${lat}`)
    }

    if (lng < -180 || lng > 180) {
      throw new Error(`Invalid longitude: ${lng}`)
    }
  }
}
