import { Component, inject, signal } from '@angular/core';
import { DataGeneral, UltimosDocumentos } from '../../interfaces/dashboard.interfaces';
import { Usuario } from '../../interfaces/layaut.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { forkJoin } from 'rxjs';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PerfilComponent } from '../perfil/perfil.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgTemplateOutlet, DatePipe, MatButtonModule, MatDialogModule, PerfilComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  readonly dialog = inject(MatDialog);
  ultimosDocumentos = signal<UltimosDocumentos[]>([]);
  diasPorcentaje = signal<number | null>(null);
  diasVacaciones = signal<number | null>(null);
  cargando = signal<boolean>(false);
  proximaNomina = this.getProximaNomina();
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
    }, 2000); // Simula una carga de datos de 2 segundos
  }

  ngOnInit() {
    this.obtenerPorcentajeDias();
  }

  obtenerPorcentajeDias() {
    this.cargando.set(true);
    forkJoin([this.dashboard.getDiasVacaciones(), this.dashboard.obtenerPorcentajeDias()]).subscribe({
      next: (resp) => {
        this.diasPorcentaje.set(resp[1].percentage);
        this.diasVacaciones.set(resp[0].diasDisponibles);
        this.cargando.set(false);
      },
      error: (err) => {
        console.log(err);
        this.cargando.set(false);
      }
    });
  }

  getProximaNomina(): Date {
    const hoy = new Date();
    const mes = hoy.getMonth();
    const año = hoy.getFullYear();

    let proxima = new Date(año, mes, 30);

    if (proxima <= hoy) {
      proxima = new Date(año, mes + 1, 30);
    }

    return proxima;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PerfilComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.usuario.set(result);
        localStorage.setItem('user', JSON.stringify(result));
      }
    });
  }
}
