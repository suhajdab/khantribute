import { Component } from "@angular/core";
import { TranslationService } from "../services/translation.service";

@Component({
    selector: "controls",
    templateUrl: "./controls.component.html",
    styleUrls: ["./controls.component.css"],
    providers: [TranslationService]
})
export class ControlsComponent {
    constructor(private translationService: TranslationService) {}
    approve() {
        this.translationService.approveString();
    }
    reject() {
        this.translationService.rejectString();
    }
    softReject() {
        this.translationService.softRejectString();
    }
    skip() {
        this.translationService.skipString();
    }
}