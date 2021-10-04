import { Component, OnInit } from '@angular/core';
import {Usuario, UsuarioNew} from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from "@angular/forms";
import {ClienteService} from '../clientes/cliente.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo = 'Iniciar Sesión';
  usuario: Usuario;
  sendData = false;
  public cliente: UsuarioNew = new UsuarioNew();

  email = new FormControl('', [Validators.required, Validators.email]);
  _email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  _password = new FormControl('', [Validators.required]);
  __password = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required]);
  apellido = new FormControl('', [Validators.required]);
  errores: string[];

  constructor(private authService: AuthService,
              private clienteService: ClienteService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.sendData = true;
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      const usuario = this.authService.usuario;
      this.router.navigate(['/dashboard']);
      swal('Login', `Hola ${usuario.nombre} ${usuario.apellido}, has iniciado sesión con éxito!`, 'success');
      this.sendData = false;
    }, err => {
      if (err.status === 400) {
        swal('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }

  create(): void {
    if (this.cliente.password !== this.cliente.password_repeat) {
      swal('Error Registro', 'La contraseña no coincide', 'error');
    } else {
      const createAt = new Date();
      const salt = bcrypt.genSaltSync(10);
      this['cliente'].password = bcrypt.hashSync(this['cliente'].password_repeat, 10);
      this['cliente'].createAt = createAt;
      this['cliente'].enabled = true;
      this['cliente'].email = this['cliente'].username;
      this.clienteService.create(this.cliente)
        .subscribe(
          cliente => {
            this.router.navigate(['/login']);
            swal('Nuevo Usuario', `El usuario ${cliente.nombre} ha sido creado con éxito`, 'success');
            this.cliente = new UsuarioNew();
          },
          err => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );
    }
  }

  getErrorMessage(field: string) {
    let error: any;
    switch (field) {
      case 'email':
        if (this.email.hasError('required')) {
          return 'Debe ingresar un Correo Electrónico';
        }
        error = this.email.hasError('email') ? 'No es un correo válido' : '';
        break;
      case 'password':
        if (this.password.hasError('required')) {
          return 'Debe ingresar una contraseña';
        }
        error = this.email.hasError('password') ? 'Ingresar Contraseña' : '';
        break;
    }
    return  error;
  }

}
