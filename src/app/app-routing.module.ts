import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PatientComponent } from './components/patient/patient.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoggedNavbarComponent } from './components/logged-navbar/logged-navbar.component';
import { HomeComponent } from './components/patient/home/home.component';
import { DiagnosisComponent } from './components/patient/diagnosis/diagnosis.component';
import { QuestionsComponent } from './components/patient/questions/questions.component';
import { TestimoniesComponent } from './components/patient/testimonies/testimonies.component';
import { RecommendationsComponent } from './components/professional/recommendations/recommendations.component';
import { AnswersComponent } from './components/professional/answers/answers.component';
import { ApprovalComponent } from './components/professional/approval/approval.component';
import { AccountsComponent } from './components/admin/accounts/accounts.component';
import { AdminAnswersComponent } from './components/admin/admin-answers/admin-answers.component';
import { AdminApproveComponent } from './components/admin/admin-approve/admin-approve.component';
import { AdminRecommendationsComponent } from './components/admin/admin-recommendations/admin-recommendations.component';
import { ProfHomeComponent } from './components/professional/prof-home/prof-home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'landing',component:LandingComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'footer',component:FooterComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'patient',component:PatientComponent,
      children:[
       {path:'home',component : HomeComponent,outlet:'addict'},
       {path:'diagnosis',component:DiagnosisComponent,outlet:'addict'},
       {path:'questions',component:QuestionsComponent,outlet:'addict'},
       {path:'testimonies',component:TestimoniesComponent,outlet:'addict'}
  ]},
  {path:'admin',component:AdminComponent,
      children:[
        {path:'accounts', component:AccountsComponent, outlet:'admin'},
        {path:'answers' , component:AdminAnswersComponent, outlet:'admin'},
        {path:'approve' , component:AdminApproveComponent, outlet:'admin'},
        {path:'recommend',component:AdminRecommendationsComponent, outlet:'admin'},
        {path:'home',component:AdminHomeComponent,outlet:'admin'}
      ]},
  {path:'professional',component:ProfessionalComponent,
      children:[
        {path:'recommend',component:RecommendationsComponent,outlet:'prof'},
        {path:'answer',component:AnswersComponent,outlet:'prof'},
        {path:'approval',component:ApprovalComponent,outlet:'prof'},
        {path:'home',component:ProfHomeComponent,outlet:'prof'}
      ]},
  {path:'contact',component:ContactComponent},
  {path:'whoweare',component:AboutUsComponent},
  {path:"loginnavbar",component:LoggedNavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
