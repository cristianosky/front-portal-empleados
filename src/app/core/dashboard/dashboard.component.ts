import { Component, inject, signal } from '@angular/core';
import { DataGeneral, UltimosDocumentos } from '../../interfaces/dashboard.interfaces';
import { Usuario } from '../../interfaces/layaut.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ultimosDocumentos = signal<UltimosDocumentos[]>([]);
  diasPorcentaje = signal<number | null>(null);
  cargando = signal<boolean>(false);
  usuario = signal<Usuario>(JSON.parse(localStorage.getItem('user') || '{}'));
  private dashboard = inject(DashboardService)

  constructor() {
    const data: UltimosDocumentos[] = [
      { id: 1, nombre: 'Documento A', tipo: 'PDF', fecha: '2024-10-01' },
      { id: 2, nombre: 'Documento B', tipo: 'Word', fecha: '2024-10-02' },
      { id: 3, nombre: 'Documento C', tipo: 'Excel', fecha: '2024-10-03' },
    ];
    setTimeout(() => {
      this.ultimosDocumentos.set(data);
      this.cargando.set(false);
    }, 2000); // Simula una carga de datos de 2 segundos
  }

  ngOnInit() {
    this.obtenerPorcentajeDias();
  }

  obtenerPorcentajeDias() {
    this.dashboard.obtenerPorcentajeDias().subscribe({
      next: (resp) => {
        console.log(resp);
        this.diasPorcentaje.set(resp.percentage);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
