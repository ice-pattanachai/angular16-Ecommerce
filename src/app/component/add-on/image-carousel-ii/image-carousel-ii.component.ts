import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel-ii',
  templateUrl: './image-carousel-ii.component.html',
  styleUrls: ['./image-carousel-ii.component.css']
})
export class ImageCarouselIIComponent implements OnInit{
  images: string[] = [
    "http://fakeimg.pl/2000x800/0079D8/fff/?text=Angular",
    "http://fakeimg.pl/2000x800/DA5930/fff/?text=JavaScript",
    "http://fakeimg.pl/2000x800/F90/fff/?text=Node.js",
    "https://fakeimg.pl/2000x800/",
    "http://fakeimg.pl/2000x800/00ADB5/fff/?text=LittleShopFront",
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
