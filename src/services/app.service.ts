import { Injectable } from "@angular/core";
import ls from "../util/ls";
import { lskeys } from "../data/lskeys";
import { languages } from "../data/languages";
import { HttpClient } from "@angular/common/http";
import api from "../data/api";
import { toQueryString } from "../util/to-query-string";
import katex from "katex";

let adjectives = [
    "Happy",
    "Sad",
    "Smart",
    "Tired",
    "Green",
    "Purple",
    "Small",
    "Large",
    "Real",
    "Weird"
];

let nouns = [
    "Aardvark",
    "Buffalo",
    "Chair",
    "Dog",
    "Eagle",
    "Fountain",
    "Goat",
    "Human",
    "Igloo",
    "Juniper"
];

function generateNick(): string {
    return adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)];
}

function getInitialLang() {
    let match = window.location.hostname.match("([^\.]+)\.khantribute\.localgrid\.de")
    if(match === null) {
        return parseInt(ls.getItem(lskeys.LANG) || "0"); // Default
    } else {
        let langIndex = languages.findIndex((lang) => lang.bld === match[1]);

        if (langIndex < 0) {
            return 0;
        } else {
            return langIndex;
        }
    }
}

@Injectable({
    providedIn: "root"
})
export class AppService {
    private selected: number;
    private user: {
        score: number,
        nickname: string,
        rank: string
    } = {
        score: 0,
        nickname: generateNick(),
        rank: ""
    }
    languages = languages;
    constructor(private http: HttpClient) {
        this.setLang(getInitialLang());

        if (this.nickIsValid(ls.getItem(lskeys.USER))) {
            this.setNickname(ls.getItem(lskeys.USER));
        }
        
        let bld = this.getLang().bld;
        // Because consistency
        if (bld === "svse") bld = "sv-SE";
        this.http.get(api.root + api.user + bld + "?client=" + this.getClientID()).subscribe((data: {nickname: string, num_votes: number}) => {
            this.setNickname(data.nickname);
            this.addUserScore(data.num_votes);
        });
    }
    getUserScore(): number {
        return this.user.score;
    }
    addUserScore(n: number) {
        this.user.score += Math.sign(n) * Math.ceil(Math.abs(n));
    }
    getNickname(): string {
        return this.user.nickname;
    }
    setNickname(nick: string) {
        if (this.nickIsValid(nick) && nick !== this.user.nickname) {
            ls.setItem(lskeys.USER, nick);
            this.user.nickname = nick;
            let bld = this.getLang().bld;
            // Because consistency
            if (bld === "svse") bld = "sv-SE";
            this.http.get(api.root + api.setNick + bld + toQueryString({
                client: this.getClientID(),
                nickname: nick
            })).subscribe(() => {
                // TODO: Error handling of some sort
            });
        }
    }
    nickIsValid(nick: string): boolean {
        return typeof nick === "string" && nick.length > 0;
    }
    getUserRank(): string {
        return this.user.rank;
    }
    setLang(i) {
        if (i >= 0 && i < languages.length) {
            this.selected = i;
            ls.setItem(lskeys.LANG, i);
        }
    }
    getLang(): {name: string, bld: string} {
        return languages[this.selected];
    }
    getLangIndex(): number {
        return this.selected;
    }
    getClientID(): string {
        if (!ls.getItem(lskeys.CID)) {
            let cid = ("" + Math.random()).slice(2);
            ls.setItem(lskeys.CID, cid);
            return cid;
        }
        return ls.getItem(lskeys.CID);
    }
    renderKatex(s: string): string {
        return katex.renderToString(s, {
            throwOnError: false
        });
    }
}