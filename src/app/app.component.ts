import { EventBusService } from './services/event-bus-service';
import { ScreenService } from './services/screen.service';
import { ScreenChangedEvent } from './model/events/screen-changed';

import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {
   BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(public breakpointObserver: BreakpointObserver,
              public eventBusService: EventBusService,
            public screenService: ScreenService) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        this.screenService.isMobile = state.matches;
        this.eventBusService.sendMessage(new ScreenChangedEvent(state.matches));
      });
  }
}
