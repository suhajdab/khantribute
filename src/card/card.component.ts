import { Component } from "@angular/core";
import { TranslationService } from "../services/translation.service";

function formatString(s) {
    return s.replace(/\\n/g, "\n").replace(/\n+/g, "\n").replace(/\!\[\]\(.+?\)/g, "[IMAGE]");
}

@Component({
    selector: "card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.css"],
    providers: [ TranslationService ]
})
export class CardComponent {
    constructor(private translationService: TranslationService) {}
    getTranslation() {
        return formatString(this.translationService.currentString().target);
    }
    getOriginal() {
        return formatString(this.translationService.currentString().source);
    }
}