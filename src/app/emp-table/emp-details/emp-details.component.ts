import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpService } from 'src/app/Shared/emp.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ConfirmComponent } from 'src/app/Shared/confirm/confirm.component';
import { NgToastService } from 'ng-angular-popup';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';
import { Employee } from 'src/app/types/type';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmComponent, LoadingComponent],
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css'],
})


export class EmpDetailsComponent implements OnInit {

  empDetails: Employee;
  UID = 0;
  message: null | string = null;
  alertMsg: null | string = null;
  isLoading = false;

  constructor(private empService: EmpService, private router: ActivatedRoute, private route: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.fetchEmployeeDetails(+params.id)
    })

  }


  // fetching emplyoee details

  fetchEmployeeDetails(UID: number) {

    this.isLoading = true;

    this.empService.getEmployeeDetails(UID).subscribe({

      next: ({ details }) => { //  extracting from response

        this.empDetails = details;
        this.isLoading = false;

      },

      error: ({ message }) => {

        this.toast.error({ detail: 'Error', summary: message, duration: 2000 })
        this.isLoading = false;
      }

    })
  }



  onEdit() {
    this.route.navigate(['/Edit', this.empDetails.UID])
  }


  onDelete() {
    this.message = 'Are you sure to delete..'
  }


  onYes() {

    this.empService.onDelete(this.empDetails.UID).subscribe({

      next: ({ message }) => {
        this.toast.success({ detail: 'Success', summary: message, duration: 2000 })
        this.message = null
        this.route.navigate(['/E-Table'])
      },

      error: ({ message }) => {

        this.toast.error({ detail: 'Error', summary: message, duration: 2000 })
        this.message = null

      }

    })
  }

  onClose() {
    this.message = null;
  }

}

