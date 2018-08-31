import { Component, ChangeDetectorRef } from "@angular/core";
import { TranslationService } from "../services/translation.service";
import {parseString, toHTML} from "./parser";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

enum PanType {
    HORIZONTAL,
    VERTICAL,
    NONE
}

@Component({
    selector: "card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.css"],
    providers: [
        TranslationService
    ]
})
export class CardComponent {
    private panType: PanType = PanType.NONE;
    private scrollX: number = 0;
    private scrollY: number = 0;
    private lastEnd: number = -Infinity;
    constructor(private translationService: TranslationService, private sanitizer: DomSanitizer, private changeDetector: ChangeDetectorRef) {}
    getTranslationHTML(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(toHTML(parseString(this.translationService.currentString().target)));
    }
    getOriginalHTML(): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(toHTML(parseString(this.translationService.currentString().source)));
    }
    onPanStart(evt) {
        evt.preventDefault();
        this.panType = PanType.NONE;
        this.scrollX = 0;
    }
    onPanEnd(evt) {
        evt.preventDefault();
        if (this.scrollX <= -window.innerWidth / 4) this.translationService.rejectString();
        else if (this.scrollX >= window.innerWidth / 4) this.translationService.approveString();
        this.panType = PanType.NONE;
        this.scrollX = 0;
        this.lastEnd = evt.timeStamp;
    }
    onPan(evt) {
        if (evt.timeStamp < this.lastEnd + 20) {
            return;
        }

        if (this.panType === PanType.NONE) {
            if (Math.abs(evt.deltaX) < Math.abs(evt.deltaY)) {
                this.panType = PanType.VERTICAL;
            } else {
                this.panType = PanType.HORIZONTAL;
            }
        }
        
        if (this.panType === PanType.VERTICAL) {
            // TODO This is awful but it was the only way I could think of
            window.scrollBy(0, -evt.velocityY * 70);
        } else if (this.panType === PanType.HORIZONTAL) {
            this.scrollX = evt.deltaX;
        }
    }
    getScrollX() {
        return this.scrollX;
    }
    getScrollY() {
        return this.scrollY;
    }
}