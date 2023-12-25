import { Component, OnInit } from '@angular/core';
import { NgxTurnstileService } from 'ngx-turnstile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // ใส่ key ของ reCAPTCHA ที่ได้จาก Google reCAPTCHA
  // public recaptchaKey = '0x4AAAAAAANQPdgDQYKL13BT';

  // constructor(private turnstileService: NgxTurnstileService, private router: Router) {}

  // onCaptchaResolved(response: string | null): void {
  //   if (response !== null) {
  //     console.log('', response);
  //     this.router.navigate(['']);
  //   } else {
  //     console.error('reCAPTCHA response is null');
  //   }
  // }
  public recaptchaKey = '0x4AAAAAAANQPdgDQYKL13BT';
  public isCaptchaResolved = false;
  public captchaResponse: string | null = null;

  constructor(private turnstileService: NgxTurnstileService, private router: Router) {}

  onCaptchaResolved(response: string | null): void {
    if (response !== null) {
      console.log('reCAPTCHA resolved:', response);
      this.isCaptchaResolved = true;
      this.captchaResponse = response;
    } else {
      console.error('reCAPTCHA response is null');
    }
  }
}