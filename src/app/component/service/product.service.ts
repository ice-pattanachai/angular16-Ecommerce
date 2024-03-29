import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseOrders, Receipts, User, cart, order, product } from '../../data-type'
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3030/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3030/api';
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }

  addProduct(productData: FormData): Observable<any> {
    return this.http.post('http://localhost:3030/api/add_product', productData);
  }

  edit_Product(
    id: number, product_name: string, description: string,
    product_status: boolean, price_per_piece: number,
    stock_quantity: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'products_edit',
      {
        id,
        product_name,
        description,
        product_status,
        price_per_piece,
        stock_quantity,
      },
      httpOptions
    );
  }

  edit_Oders(
    id: number,
    addresses_name: string,
    status: boolean,
    parcel_number: string,
    confirm_payment: boolean
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'purchase_orders/edit',
      {
        id,
        addresses_name,
        status,
        parcel_number,
        confirm_payment,
      },
      httpOptions
    );
  }

  add_Receipt_purchase_orders(
    addresses_name: string,
    address: string,
    postalcode: string,
    phone: string,
    status: boolean,
    // parcel_number: string,
    // ^new
    order_receipt_number: string,
    receipt_make_payment: boolean,
    receipt_visibility: boolean,
    receipt_status: boolean,
    receipt_confirm_payment: boolean,
    payment_format: string,
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'receipt/add',//
      {
        addresses_name,
        address,
        postalcode,
        phone,
        status,
        // parcel_number,
        // ^new
        order_receipt_number,
        receipt_make_payment,
        receipt_visibility,
        receipt_status,
        receipt_confirm_payment,
        payment_format,
      },
      httpOptions
    );
  }

  // add_purchase_orders(
  //   // addresses_name: string,
  //   // address: string,
  //   // postalcode: string,
  //   // phone: string,
  //   quantity: number,
  //   total_price: number,
  //   // status: boolean,
  //   user_id: number,
  //   product_id: number,
  //   receipt_id: number,

  // ): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'purchase_orders/add',
  //     {
  //       // addresses_name,
  //       // address,
  //       // postalcode,
  //       // phone,
  //       quantity,
  //       total_price,
  //       // status,
  //       user_id,
  //       product_id,
  //       receipt_id,
  //     },
  //     httpOptions
  //   );
  // }
  add_purchase_orders(
    quantity: number,
    total_price: number,
    user_id: number,
    product_id: number,
    receipt_id: number,

  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'purchase_orders/add',
      {
        quantity,
        total_price,
        user_id,
        product_id,
        receipt_id,
      },
      httpOptions
    );
  }

  edit_purchase_orders(
    id: number,
    addresses_name: string,
    address: string,
    postalcode: number,
    phone: string,
    quantity: number,
    total_price: number,
    status: boolean,
    parcel_number: string,
    payment_format: string,
    confirm_payment: boolean,
    user_id: number,
    product_id: number

  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'purchase_orders/edit',
      {
        id,
        addresses_name,
        address,
        postalcode,
        phone,
        quantity,
        total_price,
        status,
        parcel_number,
        payment_format,
        confirm_payment,
        user_id,
        product_id,
      },
      httpOptions
    );
  }

  getProductImage(productId: number): Observable<string> {
    const url = `${this.apiUrl}/products_allimage?product_id=${productId}`;
    return this.http.get<string>(url);
  }

  ordersList(): Observable<PurchaseOrders[]> {
    return this.http.post<PurchaseOrders[]>('http://localhost:3030/api/purchase_orders/search/all', {});
  }

  productList(): Observable<product[]> {
    return this.http.post<product[]>('http://localhost:3030/api/products_all', {});
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3030/api/products_id/get/${id}`);
  }

  SearchProductId(productId: any): Observable<product[]> {
    const body = { productId: productId };
    const data = this.http.post<product[]>('http://localhost:3030/api/products_id', body)
    return data;
  }

  SearchReceiptId(receiptId: any): Observable<Receipts[]> {
    const body = { receiptId: receiptId };
    const data = this.http.post<Receipts[]>('http://localhost:3030/api/receipt/search/id', body)
    return data;
  }

  SearchReceiptAll(): Observable<Receipts[]> {
    return this.http.post<Receipts[]>('http://localhost:3030/api/receipt/search/all', {});
  }

  purchase_orders_userid(user_id: any): Observable<PurchaseOrders[]> {
    const body = { user_id: user_id };
    const data = this.http.post<PurchaseOrders[]>('http://localhost:3030/api/purchase_orders/search/userId', body)
    return data;
  }

  purchase_orders_id(id: any): Observable<PurchaseOrders[]> {
    const body = { id: id };
    const data = this.http.post<PurchaseOrders[]>('http://localhost:3030/api/purchase_orders/search/Id', body)
    return data;
  }

  updateProduct(productData: FormData): Observable<any> {
    return this.http.post('http://localhost:3030/api/products_edit', productData);
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
}