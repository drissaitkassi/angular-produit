import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm!:FormGroup
  userName!:string
  password!:string
  errorMessage!:string


  constructor( private authService:AuthServiceService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      userName:this.fb.control(null),
      password:this.fb.control(null)
    }
    )
  }

  handelLoginForm() {
    this.userName=this.loginForm.value.userName
    this.password=this.loginForm.value.password
    this.authService.authenticated(this.userName,this.password).subscribe({
      next:(data)=>{
        this.userName=data.userName
        this.password=data.password
      },
      error:(err)=>this.errorMessage=err
    })

  }
}
