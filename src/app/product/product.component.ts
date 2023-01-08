import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../services/produit.service";
import {Product} from "../model/product.model";
import {workerData} from "worker_threads";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products! :Array<Product>

  errorMessage!:String

  constructor(private productservice:ProduitService) {

  }
  handleGetAllProducts(){
    this.productservice.getProducts().subscribe(
      { next:(data)=>this.products=data,
        error:(err)=> this.errorMessage=err},

    )
  }

  ngOnInit(): void {
    this.handleGetAllProducts()
  }

  handleDeletProduct(p:Product) {
    let conf=confirm("are you sure you want to delete this product")
    if(!conf)return;
    this.productservice.deletProduct(p.id).subscribe(
      {next:(data)=>
          this.products.splice(this.products.indexOf(p),1)
         //this.handleGetAllProducts()
      }
    )
    //this.products.splice(this.products.indexOf(p),1)
  }

  handelTogglePromo(p: Product) {
    //methode 1:
    // create a variable that remembers the initial  value of p.promotion
    // then call the service to get a value of p.promotion toggled  from the backend
    // after that toggle it again but this time use the variable that has the initial value stored in it
    // otherwise you will cancel the toggle effect

    let conf=confirm("do you want to toggle promo on this product")

    //methode 2 :
    // do not toggle the onSale value on the subscription next: observer

    // subscribe to the observable sent by the service
    // change the value of the onSale attribute to its opposed
    // this change is made to the front end only if the backend has made
    // the change on its part


    this.productservice.setTogglePromo(p.id).subscribe({
      next:(data)=>{
       // p.onSale= !p.onSale
      },
      error:(err)=>{
        this.errorMessage=err
      }

    })


  }
}

