import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {
  @Output() registroUserEvent = new EventEmitter<any>()
  registroUserForm: FormGroup

  constructor (private readonly fb: FormBuilder) {
    this.registroUserForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit (): void {
    if (this.registroUserForm.valid) {
      this.registroUserEvent.emit(this.registroUserForm.value)
      this.registroUserForm.reset()
    } else {
      alert('Formulario invalido')
    }
  }
}
