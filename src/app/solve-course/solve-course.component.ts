import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solve-course',
  templateUrl: './solve-course.component.html',
  styleUrls: ['./solve-course.component.css']
})
export class SolveCourseComponent implements OnInit {

  id: string;
  data: any;
  pytania: any;
  i: number;

  firstID: any;
  secondID: any;
  thirdID: any;
  fourthID: any;
  correctAnswer: any;


  constructor(private router: Router, private ar: ActivatedRoute, private authService: MainService) {
  }

  ngOnInit() {
    this.ar.params.subscribe( val => {
      this.id = val.id;
    } );
    this.authService.getCourse(this.id).snapshotChanges().subscribe( res => {
      this.data = res.payload.data();
      this.pytania = this.data.pytania;
      console.log('pytania', this.pytania);
    });

  }

  checkAnswers() {

  }



}
