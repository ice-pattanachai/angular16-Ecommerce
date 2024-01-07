import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/component/service/product.service';
import { product } from 'src/app/data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  url = "http://172.20.1.120:3030/api/products_all/image?product_id="
  product: product | undefined;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    const userData = localStorage.getItem('Product');

    if (userData) {
      const userObject = JSON.parse(userData);
      const productId = userObject.id;

      if (productId) {
        // this.getProduct(productId);
        this.productService.productList().subscribe((products) => {
          // ค้นหา product ที่มี id ตรงกันใน productList
          this.product = products.find(product => product.id === productId);
        });
      }
    }
  }

  // getProduct(id: string) {
  //   this.productService.getProduct(id).subscribe((data) => {
  //     this.product = data;
  //   });
  // }

  // addToCart(
  //   productId: number,
  //   product_name: string,
  //   price: number,
  //   category: string,
  //   color: string,
  //   description: string,
  //   image: string
  // ): void {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Login',
  //       text: 'Log in before using',
  //       showConfirmButton: false,
  //       timer: 1000,
  //     }).then(() => {
  //       this.router.navigate(['/user-login']);
  //     });
  //     return;
  //   }

  //   const existingCartData = localStorage.getItem('AddToCart');
  //   let cartData = existingCartData ? JSON.parse(existingCartData) : [];

  //   const existingProduct = cartData.find((item: any) => item.id === productId);
  //   if (existingProduct) {
  //     existingProduct.quantity += this.quantity;
  //     localStorage.setItem('AddToCart', JSON.stringify(cartData));
  //   } else {
  //     const productData = {
  //       name: name,
  //       price: price,
  //       category: category,
  //       color: color,
  //       description: description,
  //       image: image,
  //       id: productId,
  //       quantity: this.quantity
  //     };
  //     cartData.push(productData);
  //     localStorage.setItem('AddToCart', JSON.stringify(cartData));
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Add To Cart',
  //       text: 'Successfully',
  //       showConfirmButton: false,
  //       timer: 1000,
  //     });
  //   }
  // }
  addToCart(product: product): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      Swal.fire({
        icon: 'warning',
        title: 'Login',
        text: 'Log in before using',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        this.router.navigate(['/user-login']);
      });
      return;
    }
  
    const existingCartData = localStorage.getItem('AddToCart');
    let cartData = existingCartData ? JSON.parse(existingCartData) : [];
  
    const existingProduct = cartData.find((item: any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      const productData = {
        id: product.id,
        product_name: product.product_name,
        description: product.description,
        product_status: product.product_status,
        price_per_piece: product.price_per_piece,
        stock_quantity: product.stock_quantity,
        images: product.images,
        quantity: this.quantity
      };
      cartData.push(productData);
      Swal.fire({
        icon: 'success',
        title: 'Add To Cart',
        text: 'Successfully',
        showConfirmButton: false,
        timer: 1000,
      }).then((result) => {
        window.location.reload();
      });
    }
  
    localStorage.setItem('AddToCart', JSON.stringify(cartData));
  }

  handleQuantity(val: string) {
    if (this.quantity < 20 && val === 'plus') {
      this.quantity += 1;
    } else if (this.quantity > 1 && val === 'min') {
      this.quantity -= 1;
    }
  }

  removeFromCart(productId: number): void {
    const existingCartData = localStorage.getItem('AddToCart');
    if (existingCartData) {
      let cartData = JSON.parse(existingCartData);
      const productIndex = cartData.findIndex((item: any) => item.id === productId);
      if (productIndex !== -1) {
        cartData.splice(productIndex, 1);
        if (cartData.length === 0) {
          localStorage.removeItem('AddToCart');
          window.location.reload();
        } else {
          localStorage.setItem('AddToCart', JSON.stringify(cartData));
        }
      } else {

      }
    }
  }
}
