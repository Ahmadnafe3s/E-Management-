import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EmpTableComponent } from "./emp-table/emp-table.component";
import { EmpListComponent } from "./emp-table/emp-list/emp-list.component";
import { EmpDetailsComponent } from "./emp-table/emp-details/emp-details.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/Auth.guard";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
import { signUpcomponent } from "./auth/signUp/signUp.component";
import { logInComponent } from "./auth/logIn/logIn.component";
import { EmployeeFormComponent } from "./employeeForm/employee-form.component";
import { loggedInGuard } from "./auth/loggedIn.guard";


const routes: Routes = [
    { path: '', redirectTo: 'E-Table', pathMatch: 'full' },
    {
        path: 'Auth', component: AuthComponent, canActivate:[loggedInGuard] , children:  [
            { path: 'logIn', component: logInComponent },
            { path: 'signUp', component: signUpcomponent },
            { path: 'forget_password', component: ForgetPasswordComponent }
        ]
    },

    { path: 'Add-Data', component: EmployeeFormComponent, canActivate: [AuthGuard] },
    { path: 'Edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
    {
        path: 'E-Table', component: EmpTableComponent, canActivate: [AuthGuard], children: [
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