import { Component } from '@angular/core';
import { NgxTurnstileService } from 'ngx-turnstile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public recaptchaKey = '';
  public isCaptchaResolved = false;
  public captchaResponse: string | null = null;

  constructor(private turnstileService: NgxTurnstileService, private router: Router) { }

  onCaptchaResolved(response: string | null): void {
    if (response !== null) {
      console.log('reCAPTCHA resolved:', response);
      this.isCaptchaResolved = true;
      this.captchaResponse = response;
    } else {
      console.error('reCAPTCHA response is null');
    }
  }

  private excludedUrls_navbar: Set<string> = new Set(['/user-login', '/seller-login']);
  shouldShowNavbar(): boolean {
    return !this.excludedUrls_navbar.has(window.location.pathname);
  }

  private excludedUrls_sidebar: Set<string> = new Set(['/setting', '/setting/password']);
  shouldShowSidebar(): boolean {
    return this.excludedUrls_sidebar.has(window.location.pathname);
  }
}