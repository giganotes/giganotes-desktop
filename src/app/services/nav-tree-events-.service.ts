import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class NavTreeEventsService {

  private subject = new Subject<any>();

  sendEvent(event: any) {
    this.subject.next(event);
  }

  getEvents(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }

}
