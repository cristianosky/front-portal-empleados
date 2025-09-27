import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  urlApi: string = environment.urlApi;
  http = inject(HttpClient);
  
  obtenerPorcentajeDias(){
    const anioActual = new Date().getFullYear();
    const mesActual = new Date().getMonth() + 1;
    return this.http.get<any>(`${this.urlApi}/attendance/monthly?year=${anioActual}&month=${mesActual}`);
  }
}
