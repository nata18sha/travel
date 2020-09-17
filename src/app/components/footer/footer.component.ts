import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subsEmail: string;

  constructor() { }

  ngOnInit(): void {
  }

  subscribe(): void {
    this.subsEmail = '';
    alert('Subscribed!');
  }

}
