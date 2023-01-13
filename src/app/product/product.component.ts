import { Component, OnInit } from '@angular/core';
import {ProduitService} from "../services/produit.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products! :Array<Product>
  /*
  1) step one
  create a variable”searchFormGroup” of
  type FormGroup
  (imagine it as an empty form group that does’t contain any input fields ,
  a form group is simply a group of input fields  hence form group )

  2) step two
  the next logical things is to build a form from different input fields so we need
  a form => Builder
   2.1)
      on init : inject a service from reactive form that is “fb” of type FormBuilder

  3) step three
  now we use the FormBuilder Service
  we first assign the empty form group  in this case "searchFormGroup" to
  (this.searchFormGroup”=this.fb.group)

  4)step four
  using the variable of FormBuilder already declared on Constructor in this case "fb"
  we build the form by using group() method

    4.1) set default value for the fields in this case "null" for the keyword field
      the group method accepts
      control config which is a map {}
      with the key as the input name and the value as fb.control(null)
      fb.control sets the value of the input field
      null is the default value

  5)data binding
    data binding  using directive on the form tag [FormGroup]=“searchFormGroup”
    (the empty form group that was populated with the from builder )
    (ngSubmit)="handelSearchForm()" to process  data via a function that we should define on the component
    to get the value of the input field
    ex : keyword field
    create a variable to store the value in it
    let kwd=SearchFormGroup.value.keyword

*/


searchFormGroup!:FormGroup
  errorMessage!:String

  constructor(private productservice:ProduitService,private fb:FormBuilder) {

  }
  handleGetAllProducts(){
    this.productservice.getProducts().subscribe(
      { next:(data)=>this.products=data,
        error:(err)=> this.errorMessage=err},

    )
  }

  ngOnInit(): void {
    this.handleGetAllProducts()
    this.searchFormGroup = this.fb.group({keyword: this.fb.control(null)})
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

    //let conf=confirm("do you want to toggle promo on this product")
    //if(!conf)return;

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

  handelSearchForm() {
    let kwd=this.searchFormGroup.value.keyword
    this.productservice.searchProduct(kwd).subscribe({
      next:(data)=>{
        this.products=data}
       ,
      error:(err)=>console.log("on error")
    }

    )

  }
}

