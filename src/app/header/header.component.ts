import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = 'Dashboard';

  constructor(public authService: AuthService, private router: Router) { }
  logout(): void {
    const username = this.authService.usuario.username;
    this.authService.logout();
    swal('Cerrar Sesión', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }
}
