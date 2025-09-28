import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../interfaces/layaut.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  urlApi: string = environment.urlApi;
  http = inject(HttpClient);

  actualizarPerfil(data: Usuario) {
    return this.http.put<Usuario>(`${this.urlApi}/profile/`, data);
  }
}
