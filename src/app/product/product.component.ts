import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products! :Array<any>
  constructor() { }

  ngOnInit(): void {
    this.products=[
      {'id':1,'nom':'computer','price':12000},
      {'id':2,'nom':'printer','price':1550},
      {'id':3,'nom':'desk','price':13400}
    ]
  }

}
