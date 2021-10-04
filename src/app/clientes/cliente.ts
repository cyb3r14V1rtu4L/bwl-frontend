import { Region } from './region';
import DateTimeFormat = Intl.DateTimeFormat;
import * as moment from 'moment';
import DateTimeFormatPartTypes = Intl.DateTimeFormatPartTypes;

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  lastSignin: Date;
  email: string;
  foto: string;
  region: Region;
}
