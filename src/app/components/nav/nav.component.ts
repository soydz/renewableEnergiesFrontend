import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false

  constructor (private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit (): void {
    this.auth.authStatus$.subscribe(status => {
      this.isAuthenticated = status
    })
  }

  async onLogOut (): Promise<void> {
    await this.auth.logout()
    await this.router.navigate(['/'])
  }

  readToken (): any {
    const token = this.auth.getToken()
    if (token !== null) {
      return JSON.parse(atob(token.split('.')[1])).sub
    }
  }

  getData (): string {
    const data = this.readToken().split(',')
    return (String(data[1][7]) + String(data[2][11])).toUpperCase()
  }
}
