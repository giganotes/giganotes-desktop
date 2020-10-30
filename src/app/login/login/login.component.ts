import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthService } from '../../services/auth-service';
import { LoggerService } from '../../services/logger-service';
import { SocialAuthService } from '../../services/social-auth/social-auth-service';
import { GoogleLoginProvider } from '../../services/social-auth/google-login-provider';

import { DomSanitizer } from '@angular/platform-browser';
import { NoteManagerService } from '../../services/note-manager-service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    signInModel: any = {};
    registerModel: any = {};
    isLoading = false;
    signInErrorMessage = "";
    registerErrorMessage = "";
    imgPath = 'assets/logo.png';

    constructor(
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private noteManagerService: NoteManagerService,
        private router: Router,
        private authService: AuthService,
        private socialAuthService: SocialAuthService,
        private loggerService: LoggerService) {

        const googleIconUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/google.svg');
        iconRegistry.addSvgIcon('google-colored', googleIconUrl);
    }

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            if (user != null) {
                this.onSocialLoginDone(user)
            }
        });
    }

    async makeSocialLogin(user: any) {
        const authResult = await this.authService.loginSocial({ email: user.email, provider: user.provider, token: user.idToken })
        if (!authResult.success) {
          this.signInErrorMessage = this.makeErrorMessage(authResult.errorCode);
          this.isLoading = false;
        } else {
          this.router.navigate(['home']);
        }
    }

    onSocialLoginDone(user: any) {
        this.isLoading = true;
        this.signInErrorMessage = '';

        this.makeSocialLogin(user);
    }


    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(err => {
            this.signInErrorMessage = err.toString()
        })
    }

    makeErrorMessage(errorCode: number): string {
        if (errorCode === 2) {
            return "Incorrect login or password";
        }

        if (errorCode === 1) {
            return "Cannot connect to server. Please check your connection.";
        }

        return "Unexpected error";
    }

    async makeLogin() {
        const authResult = await this.authService.login(this.signInModel.username, this.signInModel.password)
        if (!authResult.success) {
            this.signInErrorMessage = this.makeErrorMessage(authResult.errorCode);
            this.isLoading = false;
        } else {
          this.router.navigate(['home']);
        }
    }

    login() {
        this.isLoading = true;
        this.signInErrorMessage = '';

        this.makeLogin();
    }

    async makeSignUp() {
        const authResult = await this.authService.signup(this.registerModel.username, this.registerModel.password);
        if (!authResult.success) {
          this.signInErrorMessage = this.makeErrorMessage(authResult.errorCode);
          this.isLoading = false;
        } else {
          this.router.navigate(['home']);
        }
    }


    register() {
        this.isLoading = true;
        this.registerErrorMessage = '';

        this.makeSignUp();
    }

    doOffline() {
        this.authService.loginOffline()
            .then(r => this.router.navigate(['home']));
        return false;
    }
}
