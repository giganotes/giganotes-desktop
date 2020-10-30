import { SocialUser } from './../../model/social-auth/social-user';
import { LoginOpt } from './social-auth-service';

export interface LoginProvider {
  initialize(): Promise<SocialUser>;
  signIn(opt?: LoginOpt): Promise<SocialUser>;
  signOut(): Promise<any>;
}
