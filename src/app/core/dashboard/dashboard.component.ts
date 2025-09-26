import { Component, signal } from '@angular/core';
import { DataGeneral, UltimosDocumentos } from '../../interfaces/dashboard.interfaces';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ultimosDocumentos = signal<UltimosDocumentos[]>([]);
  dataGeneral = signal<DataGeneral | null>(null);
  cargando = signal<boolean>(true);

  constructor() {
    const data: UltimosDocumentos[] = [
      { id: 1, nombre: 'Documento A', tipo: 'PDF', fecha: '2024-10-01' },
      { id: 2, nombre: 'Documento B', tipo: 'Word', fecha: '2024-10-02' },
      { id: 3, nombre: 'Documento C', tipo: 'Excel', fecha: '2024-10-03' },
    ];
    const dataGen: DataGeneral = {
      proximaNomina: '2024-10-15',
      diasVacaciones: 10,
      asistencias: 20,
    };
    setTimeout(() => {
      this.ultimosDocumentos.set(data);
      this.dataGeneral.set(dataGen);
      this.cargando.set(false);
    }, 2000); // Simula una carga de datos de 2 segundos
  }
}
