import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/component/service/auth.service';
import { ProductService } from 'src/app/component/service/product.service';
import { PurchaseOrders, Receipts, product } from 'src/app/data-type';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  url = "http://localhost:3030/api/products_all/image?product_id="
  showLogin = true;
  receipts: Receipts[] | undefined; //ใบคำสั่งซื้อ
  orders: PurchaseOrders[] = [];  // item ที่สั่งซื้อ ทั้งหมด
  Ordernumber: Receipts[] | undefined;
  ReceiptObject: Receipts[] | undefined;
  products: product[] | undefined;
  barcode = "https://barcode.tec-it.com/barcode.ashx?data="
  barcodeend = "&code=Code128&translate-esc=on"

  grandTotal: number = 0;
  totalPerItem: number[] = [];

  popupModalView: any;

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
        this.authService.authenticateToken(token).subscribe(
          (response: any) => {
            const status = response.status;
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

    this.productService.SearchReceiptAll().subscribe((data) => {
      this.receipts = data;
      console.log('⚡⚡⚡', 'productIds = ', this.receipts);
    });
  }

  navigateToHomePage() {
    if (this.showLogin) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/receip']);
    }
  }

  receiptsview: any
  viewreceipts(receipts: any) {
    this.receiptsview = receipts
    console.log('⚡⚡⚡', 'receiptsview = ', this.receiptsview);
    const purchaseOrderIds = this.receiptsview.purchase_orders.flatMap((order: any) => order.product_id);
    console.log('purchase_order_ids:', purchaseOrderIds);

    if (purchaseOrderIds) {
      const productId = purchaseOrderIds
      console.log('⚡⚡⚡', 'purchaseOrderIds', purchaseOrderIds);
      forkJoin(productId.map((productId: any) => this.productService.SearchProductId(productId))).subscribe((products) => {
        this.products = products as unknown as product[] | undefined;
        console.log('⚡⚡⚡', 'AAAAAA', this.products);
      });
    }
    this.calculateTotals()
  }

  totalall: number | undefined
  calculateTotals(): void {
    if (this.receiptsview && this.receiptsview.purchase_orders) {
      let totalPriceSum = 0;
      this.receiptsview.purchase_orders.forEach((order: any) => {
        totalPriceSum += order.total_price;
      });
      console.log('Total price sum:', totalPriceSum);
      this.totalall = totalPriceSum
    } else {
      console.log('No purchase orders found in the receiptsview');
    }
  }

  isMenuOpen = true;
  isMenuDetail = false
  toggleUserisMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuDetail = !this.isMenuDetail;
  }
  isMenuhistor = true;
  toggleUserOrderhistory() {
    this.isMenuhistor = !this.isMenuhistor;
  }

}
