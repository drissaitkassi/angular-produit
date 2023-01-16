import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
users!:Array<AppUser>;
aUser :AppUser | undefined

  constructor() {
    this.users=[
      {userId:UUID.UUID(),userName:"user1",password:"1234",roles:["USER"]},
      {userId:UUID.UUID(),userName:"admin",password:"1234",roles:["USER","ADMIN"]},
      {userId:UUID.UUID(),userName:"user2",password:"1234",roles:["USER"]},
    ]

  }

/* authentication

/authService

  1)step one
  created users as defined on the  AppUser model

  1. create a method to check if the user exist authenticateUser()

  (check username typed against users created  using the find() method )
  if not return error msg using Throw (()=> new Error(“error msg”))
  if true check if password is correct  if not return error msg using Throw (()=> new Error(“error msg”))
  if  all is good return observable<AppUser>

  method hasRole() that will be used to grant or revoke access based on the user role
  method isAuthenticated () that will be used to grant access to the app or redirect to login or signup

  things learned :
    local storage
  json.stringify convert json object to string



  */

  authenticateUser(username:string, password:string):Observable<AppUser>{
   let authenticatedUser= this.users.find(u=>u.userName==username )
    if(!authenticatedUser)return throwError(()=>new Error("User Not Found "))
    if(authenticatedUser.password !=password)return throwError(()=> new Error("Bad Credentials"))
    return of(authenticatedUser)
  }


  hasRole(role:string):Observable<boolean>{
    if (!this.aUser!.roles.includes(role))
    return throwError(()=>new Error("access denied"))
    return of(true)

  }

  logout():Observable<boolean>{
    localStorage.removeItem("authenticatedUser")
    return of(true)
  }

  isCheckedSavedLogedUsers(user :AppUser):Observable<boolean>{
      this.aUser=user;
      localStorage.setItem("authenticatedUser",
        JSON.stringify({userId:user.userId,userName:user.userName,password:user.password,roles:user.roles,jwt:"JWT_TOKEN"}))

      return of(true)
  }

}

