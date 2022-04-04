import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Price } from '../interfaces/price.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  prices!: Price[];
  private sendPricesSubject = new Subject<Price[]>();
  sendPricesObservable = this.sendPricesSubject.asObservable();
  constructor(private http: HttpClient) { }

  getHistoricalNemo(nemo: string):Observable<any>{
    nemo = nemo !=undefined ? nemo : ''
    return this.http.get('http://localhost:9090/api/historical/'+ nemo);
  }
  updatePrices(prices: Price[]){
    this.prices = prices;
    this.sendPricesSubject.next(prices)
  }

}
