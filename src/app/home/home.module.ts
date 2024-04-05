import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ViewComponent } from './view/view.component';
import { SummaryComponent } from './summary/summary.component';
import { AddtComponent } from './addt/addt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { HomeRoutingModule } from './home-routing.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    SummaryComponent,
    AddtComponent,


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    SelectButtonModule,
    InputTextModule,
    DataViewModule,
    TableModule,
    ButtonModule,
    ChartModule,
    AvatarModule,
    AvatarGroupModule,
    MenubarModule,
    ConfirmDialogModule,
    SlideMenuModule,
    ToastModule,
    MessagesModule,
    HomeRoutingModule,
    OverlayPanelModule,
    CardModule,
    TreeTableModule,
    SidebarModule,
    AccordionModule

  ]
})
export class HomeModule { }

  