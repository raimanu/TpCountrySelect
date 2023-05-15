import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Pays } from '../pays.model';
import { Subscription, debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css']
})
export class CountrySelectorComponent implements AfterViewInit, OnDestroy{
  
  @ViewChild('input')
  inputValue!: ElementRef;

  pays: Array<Pays> = [
    {code: "FR", libelle: "France",},
    {code: "NC", libelle: "Nouvelle-Calédonie",},
    {code: "AN", libelle: "Angleterre",},
    {code: "VA", libelle: "Vanuatu",},
    {code: "TA", libelle: "Tahiti",},
    {code: "AL", libelle: "Alsace",},
    {code: "ALL", libelle: "Allemagne",}
  ]
  
  paysProposer: Array<Pays> = [];
  subscription!: Subscription;
  constructor() { }

  ngAfterViewInit() {
    this.subscription = fromEvent(this.inputValue.nativeElement, "keyup").pipe(
      map((x) => this.inputValue.nativeElement.value)).subscribe((x) => {
      if (x.trim().length == 0){
        this.paysProposer = [];
      } else {
        this.paysProposer = this.pays.filter((y) => y.libelle.toLowerCase().startsWith(x.toLowerCase()));
      }
    });
  }

  paysConcernee(ev: any){
    this.inputValue.nativeElement.value = ev.target.innerText;
  }

  focus(){
    if (this.inputValue.nativeElement.value.trim().length > 0){
      this.paysProposer = this.pays.filter((x) => x.libelle.toLowerCase().startsWith(this.inputValue.nativeElement.value.toLowerCase()));
    }
  }

  blur(){
    let selecteur = this;
    selecteur.paysProposer = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
