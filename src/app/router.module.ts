import { RouterModule, Routes } from "@angular/router";
import { EmpInfoComponent } from "./emp-info/emp-info.component";
import { NgModule } from "@angular/core";
import { EmpTableComponent } from "./emp-table/emp-table.component";
import { EmpListComponent } from "./emp-table/emp-list/emp-list.component";
import { EmpDetailsComponent } from "./emp-table/emp-details/emp-details.component";
import { AuthComponent } from "./auth/auth.component";


const routes: Routes = [
    {path: 'Auth' , component:AuthComponent},
    { path: 'Add-Data', component: EmpInfoComponent},
    {path: 'Edit/:id' , component:EmpInfoComponent},
    {
        path: 'E-Table', component: EmpTableComponent, children: [
            { path: '', component: EmpListComponent },
            { path: 'Details/:id', component: EmpDetailsComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RouterModuleComponent { }