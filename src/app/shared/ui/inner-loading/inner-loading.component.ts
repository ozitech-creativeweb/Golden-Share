import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inner-loading',
  templateUrl: './inner-loading.component.html',
  styleUrls: ['./inner-loading.component.scss']
})
export class InnerLoadingComponent implements OnInit {
  @Input() name: string;
  @Input() class: string;
  @Input() inlineSttyle: string;
  @Input() justSpinner = false;
  @Input() marginTo = true;
  @Input() color = true;

  constructor() { }

  ngOnInit() {
  }

}
