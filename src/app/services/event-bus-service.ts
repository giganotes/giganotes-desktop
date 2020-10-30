import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable()
export class EventBusService {
    private subject = new Subject<any>();

    sendMessage(message: any) {
        this.subject.next(message)
    }

    getMessages(): Observable<any> {
        return this.subject.asObservable();
    }
}
