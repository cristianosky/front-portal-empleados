import { Component, signal } from '@angular/core';
import { UltimosDocumentos } from '../../interfaces/dashboard.interfaces';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ultimosDocumentos = signal<UltimosDocumentos[]>([])

  constructor() {
    const data: UltimosDocumentos[] = [
      { id: 1, nombre: 'Documento A', tipo: 'PDF', fecha: '2024-10-01' },
      { id: 2, nombre: 'Documento B', tipo: 'Word', fecha: '2024-10-02' },
      { id: 3, nombre: 'Documento C', tipo: 'Excel', fecha: '2024-10-03' },
    ];
    this.ultimosDocumentos.set(data);
  }
}
