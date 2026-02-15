import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AddNewQuestionComponent } from './components/add-new-question/add-new-question';
import { TodayQuestionComponent } from './components/today-question/today-question';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'login', component:  LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'add-question', component: AddNewQuestionComponent },
    { path: 'today-question', component: TodayQuestionComponent }
];
