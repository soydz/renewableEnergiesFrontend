import { Component } from '@angular/core'
import { NavComponent } from '../../components/nav/nav.component'
import { FormLoginComponent } from '../../components/form-login/form-login.component'
import { UsersService } from '../../services/users.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [NavComponent, FormLoginComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  constructor (
    private readonly usuariosService: UsersService,
    private readonly auth: AuthService,
    private readonly router: Router) {}

  receiveLogginUser (data: any): void {
    this.usuariosService.logginUser(data).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          void this.router.navigate(['/graphics'])
        }
        this.auth.setToken(response.body.token)
      },
      error: (error) => {
        if (error.status === 401) {
          alert('Usuario o contraseña incorrectos')
        }
      },
      complete: () => {}
    })
  }
}
