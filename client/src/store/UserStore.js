import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    checkValidToken() { // Изменяем на обычную функцию
        let isExpired = true;
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const dateNow = new Date();
            if (decodedToken.exp > dateNow.getTime()) {
                isExpired = false;
            }
        }
        return isExpired;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}
