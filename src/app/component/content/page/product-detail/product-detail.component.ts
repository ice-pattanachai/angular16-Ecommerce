import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  selectedProductId: number = 0;
  featuredImg: string = 'https://fakeimg.pl/520x452/';
  smallImgs: string[] = [
    'https://fakeimg.pl/520x452/',
    'http://fakeimg.pl/520x452/DA5930/',
    'http://fakeimg.pl/520x452/',
    'http://fakeimg.pl/520x452/DA5930/',
    'http://fakeimg.pl/520x452/DA5930/'
  ];

  products = [
    { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, link: '/product', imageUrl: ['../../../../assets/images/item-01.jpg'] },
    { id: 2, name: 'Product 2', description: 'Description 1', price: 19.99, link: '/product', imageUrl: ['../../../../assets/images/item-01.jpg'] }
  ];

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Subscribe to the route parameters to get the product ID from the URL
    this.activeRoute.params.subscribe(params => {
      // Use the product ID from the URL to select the product
      this.selectedProductId = +params['id']; // The '+' is used to convert the string to a number

      // Update other details based on the selected product
      this.featuredImg = this.products[this.selectedProductId - 1].imageUrl[0];
    });
  }

  changeFeaturedImage(newImg: string) {
    this.featuredImg = newImg;
  }
}
