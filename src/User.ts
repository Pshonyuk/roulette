export class User {
    constructor(private _nickName: string, private _account: number, private _id: string) {}

    public get nickName() {
        return this._nickName;
    }

    public get account() {
        return this._account;
    }

    public set account(account: number) {
        this._account = account;
    }

    public get id() {
        return this._id;
    }
}