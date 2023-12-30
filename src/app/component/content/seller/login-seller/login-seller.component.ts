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
  isSignIn: boolean = true;
  username: string = '';
  password_hash: string = '';
  mail: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  errorMessages: any;

  images: string[] = [
    "../../../../../assets/images/login.png",
  ];

  toggleSignIn() {
    this.isSignIn = !this.isSignIn;
  }

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
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
          this.router.navigate(['/shop']);
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            text: 'Login Success',
          });
        }

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // this.reloadPage();

      },
      // error: err => {
      //   window.alert(err.error.message || 'Login failed');
      //   this.isLoginFailed = true;
      //   console.log(err.error.message);
      // }
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message || 'Login failed',
        });
        this.isLoginFailed = true;
        console.log(err.error.message);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
