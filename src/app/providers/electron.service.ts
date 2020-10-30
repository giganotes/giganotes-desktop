import { Injectable } from '@angular/core';
import { AppConfig } from '../../environments/environment';

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
}
