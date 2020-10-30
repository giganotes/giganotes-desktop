import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFolderDialogComponent } from './select-folder-dialog.component';

describe('SelectFolderDialogComponent', () => {
  let component: SelectFolderDialogComponent;
  let fixture: ComponentFixture<SelectFolderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFolderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
