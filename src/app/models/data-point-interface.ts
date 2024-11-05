import { TypesEnergiesEnum } from './types-energies-enum'

export interface DataPointInterface {
  id: number
  value: number
  location: {
    id: number
    name: string
    year: number
    region: string
  }
  typeEnergy: TypesEnergiesEnum
}
