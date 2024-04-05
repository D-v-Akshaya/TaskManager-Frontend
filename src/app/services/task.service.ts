import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskData } from '../interfaces/task.interface';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tid:number=0;
  isediting:boolean=false;
url:string=`http://localhost:3000/taskmanager/task`
  constructor(public http:HttpClient) { }
  addtask(uid:number,body:any):Observable<string>{
    console.log(JSON.stringify(body))
    return this.http.post<string>(`${this.url}?uid=${uid}`,body);
  }
  gettask(uid:number):Observable<TaskData[]>{
    return this.http.get<TaskData[]>(`${this.url}?uid=${uid}`);
  }
  deletetask(tid:any):Observable<string>{
   return this.http.delete<string>(` ${this.url}?tid=${tid}`);
  }
  gettaskid(tid:any):Observable<TaskData[]>{
    return this.http.get<TaskData[]>(`${this.url}?tid=${tid}`);
  }
  edittask(tid:any,body:any):Observable<string>{
    return this.http.put<string>(` ${this.url}?tid=${tid}`,body);
  }

}
