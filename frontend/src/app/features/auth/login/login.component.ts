import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="login-page">

      <div class="background-glow glow-one"></div>
      <div class="background-glow glow-two"></div>

      <section class="login-container">

        <div class="brand">
          <div class="brand-icon">
            F
          </div>

          <div>
            <span class="brand-name">Finanzia</span>
            <span class="brand-subtitle">Secure Workspace</span>
          </div>
        </div>

        <div class="login-card">

          <div class="card-header">
            <span class="eyebrow">BIENVENIDO</span>

            <h1>
              Inicia sesión
            </h1>

            <p>
              Accede a tu espacio de trabajo de forma segura.
            </p>
          </div>

          <form
            [formGroup]="form"
            (ngSubmit)="submit()"
          >

            <div class="field">

              <label for="username">
                Usuario
              </label>

              <div class="input-wrapper">

                <span class="input-icon">
                  @
                </span>

                <input
                  id="username"
                  type="text"
                  formControlName="username"
                  placeholder="Tu nombre de usuario"
                  autocomplete="username"
                />

              </div>

            </div>

            <div class="field">

              <div class="password-label">

                <label for="password">
                  Contraseña
                </label>

                <span>
                  JWT Protected
                </span>

              </div>

              <div class="input-wrapper">

                <span class="input-icon">
                  *
                </span>

                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  placeholder="Tu contraseña"
                  autocomplete="current-password"
                />

              </div>

            </div>

            @if (errorMessage) {

              <div class="error-message">
                <span>!</span>

                <p>
                  {{ errorMessage }}
                </p>
              </div>

            }

            <button
              class="login-button"
              type="submit"
              [disabled]="form.invalid || loading"
            >

              @if (!loading) {
                <span>Iniciar sesión</span>
                <span class="arrow">→</span>
              }

              @if (loading) {
                <span class="spinner"></span>
                <span>Autenticando...</span>
              }

            </button>

          </form>

          <div class="security-info">

            <div class="security-icon">
              ✓
            </div>

            <div>
              <strong>Conexión protegida</strong>
              <span>Autenticación mediante JWT</span>
            </div>

          </div>

        </div>

        <p class="footer-text">
          Sistema de gestión seguro
        </p>

      </section>

    </main>
  `,

  styles: [`

    .login-page {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      overflow: hidden;
    }

    .background-glow {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
    }

    .glow-one {
      background: rgba(92, 76, 255, 0.13);
      top: -220px;
      left: -180px;
    }

    .glow-two {
      background: rgba(0, 200, 255, 0.08);
      bottom: -250px;
      right: -150px;
    }

    .login-container {
      width: 100%;
      max-width: 430px;
      position: relative;
      z-index: 1;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      justify-content: center;
      margin-bottom: 28px;
    }

    .brand-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 20px;
      font-weight: 800;

      background: linear-gradient(
        135deg,
        #6d5dfc,
        #4d3ff0
      );

      box-shadow:
        0 10px 30px rgba(89, 70, 255, 0.35);
    }

    .brand-name {
      display: block;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .brand-subtitle {
      display: block;
      margin-top: 2px;
      color: #72798a;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .login-card {
      padding: 38px;
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 22px;

      background: rgba(17, 20, 28, 0.82);

      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);

      box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.035);
    }

    .card-header {
      margin-bottom: 30px;
    }

    .eyebrow {
      display: inline-block;
      margin-bottom: 10px;

      color: #7568ff;

      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.13em;
    }

    h1 {
      margin: 0;
      font-size: 30px;
      line-height: 1.1;
      letter-spacing: -0.04em;
    }

    .card-header p {
      margin: 10px 0 0;

      color: #7f8799;
      font-size: 14px;
      line-height: 1.6;
    }

    form {
      display: grid;
      gap: 20px;
    }

    .field {
      display: grid;
      gap: 9px;
    }

    label {
      color: #d9dce5;
      font-size: 12px;
      font-weight: 600;
    }

    .password-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .password-label span {
      color: #5d6474;
      font-size: 10px;
      font-weight: 600;
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);

      color: #636b7d;
      font-size: 14px;
      font-weight: 700;

      pointer-events: none;
    }

    input {
      width: 100%;
      height: 48px;

      padding: 0 15px 0 42px;

      border: 1px solid #292e3a;
      border-radius: 11px;

      outline: none;

      background: #0d1016;
      color: #f4f5f8;

      font-size: 13px;

      transition:
        border-color 0.2s,
        box-shadow 0.2s,
        background 0.2s;
    }

    input::placeholder {
      color: #4e5565;
    }

    input:focus {
      border-color: #6658ed;

      background: #10131b;

      box-shadow:
        0 0 0 3px rgba(102, 88, 237, 0.12);
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 10px;

      padding: 11px 13px;

      border: 1px solid rgba(255, 80, 80, 0.18);
      border-radius: 10px;

      background: rgba(255, 60, 60, 0.07);
    }

    .error-message span {
      width: 20px;
      height: 20px;

      display: grid;
      place-items: center;

      border-radius: 50%;

      background: rgba(255, 70, 70, 0.15);
      color: #ff7474;

      font-size: 11px;
      font-weight: 800;
    }

    .error-message p {
      margin: 0;
      color: #ff8c8c;
      font-size: 11px;
    }

    .login-button {
      width: 100%;
      height: 49px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;

      border: 0;
      border-radius: 11px;

      background: linear-gradient(
        135deg,
        #6b5dfc,
        #5445ed
      );

      color: white;

      font-size: 13px;
      font-weight: 700;

      box-shadow:
        0 10px 25px rgba(91, 73, 244, 0.22);

      transition:
        transform 0.2s,
        box-shadow 0.2s,
        opacity 0.2s;
    }

    .login-button:hover:not(:disabled) {
      transform: translateY(-1px);

      box-shadow:
        0 14px 30px rgba(91, 73, 244, 0.3);
    }

    .login-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .login-button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      box-shadow: none;
    }

    .arrow {
      font-size: 17px;
      transition: transform 0.2s;
    }

    .login-button:hover:not(:disabled) .arrow {
      transform: translateX(3px);
    }

    .spinner {
      width: 15px;
      height: 15px;

      border: 2px solid rgba(255, 255, 255, 0.35);
      border-top-color: white;

      border-radius: 50%;

      animation: spin 0.7s linear infinite;
    }

    .security-info {
      display: flex;
      align-items: center;
      gap: 11px;

      margin-top: 25px;
      padding-top: 20px;

      border-top: 1px solid #222631;
    }

    .security-icon {
      width: 30px;
      height: 30px;

      display: grid;
      place-items: center;

      border-radius: 8px;

      background: rgba(65, 210, 140, 0.08);
      color: #52d99a;

      font-size: 13px;
      font-weight: 800;
    }

    .security-info strong,
    .security-info span {
      display: block;
    }

    .security-info strong {
      color: #cdd1db;
      font-size: 11px;
    }

    .security-info span {
      margin-top: 2px;
      color: #656d7d;
      font-size: 10px;
    }

    .footer-text {
      margin: 22px 0 0;

      text-align: center;

      color: #454c5b;
      font-size: 10px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 480px) {

      .login-page {
        padding: 25px 16px;
      }

      .login-card {
        padding: 27px 22px;
        border-radius: 18px;
      }

      h1 {
        font-size: 27px;
      }

    }

  `]
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;
  errorMessage = '';

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.form.getRawValue()).subscribe({

      next: () => {
        this.router.navigateByUrl('/dashboard');
      },

      error: (error) => {

        this.loading = false;

        this.errorMessage =
          error?.error?.message ??
          'No fue posible iniciar sesión.';

      }

    });
  }
}