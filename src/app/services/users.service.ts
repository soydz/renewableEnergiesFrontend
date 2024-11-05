import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly url = 'http://localhost:8080/user'

  constructor (private readonly http: HttpClient) {}

  addUser (user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' })
    return this.http.post<any>(this.url, user, { headers, observe: 'response' })
  }

  logginUser (credentials: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' })
    return this.http.post<any>(`${this.url}/login`, credentials, { headers, observe: 'response' })
  }

  updateUser (user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' })
    return this.http.put<any>(`${this.url}`, user, { headers, observe: 'response' })
  }

  deleteUser (username: string): Observable<any> {
    return this.http.delete(`${this.url}/${username}`, { observe: 'response' })
  }
}
