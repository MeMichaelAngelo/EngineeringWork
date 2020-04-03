import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CoursesComponent } from './courses/courses.component';
import { CreateNewCourseComponent } from './create-new-course/create-new-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AuthGuard } from './auth.guard';
import { BeforeQuitGuard } from './before-quit.guard';
import { SolveCourseComponent } from './solve-course/solve-course.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'MainPage',
    component: MainPageComponent,
    canActivate: [AuthGuard],
      children: [
        {
          path: 'courses',
          component: CoursesComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'editcourse/:id',
          component: EditCourseComponent,
          canActivate: [AuthGuard],
          canDeactivate: [BeforeQuitGuard]
        }
      ]
  },
  {
    path: 'addNewCourse',
    component: CreateNewCourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'solveCourse/:id',
    component: SolveCourseComponent,
    canActivate: [AuthGuard]
  },
   {
     path: '**',
     redirectTo: 'MainPage'
   }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
