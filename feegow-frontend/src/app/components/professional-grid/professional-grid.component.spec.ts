import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfessionalGridComponent} from './professional-grid.component';

describe('ProfessionalGridComponent', () => {
  let component: ProfessionalGridComponent;
  let fixture: ComponentFixture<ProfessionalGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
