import { Component, OnInit } from "@angular/core";
import M from "materialize-css";
import { TranslationService } from "../services/translation.service";

@Component({
    selector: "lang-dropdown",
    templateUrl: "./languages.component.html",
    providers: [ TranslationService ]
})
export class LangComponent implements OnInit {
    constructor(private translationService: TranslationService) {}
    ngOnInit() {
        M.Dropdown.init(document.getElementById("lang-dropdown"), {
            constrainWidth: false
        });
    }
    setLang(i) {
        this.translationService.setLang(i);
    }
}