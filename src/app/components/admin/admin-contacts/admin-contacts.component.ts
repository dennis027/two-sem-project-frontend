import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name:string;
  email:string;
  subject:string;
  message:string;
  date:string;

}


@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css']
})
export class AdminContactsComponent implements OnInit {
 
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  contact: PeriodicElement[] = [

  ];
  displayedColumns: string[] = ['name', 'email', 'subject', 'message', 'date','actions'];
  dataSource = new MatTableDataSource([...this.contact]);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  
  // contact:any
  constructor(    private contactService:ContactService,
    private toastr: ToastrService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.contactService.getContact().subscribe((res:any[])=>{
        this.contact=res

     })
    });

  }

  openDeleteDialog(id:any) {
    let dialogRef = this.dialog.open(this.deleteDialog);
    // let currentData = this.contact.find((p: { id: any; }) =>{return p.id ===  id});
    // console.log(currentData.id)
    dialogRef.afterClosed().subscribe(result => {
        // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
        if (result !== undefined) {
            if (result === 'yes') {
              this.contactService.deleteData(id).subscribe(
                // (msg) => console.log(msg),
                // (error) => console.log(error)
              );
            } else if (result === 'no') {
           
            }
        }
    })
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
