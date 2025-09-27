import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";


@Component({
  selector: 'app-layaut',
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, RouterOutlet, DashboardComponent, RouterLink],
  templateUrl: './layaut.component.html',
  styleUrls: ['./layaut.component.scss']
})
export class LayautComponent {
  sidenavOpened = true;
  cerrarSesion() {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    // Eliminar user
    localStorage.removeItem('user');
    // Redirigir al usuario a la página de inicio de sesión u otra página
    window.location.href = '/login';
  }
}
