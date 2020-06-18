import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisInformesComponent } from './mis-informes.component';

describe('MisInformesComponent', () => {
  let component: MisInformesComponent;
  let fixture: ComponentFixture<MisInformesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisInformesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
