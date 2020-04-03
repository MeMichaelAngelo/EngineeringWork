import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  constructor(private router: Router, private authService: MainService, private db: AngularFirestore) { }

  coursesArray: any;
  userInfo: any;
  usersRole: string;

  ngOnInit() {

    this.db.collection('Mathematic').snapshotChanges().subscribe( val => {
      this.coursesArray = val.map(e => {
        const data = e.payload.doc.data();
        console.log(data);

        return {
          id: e.payload.doc.id,
          nazwaKursu: data['nazwaKursu'],
          pytania: data['pytania'],
        };
      });

    });
    this.usersRole = this.authService.userRoleMethod();

  }

  MoveToAddaNewCourse() {
    this.router.navigate(['/addNewCourse']);
  }

  edit(id: string) {
    this.router.navigate(['/MainPage/editcourse', id]);
  }

  solveCourse(id: string) {
    this.router.navigate(['solveCourse', id]);
  }

  //   setBg = () => {
  //   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  //   return '#' + randomColor;
  // }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + color;
    // const color1 = Math.floor(100 * Math.random());
    // const color2 = Math.floor(100 * Math.random());
    // const color3 = Math.floor(100 * Math.random());
    // return '#' + color1 + color2 + color3;
  }


}
