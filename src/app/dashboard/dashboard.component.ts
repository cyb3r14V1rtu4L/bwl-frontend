import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { Observable } from 'rxjs';
import { URL_BACKEND } from '../config/config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { WeatherService} from '../services/weather-service.service';
import { TaskService} from '../services/task.service';
import swal from 'sweetalert2';
import {tap} from 'rxjs/operators';
import {Task} from '../services/task';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit, AfterViewInit {

  // Clima Datos
  climaIcon = '';
  tempC = '';
  condText = '';
  pais = new Pais();
  nombre = new FormControl('', [Validators.required]);
  sendDataWeather = false;
  hora: any;
  tz_id: any;
  now: any;

  // Tareas Datos
  tareasPendientes: any;
  tareasCompletadas: any;



  constructor(public weatherService: WeatherService, public taskService: TaskService) {

  }

  ngOnInit() {
    this.getWeather();
    this.getTasks(true);
    this.getTasks(false);
  }

  getWeather() {
    this.sendDataWeather = true;
    this.pais.nombre = (this.pais.nombre != null) ? this.pais.nombre : 'Mexico';
    this.weatherService.getWeatherFromApi(this.pais.nombre).subscribe(response => {
        this.climaIcon = response.current.condition.icon;
        this.tempC = response.current.temp_c;
        this.condText = response.current.condition.text;
        this.hora = response.location.localtime;
        this.tz_id = response.location.tz_id;
        this.pais.nombre = response.location.country;
        this.sendDataWeather = false;
        this.setRelojPais();
      }, err => {
        if (err.status === 400) {
          swal('Servicio Clima', 'Error al Consultar el Clima', 'error');
        }
      }
    );
  }

  getTasks(estatus: boolean) {
    this.taskService.getTasks(estatus).subscribe(response => {
      switch (estatus) {
        case true:
          this.tareasCompletadas = response;
          break;
        case false:
          this.tareasPendientes = response;
          break;
      }
    }, err => {
        if (err.status === 400) {
          swal('Tareas', 'Error al Consultar las Tareas', 'error');
        }
    });
  }

  setRelojPais() {
    const secs = 1;
    this.now = new Date(this.hora);
      this.hora = this.now;
      const seconds = this.now.getSeconds();
      this.now.setSeconds(seconds + secs);
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.setRelojPais();
    }, 1000);
  }
}

export class Pais {
  id: number;
  nombre: string;
}
