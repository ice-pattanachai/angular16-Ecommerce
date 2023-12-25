import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  image = ['../../../../assets/images/item-01.jpg']
  products = [
    { name: 'Product 1', description: 'Description 1', price: 19.99 , link:'' , imageUrl: this.image},
    { name: 'Product 1', description: 'Description 1', price: 19.99 , link:'' , imageUrl: this.image},
  ];
}
