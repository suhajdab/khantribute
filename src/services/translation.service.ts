import { languages } from "../data/languages";
import { lskeys } from "../data/lskeys";
import ls from "../util/ls";

function getInitialLang() {
    let match = window.location.hostname.match("([^\.]+)\.khantribute\.localgrid\.de")
    if(match === null) {
        return (ls.getItem(lskeys.LANG) || 0); // Default
    } else {
        let langIndex = languages.findIndex((lang) => lang.bld === match[1]);

        if (langIndex < 0) {
            return 0;
        } else {
            return langIndex;
        }
    }
}

export class TranslationService {
    private selected
    languages = languages
    constructor() {
        this.setLang(getInitialLang());
    }
    setLang(i) {
        if (i >= 0 && i < this.languages.length) {
            this.selected = i;
            ls.setItem(lskeys.LANG, i);
        }
    }
    getLang() {
        return this.languages[this.selected];
    }
    getLangIndex() {
        return this.selected;
    }
}