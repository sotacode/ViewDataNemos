import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { tap } from 'rxjs';
import { Price } from 'src/app/interfaces/price.interface';
import { NemoserviceService } from 'src/app/services/nemoservice.service';
import { PricesService } from '../../services/prices.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() nemoOption!:string;
  prices!:Price[];
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'Data' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart(this.nemoOption);
  }

  updateChart(data:string): void{
    this.pricesSrv.getHistoricalNemo(this.nemoOption).pipe(
      tap( (prices: Price[]) => this.prices = prices)
    ).subscribe( res => {
      let newData=[];
      let newLabels=[];
      for(let price of this.prices){
        newData.push(price.close)
        newLabels.push(price.date)
      }
      this.lineChartData.datasets[0].data=newData;
      this.lineChartData.labels=newLabels;

      this.chart?.update();
      this.pricesSrv.updatePrices(this.prices);
    })
    
  }
  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor(private pricesSrv: PricesService) { }

  ngOnInit(): void {
    this.pricesSrv.sendPricesObservable.subscribe(response => {
      this.prices = response;
    });
  }

}
