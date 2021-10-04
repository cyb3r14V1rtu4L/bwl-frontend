import * as moment from 'moment';
export class Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[] = [];
}

export class UsuarioNew {
  id: number;
  password_repeat: string;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  createAt: Date;
  enabled: boolean;
  roles: string[] = [];
}
