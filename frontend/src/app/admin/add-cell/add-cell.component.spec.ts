import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCellComponent } from './add-cell.component';

describe('AddCellComponent', () => {
  let component: AddCellComponent;
  let fixture: ComponentFixture<AddCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
