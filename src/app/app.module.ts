import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MatCardModule} from '@angular/material/card'; 
import { MatSliderModule } from '@angular/material/slider';

import { MatSidenavModule} from '@angular/material/sidenav';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';

import { LyCarouselModule } from '@alyle/ui/carousel';
import { LyTypographyModule } from '@alyle/ui/typography';
import { LyListModule } from '@alyle/ui/list';
import { LyDividerModule } from '@alyle/ui/divider';
import {

  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';


import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig
} from '@alyle/ui';

import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';

import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LandingComponent } from './components/home/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { PatientComponent } from './components/patient/patient.component';
import { ProfessionalComponent } from './components/professional/professional.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { AboutUsComponent } from './components/home/about-us/about-us.component';
import { LoggedNavbarComponent } from './components/logged-navbar/logged-navbar.component';
import { HomeComponent } from './components/patient/home/home.component';
import { DiagnosisComponent } from './components/patient/diagnosis/diagnosis.component';
import { QuestionsComponent } from './components/patient/questions/questions.component';
import { TestimoniesComponent } from './components/patient/testimonies/testimonies.component';
import { RecommendationsComponent } from './components/professional/recommendations/recommendations.component';
import { ApprovalComponent } from './components/professional/approval/approval.component';
import { AnswersComponent } from './components/professional/answers/answers.component';
import { AdminApproveComponent } from './components/admin/admin-approve/admin-approve.component';
import { AdminAnswersComponent } from './components/admin/admin-answers/admin-answers.component';
import { AccountsComponent } from './components/admin/accounts/accounts.component';
import { AdminRecommendationsComponent } from './components/admin/admin-recommendations/admin-recommendations.component';
import { ProfHomeComponent } from './components/professional/prof-home/prof-home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { MatTableResponsiveDirective } from './directive/mat-table-responsive.directive';
import { ProfContactComponent } from './components/professional/prof-contact/prof-contact.component';
import { AdminContactsComponent } from './components/admin/admin-contacts/admin-contacts.component';
import { TestimonyHomeComponent } from './components/home/testimony-home/testimony-home.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { TestComponent } from './components/test/test.component';





@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    SignUpComponent,
    LoginComponent,
    AdminComponent,
    PatientComponent,
    ProfessionalComponent,
    ContactComponent,
    AboutUsComponent,
    LoggedNavbarComponent,
    HomeComponent,
    DiagnosisComponent,
    QuestionsComponent,
    TestimoniesComponent,
    RecommendationsComponent,
    ApprovalComponent,
    AnswersComponent,
    AdminApproveComponent,
    AdminAnswersComponent,
    AccountsComponent,
    AdminRecommendationsComponent,
    ProfHomeComponent,
    AdminHomeComponent,
    MatTableResponsiveDirective,
    ProfContactComponent,
    AdminContactsComponent,
    TestimonyHomeComponent,
    ForgetPasswordComponent,
    PasswordResetComponent,
    TestComponent,
  
  ], 
  imports: [ 
    BrowserAnimationsModule,
    HttpClientModule,  
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    FormsModule,
     ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule ,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    MatBadgeModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    // ClipboardModule,
    ToastrModule.forRoot(),
    // MatCarouselModule.forRoot(),
    BrowserAnimationsModule, 
    NgbModule,
    ReactiveFormsModule,
    
    // ngx pagination
    NgxPaginationModule,

    MatNativeDateModule,
    // MatFormFieldModule,

    MatFormFieldModule,
      // Add components
      LyButtonModule,
      LyToolbarModule,
      LyImageCropperModule,
      // ...
      // Gestures
      HammerModule,
      LyListModule,
      LyDividerModule,
      LyCarouselModule,
      LyTypographyModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})


  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    
  ],
 
  providers: [
     [DatePipe],
    [ LyTheme2 ],
    [ StyleRenderer ],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig } // Required for <ly-carousel>
  ], 
  bootstrap: [AppComponent],   
       
  
}) 
export class AppModule { }