import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { LoggerService } from './logger-service';

@Injectable()
export class SyncService {

    private subject = new Subject<any>();
    private _isSyncing = false;

    public lastSyncDate: Date = null;

    constructor(private loggerSerivce: LoggerService,
        private authService: AuthService) {
    }

    isSyncing(): boolean {
        return this._isSyncing;
    }

    async callSync(): Promise<void> {
        let parent = this;
        const promise = new Promise<void>(function (resolve, reject) {
            ipcRenderer.once('sync-service-sync-reply', (event, arg) => {
                parent._isSyncing = false;
                resolve();
            });
        });
        ipcRenderer.send('sync-service-sync-request', null);
        return promise;
    }

    async doSync() {
        try {
            if (this._isSyncing) {
                return;
            }
            this.lastSyncDate = new Date();
            this._isSyncing = true;
            await this.callSync();
            this.subject.next({ type: 'success' })
        } catch (e) {
            console.log(e)
            this.subject.next({ type: 'error', message: 'Cannot connect to server' })
        }
    }


    getMessages(): Observable<any> {
        return this.subject.asObservable();
    }
}
