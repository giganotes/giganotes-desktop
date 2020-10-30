import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationTreeComponent } from '../home/navigation-tree/navigation-tree.component';
import { NotesListWithEditorComponent } from './notes-list-with-editor/notes-list-with-editor.component';
import { AddFolderDialogComponent } from '../home/add-folder-dialog/add-folder-dialog.component';
import { RenameFolderDialogComponent } from '../home/rename-folder-dialog/rename-folder-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { SelectFolderDialogComponent } from '../home/select-folder-dialog/select-folder-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ResizableDirective } from '../directives/resizable.directive';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragAndDropModule } from 'angular-draggable-droppable';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


const homeRoutes: Routes = [
      {
        path: '',
        component: NotesListWithEditorComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes),
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    MatProgressBarModule,
    FlexLayoutModule,
    EditorModule,
    LayoutModule,
    CommonModule,
    DragAndDropModule
  ],
  exports: [
    RouterModule,
    NotesListWithEditorComponent,
    NavigationTreeComponent,
    AddFolderDialogComponent,
    RenameFolderDialogComponent,
    SelectFolderDialogComponent,
    ConfirmDialogComponent,
    SettingsComponent
  ],
  entryComponents:
    [
      AddFolderDialogComponent,
      RenameFolderDialogComponent,
      SelectFolderDialogComponent,
      ConfirmDialogComponent
    ],
  declarations: [
    ResizableDirective,
    NotesListWithEditorComponent,
    NavigationTreeComponent,
    AddFolderDialogComponent,
    RenameFolderDialogComponent,
    SelectFolderDialogComponent,
    ConfirmDialogComponent,
    SettingsComponent
  ]
})
export class HomeRoutingModule { }
