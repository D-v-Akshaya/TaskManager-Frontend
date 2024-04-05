import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 userdata = localStorage.getItem('userid')

 public isvalidate:boolean;
 public uid!:number;
 public uname!:string;


  constructor(public http:HttpClient) { 
    if(this.userdata){
      this.isvalidate= true;
      this.uid= Number(JSON.parse(this.userdata).uid)
      this.uname= JSON.parse(this.userdata).uname
    }
    else{
      this.isvalidate= false;
    }
  }

  public url: string = 'http://localhost:3000/taskmanager/sigin';

  //to post the data to register user
  signup(body:any):Observable<string>{
    return this.http.post<string>(this.url,body);
  }

  //to get data of singin user 
  signin(email:any):Observable<UserData>{
    return this.http.get<UserData>(`http://localhost:3000/taskmanager/signin?email=${email}`);
  }

}
