import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup,  AbstractControlOptions, FormArray } from '@angular/forms'
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { CONFIRM_NAVIGATE, DATA_NOT_SAVED, DELETE_CONFIRMATION, DELETE_SUBTASK_CONFIRMATION, ERROR_ADDING_NEW_RECORD, ERROR_ADDING_NEW_SUBTASK, ERROR_DELETING_SUBTASK, ERROR_EDITING_RECORD, ERROR_EDITING_SUBTASK, NEW_RECORD_ADDED, NEW_SUBTASK_ADDED, RECORD_EDITED, SUBTASK_DELETED, SUBTASK_EDITED } from 'src/app/static_strings';
import { TaskData } from '../../interfaces/task.interface';
import { SubtaskService } from 'src/app/services/subtask.service';
import { SubTaskData } from 'src/app/interfaces/sub-task.interface';
import { elements } from 'chart.js';



@Component({
  selector: 'app-addt',
  templateUrl: './addt.component.html',
  styleUrls: ['./addt.component.css'],

})

export class AddtComponent {
 
  addSubTask: boolean = false;
  isedit: boolean = false;
  title: string = "Add Task"
  min: Date = new Date()
  status!: SelectItem[];
  prioritiesOption!: SelectItem[];
  tasks!: TaskData[];


  commonform = this.fb.group({
    taskname: ['', Validators.required],
    priorities: ['', [Validators.required]],
    startdate: [this.min, [Validators.required]],
    enddate: [this.min, [Validators.required]],
    status: ['', [Validators.required]]
  },
    { validator: this.datesValidator } as AbstractControlOptions);



  constructor(private fb: FormBuilder,
    public router: Router,
    public task: TaskService,
    public authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private subTaskService: SubtaskService) {

    this.prioritiesOption = [
      { label: 'High', value: 'high' },
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' }
    ];

    this.status = [
      { label: 'Select a status', value: null },
      { label: 'Todo', value: 'todo' },
      { label: 'In progress', value: 'inprogress' },
      { label: 'completed', value: 'completed' }
    ];

    //checking form mode if is it in the edit mode
    if (this.task.isediting) {
      this.title = "Edit Task"
      this.isedit = true
      this.task.gettaskid(this.task.tid).subscribe({
        next: (response) => {
          this.tasks = response;
          this.tasks.forEach((task: TaskData) => {
            this.addformDetails.setValue({
              taskname: task.tname,
              priorities: task.priorities,
              startdate: new Date(task.sdate),
              enddate: new Date(task.edate),
              status: task.status
            });
            if(task.subTasks.length>0){
              task.subTasks.forEach((element:SubTaskData)=>{
                this.addform(element)
            })
            }
          });

        },
        error: (error) => this.tasks = error,
      })
    }
  }

  formDetails: FormGroup = this.fb.group({
    addformDetails: this.commonform,
    subformDetails: this.fb.array([])
  }
  );

  get addformDetails() {
    return this.formDetails.controls["addformDetails"]
  }
  get subformDetails() {
    return this.formDetails.controls["subformDetails"] as FormArray;
  }
  get tname() {
    return this.addformDetails.get('taskname');
  }
  get priorities() {
    return this.addformDetails.get('priorities');
  }
  get statu() {
    return this.addformDetails.get('status');
  }
  get edate() {
    return this.addformDetails.get('enddate');
  }
  get sdate() {
    return this.addformDetails.get('startdate')
  }

  datesValidator(g: FormGroup) {
    return g.get('enddate')?.value >= g.get('startdate')?.value ? null : { 'unsequencial': true };
  }

  subtaskDatesValidator(g: FormGroup) {
    return g.get('subtaskenddate')?.value >= g.get('subtaskstartdate')?.value ? null : { 'unsequencial': true };
  }

  //add new subtask form
  addform(element?:SubTaskData) {
    const commonform = this.fb.group({
      subtaskid:[0],
      subtaskname: ['', Validators.required],
      subtaskpriorities: ['', [Validators.required]],
      subtaskstartdate: [this.sdate!.value, [Validators.required]],
      subtaskenddate: [this.edate!.value, [Validators.required]],
      subtaskstatus: ['', [Validators.required]]
    },
      { validator: this.subtaskDatesValidator } as AbstractControlOptions);
      if(element){
        console.log("element",element)
        commonform.setValue({
          subtaskid:element.subtaskid,
          subtaskname: element.subtaskname,
          subtaskpriorities: element.subtaskpriorities,
          subtaskstartdate: new Date(element.subtaskstartdate),
          subtaskenddate: new Date(element.subtaskenddate),
          subtaskstatus:element.subtaskstatus
        })
    }
    this.subformDetails.push(commonform);
  }
 
  //deleting the subtask form
 async deleteSubtask(index: number,form:any) {
    if(this.isedit){
    const subTaskid=form.controls.subtaskid.value
    if(subTaskid>0){
      const confirmationToDelete=await this.confirmationdialoge(DELETE_SUBTASK_CONFIRMATION,DELETE_CONFIRMATION)
      if(confirmationToDelete){
        this.subTaskService.deletesubtask(subTaskid).subscribe({
          next:()=>{
            this.sucessmessage(SUBTASK_DELETED)
          },
          error:()=>{
            this.errormessage(ERROR_DELETING_SUBTASK)
          }
        })
        this.subformDetails.removeAt(index);
      }
    }
    else{
      this.subformDetails.removeAt(index);
    }
  }else{
    this.subformDetails.removeAt(index);
  }
  }


  onSubmit() {
    //submitting to adding new records
    if (!this.isedit) {
     const subtaskArray=this.subformDetails.value
       
      this.task.addtask(this.authService.uid,this.addformDetails.value).subscribe({
        next: (response) => {
          this.sucessmessage(NEW_RECORD_ADDED)
          if (subtaskArray.length>0) {
            subtaskArray.forEach((element:SubTaskData) =>{
               this.subTaskService.addsubtask(JSON.parse(response), element).subscribe({
              next: () => { 
                this.sucessmessage(NEW_SUBTASK_ADDED);
              },
              error: () => {
                this.errormessage(ERROR_ADDING_NEW_SUBTASK);
              }
            })
          })
            } 
          else{
            this.sucessmessage(NEW_RECORD_ADDED);
          } 
        },
        error: () => {
          this.errormessage(ERROR_ADDING_NEW_RECORD);
        },
        complete:()=> this.formDetails.reset()
      });  
      
     
    }
    // submitting form after editing
    else {
      const subtaskArray=this.subformDetails.value
      this.edittaskApi(this.task.tid, this.addformDetails.value)
      .then((response) => {
        if (subtaskArray) {
          subtaskArray.forEach((element:SubTaskData) =>{
           if(element.subtaskid>0){
             this.subTaskService.editsubtask(element.subtaskid, element).subscribe({
            next: () => {
              this.sucessmessage(SUBTASK_EDITED);
            },
            error: () => {
              this.errormessage(ERROR_EDITING_SUBTASK);
            }
          })}
          else{
            this.subTaskService.addsubtask(this.task.tid, element).subscribe({
              next: () => { 
                this.sucessmessage(NEW_SUBTASK_ADDED);
              },
              error: () => {
                this.errormessage(ERROR_ADDING_NEW_SUBTASK);
              }
            })
          }
        })
          } 
        else{
          this.sucessmessage(RECORD_EDITED);
        } })
      .catch((error) => {
        console.error(error); 
        this.errormessage(ERROR_EDITING_RECORD);
      });
      this.isedit = false;
      this.task.isediting = false;
      this.formDetails.reset();
      this.title="Add Task"
    }
  }

  //navigating back to the view page
  onCancel() {
    this.isedit = false;
    this.task.isediting = false;
    this.router.navigate(['home/view'])
  }

  //reseting the form
  onReset() {
    this.formDetails.reset();
  }

  //functions for displaying sucess or error messages in p-message 
  sucessmessage(details:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail:details  });
  }
  errormessage(details:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: details });
  }

  async CanDeactivate(): Promise<boolean> {
    if (this.formDetails.dirty) {
      return await this.confirmationdialoge(DATA_NOT_SAVED,CONFIRM_NAVIGATE)
    }
    else {
      return true
    }
  }

  confirmationdialoge(message:string,header:string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm({
        message: message,
        header:header ,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }

  // adding the main task
  addtaskApi(uid: number, body: TaskData){
   
    
  }

  // editing the main task
  edittaskApi(tid: number, body: TaskData): Promise<any> {
    return new Promise((resolve, reject) => {
    this.task.edittask(tid, body).subscribe({
      next: (response) => {   
        this.sucessmessage(RECORD_EDITED)
        resolve(response);
      },
      error: (error) => {
        reject(error);
      }
    });
  });

  }


}
