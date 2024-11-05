import { EnergyDataInterface } from './energy-data-interface'

export interface GroupedEnergyDataInterface {
  [locationName: string]: EnergyDataInterface
}
