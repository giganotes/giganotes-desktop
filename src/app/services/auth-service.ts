import { LastLoginData } from './../model/last-login-data';
import { AuthResponse } from './../model/server-responses-models/auth-response';
import { Injectable } from "@angular/core";
import { ipcRenderer } from 'electron';
import { GetLastLoginDataResponse, LoginResponse } from './../../proto/messages_pb';
@Injectable()
export class AuthService {

  public isOffline: boolean = false;
  public userId: number;
  public email: string = '';
  public loginType: string = '';

  async getLastLoginData(): Promise<LastLoginData> {
    const promise = new Promise<LastLoginData>(function (resolve, reject) {
      ipcRenderer.once('auth-service-get-last-login-data-reply', (event, arg) => {
          var resp = GetLastLoginDataResponse.deserializeBinary(arg).toObject() as GetLastLoginDataResponse.AsObject;
          var result : LastLoginData = {
            token : resp.token,
            email : resp.email,
            userId : resp.userid,
            isTokenValid : resp.istokenvalid,
          };
          resolve(result);
      });
    });

    ipcRenderer.send('auth-service-get-last-login-data-request', null);
    return promise;
  }

  async getToken(): Promise<String> {
    const lastLoginData = await this.getLastLoginData();
    return lastLoginData.token;
  }

  async hasValidToken(): Promise<boolean> {
    const lastLoginData = await this.getLastLoginData()
    this.email = lastLoginData.email;
    this.userId = lastLoginData.userId;
    return lastLoginData.isTokenValid;
  }

  async login(email: string, password : string): Promise<AuthResponse> {
    const promise = new Promise<AuthResponse>(function (resolve, reject) {
      ipcRenderer.once('auth-service-login-reply', (event, arg) => {
        var loginResponse = LoginResponse.deserializeBinary(arg).toObject();
        var result: AuthResponse = {
            success: loginResponse.success,
            errorCode: loginResponse.errorcode,
        }
        resolve(result);
      });
    });

    ipcRenderer.send('auth-service-login-request', { email : email, password: password});
    return promise;
  }

  async loginSocial(values: any): Promise<AuthResponse> {
    const promise = new Promise<AuthResponse>(function (resolve, reject) {
      ipcRenderer.once('auth-service-loginsocial-reply', (event, arg) => {
        var loginResponse = LoginResponse.deserializeBinary(arg).toObject();
        var result: AuthResponse = {
          success: loginResponse.success,
          errorCode: loginResponse.errorcode,
        }
        resolve(result);
      });
    });

    ipcRenderer.send('auth-service-loginsocial-request', values);
    return promise;
  }

  async logout() {
    const promise = new Promise<void>(function (resolve, reject) {
      ipcRenderer.once('auth-service-logout-reply', (event, arg) => {
          resolve();
      });
    });

    ipcRenderer.send('auth-service-logout-request', null);
    return promise;
  }

  async signup(email: string, password : string): Promise<AuthResponse> {
    const promise = new Promise<AuthResponse>(function (resolve, reject) {
      ipcRenderer.once('auth-service-register-reply', (event, arg) => {
        var loginResponse = LoginResponse.deserializeBinary(arg).toObject();
        var result: AuthResponse = {
            success: loginResponse.success,
            errorCode: loginResponse.errorcode,
        }
        resolve(result);
      });
    });

    ipcRenderer.send('auth-service-register-request', { email : email, password: password});
    return promise;
  }


  async readTokenAndUserameFromStorage(): Promise<any> {
    return null;
  }

  async loginOffline() {
    const promise = new Promise<AuthResponse>(function (resolve, reject) {
      ipcRenderer.once('auth-service-loginoffline-reply', (event, arg) => {
          resolve();
      });
    });

    ipcRenderer.send('auth-service-loginoffline-request', null);
    return promise;
  }
}


