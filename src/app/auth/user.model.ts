export class user {
    constructor(public Name: string, private _token: string, public ExpireIn: number) { }

    get Token() {
        if (!this._token || this.ExpireIn < new Date().getTime()) {
            return null;
        }

        return this._token
    }
}