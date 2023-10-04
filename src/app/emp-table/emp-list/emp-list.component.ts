import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpService } from 'src/app/Shared/emp.service';
import { EmpModel } from 'src/app/emp-info/emp.model';
import { RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  EmpList:EmpModel[] = [];
  constructor(private empService: EmpService) { }

  ngOnInit(): void {
    this.empService.FetchData().subscribe(res=>{
      this.EmpList = res.data
    },
    err=>{
      console.log(err);
    }
    )

  }
}
