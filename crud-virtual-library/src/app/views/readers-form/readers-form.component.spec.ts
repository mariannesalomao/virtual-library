import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadersFormComponent } from './readers-form.component';

describe('ReadersFormComponent', () => {
  let component: ReadersFormComponent;
  let fixture: ComponentFixture<ReadersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
