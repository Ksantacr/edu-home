import { Component, OnInit } from "@angular/core";

import * as localStorage from 'nativescript-localstorage';
import { Router } from "@angular/router";

@Component({
    selector: "app-test",
    moduleId: module.id,
    templateUrl: "./test.component.html"
})
export class TestComponent implements OnInit {
    message = "You have successfully authenticated. This is where you build your core application functionality.";

    constructor(private router:Router) {
        //localStorage.setItem('logeado', false);
    }

    ngOnInit(): void {
    }
    salir() {
        localStorage.setItem('logeado', false);
        this.router.navigate(["/login"]);
    }
}
