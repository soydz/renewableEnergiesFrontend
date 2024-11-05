import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { User } from '../../models/user'
import { NavComponent } from '../../components/nav/nav.component'
import { FormRegisterComponent } from '../../components/form-register/form-register.component'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavComponent, FormRegisterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor (private readonly usuariosSevice: UsersService, private readonly router: Router) {}

  receiveRegistroUser (data: any): void {
    const user: User = new User(
      data.username,
      data.name,
      data.lastname,
      data.email,
      data.password,
      []
    )
    this.usuariosSevice.addUser(user).subscribe({
      next: (response) => {
        if (response.status === 201) {
          alert(`El usuario ${user.userName} ha sido creado satisfactoriamente`)
          void this.router.navigate(['/user-login'])
        }
      },
      error: (error) => {
        if (error.status === 409) {
          alert('El correo o el username ya se encuentran registrados')
        } else {
          alert('Error, usuario no creado')
        }
      },
      complete: () => {}
    })
  }
}
