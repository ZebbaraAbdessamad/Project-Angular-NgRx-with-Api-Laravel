import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  url=environment.host;
  constructor(private http:HttpClient) { }

  //display all products
  listProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+`/products`)
    .pipe(map((response: any) => {
      return response.data;
      }));
  }

  //get available products
  getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+`/products/status/available`)
    .pipe(map((response: any) => {
      return response.data;
      }));;
  }

  //get unavailable products
  getUnavailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+`/products/status/unavailable`)
    .pipe(map((response: any) => {
      return response.data;
      }));;
  }

  //search about product
  searchProducts(keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+`/products/search/`+keyword);
  }

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  //change status product
  onSelectStatus(product:Product):Observable<Product>{
    product.status=!product.status;
    return this.http.put<Product>(this.url+`/products/status/`+product.id,product,this.httpOptions);
  }

  //delete product
  Ondelete(product:Product):Observable<Product>{
    return this.http.delete<any>(this.url+`/products/delete/`+product.id);
  }

  //store product
  OnsaveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.url+`/products/add-product/`,product,this.httpOptions);
  }

  //update product
  onUpdate(product:Product):Observable<Product>{
    return this.http.put<Product>(this.url+`/product/update/`+product.id,product,this.httpOptions);
  }

  //get product by id
  getProduct(idProduct:any):Observable<Product>{
    return  this.http.get<Product>(this.url+`/product/`+idProduct);

  }
}
