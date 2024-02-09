import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/add-on/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { Error404Component } from './component/add-on/error/error404/error404.component';
import { HomeComponent } from './component/content/page/home/home.component';
import { CatErrorComponent } from './component/add-on/error/cat-error/cat-error.component';
import { LoginComponent } from './component/content/user/login/login.component';
import { NgxTurnstileModule } from 'ngx-turnstile';
import { BackToTopComponent } from './component/add-on/back-to-top/back-to-top.component';
import { ShopComponent } from './component/content/page/shop/shop.component';
import { ProductComponent } from './component/add-on/product/product.component';
import { LoginSellerComponent } from './component/content/seller/login-seller/login-seller.component';
import { EditProductsComponent } from './component/content/seller/edit-products/edit-products.component';
import { ImageCarouselIIComponent } from './component/add-on/image-carousel-ii/image-carousel-ii.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductDetailComponent } from './component/content/page/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CartgoComponent } from './component/content/page/cartgo/cartgo.component';
import { MatTableModule } from '@angular/material/table';
import { ProductsForSaleComponent } from './component/content/seller/products-for-sale/products-for-sale.component';
import { AddProductsComponent } from './component/content/seller/add-products/add-products.component';
import { SettingUserAllComponent } from './component/content/page/setting-user-all/setting-user-all.component';
import { PurchaseHistoryComponent } from './component/content/user/purchase-history/purchase-history.component';
import { ManageOrdersComponent } from './component/content/seller/manage-orders/manage-orders.component';
import { EditOrderComponent } from './component/content/seller/edit-order/edit-order.component';
import { OrderDetailComponent } from './component/add-on/order-detail/order-detail.component';
import { ReceiptComponent } from './component/content/seller/receipt/receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Error404Component,
    HomeComponent,
    CatErrorComponent,
    LoginComponent,
    BackToTopComponent,
    ShopComponent,
    ProductComponent,
    LoginSellerComponent,
    EditProductsComponent,
    ImageCarouselIIComponent,
    ProductDetailComponent,
    CartgoComponent,
    ProductsForSaleComponent,
    AddProductsComponent,
    SettingUserAllComponent,
    PurchaseHistoryComponent,
    ManageOrdersComponent,
    EditOrderComponent,
    OrderDetailComponent,
    ReceiptComponent
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

