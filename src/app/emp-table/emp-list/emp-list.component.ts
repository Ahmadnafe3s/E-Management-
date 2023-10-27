import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpService } from 'src/app/Shared/emp.service';
import { EmpModel } from 'src/app/emp-info/emp.model';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/Shared/loading/loading.component';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  EmpList: EmpModel[] = [];
  isLoading = false;
  err: string | null = null;
  constructor(private empService: EmpService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.empService.FetchData().subscribe(res => {
      this.isLoading = false;
      this.EmpList = res.data
    },
      err => {
        this.isLoading = false;
        this.err = err.statusText;
      }
    )

  }

}
