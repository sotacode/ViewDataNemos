import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nemo } from '../interfaces/nemo.interface';

@Injectable({
  providedIn: 'root'
})
export class NemoserviceService {

  constructor(private http: HttpClient) { }

  
  getNemos():Observable<any>{
    return this.http.get<Nemo[]>('http://localhost:9090/api/symbols/');
  }


}
