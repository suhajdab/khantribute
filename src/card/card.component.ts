import { Component } from "@angular/core";
import { TranslationService } from "../services/translation.service";
import { AppService } from "../services/app.service";
import {parseString, toHTML} from "./parser";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
    selector: "card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.css"],
    providers: [
        AppService,
        TranslationService
    ]
})
export class CardComponent {
    constructor(private translationService: TranslationService, private appService: AppService, private sanitizer: DomSanitizer) {}
    getTranslationHTML(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(toHTML(parseString(this.translationService.currentString().target)));
    }
    getOriginalHTML(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(toHTML(parseString(this.translationService.currentString().source)));
    }
}