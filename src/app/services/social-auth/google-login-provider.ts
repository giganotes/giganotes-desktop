import { BaseLoginProvider } from './base-login-provider';
import { SocialUser } from './../../model/social-auth/social-user';
import { LoginOpt } from './social-auth-service';
import { remote } from 'electron'
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { GoogleAuthResponse } from './../../model/server-responses-models/google-auth-response';

export class GoogleLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID: string = 'GOOGLE';

  protected auth2: any;

  constructor(private http: HttpClient, private clientId: string, private opt: LoginOpt = { scope: 'email' }) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
    });
  }

  signIn(opt?: LoginOpt): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
    });
  }

  revokeAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
    });
  }

}
