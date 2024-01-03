import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'
import { product } from '../../../data-type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // image = ['../../../../assets/images/item-01.jpg']
  // products = [
  //   { id: 1, name: 'Product 1', description: 'Description 1', price: 19.99, link: '/product', imageUrl: this.image },
  // ];
  products: product[] = [];

  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(
    private productService: ProductService
  ) { }
  isNumber(value: any): boolean {
    return !isNaN(value);
  }

  storeProduct(productId: number, name: string, price: number, category: string, color: string, description: string, image: string): void {
    const productData = {
      name: name,
      price: price,
      category: category,
      color: color,
      description: description,
      image: image,
      id: productId
    };
    localStorage.setItem('Product', JSON.stringify(productData));
  }

  ngOnInit() {
    this.productService.productList().subscribe((data) => {
      this.products = data.map(product => {
        // product.price = parseFloat(product.price) as number;; // Convert to number
        // product.id = this.product;
        return product;
      });

      // this.products = data;
      // console.warn(product.id);

      this.productService.popularProducts().subscribe((data) => {
        this.popularProducts = data;
      });

      this.productService.trendyProducts().subscribe((data) => {
        this.trendyProducts = data;
      });
    });
  }

}
