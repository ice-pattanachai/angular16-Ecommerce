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
        this.getProduct(productId);
      }
    }
  }

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(productId: number, name: string, price: number, category: string, color: string, description: string, image: string): void {
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

    const existingProduct = cartData.find((item: any) => item.id === productId);
    if (existingProduct) {
      // ถ้ามีสินค้านี้อยู่ในตะกร้าแล้ว
      existingProduct.quantity += this.quantity;
      localStorage.setItem('AddToCart', JSON.stringify(cartData));
    } else {
      const productData = {
        name: name,
        price: price,
        category: category,
        color: color,
        description: description,
        image: image,
        id: productId,
        quantity: this.quantity
      };
      cartData.push(productData);
      localStorage.setItem('AddToCart', JSON.stringify(cartData));
      Swal.fire({
        icon: 'success',
        title: 'Add To Cart',
        text: 'Successfully',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

  handleQuantity(val: string) {
    if (this.quantity < 20 && val === 'plus') {
      this.quantity += 1;
    } else if (this.quantity > 1 && val === 'min') {
      this.quantity -= 1;
    }
  }
  // removeFromCart(productId: number): void {
  //   const existingCartData = localStorage.getItem('AddToCart');
  //   if (existingCartData) {
  //     let cartData = JSON.parse(existingCartData);
  //     const productIndex = cartData.findIndex((item: any) => item.id === productId);

  //     if (productIndex !== -1) {
  //       cartData.splice(productIndex, 1);
  //       localStorage.setItem('AddToCart', JSON.stringify(cartData));
  //     } else {
  //     }
  //   }
  // }
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
        // ไม่พบสินค้าที่ต้องการลบ
      }
    }
  }
}
