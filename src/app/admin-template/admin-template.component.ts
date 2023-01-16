import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";
import {AppUser} from "../model/user.model";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {



  constructor(public authService:AuthServiceService,private router:Router) { }



  ngOnInit(): void {
  }

  handelLogout() {
    this.authService.logout().subscribe({
      next:(data)=>this.router.navigateByUrl("/login"),

    })
  }
}
