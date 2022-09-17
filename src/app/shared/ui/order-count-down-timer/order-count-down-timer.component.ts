import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-count-down-timer',
  templateUrl: './order-count-down-timer.component.html',
  styleUrls: ['./order-count-down-timer.component.scss']
})
export class OrderCountDownTimerComponent implements OnInit {
  @Input() order: any;

  constructor() {}

  ngOnInit() {}

  convDate(date) {
    return new Date(date);
  }
}
