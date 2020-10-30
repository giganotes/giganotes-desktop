import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  host: {"style" : "height:100%; display: flex; flex-direction:column"}
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
