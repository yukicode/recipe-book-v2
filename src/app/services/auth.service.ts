import { Injectable } from '@angular/core';
import { User } from '../user.interface';

declare var firebase: any;

@Injectable()
export class AuthService {

  constructor() { }
  signupUser(user: User): Promise<any> {
    return Promise.resolve(
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    );
  }

  updateProfile(user: User): Promise<any> {
    return Promise.resolve(
      firebase.auth().currentUser.updateProfile({
        displayName: user.name
      })
    );
  }

  getUser(): any{
    return firebase.auth().currentUser;
  }

  isAuthenticated(): boolean {
    return firebase.auth().currentUser !== null;
  }

  signInUser(user: User): Promise<any> {
    return Promise.resolve(
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
