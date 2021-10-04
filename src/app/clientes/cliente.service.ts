import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Region } from './region';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';

import { URL_BACKEND } from '../config/config';
import {Usuario} from '../usuarios/usuario';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = URL_BACKEND + '/api/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response => {
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }));
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.urlEndPoint, usuario)
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError(e => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }
}
