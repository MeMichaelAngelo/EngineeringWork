import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'; // 'angularfire2/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'; // 'angularfire2/firestore';
import { FirebaseAuth } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private usersProfile: AngularFirestoreCollection<any>;
  private course: AngularFirestoreCollection<any>;

  userInfo: any;
  usersRole: string;



  constructor(
    db: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router

    // sprawdzic userresponse co zwraca, potem sprobowac go uzyc w guardzie

  ) {
    this.usersProfile = db.collection<any>('usersProfile');
    this.course = db.collection<any>('Mathematic');

    this.angularFireAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
        console.log(userResponse);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }


  async login(email: string, password: string) {
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  AddUser(profile: any) {
    return this.usersProfile.add(profile);
  }

  AddCourse(course: any) {
    console.log(course);
    return this.course.add(course);
  }

  getCourse(id: string) {
    return this.course.doc(id);
  }

  updateCourse(id: string, updatecourse: any) {
    return this.course.doc(id).set(updatecourse, {merge: true});
  }

  deleteCourse(id: string) {
    return this.course.doc(id).delete();
  }

  isAdmin() {
    this.usersProfile.snapshotChanges().subscribe(res => {
      this.userInfo = res.map(e => {
        return e.payload.doc.data();
      });
      console.log(this.userInfo);
      const id = localStorage.getItem('userID');
      console.log(id);

      const activeID = this.userInfo.find(e => e.ID === id);
      console.log(activeID.role);

      localStorage.setItem('userRole', activeID.role);
    });

    return this.usersRole;
  }

  userRoleMethod() {
    return localStorage.getItem('userRole');
  }





  async sendEmailVerification() {
    return await this.angularFireAuth.auth.currentUser.sendEmailVerification();
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.angularFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    return await this.angularFireAuth.auth.signOut();
  }


  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async  loginWithGoogle() {
    return await this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
