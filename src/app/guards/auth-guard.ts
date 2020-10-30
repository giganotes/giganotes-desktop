import { $$iterator } from 'rxjs/internal/symbol/iterator';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { LoggerService } from '../services/logger-service';
import { from } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private authService: AuthService,
        private loggerService: LoggerService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.loggerService.info('AuthGuard.canActivate')
        return from(this.checkToken())
    }

    async checkToken(): Promise<boolean> {
        const hasToken = await this.authService.hasValidToken()
        if (hasToken) {
            return true;
        } else {
            this.router.navigate(['/login'])
            return false;
        }
    }
}
