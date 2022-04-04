import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'View';
  sendNemo!: string;
  getOptionNemo(nemoOption: any):void{
    console.log(nemoOption);
    this.sendNemo = nemoOption;
  }
}
