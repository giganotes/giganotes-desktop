import { AuthService } from './../../services/auth-service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TreeItem, TreeFolderItem } from '../../model/ui/tree-item';
import { NoteManagerService } from '../../services/note-manager-service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-select-folder-dialog',
  templateUrl: './select-folder-dialog.component.html',
  styleUrls: ['./select-folder-dialog.component.scss']
})
export class SelectFolderDialogComponent implements OnInit {

  selectedItem: TreeItem;
  rootItem = new TreeFolderItem();
  treeItemsMap = new Map<string, TreeItem>();

  constructor(public dialogRef: MatDialogRef<SelectFolderDialogComponent>,
    private noteService: NoteManagerService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.rootItem.iconName = 'folder';
    this.rootItem.name = 'Root';
    this.rootItem.expanded = true;
    this.rootItem.onClick = (item: any) => {
      this.selectedItem = item;
    }
    this.loadChildrenToFolder(this.rootItem);
  }

  async loadChildrenToFolder(root: TreeFolderItem) {
    const foldersList = await this.noteService.getAllFolders()
    const sortedFoldersList = foldersList.sort((a, b) => a.level - b.level);

    this.treeItemsMap.set(sortedFoldersList[0].id, root);
    root.folderId =  sortedFoldersList[0].id;

    if (root.folderId === this.data.selectedFolderId) {
      root.isSelected = true;
      this.selectedItem = root;
    }

    for (let i = 1; i < sortedFoldersList.length; i++) {
      const curFolder = sortedFoldersList[i]
      const parentItem = curFolder.parentId == null ? root : this.treeItemsMap.get(curFolder.parentId)

      // Gracefully handle the exceptional situation when the folder refer to non-existing parent.
      // It should not happen in most cases. Let's just skip it
      if (parentItem == null) {
        continue;
      }

      const curTreeItem = new TreeFolderItem();

      curTreeItem.folderId = curFolder.id;
      curTreeItem.showMenuButton = true;
      curTreeItem.hasAddButton = true;
      curTreeItem.iconName = 'folder'
      curTreeItem.onClick = (item: any) => {
        this.selectedItem = item;
      };
      curTreeItem.name = curFolder.title;
      curTreeItem.parent = parentItem;

      if (curTreeItem.folderId === this.data.selectedFolderId) {
        curTreeItem.isSelected = true;
        this.selectedItem = curTreeItem;
      }

      curTreeItem.expanded = true;
      parentItem.subItems.push(curTreeItem)
      this.treeItemsMap.set(curFolder.id, curTreeItem)
    }

    return Promise.resolve(root)
  }

  getRootItems(): Array<TreeItem> {
    return [this.rootItem];
  }

  close() {
    this.dialogRef.close();
  }
}
