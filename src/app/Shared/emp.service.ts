import { Injectable } from "@angular/core";
import { EmpModel } from "../emp-info/emp.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class EmpService {
    constructor(private http: HttpClient) {
    }

    FetchData() {
        return this.http.get<{ data: EmpModel[], message: string }>('http://localhost:3000/List')
    }

    getDetails(UID) {
        let url = `http://localhost:3000/Details/${UID}`
        return this.http.get<{ data: EmpModel, message: string }>(url)
    }

    onSave(FormValue) {
        let str = '12345'
        let UID: string | number = 22;
        for (let i = 0; i < str.length; i++) {
            UID = UID + str[Math.round(Math.random() * 4)]
        }

        return this.http.post('http://localhost:3000/post', { UID: +UID, ...FormValue })
    }

    onUpdate(UID, FormValue) {

        return this.http.put('http://localhost:3000/Update', { UID: UID, ...FormValue })
    }

    onDelete(UID) {
        let url = `http://localhost:3000/Delete/${UID}`
        return this.http.delete<{ message: string }>(url)
    }

    get States() {
        return this.http.get<{ data: { Id: number, Name: string } }>('http://localhost:3000/States')
    }

    getDistrict(id) {
        let url = `http://localhost:3000/District/${id}`
        return this.http.get<{ data: { Id: number, Name: string, State_Id: number } }>(url)
    }
}