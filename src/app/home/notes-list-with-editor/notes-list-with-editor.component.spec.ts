import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesListWithEditorComponent } from './notes-list-with-editor.component';

describe('NotesListWithEditorComponent', () => {
  let component: NotesListWithEditorComponent;
  let fixture: ComponentFixture<NotesListWithEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesListWithEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListWithEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
