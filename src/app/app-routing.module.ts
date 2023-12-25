import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/content/page/home/home.component';
import { Error404Component } from './component/add-on/error/error404/error404.component';
import { AboutComponent } from './component/content/page/about/about.component';
import { CatErrorComponent } from './component/add-on/error/cat-error/cat-error.component';
import { ShopComponent } from './component/content/page/shop/shop.component';
import { ProductDetailComponent } from './component/content/page/product-detail/product-detail.component';
//User
import { LoginComponent } from './component/content/user/login/login.component';
import { BuyProductUserComponent } from './component/content/user/buy-product-user/buy-product-user.component';
import { PaymentComponent } from './component/content/user/payment/payment.component';
//Selle
import { LoginSellerComponent } from './component/content/seller/login-seller/login-seller.component';
import { ManagePordersSellerComponent } from './component/content/seller/manage-porders-seller/manage-porders-seller.component';
import { EditProductsComponent } from './component/content/seller/edit-products/edit-products.component';
import { AddProductsComponent } from './component/content/seller/add-products/add-products.component';


// const routes: Routes = [];
const routes: Routes = [
  // page
  { path: '', redirectTo:'home' , pathMatch: 'full' },
  { path: 'home' , component : HomeComponent },
  { path: 'about' , component : AboutComponent },
  { path: 'bongo-cat' , component : CatErrorComponent},
  { path: 'shop' , component : ShopComponent},
  { path: 'product' , component : ProductDetailComponent},
  // user
  { path: 'login' , component : LoginComponent },
  { path: 'buyproduct', component : BuyProductUserComponent },
  // { path: 'buyproduct', component : PaymentComponent },
  // seller
  { path: 'seller-login' , component : LoginSellerComponent },
  { path: 'edit-products', component : EditProductsComponent },
  { path: 'add-proders', component : AddProductsComponent },
  { path: 'manage_porders', component : ManagePordersSellerComponent },
  // admin
  // <-- -->
  // end
  { path: '**', component : Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
