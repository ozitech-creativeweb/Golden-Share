import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { TimercheckService } from '../../../data/services/user/timercheck.service';

@Component({
  selector: 'app-count-down-string',
  templateUrl: './count-down-string.component.html',
  styleUrls: ['./count-down-string.component.scss']
})
export class CountDownStringComponent implements OnInit, AfterViewInit, OnDestroy {
  small;
  big;
  resEvent;

  days;
  hours;
  minutes;
  seconds;

  intervalVar;

  @Input() startH;
  @Input() endH;

  // startH = '14 : 03';
  // endH = '14:04';



  constructor(
    private timecheckService: TimercheckService,
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    let me = this;
    window.removeEventListener('resize', me.resEvent);
  }

  ngAfterViewInit() {
    // console.log(this.countFrom);

    let countDown = document.querySelector('.countDown');
    this.small = countDown.querySelectorAll('.small');
    this.big = countDown.querySelectorAll('.big');
    let parwidth = +getComputedStyle(countDown).width.replace('px', '');
    this.responsive(parwidth);
    let me = this;
    this.resEvent = resize;
    window.addEventListener('resize', resize);
    function resize() {
      let countDown = document.querySelector('.countDown');
      let parwidth = +getComputedStyle(countDown).width.replace('px', '');
      me.responsive(parwidth);
    }
    this.startInterval();
  }

  responsive(pwidth) {
    let bigf = (40 * pwidth) / 350;
    let smallf = (25 * pwidth) / 350;
    for (let i = 0; i < this.small.length; i++) {
      this.small[i.toString()].style.fontSize = (smallf > 25 ? 25 : smallf) + "px";
      this.big[i.toString()].style.fontSize = (bigf > 40 ? 40 : bigf) + "px";
    }
    // console.log(bigf);
  }



  startCount() {
    let present = new Date();
    let customDate;
    let convertedTArray = this.startH.split(':');
    let convertedH = +convertedTArray[0];
    let convertedM = +convertedTArray[1];

    let convertedTArrayEnd = this.endH.split(':');
    let convertedEH = +convertedTArrayEnd[0];
    let convertedEM = +convertedTArrayEnd[1];

    let startMS = new Date(present.getFullYear(), present.getMonth(), present.getDate(), convertedH, convertedM, 0);
    let endMSUnchanged = new Date(present.getFullYear(), present.getMonth(), present.getDate(), convertedEH, convertedEM, 0);

    if (present.getTime() < startMS.getTime()) {
      customDate = present.getDate();
    } else {
      customDate = present.getDate() + 1;
    }
    // console.log(present.getTime(), 'present');
    // console.log(endMSUnchanged.getTime(), 'endtime');
    // console.log(startMS.getTime(), 'starttime');
    // console.log(this.timecheckService.showTimeGetter);


    if (present.getTime() < endMSUnchanged.getTime() && present.getTime() > startMS.getTime()) {
      this.timecheckService.showTime = false;
    } else {
      this.timecheckService.showTime = true;
    }



    

    let emdMS = new Date(present.getFullYear(), present.getMonth(), customDate, convertedEH, convertedEM, 0).getTime();


    let countTo = new Date(present.getFullYear(), present.getMonth(), customDate, convertedH, convertedM, 0)


    // console.log(countTo);
    let distance = countTo.getTime() - present.getTime();
    // console.log(distance);
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

      this.timecheckService.showTime = false;
      
      // clearInterval(this.intervalVar);
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
