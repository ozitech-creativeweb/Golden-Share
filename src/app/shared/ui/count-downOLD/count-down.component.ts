import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, AfterViewInit, OnDestroy {
  small;
  big;
  resEvent;

  days;
  hours;
  minutes;
  seconds;

  intervalVar;

  @Input() countFrom;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    let me = this;
    window.removeEventListener('resize', me.resEvent);
  }

  ngAfterViewInit() {
    // console.log(this.countFrom);
    if (this.countFrom == undefined) {
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 1000);
      return;
    }
    let countDown = document.querySelector('.countDown');
    this.small = countDown.querySelectorAll('.small');
    this.big = countDown.querySelectorAll('.big');
    let parwidth = +getComputedStyle(countDown).width.replace('px','');
    this.responsive(parwidth);
    let me = this;
    this.resEvent = resize;
    window.addEventListener('resize', resize);
    function resize() {
      let countDown = document.querySelector('.countDown');
      let parwidth = +getComputedStyle(countDown).width.replace('px','');
      me.responsive(parwidth);
    }
    this.startInterval();
  }

  responsive(pwidth) {
    let bigf = (40 * pwidth)/350;
    let smallf = (25 * pwidth)/350;
    for (let i=0; i<this.small.length; i++) {
      this.small[i.toString()].style.fontSize = (smallf > 25 ? 25 : smallf) + "px";
      this.big[i.toString()].style.fontSize = (bigf > 40 ? 40 : bigf) + "px";
    }
    // console.log(bigf);
  }

  startCount() {
    // let me = this;
    let present = new Date();
    let distance = this.countFrom.getTime() - present.getTime();
    // let actMo = Math.floor(distance/(1000 * 60 * 60 * 24 * 31));
    let actD = Math.floor(distance / (1000 * 60 * 60 * 24));
    let actH = Math.floor((distance % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    let actM = Math.floor((distance % (1000 * 60 * 60))/(1000 * 60));
    let actS = Math.floor((distance % (1000 * 60))/(1000));
    this.days = actD;
    this.hours = actH;
    this.minutes = actM;
    this.seconds = actS;

    if (this.days <= 0 && this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0) {
      this.days = 0;
      this.hours = 0; 
      this.minutes = 0; 
      this.seconds = 0;
      clearInterval(this.intervalVar);
      return;
    }
  }

  get stopTimer() {
    if (this.days <= 0 && this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0) {
      return true;
    }
    return false;
  }

  startInterval() {
    let me = this;
    this.intervalVar = setInterval(start, 1000);
    function start() {
      me.startCount();
    }
  }

}
