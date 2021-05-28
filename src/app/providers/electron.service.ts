import { Injectable } from '@angular/core';
import { AppConfig } from '../../environments/environment';
import { extension } from 'mime-types';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, remote, shell } from 'electron';
import * as path from 'path';

@Injectable()
export class ElectronService {
  remote: typeof remote;

  constructor() {
      this.remote = window.require('electron').remote;
  }

  getUserDataPath() : string {
    return this.remote.app.getPath('userData')
  }

  getTempPath() : string {
    return this.remote.app.getPath('temp')
  }

  initCore(): Promise<boolean> {
    const promise = new Promise<boolean>(function (resolve, reject) {
      ipcRenderer.once('init-core-reply', (event, arg) => {
          resolve(arg);
      });
    });

    ipcRenderer.send('init-core-request', {apiPath: AppConfig.scheme + AppConfig.apiUrl, dataPath: this.getUserDataPath()});
    return promise;
  }

  openInExternalBrowser(link: string) {
    shell.openExternal(link);
  }

  openFile(path: string) {
    shell.openItem(path);
  }

  saveBlobToTemporaryFile(blob : Blob): Promise<string> {
    var parent = this;
    const promise = new Promise<string>(function (resolve, reject) {
      const tempFilePath = parent.getTempPath() + path.sep + 'tmpfile.' + extension(blob.type);
      let reader = new FileReader()
      reader.onload = function() {
        if (reader.readyState == 2) {
          var arrayBuffer = reader.result as ArrayBuffer;
          ipcRenderer.send('save-file-request', {fileName : tempFilePath, data: new Uint8Array(arrayBuffer)})
          ipcRenderer.once('save-file-reply', (event, arg) => {
            resolve(tempFilePath);
          });
        }
      }
      reader.readAsArrayBuffer(blob)
    });
    return promise;
  }
}
