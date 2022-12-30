import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logged-navbar',
  templateUrl: './logged-navbar.component.html',
  styleUrls: ['./logged-navbar.component.css']
})
export class LoggedNavbarComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;
  constructor(
    private dialog: MatDialog,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  SignOutDialog(){
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              localStorage.clear();
              this.router.navigate(['/']);
            } else if (result === 'no') {
           
            }
        }
    })
  }
}
