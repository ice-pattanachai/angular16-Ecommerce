import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cart, order, product } from '../../data-type'
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

  getProductImage(productId: number): Observable<string> {
    const url = `${this.apiUrl}/products_allimage?product_id=${productId}`;
    return this.http.get<string>(url);
  }

  productList(): Observable<product[]> {
    return this.http.post<product[]>('http://localhost:3030/api/products_all', {});
  }

  // updateProduct(productId: number, productData: any): Observable<any> {
  //   const url = `${this.apiUrl}/edit_product/`;
  //   return this.http.post<any>(url, productData);
  // }
  updateProduct(productData: FormData): Observable<any> {
    return this.http.post('http://localhost:3030/api/products_edit', productData);
  }
  // updateProduct(product: product) {
  //   return this.http.put<product>(
  //     `http://localhost:3000/products/${product.id}`,
  //     product
  //   );
  // }
  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
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

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  getSelectedProductById(productId: number) {
    return this.http.get<product>(`http://localhost:3000/products/${productId}`);
  }
}