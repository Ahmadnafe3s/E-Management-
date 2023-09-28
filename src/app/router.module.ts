import { RouterModule, Routes } from "@angular/router";
import { EmpInfoComponent } from "./emp-info/emp-info.component";
import { NgModule } from "@angular/core";

const routes:Routes = [
    {path : 'Add-Data' , component : EmpInfoComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class RouterModuleComponent{}