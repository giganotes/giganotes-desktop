import { ipcMain, ipcRenderer } from 'electron';
import * as core from 'giganotes-core-js';
import { writeFile } from 'fs';

export function initIpc() {
  initAuthServiceIpc();

  const emitter = new core.MyEventEmitter();

  initSyncServiceIpc(emitter);
  initNoteServiceRpc();

  core.initLogging();

  ipcMain.on('init-core-request', (event, arg) => {
    core.initData(arg['apiPath'], arg['dataPath']);
    event.sender.send('init-core-reply', {});
  });

  ipcMain.on('save-file-request', (event, arg) => {
    writeFile(arg['fileName'], arg['data'], (err) => {
      if (err) {
        event.sender.send('save-file-reply', {success : false, error: err.message})
      } else {
        event.sender.send('save-file-reply', {success : true})
      }
    });
  });
}

function initAuthServiceIpc() {

  ipcMain.on('auth-service-get-last-login-data-request', (event, arg) => {
    var result = core.getLastLoginDataSerialized();
    event.sender.send('auth-service-get-last-login-data-reply', new Uint8Array(result));
  });

  ipcMain.on('auth-service-login-request', (event, arg) => {
    var loginResult = core.makeLoginSerialized(arg['email'], arg['password']);
    event.sender.send('auth-service-login-reply', new Uint8Array(loginResult));
  });

  ipcMain.on('auth-service-loginsocial-request', (event, arg) => {
    var loginResult = core.makeLoginSocialSerialized(arg['email'], arg['provider'], arg['token']);
    event.sender.send('auth-service-loginsocial-reply', new Uint8Array(loginResult));
  });

  ipcMain.on('auth-service-loginoffline-request', (event, arg) => {

        event.sender.send('auth-service-loginoffline-reply', {});
  });

  ipcMain.on('auth-service-logout-request', (event, arg) => {
      var logoutResult = core.makeLogoutSerialized();
      event.sender.send('auth-service-logout-reply', {});
  });

  ipcMain.on('auth-service-register-request', (event, arg) => {
    var result = core.registerSerialized(arg['email'], arg['password']);
    event.sender.send('auth-service-register-reply', new Uint8Array(result));
  });

  ipcMain.on('auth-service-hasvalidtoken-request', (event, arg) => {
    var hasValidToken = {};
        event.sender.send('auth-service-hasvalidtoken-reply', hasValidToken);
  });
}

function initSyncServiceIpc(emitter) {
    var sender = null;
    ipcMain.on('sync-service-sync-request', (event, arg) => {
      core.synchronize();
      sender = event.sender;
    });

    emitter.on('coreEvent', data => {
      console.log('Sync finished event received');
      sender.send('sync-service-sync-reply', {});
    });
}

function initNoteServiceRpc() {

  ipcMain.on('note-manager-service-login-request', (event, arg) => {
    var authResponse = {};
        event.sender.send('note-manager-service-login-reply', authResponse);

  });

  ipcMain.on('note-manager-service-loginsocial-request', (event, arg) => {
    var authResponse = {};
        event.sender.send('note-manager-service-loginsocial-reply', authResponse);

  });

  ipcMain.on('note-manager-service-signup-request', (event, arg) => {
    var authResponse = {};
        event.sender.send('note-manager-service-signup-reply', authResponse);

  });

  ipcMain.on('note-manager-service-searchnotes-request', (event, arg) => {
    var result = core.searchNotesSerialized(arg['query']);
    event.sender.send('note-manager-service-searchnotes-reply', new Uint8Array(result));
  });

  ipcMain.on('note-manager-service-createfolder-request', (event, arg) => {
    var result = core.createFolderSerialized(arg['title'], arg['parentId']);
    event.sender.send('note-manager-service-createfolder-reply', new Uint8Array(result));
  });

  ipcMain.on('note-manager-service-createnote-request', (event, arg) => {
    var result = core.createNoteSerialized(arg['title'], arg['text'], arg['folderId']);
    event.sender.send('note-manager-service-createnote-reply', new Uint8Array(result));
  });

  ipcMain.on('note-manager-service-getallnotes-request', (event, arg) => {
    var notesResult = core.getAllNotesSerialized(arg['offset'], arg['limit']);
    event.sender.send('note-manager-service-getallnotes-reply', new Uint8Array(notesResult));
  });

  ipcMain.on('note-manager-service-getallfolders-request', (event, arg) => {
    var foldersResult = core.getAllFoldersSerialized();
    event.sender.send('note-manager-service-getallfolders-reply', new Uint8Array(foldersResult));
  });

  ipcMain.on('note-manager-service-getrootfolder-request', (event, arg) => {
    var rootFolderResult = core.getRootFolderSerialized();
    event.sender.send('note-manager-service-getrootfolder-reply', new Uint8Array(rootFolderResult));
  });

  ipcMain.on('note-manager-service-loadnotebyid-request', (event, arg) => {
    var noteResult = core.getNoteByIdSerialized(arg['noteId']);
    event.sender.send('note-manager-service-loadnotebyid-reply', new Uint8Array(noteResult));
  });

  ipcMain.on('note-manager-service-loadfolderbyid-request', (event, arg) => {
    var result = core.getFolderByIdSerialized(arg['folderId']);
    event.sender.send('note-manager-service-loadfolderbyid-reply', new Uint8Array(result));
  });

  ipcMain.on('note-manager-service-loadnotesbyfolder-request', (event, arg) => {
      var notesResult = core.getNotesByFolderSerialized(arg['folderId']);
      event.sender.send('note-manager-service-loadnotesbyfolder-reply', new Uint8Array(notesResult));
  });

  ipcMain.on('note-manager-service-hasfolderwithid-request', (event, arg) => {
    var hasFolder = {};
        event.sender.send('note-manager-service-hasfolderwithid-reply', hasFolder);
  });

  ipcMain.on('note-manager-service-removefolder-request', (event, arg) => {
    var res = core.removeFolderSerialized(arg['id']);
    event.sender.send('note-manager-service-removefolder-reply', new Uint8Array(res));
  });

  ipcMain.on('note-manager-service-removenote-request', (event, arg) => {
    var res = core.removeNoteSerialized(arg['id'])
    event.sender.send('note-manager-service-removenote-reply', new Uint8Array(res));
  });

  ipcMain.on('note-manager-service-updatefolder-request', (event, arg) => {
    var res = core.updateFolderSerialized(arg['id'], arg['parentId'], arg['title'], arg['level'])
    event.sender.send('note-manager-service-updatefolder-reply', new Uint8Array(res));
  });

  ipcMain.on('note-manager-service-updatenote-request', (event, arg) => {
    var res = core.updateNoteSerialized(arg['id'], arg['folderId'], arg['title'], arg['text'])
    event.sender.send('note-manager-service-updatenote-reply', new Uint8Array(res));
  });

  ipcMain.on('note-manager-service-addtofavorites-request', (event, arg) => {
    var res = core.addToFavoritesSerialized(arg['id'])
    event.sender.send('note-manager-service-addtofavorites-reply', new Uint8Array(res));
  });

  ipcMain.on('note-manager-service-removefromfavorites-request', (event, arg) => {
    var res = core.removeFromFavoritesSerialized(arg['id'])
    event.sender.send('note-manager-service-removefromfavorites-reply', new Uint8Array(res));
  });

  ipcMain.on('note-manager-service-getfavorites-request', (event, arg) => {
    var res = core.getFavoritesSerialized();
    event.sender.send('note-manager-service-getfavorites-reply', new Uint8Array(res));
  });
}
