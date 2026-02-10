export class Delivery {
  public readonly id: string
  public readonly lat: number
  public readonly lng: number
  public readonly serviceTime: number
  public readonly demandWeight: number
  public readonly address: string

  constructor(params: {
    id: string
    lat: number
    lng: number
    serviceTime: number
    demandWeight: number
    address: string
  }) {
    const {
      id,
      lat,
      lng,
      serviceTime,
      demandWeight,
      address
    } = params

    this.assertValidCoordinate(lat, lng)

    if (serviceTime < 0) {
      throw new Error("Service time cannot be negative")
    }

    if (demandWeight <= 0) {
      throw new Error("Delivery demand must be greater than 0")
    }

    this.id = id
    this.lat = lat
    this.lng = lng
    this.serviceTime = serviceTime
    this.demandWeight = demandWeight
    this.address = address
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
