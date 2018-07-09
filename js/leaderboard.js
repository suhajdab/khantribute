import $ from "jquery"
import {MDCMenu} from "@material/menu";
import langs from "./data/langs.json";

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