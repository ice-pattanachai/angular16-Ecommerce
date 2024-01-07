import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { ProductService } from 'src/app/component/service/product.service';
import { product } from 'src/app/data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
  url = "http://172.20.1.120:3030/api/products_all/image?product_id="
  showLogin = true;
  productId: number | undefined;
  id: number = 0;
  product: product | undefined;

  newPrice: number | undefined;
  newQuantity: number | undefined;
  newStatus: boolean | undefined;
  addProductMessage: string | undefined;
  product_name: string = '';
  description: string = '';
  price_per_piece: number = 0;
  stock_quantity: number = 0;
  image: File | undefined;
  categories: any[] = [{ category_name: '', description: '' }];
  selectedProductStatus: boolean = false;


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

    const productID = localStorage.getItem('EditProductId');
    if (productID) {
      const productObject = JSON.parse(productID);
      const productId = productObject.id;
      if (productId) {
        this.productService.productList().subscribe((products) => {
          this.product = products.find(product => product.id === productId);
          if (this.product) {
            this.id = this.product.id;
            this.product_name = this.product.product_name;
            this.description = this.product.description;
            this.selectedProductStatus = this.product.product_status;
            this.price_per_piece = this.product.price_per_piece;
            this.stock_quantity = this.product.stock_quantity;
          }
        });
      }
    }
  }

  navigateToHomePage() {
    if (this.showLogin) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/edit-products']);
    }
  }

  updateProduct() {
    const formData = new FormData();
    const productIdObj = localStorage.getItem('EditProductId');
    if (productIdObj) {
      const parsedProductId = JSON.parse(productIdObj);
      const productId = parsedProductId.id;
  
      formData.append('id', productId.toString());
    }
    
    formData.append('product_name', this.product_name);
    formData.append('description', this.description);
    formData.append('price_per_piece', this.price_per_piece.toString());
    formData.append('stock_quantity', this.stock_quantity.toString());
    // formData.append('image', this.image as Blob);
    formData.append('product_status', this.selectedProductStatus.toString());
    // formData.append('categories', JSON.stringify(this.categories));

    this.productService.updateProduct(formData).subscribe(
      (response) => {
        // ทำตามที่คุณต้องการเมื่อ update สำเร็จ
        console.log('Product updated successfully:', response);
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
        console.error('Error updating product:', error);
        // ทำตามที่คุณต้องการเมื่อเกิดข้อผิดพลาด
      }
    );
  }
}
