import { User } from "./User";
const STORAGE_KEY: string = "wheel_fortune",
    INITIAL_ACCOUNT: number = 1000,
    root = window;
let data: User [];


export module UsersService {
    function saveToStorage() {
        root.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function readFromStorage() {
        let e: Error;
        try {
            data = JSON.parse(root.localStorage.getItem(STORAGE_KEY));
        } catch (e){}
    }

    export function init() {
       readFromStorage();
    }

    export function getUID(): string {
        return "" + data.length;
    }

    export function hasUser(userId: string): boolean {
        return !!data[userId];
    }

    export function createUser(nickName: string) {
        data.push(new User(nickName, INITIAL_ACCOUNT, getUID()));
        saveToStorage();
    }

    export function updateUser(userId: string, account: number) {
        if(hasUser(userId)) {
            data[userId].account = account;
            saveToStorage();
            return;
        }
        throw new Error("Undefined user.");
    }

    export function removeUser(userId: string) {
        if(hasUser(userId)) {
            data.splice(+userId, 1);
            saveToStorage();
            return;
        }
        throw new Error("Undefined user.");
    }
}