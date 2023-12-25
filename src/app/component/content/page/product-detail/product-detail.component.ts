import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  featuredImg: string = 'https://fakeimg.pl/520x452/';
  smallImgs: string[] = [
    'https://fakeimg.pl/520x452/',
    'http://fakeimg.pl/520x452/DA5930/',
    'http://fakeimg.pl/520x452/',
    'http://fakeimg.pl/520x452/DA5930/',
    'http://fakeimg.pl/520x452/DA5930/'
  ];

  changeFeaturedImage(newImg: string) {
    this.featuredImg = newImg;
  }
}
