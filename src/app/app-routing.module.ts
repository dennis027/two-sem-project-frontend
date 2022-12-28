import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PatientComponent } from './components/patient/patient.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'landing',component:LandingComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'footer',component:FooterComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'patient',component:PatientComponent},
  {path:'admin',component:AdminComponent},
  {path:'professional',component:ProfessionalComponent},
  {path:'contact',component:ContactComponent},
  {path:'whoweare',component:AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
