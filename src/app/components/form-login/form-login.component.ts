import { EventEmitter, Component, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  @Output() logginUserEvent = new EventEmitter<any>()

  logginUserForm: FormGroup

  constructor (private readonly fb: FormBuilder) {
    this.logginUserForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit (): void {
    if (this.logginUserForm.valid) {
      this.logginUserEvent.emit(this.logginUserForm.value)
      this.logginUserForm.reset()
    } else {
      alert('Formulario invalido')
    }
  }
}
