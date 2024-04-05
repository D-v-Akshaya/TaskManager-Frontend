import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { TaskData } from '../../interfaces/task.interface';
import { DELETE_CONFIRMATION, DELETE_RECORD } from 'src/app/static_strings';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ViewComponent implements OnInit  {
  
value:Array<number>=[0];
expandedTask: any = null; 
  public tasks!: TaskData[];
  showSubTaskOfId:boolean=true
  datacolumns: Array<string> = [
    "Name",
    "Priority",
    "Start date",
    "End date",
    "Status"]
  constructor(private taskService: TaskService, 
    private authService: AuthService,
     private router: Router,
     private confirmationService: ConfirmationService, 
     private messageService: MessageService) { }


  ngOnInit(): void {
    this.taskService.gettask(this.authService.uid).subscribe({
      next:(response) =>  { this.tasks = response
    },
      error:(error) => this.tasks = error,
  })
  }

  edittask(tid: any) {
    this.taskService.tid=tid
    this.taskService.isediting=true;
    this.router.navigate(['home/add'])
  }
  deletetask(tid: any) {
 
      this.taskService.deletetask(tid).subscribe(
        (response) => {
          
          this.tasks = this.tasks.filter((task: any) => task.tid !== tid);
          //console.log(response)
     this.sucessmessage(response)
        },
        (error) => {
          //console.log(error)
this.errormessage(error)}
      );

  }

  
  confirm(tid: number) {
    this.confirmationService.confirm({
        message: DELETE_RECORD,
        header: DELETE_CONFIRMATION,
        icon: 'pi pi-info-circle',
        accept: () => {
         this.deletetask(tid)   
        }
    });
}

sucessmessage(message:string) {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
}
errormessage(message:string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: message});
}
showSubtask(taskid:number){
  this.showSubTaskOfId=true
  console.log(this.showSubTaskOfId)
}



toggleRow(tid: number) {
  if (this.expandedTask === tid) {
    this.expandedTask = null;
  } else {
    this.expandedTask = tid;
  }
}

openSubtask(tid:number,subtaskid:number){
  this.taskService.tid=tid
  this.taskService.isediting=true;
  this.router.navigate(['home/add'])
 
}

}

