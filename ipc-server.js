"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIpc = void 0;
var electron_1 = require("electron");
var core = require("giganotes-core-js");
function initIpc() {
    initAuthServiceIpc();
    var emitter = new core.MyEventEmitter();
    initSyncServiceIpc(emitter);
    initNoteServiceRpc();
    core.initLogging();
    electron_1.ipcMain.on('init-core-request', function (event, arg) {
        core.initData(arg['apiPath'], arg['dataPath']);
        event.sender.send('init-core-reply', {});
    });
}
exports.initIpc = initIpc;
function initAuthServiceIpc() {
    electron_1.ipcMain.on('auth-service-get-last-login-data-request', function (event, arg) {
        var result = core.getLastLoginDataSerialized();
        event.sender.send('auth-service-get-last-login-data-reply', new Uint8Array(result));
    });
    electron_1.ipcMain.on('auth-service-login-request', function (event, arg) {
        var loginResult = core.makeLoginSerialized(arg['email'], arg['password']);
        event.sender.send('auth-service-login-reply', new Uint8Array(loginResult));
    });
    electron_1.ipcMain.on('auth-service-loginsocial-request', function (event, arg) {
        var loginResult = core.makeLoginSocialSerialized(arg['email'], arg['provider'], arg['token']);
        event.sender.send('auth-service-loginsocial-reply', new Uint8Array(loginResult));
    });
    electron_1.ipcMain.on('auth-service-loginoffline-request', function (event, arg) {
        event.sender.send('auth-service-loginoffline-reply', {});
    });
    electron_1.ipcMain.on('auth-service-logout-request', function (event, arg) {
        var logoutResult = core.makeLogoutSerialized();
        event.sender.send('auth-service-logout-reply', {});
    });
    electron_1.ipcMain.on('auth-service-register-request', function (event, arg) {
        var result = core.registerSerialized(arg['email'], arg['password']);
        event.sender.send('auth-service-register-reply', new Uint8Array(result));
    });
    electron_1.ipcMain.on('auth-service-hasvalidtoken-request', function (event, arg) {
        var hasValidToken = {};
        event.sender.send('auth-service-hasvalidtoken-reply', hasValidToken);
    });
}
function initSyncServiceIpc(emitter) {
    var sender = null;
    electron_1.ipcMain.on('sync-service-sync-request', function (event, arg) {
        core.synchronize();
        sender = event.sender;
    });
    emitter.on('coreEvent', function (data) {
        console.log('Sync finished event received');
        sender.send('sync-service-sync-reply', {});
    });
}
function initNoteServiceRpc() {
    electron_1.ipcMain.on('note-manager-service-login-request', function (event, arg) {
        var authResponse = {};
        event.sender.send('note-manager-service-login-reply', authResponse);
    });
    electron_1.ipcMain.on('note-manager-service-loginsocial-request', function (event, arg) {
        var authResponse = {};
        event.sender.send('note-manager-service-loginsocial-reply', authResponse);
    });
    electron_1.ipcMain.on('note-manager-service-signup-request', function (event, arg) {
        var authResponse = {};
        event.sender.send('note-manager-service-signup-reply', authResponse);
    });
    electron_1.ipcMain.on('note-manager-service-searchnotes-request', function (event, arg) {
        var result = core.searchNotesSerialized(arg['query']);
        event.sender.send('note-manager-service-searchnotes-reply', new Uint8Array(result));
    });
    electron_1.ipcMain.on('note-manager-service-createfolder-request', function (event, arg) {
        var result = core.createFolderSerialized(arg['title'], arg['parentId']);
        event.sender.send('note-manager-service-createfolder-reply', new Uint8Array(result));
    });
    electron_1.ipcMain.on('note-manager-service-createnote-request', function (event, arg) {
        var result = core.createNoteSerialized(arg['title'], arg['text'], arg['folderId']);
        event.sender.send('note-manager-service-createnote-reply', new Uint8Array(result));
    });
    electron_1.ipcMain.on('note-manager-service-getallnotes-request', function (event, arg) {
        var notesResult = core.getAllNotesSerialized(arg['offset'], arg['limit']);
        event.sender.send('note-manager-service-getallnotes-reply', new Uint8Array(notesResult));
    });
    electron_1.ipcMain.on('note-manager-service-getallfolders-request', function (event, arg) {
        var foldersResult = core.getAllFoldersSerialized();
        event.sender.send('note-manager-service-getallfolders-reply', new Uint8Array(foldersResult));
    });
    electron_1.ipcMain.on('note-manager-service-getrootfolder-request', function (event, arg) {
        var rootFolderResult = core.getRootFolderSerialized();
        event.sender.send('note-manager-service-getrootfolder-reply', new Uint8Array(rootFolderResult));
    });
    electron_1.ipcMain.on('note-manager-service-loadnotebyid-request', function (event, arg) {
        var noteResult = core.getNoteByIdSerialized(arg['noteId']);
        event.sender.send('note-manager-service-loadnotebyid-reply', new Uint8Array(noteResult));
    });
    electron_1.ipcMain.on('note-manager-service-loadfolderbyid-request', function (event, arg) {
        var result = core.getFolderByIdSerialized(arg['folderId']);
        event.sender.send('note-manager-service-loadfolderbyid-reply', new Uint8Array(result));
    });
    electron_1.ipcMain.on('note-manager-service-loadnotesbyfolder-request', function (event, arg) {
        var notesResult = core.getNotesByFolderSerialized(arg['folderId']);
        event.sender.send('note-manager-service-loadnotesbyfolder-reply', new Uint8Array(notesResult));
    });
    electron_1.ipcMain.on('note-manager-service-hasfolderwithid-request', function (event, arg) {
        var hasFolder = {};
        event.sender.send('note-manager-service-hasfolderwithid-reply', hasFolder);
    });
    electron_1.ipcMain.on('note-manager-service-removefolder-request', function (event, arg) {
        var res = core.removeFolderSerialized(arg['id']);
        event.sender.send('note-manager-service-removefolder-reply', new Uint8Array(res));
    });
    electron_1.ipcMain.on('note-manager-service-removenote-request', function (event, arg) {
        var res = core.removeNoteSerialized(arg['id']);
        event.sender.send('note-manager-service-removenote-reply', new Uint8Array(res));
    });
    electron_1.ipcMain.on('note-manager-service-updatefolder-request', function (event, arg) {
        var res = core.updateFolderSerialized(arg['id'], arg['parentId'], arg['title'], arg['level']);
        event.sender.send('note-manager-service-updatefolder-reply', new Uint8Array(res));
    });
    electron_1.ipcMain.on('note-manager-service-updatenote-request', function (event, arg) {
        var res = core.updateNoteSerialized(arg['id'], arg['folderId'], arg['title'], arg['text']);
        event.sender.send('note-manager-service-updatenote-reply', new Uint8Array(res));
    });
    electron_1.ipcMain.on('note-manager-service-addtofavorites-request', function (event, arg) {
        var res = core.addToFavoritesSerialized(arg['id']);
        event.sender.send('note-manager-service-addtofavorites-reply', new Uint8Array(res));
    });
    electron_1.ipcMain.on('note-manager-service-removefromfavorites-request', function (event, arg) {
        var res = core.removeFromFavoritesSerialized(arg['id']);
        event.sender.send('note-manager-service-removefromfavorites-reply', new Uint8Array(res));
    });
    electron_1.ipcMain.on('note-manager-service-getfavorites-request', function (event, arg) {
        var res = core.getFavoritesSerialized();
        event.sender.send('note-manager-service-getfavorites-reply', new Uint8Array(res));
    });
}
//# sourceMappingURL=ipc-server.js.map