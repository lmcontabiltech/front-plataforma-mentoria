import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  recuperarSenhaForm!: FormGroup;
  mostrarRecuperarSenha = false;
  mostrarSenha = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.recuperarSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      // Implementar lógica de login
      // Redireciona para o dashboard após login
      this.router.navigate(['/sistema/dashboard']);
    }
  }

  onRecuperarSenha(): void {
    if (this.recuperarSenhaForm.valid) {
      console.log('Recuperar senha:', this.recuperarSenhaForm.value);
      // Implementar lógica de recuperação de senha
    }
  }

  toggleRecuperarSenha(event: Event): void {
    event.preventDefault();
    this.mostrarRecuperarSenha = !this.mostrarRecuperarSenha;
  }

  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
