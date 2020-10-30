import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { Folder } from '../model/folder';
import { ipcRenderer } from 'electron';
import { EmptyResultResponse, GetFolderByIdResponse, CreateFolderResponse, CreateNoteResponse, GetFoldersListResponse, GetRootFolderResponse, NoteShortInfo, GetNotesListResponse, GetNoteByIdResponse } from './../../proto/messages_pb';

@Injectable()
export class NoteManagerService {

    constructor() {
    }

    async createFolder(title: string, parentId: string): Promise<string> {
      const parent = this;
      const promise = new Promise<string>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-createfolder-reply', (event, arg) => {
            var folderProps = CreateFolderResponse.deserializeBinary(arg).toObject() as CreateFolderResponse.AsObject;
            resolve(folderProps.folderid);
        });
      });

      ipcRenderer.send('note-manager-service-createfolder-request', {'title':title, 'parentId':parentId});
      return promise;
    }

    async createNote(title: string, text: string, folderId: string): Promise<string> {
      const parent = this;
      const promise = new Promise<string>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-createnote-reply', (event, arg) => {
          var noteProps = CreateNoteResponse.deserializeBinary(arg).toObject() as CreateNoteResponse.AsObject;
          resolve(noteProps.noteid);
        });
      });

      ipcRenderer.send('note-manager-service-createnote-request', {'title':title, 'text':text, 'folderId':folderId});
      return promise;
    }


    async updateNote(note: Note): Promise<void> {
      const promise = new Promise<void>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-updatenote-reply', (event, arg) => {
            resolve();
        });
      });

      ipcRenderer.send('note-manager-service-updatenote-request', note);
      return promise;
    }

    async updateFolder(folder: Folder): Promise<void> {
      const promise = new Promise<void>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-updatefolder-reply', (event, arg) => {
            resolve();
        });
      });

      ipcRenderer.send('note-manager-service-updatefolder-request', folder);
      return promise;
    }

    async loadNoteById(id: string): Promise<Note> {
      const parent = this;
      const promise = new Promise<Note>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-loadnotebyid-reply', (event, arg) => {
          var props = GetNoteByIdResponse.deserializeBinary(arg).toObject() as GetNoteByIdResponse.AsObject;
          const note : Note = {
            id: props.id,
            title: props.title,
            text: props.text,
            folderId: props.folderid,
            level: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 0,
            deletedAt: new Date()
          };
          resolve(note);
        });
      });

      ipcRenderer.send('note-manager-service-loadnotebyid-request', { noteId : id });
      return promise;
    }

    async removeNote(id: string) {
      const promise = new Promise(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-removenote-reply', (event, arg) => {
            var result = EmptyResultResponse.deserializeBinary(arg).toObject() as EmptyResultResponse.AsObject;
            if (result.success) {
              resolve()
            } else {
              reject(result.errorcode)
            }
        });
      });

      ipcRenderer.send('note-manager-service-removenote-request', { id: id});
      return promise;
    }

    async removeFolder(id: string) {
      const promise = new Promise(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-removefolder-reply', (event, arg) => {
          var result = EmptyResultResponse.deserializeBinary(arg).toObject() as EmptyResultResponse.AsObject;
          if (result.success) {
            resolve()
          } else {
            reject(result.errorcode)
          }
        });
      });

      ipcRenderer.send('note-manager-service-removefolder-request', { id: id});
      return promise;
    }

    async getRootFolder(): Promise<Folder> {
      const promise = new Promise<Folder>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-getrootfolder-reply', (event, arg) => {
            var folderProps = GetRootFolderResponse.deserializeBinary(arg).toObject() as GetRootFolderResponse.AsObject;
            var folder : Folder = {
              id : folderProps.folderid,
              title: folderProps.title,
              parentId: null,
              children: null,
              notes: null,
              level: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: new Date(),
            }
            resolve(folder);
          });
        });
        ipcRenderer.send('note-manager-service-getrootfolder-request', null);
        return promise;
    };

    async loadFolderById(id: string): Promise<Folder> {
      const parent = this;
      const promise = new Promise<Folder>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-loadfolderbyid-reply', (event, arg) => {
          var folderProps = GetFolderByIdResponse.deserializeBinary(arg).toObject() as GetFolderByIdResponse.AsObject;
          const folder : Folder = {
              id : folderProps.id,
              title: folderProps.title,
              level: folderProps.level,
              parentId : folderProps.parentid,
              children : [],
              notes: [],
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt : null
          };
          resolve(folder);
        });
      });

      ipcRenderer.send('note-manager-service-loadfolderbyid-request', { folderId: id });
      return promise;
    }

    async loadNotesByFolder(folderId: string): Promise<Note[]> {
      const parent = this;
      const promise = new Promise<Note[]>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-loadnotesbyfolder-reply', (event, arg) => {
          var folderProps = GetNotesListResponse.deserializeBinary(arg).toObject() as GetNotesListResponse.AsObject;
          var notes = folderProps.notesList.map((n: NoteShortInfo.AsObject) => {
              const note : Note = {
                id: n.id,
                title: n.title,
                text: "",
                folderId: n.folderid,
                level: 0,
                createdAt: new Date(n.createdat),
                updatedAt: new Date(n.updatedat),
                userId: 0,
                deletedAt: null
              };
              return note;
          });
          resolve(notes);
        });
      });

      ipcRenderer.send('note-manager-service-loadnotesbyfolder-request', { folderId: folderId });
      return promise;
    }

    async getAllNotes(offset, limit : number): Promise<Note[]> {
      const parent = this;
      const promise = new Promise<Note[]>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-getallnotes-reply', (event, arg) => {
          var props = GetNotesListResponse.deserializeBinary(arg).toObject() as GetNotesListResponse.AsObject;
          var notes = props.notesList.map((n: NoteShortInfo.AsObject) => {
              const note : Note = {
                id: n.id,
                title: n.title,
                text: "",
                folderId: n.folderid,
                level: 0,
                createdAt: new Date(n.createdat),
                updatedAt: new Date(n.updatedat),
                userId: 0,
                deletedAt: null
              };
              return note;
          });
          resolve(notes);
        });
      });

      ipcRenderer.send('note-manager-service-getallnotes-request', {offset : offset, limit: limit});
      return promise;
    }

    async getAllFolders(): Promise<Folder[]> {
      const promise = new Promise<Folder[]>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-getallfolders-reply', (event, arg) => {
          var props = GetFoldersListResponse.deserializeBinary(arg).toObject() as GetFoldersListResponse.AsObject;
          var folders = props.foldersList.map(f => {
            const folder : Folder = {
              id : f.id,
              title: f.title,
              parentId: f.parentid,
              children: null,
              notes: null,
              level: f.level,
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: new Date(),
            };
            return folder;
        });
        resolve(folders);
        });
      });

      ipcRenderer.send('note-manager-service-getallfolders-request', {});
      return promise;
    }

    async searchNotes(query: string, folderId: string): Promise<Note[]> {
      const parent = this;
      const promise = new Promise<Note[]>(function (resolve, reject) {
        ipcRenderer.once('note-manager-service-searchnotes-reply', (event, arg) => {
          var props = GetNotesListResponse.deserializeBinary(arg).toObject() as GetNotesListResponse.AsObject;
          var notes = props.notesList.map((n: NoteShortInfo.AsObject) => {
              const note : Note = {
                id: n.id,
                title: n.title,
                text: "",
                folderId: n.folderid,
                level: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 0,
                deletedAt: new Date()
              };
              return note;
          });
          resolve(notes);
        });
      });

      ipcRenderer.send('note-manager-service-searchnotes-request', {query : query, folderId: folderId});
      return promise;
   }

    async getFavoriteNotes(): Promise<Note[]> {
        return new Array<Note>();
    }

    async addToFavorites(noteId: string) {
    }

    async removeFromFavorites(noteId: string) {
    }
}
