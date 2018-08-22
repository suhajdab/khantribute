import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "./app.service";

@Injectable({
    providedIn: "root"
})
export class TranslationService {
    constructor(private appService: AppService, private http: HttpClient) {}
    approveString() {
        this.submit(1);
    }
    skipString() {
        this.submit(0);
    }
    softRejectString() {
        this.submit(-0.09);
    }
    rejectString() {
        this.submit(-1);
    }
    private submit(score) {
        
    }
}