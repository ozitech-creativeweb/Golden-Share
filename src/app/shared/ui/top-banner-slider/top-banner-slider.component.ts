import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-top-banner-slider',
	templateUrl: './top-banner-slider.component.html',
	styleUrls: ['./top-banner-slider.component.scss']
})
export class TopBannerSliderComponent implements OnInit, AfterViewInit, OnDestroy {

	slideContainer;
	bannerContainer;
	initialHeight = 758.81;
	captText;
	btn;
	@Input() homeSlides;
	resEvent;

	once = 0;

	slideList;

	constructor() { }

	ngOnDestroy() {
		let me = this;
		window.removeEventListener('resize', me.resEvent);
	}

	ngOnInit(): void {
		// setTimeout(() => {
		// me.slideList = [
		// 	{
		// 		img: 'assets/images/h1.jpg',
		// 		text: 'Best secure investment plan',
		// 		linkText: 'GET STARTED',
		// 		link: '/',
		// 	},
		// 	{
		// 		img: 'assets/images/h2.jpg',
		// 		text: 'Super secure investment plan',
		// 		linkText: 'INVEST NOW',
		// 		link: '/',
		// 	},
		// ];
		// }, 6000);
	}

	ngAfterViewInit(): void {
		this.checkSlidesLength();
	}

	checkSlidesLength() {
		if (this.homeSlides == undefined) {
			setTimeout(() => {
				this.ngAfterViewInit();
			}, 1000);
			return;
		} else if (this.homeSlides === 'not available') {
			return;
		}

		if (this.homeSlides.length > 1) {
			this.bannerContainer = document.querySelector('.bannerContainer');
			this.bannerContainer.addEventListener('mousedown', drag);
			this.bannerContainer.addEventListener('touchstart', drag);
			this.bannerContainer.addEventListener('mouseup', stopDrag);
			this.bannerContainer.addEventListener('touchend', stopDrag);
		}
		
		function drag() {
			me.drag(event);
		}
		function stopDrag() {
			me.stopDrag(event);
		}

		this.initiateSlider();
		let me = this;
		me.resEvent = resize;
		window.addEventListener("resize", resize);
		function resize() {
			let winWidth = window.innerWidth;
			me.responsive(winWidth, me.initialHeight, me.bannerContainer, me.btn, me.captText);
		}
	}

	initiateSlider(): void {
		this.bannerContainer = document.getElementsByClassName('bannerContainer')["0"];
		this.slideContainer = this.bannerContainer.querySelectorAll('.slideImageCont');

		if (this.slideContainer.length == 0) {
			let me = this;
			setTimeout(() => {
				me.ngAfterViewInit();
			}, 1000);
			return;
		}
		let initpos = 0;
		for (let i = 0; i < this.slideContainer.length; i++) {
			this.slideContainer[i.toString()].style.left = initpos + "%";
			initpos += 100;
		}
		let banner = this.bannerContainer;
		this.captText = this.bannerContainer.getElementsByTagName('h1');
		let captText = this.captText;
		this.btn = this.bannerContainer.getElementsByTagName('a');
		let btn = this.btn;
		let winWidth = window.innerWidth;
		let initHeight = this.initialHeight;

		this.responsive(winWidth, initHeight, banner, btn, captText);
	}

	responsive(screenWidth, initalHeight, banner, btn, capttext): void {
		// 16, 90, 50, 100, 25, 160 are the initial css values for the capttext and button

		let newHeight = (screenWidth * initalHeight) / 1349;
		banner.style.height = newHeight + "px";
		let newfontb = (16 * screenWidth) / 1349;
		let newfonttxt = (90 * screenWidth) / 1349;
		let mbtxt = (50 * screenWidth) / 1349;
		let linehh1 = (100 * screenWidth) / 1349;
		let lineb = (40 * screenWidth) / 1349;
		let widthb = (160 * screenWidth) / 1349;

		for (let i = 0; i < capttext.length; i++) {
			if(btn[i]){
				btn[i.toString()].style.cssText = `font-size:${newfontb > 11 ? newfontb : 11}px; line-height:${lineb}px; width: ${widthb > 112 ? widthb : 112}px`;
			}
			capttext[i.toString()].style.cssText = `font-size:${newfonttxt}px; margin-bottom: ${mbtxt}px; line-height: ${linehh1}px`;
		}
		console.log(capttext);
	}

	bannerSlider(n, ext): void {
		// this prevents the sliding movement when the initial slide action is not completed
		this.once++;
		if (this.once > 1) { return; }

		if (n == 1) {
			for (let i = 0; i < this.slideContainer.length; i++) {
				this.slideContainer[i.toString()].style.transition = ext < 100 ? "0.6s ease" : "0.8s ease";
				let newPos = +this.slideContainer[i.toString()].style.left.replace("%", "") - (n * ext);
				this.slideContainer[i.toString()].style.left = newPos + "%";
			}
			let me = this;
			setTimeout(() => {
				for (let i = 0; i < me.slideContainer.length; i++) {
					if (me.slideContainer[i.toString()].style.left == "-100%") {
						me.slideContainer[i.toString()].style.transition = "0s";
						me.slideContainer[i.toString()].style.left = ((me.slideContainer.length - 1) * 100) + "%";
						break;
					}
				}
				me.once = 0;
			}, 820);
			return;
		}
		for (let i = 0; i < this.slideContainer.length; i++) {
			if (this.slideContainer[i.toString()].style.left == ((this.slideContainer.length - 1) * 100) + "%") {
				this.slideContainer[i.toString()].style.transition = "0s";
				this.slideContainer[i.toString()].style.left = "-100%";
			}
		}
		setTimeout(() => {
			for (let i = 0; i < this.slideContainer.length; i++) {
				this.slideContainer[i.toString()].style.transition = ext < 100 ? "0.6s ease" : "0.8s ease";
				let newPos = +this.slideContainer[i.toString()].style.left.replace("%", "") - (n * ext);
				this.slideContainer[i.toString()].style.left = newPos + "%";
			}
		}, 50);
		let me = this;
		setTimeout(() => { me.once = 0 }, 800);
	}

	initial;
	final;
	slidePos;
	diff;
	dragEvVar;

	drag(e): void {
		let me = this;

		// prevents drag action if it is done on either of the elements
		if (e.target.className == "prevControl"
			|| e.target.className == "fa fa-angle-left"
			|| e.target.className == "nextControl"
			|| e.target.className == "fa fa-angle-right"
			|| e.target.tagName == "A") {
			return;
		}

		// this sets the static variable initial to the location of the event
		this.initial = e.type == "touchstart" ? e.touches[0].clientX : e.x;


		e.preventDefault();
		this.dragEvVar = dragEv;
		this.bannerContainer.style.cursor = "grab";
		e.type == "touchstart" ? this.bannerContainer.addEventListener("touchmove", dragEv) :
			this.bannerContainer.addEventListener("mousemove", dragEv);
		function dragEv() {
			me.bannerContainer = document.querySelector('.bannerContainer');
			me.slideContainer = document.querySelectorAll('.slideImageCont');
			me.actDrag(event);
		}
	}

	actDrag(e) {
		let winWidth = window.innerWidth;
		let diff = +(this.initial - (e.type == "touchmove" ? e.touches[0].clientX : e.x));
		this.initial = e.type == "touchmove" ? e.touches[0].clientX : e.x;

		this.diff = diff;

		// regulates the slide movement by increament or decrement of 2;
		for (let i = 0; i < this.slideContainer.length; i++) {
			this.slideContainer[i.toString()].style.transition = "0s";
			let newPos = +this.slideContainer[i.toString()].style.left.replace("%", "") - (diff < 0 ? -1 : 1);
			this.slideContainer[i.toString()].style.left = newPos + "%";
		}

		// check to know the direction of the slide movement 
		// in order to know when it reaches its cloning extent
		if (diff < 0) {
			for (let i = 0; i < this.slideContainer.length; i++) {
				if (+this.slideContainer[i.toString()].style.left.replace("%", "") >= ((this.slideContainer.length - 1) * 100)) {
					this.slideContainer[i.toString()].style.transition = "0s";
					let newPos = -100 + (+this.slideContainer[i.toString()].style.left.replace("%", "") - ((this.slideContainer.length - 1) * 100));
					this.slideContainer[i.toString()].style.left = newPos + "%";
					break;
				}
			}
		}

		if (diff > 0) {
			for (let i = 0; i < this.slideContainer.length; i++) {
				if (+this.slideContainer[i.toString()].style.left.replace("%", "") <= -100) {
					this.slideContainer[i.toString()].style.transition = "0s";
					let newPos = (100 * (this.slideContainer.length - 1)) - ((+this.slideContainer[i.toString()].style.left.replace("%", "") * -1) - 100);
					this.slideContainer[i.toString()].style.left = newPos + "%";
					break;
				}
			}
		}
		for (let i = 0; i < this.slideContainer.length; i++) {
			if (+this.slideContainer[i.toString()].style.left.replace("%", "") < 100 && +this.slideContainer[i.toString()].style.left.replace("%", "") > -1) {
				this.slidePos = +this.slideContainer[i.toString()].style.left.replace("%", "");
			}
		}
	}

	stopDrag(e): void {
		if (e.target.tagName == "A") {
			return;
		}

		if (e.target.className == "prevControl" || e.target.className == "fa fa-angle-left") {
			this.bannerSlider(-1, 100);
			return;
		} else if (e.target.className == "nextControl" || e.target.className == "fa fa-angle-right") {
			this.bannerSlider(1, 100);
			return;
		}

		// check to know what direction to slide to after the drag release
		if (this.diff > 0) {
			if (this.slidePos < 80) {
				this.bannerSlider(1, this.slidePos);
			} else {
				for (let i = 0; i < this.slideContainer.length; i++) {
					this.slideContainer[i.toString()].style.transition = "0.4s ease";
					let newPos = +this.slideContainer[i.toString()].style.left.replace("%", "") + (100 - this.slidePos);
					this.slideContainer[i.toString()].style.left = newPos + "%";
				}
			}
		} else if (this.diff < 0) {
			if (this.slidePos < 20) {
				for (let i = 0; i < this.slideContainer.length; i++) {
					this.slideContainer[i.toString()].style.transition = "0.4s ease";
					let newPos = +this.slideContainer[i.toString()].style.left.replace("%", "") - (this.slidePos);
					this.slideContainer[i.toString()].style.left = newPos + "%";
				}
			} else {
				let ext = 100 - this.slidePos;
				this.bannerSlider(-1, ext);
			}
		}
		this.diff = 0;
		let me = this;
		this.bannerContainer.style.cursor = "default";
		e.type == "touchend" ? this.bannerContainer.removeEventListener("touchmove", me.dragEvVar) :
			this.bannerContainer.removeEventListener("mousemove", me.dragEvVar);
	}
}
