import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi: string = environment.urlApi;
  http = inject(HttpClient);


  login(correo: string, password: string) {
    return this.http.post(`${this.urlApi}/auth/login`, { email: correo, password: password });
  }
}
