import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { User } from '../../core/models/auth.models';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="dashboard">

      <!-- Fondo decorativo -->
      <div class="background-glow glow-one"></div>
      <div class="background-glow glow-two"></div>

      <!-- Sidebar -->
      <aside class="sidebar">

        <div class="sidebar-top">

          <div class="brand">

            <div class="brand-icon">
              F
            </div>

            <div>
              <span class="brand-name">Finanzia</span>
              <span class="brand-subtitle">Workspace</span>
            </div>

          </div>

          <nav>

            <span class="nav-title">
              GENERAL
            </span>

            <a
              class="nav-item active"
              routerLink="/dashboard"
            >
              <span class="nav-icon">⌂</span>
              Dashboard
            </a>

            @if (user?.role === 'ADMIN') {

              <span class="nav-title admin-title">
                ADMINISTRACIÓN
              </span>

              <a
                class="nav-item"
                routerLink="/admin"
              >
                <span class="nav-icon">▦</span>
                Usuarios
              </a>

            }

          </nav>

        </div>

        <div class="sidebar-bottom">

          <div class="security-badge">

            <span class="security-dot"></span>

            <div>
              <strong>Sesión segura</strong>
              <span>JWT Authentication</span>
            </div>

          </div>

          <button
            class="logout-button"
            (click)="logout()"
          >
            <span>↪</span>
            Cerrar sesión
          </button>

        </div>

      </aside>

      <!-- Contenido principal -->
      <section class="content">

        <!-- Header -->
        <header class="topbar">

          <div>
            <p class="eyebrow">
              ESPACIO DE TRABAJO
            </p>

            <h1>
              Dashboard
            </h1>
          </div>

          <div
            class="user-menu"
            *ngIf="user as currentUser"
          >

            <div class="avatar">
              {{ currentUser.username.charAt(0).toUpperCase() }}
            </div>

            <div class="user-info">
              <strong>
                {{ currentUser.username }}
              </strong>

              <span>
                {{ currentUser.role }}
              </span>
            </div>

          </div>

        </header>

        <!-- Welcome -->
        <section class="welcome-card">

          <div class="welcome-content">

            <span class="welcome-label">
              CUENTA AUTENTICADA
            </span>

            <h2>
              Bienvenido,
              <span>{{ user?.username }}</span>
            </h2>

            <p>
              Tu sesión está activa y protegida mediante
              autenticación basada en JSON Web Tokens.
            </p>

          </div>

          <div class="welcome-decoration">
            <div class="orb orb-one"></div>
            <div class="orb orb-two"></div>
            <div class="orb orb-three"></div>
          </div>

        </section>

        <!-- Stats -->
        <section class="stats-grid">

          <article class="stat-card">

            <div class="stat-icon purple">
              ◉
            </div>

            <div>
              <span class="stat-label">
                ESTADO
              </span>

              <strong>
                Activo
              </strong>

              <small>
                Sesión válida
              </small>
            </div>

          </article>

          <article class="stat-card">

            <div class="stat-icon blue">
              ◈
            </div>

            <div>
              <span class="stat-label">
                ROL
              </span>

              <strong>
                {{ user?.role }}
              </strong>

              <small>
                Nivel de acceso
              </small>
            </div>

          </article>

          <article class="stat-card">

            <div class="stat-icon green">
              ✓
            </div>

            <div>
              <span class="stat-label">
                SEGURIDAD
              </span>

              <strong>
                Protegido
              </strong>

              <small>
                JWT + bcrypt
              </small>
            </div>

          </article>

        </section>

        <!-- Main grid -->
        <section class="main-grid">

          <!-- Profile -->
          <article class="panel profile-panel">

            <div class="panel-header">

              <div>
                <span class="panel-label">
                  INFORMACIÓN
                </span>

                <h3>
                  Perfil
                </h3>
              </div>

              <div class="panel-status">
                Activo
              </div>

            </div>

            <div class="profile-content">

              <div class="large-avatar">
                {{ user?.username?.charAt(0)?.toUpperCase() }}
              </div>

              <div class="profile-details">

                <div class="detail">
                  <span>Usuario</span>
                  <strong>
                    {{ user?.username }}
                  </strong>
                </div>

                <div class="detail">
                  <span>ID de usuario</span>
                  <strong>
                    #{{ user?.id }}
                  </strong>
                </div>

                <div class="detail">
                  <span>Rol</span>
                  <strong>
                    {{ user?.role }}
                  </strong>
                </div>

              </div>

            </div>

          </article>

          <!-- Quick actions -->
          <article class="panel actions-panel">

            <div class="panel-header">

              <div>
                <span class="panel-label">
                  ACCIONES
                </span>

                <h3>
                  Acceso rápido
                </h3>
              </div>

            </div>

            <div class="actions">

              @if (user?.role === 'ADMIN') {

                <a
                  class="action"
                  routerLink="/admin"
                >

                  <div class="action-icon">
                    ▦
                  </div>

                  <div>
                    <strong>
                      Administración
                    </strong>

                    <span>
                      Gestionar usuarios
                    </span>
                  </div>

                  <span class="action-arrow">
                    →
                  </span>

                </a>

              }

              <div class="action disabled">

                <div class="action-icon">
                  ◇
                </div>

                <div>
                  <strong>
                    Próximamente
                  </strong>

                  <span>
                    Módulos del sistema
                  </span>
                </div>

                <span class="coming-soon">
                  SOON
                </span>

              </div>

            </div>

          </article>

        </section>

        <!-- Security information -->
        <section class="security-panel">

          <div class="security-main">

            <div class="security-large-icon">
              ✓
            </div>

            <div>
              <span class="panel-label">
                SEGURIDAD
              </span>

              <h3>
                Tu cuenta está protegida
              </h3>

              <p>
                Las solicitudes privadas utilizan un token JWT
                firmado y validado por el servidor.
              </p>
            </div>

          </div>

          <div class="security-details">

            <span>
              JWT
            </span>

            <span>
              HTTPS Ready
            </span>

            <span>
              bcrypt
            </span>

          </div>

        </section>

        <footer>
          Finanzia · Sistema de gestión seguro
        </footer>

      </section>

    </main>
  `,

  styles: [`

    .dashboard {
      min-height: 100vh;
      display: flex;
      position: relative;
      overflow: hidden;
      background: #080a0f;
    }

    /* ==========================================
       BACKGROUND
       ========================================== */

    .background-glow {
      position: fixed;
      width: 550px;
      height: 550px;
      border-radius: 50%;
      filter: blur(130px);
      pointer-events: none;
      opacity: .7;
    }

    .glow-one {
      top: -300px;
      left: 250px;
      background: rgba(91, 72, 255, .09);
    }

    .glow-two {
      right: -300px;
      bottom: -250px;
      background: rgba(0, 200, 255, .06);
    }

    /* ==========================================
       SIDEBAR
       ========================================== */

    .sidebar {
      width: 250px;
      min-height: 100vh;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      padding: 25px 16px;

      border-right: 1px solid rgba(255,255,255,.06);

      background: rgba(10,12,18,.8);

      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);

      position: relative;
      z-index: 2;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;

      padding: 4px 9px 30px;
    }

    .brand-icon {
      width: 38px;
      height: 38px;

      display: grid;
      place-items: center;

      border-radius: 11px;

      background: linear-gradient(
        135deg,
        #6d5dfc,
        #4e40e9
      );

      color: white;

      font-size: 17px;
      font-weight: 800;

      box-shadow:
        0 10px 25px rgba(92,72,255,.25);
    }

    .brand-name {
      display: block;

      color: #f2f3f7;

      font-size: 15px;
      font-weight: 800;
    }

    .brand-subtitle {
      display: block;

      margin-top: 2px;

      color: #565d6d;

      font-size: 9px;
      font-weight: 700;

      text-transform: uppercase;
      letter-spacing: .1em;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .nav-title {
      margin: 10px 11px 7px;

      color: #4c5362;

      font-size: 9px;
      font-weight: 800;

      letter-spacing: .12em;
    }

    .admin-title {
      margin-top: 25px;
    }

    .nav-item {
      height: 42px;

      display: flex;
      align-items: center;
      gap: 12px;

      padding: 0 12px;

      border: 1px solid transparent;
      border-radius: 10px;

      color: #737b8d;

      text-decoration: none;

      font-size: 12px;
      font-weight: 600;

      transition: .2s ease;
    }

    .nav-item:hover {
      color: #dfe2eb;
      background: rgba(255,255,255,.035);
    }

    .nav-item.active {
      color: #fff;

      border-color: rgba(109,93,252,.14);

      background:
        linear-gradient(
          90deg,
          rgba(105,88,247,.14),
          rgba(105,88,247,.035)
        );
    }

    .nav-icon {
      width: 19px;

      text-align: center;

      color: #7d71ff;

      font-size: 14px;
    }

    .sidebar-bottom {
      display: grid;
      gap: 14px;
    }

    .security-badge {
      display: flex;
      align-items: center;
      gap: 9px;

      padding: 12px;

      border: 1px solid rgba(255,255,255,.05);
      border-radius: 11px;

      background: rgba(255,255,255,.025);
    }

    .security-dot {
      width: 7px;
      height: 7px;

      border-radius: 50%;

      background: #45d899;

      box-shadow:
        0 0 12px rgba(69,216,153,.5);
    }

    .security-badge strong,
    .security-badge span {
      display: block;
    }

    .security-badge strong {
      color: #c7cbd5;
      font-size: 10px;
    }

    .security-badge span {
      margin-top: 2px;
      color: #545c6b;
      font-size: 9px;
    }

    .logout-button {
      width: 100%;
      height: 39px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      border: 1px solid #252a35;
      border-radius: 9px;

      background: transparent;

      color: #777f90;

      font-size: 11px;
      font-weight: 600;

      transition: .2s ease;
    }

    .logout-button:hover {
      border-color: rgba(255,80,80,.25);

      background: rgba(255,70,70,.05);

      color: #ff8080;
    }

    /* ==========================================
       CONTENT
       ========================================== */

    .content {
      flex: 1;
      min-width: 0;

      padding: 34px 42px;

      position: relative;
      z-index: 1;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 28px;
    }

    .eyebrow,
    .panel-label {
      display: block;

      margin: 0 0 6px;

      color: #6659e9;

      font-size: 9px;
      font-weight: 800;

      letter-spacing: .13em;
    }

    h1 {
      margin: 0;

      color: #f4f5f8;

      font-size: 28px;
      line-height: 1;

      letter-spacing: -.04em;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 10px;

      padding: 7px 11px 7px 7px;

      border: 1px solid rgba(255,255,255,.06);
      border-radius: 12px;

      background: rgba(255,255,255,.025);
    }

    .avatar,
    .large-avatar {
      display: grid;
      place-items: center;

      border-radius: 10px;

      background:
        linear-gradient(
          135deg,
          #6657ed,
          #4235c5
        );

      color: white;

      font-weight: 800;
    }

    .avatar {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }

    .user-info strong,
    .user-info span {
      display: block;
    }

    .user-info strong {
      color: #dfe2e9;
      font-size: 10px;
    }

    .user-info span {
      margin-top: 2px;
      color: #626a7b;
      font-size: 9px;
    }

    /* ==========================================
       WELCOME CARD
       ========================================== */

    .welcome-card {
      min-height: 190px;

      position: relative;
      overflow: hidden;

      display: flex;
      align-items: center;

      padding: 34px;

      border: 1px solid rgba(255,255,255,.07);
      border-radius: 18px;

      background:
        linear-gradient(
          120deg,
          rgba(76,62,190,.16),
          rgba(18,21,30,.7) 60%
        );

      box-shadow:
        0 20px 50px rgba(0,0,0,.15);
    }

    .welcome-content {
      position: relative;
      z-index: 2;
      max-width: 570px;
    }

    .welcome-label {
      color: #8a80ff;

      font-size: 9px;
      font-weight: 800;

      letter-spacing: .12em;
    }

    .welcome-card h2 {
      margin: 9px 0 8px;

      color: #f4f5f8;

      font-size: 27px;
      letter-spacing: -.04em;
    }

    .welcome-card h2 span {
      color: #8074ff;
    }

    .welcome-card p {
      margin: 0;

      max-width: 500px;

      color: #737b8c;

      font-size: 12px;
      line-height: 1.7;
    }

    .welcome-decoration {
      position: absolute;

      width: 260px;
      height: 260px;

      right: 35px;
      top: -35px;
    }

    .orb {
      position: absolute;

      border-radius: 50%;

      filter: blur(1px);
    }

    .orb-one {
      width: 170px;
      height: 170px;

      right: 0;
      top: 30px;

      border: 1px solid rgba(125,112,255,.25);

      box-shadow:
        inset 0 0 50px rgba(100,80,255,.08),
        0 0 60px rgba(100,80,255,.08);
    }

    .orb-two {
      width: 90px;
      height: 90px;

      right: 70px;
      top: 75px;

      background: radial-gradient(
        circle,
        rgba(119,105,255,.25),
        transparent 70%
      );
    }

    .orb-three {
      width: 7px;
      height: 7px;

      right: 190px;
      top: 50px;

      background: #8074ff;

      box-shadow:
        0 0 20px #8074ff;
    }

    /* ==========================================
       STATS
       ========================================== */

    .stats-grid {
      display: grid;

      grid-template-columns:
        repeat(3, minmax(0, 1fr));

      gap: 14px;

      margin-top: 14px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 14px;

      padding: 20px;

      border: 1px solid rgba(255,255,255,.06);
      border-radius: 14px;

      background: rgba(15,18,25,.8);
    }

    .stat-icon {
      width: 40px;
      height: 40px;

      display: grid;
      place-items: center;

      border-radius: 11px;

      font-size: 14px;
      font-weight: 800;
    }

    .stat-icon.purple {
      background: rgba(109,93,252,.1);
      color: #8175ff;
    }

    .stat-icon.blue {
      background: rgba(70,150,255,.1);
      color: #66aaff;
    }

    .stat-icon.green {
      background: rgba(64,210,145,.09);
      color: #55d89a;
    }

    .stat-label {
      display: block;

      margin-bottom: 3px;

      color: #515968;

      font-size: 8px;
      font-weight: 800;

      letter-spacing: .1em;
    }

    .stat-card strong {
      display: block;

      color: #dfe2e9;

      font-size: 13px;
    }

    .stat-card small {
      display: block;

      margin-top: 3px;

      color: #596171;

      font-size: 9px;
    }

    /* ==========================================
       MAIN PANELS
       ========================================== */

    .main-grid {
      display: grid;

      grid-template-columns:
        minmax(0, 1.25fr)
        minmax(300px, .75fr);

      gap: 14px;

      margin-top: 14px;
    }

    .panel {
      border: 1px solid rgba(255,255,255,.06);
      border-radius: 15px;

      background: rgba(15,18,25,.8);
    }

    .profile-panel,
    .actions-panel {
      padding: 24px;
    }

    .panel-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      margin-bottom: 23px;
    }

    .panel-header h3 {
      margin: 0;

      color: #e7e9ef;

      font-size: 15px;
      letter-spacing: -.02em;
    }

    .panel-status {
      padding: 5px 9px;

      border-radius: 20px;

      background: rgba(64,210,145,.07);

      color: #55d89a;

      font-size: 8px;
      font-weight: 700;
    }

    .profile-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .large-avatar {
      width: 70px;
      height: 70px;

      flex-shrink: 0;

      border-radius: 18px;

      font-size: 23px;

      box-shadow:
        0 15px 35px rgba(75,60,220,.18);
    }

    .profile-details {
      display: grid;

      grid-template-columns:
        repeat(3, minmax(100px, 1fr));

      gap: 30px;

      width: 100%;
    }

    .detail span,
    .detail strong {
      display: block;
    }

    .detail span {
      margin-bottom: 6px;

      color: #535b6b;

      font-size: 9px;
      font-weight: 600;
    }

    .detail strong {
      color: #d7dae2;

      font-size: 11px;
    }

    /* ==========================================
       ACTIONS
       ========================================== */

    .actions {
      display: grid;
      gap: 8px;
    }

    .action {
      min-height: 57px;

      display: flex;
      align-items: center;
      gap: 12px;

      padding: 10px;

      border: 1px solid rgba(255,255,255,.05);
      border-radius: 11px;

      background: rgba(255,255,255,.018);

      text-decoration: none;

      transition: .2s ease;
    }

    .action:not(.disabled):hover {
      border-color: rgba(105,89,255,.2);

      background: rgba(105,89,255,.05);

      transform: translateX(2px);
    }

    .action-icon {
      width: 35px;
      height: 35px;

      display: grid;
      place-items: center;

      flex-shrink: 0;

      border-radius: 9px;

      background: rgba(105,89,255,.09);

      color: #8074ff;

      font-size: 12px;
    }

    .action strong,
    .action span {
      display: block;
    }

    .action strong {
      color: #d5d8e0;
      font-size: 10px;
    }

    .action div span {
      margin-top: 3px;
      color: #565e6e;
      font-size: 9px;
    }

    .action-arrow {
      margin-left: auto;

      color: #596171;

      font-size: 15px;
    }

    .coming-soon {
      margin-left: auto;

      color: #505766;

      font-size: 7px;
      font-weight: 800;

      letter-spacing: .08em;
    }

    .disabled {
      opacity: .55;
      cursor: default;
    }

    /* ==========================================
       SECURITY
       ========================================== */

    .security-panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;

      margin-top: 14px;
      padding: 20px 24px;

      border: 1px solid rgba(64,210,145,.08);
      border-radius: 14px;

      background:
        linear-gradient(
          90deg,
          rgba(64,210,145,.035),
          rgba(15,18,25,.8)
        );
    }

    .security-main {
      display: flex;
      align-items: center;
      gap: 13px;
    }

    .security-large-icon {
      width: 39px;
      height: 39px;

      display: grid;
      place-items: center;

      border-radius: 11px;

      background: rgba(64,210,145,.08);

      color: #55d89a;

      font-size: 14px;
      font-weight: 800;
    }

    .security-main h3 {
      margin: 0 0 3px;

      color: #dce0e7;

      font-size: 11px;
    }

    .security-main p {
      margin: 0;

      color: #596171;

      font-size: 9px;
    }

    .security-details {
      display: flex;
      gap: 7px;
    }

    .security-details span {
      padding: 5px 8px;

      border: 1px solid rgba(255,255,255,.05);
      border-radius: 6px;

      color: #596171;

      font-size: 8px;
      font-weight: 700;
    }

    footer {
      padding: 22px 0 4px;

      color: #3f4654;

      text-align: center;

      font-size: 9px;
    }

    /* ==========================================
       RESPONSIVE
       ========================================== */

    @media (max-width: 1050px) {

      .content {
        padding: 30px;
      }

      .sidebar {
        width: 220px;
      }

      .profile-details {
        gap: 15px;
      }

    }

    @media (max-width: 850px) {

      .sidebar {
        width: 70px;
        padding: 20px 10px;
      }

      .brand {
        justify-content: center;
        padding-left: 0;
        padding-right: 0;
      }

      .brand > div:last-child,
      .nav-title,
      .nav-item:not(.active)::after,
      .nav-item {
        font-size: 0;
      }

      .nav-item {
        justify-content: center;
        padding: 0;
      }

      .nav-icon {
        font-size: 15px;
      }

      .security-badge,
      .logout-button {
        justify-content: center;
      }

      .security-badge div,
      .logout-button {
        font-size: 0;
      }

      .logout-button span {
        font-size: 15px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .main-grid {
        grid-template-columns: 1fr;
      }

    }

    @media (max-width: 600px) {

      .sidebar {
        display: none;
      }

      .content {
        padding: 22px 16px;
      }

      .topbar {
        align-items: flex-start;
      }

      h1 {
        font-size: 24px;
      }

      .user-menu {
        display: none;
      }

      .welcome-card {
        min-height: 220px;
        padding: 25px;
      }

      .welcome-decoration {
        right: -70px;
        opacity: .5;
      }

      .welcome-card h2 {
        font-size: 23px;
      }

      .profile-content {
        align-items: flex-start;
        flex-direction: column;
      }

      .profile-details {
        grid-template-columns: 1fr 1fr;
        gap: 18px;
      }

      .security-panel {
        align-items: flex-start;
        flex-direction: column;
      }

      .security-details {
        flex-wrap: wrap;
      }

    }

  `]
})
export class DashboardComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  user: User | null = null;

  ngOnInit(): void {

    this.userService.getProfile().subscribe({

      next: (user) => {
        this.user = user;
      },

      error: () => {
        this.logout();
      }

    });

  }

  logout(): void {

    this.authService.logout();

    this.router.navigateByUrl('/login');

  }

}