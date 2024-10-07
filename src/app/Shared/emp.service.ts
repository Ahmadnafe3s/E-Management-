import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { districtResponseType , employeeDetailsResponse, employeesListResponse, stateResponseType } from "../types/type";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmpService {


    constructor(private http: HttpClient) { }


    getEmployeesList() {
        return this.http.get<employeesListResponse>(environment.API + '/employeesList').pipe(catchError(this.handleError as any))
    }


    getEmployeeDetails(UID) {
        return this.http.get<employeeDetailsResponse>(environment.API + '/Details/' + UID)
    }


    onSubmit(FormValue) {

        const UID = this.generateUID()

        return this.http.post(environment.API + '/postEmployee', { UID, ...FormValue })
    }


    onUpdate(UID, FormValue) {

        return this.http.put(environment.API + '/updateEmployee', { UID: UID, ...FormValue })

    }


    onDelete(UID) {
        return this.http.delete<{ message: string }>(environment.API + '/deleteEmployee/' + UID)
    }


    get States() {
        return this.http.get<stateResponseType>(`${environment.API}/States`)
    }


    getDistrict(id) {
        return this.http.get<districtResponseType>(environment.API + '/District/' + id)
    }


    generateUID() {
        let str = '12345'
        let UID: string | number = 22;
        for (let i = 0; i < str.length; i++) {
            UID = UID + str[Math.round(Math.random() * 4)]
        }

        return +UID
    }


    handleError(err:HttpErrorResponse){

        let message = null;
        if (!err || !err.error) {
            message = 'No Internet Connection'
        }
        else {
            message = err.error.message
        }
        return throwError(() => {
            throw new Error(message)
        })
        

    }
}