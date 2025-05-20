import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.css']
})
export class ServicesCardComponent implements OnInit {
  @Input() imageSrc:string="";
  @Input() title:string="";
  @Input() description:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
