import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core'
import { DataPointInterface } from '../../models/data-point-interface'
import { GroupedEnergyDataInterface } from '../../models/grouped-energy-data-interface'
import { TypesEnergiesEnum } from '../../models/types-energies-enum'
import { BarController, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  @Input() dataFiltrada!: DataPointInterface[]

  public chart: Chart | undefined

  constructor (private readonly elementRef: ElementRef) { }

  ngOnInit (): void {
    this.createChart()
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['dataFiltrada']?.currentValue !== undefined && changes['dataFiltrada']?.currentValue !== null) {
      this.createChart()
    }
  }

  private createChart (): void {
    if (this.chart !== null && this.chart !== undefined) {
      this.chart.destroy()
    }

    const energyData: GroupedEnergyDataInterface = {}

    // Agrupar los datos
    for (const item of this.dataFiltrada) {
      const { name } = item.location
      const { typeEnergy, value } = item

      if (energyData !== null) {
        if (!(name in energyData)) {
          energyData[name] = {}
        }
        if (!(typeEnergy in energyData)) {
          energyData[name][typeEnergy] = 0
        }
      }
      energyData[name][typeEnergy] += value
    }

    const labels = Object.keys(energyData) // Nombres de los países
    const datasets = []

    // Crear datasets para cada tipo de energía
    const energyTypes = [...new Set(this.dataFiltrada.map(item => item.typeEnergy))]

    for (const type of energyTypes) {
      const values = labels.map(label => energyData[label][type])
      datasets.push({
        label: type,
        data: values,
        backgroundColor: this.getColor(type), // Método para obtener un color para cada tipo de energía
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      })
    }

    // Crear la gráfica
    Chart.register(LinearScale, BarController, CategoryScale, BarElement)

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels, // Etiquetas de los países
        datasets // Conjuntos de datos dinámicos
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Estadisticas energeticas'
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            padding: 12,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            usePointStyle: true,
            titleAlign: 'center',
            titleColor: 'gold',
            titleSpacing: 3,
            backgroundColor: 'midnightblue',
            bodyColor: 'orange',
            bodyAlign: 'center',
            callbacks: {
              label: (context) => {
                console.log(context)
                const value = context.raw
                console.log(value)
                // return `value ${value}`;
                return `Ventas ${context.parsed.y}`
              }
            }
          }
        }
      }
    })
  }

  // Método para asignar colores según el tipo de energía
  private getColor (type: TypesEnergiesEnum): string {
    const colors: { [key in TypesEnergiesEnum]: string } = {
      solar: 'rgb(250 204 21)',
      hydro: 'rgb(37 99 235)',
      wind: 'rgb(5 150 105)'
    }
    if (Object.prototype.hasOwnProperty.call(colors, type)) { // type in colors
      return colors[type]
    } else {
      return 'rgba(0, 0, 0, 0.2)'
    }
  }
}
