import {  AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})


export class BannerComponent implements OnInit, AfterViewInit  {

  images:string [] = [
    'assets/banner/banner-4.jpg',
    'assets/banner/banner-5.jpg',
    'assets/banner/banner-6.png'
  ]


  constructor() { }

  ngOnInit(): void {
  }

    ngAfterViewInit() {
    const  swiper = new Swiper('.swiper-container', 
      {
        speed:2000,
        direction: 'horizontal',
        navigation: 
        {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: 
        {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        zoom: true,
        keyboard: 
        {
          enabled: true,
          onlyInViewport: false,
        },
        mousewheel: 
        {
          invert: true,
        },
        autoplay: 
        {
          delay: 5000,
        },
        loop: true,
      }); 
  }

  

}
