import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
export interface usersObject {
  username:string;
  email:string;
  phone:string;

}


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  users:any
  // admin:any
  // professional:any
  // addicts:any
  constructor(private usersService:UsersService) { }


 addicts: usersObject[] = [    ];
  displayedColumns: string[] = ['username', 'email', 'phone'];
  dataSource = new MatTableDataSource([...this.addicts]);

  professional: usersObject[] = [    ];
  displayedColumns1: string[] = ['username', 'email', 'phone'];
  dataSource1 = new MatTableDataSource([...this.professional]);

  admin: usersObject[] = [    ];
  displayedColumns2: string[] = ['username', 'email', 'phone'];
  dataSource2 = new MatTableDataSource([...this.admin]);

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.usersService.getUsers().subscribe((res:any[])=>{
      this.users=res
      console.log(this.users)

      this.admin = this.users.filter((users:any) => users.role === "is_admin")
      console.log(this.admin)

      this.professional = this.users.filter((users:any) => users.role === "is_professional")
      console.log(this.professional)

      this.addicts = this.users.filter((users:any) => users.role === "is_addict")
      console.log(this.addicts)
    })
   
  
  }
  

}
