import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {CustomerComponent} from "./customer/customer.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";


const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'admin', component: AdminTemplateComponent,children:[
      { path: 'product', component: ProductComponent },
      { path: 'customer', component: CustomerComponent },
    ] },


]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,  RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
