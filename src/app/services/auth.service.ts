import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey: string = 'authToken'
  private readonly authSubject = new BehaviorSubject<boolean>(this.isAuthenticated())

  constructor () {
    this.authSubject.next(this.isAuthenticated())
  }

  // Observable
  authStatus$ = this.authSubject.asObservable()

  setToken (token: string): void {
    localStorage.setItem(this.tokenKey, token)
    this.authSubject.next(true)
  }

  getToken (): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  removeToken (): void {
    localStorage.removeItem(this.tokenKey)
  }

  isAuthenticated (): boolean {
    const token = this.getToken()
    if (token === null) {
      return false
    }
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expiration = payload.exp * 1000
    return Date.now() < expiration
  }

  logout (): void {
    localStorage.removeItem(this.tokenKey)
    this.authSubject.next(false)
  }

  convertArrayToObject (array: string[]): Record<string, any> | {} {
    const obj: Record<string, any> = {}

    array.forEach(item => {
      const [key, value] = item.split('=')

      const cleanedKey = key.trim()
      const cleanedValue = value.replace(/['\s]/g, '').trim()

      if (cleanedValue === '[]}') {
        obj[cleanedKey] = []
      } else {
        obj[cleanedKey] = cleanedValue
      }
    })
    return obj
  }
}
