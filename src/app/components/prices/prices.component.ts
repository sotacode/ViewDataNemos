import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Price } from 'src/app/interfaces/price.interface';
import { tap } from 'rxjs';
import { PricesService } from '../../services/prices.service';


@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  @Input() nemoOption!:string;
  
  prices!:Price[];

  constructor(private pricesSrv: PricesService) {
  }

  ngOnInit(): void {
    this.pricesSrv.sendPricesObservable.subscribe(response => {
      this.prices = response;
    });
  }
}
