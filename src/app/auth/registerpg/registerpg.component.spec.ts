import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RegisterpgComponent } from './registerpg.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

describe('RegisterpgComponent', () => {
  let component: RegisterpgComponent;
  let fixture: ComponentFixture<RegisterpgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterpgComponent],
      imports: [HttpClientModule,ToastModule],    
      providers: [MessageService],
    });
    fixture = TestBed.createComponent(RegisterpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
