import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { first } from 'rxjs/operators';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SafeQuit } from '../before-quit.guard';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, SafeQuit {

  courseName: string;
  Question: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
  correctAnswer: string;

  Array: Array <any> = [];

  angForm: FormGroup;


  id: string;
  data: any;
  pytania: Array<any>;

  constructor(private router: Router, private ar: ActivatedRoute, private authService: MainService, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.ar.params.subscribe( val => {
      this.id = val.id;
    } );
    this.authService.getCourse(this.id).snapshotChanges().pipe(first()).subscribe(val => {
      this.data = val.payload.data();
      this.courseName = this.data.nazwaKursu;
      // console.log(this.data);
      this.pytania = this.data.pytania;
      console.log('Tablica pytan', this.pytania);
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      CourseName: ['', Validators.required ],
      question: ['', Validators.required ],
      answer1: ['', Validators.required ],
      answer2: ['', Validators.required ],
      answer3: ['', Validators.required ],
      answer4: ['', Validators.required ],
      CorrectAnswer: ['', Validators.required ]
    });
  }

  delete(i: number) {
    this.pytania.splice(i, 1);
  }

  addQuestion() {
    const cos = {
      pytanie: this.Question,
       A: this.Answer1,
       B: this.Answer2,
       C: this.Answer3,
       D: this.Answer4,
       poprawnaOdpowiedz: this.correctAnswer
    };
    this.pytania.push(cos);
    console.log(this.pytania);
  }


  acceptChanges() {
    this.authService.updateCourse(this.id, {nazwaKursu: this.courseName, pytania: this.pytania}).then(() => {
      this.router.navigate(['MainPage/courses']);
    });
  }

  deleteCourse() {
    this.authService.deleteCourse(this.id).then(() => {
      this.router.navigate(['MainPage/courses']);
    });
  }

  safeBack() {
    return this.angForm.untouched && this.angForm.pristine;
  }

}
