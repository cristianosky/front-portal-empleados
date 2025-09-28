import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/layaut.interface';
import { PerfilService } from '../../services/perfil/perfil.service';
@Component({
  selector: 'app-perfil',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  readonly dialogRef = inject(MatDialogRef<PerfilComponent>);
  readonly perfilService = inject(PerfilService);
  user = JSON.parse(localStorage.getItem('user') || '{}') as Usuario;
  newPassword : string = '';

  actualizarPerfil() {
    this.perfilService.actualizarPerfil(this.user).subscribe({
      next: (response:any) => {
        // console.log('Perfil actualizado:', response);
        // Cerrar el diálogo después de actualizar el perfil
        this.dialogRef.close(response.user);
      }
    });
  }
}
