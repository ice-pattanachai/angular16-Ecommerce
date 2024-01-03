import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/component/service/auth.service';
import { StorageService } from 'src/app/component/service/storage.service';

@Component({
  selector: 'app-cartgo',
  templateUrl: './cartgo.component.html',
  styleUrls: ['./cartgo.component.css']
})
export class CartgoComponent {
  isLoggedIn = false;
  roles: string[] = [];

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
}
