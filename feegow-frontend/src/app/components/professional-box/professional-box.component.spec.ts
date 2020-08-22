import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfessionalBoxComponent} from './professional-box.component';

describe('ProfessionalBoxComponent', () => {
  let component: ProfessionalBoxComponent;
  let fixture: ComponentFixture<ProfessionalBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
