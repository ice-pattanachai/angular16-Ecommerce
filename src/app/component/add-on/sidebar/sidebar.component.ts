import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { StorageService } from 'src/app/component/service/storage.service';
import { User } from 'src/app/data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  menuType = ''
  userall: User[] | undefined;
  sellerall: User[] | undefined;
  user: any;
  listMenu: any[] = []
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private route: Router,
  ) {
    this.Main()
  }

  Main() {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const loginSubscr = this.authService.authenticateToken(token).subscribe((response: any) => {
        if (response.status === 200) {
          const decoded = response.decoded;
          if (decoded && decoded.roles !== undefined) {
            const roles = decoded.roles;
            let listMenu: any[] = []
            if (typeof roles === 'string') {
              const roleParts = roles.split('|');
              const firstRole = roleParts[0];
              if (firstRole === 'seller') {
                console.log(listMenu);
                this.menuType = 'seller';
              } else if (firstRole === 'user') {
                this.menuType = 'user';
              } else {
                this.router.navigate(['/user-login']);
              }
            }
          }
        } else {
          // console.log('else', result);
          // this.authService.getLogout()
        }
      });
    }
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/user-login']);
    } else {
      this.isLoggedIn = true;
    }
    if (userData) {
      const userObject = JSON.parse(userData);
      const token = userObject.token;
      const userId = userObject.userId;
      if (userId) {
        this.authService.userList(userId).subscribe((userData) => {
          if (Array.isArray(userData)) {
            this.userall = userData;
          } else {
            this.userall = [userData];
          }
        });
      }
      if (userId) {
        this.authService.sellerList(userId).subscribe((userData) => {
          if (Array.isArray(userData)) {
            this.sellerall = userData;
          } else {
            this.sellerall = [userData];
          }
        });
      }
      // if (token) {
      //   this.authService.authenticateToken(token)
      //     .subscribe((response: any) => {
      //       const status = response.status;
      //       if (status === 200) {
      //         const decoded = response.decoded;
      //         if (decoded && decoded.roles !== undefined) {
      //           const roles = decoded.roles;
      //           if (typeof roles === 'string') {
      //             const roleParts = roles.split('|');
      //             const firstRole = roleParts[0];
      //             if (firstRole === 'seller') {
      //               this.menuType = 'seller';
      //             } else if (firstRole === 'user') {
      //               this.menuType = 'user';
      //             } else {
      //               this.router.navigate(['/user-login']);
      //             }
      //           } else {
      //             console.error('Invalid roles format:', roles);
      //             this.menuType = 'error';
      //             Swal.fire({
      //               icon: 'error',
      //               title: 'Error',
      //               text: 'Invalid roles format',
      //             });
      //           }
      //         } else {
      //           console.error('Error: Roles is undefined');
      //           this.menuType = 'error';
      //           Swal.fire({
      //             icon: 'error',
      //             title: 'Error',
      //             text: 'Roles is undefined',
      //           });
      //         }
      //       }
      //     },
      //     );
      // }
    }
  }

  logoutSwal() {
    Swal.fire({
      title: 'Do you want to log out?',
      text: "To log out, press Yes. If you don't want to, press Cancel.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'cancel!',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Log out successful.',
          text: 'successful!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.logout();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
      }
    });
  }

  logout() {
    this.authService.removeItem()
    this.route.navigate(['/'])
    window.location.reload();
  }

  navigateToPassword() {
    this.router.navigate(['/setting/password']);
  }
}
