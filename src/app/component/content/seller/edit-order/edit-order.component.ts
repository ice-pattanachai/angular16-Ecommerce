import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { ProductService } from 'src/app/component/service/product.service';
import { PurchaseOrders, product } from 'src/app/data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  url = "http://172.20.1.120:3030/api/products_all/image?product_id="
  showLogin = true;
  productId: number | undefined;
  product: product | undefined;
  order: PurchaseOrders | undefined;
  errorMessage: any;
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

    const orderID = localStorage.getItem('EditOrdersId');
    if (orderID) {
      const oderObject = JSON.parse(orderID);
      const orderId = oderObject.id;
      if (orderId) {
        this.productService.ordersList().subscribe((products) => {
          this.order = products.find(product => product.id === orderId);
          if (this.order) {
            this.id = this.order.id;
            this.addresses_name = this.order.addresses_name;
            this.address = this.order.address;
            this.status = this.order.status;
            this.parcel_number = this.order.parcel_number;
            this.confirm_payment = this.order.confirm_payment;
          }
        });
      }
    }
  }
  id: number = 0;
  addresses_name: string = '';
  address: string = '';
  status: boolean = false;
  parcel_number: string = '';
  confirm_payment: boolean = false;

  navigateToHomePage() {
    if (this.showLogin) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/edit-order']);
    }
  }

  onClickEditOder() {
    this.productService.edit_Oders(
      this.id,
      this.addresses_name,
      this.status,
      this.parcel_number,
      this.confirm_payment,
    ).subscribe({
      next: data => {
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Edit Success',
            text: 'Edit Success',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            this.reloadPage();
          });
        } else {
          window.alert('No data received.'); // หรือทำการจัดการตามที่คุณต้องการ
        }
      },
      error: err => {
        window.alert(err.error.message);
        this.errorMessage = err.error.message;
      }
    });
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['/edit-order']);
  }
}
