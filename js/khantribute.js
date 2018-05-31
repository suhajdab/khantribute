/*
	TODO: prohibit rapid submits
	TODO: reset scroll-y after submit
	TODO: feedback on drag indicating outcome (ex: right => green, left => red)
	TODO: Remove snowman from katex rendering
	TODO: Analytics
 */
import $ from "jquery"
import Cookies from "js-cookie"
import Hammer from "hammerjs"
import {MDCDialog} from "@material/dialog"
import {MDCLinearProgress} from "@material/linear-progress"
import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';

var Khantribute = (function() {
    var apiDomain = "https://kagame-sv.localgrid.de",
		testing = false,
        cid = null,
        string_id = null,
        strings = [],
        count = 0,
        total = 0,
        blocked = false, // Ignore events, e.g. when animation is still ongoing
        animationOngoing,
        progressbar,
        hideCheckbox,
        hideForm,
        welcomeDialog,
        $card;
    const newCardAnimLen = 0.5;

    function nextString() {
        if (strings == null || strings.length == 0) {
            string_id = null;
            fetchStrings();
            return;
        }

        displayStrings(strings[0]);
        strings = strings.slice(1);
        console.log(strings.length + " strings left");
    }

    function displayStrings(currentString) {
        var source = transformString(currentString.source);
        var target = transformString(currentString.target);

        $("#source-text").html(source);
        $("#target-text").html(target);
        progressbar.progress = (total - strings.length) / total;
        string_id = currentString.id;
    }

    function transformString(str) {
		// remove 'snowmen' interactive elements
		str = str.replace(/\[\[☃(.*?)\]\]/g, '');
        // match string frgments between $ for katex
        str = str.replace(/\$(.*?)\$/g, generateKatex);
        // replace newline characters
        str = str.replace(/\\n/g, "<br />");
        return str;
    }

    function generateKatex(item) {
        // remove bounding $
        var match = item.replace(/\$/g, '');
        // remove escape backslash
        match = match.replace(/\\\\/g, "\\");
        console.log(match);
        return katex.renderToString(match);
    }

    function init() {
        var progressbarEl = document.getElementById('progressbar');

        $card = $('#container');
        progressbar = MDCLinearProgress.attachTo(progressbarEl);
        hideForm = new MDCFormField(document.getElementById("hide-form"));
        hideCheckbox = new MDCCheckbox(document.getElementById("hide-checkbox"));
        if (Cookies.get('disable-welcome') == undefined) {
			setupWelcomeDialog();
		}

        if (Cookies.get('kaid') === undefined) {
            cid = ("" + Math.random()).slice(2) // long number
            Cookies.set("kaid", cid);
            Cookies.set("count", 0);
        }
        cid = Cookies.get("kaid");
        count = Cookies.get("count");
        // $("#count").text(count);

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
			  Cookies.set('disable-welcome', 1);
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
            } else {
                setTransform(null, null, null, null);
            }
        } else {
            // dragging
            console.log(ev.deltaX);
            setTransform(ev.deltaX, 0);
        }
    }

    function submit(score) {
        // Send result to server
        if (testing) return;
        let json = {
            "client": cid,
            "string": string_id,
            "score": score
        }
        console.log("Submitting", json);
        // $.post(apiDomain + "/api/submit", json, function(data) {
        //     $("#rank").text(data.rank);
        //     count = data.count;
        //     $("#count").text(data.count);
        // })
        // Update count
        count++;
        Cookies.set("count", count);
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
        submit(1);
        nextString();
    }

    function onReject() {
        submit(-1);
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

	function getApiUrl(offset) {
		var local_url = "strings.json?",
		api_url = apiDomain + "/api/strings?offset=",
		offset_override = (new URL(location.href)).searchParams.get("offset_override");
        
		return (testing ? local_url : api_url) + (offset_override ? offset_override : offset);
	}

    function fetchStrings() {
		$.getJSON(getApiUrl(count), function onGetJSONSuccess(data) {
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
