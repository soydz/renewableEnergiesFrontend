import { Component } from '@angular/core'
import { NavComponent } from '../../components/nav/nav.component'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { UsersService } from '../../services/users.service'
import { Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userInfo: Record<string, any> = {}
  dataUserForm: FormGroup
  deleteUserForm: FormGroup

  deleteUser: boolean = false

  constructor (
    private readonly auth: AuthService,
    private readonly usuarios: UsersService,
    private readonly fb: FormBuilder,
    private readonly router: Router) {
    this.dataUserForm = this.fb.group({
      userName: [''],
      name: [''],
      lastName: [''],
      email: ['']
    })

    this.deleteUserForm = this.fb.group({
      check: false
    })
  }

  ngOnInit (): void {
    this.getUserInfo()

    this.dataUserForm.patchValue({
      userName: this.userInfo['userName'],
      name: this.userInfo['name'],
      lastName: this.userInfo['lastName'],
      email: this.userInfo['email']
    })
  }

  readToken (): string | undefined {
    const token = this.auth.getToken()
    if (token !== null) {
      return JSON.parse(atob(token.split('.')[1])).sub
    }
    return undefined
  }

  getUserInfo (): void {
    const token = this.readToken()
    if ((token?.split(',')) != null) {
      const data = token.split(',')
      this.userInfo = this.auth.convertArrayToObject(data)
    }
  }

  updateUserInfo (): void {
    this.auth.removeToken()
  }

  updateUser (): void {
    this.usuarios.updateUser(this.dataUserForm.value).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          alert('Información actualizada')
          this.auth.removeToken()
          this.auth.setToken(response.body.token)
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  btnDelete (): void {
    if (this.deleteUserForm.value.check !== null && this.deleteUserForm.value.check !== undefined) {
      if (this.deleteUserForm.value.check === true) {
        this.usuarios.deleteUser(this.dataUserForm.value.userName).subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.status === 204) {
              this.auth.logout()
              void this.router.navigate(['/'])
            }
          },
          error: (error) => {
            console.log(error)
          }
        })
      } else {
        if (this.deleteUser) {
          alert('Debes seleccionar la casilla para proceder con la eliminación')
        }
        this.deleteUser = true
      }
    }
  }
}
