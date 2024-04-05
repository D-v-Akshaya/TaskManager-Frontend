import { SubTaskData } from "./sub-task.interface";

export interface TaskData {
    edate: string;   
    priorities: string; 
    sdate: string;       
    status: string;      
    tid: number;        
    tname: string;       
    uid: number;  
    subTasks:SubTaskData[]     
  }