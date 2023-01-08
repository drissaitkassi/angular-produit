import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../services/produit.service";
import {Product} from "../model/product.model";

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

    this.productservice.deletProduct(p.id).subscribe(
      {next:(data)=>
this.handleGetAllProducts()      }
    )
    //this.products.splice(this.products.indexOf(p),1)
  }

}

