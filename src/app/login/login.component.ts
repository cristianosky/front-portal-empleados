import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
// import {MatHintModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private loginService = inject(LoginService);

  isValidField(fieldName: string): boolean | null {
    return (
      this.loginForm.controls[fieldName].errors &&
      this.loginForm.controls[fieldName].touched
    );
  }


  getFieldError(fieldName: string): string | null {
  const control = this.loginForm.get(fieldName);
  if (!control || !control.errors) return null;

  const errors = control.errors;

  if (errors['required']) {
    return 'Este campo es requerido';
  }

  if (errors['pattern']) {
    return 'Debe ser un correo electrónico válido';
  }

  return null;
}


  private fb = inject(FormBuilder);
  // Deje queado el usuario y contraseña para facilitar las pruebas puedes quitarlos y hacer mas validaciones si son necesarias
  loginForm: FormGroup = this.fb.group({
    email: ['admin@correo.com', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]
    ],
    password: ['123456', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', (response as any).token);
          localStorage.setItem('user', JSON.stringify((response as any).user));
          // Redirect or perform other actions after successful login
          window.location.href = '/'; // Example redirect
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
}
