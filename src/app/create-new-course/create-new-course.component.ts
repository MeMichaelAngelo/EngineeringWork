import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.css']
})
export class CreateNewCourseComponent implements OnInit {

  constructor(private router: Router, private authService: MainService, private fb: FormBuilder) {
    this.createForm();
  }

  angForm: FormGroup;

  courseName: string;
  Question: string;
  Answer1: string;
  Answer2: string;
  Answer3: string;
  Answer4: string;
  correctAnswer: string;

  Array: Array <any> = [];

  ngOnInit() {
  }

  createForm() {
    this.angForm = this.fb.group({
      CourseName: ['', [Validators.minLength(1), Validators.required] ],
      question: ['', [Validators.minLength(1), Validators.required] ],
      answer1: ['', [Validators.minLength(1), Validators.required] ],
      answer2: ['', [Validators.minLength(1), Validators.required] ],
      answer3: ['', [Validators.minLength(1), Validators.required] ],
      answer4: ['', [Validators.minLength(1), Validators.required] ],
      CorrectAnswer: ['', [Validators.minLength(1), Validators.required] ]
    });
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
    this.Array.push(cos);
  }

  createQuiz() {
    this.authService.AddCourse({
     nazwaKursu: this.courseName,
     pytania: this.Array
     });
    this.router.navigate(['MainPage/courses']);
  }

  delete(i: any) {
    this.Array.splice(i, 1);
    console.log(this.Array);
  }



}
