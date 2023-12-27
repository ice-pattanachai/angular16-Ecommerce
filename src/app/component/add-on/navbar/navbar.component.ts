import { Component, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userName: string = "";
  sellerName: string = "";
  badgeCount: number = 9;
  menuType: string = 'default';

  constructor(private route: Router) { }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  isNavbarVisible = true;
  prevScrollpos = window.pageYOffset;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollpos > currentScrollPos) {
      // Scroll up, show navbar
      this.isNavbarVisible = true;
    } else {
      // Scroll down, hide navbar
      this.isNavbarVisible = false;
    }

    this.prevScrollpos = currentScrollPos;
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

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id);
        }
        else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

}
