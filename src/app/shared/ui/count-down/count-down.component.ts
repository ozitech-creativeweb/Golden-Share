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

  countDowns = [];

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
    let countDown = document.querySelectorAll('.countDown');
    for (let i = 0; i < countDown.length; i++) {
      this.countDowns.push(
        {
          small: countDown[i.toString()].querySelectorAll('.small'),
          big: countDown[i.toString()].querySelectorAll('.big')
        }
      );
      let parwidth = +getComputedStyle(countDown[i]).width.replace('px', '');
      this.responsive(parwidth, i);
    }
    // this.small = countDown.querySelectorAll('.small');
    // this.big = countDown.querySelectorAll('.big');

    let me = this;
    this.resEvent = resize;
    window.addEventListener('resize', resize);
    function resize() {
      let countDown = document.querySelectorAll('.countDown');
      for (let i = 0; i < countDown.length; i++) {
        let parwidth = +getComputedStyle(countDown[i]).width.replace('px', '');
        me.responsive(parwidth, i);
      }
    }
    this.startInterval();
  }

  responsive(pwidth, I) {
    let bigf = (40 * pwidth) / 350;
    let smallf = (25 * pwidth) / 350;
    for (let i = 0; i < this.countDowns[I].small.length; i++) {
      this.countDowns[I].small[i.toString()].style.fontSize = (smallf > 25 ? 25 : smallf) + "px";
      this.countDowns[I].big[i.toString()].style.fontSize = (bigf > 40 ? 40 : bigf) + "px";
    }
    // console.log(bigf);
  }

  startCount() {
    // let me = this;
    let present = new Date();
    let distance = this.countFrom.getTime() - present.getTime();
    // let actMo = Math.floor(distance/(1000 * 60 * 60 * 24 * 31));
    let actD = Math.floor(distance / (1000 * 60 * 60 * 24));
    let actH = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let actM = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let actS = Math.floor((distance % (1000 * 60)) / (1000));
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
