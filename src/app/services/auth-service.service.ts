import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
users!:Array<AppUser>;

  constructor() {
    this.users=[
      {userId:UUID.UUID(),userName:"user1",password:"1234",roles:["USER"]},
      {userId:UUID.UUID(),userName:"admin",password:"1234",roles:["USER","ADMIN"]},
      {userId:UUID.UUID(),userName:"user2",password:"1234",roles:["USER"]},
    ]

  }

  authenticated(username:string,password:string):Observable<AppUser>{
   let authenticatedUser= this.users.find(u=>u.userName==username )
    if(!authenticatedUser)return throwError(()=>new Error("User Not Found "))
    if(authenticatedUser.password !=password)return throwError(()=> new Error("Bad Credentials"))
    return of(authenticatedUser)
  }


}
