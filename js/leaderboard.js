import $ from "jquery"
import {MDCMenu} from "@material/menu";

function generatePlaceholderNick() {
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

    return adjectives[Math.floor(Math.random() * adjectives.length)] + nouns[Math.floor(Math.random() * nouns.length)];
}

var langs = [ {
    "bld" : "es",
    "name" : "Spanish"
  }, {
    "bld" : "pt",
    "name" : "Portuguese (Brazilian)"
  }, {
    "bld" : "pt-pt",
    "name" : "Portuguese (European)"
  }, {
    "bld" : "fr",
    "name" : "French"
  }, {
    "bld" : "tr",
    "name" : "Turkish"
  }, {
    "bld" : "nb",
    "name" : "Norwegian Bokmål"
  }, {
    "bld" : "hi",
    "name" : "Hindi"
  }, {
    "bld" : "id",
    "name" : "Indonesian"
  }, {
    "bld" : "ms",
    "name" : "Malay"
  }, {
    "bld" : "cs",
    "name" : "Czech"
  }, {
    "bld" : "da",
    "name" : "Danish"
  }, {
    "bld" : "de",
    "name" : "German"
  }, {
    "bld" : "xh",
    "name" : "Xhosa"
  }, {
    "bld" : "it",
    "name" : "Italian"
  }, {
    "bld" : "nl",
    "name" : "Dutch"
  }, {
    "bld" : "pl",
    "name" : "Polish"
  }, {
    "bld" : "el",
    "name" : "Greek"
  }, {
    "bld" : "bg",
    "name" : "Bulgarian"
  }, {
    "bld" : "mn",
    "name" : "Mongolian"
  }, {
    "bld" : "ru",
    "name" : "Russian"
  }, {
    "bld" : "sr",
    "name" : "Serbian"
  }, {
    "bld" : "uk",
    "name" : "Ukranian"
  }, {
    "bld" : "hy",
    "name" : "Armenian"
  }, {
    "bld" : "he",
    "name" : "Hebrew"
  }, {
    "bld" : "ur",
    "name" : "Urdu"
  }, {
    "bld" : "ar",
    "name" : "Arabic"
  }, {
    "bld" : "fa",
    "name" : "Persian (Farsi)"
  }, {
    "bld" : "bn",
    "name" : "Bengali"
  }, {
    "bld" : "te",
    "name" : "Telugu"
  }, {
    "bld" : "th",
    "name" : "Thai"
  }, {
    "bld" : "zh-hans",
    "name" : "Simplified Chinese"
  }, {
    "bld" : "ja",
    "name" : "Japanese"
  }, {
    "bld" : "ko",
    "name" : "Korean"
  }, {
    "bld" : "ka",
    "name" : "Georgian"
  } ];

function findLangFromDomain() {
    var match = window.location.hostname.match("([^\.]+)\.khantribute\.localgrid\.de")
    if(match === null) {
        return 'sv-SE'; // Default
    } else {
        var protoLangcode = match[1]; // "de" or "svse"
        // we need "sv-SE"
        if(protoLangcode.length <= 2) {
            return protoLangcode
        } else { // "svse", need to convert to "sv-SE"
            return /* sv */ protoLangcode.slice(0,2) + "-" + protoLangcode.slice(2).toUpperCase();
        }
    }
}

var lang = findLangFromDomain();
$("#language").text(lang);

var apiPrefix = "https://katc.localgrid.de/apiv3/khantribute";
var nickname = generatePlaceholderNick();
let cid = null,
    count = 0;
if(window.location.hostname.includes(".khantribute.localgrid.de")) {
    // Default for "production use": Use current domain
    apiPrefix = "/apiv3/khantribute";
}

function init() {
    $("#nickname").text(nickname);

    if (!localStorage.getItem("kaid")) {
        cid = ("" + Math.random()).slice(2) // long number
        localStorage.setItem("kaid", cid);
    }
    cid = localStorage.getItem("kaid");
    // $("#count").text(count);
    // Load count & nickname given cid
    loadUserInfo();

    let menu = new MDCMenu(document.getElementById("menu"));       
    $("#menu-button").click(function() {
        menu.open = !menu.open;
    });
    let langMenu = new MDCMenu(document.getElementById("lang-menu"));
    $("#lang-menu-button").click(function() {
        langMenu.open = !langMenu.open;
    });

    $("#lang-list").append(langs.map(({bld, name}) => $(`<li class="mdc-list-item" role="menuitem">${name}</li>`).click(function() {
        var match = window.location.hostname.match("([^\.]+)\.khantribute\.localgrid\.de")
        if (match != null) {
            window.location = `https://${bld}.khantribute.localgrid.de`;
        }
    })));

    $("#change-nick").click(function() {
        setNickname(prompt("Enter your new nickname") || nickname);
    });

    getLeaderboard();
}

function loadUserInfo() {
    $.getJSON(apiPrefix + "/user/" + lang, {client: cid}, function(data) {
        console.log(data);
        count = data.num_votes;
        $("#score").text(count);
        nickname = data.nickname || nickname;
        $("#nickname").text(nickname);
    });
}

// TODO implement nickname in UI
function setNickname(newNickname) {
    if (newNickname.length === 0) {
        newNickname = nickname;
    }
    nickname = newNickname;
    $("#nickname").text(newNickname);
    $.getJSON(apiPrefix + "/set-nickname/" + lang,
        {client: cid, nickname: newNickname}, function(data) {
        // TODO handle errors?
    });
}

function getLeaderboard() {
    $.getJSON(apiPrefix + "/leaderboard/" + lang,
        {client: cid}, function(data) {
            $("#leaderboard-container").append(data.map(entry => $(`<div class="leaderboard-entry"><span class="leaderboard-name">${entry.nickname}</span><span class="leaderboard-score">${entry.num_votes}</span></div>`)))
    });
}

$(document).ready(init);