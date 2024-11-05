import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PaginatedResInterface } from '../models/paginated-res-interface'

@Injectable({
  providedIn: 'root'
})
export class EnergyDataService {
  private readonly url = 'http://localhost:8080/energy'

  constructor (private readonly http: HttpClient) { }

  getForPageAndtypeAndYear (page: number, type: string, year: number): Observable<PaginatedResInterface> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('typeEnergy', type)
      .set('year', year === null ? 0 : year)

    return this.http.get<PaginatedResInterface>(this.url, { params })
  }
}
