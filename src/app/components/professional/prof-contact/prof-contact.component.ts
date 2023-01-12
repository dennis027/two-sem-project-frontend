import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
  name:string;
  email:string;
  subject:string;
  message:string;
  date:string;

}


@Component({
  selector: 'app-prof-contact',
  templateUrl: './prof-contact.component.html',
  styleUrls: ['./prof-contact.component.css']
})
export class ProfContactComponent implements OnInit , OnDestroy {
  contact: PeriodicElement[] = [

  ];
  displayedColumns: string[] = ['name', 'email', 'subject', 'message', 'date'];
  dataSource = new MatTableDataSource([...this.contact]);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  
  // contact:any
  constructor(    private contactService:ContactService,) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.contactService.getContact().subscribe((res:any[])=>{
        this.contact=res
        console.log(this.contact)
     })
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
