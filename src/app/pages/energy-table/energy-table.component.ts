import { Component, ViewChild } from '@angular/core'
import { NavComponent } from '../../components/nav/nav.component'
import { BoardComponent } from '../../components/board/board.component'
import { PaginationComponent } from '../../components/pagination/pagination.component'
import { CommonModule } from '@angular/common'
import { EnergyDto } from '../../models/energy-dto'
import { EnergyDataService } from '../../services/energy-data.service'
import { PaginatedResInterface } from '../../models/paginated-res-interface'
import { FilterComponent } from '../../components/filter/filter.component'

@Component({
  selector: 'app-energy-table',
  standalone: true,
  imports: [NavComponent, BoardComponent, PaginationComponent, FilterComponent, CommonModule],
  templateUrl: './energy-table.component.html',
  styleUrl: './energy-table.component.css'
})
export class EnergyTableComponent {
  @ViewChild(PaginationComponent) paginacionComponent!: PaginationComponent

  listEnergy: EnergyDto[] = []
  totalPages: number = 0

  constructor (private readonly datosService: EnergyDataService) {}

  page: number = 4
  typeEnergy: string = 'solar'
  year: number = 2020

  ngOnInit (): void {
    this.receivePage(this.page)
  }

  getData (page: number, typeEnergy: string, year: number): void {
    this.datosService.getForPageAndtypeAndYear(page, typeEnergy, year).subscribe((response: PaginatedResInterface) => {
      this.totalPages = response.totalPages
      this.listEnergy = response.content.map(item => new EnergyDto(
        item.id,
        item.country,
        item.year,
        item.typeEnergy,
        item.production,
        item.consumption
      ))
    })
  }

  receivePage (page: number): void {
    this.page = page
    this.getData(this.page, this.typeEnergy, this.year)
  }

  receiveFiltroDatos (data: any): void {
    this.typeEnergy = data.typeEnergy
    this.year = data.year
    this.getData(this.page, data.typeEnergy, data.year)
    this.paginacionComponent.resetPaginacion()
  }
}
