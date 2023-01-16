import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm!: FormGroup
  userName!: string
  password!: string
  errorMessage!: string


  constructor(private authService: AuthServiceService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        userName: this.fb.control(null),
        password: this.fb.control(null)
      }
    )
  }

  /*
  1) check username and pass word using authenticateUser returns the appUser from authservice

  2) use the isCheckSavedLogedUsers to register the authenticated users on local storage
  once the user is authenticated and saved to local storage  then we pass to routing

  3) we need to inject the router service and navigate the user to the wanted page
  */
  handelLoginForm() {
    this.userName = this.loginForm.value.userName
    this.password = this.loginForm.value.password
    this.authService.authenticateUser(this.userName, this.password).subscribe({
      next: (appUser) => {
        this.authService.isCheckedSavedLogedUsers(appUser).subscribe({
          next: (data) => this.router.navigateByUrl("admin/product")
        })
      },
      error: (err) => this.errorMessage = err
    })

  }



}
