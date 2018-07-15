import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-test",
    moduleId: module.id,
    templateUrl: "./test.component.html"
})
export class TestComponent implements OnInit {
    message = "You have successfully authenticated. This is where you build your core application functionality.";

    constructor() {
    }

    ngOnInit(): void {
    }
}
