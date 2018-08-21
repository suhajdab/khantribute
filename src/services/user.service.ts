import { lskeys } from "../data/lskeys";
import ls from "../util/ls";

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

export class UserService {
    private nick: string;
    constructor() {
        if (this.nickIsValid(ls.getItem(lskeys.USER))) {
            this.setNick(ls.getItem(lskeys.USER));
        } else {
            this.setNick(generateNick())
        }
    }
    nickIsValid(nick: string): boolean {
        return typeof nick === "string" && nick.length > 0;
    }
    getNick(): string {
        return this.nick;
    }
    setNick(nick: string) {
        if (this.nickIsValid(nick)) {
            ls.setItem(lskeys.USER, nick);
            this.nick = nick;
        }
    }
}