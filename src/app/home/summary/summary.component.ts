import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { NONE_TYPE } from '@angular/compiler';
import { AuthService } from '../../services/auth.service';
import { TaskData } from '../../interfaces/task.interface';


@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
    usertasks!: TaskData[];
    high: number = 0;
    medium: number = 0;
    low: number = 0;
    todo: number = 0;
    inprogress: number = 0;
    completed: number = 0;
    piedata!: object;
    bardata!: object;
    baroptions!: Object;
    display: boolean = true;
    piechartOptions!: Object;
    plugin!: Object

    constructor(public taskdata: TaskService, public authService: AuthService) {


        this.taskdata.gettask(this.authService.uid).subscribe({
            next:(response) => {
                this.usertasks = response
                if (this.usertasks && this.usertasks.length > 0) {
                    this.display = true;
                    this.usertasks.forEach((task: any) => {

                        switch (task.priorities) {
                            case "high": this.high++;
                                break;
                            case "medium": this.medium++;
                                break;
                            case "low": this.low++;
                                break;
                            default: console.log("default")
                        }
                        switch (task.status) {

                            case "todo": this.todo++;
                                break;
                            case "inprogress": this.inprogress++;
                                break;
                            case "completed": this.completed++;
                                break;
                            default: console.log("default")
                        }
                    });

                    const documentStyle = getComputedStyle(document.documentElement);

                    this.piedata = {
                        labels: ["Todo", 'Inprogress', 'Completed'],
                        datasets: [
                            {
                                data: [this.todo, this.inprogress, this.completed],
                                backgroundColor: [documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                                hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]

                            }
                        ]
                    };


                    this.bardata = {
                        labels: ['High', 'Medium', 'Low'],
                        datasets: [
                            {
                                label: 'Priorities',
                                data: [this.high, this.medium, this.low],
                                backgroundColor: [documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--blue-500')],
                                hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--blue-400')]
                            }
                        ]
                    }

                    this.baroptions = {
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        plugins: {
                            legend: {
                                labels: NONE_TYPE
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: '#D3D3D3',
                                    drawBorder: false
                                }
                            },
                            y: {
                                ticks: {
                                    stepSize: 1, // Set the step size between ticks
                                    precision: 0,
                                    color: '#808080'
                                },
                                grid: {
                                    color: '#D3D3D3',
                                    drawBorder: true
                                }
                            }

                        }
                    };


                }
                else {
                    this.display = false;
                }
            },
            error:(error: any) => this.usertasks = error,
    })

    }
}
