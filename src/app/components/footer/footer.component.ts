import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subsEmail: string;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  subscribe(): void {
    this.subsEmail = '';
    this.toastr.success('You are subscribed!', 'Congrads!');
  }

}
