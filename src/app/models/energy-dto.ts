export class EnergyDto {
  constructor (
    public id: number,
    public country: string,
    public year: number,
    public typeEnergy: string,
    public production: number,
    public consumption: number
  ) {}
}
