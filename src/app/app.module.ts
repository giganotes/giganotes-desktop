import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTreeModule} from '@angular/material/tree';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppConfig } from '../environments/environment';

import { AppComponent } from './app.component';


import { AuthGuard } from './guards/auth-guard';
import { AuthService } from './services/auth-service';
import { AuthServiceConfig, SocialAuthService } from './services/social-auth/social-auth-service';
import { GoogleLoginProvider } from './services/social-auth/google-login-provider';

export function provideSocialConfig(http: HttpClient) {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(http, "991995282025-dvjgb12io5b435cfbvjb074ma1jvb54g.apps.googleusercontent.com")
    },
  ]);
}

export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return authService.getToken();
    },
    whitelistedDomains: [AppConfig.apiUrl]
  }
}


import { Storage } from './services/storage';

import { LoggerService } from './services/logger-service';
import { ElectronService } from './providers/electron.service';
import { NoteManagerService } from './services/note-manager-service';
import { SyncService } from './services/sync-service';
import { ScreenService } from './services/screen.service';

import { EventBusService } from './services/event-bus-service';
import { DynamicScriptLoaderService } from './services/dynamic-script-loader.service';
import { electron } from 'process';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthService]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    MatProgressBarModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    Storage,
    LoggerService,
    NoteManagerService,
    SyncService,
    ElectronService,
    AuthGuard,
    AuthService,
    EventBusService,
    SocialAuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (electronService: ElectronService) => function () { return electronService.initCore(); },
      deps: [ElectronService],
      multi: true
    },
    ScreenService,
    DynamicScriptLoaderService,
    {
      provide: AuthServiceConfig,
      useFactory: provideSocialConfig,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
