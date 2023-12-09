import { RouterModule, Routes } from "@angular/router";
import { EmpInfoComponent } from "./emp-info/emp-info.component";
import { NgModule } from "@angular/core";
import { EmpTableComponent } from "./emp-table/emp-table.component";
import { EmpListComponent } from "./emp-table/emp-list/emp-list.component";
import { EmpDetailsComponent } from "./emp-table/emp-details/emp-details.component";
import { AuthComponent } from "./auth/auth.component";
import { canActivateGuard } from "./auth/canActivate.guard";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
import { LoginRegisterComponent } from "./auth/login-register/login-register.component";


const routes: Routes = [
    { path: '', redirectTo: 'E-Table', pathMatch: 'full' },
    { path: 'Auth', component: AuthComponent , children : [
        {path : '' , component : LoginRegisterComponent},
        {path: 'forget_password' , component : ForgetPasswordComponent}
    ]},
    
    { path: 'Add-Data', component: EmpInfoComponent , canActivate: [canActivateGuard] },
    { path: 'Edit/:id', component: EmpInfoComponent },
    {
        path: 'E-Table', component: EmpTableComponent, canActivate: [canActivateGuard], children: [
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