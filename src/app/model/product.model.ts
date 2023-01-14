export interface Product {

  id : string;
  nom :string;
  price: number;
  onSale:boolean

}

export interface PageProduct{

  products :Product[];
  page:number;
  size:number;
  totalPages:number;
}



