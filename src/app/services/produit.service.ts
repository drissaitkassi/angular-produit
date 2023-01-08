import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private products! :Array<Product>
  constructor() {

    this.products=[
      {'id':1,nom:'computer',price:12000,onSale:true},
      {'id':2,nom:'printer',price:1550,onSale:false},
      {'id':3,nom:'desk',price:13400,onSale:true}
    ]
  }

  getProducts():Observable<Product[]>{
    /*let rdn=Math.random()
    if (rdn<0.5){
      return throwError(()=> Error("une erreur s'est produit"))
    }else */
      return of(this.products)
  }


  deletProduct(id:number):Observable<boolean>{
    this.products =this.products.filter(p=>p.id != id)
    return of(true)
    //this.products.splice(this.products.indexOf(p),1)
  }

  setTogglePromo(id:number): Observable<boolean>{
    //loop through products select element based on id
    // set the onSale attribute to its oppesed
    //return an observanle of type boolean
    // this change is only concerning the backend
   let product=this.products.find(p=>p.id==id)
    if(product!=undefined){
     product.onSale=!product.onSale
      return of(true)
    }else
      return throwError(()=>new Error("product not found"))

  }
}
