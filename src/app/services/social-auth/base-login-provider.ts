import { LoginProvider } from './login-provider';
import { SocialUser } from './../../model/social-auth/social-user';

export abstract class BaseLoginProvider implements LoginProvider {

  constructor() {}

  abstract initialize(): Promise<SocialUser>;
  abstract signIn(): Promise<SocialUser>;
  abstract signOut(): Promise<any>;
}