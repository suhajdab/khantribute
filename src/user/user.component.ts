import { Component, OnInit } from "@angular/core";
import M from "materialize-css";
import { UserService } from "../services/user.service";

@Component({
    selector: "user-dropdown",
    templateUrl: "./user.component.html",
    providers: [UserService]
})
export class UserComponent implements OnInit {
    constructor(private userService: UserService) {}
    ngOnInit() {
        M.Dropdown.init(document.getElementById("user-dropdown"), {
            alignment: "right",
            constrainWidth: false
        });
    }
    changeNick() {
        this.userService.setNick(prompt("What would you like your new nickname to be?"));
    }
}