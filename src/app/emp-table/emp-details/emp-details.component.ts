import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpModel } from 'src/app/emp-info/emp.model';
import { EmpService } from 'src/app/Shared/emp.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ConfirmComponent } from 'src/app/Shared/confirm/confirm.component';
import { NgToastService } from 'ng-angular-popup';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmComponent, LoadingComponent],
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css'],
})
export class EmpDetailsComponent implements OnInit {
  empDetails: EmpModel;
  UID = 0;
  message: null | string = null;
  alertMsg: null | string = null;
  isLoading = false;
  constructor(private empService: EmpService, private router: ActivatedRoute, private route: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.UID = +params.id;
    })

    this.isLoading = true;
    this.empService.getDetails(this.UID).subscribe(res => {
      this.isLoading = false;
      this.empDetails = res.data[0]
    })
  }

  onEdit() {
    this.route.navigate(['Edit', this.empDetails.UID])
  }

  onDelete() {
    this.message = 'Are you sure to delete..'
  }

  onYes() {
    this.empService.onDelete(this.empDetails.UID).subscribe(res => {
      this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 3000, position: 'topCenter' });
      this.route.navigate(['E-Table'])
      this.message = null
    })
  }

  onClose() {
    this.message = null;
  }

}

