import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  imgPath = 'assets/logo.png';
  esModel: any = {};
  prModel: any = {};
  validCodeEntered = false;
  errorMessage = '';
  currentState = 0;

  constructor(readonly http: HttpClient) { }

  ngOnInit() {
  }

  submitEmail() {
    this.http.post(AppConfig.scheme + AppConfig.apiUrl + `/request-restore-code`, this.esModel, { responseType: 'json', observe: 'body'})
         .subscribe(response => {
            this.currentState = 1
        }, error => {
          this.errorMessage = error.error
    })
  }

  passwordRestore() {
    this.prModel["email"] = this.esModel["email"]
    this.http.post(AppConfig.scheme + AppConfig.apiUrl + `/update-password`, this.prModel, { responseType: 'json', observe: 'body'})
        .subscribe(a => {
            this.currentState = 2
    }, error => {
        this.errorMessage = error.error
    })
}
}
