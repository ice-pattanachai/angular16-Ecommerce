import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { StorageService } from 'src/app/component/service/storage.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-cartgo',
  templateUrl: './cartgo.component.html',
  styleUrls: ['./cartgo.component.css']
})
export class CartgoComponent implements OnInit, AfterViewInit {
  isLoggedIn = false;
  roles: string[] = [];
  cartData: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'price', 'quantity', 'total', 'actions'];
  quantity: number = 1;
  product: any;
  totalPerItem: number[] = [];
  grandTotal: number = 0;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/user-login']);
    } else {
      this.isLoggedIn = true;
      this.loadCartData();
    }
  }

  loadCartData(): void {
    const cartDataString = localStorage.getItem('AddToCart');
    this.cartData = cartDataString ? JSON.parse(cartDataString) : [];
    this.cartData = this.cartData.map((item, index) => ({ ...item, position: index + 1 }));
    this.calculateTotals();
  }

  removeFromCart(productId: number): void {
    const cartDataString = localStorage.getItem('AddToCart');
    if (cartDataString) {
      let cartData = JSON.parse(cartDataString);
      const index = cartData.findIndex((item: any) => item.id === productId);

      if (index !== -1) {
        cartData.splice(index, 1);

        if (cartData.length === 0) {
          localStorage.removeItem('AddToCart');
          window.location.reload();
        } else {
          localStorage.setItem('AddToCart', JSON.stringify(cartData));
          this.loadCartData();
        }
      }
    }
  }

  calculateTotals(): void {
    this.totalPerItem = this.cartData.map(item => item.price * item.quantity);
    this.grandTotal = this.totalPerItem.reduce((acc, total) => acc + total, 0);
  }

}
