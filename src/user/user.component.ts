import { Component, OnInit } from "@angular/core";
import M from "materialize-css";
import { AppService } from "../services/app.service";

@Component({
    selector: "user-dropdown",
    styleUrls: ["./user.component.css"],
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
    constructor(public appService: AppService) {}
    ngOnInit() {
        M.Dropdown.init(document.getElementById("user-dropdown"), {
            alignment: "right",
            constrainWidth: false
        });
    }
    changeNick() {
        this.appService.setNickname(prompt("What would you like your new nickname to be?"));
    }
}