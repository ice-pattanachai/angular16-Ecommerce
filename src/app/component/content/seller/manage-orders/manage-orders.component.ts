import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/component/service/auth.service';
import { ProductService } from 'src/app/component/service/product.service';
import { PurchaseOrders, product } from 'src/app/data-type';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: PurchaseOrders[] = [];
  products: product[] | undefined;
  showLogin = true;
  url = "http://localhost:3030/api/products_all/image?product_id="
  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObject = JSON.parse(userData);
      const token = userObject.token;
      if (token) {
        console.log('Sending request with token:', token);
        this.authService.authenticateToken(token).subscribe(
          (response: any) => {
            const status = response.status;
            console.log('API Response Status:', status);
            if (status === 'ok') {
              const decoded = response.decoded;
              if (decoded && decoded.roles !== undefined) {
                const roles = decoded.roles;
                if (typeof roles === 'string') {
                  const roleParts = roles.split('|');
                  const firstRole = roleParts[0];

                  if (firstRole === 'seller') {
                    this.showLogin = false;
                  } else {
                    this.showLogin = true;
                  }
                }
              }
            }
            this.navigateToHomePage();
          },
          (error) => {
            console.error('HTTP Error:', error);
            this.showLogin = true; // Set to true in case of error
            this.navigateToHomePage();
          }
        );
      }
    } else {
      this.navigateToHomePage();
    }

    this.productService.ordersList().subscribe((data) => {
      this.orders = data;
      const productIds = this.orders.map(order => order.product_id);
      // console.log(productIds);

      if (productIds) {
        forkJoin(productIds.map((productId: any) => this.productService.SearchProductId(productId))).subscribe((products) => {
          this.products = products as unknown as product[] | undefined;
        });
      }
    });
  }

  navigateToHomePage() {
    if (this.showLogin) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/manage_porders']);
    }
  }

  editOrders(productId: number): void {
    const productID = { id: productId, };
    localStorage.setItem('EditOrdersId', JSON.stringify(productID));
    this.router.navigate(['/edit-order']);
  }
}
