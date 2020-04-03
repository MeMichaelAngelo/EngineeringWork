import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userDetails: any;
  responseMessage: string = '';
  responseMessageType: string = '';

  constructor(private router: Router, private authService: MainService) { }

  ngOnInit() {
  }

  kursy() {
    this.router.navigate(['/MainPage/courses']);
  }

  showMessage(type, msg) {
    this.responseMessageType = type;
    this.responseMessage = msg;
    setTimeout(() => {
      this.responseMessage = '';
    }, 2000);
  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        localStorage.clear();
        this.router.navigate(['']);
        this.showMessage('success', 'Successfully Logged In!');
      }, err => {
        this.showMessage('danger', err.message);
      });
  }


}
