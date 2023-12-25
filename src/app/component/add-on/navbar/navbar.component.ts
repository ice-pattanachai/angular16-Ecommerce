import { Component, HostBinding, HostListener } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
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

  badgeCount : number = 9;
}
