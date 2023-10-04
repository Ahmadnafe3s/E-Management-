import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { EmpModel } from 'src/app/emp-info/emp.model';
import { EmpService } from 'src/app/Shared/emp.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  empDetails: EmpModel;
  index = 0;
  constructor(private empService: EmpService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.index = +params.id;
    })

    this.empService.FetchData().subscribe(res => {
      this.empDetails = res.data[this.index]
    })
  }

  onEdit() {
    this.route.navigate(['Edit', this.index])
  }

  onDelete() {
    this.empService.onDelete(this.empDetails.UID)
  }
}
