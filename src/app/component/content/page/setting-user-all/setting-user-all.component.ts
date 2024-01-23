import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { StorageService } from 'src/app/component/service/storage.service';
import { User } from 'src/app/data-type';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting-user-all',
  templateUrl: './setting-user-all.component.html',
  styleUrls: ['./setting-user-all.component.css']
})
export class SettingUserAllComponent implements OnInit {
  isLoggedIn = false;
  menuType = ''
  userall: User[] | undefined;
  sellerall: User[] | undefined;
  user: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
  ) { }

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
          console.log(userData);
        });
      }
      if (userId) {
        this.authService.sellerList(userId).subscribe((userData) => {
          if (Array.isArray(userData)) {
            this.sellerall = userData;
          } else {
            this.sellerall = [userData];
          }
          console.log(userData);
        });
      }

      if (token) {
        this.authService.authenticateToken(token)
          .subscribe((response: any) => {
            const status = response.status;
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
                    this.router.navigate(['/user-login']);
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
            }
          },
          );
      }
    }
  }
  fullname: string = '';
  address: string = '';
  postalcode: number = 0;
  phone: string = '';
  // user_id: number = 0;
  isDataValid: boolean = false;
  onClickSubmitAssresses(user_id: number) {
    if (!this.fullname || !this.address || !this.postalcode || !this.phone || !user_id) {
      console.log('Please fill in all fields');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    this.authService.add_Assresses(this.fullname, this.address, this.postalcode, this.phone, user_id).subscribe({
      next: data => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Success',
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          this.reloadPage()
        });
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  checkpassword_hash: string = '';
  newpassword_hash: string = '';
  checknewpassword_hash: string = '';
  onClickEditUser(id: number, name: string, mail: string, fullname: string) {
    this.authService.edit_User(id, mail, name, fullname,).subscribe({
      next: data => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'User information has been updated successfully.',
        });
        window.location.reload();
      },
      error: err => {
        console.error('Error editing user:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to edit user information. Please try again.',
        });
      }
    });

  }

  onClickEditUserPassword(id: number, checkpassword_hash: string) {
    if (this.checkpassword_hash === '') {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    this.authService.checkPasswordUser(id, checkpassword_hash).subscribe((response) => {
      if (response.message === 'The password is correct.') {
        const isMatch = this.newpassword_hash === this.checknewpassword_hash;
        if (isMatch) {
          if (isMatch && this.newpassword_hash !== checkpassword_hash) {
            this.authService.edit_User_Password(id, this.newpassword_hash).subscribe({
              next: data => {
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: 'User information has been updated successfully.',
                });
                window.location.reload();
              },
              error: err => {
                console.error('Error editing user:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Failed to edit user information. Please try again.',
                });
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'error',
              text: 'ไม่ผ่าน',
            });
            console.log('ไม่ผ่าน');
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'ไม่ตรง',
          });
          console.log('ไม่ตรงกัน');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: response.message,
        });
      }
    });
  }

  onClickDeleteAssresses(id: number) {
    Swal.fire({
      icon: 'warning',
      title: 'Want to delete this address?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.delete_Assresses(id).subscribe({
          next: data => {
            this.reloadPage();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              showConfirmButton: false,
            });
          },
        });
      }
    })
  }

  checkpasswordseller_hash: string = '';
  newpasswordseller_hash: string = '';
  checknewpasswordseller_hash: string = '';
  onClickEditSeller(id: number, name: string) {
    this.authService.edit_seller(id, name,).subscribe({
      next: data => {
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'User information has been updated successfully.',
        });
        window.location.reload();
      },
      error: err => {
        console.error('Error editing user:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to edit user information. Please try again.',
        });
      }
    });
  }
  onClickEditSellerPassword(id: number, checkpasswordseller_hash: string) {
    if (this.checkpasswordseller_hash === '') {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    this.authService.checkPasswordSeller(id, checkpasswordseller_hash).subscribe((response) => {
      if (response.message === 'The password is correct.') {
        const isMatch = this.newpasswordseller_hash === this.checknewpasswordseller_hash;
        if (isMatch) {
          if (isMatch && this.newpasswordseller_hash !== checkpasswordseller_hash) {
            this.authService.edit_seller_Password(id, this.newpasswordseller_hash).subscribe({
              next: data => {
                Swal.fire({
                  icon: 'success',
                  title: 'success',
                  text: 'User information has been updated successfully.',
                });
                window.location.reload();
              },
              error: err => {
                console.error('Error editing user:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Failed to edit user information. Please try again.',
                });
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'error',
              text: 'ไม่ผ่าน',
            });
            console.log('ไม่ผ่าน');
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'ไม่ตรง',
          });
          console.log('ไม่ตรงกัน');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: response.message,
        });
      }
    });
  }

  isMenuOpenAddressUser = true;
  toggleAddressUser() {
    this.isMenuOpenAddressUser = !this.isMenuOpenAddressUser;
    this.isMenuOpenSettingUser = false;
    this.isMenuOpenOrderhistorUser = false
  }
  isMenuOpenSettingUser = false;
  toggleSettingUser() {
    this.isMenuOpenSettingUser = !this.isMenuOpenSettingUser;
    this.isMenuOpenAddressUser = false;
    this.isMenuOpenOrderhistorUser = false
  }

  isMenuOpenOrderhistorUser = false;
  toggleUserOrderhistory() {
    this.isMenuOpenOrderhistorUser = !this.isMenuOpenOrderhistorUser;
    this.isMenuOpenSettingUser = false;
    this.isMenuOpenAddressUser = false;
  }

  isMenuOpenSettingSeller = true;
  toggleSettingSeller() {
    this.isMenuOpenSettingSeller = !this.isMenuOpenSettingSeller;
  }
}
