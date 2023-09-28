import { Injectable } from "@angular/core";
import { EmpModel } from "../emp-info/emp.model";

@Injectable({
    providedIn: 'root'
})
export class EmpService {
    empData: EmpModel;

    onSave(FormValue: EmpModel) {
        this.empData = FormValue
        console.log(FormValue.Email);
    }

    onUpdate() {

    }

    get EmpData() {
        return this.empData;
    }
}