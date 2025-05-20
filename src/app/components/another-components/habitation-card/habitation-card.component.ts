import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-habitation-card',
  templateUrl: './habitation-card.component.html',
  styleUrls: ['./habitation-card.component.css']
})
export class HabitationCardComponent implements OnInit {
  @Input() imageSrc:string="";
  @Input() title:string="";
  @Input() description:string="";
  @Input() habitationPrice:string="";
  
  constructor() { }

  ngOnInit(): void {
  }

}
