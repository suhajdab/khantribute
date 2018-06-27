/*
	TODO: prohibit rapid submits
	TODO: reset scroll-y after submit
	TODO: feedback on drag indicating outcome (ex: right => green, left => red)
	TODO: Remove snowman from katex rendering
	TODO: Analytics
 */
import $ from "jquery"
import Hammer from "hammerjs"
import {MDCDialog} from "@material/dialog"
import {MDCFormField} from "@material/form-field";
import {MDCCheckbox} from "@material/checkbox";
import {MDCSnackbar} from "@material/snackbar";

var Khantribute = (function() {
    
    function findLangFromDomain() {
        var match = window.location.hostname.match("([^\.]+)\.khantribute\.localgrid\.de")
        if(match === null) {
            return 'sv-SE'; // Default
        } else {
            return match[1];
        }
    }
    
    var lang = findLangFromDomain();
    console.info("Language: ", lang);

    // API prefix for development: Just serve from "main domain"
    // NOTE: All domains serve identical content. The ONLY DIFFERENCE is the domain!
    var apiPrefix = "https://katc.localgrid.de/apiv3/khantribute";
    if(window.location.hostname.includes(".khantribute.localgrid.de")) {
        // Default for "production use"
        apiPrefix = "/apiv3/khantribute";
    }

    var nickname = ""; //TODO
	var testing = false,
        cid = null,
        string_id = null,
        strings = [],
        count = 0,
        total = 0,
        blocked = false, // Ignore events, e.g. when animation is still ongoing
        animationOngoing,
        hideCheckbox,
        hideForm,
        welcomeDialog,
        $card,
        feedbackSnackbar;
    const newCardAnimLen = 0.5;

    function nextString() {
        if (strings == null || strings.length == 0) {
            string_id = null;
            fetchStrings();
            return;
        }
        
        let display = strings.shift();
        
        try {
            displayStrings(display);
            console.log(strings.length + " strings left");
        } catch (e) {
            console.error(e);
            console.log("Display failed. Attempting to display next string.");
            nextString();
        }
    }

    function displayStrings(currentString) {
        var source = transformString(currentString.source);
        var target = transformString(currentString.target);

        $("#source-text").html(source);
        $("#target-text").html(target);
        // progressbar.progress = (total - strings.length) / total;
        string_id = currentString.id;
    }

    function transformString(str) {
        console.log(str);
		// remove 'snowmen' interactive elements
		str = str.replace(/\[\[☃(.*?)\]\]/g, '');
        // match string frgments between $ for katex
        str = str.replace(/\$(.*?)\$/g, (_, item) => katex.renderToString(
            item
                .replace("\\\\", "\\")
                .replace(/\\+?([a-z0-9]+)/ig, "\\$1")
        ));
        // replace newline characters
        str = str.replace(/\\n/g, "<br />");
        // Handle markdown
        str = str.replace(/(?:__(.*?)__)|(?:\*\*(.*?)\*\*)/g, "<b>$1$2</b>");
        str = str.replace(/(?:_(.*?)_)|(?:\*(.*?)\*)/g, "<i>$1$2</i>");
        str = str.replace(/\~\~(.*?)\~\~/, "<del>$1</del>");
        str = str.replace(/\!\[(.*?)\]\((.*?)\)/g, "<img src='$2' alt='$1'>");
        str = str.replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$1'>$2</a>");
        
        return str;
    }

    function generateKatex(_, item) {
        // remove bounding $
        // remove escape backslash
        // match = match.replace(/\\\\/g, "\\");
        // console.log(match);
        return katex.renderToString(match);
    }

    function init() {
        $card = $('#container');
        hideForm = new MDCFormField(document.getElementById("hide-form"));
        hideCheckbox = new MDCCheckbox(document.getElementById("hide-checkbox"));
        feedbackSnackbar = new MDCSnackbar(document.getElementById("feedback-snackbar"));
        if (localStorage.getItem("disable-welcome") == null) {
			setupWelcomeDialog();
		}

        if (!localStorage.getItem("kaid")) {
            cid = ("" + Math.random()).slice(2) // long number
            localStorage.setItem("kaid", cid);
        }
        cid = localStorage.getItem("kaid");
        // $("#count").text(count);
        // Load count & nickname given cid
        loadUserInfo();

        // Fetch first set of strings
        fetchStrings();
        
        (new Hammer($card[0])).on("panleft panright panend", onPan);
        $('#approveBtn').on('click', onApprove);
        $('#skipBtn').on('click', onSkip);
        $('#rejectBtn').on('click', onReject);
    }

	function setupWelcomeDialog() {
		var dialogEl = document.getElementById('help-dialog'),
			welcomeDialog = new MDCDialog(dialogEl);

		welcomeDialog.show();
		welcomeDialog.listen('MDCDialog:accept', function() {
		  console.log('accepted');
		  if (this.querySelector('input[type="checkbox"]').checked) {
			  localStorage.setItem('disable-welcome', 1);
		  }
	  });
	}

    function resetCard() {
        setTransform(0, -$("body").height() * 3, 0);
        setTimeout(function() {
            applyTransition(0, 0, 0, newCardAnimLen);
        }, 300);
    }
    
    function setTransform(x, y, deg) {
        var style = {};
        
        style.transition = "";
        
        if (x != null) {
            style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        
        if (deg != null) {
            style.transform += ` rotate(${deg}deg)`;
        }
        
        $card.css(style);
    }

    function applyTransition(x, y, deg, dur) {
        var style = {};
        
        style.transition = "";

        if (x != null) {
            style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        if (deg != null) {
            style.transform += ` rotate(${deg}deg)`;
        }

        if (dur != null) {
            style.transition = `transform ${dur}s`;
        }

        $card.css(style);
    }

    function onPan(ev) {
        var yfactor = ev.deltaX >= 0 ? 1 : -1,
            resultEvent = {};
        
        if (ev.deltaX > 0) {
            $(".khantribute-approve-bar").width(ev.deltaX);
            $(".khantribute-deny-bar").width(0);
        } else if (ev.deltaX < 0) {
            $(".khantribute-deny-bar").width(-ev.deltaX);
            $(".khantribute-approve-bar").width(0);
        }
        
        if (ev.deltaX > 100) {
            $("#approveBtn").addClass("active");
        } else if (ev.deltaX < -100) {
            $("#rejectBtn").addClass("active");
        } else {
            $("#approveBtn").removeClass("active");
            $("#rejectBtn").removeClass("active");
        }
        
        if (ev.type === "panend") {
            $(".khantribute-approve-bar").animate({width: 0}, newCardAnimLen * 1000);
            $(".khantribute-deny-bar").animate({width: 0}, newCardAnimLen * 1000);
            setTimeout(() => {
                $("#approveBtn").removeClass("active");
                $("#rejectBtn").removeClass("active");
            }, 250);
            // released
            if (ev.deltaX > 100 || ev.deltaX < -100) {
                applyTransition($("body").width() * yfactor + ev.deltaX, 0, 0, newCardAnimLen);
                setTimeout(function() {
                    if (ev.deltaX > 100) {
                        submit(1);
                    } else {
                        submit(-1);
                    }
                    nextString();
                    resetCard();
                }, newCardAnimLen * 1000);
            }
                // 10 pixels per second
                applyTransition(0, 0, 0, ev.deltaX / 100);
        } else {
            // dragging
            setTransform(ev.deltaX, 0);
        }
    }

    function loadUserInfo() {
        $.getJSON(apiPrefix + "/user/" + lang, {client: cid}, function(data) {
            count = data.num_votes;
            nickname = nickname || data.nickname; 
        });
    }

    // TODO implement nickname in UI
    function setNickname(newNickname) {
        $.getJSON(apiPrefix + "/set-nickname/" + lang,
            {client: cid, nickname: newNickname}, function(data) {
            // TODO handle errors?
        });
    }

    // TODO implement UI
    function getLeaderboard(newNickname) {
        $.getJSON(apiPrefix + "/leaderboard/" + lang,
            {client: cid}, function(data) {
            // TODO handle JSON
        });
    }


    function submit(score) {
        // Send result to server
        if (testing) return;
        let params = {
            "client": cid,
            "stringid": string_id,
            "score": score,
            "nickname": nickname
        }
        console.log("Submitting", params);
        $.getJSON(apiPrefix + "/submit/" + lang, params, function(data) {
            $("#rank").text(data.rank);
            count += 1;
            $("#count").text(count);
        })
        // Update count
        count++;
        localStorage.setItem("count", count);
        $("#count").text(count);
    }

    function doFade(elem) {
        blocked = true;
        $("#text").fadeOut(0);
        $(elem).fadeIn(200, function() {
            $(elem).fadeOut(200, function() {
                $("#text").fadeIn(200);
                blocked = false;
            });
        })
    }

    function onApprove() {
        applyTransition($("body").width(), 0, 0, newCardAnimLen);
        setTimeout(() => {
            submit(1);
            nextString();
            resetCard();
        }, newCardAnimLen * 1000);
        feedbackSnackbar.show({
            message: "Approved translation",
            timeout: 1000
        });
        nextString();
    }

    function onReject() {
        applyTransition(-$("body").width(), 0, 0, newCardAnimLen);
        setTimeout(() => {
            submit(-1);
            nextString();
            resetCard();
        }, newCardAnimLen * 1000);
        feedbackSnackbar.show({
            message: "Rejected translation",
            timeout: 1000
        });
        nextString();
    }

    function onSkip() {
        applyTransition(0, $("body").height(), 0, newCardAnimLen);
        setTimeout(() => {
            submit(0);
            nextString();
            resetCard();
        }, newCardAnimLen * 1000);
    }

    function fetchStrings() {
		$.getJSON(apiPrefix + "/strings/" + lang, function onGetJSONSuccess(data) {
            strings = data;
            total = strings.length;
            if (string_id == null) {
                nextString();
            }
        })
		.fail(function onGetJSONFail(){
			console.error('onGetJSONFail', arguments);
			if (!testing) {
				alert('Application is unable to fetch translation strings from the server. It will instead enter demo mode and load locally stored test data for testing purposes. Your responses will not be stored in demo mode.\nPlease reload the application to attempt connecting to server again and resume proofreading.');
				testing = true;
				fetchStrings();
			} else {
				throw('Fatal error. Local data unreachable.');
			}
		})
		.always(function onGetJSONAlways(){
			console.info('onGetJSONAlways', arguments);
		});
    }
    
    return init;
})();

$(document).ready(function() {
    setTimeout(Khantribute, 2000);
});
