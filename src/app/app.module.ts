import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/add-on/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Error404Component } from './component/add-on/error/error404/error404.component';
import { HomeComponent } from './component/content/page/home/home.component';
import { AboutComponent } from './component/content/page/about/about.component';
import { CatErrorComponent } from './component/add-on/error/cat-error/cat-error.component';
import { LoginComponent } from './component/content/user/login/login.component';
import { NgxTurnstileModule } from 'ngx-turnstile';
import { BackToTopComponent } from './component/add-on/back-to-top/back-to-top.component';
import { ShopComponent } from './component/content/page/shop/shop.component';
import { ImageCarouselComponent } from './component/add-on/image-carousel/image-carousel.component';
import { ProductComponent } from './component/add-on/product/product.component';
import { LoginSellerComponent } from './component/content/seller/login-seller/login-seller.component';
import { EditProductsComponent } from './component/content/seller/edit-products/edit-products.component';
import { ManagePordersSellerComponent } from './component/content/seller/manage-porders-seller/manage-porders-seller.component';
import { BuyProductUserComponent } from './component/content/user/buy-product-user/buy-product-user.component';
import { PaymentComponent } from './component/content/user/payment/payment.component';
import { FooterComponent } from './component/add-on/footer/footer.component';
import { SidebarComponent } from './component/add-on/sidebar/sidebar.component';
import { ImageCarouselIIComponent } from './component/add-on/image-carousel-ii/image-carousel-ii.component';
import { PaginationComponent } from './component/add-on/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductDetailComponent } from './component/content/page/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CartgoComponent } from './component/content/page/cartgo/cartgo.component';
import { MatTableModule } from '@angular/material/table';
import { ProductsForSaleComponent } from './component/content/seller/products-for-sale/products-for-sale.component';
import { AddProductsComponent } from './component/content/seller/add-products/add-products.component';
import { SettingsComponent } from './component/content/seller/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Error404Component,
    HomeComponent,
    AboutComponent,
    CatErrorComponent,
    LoginComponent,
    BackToTopComponent,
    ShopComponent,
    ImageCarouselComponent,
    ProductComponent,
    LoginSellerComponent,
    EditProductsComponent,
    ManagePordersSellerComponent,
    BuyProductUserComponent,
    PaymentComponent,
    FooterComponent,
    SidebarComponent,
    ImageCarouselIIComponent,
    PaginationComponent,
    ProductDetailComponent,
    CartgoComponent,
    ProductsForSaleComponent,
    AddProductsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTurnstileModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatTableModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

