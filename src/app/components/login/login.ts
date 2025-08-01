import { Component } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  credentials: LoginModel = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        if (control.markAsTouched) {
          control.markAsTouched();
        }
      });

      this.errorMessage = 'Por favor, completa el correo y la contraseña obligatorios.';
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        
        if (response.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/home']); // o donde corresponda
        }
      },
      error: (error) => {
        if (error.status === 401 && error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión.';
        }
        console.error('Error en login:', error);
      }
    });
  }
}