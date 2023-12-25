import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit{
  images: string[] = [
    "http://fakeimg.pl/650x415/0079D8/fff/?text=Angular",
    "http://fakeimg.pl/650x415/DA5930/fff/?text=JavaScript",
    "http://fakeimg.pl/650x415/F90/fff/?text=Node.js",
    "https://fakeimg.pl/650x415/",
    "http://fakeimg.pl/650x415/00ADB5/fff/?text=LittleShopFront",
];
currentIndex: number = 0;

ngOnInit() {
  this.startAutoCarousel();
}

startAutoCarousel() {
  setInterval(() => {
    this.nextImage();
  }, 3000);
}



nextImage() {
  this.currentIndex = (this.currentIndex + 1) % this.images.length;
}

prevImage() {
  this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
}
}
