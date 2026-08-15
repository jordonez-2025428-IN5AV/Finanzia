import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../../core/models/auth.models';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="admin-page">

      <!-- Background -->
      <div class="background-glow glow-one"></div>
      <div class="background-glow glow-two"></div>
      <div class="background-grid"></div>

      <!-- Main container -->
      <section class="admin-container">

        <!-- Header -->
        <header class="admin-header">

          <div class="header-left">

            <div class="brand-icon">
              F
            </div>

            <div>
              <span class="brand-name">
                Finanzia
              </span>

              <span class="brand-section">
                Panel de administración
              </span>
            </div>

          </div>

          <button
            class="logout-button"
            (click)="logout()"
          >
            <span class="logout-icon">↪</span>
            Cerrar sesión
          </button>

        </header>


        <!-- Hero -->
        <section class="hero">

          <div class="hero-content">

            <span class="eyebrow">
              ADMINISTRACIÓN
            </span>

            <h1>
              Control de usuarios
            </h1>

            <p>
              Administra los usuarios registrados y supervisa
              sus niveles de acceso dentro de Finanzia.
            </p>

          </div>

          <div class="admin-status">

            <span class="status-dot"></span>

            <div>
              <strong>
                Acceso autorizado
              </strong>

              <span>
                Rol ADMIN
              </span>
            </div>

          </div>

        </section>


        <!-- Statistics -->
        <section class="stats-grid">

          <article class="stat-card">

            <div class="stat-icon purple">
              ◉
            </div>

            <div>
              <span class="stat-label">
                USUARIOS
              </span>

              <strong>
                {{ users.length }}
              </strong>

              <small>
                Cuentas registradas
              </small>
            </div>

          </article>


          <article class="stat-card">

            <div class="stat-icon blue">
              ◆
            </div>

            <div>
              <span class="stat-label">
                ADMINISTRACIÓN
              </span>

              <strong>
                {{ adminCount }}
              </strong>

              <small>
                Administradores
              </small>
            </div>

          </article>


          <article class="stat-card">

            <div class="stat-icon green">
              ✓
            </div>

            <div>
              <span class="stat-label">
                USUARIOS
              </span>

              <strong>
                {{ normalUserCount }}
              </strong>

              <small>
                Acceso estándar
              </small>
            </div>

          </article>

        </section>


        <!-- Users -->
        <section class="users-card">

          <div class="card-header">

            <div>
              <span class="section-label">
                GESTIÓN
              </span>

              <h2>
                Usuarios registrados
              </h2>

              <p>
                Usuarios disponibles en el sistema.
              </p>
            </div>

            <div class="user-count">
              {{ users.length }}
              <span>
                registros
              </span>
            </div>

          </div>


          <!-- Loading -->
          <div
            class="loading-state"
            *ngIf="users.length === 0"
          >

            <div class="loader"></div>

            <span>
              Cargando usuarios...
            </span>

          </div>


          <!-- Table -->
          <div
            class="table-wrapper"
            *ngIf="users.length"
          >

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>USUARIO</th>
                  <th>ROL</th>
                  <th>ESTADO</th>
                </tr>

              </thead>

              <tbody>

                <tr
                  *ngFor="let u of users"
                >

                  <td>
                    <span class="user-id">
                      #{{ u.id }}
                    </span>
                  </td>


                  <td>

                    <div class="user-cell">

                      <div class="avatar">
                        {{ u.username.charAt(0).toUpperCase() }}
                      </div>

                      <div>
                        <strong>
                          {{ u.username }}
                        </strong>

                        <span>
                          Cuenta registrada
                        </span>
                      </div>

                    </div>

                  </td>


                  <td>

                    <span
                      class="role-badge"
                      [class.admin-role]="u.role === 'ADMIN'"
                      [class.user-role]="u.role !== 'ADMIN'"
                    >

                      <span class="role-dot"></span>

                      {{ u.role }}

                    </span>

                  </td>


                  <td>

                    <span class="status-badge">

                      <span class="status-indicator"></span>

                      Activo

                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>


          <!-- Empty state -->
          <div
            class="empty-state"
            *ngIf="users.length === 0"
          >

            <div class="empty-icon">
              ◇
            </div>

            <strong>
              No hay usuarios registrados
            </strong>

            <span>
              No se encontraron cuentas en el sistema.
            </span>

          </div>

        </section>


        <!-- Security -->
        <section class="security-card">

          <div class="security-left">

            <div class="security-icon">
              ✓
            </div>

            <div>

              <span class="section-label">
                SEGURIDAD
              </span>

              <h3>
                Área protegida
              </h3>

              <p>
                Esta sección está protegida mediante autenticación
                JWT y autorización basada en roles.
              </p>

            </div>

          </div>

          <div class="security-tags">

            <span>
              JWT
            </span>

            <span>
              ADMIN
            </span>

            <span>
              BCRYPT
            </span>

          </div>

        </section>


        <!-- Footer -->
        <footer>
          Finanzia · Panel de administración
        </footer>

      </section>

    </main>
  `,

  styles: [`

    /* =========================================
       BASE
       ========================================= */

    :host {
      display: block;
      min-height: 100vh;

      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    .admin-page {
      min-height: 100vh;

      position: relative;

      overflow: hidden;

      padding: 32px;

      background:
        radial-gradient(
          circle at 15% 0%,
          rgba(108, 92, 255, .12),
          transparent 32%
        ),
        radial-gradient(
          circle at 100% 100%,
          rgba(30, 150, 255, .06),
          transparent 30%
        ),
        #07090d;

      color: #e7e9ef;
    }


    /* =========================================
       BACKGROUND
       ========================================= */

    .background-glow {
      position: fixed;

      width: 500px;
      height: 500px;

      border-radius: 50%;

      filter: blur(140px);

      pointer-events: none;

      opacity: .35;
    }

    .glow-one {
      top: -300px;
      left: 150px;

      background: rgba(100, 82, 255, .16);
    }

    .glow-two {
      right: -300px;
      bottom: -300px;

      background: rgba(30, 130, 255, .08);
    }

    .background-grid {
      position: fixed;
      inset: 0;

      pointer-events: none;

      opacity: .15;

      background-image:
        linear-gradient(
          rgba(255,255,255,.025) 1px,
          transparent 1px
        ),
        linear-gradient(
          90deg,
          rgba(255,255,255,.025) 1px,
          transparent 1px
        );

      background-size: 55px 55px;

      mask-image:
        linear-gradient(
          to bottom,
          black,
          transparent 85%
        );
    }


    /* =========================================
       CONTAINER
       ========================================= */

    .admin-container {
      width: 100%;
      max-width: 1180px;

      margin: 0 auto;

      position: relative;
      z-index: 1;
    }


    /* =========================================
       HEADER
       ========================================= */

    .admin-header {
      min-height: 58px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding-bottom: 26px;

      border-bottom:
        1px solid rgba(255,255,255,.055);
    }

    .header-left {
      display: flex;
      align-items: center;

      gap: 11px;
    }

    .brand-icon {
      width: 38px;
      height: 38px;

      display: grid;
      place-items: center;

      border-radius: 11px;

      background:
        linear-gradient(
          135deg,
          #7668ff,
          #4e40d9
        );

      color: white;

      font-size: 16px;
      font-weight: 850;

      box-shadow:
        0 10px 30px rgba(93,75,255,.25);
    }

    .brand-name {
      display: block;

      color: #f1f2f6;

      font-size: 14px;
      font-weight: 800;
    }

    .brand-section {
      display: block;

      margin-top: 2px;

      color: #555d6c;

      font-size: 8px;
      font-weight: 700;

      letter-spacing: .09em;

      text-transform: uppercase;
    }


    /* =========================================
       LOGOUT
       ========================================= */

    .logout-button {
      height: 36px;

      display: flex;
      align-items: center;

      gap: 8px;

      padding: 0 13px;

      border:
        1px solid #292f3a;

      border-radius: 9px;

      background:
        rgba(255,255,255,.02);

      color: #858d9d;

      font-size: 9px;
      font-weight: 650;

      cursor: pointer;

      transition: .2s ease;
    }

    .logout-button:hover {
      border-color:
        rgba(255,80,80,.25);

      background:
        rgba(255,70,70,.05);

      color: #ff8585;
    }

    .logout-icon {
      font-size: 14px;
    }


    /* =========================================
       HERO
       ========================================= */

    .hero {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      gap: 30px;

      padding: 42px 0 30px;
    }

    .eyebrow {
      display: block;

      margin-bottom: 8px;

      color: #7669ff;

      font-size: 8px;
      font-weight: 850;

      letter-spacing: .16em;
    }

    h1 {
      margin: 0;

      color: #f4f5f8;

      font-size: 32px;
      font-weight: 760;

      line-height: 1;

      letter-spacing: -.05em;
    }

    .hero-content p {
      max-width: 550px;

      margin: 11px 0 0;

      color: #626a7a;

      font-size: 10px;

      line-height: 1.6;
    }

    .admin-status {
      display: flex;
      align-items: center;

      gap: 9px;

      padding: 10px 13px;

      border:
        1px solid rgba(64,210,145,.10);

      border-radius: 11px;

      background:
        rgba(64,210,145,.035);
    }

    .status-dot {
      width: 7px;
      height: 7px;

      border-radius: 50%;

      background: #4dd99a;

      box-shadow:
        0 0 12px rgba(77,217,154,.55);
    }

    .admin-status strong,
    .admin-status span {
      display: block;
    }

    .admin-status strong {
      color: #d7dbe3;

      font-size: 9px;
    }

    .admin-status span {
      margin-top: 2px;

      color: #596171;

      font-size: 8px;
    }


    /* =========================================
       STATISTICS
       ========================================= */

    .stats-grid {
      display: grid;

      grid-template-columns:
        repeat(3, 1fr);

      gap: 13px;

      margin-bottom: 14px;
    }

    .stat-card {
      min-height: 105px;

      display: flex;
      align-items: center;

      gap: 14px;

      padding: 19px;

      position: relative;

      overflow: hidden;

      border:
        1px solid rgba(255,255,255,.055);

      border-radius: 14px;

      background:
        linear-gradient(
          145deg,
          rgba(19,22,30,.95),
          rgba(12,15,21,.94)
        );

      box-shadow:
        0 15px 45px rgba(0,0,0,.12);

      transition:
        transform .2s ease,
        border-color .2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);

      border-color:
        rgba(255,255,255,.09);
    }

    .stat-icon {
      width: 43px;
      height: 43px;

      display: grid;
      place-items: center;

      flex-shrink: 0;

      border-radius: 11px;

      font-size: 13px;
      font-weight: 800;
    }

    .stat-icon.purple {
      background: rgba(109,93,252,.10);
      color: #8377ff;
    }

    .stat-icon.blue {
      background: rgba(70,150,255,.09);
      color: #69aaff;
    }

    .stat-icon.green {
      background: rgba(64,210,145,.08);
      color: #57da9b;
    }

    .stat-label {
      display: block;

      color: #535b69;

      font-size: 7px;
      font-weight: 850;

      letter-spacing: .13em;
    }

    .stat-card strong {
      display: block;

      margin-top: 4px;

      color: #e5e7ec;

      font-size: 20px;
      font-weight: 750;

      letter-spacing: -.04em;
    }

    .stat-card small {
      display: block;

      margin-top: 2px;

      color: #5c6474;

      font-size: 8px;
    }


    /* =========================================
       USERS CARD
       ========================================= */

    .users-card {
      overflow: hidden;

      border:
        1px solid rgba(255,255,255,.055);

      border-radius: 15px;

      background:
        linear-gradient(
          145deg,
          rgba(18,21,29,.96),
          rgba(11,14,20,.95)
        );

      box-shadow:
        0 20px 60px rgba(0,0,0,.14);
    }

    .card-header {
      min-height: 82px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 20px 23px;

      border-bottom:
        1px solid rgba(255,255,255,.05);
    }

    .section-label {
      display: block;

      margin-bottom: 6px;

      color: #7568ff;

      font-size: 7px;
      font-weight: 850;

      letter-spacing: .14em;
    }

    .card-header h2 {
      margin: 0;

      color: #e7e9ef;

      font-size: 14px;
      font-weight: 700;

      letter-spacing: -.025em;
    }

    .card-header p {
      margin: 4px 0 0;

      color: #596171;

      font-size: 8px;
    }

    .user-count {
      padding: 8px 11px;

      border:
        1px solid rgba(255,255,255,.055);

      border-radius: 8px;

      background:
        rgba(255,255,255,.025);

      color: #d7dae1;

      font-size: 11px;
      font-weight: 700;
    }

    .user-count span {
      color: #5d6575;

      font-size: 8px;
      font-weight: 500;
    }


    /* =========================================
       TABLE
       ========================================= */

    .table-wrapper {
      width: 100%;

      overflow-x: auto;
    }

    table {
      width: 100%;

      min-width: 620px;

      border-collapse: collapse;
    }

    th {
      height: 43px;

      padding: 0 23px;

      border-bottom:
        1px solid rgba(255,255,255,.045);

      color: #4f5766;

      font-size: 7px;
      font-weight: 850;

      text-align: left;

      letter-spacing: .12em;
    }

    td {
      height: 69px;

      padding: 0 23px;

      border-bottom:
        1px solid rgba(255,255,255,.032);
    }

    tbody tr {
      transition:
        background .15s ease;
    }

    tbody tr:hover {
      background:
        rgba(255,255,255,.018);
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    .user-id {
      color: #697181;

      font-family:
        ui-monospace,
        SFMono-Regular,
        Menlo,
        Monaco,
        Consolas,
        monospace;

      font-size: 9px;
    }

    .user-cell {
      display: flex;
      align-items: center;

      gap: 11px;
    }

    .avatar {
      width: 35px;
      height: 35px;

      display: grid;
      place-items: center;

      flex-shrink: 0;

      border:
        1px solid rgba(109,93,252,.13);

      border-radius: 10px;

      background:
        linear-gradient(
          145deg,
          rgba(109,93,252,.14),
          rgba(109,93,252,.05)
        );

      color: #8276ff;

      font-size: 10px;
      font-weight: 800;
    }

    .user-cell strong,
    .user-cell span {
      display: block;
    }

    .user-cell strong {
      color: #d8dbe2;

      font-size: 10px;
      font-weight: 650;
    }

    .user-cell span {
      margin-top: 3px;

      color: #555e6d;

      font-size: 8px;
    }


    /* =========================================
       ROLE
       ========================================= */

    .role-badge {
      display: inline-flex;
      align-items: center;

      gap: 6px;

      padding: 5px 8px;

      border-radius: 6px;

      font-size: 7px;
      font-weight: 800;
    }

    .role-badge.admin-role {
      background:
        rgba(109,93,252,.11);

      color: #8d81ff;
    }

    .role-badge.user-role {
      background:
        rgba(70,150,255,.08);

      color: #6caaff;
    }

    .role-dot {
      width: 5px;
      height: 5px;

      border-radius: 50%;

      background: currentColor;
    }


    /* =========================================
       STATUS
       ========================================= */

    .status-badge {
      display: inline-flex;
      align-items: center;

      gap: 6px;

      padding: 5px 8px;

      border-radius: 6px;

      background:
        rgba(64,210,145,.06);

      color: #55d99a;

      font-size: 7px;
      font-weight: 800;
    }

    .status-indicator {
      width: 5px;
      height: 5px;

      border-radius: 50%;

      background: #55d99a;

      box-shadow:
        0 0 8px rgba(85,216,154,.55);
    }


    /* =========================================
       LOADING
       ========================================= */

    .loading-state {
      min-height: 250px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-direction: column;

      gap: 12px;

      color: #626a7a;

      font-size: 9px;
    }

    .loader {
      width: 27px;
      height: 27px;

      border:
        2px solid #292f3b;

      border-top-color:
        #7062fc;

      border-radius: 50%;

      animation:
        spin .7s linear infinite;
    }


    /* =========================================
       EMPTY STATE
       ========================================= */

    .empty-state {
      min-height: 220px;

      display: flex;
      align-items: center;
      justify-content: center;

      flex-direction: column;

      text-align: center;
    }

    .empty-icon {
      margin-bottom: 9px;

      color: #555e6d;

      font-size: 23px;
    }

    .empty-state strong {
      color: #c8ccd5;

      font-size: 10px;
    }

    .empty-state span {
      margin-top: 4px;

      color: #596171;

      font-size: 8px;
    }


    /* =========================================
       SECURITY
       ========================================= */

    .security-card {
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 25px;

      margin-top: 14px;

      padding: 20px 23px;

      border:
        1px solid rgba(64,210,145,.08);

      border-radius: 14px;

      background:
        linear-gradient(
          100deg,
          rgba(64,210,145,.035),
          rgba(15,18,25,.86)
        );
    }

    .security-left {
      display: flex;
      align-items: center;

      gap: 13px;
    }

    .security-icon {
      width: 39px;
      height: 39px;

      display: grid;
      place-items: center;

      flex-shrink: 0;

      border-radius: 11px;

      background:
        rgba(64,210,145,.08);

      color: #55d99a;

      font-size: 13px;
      font-weight: 800;
    }

    .security-card h3 {
      margin: 0;

      color: #dce0e7;

      font-size: 10px;
    }

    .security-card p {
      margin: 4px 0 0;

      color: #5b6474;

      font-size: 8px;
    }

    .security-tags {
      display: flex;

      gap: 7px;
    }

    .security-tags span {
      padding: 5px 8px;

      border:
        1px solid rgba(255,255,255,.05);

      border-radius: 6px;

      color: #5c6473;

      font-size: 7px;
      font-weight: 750;

      letter-spacing: .04em;
    }


    /* =========================================
       FOOTER
       ========================================= */

    footer {
      padding: 23px 0 3px;

      color: #3f4653;

      text-align: center;

      font-size: 8px;
    }


    /* =========================================
       ANIMATION
       ========================================= */

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }


    /* =========================================
       RESPONSIVE
       ========================================= */

    @media (max-width: 850px) {

      .admin-page {
        padding: 25px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

    }


    @media (max-width: 650px) {

      .admin-page {
        padding: 18px 14px;
      }

      .hero {
        align-items: flex-start;

        flex-direction: column;

        padding-top: 32px;
      }

      h1 {
        font-size: 27px;
      }

      .admin-status {
        width: 100%;
      }

      .security-card {
        align-items: flex-start;

        flex-direction: column;
      }

      .security-tags {
        flex-wrap: wrap;
      }

    }


    @media (max-width: 480px) {

      .admin-header {
        padding-bottom: 20px;
      }

      .brand-section {
        display: none;
      }

      .logout-button {
        padding: 0 10px;

        font-size: 8px;
      }

      .hero-content p {
        font-size: 9px;
      }

      .card-header {
        align-items: flex-start;

        flex-direction: column;

        gap: 12px;
      }

      .user-count {
        align-self: flex-start;
      }

    }

  `]
})
export class AdminComponent implements OnInit {

  private userService = inject(UserService);
  private auth = inject(AuthService);
  private router = inject(Router);

  users: User[] = [];

  get adminCount(): number {
    return this.users.filter(
      user => user.role === 'ADMIN'
    ).length;
  }

  get normalUserCount(): number {
    return this.users.filter(
      user => user.role !== 'ADMIN'
    ).length;
  }

  ngOnInit() {

    this.userService.getAllUsers().subscribe({

      next: users => {
        this.users = users;
      },

      error: error => {

        if (
          error.status === 401 ||
          error.status === 403
        ) {
          this.router.navigateByUrl('/dashboard');
        }

      }

    });

  }

  logout() {

    this.auth.logout();

    this.router.navigateByUrl('/login');

  }

}