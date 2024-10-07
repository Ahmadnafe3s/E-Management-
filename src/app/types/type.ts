export type signUpResponse = {
    message: string;
}


export type logInResponse = {
    Name: string,
    Email: string,
    Token: string,
    ExpiresIn
}


export type userSessionType = {
    Name: string,
    Email: string,
}


export type Employee = {

    UID: number,
    Name: string,
    Email: string,
    Phone: number,
    State: string,
    District: string,
    Dob: string,
    Joining_Date: string,
    Intern_Type: string,
    Gender: string

}


export type employeesListResponse =
    {
        employeesList: Employee[]
    }


export type employeeDetailsResponse = {
    details: Employee // only object is returning
}


export type states =
    [{
        Id: number,
        Name: string
    }]



export type stateResponseType = {
    States: states
}


export type districts =
    [{
        Id: number,
        Name: string,
        State_Id: number
    }]


export type districtResponseType = {
    Districts: districts
}