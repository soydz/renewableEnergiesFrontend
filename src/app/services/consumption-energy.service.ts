import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConsumptionEnergyService {
  private readonly url = 'http://localhost:8080/consumption'

  constructor (private readonly http: HttpClient) { }

  getConsumption (): Observable<any> {
    return this.http.get<any>(this.url)
  }
}
