import { ElectronService } from './../../providers/electron.service';
import { Location } from '@angular/common';
import { SelectFolderDialogComponent } from "./../select-folder-dialog/select-folder-dialog.component";
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, NgZone } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NoteManagerService } from '../../services/note-manager-service';
import { Note } from "../../model/note";
import { Folder } from "../../model/folder";
import { LinkTreeItem } from "../../model/ui/linktreeitem";
import { v4 as uuid } from "uuid";
import { AuthService } from "../../services/auth-service";
import { SyncService } from '../../services/sync-service';
import { EventBusService } from "../../services/event-bus-service";
import { ScreenService } from "../../services/screen.service";
import { NavigateEvent } from "../../model/events/navigate-event";
import { SyncFinishedEvent } from "../../model/events/sync-finished";
import { MatDialog } from "@angular/material/dialog";
import { TreeItem, TreeFolderItem } from '../../model/ui/tree-item';
import { NavTreeEventsService } from '../../services/nav-tree-events-.service';
import { SocialAuthService } from '../../services/social-auth/social-auth-service';
import { NavigationTreeComponent } from '../navigation-tree/navigation-tree.component';
import { AddFolderDialogComponent } from '../add-folder-dialog/add-folder-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';
//import * as Hammer from 'hammerjs';
import { ScreenChangedEvent } from '../../model/events/screen-changed';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { from, Subscription } from 'rxjs';

@Component({
  selector: "app-notes-list-with-editor",
  templateUrl: "./notes-list-with-editor.component.html",
  styleUrls: ["./notes-list-with-editor.component.scss"],
  host: { style: "height:100%; display: flex; flex-direction:column" }
})
export class NotesListWithEditorComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild(NavigationTreeComponent) navigationTree: NavigationTreeComponent;
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @ViewChild('fileInput') fileInput: ElementRef;

  INTERNAL_LINK_PREFIX = "local:";

  title = 'mattest';
  isDarkTheme = true;
  bannerPath = 'assets/icon58x64.png';
  curTreeItem: TreeItem;
  items = Array<TreeItem>();
  allNotesMenuItem = new TreeItem();
  rootItem = new TreeFolderItem();
  myNotesMenuItem: TreeFolderItem;
  treeItemsMap = new Map<string, TreeItem>();
  navTreeEventsService = new NavTreeEventsService();
  isNavMenuLoaded = false;
  isSyncOnInitDone = false;
  isOffline = false;
  isEditorScriptLoaded = false;
  isSelectedNoteLoaded = false;
  public searchFilter: string;
  notes = Array<Note>();
  selectedNote: Note = {
    id: "",
    title: "",
    text: "",
    folderId: "",
    level: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 0,
    deletedAt: new Date()
  };

  folderOfSelectedNote: Folder;
  selectedNoteInfo: Note = {
    id: "",
    title: "",
    text: "",
    folderId: "",
    level: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 0,
    deletedAt: new Date()
  };

  currentFolder: Folder;
  noteEditor: any;
  editorSetup: any;
  newNoteMobileCreationStarted = false;
  showMobileList = true;
  mobileShowBackButton = false;

  searchSubscription: Subscription;

  email = '';

  //Parameters
  mode: string;
  folderId: string;
  noteId: string;

  prevMode: string;
  prevFolderId: string;
  prevNoteId: string;

  showFabButtons = false;
  fabTogglerState = 'inactive';

  isReadOnly = true;

  showFabItems() {
    this.fabTogglerState = 'active';
    this.showFabButtons = true;
  }

  hideFabItems() {
    this.fabTogglerState = 'inactive';
    this.showFabButtons = false;
  }

  onToggleFab() {
    if (!this.showFabButtons) {
      this.showFabItems();
    } else {
      this.hideFabItems();
    }
  }

  @ViewChild("noteTitleInput") noteTitleInput: MatInput;

  configureEditorSetup() {
    const parent = this;
    this.editorSetup = {
      plugins:
        "paste link anchor toc searchreplace table code codesample lists print textcolor",
      menubar: false,
      statusbar: false,
      branding: false,
      toolbar:
        "print | insert | undo redo | formatselect | bold italic underline backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table | code codesample",
      link_list: async function(success) {
        const list = await parent.prepareLinkSelectionMenu();
        success(list);
      },
      codesample_languages: [
        { text: "HTML/XML", value: "markup" },
        { text: "JavaScript", value: "javascript" },
        { text: "bash", value: "bash" },
        { text: "JSON", value: "json" },
        { text: "go", value: "go" },
        { text: "CSS", value: "css" },
        { text: "PHP", value: "php" },
        { text: "Ruby", value: "ruby" },
        { text: "Python", value: "python" },
        { text: "Java", value: "java" },
        { text: "C", value: "c" },
        { text: "C#", value: "csharp" },
        { text: "C++", value: "cpp" }
      ],
      paste_data_images: true,
      height: '100%',
      width:'100%',
      setup: editor => {
        this.noteEditor = editor;
      }
    };
  }

  ngOnInit() {

    this.isOffline = this.authService.isOffline;

    this.configureEditorSetup();

    this.eventBusService.getMessages().subscribe(e => {
      if (e instanceof ScreenChangedEvent) {
        if (e.isMobile) {
          this.showMobileList = this.noteId == null;
          this.mobileShowBackButton = !this.showMobileList;
        }
      }
    });

    this.dynamicScriptLoaderService.loadScript('assets/tinymce/tinymce.min.js').then(r => {
      this.isEditorScriptLoaded = true;
    });

    var parent = this;

    this.route.params.subscribe(params => {

      // Clear search filter when opening a route
      this.searchFilter = '';

      this.prevMode = this.mode;
      this.prevFolderId = this.folderId;
      this.prevNoteId = this.noteId;

      parent.saveCurrentNote().then(() => {
        switch (params.mode) {
          case "all":
            this.mode = "all";
            this.noteId = params.noteId;
            break;
          case "fav":
            this.mode = "fav";
            break;
          case "folder":
            this.mode = "folder";
            this.folderId = params.folderId;
            this.noteId = params.noteId;
            break;
          default:
            this.mode = "all";
            this.noteId = null;
        }

        if (this.screenService.isMobile) {
          this.showMobileList = this.noteId == null;
          this.mobileShowBackButton = !this.showMobileList;
        }

        // If we are in note editing mode, flush note load status flag
        if (this.noteId != null) {
          this.isSelectedNoteLoaded = false;
        }

        this.loadData();
      });
    });

    if (this.screenService.isMobile) {
      document.addEventListener('backbutton', this.onBack.bind(this), false);
    }
  }

  ngAfterViewChecked() {
    if (this.screenService.isMobile && !this.showMobileList && this.newNoteMobileCreationStarted) {
      this.noteTitleInput.focus();
    }
  }

  async loadData() {
    if (!this.isNavMenuLoaded) {
      await this.loadMenuItems();
    }

    if (this.mode !== this.prevMode || this.folderId !== this.prevFolderId) {
      await this.loadListItems();
    } else {
      await this.loadSpecificOrFirstNote();
    }

    if (!this.isSyncOnInitDone) {
      this.isSyncOnInitDone = true;
      await this.doSync();
    }
  }

  async doSync() {
    if (this.isOffline) {
      return;
    }
    await this.syncService.doSync();

    // We should reload menu items and list items after sync
    await this.loadMenuItems();
    await this.loadListItems();

    this.eventBusService.sendMessage(new SyncFinishedEvent());
  }

  isSyncing() {
    return this.syncService.isSyncing();
  }

  ngOnDestroy() {
    document.removeEventListener('backbutton', this.onBack, false);
  }

  constructor(
    private zone: NgZone,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    elementRef: ElementRef,
    private route: ActivatedRoute,
    private location: Location,
    private noteService: NoteManagerService,
    public authService: AuthService,
    private syncService: SyncService,
    private eventBusService: EventBusService,
    public screenService: ScreenService,
    private socialAuthService: SocialAuthService,
    private electronService: ElectronService,
    private dynamicScriptLoaderService: DynamicScriptLoaderService,
    private router: Router,
    private dialog: MatDialog
  ) {

    if (this.screenService.isMobile) {
 /*     // To get swipeable sidebar
      const hammertime = new Hammer(elementRef.nativeElement, {});
      hammertime.get('pan').set({direction: Hammer.DIRECTION_ALL});

      hammertime.on('panright', (ev) => {
          this.sidenav.open();
      });
     hammertime.on('panleft', (ev) => {
          this.sidenav.close();
     });

      hammertime.on('panup', (ev) => false);
      hammertime.on('pandown', (ev) => false);
      */
    }
  }

  async loadListItems() {
    switch (this.mode) {
      case "all":
        await this.loadAllNotes();
        break;
      case "fav":
        await this.loadFavorites();
        break;
      case "folder":
        await this.loadNotes(this.folderId);
        break;
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgTag = '<img src="' + reader.result + '" style="max-width:100%">';
        this.noteEditor.execCommand('mceInsertRawHTML', false, imgTag);
      };
    }
  }

  private addImage() {
    this.fileInput.nativeElement.click();
  }

  async readFolderToLinkSelectionMenu(folder: Folder, items: LinkTreeItem[]) {
    if (folder.notes != null) {
      for (const note of folder.notes) {
        const link = new LinkTreeItem(note.title);
        link.value = this.INTERNAL_LINK_PREFIX + note.id;
        items.push(link);
      }
    }

    if (folder.children != null) {
      for (const childFolder of folder.children) {
        const link = new LinkTreeItem(childFolder.title);
        link.menu = new Array<LinkTreeItem>();
        await this.readFolderToLinkSelectionMenu(childFolder, link.menu);
        items.push(link);
      }
    }
  }

  async prepareLinkSelectionMenu(): Promise<LinkTreeItem[]> {
    let items = new Array<LinkTreeItem>();
    const rootFolder = await this.buildTreeFromNodesList();
    await this.readFolderToLinkSelectionMenu(rootFolder, items);
    return items;
  }

  async buildTreeFromNodesList(): Promise<Folder> {
    const folders = await this.noteService.getAllFolders();
    const all_notes = await this.noteService.getAllNotes(0, 10000000);

    folders.sort((a, b) => a.level - b.level);

    const root = folders[0];
    const foldersMap = new Map<string, Folder>();
    foldersMap.set(root.id, root);

    for (let i = 1; i < folders.length; i++) {
      const folder = folders[i];
      const parentFolder = foldersMap.get(folder.parentId);

      // Gracefully handle the exceptional situation when the folder refer to non-existing parent.
      // It should not happen in most cases. Let's just skip it
      if (parentFolder == null) {
        continue;
      }

      if (parentFolder.children == null) {
        parentFolder.children = Array<Folder>();
      }
      parentFolder.children.push(folder);
      foldersMap.set(folder.id, folder);
    }

    for (const note of all_notes) {
      const parentFolder = foldersMap.get(note.folderId);

      if (parentFolder == null) {
        continue;
      }

      if (parentFolder.notes == null) {
        parentFolder.notes = Array<Note>();
      }
      parentFolder.notes.push(note);
    }

    return Promise.resolve(root);
  }

  async loadAllNotes() {
    var start = new Date().getTime();
    this.notes = await this.noteService.getAllNotes(0, 100);
    this.currentFolder = await this.noteService.getRootFolder();
    await this.loadSpecificOrFirstNote();
  }

  async loadFavorites() {
    this.notes = await this.noteService.getFavoriteNotes();
    this.selectFirstNote();
  }

  async loadSpecificOrFirstNote() {
    if (this.noteId != null) {
      const filteredBySelectedId = this.notes.filter(n => n.id == this.noteId);
      if (filteredBySelectedId.length == 1) {
        const noteToSelect = filteredBySelectedId[0];
        this.selectedNoteInfo = noteToSelect;
        await this.loadSelectedNoteById(this.selectedNoteInfo.id);
      }
    } else {
      this.selectFirstNote();
    }
  }

  async loadSelectedNoteById(id: string) {
    this.selectedNote = await this.noteService.loadNoteById(id);
    this.isSelectedNoteLoaded = true;
  }

  async loadNotes(folderId: string) {
    this.selectedNote.text = "";
    this.selectedNote.title = "";

    this.notes = await this.noteService.loadNotesByFolder(folderId);
    this.currentFolder = await this.noteService.loadFolderById(folderId);

    await this.loadSpecificOrFirstNote();
  }

  async selectFirstNote() {
    if (this.notes.length > 0) {
      this.selectedNoteInfo = this.notes[0];
      await this.loadSelectedNoteById(this.selectedNoteInfo.id);
      this.folderOfSelectedNote = await this.noteService.loadFolderById(
        this.selectedNote.folderId
      );
    } else {
      this.selectedNote.title = "";
      this.selectedNote.text = "";
      this.folderOfSelectedNote = null;
    }
  }

  async onNoteClick(noteInfo: Note) {
    const note = await this.noteService.loadNoteById(noteInfo.id);
    this.router.navigate(['/home', { mode: this.mode, folderId: note.folderId, noteId: note.id }]);
  }

  async onNewNote() {
    const newTitle = "";
    const newText = "";

    const newNoteId = await this.noteService.createNote(newTitle, newText, this.currentFolder.id);
    this.selectedNote = {
      id : newNoteId,
      title : newTitle,
      text : newText,
      folderId: this.currentFolder.id
    } as Note;

    this.folderOfSelectedNote = await this.noteService.loadFolderById(
      this.selectedNote.folderId
    );
    this.notes.splice(0, 0, this.selectedNote);
    this.selectedNoteInfo = this.notes[0];
    this.noteTitleInput.focus();
  }

  async onNewNoteMobile() {
    this.hideFabItems();

    const newTitle = "";
    const newText = "";

    const newNoteId = await this.noteService.createNote(newTitle, newText, this.currentFolder.id);
    this.selectedNote = {
      id : newNoteId,
      title : newTitle,
      text : newText,
      folderId: this.currentFolder.id
    } as Note;

    this.notes.splice(0, 0, this.selectedNote);
    this.selectedNoteInfo = this.notes[0];

    this.newNoteMobileCreationStarted = true;
    this.router.navigate(['/home', { mode: this.mode, folderId: this.selectedNote.folderId, noteId: this.selectedNote.id }]);
  }


  onNewFolder() {
    this.hideFabItems();
    const dialogRef = this.dialog.open(AddFolderDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(folderName => {
      this.navigationTree.createFolder(this.curTreeItem as TreeFolderItem, folderName);
    });
  }

  async saveCurrentNote() {
    if (this.selectedNote == null || this.selectedNote.id.length == 0) {
      return;
    }

    const noteInDb = await this.noteService.loadNoteById(this.selectedNote.id);
    const newContent = this.noteEditor.getContent();
    if (noteInDb.text !== newContent || this.selectedNote.title !== noteInDb.title) {
      this.selectedNote.text = newContent;
      this.selectedNote.updatedAt = new Date();
      this.noteService.updateNote(this.selectedNote);
    }
  }

  onSaveNote() {
    if (this.selectedNote == null) {
      return;
    }

    this.saveCurrentNote();

    const index = this.notes.findIndex(o => o === this.selectedNoteInfo);
    this.notes.splice(index, 1);
    this.notes.splice(0, 0, this.selectedNoteInfo);
  }

  async deleteSelectedNote() {
    const index = this.notes.findIndex(o => o === this.selectedNoteInfo);
    this.notes.splice(index, 1);
    await this.noteService.removeNote(this.selectedNoteInfo.id);

    await this.selectFirstNote();
  }

  async onDeleteNote() {
    if (this.selectedNote == null) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Delete note',
        text: 'Are you sure you want to delete this note?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSelectedNote().then(r => {
          if (this.screenService.isMobile) {
                this.router.navigate(['/home', { mode: 'folder', folderId: this.currentFolder.id}]);
          }
        })
      }
    });

  }

  onNoteTitleKeyUp(event) {
    this.selectedNoteInfo.title = this.selectedNote.title;
  }

  searchNotesKeyUp(event) {
    this.searchNotes();
  }

  searchNotes() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    if (this.searchFilter.length == 0) {
      this.loadListItems();
      return;
    }

    let observable;

    if (this.mode === 'all') {
      observable = from(this.noteService.searchNotes(this.searchFilter, null));
    } else {
      observable = from(this.noteService.searchNotes(this.searchFilter, this.currentFolder.id));
    }

    this.searchSubscription = from(observable).subscribe((notes : Array<Note>)  => {
      this.notes = notes;
      if (this.notes.length > 0) {
        this.selectFirstNote();
      } else {
        this.selectedNote.title = '';
        this.selectedNote.text = '';
      }
    });
  }

  async handleEditorClick(event: any) {
     const element = event.event.srcElement;
    if (element.tagName === "A") {
      const hrefValue = element.attributes["href"].value;
      if (hrefValue.indexOf(this.INTERNAL_LINK_PREFIX) !== -1) {
        const id = hrefValue.substring(6);
        this.onHandleNoteNavigation(id);
      } else {
        this.electronService.openInExternalBrowser(hrefValue);
        event.event.preventDefault();
      }
    }
  }

  async onAddToFavorites() {
    this.noteService.addToFavorites(this.selectedNote.id);
  }

  onNoteNameInputFocusOut() {
    this.onSaveNote();
  }

  onChangeFolder() {
    const dialogRef = this.dialog.open(SelectFolderDialogComponent, {
      width: "450px",
      height: "450px",
      data: {
        selectedFolderId: this.folderOfSelectedNote.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.folderId !== this.folderOfSelectedNote.id) {
        this.selectedNote.folderId = result.folderId;
        this.noteService.updateNote(this.selectedNote);
        this.noteService.loadFolderById(result.folderId).then(folder => {
          this.folderOfSelectedNote = folder;

          if (this.mode === 'folder') {
            this.eventBusService.sendMessage(
              new NavigateEvent(this.selectedNote.id)
            );
          }
        });
      }
    });
  }

  async onHandleNoteNavigation(noteId: string) {
    const note = await this.noteService.loadNoteById(noteId)
    if (!this.screenService.isMobile) {
      await this.navigationTree.clearAnySelection(this.rootItem);
      const folderItem = this.treeItemsMap.get(note.folderId);
      this.makeSelectedWithExpandingParents(folderItem);
    }
    this.zone.run(() => {
      this.router.navigate(['/home', { mode: 'folder', folderId: note.folderId, noteId: noteId }], { relativeTo: this.route })
    })
  }

  makeSelectedWithExpandingParents(curItem: TreeItem) {
    let item = curItem;
    item.isSelected = true
    while (item.parent != null) {
      item = item.parent
      if (!item.expanded) {
        item.expanded = true
      }
    }
  }

  async init() {
    await this.loadMenuItems();
  }

  async logout() {
    await this.authService.logout();

    const loginType = this.authService.loginType;
    if (loginType === 'social') {
      this.socialAuthService.signOut();
    }

    this.router.navigate(['/login'])
  }

  onAllNotesClick(parent, item) {
    if (parent.screenService.isMobile) {
      parent.sidenav.close();
    }
    parent.router.navigate(['/home', { mode: 'all' }])
  }

  onFavoritesClick(parent, item) {
    if (parent.screenService.isMobile) {
      parent.sidenav.close();
    }
    parent.router.navigate(['/home', { mode: 'fav' }] )
  }

  onFolderClick(parent, item) {
    if (parent.screenService.isMobile) {
      parent.sidenav.close();
    }
    parent.router.navigate(['/home', { mode: 'folder', folderId: item.folderId }] )
  }

  onLogoutClick(parent, item) {
    this.logout();
  }

  onBack() {
    this.location.back();
  }

  getMobileTitle(): string {
    if (this.showMobileList) {
      if (this.mode === 'all') {
        return 'All notes';
      }

      if (this.mode === 'fav') {
        return 'Favorites';
      }

      return (this.currentFolder != null) ? this.currentFolder.title : '';
    }
  }

  async onSaveNoteMobile() {
    this.newNoteMobileCreationStarted = false;
    await this.onSaveNote();
    this.onBack();
  }

  async loadChildrenToFolder(root: TreeFolderItem) {
    const foldersList = await this.noteService.getAllFolders()
    const sortedFoldersList = foldersList.sort((a, b) => a.level - b.level);

    this.treeItemsMap.set(sortedFoldersList[0].id, root)

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
        this.curTreeItem = item;
        this.onFolderClick(this, item)
      };
      curTreeItem.name = curFolder.title;
      curTreeItem.parent = parentItem;

      parentItem.subItems.push(curTreeItem)
      this.treeItemsMap.set(curFolder.id, curTreeItem)
    }

    await this.sortSubitemsByName(root);

    return Promise.resolve(root);
  }

  async sortSubitemsByName(item: TreeItem) {
       item.subItems = item.subItems.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
       for (const subItem of item.subItems) {
         await this.sortSubitemsByName(subItem);
       }
  }

  async loadMenuItems() {
    this.items = [];
    // Pseudo root item

    this.allNotesMenuItem.onClick = (item: any) => {
      this.onAllNotesClick(this, item)
    };
    this.allNotesMenuItem.name = "All notes";
    this.allNotesMenuItem.iconName = 'list'
    this.allNotesMenuItem.parent = this.rootItem;

    if (this.mode === 'all') {
      this.allNotesMenuItem.isSelected = true;
      this.curTreeItem = this.allNotesMenuItem;
    }

    this.items.push(this.allNotesMenuItem)

    const favoritesMenuItem = new TreeItem();
    favoritesMenuItem.onClick = (item: any) => {
      this.onFavoritesClick(this, item)
    };
    favoritesMenuItem.name = "Favorites";
    favoritesMenuItem.iconName = 'favorite'
    favoritesMenuItem.parent = this.rootItem;

    if (this.mode === 'fav') {
      favoritesMenuItem.isSelected = true;
      this.curTreeItem = favoritesMenuItem;
    }

    this.items.push(favoritesMenuItem)

    const rootFolder = await this.noteService.getRootFolder();

    this.myNotesMenuItem = new TreeFolderItem();
    this.myNotesMenuItem.folderId = rootFolder.id;
    this.myNotesMenuItem.showMenuButton = true;
    this.myNotesMenuItem.hasAddButton = true;
    this.myNotesMenuItem.onClick = (item: any) => {
      this.curTreeItem = item;
      this.onFolderClick(this, item);
    }
    this.myNotesMenuItem.name = "My notes";
    this.myNotesMenuItem.iconName = 'folder'
    this.myNotesMenuItem.parent = this.rootItem;
    this.myNotesMenuItem.expanded = true

    this.items.push(this.myNotesMenuItem)

    this.rootItem.subItems.push(...this.items)

    if (this.screenService.isMobile) {
      const logoutMenuItem = new TreeItem();
      logoutMenuItem.onClick = (item: any) => {
        this.onLogoutClick(this, item)
      };

      logoutMenuItem.name = "Logout";
      logoutMenuItem.iconName = 'exit_to_app';
      logoutMenuItem.parent = this.rootItem;

      this.items.push(logoutMenuItem)
    }

    await this.loadChildrenToFolder(this.myNotesMenuItem)

    if (this.mode === 'folder') {
      const treeItem = this.treeItemsMap.get(this.folderId);
      treeItem.isSelected = true;
      this.curTreeItem = treeItem;
    }

    this.isNavMenuLoaded = true;
  }
}
