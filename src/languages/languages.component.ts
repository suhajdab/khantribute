import { Component, OnInit } from "@angular/core";
import M from "materialize-css";
import { AppService } from "../services/app.service";

@Component({
    selector: "lang-dropdown",
    templateUrl: "./languages.component.html"
})
export class LangComponent implements OnInit {
    constructor(public appService: AppService) {}
    ngOnInit() {
        M.Dropdown.init(document.getElementById("lang-dropdown"), {
            constrainWidth: false
        });
    }
    setLang(i) {
        this.appService.setLang(i);
    }
}