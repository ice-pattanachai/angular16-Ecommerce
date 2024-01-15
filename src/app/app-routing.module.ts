import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/content/page/home/home.component';
import { Error404Component } from './component/add-on/error/error404/error404.component';
import { AboutComponent } from './component/content/page/about/about.component';
import { CatErrorComponent } from './component/add-on/error/cat-error/cat-error.component';
import { ShopComponent } from './component/content/page/shop/shop.component';
import { ProductDetailComponent } from './component/content/page/product-detail/product-detail.component';
import { CartgoComponent } from './component/content/page/cartgo/cartgo.component';
//User
import { LoginComponent } from './component/content/user/login/login.component';
import { BuyProductUserComponent } from './component/content/user/buy-product-user/buy-product-user.component';
import { PaymentComponent } from './component/content/user/payment/payment.component';
import { PurchaseHistoryComponent } from './component/content/user/purchase-history/purchase-history.component';
//Selle
import { LoginSellerComponent } from './component/content/seller/login-seller/login-seller.component';
import { EditProductsComponent } from './component/content/seller/edit-products/edit-products.component';
import { ProductsForSaleComponent } from './component/content/seller/products-for-sale/products-for-sale.component';
import { AddProductsComponent } from './component/content/seller/add-products/add-products.component';
import { SettingsComponent } from './component/content/seller/settings/settings.component';
import { SettingUserAllComponent } from './component/content/page/setting-user-all/setting-user-all.component';
import { ManageOrdersComponent } from './component/content/seller/manage-orders/manage-orders.component';

// const routes: Routes = [];
const routes: Routes = [
  // page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'bongo-cat', component: CatErrorComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'cartgo', component: CartgoComponent },
  { path: 'setting', component: SettingUserAllComponent },
  // { path: 'product/:id', component: ProductDetailComponent },
  // user
  { path: 'user-login', component: LoginComponent },
  { path: 'buyproduct', component: BuyProductUserComponent },
  { path: 'purchasehistory', component: PurchaseHistoryComponent },

  // { path: 'buyproduct', component : PaymentComponent },
  // seller
  { path: 'seller-login', component: LoginSellerComponent },
  { path: 'edit-products', component: EditProductsComponent },
  { path: 'add-proders', component: AddProductsComponent },
  { path: 'manage_porders', component: ManageOrdersComponent },
  { path: 'all', component: ProductsForSaleComponent },
  { path: 'shop_settings', component: SettingsComponent },
  // { path: '/edit-product', component: EditProductsComponent },
  // admin
  // <-- -->
  // end
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
