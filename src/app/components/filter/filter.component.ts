import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() filtroEvent = new EventEmitter<any>()
  filtroForm: FormGroup

  constructor (private readonly fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      typeEnergy: ['solar'],
      year: ['2020']
    })
  }

  onSubmit (): void {
    if (this.filtroForm.value.year < 1965 || this.filtroForm.value.year > 2021) {
      alert('Año no disponible')
      this.filtroForm = this.fb.group({
        typeEnergy: ['solar'],
        year: ['2020']
      })
    }
    this.filtroEvent.emit(this.filtroForm.value)
  }
}
