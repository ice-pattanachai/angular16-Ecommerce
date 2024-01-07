import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import {HttpClient} from '@angular/common/http'
import { ProductService } from 'src/app/component/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  showLogin = true;
  addProductMessage: string | undefined;

  product_name: string = '';
  description: string = '';

  price_per_piece: number = 0;
  stock_quantity: number = 0;
  image: File | undefined;
  categories: any[] = [{ category_name: '', description: '' }];

  selectedProductStatus: boolean = false;
  product_status: boolean = false;
  isChecked: boolean = false;
  constructor(
    private router: Router, 
    private authService: AuthService ,
    private http:HttpClient,
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
  }

  navigateToHomePage() {
    if (this.showLogin) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/add-proders']);
    }
  }
  
  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  addProduct() {
    const formData = new FormData();
    formData.append('product_name', this.product_name);
    formData.append('description', this.description);
    formData.append('price_per_piece', this.price_per_piece.toString());
    formData.append('stock_quantity', this.stock_quantity.toString());
    formData.append('image', this.image as Blob);
    formData.append('product_status', this.selectedProductStatus.toString());

    formData.append('categories', JSON.stringify(this.categories));


    window.location.reload();
    this.productService.addProduct(formData).subscribe(
      (response: any) => {
        this.addProductMessage = 'Product added successfully!';
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added successfully!',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        // ดำเนินการเมื่อเกิดข้อผิดพลาดจาก API
        console.error('HTTP Error:', error);
        this.addProductMessage = 'Error adding product. Please try again.';
      }
    );
  }
}
