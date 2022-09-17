import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TestimonialService } from '../../../data/services/guest/testimonial.service';

@Component({
  selector: 'app-testmonial-carousel',
  templateUrl: './testmonial-carousel.component.html',
  styleUrls: ['./testmonial-carousel.component.scss']
})
export class TestmonialCarouselComponent implements OnInit, OnDestroy {

  once = 0;
  carouselCont;
  carouselItems;
  runCount = 0;
  carouselList;
  autoSlideVar;
  inc;
  resEvent;
  resizeRunCount = 0;
  checkResEvent;
  carouselItemsInit;

  size960;
  size720;
  size540;
  addListener;
  removeListener;

  noTestimony: any;

  constructor(
    private testimonialService: TestimonialService
  ) { }

  ngOnInit(): void {
    this.getAllTest();
    // this.carouselList = [
    //   {
    //     testimony: 'When replacing a multi-lined selection of text, the generated dummy text maintains the amount of lines. When replacing a selection. help agencies.',
    //     photo: 'assets/images/review/1.jpg',
    //     first_name: 'Austin Bishop',
    //   },
    //   {
    //     testimony: 'When replacing a multi-lined selection of text, the generated dummy text maintains the amount of lines. When replacing a selection. help agencies.',
    //     photo: 'assets/images/review/2.jpg',
    //     first_name: 'Alexander',

    //   },
    //   {
    //     testimony: 'When replacing a multi-lined selection of text, the generated dummy text maintains the amount of lines. When replacing a selection. help agencies.',
    //     photo: 'assets/images/review/3.jpg',
    //     first_name: 'Sebastian',

    //   },
    //   {
    //     testimony: 'When replacing a multi-lined selection of text, the generated dummy text maintains the amount of lines. When replacing a selection. help agencies.',
    //     photo: 'assets/images/review/4.jpg',
    //     first_name: 'Christopher',

    //   }
    // ];
    // this.checkSlideLength();
  }

  ngOnDestroy() {
    let me = this;
    clearInterval(me.autoSlideVar);
    window.removeEventListener('resize', me.resEvent);
    window.removeEventListener('resize', me.checkResEvent);
  }

  private getAllTest() {
    this.testimonialService.allTestimony().subscribe(res => {
      if (res) {
        this.carouselList = res;
        console.log(this.carouselList);
        this.checkSlideLength();
      } else {
        this.noTestimony = "No Testimony Available";
      }
    })
  }

  checkSlideLength() {
    const me = this;
    this.carouselCont = document.querySelector('.testimonial-carousel');
    this.carouselItems = this.carouselCont.querySelectorAll('.single-testi');
    this.size540 = size540;
    this.size720 = size720;
    this.size960 = size960;
    this.addListener = addListener;
    this.removeListener = removeListener;

    if (this.carouselItems.length === 0) {
      setTimeout(() => {
        this.checkSlideLength();
      }, 1000);
      return;
    }
    this.carouselItemsInit = this.carouselItems;
    this.checkResEvent = checkResize;
    const parentwidth = +getComputedStyle(this.carouselCont).width.replace('px', '');

    window.addEventListener('resize', checkResize);
    function checkResize() {
      if (me.resEvent == undefined) {
        me.actCheckSlideLength();
      } 
      // else {
      //   me.resEvent();
      // }
    }

    this.actCheckSlideLength();

    function addListener() {
      me.carouselCont.addEventListener('mouseover', stopAutoSlide);
      me.carouselCont.addEventListener('mouseout', autoSlide);
      me.carouselCont.addEventListener('mousedown', testiCarouselDrag);
      me.carouselCont.addEventListener('touchstart', touchTestiCarouselDrag);
      me.carouselCont.addEventListener('touchend', touchStopTestiDrag);
      me.carouselCont.addEventListener('mouseup', stopTestiDrag);
    }

    function removeListener() {
      me.carouselCont.removeEventListener('mouseover', stopAutoSlide);
      me.carouselCont.removeEventListener('mouseout', autoSlide);
      me.carouselCont.removeEventListener('mousedown', testiCarouselDrag);
      me.carouselCont.removeEventListener('touchstart', touchTestiCarouselDrag);
      me.carouselCont.removeEventListener('touchend', touchStopTestiDrag);
      me.carouselCont.removeEventListener('mouseup', stopTestiDrag);
    }

    function stopAutoSlide() {
      me.stopAutoSlide();
    }
    function autoSlide() {
      me.autoSlide();
    }
    function testiCarouselDrag() {
      me.testiCarouselDrag(event);
    }
    function touchTestiCarouselDrag() {
      me.stopAutoSlide();
      me.testiCarouselDrag(event);
    }
    function stopTestiDrag() {
      me.stopTestiDrag(event);
    }
    function touchStopTestiDrag() {
      me.stopTestiDrag(event);
      me.autoSlide();
    }

    function setParHeight() {
      // gets the height of the slides
      if (me.resizeRunCount === 0) {
        setTimeout(() => {
          let carouselItemsHList = [];
          for (let i = 0; i < me.carouselItems.length; i++) {
            let computH = +getComputedStyle(me.carouselItems[i.toString()]).height.replace("px", "");
            carouselItemsHList.push(computH);
          }

          let heighest = Math.max(...carouselItemsHList);
          me.carouselCont.style.height = heighest + "px";
        }, 1000);
        return;
      }
      let carouselItemsHList = [];
      for (let i = 0; i < me.carouselItems.length; i++) {
        let computH = +getComputedStyle(me.carouselItems[i.toString()]).height.replace("px", "");
        carouselItemsHList.push(computH);
      }

      let heighest = Math.max(...carouselItemsHList);
      me.carouselCont.style.height = heighest + "px";
    }

    function size540() {
      let initpos = 5;
      for (let i = 0; i < me.carouselItems.length; i++) {
        me.carouselItems[i.toString()].style.width = "90%";
        me.carouselItems[i.toString()].style.left = initpos + "%";
        initpos += 95;
      }
      setParHeight();
    }

    function size720() {
      let initpos = 4;
      for (let i = 0; i < me.carouselItems.length; i++) {
        me.carouselItems[i.toString()].style.width = "44%";
        me.carouselItems[i.toString()].style.left = initpos + "%";
        initpos += 48;
      }
      setParHeight();
    }

    function size960() {
      let initpos = 2.5;
      for (let i = 0; i < me.carouselItems.length; i++) {
        me.carouselItems[i.toString()].style.width = "30%";
        me.carouselItems[i.toString()].style.left = initpos + "%";
        initpos += 32.5;
      }
      setParHeight();
    }
  }

  actCheckSlideLength() {
    this.carouselCont = document.querySelector('.testimonial-carousel');
    const parentwidth = +getComputedStyle(this.carouselCont).width.replace('px', '');

    if (this.carouselList.length === 1) {
      if (parentwidth >= 960) { this.size960() }
      if (parentwidth < 960 && parentwidth > 540) { this.size720() }
      if (parentwidth < 541) { this.size540() }
    }

    if (this.carouselList.length === 2) {
      if (parentwidth >= 960) {
        this.size960();
        if (this.resizeRunCount === 1) {
          this.removeListener();
        }
      }
      if (parentwidth < 960 && parentwidth > 540) {
        this.size720();
        if (this.resizeRunCount === 1) {
          this.removeListener();
        }
      }
      if (parentwidth < 541) {
        this.addListener();
        this.size540();
        if (this.resizeRunCount == 1) {
          this.initiateCarousel(parentwidth, true);
          return;
        }
        this.initiateCarouselSlide();
      }
    }

    if (this.carouselList.length === 3) {
      if (parentwidth >= 960) {
        this.size960();
        if (this.resizeRunCount === 1) {
          this.removeListener();
        }
      }
      if (parentwidth < 960 && parentwidth > 540) {
        this.addListener();
        this.size720();
        if (this.resizeRunCount == 1) {
          this.initiateCarousel(parentwidth, true);
          return;
        }
        this.initiateCarouselSlide();
      }
      if (parentwidth < 541) {
        this.addListener();
        this.size540();
        if (this.resizeRunCount == 1) {
          this.initiateCarousel(parentwidth, true);
          return;
        }
        this.initiateCarouselSlide();
      }
    }

    if (this.carouselList.length > 3) {
      this.addListener();
      this.initiateCarouselSlide();
    }
  }

  initiateCarouselSlide(): void {
    this.carouselCont = document.querySelector('.testimonial-carousel');
    this.carouselItemsInit = this.carouselCont.querySelectorAll('.single-testi');
    let me = this;
    if (this.carouselItemsInit.length == 0) {
      setTimeout(() => {
        me.initiateCarouselSlide();
      }, 1000);
      return;
    }
    let parentwidth = +getComputedStyle(this.carouselCont).width.replace('px', '');
    this.initiateCarousel(parentwidth);
    me.resEvent = resize;
    window.addEventListener("resize", resize);
    function resize() {
      me.resizeRunCount = 1;
      clearInterval(me.autoSlideVar);

      // removes previous slides;
      let prevCarouselItems = document.querySelectorAll('.single-testi');
      for (let i = 0; i < prevCarouselItems.length; i++) {
        prevCarouselItems[i.toString()].remove();
      }

      // replaces it with the default slide
      let carouselCont = document.querySelector('.testimonial-carousel');
      for (let i = 0; i < me.carouselItemsInit.length; i++) {
        carouselCont.appendChild(me.carouselItemsInit[i.toString()]);
      }

      if (me.carouselItemsInit.length < 4) {
        me.runCount = 0;
        me.actCheckSlideLength();
        return;
      }

      let parentwidthres = +getComputedStyle(carouselCont).width.replace('px', '');
      me.runCount = 0;
      me.initiateCarousel(parentwidthres, true);
    }
  }

  initiateCarousel(parentwidth, resize = false): void {
    let me = this;
    me.carouselCont = document.querySelector('.testimonial-carousel');
    me.carouselItems = me.carouselCont.querySelectorAll('.single-testi');

    if (parentwidth >= 960) { size960() };
    if (parentwidth < 960 && parentwidth > 540) { size720() };
    if (parentwidth < 541) { size540() };
    let firstClonePos;
    function size540() {
      let initpos = 5;
      for (let i = 0; i < me.carouselItems.length; i++) {
        me.carouselItems[i.toString()].style.width = "90%";
        me.carouselItems[i.toString()].style.left = initpos + "%";
        initpos += 95;
      }
      me.inc = 95;
      firstClonePos = -90
    }

    function size720() {
      let initpos = 4;
      for (let i = 0; i < me.carouselItems.length; i++) {
        me.carouselItems[i.toString()].style.width = "44%";
        me.carouselItems[i.toString()].style.left = initpos + "%";
        initpos += 48;
      }
      me.inc = 48;
      firstClonePos = -44;
    }

    function size960() {
      let initpos = 2.5;
      for (let i = 0; i < me.carouselItems.length; i++) {
        me.carouselItems[i.toString()].style.width = "30%";
        me.carouselItems[i.toString()].style.left = initpos + "%";
        initpos += 32.5;
      }
      me.inc = 32.5;
      firstClonePos = -30;
    }

    if (!resize) {
      setTimeout(() => {
        // gets the height of the slides
        let carouselItemsHList = [];
        for (let i = 0; i < me.carouselItems.length; i++) {
          let computH = +getComputedStyle(me.carouselItems[i.toString()]).height.replace("px", "");
          carouselItemsHList.push(computH);
        }

        let heighest = Math.max(...carouselItemsHList);

        me.carouselCont.style.height = heighest + "px";

        // this prevents cloning happening twice in case of any error
        if (me.runCount == 0) {
          let lastCloned = me.carouselItems[(me.carouselItems.length - 1).toString()].cloneNode(true);
          lastCloned.style.left = firstClonePos + "%";
          me.carouselCont.insertBefore(lastCloned, me.carouselItems["0"]);
          me.runCount++;
        }
      }, 1000);
      me.autoSlide();
      return;
    }

    let carouselItemsHList = [];
    for (let i = 0; i < me.carouselItems.length; i++) {
      let computH = +getComputedStyle(me.carouselItems[i.toString()]).height.replace("px", "");
      carouselItemsHList.push(computH);
    }

    let heighest = Math.max(...carouselItemsHList);

    me.carouselCont.style.height = heighest + "px";

    // this prevents cloning happening twice in case of any error
    if (me.runCount == 0) {
      let lastCloned = me.carouselItems[(me.carouselItems.length - 1).toString()].cloneNode(true);
      lastCloned.style.left = firstClonePos + "%";
      me.carouselCont.insertBefore(lastCloned, me.carouselItems["0"]);
      me.runCount++;
    }
    me.autoSlide();
  }

  autoSlide() {
    let me = this;
    me.autoSlideVar = setInterval(slide, 5000);
    function slide() {
      me.testiSlider(1, me.inc);
    }
  }

  stopAutoSlide() {
    let me = this;
    clearInterval(me.autoSlideVar);
  }

  testiInitial;
  testiFinal;
  testiItemPos = 0;
  testiDiff = 0;
  dragEv;

  testiCarouselDrag(e): void {
    let me = this;
    me.testiInitial = e.type == "touchstart" ? e.touches[0].clientX : e.x;;
    e.preventDefault();
    me.dragEv = testiDragEv;
    this.carouselCont.style.cursor = "grab";
    e.type == "touchstart" ?
      this.carouselCont.addEventListener("touchmove", testiDragEv) :
      this.carouselCont.addEventListener("mousemove", testiDragEv);
    function testiDragEv(): void {
      me.carouselCont = document.querySelector('.testimonial-carousel');
      me.carouselItems = me.carouselCont.querySelectorAll('.single-testi');
      me.testiActDrag(event);
    }
  }



  testiActDrag(e): void {
    let winWidth = window.innerWidth;
    let diff = +this.testiInitial - (e.type == "touchmove" ? e.touches[0].clientX : e.x);
    this.testiInitial = (e.type == "touchmove" ? e.touches[0].clientX : e.x)
    this.testiDiff = diff;
    // resetting the decrement or increment to -1 or 1 in the loop below stabilizes the speed of
    // movement of the carousel items
    for (let i = 0; i < this.carouselItems.length; i++) {
      this.carouselItems[i.toString()].style.transition = "0s";
      let newPos = +this.carouselItems[i.toString()].style.left.replace("%", "") - (diff > 0 ? 0.8 : -0.8);
      this.carouselItems[i.toString()].style.left = newPos + "%";
    }
    let parentwidth = +getComputedStyle(this.carouselCont).width.replace('px', '');

    let lowest;
    let inc;
    let highest;
    if (parentwidth >= 960) {
      lowest = -62.5;
      inc = 32.5;
      highest = (inc * (this.carouselItems.length - 1)) + 2.5;
    }
    if (parentwidth < 960 && parentwidth > 540) {
      lowest = -92;
      inc = 48;
      highest = (inc * (this.carouselItems.length - 1)) + 4;
    }
    if (parentwidth < 541) {
      lowest = -185;
      inc = 95;
      highest = (inc * (this.carouselItems.length - 1)) + 5;
    }

    if (diff < 0) {
      for (let i = 0; i < this.carouselItems.length; i++) {
        if (+this.carouselItems[i.toString()].style.left.replace("%", "") >= highest) {
          this.carouselItems[i.toString()].remove();
          let allTesti = this.carouselCont.querySelectorAll('.single-testi');
          let newLast = allTesti[(allTesti.length - 1).toString()];
          let cloneLast = newLast.cloneNode(true);
          let firstChild = allTesti["0"];
          cloneLast.style.left = (+firstChild.style.left.replace("%", "") - inc) + "%";
          this.carouselCont.insertBefore(cloneLast, firstChild);
          break;
        }
      }
    } else {
      for (let i = 0; i < this.carouselItems.length; i++) {
        if (+this.carouselItems[i.toString()].style.left.replace("%", "") <= lowest) {
          this.carouselItems[i.toString()].remove();
          let allTesti = this.carouselCont.querySelectorAll('.single-testi');
          let cloneFirst = allTesti["0"].cloneNode(true);
          let lastChild = allTesti[(allTesti.length - 1).toString()];
          cloneFirst.style.left = (+lastChild.style.left.replace("%", "") + inc) + "%";
          this.carouselCont.appendChild(cloneFirst);
          break;
        }
      }
    }

    this.testiItemPos = +this.carouselItems["1"].style.left.replace("%", "");
  }

  stopTestiDrag(e): void {
    let initSecPos;
    let inc;
    this.carouselCont = document.querySelector('.testimonial-carousel');
    this.carouselItems = this.carouselCont.querySelectorAll('.single-testi');

    // carries out the remaining slide movement based on the differences between the actual slide extent 
    // and the supposed slide extent
    let parentwidth = +getComputedStyle(this.carouselCont).width.replace('px', '');

    if (parentwidth >= 960) {
      initSecPos = 2.5;
      inc = 32.5;
    }
    if (parentwidth < 960 && parentwidth > 540) {
      initSecPos = 4;
      inc = 48;
    }
    if (parentwidth < 541) {
      initSecPos = 5;
      inc = 95;
    }

    if (this.testiDiff > 0) {
      let realDiff = initSecPos - this.testiItemPos;
      if (realDiff > 10) {
        this.testiSlider(1, (inc - realDiff));
      } else {
        for (let i = 0; i < this.carouselItems.length; i++) {
          this.carouselItems[i.toString()].style.transition = "0.4s ease";
          let newPos = +this.carouselItems[i.toString()].style.left.replace("%", "") + realDiff;
          this.carouselItems[i.toString()].style.left = newPos + "%";
        }
      }
    } else if (this.testiDiff < 0) {
      let realDiff = (initSecPos - this.testiItemPos) * -1;
      if (realDiff > 10) {
        let ext = inc - realDiff;
        this.testiSlider(-1, ext);
      } else {
        for (let i = 0; i < this.carouselItems.length; i++) {
          this.carouselItems[i.toString()].style.transition = "0.4s ease";
          let newPos = +this.carouselItems[i.toString()].style.left.replace("%", "") - realDiff;
          this.carouselItems[i.toString()].style.left = newPos + "%";
        }
      }
    }

    // resets the static variable back to its default
    this.testiDiff = 0;
    this.testiItemPos = 0;
    let me = this;
    this.carouselCont.style.cursor = "default";
    e.type == "touchend" ?
      this.carouselCont.removeEventListener("touchmove", me.dragEv) :
      this.carouselCont.removeEventListener("mousemove", me.dragEv);
  }

  testiSlider(n, ext): void {
    const winWidth = window.innerWidth;
    this.once++;

    // this needs to be done to collect the current slides with their currently set properties
    this.carouselCont = document.querySelector('.testimonial-carousel');
    this.carouselItems = this.carouselCont.querySelectorAll('.single-testi');

    let parentwidth = +getComputedStyle(this.carouselCont).width.replace('px', '');

    let lowest;
    let inc;
    let highest;
    if (parentwidth >= 960) {
      lowest = -62.5;
      inc = 32.5;
      highest = (inc * (this.carouselItems.length - 1)) + 2.5;
    }
    if (parentwidth < 960 && parentwidth > 540) {
      lowest = -92;
      inc = 48;
      highest = (inc * (this.carouselItems.length - 1)) + 4;
    }
    if (parentwidth < 541) {
      lowest = -185;
      inc = 95;
      highest = (inc * (this.carouselItems.length - 1)) + 5;
    }

    if (this.once > 1) { return; }
    for (let i = 0; i < this.carouselItems.length; i++) {
      this.carouselItems[i.toString()].style.transition = "0.8s ease";
      let newPos = +this.carouselItems[i.toString()].style.left.replace("%", "") - (n * ext);
      this.carouselItems[i.toString()].style.left = newPos + "%";
    }

    // reset positions by cloning
    if (n == -1) {
      for (let i = 0; i < this.carouselItems.length; i++) {
        if (+this.carouselItems[i.toString()].style.left.replace("%", "") == highest) {
          this.carouselItems[i.toString()].remove();
          let allTesti = this.carouselCont.querySelectorAll('.single-testi');
          let newLast = allTesti[(allTesti.length - 1).toString()];
          let cloneLast = newLast.cloneNode(true);
          let carouselContFirst = allTesti["0"];
          cloneLast.style.left = (+carouselContFirst.style.left.replace("%", "") - inc) + "%";
          this.carouselCont.insertBefore(cloneLast, carouselContFirst);
          break;
        }
      }
    } else {
      for (let i = 0; i < this.carouselItems.length; i++) {
        if (+this.carouselItems[i.toString()].style.left.replace("%", "") == lowest) {
          this.carouselItems[i.toString()].remove();
          let allTesti = this.carouselCont.querySelectorAll('.single-testi');
          let carouselContFirst = allTesti["0"];
          let cloneFirst = carouselContFirst.cloneNode(true);
          let lastChild = allTesti[(allTesti.length - 1).toString()];
          cloneFirst.style.left = (+lastChild.style.left.replace("%", "") + inc) + "%";
          this.carouselCont.appendChild(cloneFirst);
          break;
        }
      }
    }
    this.once = 0;
  }







  // constructor(
  //   private testimonialService: TestimonialService
  // ) { }

  // get current() {
  //   return this.currentIndic;
  // }
  // currentIndic = 1;

  // testiInitial;
  // testiFinal;
  // testiItemPos = 0;
  // testiDiff = 0;

  // once = 0;
  // carouselCont;
  // carouselItems;
  // runCount = 0;
  // carouselList;
  // dragEv;
  // resEvent;

  // noTestimony: any;

  // resizeRunCount = 0;


  // ngOnInit(): void {
  //   this.getAllTest();
  // }

  // private getAllTest() {
  //   this.testimonialService.allTestimony().subscribe(res => {
  //     if (res) {
  //       this.carouselList = res;
  //     } else {
  //       this.noTestimony = 'No Testimony Available';
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   let me = this;
  //   window.removeEventListener('resize', me.resEvent);
  // }

  // ngAfterViewInit(): void {
  //   const me = this;
  //   this.carouselCont = document.querySelector('.testimonial-carousel');
  //   const carouselItemsInit = this.carouselCont.querySelectorAll('.single-testi');
  //   if (carouselItemsInit.length === 0) {
  //     setTimeout(() => {
  //       me.ngAfterViewInit();
  //     }, 1000);
  //     return;
  //   }
  //   this.initiateCarousel();
  //   this.resEvent = resize;
  //   window.addEventListener('resize', resize);
  //   function resize() {
  //     // if (document) {
  //     // removes previous slides;
  //     const prevCarouselItems = document.querySelectorAll('.single-testi');
  //     for (let i = 0; i < prevCarouselItems.length; i++) {
  //       prevCarouselItems[i.toString()].remove();
  //     }
  //     // replaces it with the default slide
  //     const carouselCont = document.querySelector('.testimonial-carousel');
  //     const carouselContLast = carouselCont.querySelector('.carouselIndicatorCont');
  //     for (let i = 0; i < carouselItemsInit.length; i++) {
  //       carouselCont.insertBefore(carouselItemsInit[i.toString()], carouselContLast);
  //     }
  //     me.runCount = 0;
  //     me.initiateCarousel(true);
  //     // }
  //   }
  // }

  // initiateCarousel(resize = false): void {
  //   const me = this;
  //   const winWidth = window.innerWidth;
  //   me.carouselCont = document.querySelector('.testimonial-carousel');
  //   me.carouselItems = me.carouselCont.querySelectorAll('.single-testi');
  //   let carouselPos = winWidth <= 767 ? (me.runCount > 0 ? -110 : 0) : (me.runCount > 0 ? -85 : -30);
  //   for (let i = 0; i < me.carouselItems.length; i++) {
  //     me.carouselItems[i.toString()].style.left = carouselPos + '%';
  //     carouselPos += winWidth <= 767 ? 110 : 55;
  //   }
  //   this.currentIndic = winWidth <= 767 ? 0 : 1;

  //   for (let i = 0; i < me.carouselItems.length; i++) {
  //     me.carouselItems[i.toString()].style.width = winWidth <= 767 ? '100%' : '50%';
  //   }

  //   if (!resize) {
  //     setTimeout(() => {
  //       // gets the height of the slides
  //       const carouselItemsHList = [];
  //       for (let i = 0; i < me.carouselItems.length; i++) {
  //         const computH = +getComputedStyle(me.carouselItems[i.toString()]).height.replace('px', '');
  //         carouselItemsHList.push(computH);
  //       }

  //       const heighest = Math.max(...carouselItemsHList);
  //       const carouselIndicator = me.carouselCont.querySelector('.carouselIndicatorCont');
  //       const indicatorH = +getComputedStyle(carouselIndicator).height.replace('px', '');

  //       me.carouselCont.style.height = heighest + indicatorH + 'px';

  //       const firstLeft = +me.carouselItems['0'].style.left.replace('%', '');

  //       // this prevents cloning happening twice in case of any error
  //       if (me.runCount === 0) {
  //         const lastCloned = me.carouselItems[(me.carouselItems.length - 1).toString()].cloneNode(true);
  //         lastCloned.style.left = (firstLeft - (winWidth <= 767 ? 110 : 55)) + '%';
  //         me.carouselCont.insertBefore(lastCloned, me.carouselItems['0']);
  //         me.runCount++;
  //       }
  //     }, 600);
  //     return;
  //   }

  //   // gets the height of the slides
  //   const carouselItemsHList = [];
  //   for (let i = 0; i < me.carouselItems.length; i++) {
  //     const computH = +getComputedStyle(me.carouselItems[i.toString()]).height.replace('px', '');
  //     carouselItemsHList.push(computH);
  //   }

  //   const heighest = Math.max(...carouselItemsHList);
  //   const carouselIndicator = me.carouselCont.querySelector('.carouselIndicatorCont');
  //   const indicatorH = +getComputedStyle(carouselIndicator).height.replace('px', '');

  //   me.carouselCont.style.height = heighest + indicatorH + 'px';

  //   const firstLeft = +me.carouselItems['0'].style.left.replace('%', '');

  //   // this prevents cloning happening twice in case of any error
  //   if (me.runCount === 0) {
  //     const lastCloned = me.carouselItems[(me.carouselItems.length - 1).toString()].cloneNode(true);
  //     lastCloned.style.left = (firstLeft - (winWidth <= 767 ? 110 : 55)) + '%';
  //     me.carouselCont.insertBefore(lastCloned, me.carouselItems['0']);
  //     me.runCount++;
  //   }
  // }

  // testiCarouselDrag(e): void {
  //   const me = this;
  //   this.testiInitial = e.type === 'touchstart' ? e.touches[0].clientX : e.x;
  //   e.preventDefault();
  //   this.carouselCont.style.cursor = 'grab';
  //   this.dragEv = testiDragEv;
  //   e.type === 'touchstart' ?
  //     this.carouselCont.addEventListener('touchmove', testiDragEv) :
  //     this.carouselCont.addEventListener('mousemove', testiDragEv);
  //   function testiDragEv(): void {
  //     // the "this" keyword cannot access the defined variables "carouselCont" and "carouselItems"
  //     // or any defined variable or functions
  //     me.carouselCont = document.querySelector('.testimonial-carousel');
  //     me.carouselItems = me.carouselCont.querySelectorAll('.single-testi');
  //     // tslint:disable-next-line: deprecation
  //     me.testiActDrag(event);
  //   }
  // }

  // testiActDrag(e): void {
  //   // the "this" keyword here can only access static variables or functions
  //   // the "e" parameter can only access the class variable set by the caller function "testiDragEv"
  //   const winWidth = window.innerWidth;
  //   const diff = +this.testiInitial - (e.type === 'touchmove' ? e.touches[0].clientX : e.x);
  //   this.testiInitial = (e.type === 'touchmove' ? e.touches[0].clientX : e.x);
  //   this.testiDiff = diff;
  //   // resetting the decrement or increment to -1 or 1 in the loop below stabilizes the speed of
  //   // movement of the carousel items
  //   for (let i = 0; i < this.carouselItems.length; i++) {
  //     this.carouselItems[i.toString()].style.transition = '0s';
  //     // tslint:disable-next-line: max-line-length
  //     const newPos = +this.carouselItems[i.toString()].style.left.replace('%', '') - (winWidth >= 768 ? (diff < 0 ? -1 : diff === 0 ? 0 : 1) : (diff < 0 ? -1 : diff === 0 ? 0 : 1));
  //     this.carouselItems[i.toString()].style.left = newPos + '%';
  //   }

  //   if (diff < 0) {
  //     for (let i = 0; i < this.carouselItems.length; i++) {
  //       // tslint:disable-next-line: max-line-length
  //       if (+this.carouselItems[i.toString()].style.left.replace('%', '') >= (winWidth >= 768 ? (((this.carouselItems.length - 1) * 55) - 30) : ((this.carouselItems.length - 1) * 110))) {
  //         this.carouselItems[i.toString()].remove();
  //         const allTesti = this.carouselCont.querySelectorAll('.single-testi');
  //         const newLast = allTesti[(allTesti.length - 1).toString()];
  //         const cloneLast = newLast.cloneNode(true);
  //         const firstChild = allTesti['0'];
  //         cloneLast.style.left = (+firstChild.style.left.replace('%', '') - (winWidth >= 768 ? 55 : 110)) + '%';
  //         this.carouselCont.insertBefore(cloneLast, firstChild);
  //         this.currentIndic--;
  //         if (this.currentIndic < 0) { this.currentIndic = this.carouselItems.length - 2; }
  //         break;
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < this.carouselItems.length; i++) {
  //       if (+this.carouselItems[i.toString()].style.left.replace('%', '') <= (winWidth >= 768 ? -140 : -220)) {
  //         this.carouselItems[i.toString()].remove();
  //         const allTesti = this.carouselCont.querySelectorAll('.single-testi');
  //         const cloneFirst = allTesti['0'].cloneNode(true);
  //         const lastChild = allTesti[(allTesti.length - 1).toString()];
  //         const carouselContLast = this.carouselCont.querySelector('.carouselIndicatorCont');
  //         cloneFirst.style.left = (+lastChild.style.left.replace('%', '') + (winWidth >= 768 ? 55 : 110)) + '%';
  //         this.carouselCont.insertBefore(cloneFirst, carouselContLast);
  //         this.currentIndic++;
  //         if (this.currentIndic > (this.carouselItems.length - 2)) { this.currentIndic = 0; }
  //         break;
  //       }
  //     }
  //   }
  //   for (let i = 0; i < this.carouselItems.length; i++) {
  //     const active = this.carouselItems[i.toString()].style.left === (winWidth >= 768 ? '25%' : '0%');
  //     active ? this.carouselItems[i.toString()].classList.add('carouselActive') :
  //       this.carouselItems[i.toString()].classList.remove('carouselActive');
  //   }
  //   this.testiItemPos = +this.carouselItems[winWidth >= 768 ? '2' : '1'].style.left.replace('%', '');
  // }

  // stopTestiDrag(e): void {
  //   const me = this;
  //   this.carouselCont.style.cursor = 'default';
  //   e.type === 'touchend' ?
  //     this.carouselCont.removeEventListener('touchmove', me.dragEv) :
  //     this.carouselCont.removeEventListener('mousemove', me.dragEv);
  //   const winWidth = window.innerWidth;
  //   this.carouselCont = document.querySelector('.testimonial-carousel');
  //   this.carouselItems = this.carouselCont.querySelectorAll('.single-testi');

  //   // carries out the remaining slide movement based on the differences between the actual slide extent
  //   // and the supposed slide extent
  //   if (this.testiDiff > 0) {
  //     const realDiff = (winWidth >= 768 ? 25 : 0) - this.testiItemPos;
  //     if (realDiff > 10) {
  //       this.testiSlider(1, ((winWidth >= 768 ? 55 : 110) - realDiff));
  //     } else {
  //       for (let i = 0; i < this.carouselItems.length; i++) {
  //         this.carouselItems[i.toString()].style.transition = '0.4s ease';
  //         const newPos = +this.carouselItems[i.toString()].style.left.replace('%', '') + realDiff;
  //         this.carouselItems[i.toString()].style.left = newPos + '%';
  //         const active = this.carouselItems[i.toString()].style.left === (winWidth >= 768 ? '25%' : '0%');
  //         active ? this.carouselItems[i.toString()].classList.add('carouselActive') :
  //           this.carouselItems[i.toString()].classList.remove('carouselActive');
  //       }
  //     }
  //   } else if (this.testiDiff < 0) {
  //     const realDiff = ((winWidth >= 768 ? 25 : 0) - this.testiItemPos) * -1;
  //     if (realDiff > 10) {
  //       const ext = (winWidth >= 768 ? 55 : 110) - realDiff;
  //       this.testiSlider(-1, ext);
  //     } else {
  //       for (let i = 0; i < this.carouselItems.length; i++) {
  //         this.carouselItems[i.toString()].style.transition = '0.4s ease';
  //         const newPos = +this.carouselItems[i.toString()].style.left.replace('%', '') - realDiff;
  //         this.carouselItems[i.toString()].style.left = newPos + '%';
  //         const active = this.carouselItems[i.toString()].style.left === (winWidth >= 768 ? '25%' : '0%');
  //         active ? this.carouselItems[i.toString()].classList.add('carouselActive') :
  //           this.carouselItems[i.toString()].classList.remove('carouselActive');
  //       }
  //     }
  //   }

  //   // resets the static variable back to its default
  //   this.testiDiff = 0;
  //   this.testiItemPos = 0;
  // }

  // testiSlider(n, ext): void {
  //   const winWidth = window.innerWidth;
  //   this.once++;

  //   // this needs to be done to collect the current slides with their currently set properties
  //   this.carouselCont = document.querySelector('.testimonial-carousel');
  //   this.carouselItems = this.carouselCont.querySelectorAll('.single-testi');

  //   if (this.once > 1) { return; }
  //   for (let i = 0; i < this.carouselItems.length; i++) {
  //     this.carouselItems[i.toString()].style.transition = '0.6s ease';
  //     const newPos = +this.carouselItems[i.toString()].style.left.replace('%', '') - (n * ext);
  //     this.carouselItems[i.toString()].style.left = newPos + '%';
  //     if (this.carouselItems[i.toString()].style.left === (winWidth >= 768 ? '25%' : '0%')) {
  //       this.carouselItems[i.toString()].classList.add('carouselActive');
  //     } else {
  //       this.carouselItems[i.toString()].classList.remove('carouselActive');
  //     }
  //   }

  //   n === 1 ? this.currentIndic++ : this.currentIndic--;
  //   if (this.currentIndic < 0) { this.currentIndic = this.carouselItems.length - 2; }
  //   if (this.currentIndic > (this.carouselItems.length - 2)) { this.currentIndic = 0; }

  //   // reset positions by cloning
  //   if (n === -1) {
  //     for (let i = 0; i < this.carouselItems.length; i++) {
  //       if (+this.carouselItems[i.toString()].style.left.replace('%', '') === (winWidth >= 768 ? (((this.carouselItems.length - 1) * 55) - 30) : ((this.carouselItems.length - 1) * 110))) {
  //         this.carouselItems[i.toString()].remove();
  //         const allTesti = this.carouselCont.querySelectorAll('.single-testi');
  //         const newLast = allTesti[(allTesti.length - 1).toString()];
  //         const cloneLast = newLast.cloneNode(true);
  //         const carouselContFirst = allTesti['0'];
  //         cloneLast.style.left = (+carouselContFirst.style.left.replace('%', '') - (winWidth >= 768 ? 55 : 110)) + '%';
  //         this.carouselCont.insertBefore(cloneLast, carouselContFirst);
  //         break;
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < this.carouselItems.length; i++) {
  //       if (+this.carouselItems[i.toString()].style.left.replace('%', '') === (winWidth >= 768 ? -140 : -220)) {
  //         this.carouselItems[i.toString()].remove();
  //         const allTesti = this.carouselCont.querySelectorAll('.single-testi');
  //         const carouselContFirst = allTesti['0'];
  //         const cloneFirst = carouselContFirst.cloneNode(true);
  //         const lastChild = allTesti[(allTesti.length - 1).toString()];
  //         const carouselContLast = this.carouselCont.querySelector('.carouselIndicatorCont');
  //         cloneFirst.style.left = (+lastChild.style.left.replace('%', '') + (winWidth >= 768 ? 55 : 110)) + '%';
  //         this.carouselCont.insertBefore(cloneFirst, carouselContLast);
  //         break;
  //       }
  //     }
  //   }
  //   this.once = 0;
  // }

}
