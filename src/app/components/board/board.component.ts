import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  @Input() listEnergy!: Array<{ id: number, country: string, year: number, typeEnergy: string, production: number, consumption: number }>
}
