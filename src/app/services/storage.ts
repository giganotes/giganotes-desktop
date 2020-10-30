import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';

@Injectable()
export class Storage {


    async get(key: string): Promise<any> {
      const promise = new Promise(function (resolve, reject) {
        ipcRenderer.once('storage-get-reply', (event, arg) => {
            console.log('storage-get reply ');
            console.log(arg);
            resolve(arg);
        });
      });

      ipcRenderer.send('storage-get-request', key);
      return promise;
    }

    async set(key: string, value: any): Promise<void> {
      const promise = new Promise<void>(function (resolve, reject) {
        ipcRenderer.once('storage-set-reply', (event, arg) => {
          console.log('storage-set reply ');
            resolve();
        });
      });

      ipcRenderer.send('storage-set-request', {
        key: key,
        value: value
      });

      return promise;
    }

    async remove(key: string): Promise<void>  {
      const promise = new Promise<void>(function (resolve, reject) {
        ipcRenderer.once('storage-remove-reply', (event, arg) => {
            resolve();
        });
      });

      ipcRenderer.send('storage-remove-request', {
        key: key
      });

      return promise;
    }

    async clear(): Promise<void> {
      const promise = new Promise<void>(function (resolve, reject) {
        ipcRenderer.once('storage-clear-reply', (event, arg) => {
            resolve();
        });
      });

      ipcRenderer.send('storage-clear-request', {});

      return promise;
    }
}
