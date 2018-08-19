import { Component } from "@angular/core";
import { TranslationService } from "../services/translation.service";

@Component({
    selector: "lang-dropdown",
    templateUrl: "./languages.component.html",
    providers: [ TranslationService ]
})
export class LangComponent {
    constructor(private translationService: TranslationService) {}
    setLang(i) {
        this.translationService.setLang(i);
    }
}