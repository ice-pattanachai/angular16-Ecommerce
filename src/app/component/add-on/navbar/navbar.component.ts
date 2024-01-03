import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service'


@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isNavbarVisible: boolean = true;
  userName: string = "";
  sellerName: string = "";
  // badgeCount: string = '1';
  badgeCount: string | null = null;
  menuType: string = 'default';

  constructor(
    private route: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.AddToCart();
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObject = JSON.parse(userData);
      const token = userObject.token;
      if (token) {
        // console.log('Sending request with token:', token);
        this.authService.authenticateToken(token)
          .subscribe((response: any) => {
            const status = response.status;
            // console.log('API Response Status:', status);
            if (status === 'ok') {
              const decoded = response.decoded;
              if (decoded && decoded.roles !== undefined) {
                const roles = decoded.roles;
                if (typeof roles === 'string') {
                  const roleParts = roles.split('|');
                  const firstRole = roleParts[0];

                  if (firstRole === 'seller') {
                    this.menuType = 'seller';
                  } else if (firstRole === 'user') {
                    this.menuType = 'user';
                  } else {
                    this.menuType = 'default';
                  }
                } else {
                  console.error('Invalid roles format:', roles);
                  this.menuType = 'error';
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Invalid roles format',
                  });
                }
              } else {
                console.error('Error: Roles is undefined');
                this.menuType = 'error';
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Roles is undefined',
                });
              }
            } else {
              console.error('Error response from API:', response);
              const errorMessage = response.message || 'Failed to Authenticate';
              console.error(`Error: ${errorMessage}`);
              this.menuType = 'error';
              let displayMessage = errorMessage;
              if (response.status === 'error' && response.message === 'jwt expired') {
                displayMessage = 'Please log in again.';
                this.authService.removeItem()
                Swal.fire({
                  icon: 'warning',
                  title: 'Connection timed out',
                  text: displayMessage,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                    // this.route.navigate(['/user-login']);
                  }
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: errorMessage,
                })
                  .then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
              }
            }
            if (response.status === 'error' && response.message === 'Connection timed out') {
              console.log('Token has expired. Logging out...');
              this.authService.removeItem()
              this.route.navigate(['/']);
            }
          },
            error => {
              console.error('HTTP Error:', error);
              this.menuType = 'error';
              Swal.fire({
                icon: 'error',
                title: 'HTTP Error',
                text: 'Failed to communicate with the server',
              });
            });
      } else {
        console.error('Error: Token is missing');
      }
    }
  }

  logout() {
    this.authService.removeItem()
    this.route.navigate(['/'])
    window.location.reload();
  }

  isMenuOpen1 = false;
  toggleMenu1() {
    this.isMenuOpen1 = !this.isMenuOpen1;
  }
  closeMenu1() {
    this.isMenuOpen1 = false;
  }

  isMenuOpen2 = false;
  toggleMenu2() {
    this.isMenuOpen2 = !this.isMenuOpen2;
  }
  closeMenu2() {
    this.isMenuOpen2 = false;
  }

  isMenuOpen3 = false;
  toggleMenu3() {
    this.isMenuOpen3 = !this.isMenuOpen3;
  }
  closeMenu3() {
    this.isMenuOpen3 = false;
  }


  AddToCart(): void {
    const existingCartData = localStorage.getItem('AddToCart');
    if (existingCartData) {
      // ให้แสดง "สัญญาลัก" ใน <span class="badge">
      this.badgeCount = "!";
    } else {
      this.badgeCount = null;
    }
  }
}
