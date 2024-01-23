import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { ProductService } from 'src/app/component/service/product.service';
import { PurchaseOrders, User, product } from 'src/app/data-type';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {
  userall: User[] | undefined;
  ordersall: PurchaseOrders[] | undefined;
  aa!: PurchaseOrders[];
  // orders: PurchaseOrders[] | undefined;
  showLogin = true;
  products: product[] | undefined;
  productIds: any;
  orders: any;
  isLoggedIn = false;
  url = "http://localhost:3030/api/products_all/image?product_id="
  images: any;
  modalService: any;
  popupModal: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.userall = this.route.snapshot.data['userall'] as User[];
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/user-login']);
    } else {
      this.isLoggedIn = true;

    }
    if (userData) {
      const userObject = JSON.parse(userData);
      const userId = userObject.userId;
      if (userId) {
        this.authService.userList(userId).subscribe((userData) => {
          if (Array.isArray(userData)) {
            this.userall = userData;
          } else {
            this.userall = [userData];
          }
          // console.log(userData);

        });
      }

      if (userId) {
        this.productService.purchase_orders_userid(userId).subscribe((Data) => {
          if (Array.isArray(Data)) {
            this.ordersall = Data;
          } else {
            this.ordersall = [Data];
          }
          const order = this.ordersall[0];
          const orderall = order.orders;
          console.log(orderall);

          const productIds = orderall.map((item: { product_id: any; }) => item.product_id);
          const productId = productIds[0];

          if (productId) {
            forkJoin(productIds.map((productId: any) => this.productService.sellerProductId(productId))).subscribe((products) => {
              this.products = products as product[] | undefined;
            });
          }
          this.aa = orderall;

        });
      }
    }
  }

  isMenuhistor = true;
  toggleUserOrderhistory() {
    this.isMenuhistor = !this.isMenuhistor;
  }
}

