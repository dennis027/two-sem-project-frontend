import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {

  @ViewChild('snav', { static: false }) usuarioMenu!: MatSidenav;

  panelOpenState = false;
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  private _mobileQueryListener: () => void;
 
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, ) {
    this.mobileQuery = media.matchMedia('(max-width: 896px)',);
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    
  }

  // constructor(private router: Router) { }
 
  ngOnInit(): void {
 
  }

  public closeSidenav() {
    if (window.innerWidth < 896) {
      this.usuarioMenu.close();
  }
    console.log("waaaaiiii")
   
 
  }
   ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
