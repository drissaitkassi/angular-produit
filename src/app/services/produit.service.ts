import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private products!: Array<Product>
  private pageProduct!: PageProduct

  constructor() {

    this.products = [
      {'id': UUID.UUID(), nom: 'computer', price: 12000, onSale: true},
      {'id': UUID.UUID(), nom: 'printer', price: 1550, onSale: false},
      {'id': UUID.UUID(), nom: 'desk', price: 13400, onSale: true},
    ]

    for (let i = 0; i < 20; i++) {
      this.products.push({'id': UUID.UUID(), nom: 'computer', price: 12000, onSale: true})
      this.products.push({'id': UUID.UUID(), nom: 'printer', price: 1550, onSale: false})
      this.products.push({'id': UUID.UUID(), nom: 'desk', price: 13400, onSale: true})
    }
  }

  getPageProducts(page: number, size: number): Observable<PageProduct> {
    //return a page not all pages
    // page = aPage.page this is not good because we will assign it on the return value

    // i want to send the (5=size) products corresponding to the number of the page selected
    // for page 0 send 1->5 , page 1 send 5->10 , page 2 send 11->15 , page 3 send 16->20
    // notice the relationship here  startPosition =(page number * size)+1
    // endPosition =
    let startPosition =(page*size)
    let endPosition=(page*size)+size
    let productPerPage=this.products.slice(startPosition,endPosition)
    let totalP = ~~(this.products.length / size)
    if (this.products.length % size != 0) {
      totalP++
    }

    return of({products:productPerPage,page:page,size:size,totalPages:totalP})
  }

  /* getProducts():Observable<Product[]>{
     /!*let rdn=Math.random()
     if (rdn<0.5){
       return throwError(()=> Error("une erreur s'est produit"))
     }else *!/
     return of(this.products)
   }*/


  deletProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id)
    return of(true)
    //this.products.splice(this.products.indexOf(p),1)
  }

  setTogglePromo(id: string): Observable<boolean> {

    //loop through products select element based on id
    // set the onSale attribute to its oppesed
    //return an observanle of type boolean
    // this change is only concerning the backend

    let product = this.products.find(p => p.id == id)
    if (product != undefined) {
      product.onSale = !product.onSale
      return of(true)
    } else
      return throwError(() => new Error("product not found"))

  }

  searchPageProduct(keyword: string,page:number,size:number): Observable<PageProduct> {
    let results = this.products.filter(p => p.nom.includes(keyword))
    let startPos =(page*size)
    let endPosition=(page*size)+size
    let productPerPage=results.slice(startPos,endPosition)
    let totalP = ~~(results.length / size)
    if (results.length % size != 0) {
      totalP++
    }

    return of({products:productPerPage,page:page,size:size,totalPages:totalP});
  }

  /*
    searchProduct(keyword:string):Observable<Product[]>{
      let results=this.products.filter(p=>p.nom.includes(keyword))
      console.log(results)
      return  of(results);
    }*/
}
