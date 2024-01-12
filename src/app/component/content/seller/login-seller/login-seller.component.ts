import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/service/auth.service';
import { StorageService } from 'src/app/component/service/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-seller',
  templateUrl: './login-seller.component.html',
  styleUrls: ['./login-seller.component.css']
})
export class LoginSellerComponent {

  username: string = '';
  password_hash: string = '';
  name: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  errorMessages: any;

  images: string[] = [
    "../../../../../assets/images/login.png",
  ];

  isSignIn: boolean = true;
  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
  }

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.userAuthReload();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onClickSubmitLogin() {
    this.authService.login_seller(this.username, this.password_hash).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        if (data.token) {
          this.storageService.saveToken(data.token);
          this.router.navigate(['/home']);
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            text: 'Login Success',
            showConfirmButton: false,
            timer: 1000,
          });
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Login failed',
          showConfirmButton: false,
          timer: 1000,
        });
        this.isLoginFailed = true;
        console.log(err.error.message);
      }
    });
  }


  onClickSubmitRegister() {
    this.authService.register_seller(this.username, this.password_hash, this.name).subscribe({
      next: data => {
        this.storageService.registerUser(data);
        this.reloadPage();
        Swal.fire({
          icon: 'success',
          title: 'register Success',
          text: 'register Success',
        });
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
