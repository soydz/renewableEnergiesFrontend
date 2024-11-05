import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-graphics-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './graphics-filter.component.html',
  styleUrl: './graphics-filter.component.css'
})
export class GraphicsFilterComponent {
  @Output() filtroEvent = new EventEmitter<any>()
  filtroForm: FormGroup

  listYear: number[] = []
  listRegion: string[] = [
    'Asia del Sur', 'Asia del Sudeste', 'Asia Oriental', 'Asia Central', 'Asia Occidental',
    'Norte de África', 'África Occidental', 'África Oriental', 'África Central', 'África Austral',
    'América del Norte', 'América Central', 'América del Sur', 'Caribe',
    'Europa Occidental', 'Europa del Este', 'Europa del Sur', 'Europa del Norte',
    'Oceanía'
  ]

  constructor (private readonly fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      energy: ['produccion'],
      year: [2020],
      region: ['Europa Occidental']
    })
  }

  ngOnInit (): void {
    for (let i = 1965; i <= 2021; i++) {
      this.listYear.push(i)
    }
  }

  onSubmit (): void {
    this.filtroEvent.emit(this.filtroForm.value)
  }
}
