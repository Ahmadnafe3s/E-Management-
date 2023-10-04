import { Injectable } from "@angular/core";
import { EmpModel } from "../emp-info/emp.model";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmpService {
    empData: EmpModel[];

    constructor(private http: HttpClient) { }

    FetchData() {
        return this.http.get<{ data: EmpModel[], message: string }>('http://localhost:3000').pipe(tap(res => {
            this.empData = res.data
            return res;
        }))
    }

    onSave(FormValue) {
        let str = '12345'
        let UID: string | number = 22;
        for (let i = 0; i < str.length; i++) {
            UID = UID + str[Math.round(Math.random() * 4)]
        }

        this.http.post('http://localhost:3000/post', { UID: +UID, ...FormValue }).subscribe(res => {
            console.log(res);
        })
    }



    onUpdate(UID, FormValue) {

        this.http.put('http://localhost:3000/Update', { UID: UID, ...FormValue }).subscribe(res => {
            console.log(res);
        })
    }

    onDelete(UID) {
        let url = `http://localhost:3000/Delete/${UID}`
        this.http.delete(url).subscribe(res => {
            console.log(res);
        })
        
    }

    get EmpData() {
        return this.empData.slice()
    }

}