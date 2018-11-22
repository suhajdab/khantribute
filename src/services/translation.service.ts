import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from "./app.service";
import api from "../data/api";
import { toQueryString } from "../util/to-query-string";

let callbacks: Array<Function> = [];

@Injectable({
    providedIn: "root"
})
export class TranslationService {
    private strings: Array<{
        id: number,
        num_votes: number,
        source: string,
        source_length: number,
        target: string
    }> = [];
    constructor(private appService: AppService, private http: HttpClient) {
        this.loadStrings();
    }
    loadStrings() {
        let bld = this.appService.getLang().bld;
        // Because consistency
        if (bld === "svse") bld = "sv-SE";

        this.http.get(api.root + api.strings + bld + toQueryString({
            client: this.appService.getClientID(),
            offset: 0
        })).subscribe((data: any) => {
            this.strings.push.apply(this.strings, data);
        }, error => console.error(error));
    }
    currentString() {
        return this.strings[0];
    }
    nextString() {
        return this.strings[1];
    }
    advance() {
        this.strings.shift();
    }
    stringsLeft() {
        return this.strings.length;
    }
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
    onSubmit(fn: Function) {
        callbacks.push(fn);
    }
    private submit(score) {
        let bld = this.appService.getLang().bld;
        // Because consistency
        if (bld === "svse") bld = "sv-SE";

        for (let cb of callbacks) {
            cb(score);
        }
        
        this.http.get(api.root + api.submit + bld + toQueryString({
            client: this.appService.getClientID(),
            stringid: this.strings[0].id,
            score: score,
            nickname: this.appService.getNickname()
        })).subscribe(() => {}, error => console.error(error));
        if (this.strings.length < 10) {
            this.loadStrings();
        }
    }
}