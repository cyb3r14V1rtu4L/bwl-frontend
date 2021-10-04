import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_BACKEND} from '../config/config';
import {map, tap} from 'rxjs/operators';
import { Task } from './task';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private urlEndPoint: string = URL_BACKEND + '/api/tasks';
  constructor(private httpClient: HttpClient) { }

  getTasks(status: boolean): Observable<any> {
    return this.httpClient.get(
      `${this.urlEndPoint}/status/${status}`
    );
  }
}
