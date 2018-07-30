import { Injectable } from "@angular/core";
import { getString, setString } from "tns-core-modules/application-settings";

const tokenKey = "token";
const rol = "rol";

export class BackendService {

  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }

  
  static set rol(rol: string) {
    setString("rol", rol);
    //P = profesor, R = representante
  }
  static get rol() {
    return getString("rol");
    //P = profesor, R = representante
  }
  static isProfesor(): boolean {
    return !!getString("rol");
  }
}