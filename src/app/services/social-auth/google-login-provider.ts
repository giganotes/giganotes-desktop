import {BaseLoginProvider} from './base-login-provider';
import {SocialUser} from './../../model/social-auth/social-user';
import {LoginOpt} from './social-auth-service';
import {remote} from 'electron';
import {HttpClient, HttpHeaders} from "@angular/common/http";

declare let gapi: any;

export class GoogleLoginProvider extends BaseLoginProvider {

  public static readonly REDIRECT_URI: string = "http://localhost";
  public static readonly PROVIDER_ID: string = 'GOOGLE';

  protected auth2: any;

  constructor(private httpClient: HttpClient, private clientId: string, private opt: LoginOpt = {scope: 'email'}) { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
    });
  }

  signIn(opt?: LoginOpt): Promise<SocialUser> {

    return new Promise((resolve, reject) => {
      const window = new remote.BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
          nodeIntegration: false, // We recommend disabling nodeIntegration for security.
          contextIsolation: true // We recommend enabling contextIsolation for security.
        },
      })

      const config = {
        client_id: this.clientId,
        redirect_uri: GoogleLoginProvider.REDIRECT_URI,
        response_type: "token id_token",
        scope: this.opt.scope,
        nonce: "n-0S6_WzA2Mj"
      }
      const encodedParams = Object.entries(config).map(i => [i[0], encodeURIComponent(i[1])].join('=')).join('&');

      window.webContents.session.webRequest.onBeforeRedirect( details => {
        if (details.redirectURL.indexOf(GoogleLoginProvider.REDIRECT_URI) == 0) {
          let obj = {};
          details.redirectURL.substring(GoogleLoginProvider.REDIRECT_URI.length + 2).split('&').map(param => {
            let keyValuePair = param.split('=')
            let key = keyValuePair[0];
            obj[key] = keyValuePair[1];
          })

          const headers = new HttpHeaders({Authorization: 'Bearer ' + obj['access_token']});
          this.httpClient.get('https://www.googleapis.com/oauth2/v3/userinfo', {headers: headers}).subscribe( (data: any) => {
            const user = new SocialUser()
            user.email = data.email;
            user.idToken = obj['id_token'];
            resolve(user)
            window.close();
          });
        }
      });

      window.loadURL('https://accounts.google.com/o/oauth2/v2/auth?' + encodedParams);
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
