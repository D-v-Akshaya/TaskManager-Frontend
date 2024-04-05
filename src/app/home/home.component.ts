import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service'; 

@Component({
  selector: 'app-homepg',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userdata = localStorage.getItem('userid')
  name!: string ;
  email!:string;
  constructor( public router: Router, private taskdata: TaskService) {
    if(this.userdata){
   this.name=JSON.parse(this.userdata).uname;
   this.email=JSON.parse(this.userdata).email;
   }
  }
  


  items = [
    {
      label: 'Summary',
      icon: "pi pi-home",
      command: () => this.summary()
    },
    {
      label: 'View',
      icon: 'pi pi-fw pi-bars',
      command: () => this.view()
    },
    {
      label: 'Add Task',
      icon: "pi pi-plus-circle",
      command: () => this.addtask()
    }

  ];

  showsignout: boolean = false;

  toggleDropdown(): void {
    this.showsignout = !this.showsignout;
  }

  signOut(): void {
    
    localStorage.removeItem('userid')
    this.router.navigate(['home'])
    this.router.navigate(['/auth'])
  }

  summary() {
    this.router.navigate(['home/summary'])
  }

  view() {
    this.router.navigate(['home/view'])
    this.taskdata.isediting = false;
  }
  
  addtask() {
    this.router.navigate(['home/add'])
  }

}
