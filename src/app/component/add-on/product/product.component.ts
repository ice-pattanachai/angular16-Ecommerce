import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'
import { product } from '../../../data-type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  // image = ['../../../../assets/images/item-01.jpg']
  // products = [
  //   { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, link: '/product', imageUrl: this.image },
  // ];

  products: product[] = [];

  popularProducts:undefined|product[];
  trendyProducts:undefined | product[];

  constructor(
    private productService: ProductService
    ) {}


  ngOnInit() {
    // ปรับแก้โค้ดใน subscribe นี้
    this.productService.productList().subscribe((data) => {
      this.products = data;

      this.productService.popularProducts().subscribe((data) => {
        this.popularProducts = data;
      });

      this.productService.trendyProducts().subscribe((data) => {
        this.trendyProducts = data;
      });
    });
  }
}
