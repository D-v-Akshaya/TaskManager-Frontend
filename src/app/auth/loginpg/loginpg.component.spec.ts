import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpgComponent } from './loginpg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

describe('LoginpgComponent', () => {
  let component: LoginpgComponent;
  let fixture: ComponentFixture<LoginpgComponent>;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      declarations: [LoginpgComponent],
        imports: [ReactiveFormsModule,HttpClientModule,ToastModule],
        providers: [MessageService],
    });
    fixture = TestBed.createComponent(LoginpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the form controls', () => {
    expect(component.logform.get('email')).toBeTruthy();
    expect(component.logform.get('pass')).toBeTruthy();
  });

  it('should initialize variables', () => {
    expect(component.iserror).toBe(false);
    expect(component.error).toBe('');
  });

});
