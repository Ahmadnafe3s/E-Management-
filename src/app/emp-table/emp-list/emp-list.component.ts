import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpService } from 'src/app/Shared/emp.service';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { Employee, employeesListResponse } from 'src/app/types/type';
// import { employeesListResponse } from 'src/app/types/type';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})


export class EmpListComponent implements OnInit {

  employeesList: Employee[]; // type is already an array
  isLoading = false;
  err: string | null = null;

  constructor(private empService: EmpService, private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployeesList();
  }


  fetchEmployeesList() {

    this.isLoading = true;

    this.empService.getEmployeesList().subscribe({

      next: ({ employeesList }) => {

        this.employeesList = employeesList;
        this.isLoading = false

      },

      error: ({ message }) => {
        this.err = message;
        this.isLoading = false
      },

    })

  }

}
