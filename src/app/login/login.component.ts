import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
// import {MatHintModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic
      console.log(this.loginForm.value);
      
    }
  }
}
