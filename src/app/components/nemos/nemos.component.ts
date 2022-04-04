import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { Nemo } from 'src/app/interfaces/nemo.interface';
import { NemoserviceService } from '../../services/nemoservice.service';

@Component({
  selector: 'app-nemos',
  templateUrl: './nemos.component.html',
  styleUrls: ['./nemos.component.css']
})
export class NemosComponent implements OnInit {

  nemos!:Nemo[];
  @Output() nemoOption = new EventEmitter<string>();
  constructor(private nemoSrv: NemoserviceService) { }

  ngOnInit(): void {
    this.nemoSrv.getNemos().pipe(
      tap( (nemos: Nemo[]) => this.nemos = nemos)
    ).subscribe();
  }

  changeNemo(nemoChange: string): void{
    this.nemoOption.emit(nemoChange);
  }
  
}
