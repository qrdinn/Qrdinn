import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrls: ['./ordersuccess.component.css']
})
export class OrdersuccessComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
