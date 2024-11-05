import { Component, OnInit } from '@angular/core'
import { NavComponent } from '../../components/nav/nav.component'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { ProductionEnergyService } from '../../services/production-energy.service'
import { ConsumptionEnergyService } from '../../services/consumption-energy.service'
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component'
import { GraphicsFilterComponent } from '../../components/graphics-filter/graphics-filter.component'

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [NavComponent, CommonModule, BarChartComponent, GraphicsFilterComponent],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css'
})
export class GraphicsComponent implements OnInit {
  listProduction: any[] = []
  listConsumption: any[] = []

  dataFiltrada: any[] = []

  isAuthenticated: boolean = false

  constructor (
    private readonly productionEnergyService: ProductionEnergyService,
    private readonly consumptionEnergyService: ConsumptionEnergyService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit (): void {
    this.productionEnergyService.getProduction().subscribe((response: any) => {
      this.listProduction = response
      this.filtrarData({ energy: 'produccion', year: 2020, region: 'Europa Occidental' })
    })

    this.consumptionEnergyService.getConsumption().subscribe((response: any) => {
      this.listConsumption = response
    })

    this.isAuthenticated = this.auth.isAuthenticated()
  }

  receiveFiltroDatos (filtro: any): void {
    this.filtrarData(filtro)
  }

  filtrarData (filtro: any): void {
    if (filtro.energy === 'produccion') {
      this.dataFiltrada = this.listProduction.filter((item) =>
        item.location.year === Number(filtro.year) && item.location.region === filtro.region
      )
    } else if (filtro.energy === 'consumo') {
      this.dataFiltrada = this.listConsumption.filter((item) =>
        item.location.year === Number(filtro.year) && item.location.region === filtro.region
      )
    }
  }

  async goToLoggin (): Promise<void> {
    await this.router.navigate(['/user-login'])
  }
}
