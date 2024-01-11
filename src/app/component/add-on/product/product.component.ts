import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service'
import { product } from '../../../data-type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: product[] = [];
  productImages: { [key: number]: string } = {};
  url = "http://localhost:3030/api/products_all/image?product_id="

  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  http: any;
  product: any;

  constructor(
    private productService: ProductService
  ) { }

  isNumber(value: any): boolean {
    return !isNaN(value);
  }

  storeProduct(
    id: number,
    product_name: string,
    product_status: boolean,
    price_per_piece: number,
    stock_quantity: number,
    image: string,
  ): void {
    const productData = {
      id: id,
      name: product_name,
      status: product_status,
      price: price_per_piece,
      quantity: stock_quantity,
      image: image,

    };
    localStorage.setItem('Product', JSON.stringify(productData));
  }
  ngOnInit() {
    // this.productService.productList().subscribe((data) => {
    //   this.products = data;
    // });
    this.productService.productList().subscribe((data) => {
      this.products = data.filter((product) => product.product_status === true && product.price_per_piece !== 0 && product.stock_quantity !== 0);
      // this.products = data.filter((product) => product.price_per_piece !== 0)
      // this.products = data.filter((product) => product.stock_quantity !== 0);
    });

    this.productService.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }
}

