import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubTaskData} from '../interfaces/sub-task.interface';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
url:string=`http://localhost:3000/taskmanager/subtask`
  constructor(public http:HttpClient) { }
  addsubtask(tid:number,body:any):Observable<string>{
    console.log(JSON.stringify(body))
    return this.http.post<string>(`${this.url}?tid=${tid}`,body);
  }
  gettask(tid:number):Observable<SubTaskData[]>{
    return this.http.get<SubTaskData[]>(`${this.url}?tid=${tid}`);
  }
   deletesubtask(subTaskId:number):Observable<string>{
    return this.http.delete<string>(` ${this.url}?subTaskId=${subTaskId}`);
   }
 
  editsubtask(subTaskId:number,body:SubTaskData):Observable<string>{
    return this.http.put<string>(` ${this.url}?subTaskId=${subTaskId}`,body);
  }

}
