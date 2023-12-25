import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/service/auth.service';
import { StorageService } from 'src/app/component/service/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignIn: boolean = true;
  username : string = '';
  password_hash : string = '';
  mail : string = '';
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

  onClickSubmitLogin(){
    this.authService.login_user(this.username, this.password_hash).subscribe({
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

  onClickSubmitRegister(){
    this.authService.register_user(this.username, this.password_hash, this.mail).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        // window.alert("Register Success");
        this.roles = this.storageService.getUser().roles;

        this.reloadPage();
        Swal.fire({
          icon: 'success',
          title: 'register Success',
          text: 'register Success',
        });
        
      },
      error: err => {
        // console.log(err.error.message);
        // window.alert("Register Failed");
        window.alert(err.error.message);
        // window.alert(err.error.message || 'Register failed');
        // this.errorMessages.push(err.error.message || 'Login failed');
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  // onClickSubmitLogin() {
  //   if (this.username == "1" && this.password == "1") {
  //     this.router.navigate(["/product"])
  //   } else {
  //     window.alert("Login Failed");
  //   }
  // }

  // onClickSubmitRegister() {
  //   if (this.username == "1" && this.password_hash == "1" && this.email == "1") {
  //     window.alert("Register Success");
  //   } else {
  //     window.alert("Register Failed");
  //   }
  // }
}