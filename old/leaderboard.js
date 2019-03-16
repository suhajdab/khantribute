! function (e) {
	var t = {};

	function n(r) {
		if (t[r]) return t[r].exports;
		var i = t[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
	}
	n.m = e, n.c = t, n.d = function (e, t, r) {
		n.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: r
		})
	}, n.r = function (e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, n.t = function (e, t) {
		if (1 & t && (e = n(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var r = Object.create(null);
		if (n.r(r), Object.defineProperty(r, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var i in e) n.d(r, i, function (t) {
				return e[t]
			}.bind(null, i));
		return r
	}, n.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return n.d(t, "a", t), t
	}, n.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, n.p = "", n(n.s = 21)
}([function (e, t, n) {
	"use strict";
	t.a = class {
		static get cssClasses() {
			return {}
		}
		static get strings() {
			return {}
		}
		static get numbers() {
			return {}
		}
		static get defaultAdapter() {
			return {}
		}
		constructor(e = {}) {
			this.adapter_ = e
		}
		init() {}
		destroy() {}
	}
}, function (e, t, n) {
	"use strict";
	var r = n(0);
	class i {
		static attachTo(e) {
			return new i(e, new r.a)
		}
		constructor(e, t, ...n) {
			this.root_ = e, this.initialize(...n), this.foundation_ = void 0 === t ? this.getDefaultFoundation() : t, this.foundation_.init(), this.initialSyncWithDOM()
		}
		initialize() {}
		getDefaultFoundation() {
			throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")
		}
		initialSyncWithDOM() {}
		destroy() {
			this.foundation_.destroy()
		}
		listen(e, t) {
			this.root_.addEventListener(e, t)
		}
		unlisten(e, t) {
			this.root_.removeEventListener(e, t)
		}
		emit(e, t, n = !1) {
			let r;
			"function" == typeof CustomEvent ? r = new CustomEvent(e, {
				detail: t,
				bubbles: n
			}) : (r = document.createEvent("CustomEvent")).initCustomEvent(e, n, !1, t), this.root_.dispatchEvent(r)
		}
	}
	t.a = i
}, , , , , , function (e, t, n) {
	"use strict";
	n.r(t);
	var r = n(1);
	let i;
	var o = n(0);
	const s = {
			ROOT: "mdc-menu",
			OPEN: "mdc-menu--open",
			ANIMATING_OPEN: "mdc-menu--animating-open",
			ANIMATING_CLOSED: "mdc-menu--animating-closed",
			SELECTED_LIST_ITEM: "mdc-list-item--selected"
		},
		a = {
			ITEMS_SELECTOR: ".mdc-menu__items",
			SELECTED_EVENT: "MDCMenu:selected",
			CANCEL_EVENT: "MDCMenu:cancel",
			ARIA_DISABLED_ATTR: "aria-disabled"
		},
		u = {
			SELECTED_TRIGGER_DELAY: 50,
			TRANSITION_OPEN_DURATION: 120,
			TRANSITION_CLOSE_DURATION: 75,
			MARGIN_TO_EDGE: 32,
			ANCHOR_TO_MENU_WIDTH_RATIO: .67,
			OFFSET_TO_MENU_HEIGHT_RATIO: .1
		},
		l = {
			BOTTOM: 1,
			CENTER: 2,
			RIGHT: 4,
			FLIP_RTL: 8
		},
		c = {
			TOP_LEFT: 0,
			TOP_RIGHT: l.RIGHT,
			BOTTOM_LEFT: l.BOTTOM,
			BOTTOM_RIGHT: l.BOTTOM | l.RIGHT,
			TOP_START: l.FLIP_RTL,
			TOP_END: l.FLIP_RTL | l.RIGHT,
			BOTTOM_START: l.BOTTOM | l.FLIP_RTL,
			BOTTOM_END: l.BOTTOM | l.RIGHT | l.FLIP_RTL
		};
	class d extends o.a {
		static get cssClasses() {
			return s
		}
		static get strings() {
			return a
		}
		static get numbers() {
			return u
		}
		static get Corner() {
			return c
		}
		static get defaultAdapter() {
			return {
				addClass: () => {},
				removeClass: () => {},
				hasClass: () => !1,
				hasNecessaryDom: () => !1,
				getAttributeForEventTarget: () => {},
				getInnerDimensions: () => ({}),
				hasAnchor: () => !1,
				getAnchorDimensions: () => ({}),
				getWindowDimensions: () => ({}),
				getNumberOfItems: () => 0,
				registerInteractionHandler: () => {},
				deregisterInteractionHandler: () => {},
				registerBodyClickHandler: () => {},
				deregisterBodyClickHandler: () => {},
				getIndexForEventTarget: () => 0,
				notifySelected: () => {},
				notifyCancel: () => {},
				saveFocus: () => {},
				restoreFocus: () => {},
				isFocused: () => !1,
				focus: () => {},
				getFocusedItemIndex: () => -1,
				focusItemAtIndex: () => {},
				isRtl: () => !1,
				setTransformOrigin: () => {},
				setPosition: () => {},
				setMaxHeight: () => {},
				setAttrForOptionAtIndex: () => {},
				rmAttrForOptionAtIndex: () => {},
				addClassForOptionAtIndex: () => {},
				rmClassForOptionAtIndex: () => {}
			}
		}
		constructor(e) {
			super(Object.assign(d.defaultAdapter, e)), this.clickHandler_ = (e => this.handlePossibleSelected_(e)), this.keydownHandler_ = (e => this.handleKeyboardDown_(e)), this.keyupHandler_ = (e => this.handleKeyboardUp_(e)), this.documentClickHandler_ = (e => this.handleDocumentClick_(e)), this.isOpen_ = !1, this.openAnimationEndTimerId_ = 0, this.closeAnimationEndTimerId_ = 0, this.selectedTriggerTimerId_ = 0, this.animationRequestId_ = 0, this.dimensions_, this.itemHeight_, this.anchorCorner_ = c.TOP_START, this.anchorMargin_ = {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}, this.measures_ = null, this.selectedIndex_ = -1, this.rememberSelection_ = !1, this.quickOpen_ = !1, this.keyDownWithinMenu_ = !1
		}
		init() {
			const {
				ROOT: e,
				OPEN: t
			} = d.cssClasses;
			if (!this.adapter_.hasClass(e)) throw new Error(`${e} class required in root element.`);
			if (!this.adapter_.hasNecessaryDom()) throw new Error(`Required DOM nodes missing in ${e} component.`);
			this.adapter_.hasClass(t) && (this.isOpen_ = !0), this.adapter_.registerInteractionHandler("click", this.clickHandler_), this.adapter_.registerInteractionHandler("keyup", this.keyupHandler_), this.adapter_.registerInteractionHandler("keydown", this.keydownHandler_)
		}
		destroy() {
			clearTimeout(this.selectedTriggerTimerId_), clearTimeout(this.openAnimationEndTimerId_), clearTimeout(this.closeAnimationEndTimerId_), cancelAnimationFrame(this.animationRequestId_), this.adapter_.deregisterInteractionHandler("click", this.clickHandler_), this.adapter_.deregisterInteractionHandler("keyup", this.keyupHandler_), this.adapter_.deregisterInteractionHandler("keydown", this.keydownHandler_), this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_)
		}
		setAnchorCorner(e) {
			this.anchorCorner_ = e
		}
		setAnchorMargin(e) {
			this.anchorMargin_.top = "number" == typeof e.top ? e.top : 0, this.anchorMargin_.right = "number" == typeof e.right ? e.right : 0, this.anchorMargin_.bottom = "number" == typeof e.bottom ? e.bottom : 0, this.anchorMargin_.left = "number" == typeof e.left ? e.left : 0
		}
		setRememberSelection(e) {
			this.rememberSelection_ = e, this.setSelectedIndex(-1)
		}
		setQuickOpen(e) {
			this.quickOpen_ = e
		}
		focusOnOpen_(e) {
			if (null === e) {
				if (this.rememberSelection_ && this.selectedIndex_ >= 0) return void this.adapter_.focusItemAtIndex(this.selectedIndex_);
				this.adapter_.focus(), this.adapter_.isFocused() || this.adapter_.focusItemAtIndex(0)
			}
			else this.adapter_.focusItemAtIndex(e)
		}
		handleDocumentClick_(e) {
			let t = e.target;
			for (; t && t !== document.documentElement;) {
				if (-1 !== this.adapter_.getIndexForEventTarget(t)) return;
				t = t.parentNode
			}
			this.adapter_.notifyCancel(), this.close(e)
		}
		handleKeyboardDown_(e) {
			if (e.altKey || e.ctrlKey || e.metaKey) return !0;
			const {
				keyCode: t,
				key: n,
				shiftKey: r
			} = e, i = "Tab" === n || 9 === t, o = "ArrowUp" === n || 38 === t, s = "ArrowDown" === n || 40 === t, a = "Space" === n || 32 === t, u = "Enter" === n || 13 === t;
			this.keyDownWithinMenu_ = u || a;
			const l = this.adapter_.getFocusedItemIndex(),
				c = this.adapter_.getNumberOfItems() - 1;
			return r && i && 0 === l ? (this.adapter_.focusItemAtIndex(c), e.preventDefault(), !1) : !r && i && l === c ? (this.adapter_.focusItemAtIndex(0), e.preventDefault(), !1) : ((o || s || a) && e.preventDefault(), o ? 0 === l || this.adapter_.isFocused() ? this.adapter_.focusItemAtIndex(c) : this.adapter_.focusItemAtIndex(l - 1) : s && (l === c || this.adapter_.isFocused() ? this.adapter_.focusItemAtIndex(0) : this.adapter_.focusItemAtIndex(l + 1)), !0)
		}
		handleKeyboardUp_(e) {
			if (e.altKey || e.ctrlKey || e.metaKey) return !0;
			const {
				keyCode: t,
				key: n
			} = e, r = "Escape" === n || 27 === t;
			return ("Enter" === n || 13 === t || ("Space" === n || 32 === t)) && (this.keyDownWithinMenu_ && this.handlePossibleSelected_(e), this.keyDownWithinMenu_ = !1), r && (this.adapter_.notifyCancel(), this.close()), !0
		}
		handlePossibleSelected_(e) {
			if ("true" === this.adapter_.getAttributeForEventTarget(e.target, a.ARIA_DISABLED_ATTR)) return;
			const t = this.adapter_.getIndexForEventTarget(e.target);
			t < 0 || this.selectedTriggerTimerId_ || (this.selectedTriggerTimerId_ = setTimeout(() => {
				this.selectedTriggerTimerId_ = 0, this.close(), this.rememberSelection_ && this.setSelectedIndex(t), this.adapter_.notifySelected({
					index: t
				})
			}, u.SELECTED_TRIGGER_DELAY))
		}
		getAutoLayoutMeasurements_() {
			const e = this.adapter_.getAnchorDimensions(),
				t = this.adapter_.getWindowDimensions();
			return {
				viewport: t,
				viewportDistance: {
					top: e.top,
					right: t.width - e.right,
					left: e.left,
					bottom: t.height - e.bottom
				},
				anchorHeight: e.height,
				anchorWidth: e.width,
				menuHeight: this.dimensions_.height,
				menuWidth: this.dimensions_.width
			}
		}
		getOriginCorner_() {
			let e = c.TOP_LEFT;
			const {
				viewportDistance: t,
				anchorHeight: n,
				anchorWidth: r,
				menuHeight: i,
				menuWidth: o
			} = this.measures_, s = Boolean(this.anchorCorner_ & l.BOTTOM), a = s ? t.top + n + this.anchorMargin_.bottom : t.top + this.anchorMargin_.top, u = i - (s ? t.bottom - this.anchorMargin_.bottom : t.bottom + n - this.anchorMargin_.top);
			u > 0 && i - a < u && (e |= l.BOTTOM);
			const d = this.adapter_.isRtl(),
				f = Boolean(this.anchorCorner_ & l.FLIP_RTL),
				p = Boolean(this.anchorCorner_ & l.RIGHT),
				h = p && !d || !p && f && d,
				m = o - (h ? t.left + r + this.anchorMargin_.right : t.left + this.anchorMargin_.left),
				g = o - (h ? t.right - this.anchorMargin_.right : t.right + r - this.anchorMargin_.left);
			return (m < 0 && h && d || p && !h && m < 0 || g > 0 && m < g) && (e |= l.RIGHT), e
		}
		getHorizontalOriginOffset_(e) {
			const {
				anchorWidth: t
			} = this.measures_, n = Boolean(e & l.RIGHT), r = Boolean(this.anchorCorner_ & l.RIGHT);
			let i = 0;
			if (n) {
				i = r ? t - this.anchorMargin_.left : this.anchorMargin_.right
			}
			else {
				i = r ? t - this.anchorMargin_.right : this.anchorMargin_.left
			}
			return i
		}
		getVerticalOriginOffset_(e) {
			const {
				viewport: t,
				viewportDistance: n,
				anchorHeight: r,
				menuHeight: i
			} = this.measures_, o = Boolean(e & l.BOTTOM), {
				MARGIN_TO_EDGE: s
			} = d.numbers, a = Boolean(this.anchorCorner_ & l.BOTTOM), u = !a;
			let c = 0;
			return o ? (c = a ? r - this.anchorMargin_.top : -this.anchorMargin_.bottom, u && i > n.top + r && (c = -(Math.min(i, t.height - s) - (n.top + r)))) : (c = a ? r + this.anchorMargin_.bottom : this.anchorMargin_.top, u && i > n.bottom + r && (c = -(Math.min(i, t.height - s) - (n.bottom + r)))), c
		}
		getMenuMaxHeight_(e) {
			let t = 0;
			const {
				viewportDistance: n
			} = this.measures_, r = Boolean(e & l.BOTTOM);
			return this.anchorCorner_ & l.BOTTOM && (t = r ? n.top + this.anchorMargin_.top : n.bottom - this.anchorMargin_.bottom), t
		}
		autoPosition_() {
			if (!this.adapter_.hasAnchor()) return;
			this.measures_ = this.getAutoLayoutMeasurements_();
			const e = this.getOriginCorner_(),
				t = this.getMenuMaxHeight_(e);
			let n = e & l.BOTTOM ? "bottom" : "top",
				r = e & l.RIGHT ? "right" : "left";
			const i = this.getHorizontalOriginOffset_(e),
				o = this.getVerticalOriginOffset_(e),
				s = {
					[r]: i ? i + "px" : "0",
					[n]: o ? o + "px" : "0"
				},
				{
					anchorWidth: a,
					menuHeight: c,
					menuWidth: d
				} = this.measures_;
			if (a / d > u.ANCHOR_TO_MENU_WIDTH_RATIO && (r = "center"), !(this.anchorCorner_ & l.BOTTOM) && Math.abs(o / c) > u.OFFSET_TO_MENU_HEIGHT_RATIO) {
				const t = 100 * Math.abs(o / c),
					r = e & l.BOTTOM ? 100 - t : t;
				n = Math.round(100 * r) / 100 + "%"
			}
			this.adapter_.setTransformOrigin(`${r} ${n}`), this.adapter_.setPosition(s), this.adapter_.setMaxHeight(t ? t + "px" : ""), this.measures_ = null
		}
		open({
			focusIndex: e = null
		} = {}) {
			this.adapter_.saveFocus(), this.quickOpen_ || this.adapter_.addClass(d.cssClasses.ANIMATING_OPEN), this.animationRequestId_ = requestAnimationFrame(() => {
				this.dimensions_ = this.adapter_.getInnerDimensions(), this.autoPosition_(), this.adapter_.addClass(d.cssClasses.OPEN), this.focusOnOpen_(e), this.adapter_.registerBodyClickHandler(this.documentClickHandler_), this.quickOpen_ || (this.openAnimationEndTimerId_ = setTimeout(() => {
					this.openAnimationEndTimerId_ = 0, this.adapter_.removeClass(d.cssClasses.ANIMATING_OPEN)
				}, u.TRANSITION_OPEN_DURATION))
			}), this.isOpen_ = !0
		}
		close(e = null) {
			!!e && "true" === this.adapter_.getAttributeForEventTarget(e.target, a.ARIA_DISABLED_ATTR) || (this.adapter_.deregisterBodyClickHandler(this.documentClickHandler_), this.quickOpen_ || this.adapter_.addClass(d.cssClasses.ANIMATING_CLOSED), requestAnimationFrame(() => {
				this.adapter_.removeClass(d.cssClasses.OPEN), this.quickOpen_ || (this.closeAnimationEndTimerId_ = setTimeout(() => {
					this.closeAnimationEndTimerId_ = 0, this.adapter_.removeClass(d.cssClasses.ANIMATING_CLOSED)
				}, u.TRANSITION_CLOSE_DURATION))
			}), this.isOpen_ = !1, this.adapter_.restoreFocus())
		}
		isOpen() {
			return this.isOpen_
		}
		getSelectedIndex() {
			return this.selectedIndex_
		}
		setSelectedIndex(e) {
			if (e === this.selectedIndex_) return;
			const t = this.selectedIndex_;
			t >= 0 && (this.adapter_.rmAttrForOptionAtIndex(t, "aria-selected"), this.adapter_.rmClassForOptionAtIndex(t, s.SELECTED_LIST_ITEM)), this.selectedIndex_ = e >= 0 && e < this.adapter_.getNumberOfItems() ? e : -1, this.selectedIndex_ >= 0 && (this.adapter_.setAttrForOptionAtIndex(this.selectedIndex_, "aria-selected", "true"), this.adapter_.addClassForOptionAtIndex(this.selectedIndex_, s.SELECTED_LIST_ITEM))
		}
	}
	n.d(t, "MDCMenu", function () {
		return f
	}), n.d(t, "MDCMenuFoundation", function () {
		return d
	}), n.d(t, "AnchorMargin", function () {}), n.d(t, "Corner", function () {
		return c
	}), n.d(t, "CornerBit", function () {
		return l
	});
	class f extends r.a {
		constructor(...e) {
			super(...e), this.previousFocus_
		}
		static attachTo(e) {
			return new f(e)
		}
		get open() {
			return this.foundation_.isOpen()
		}
		set open(e) {
			e ? this.foundation_.open() : this.foundation_.close()
		}
		show({
			focusIndex: e = null
		} = {}) {
			this.foundation_.open({
				focusIndex: e
			})
		}
		hide() {
			this.foundation_.close()
		}
		setAnchorCorner(e) {
			this.foundation_.setAnchorCorner(e)
		}
		setAnchorMargin(e) {
			this.foundation_.setAnchorMargin(e)
		}
		get itemsContainer_() {
			return this.root_.querySelector(d.strings.ITEMS_SELECTOR)
		}
		get items() {
			const {
				itemsContainer_: e
			} = this;
			return [].slice.call(e.querySelectorAll(".mdc-list-item[role]"))
		}
		getOptionByIndex(e) {
			return e < this.items.length ? this.items[e] : null
		}
		set selectedItemIndex(e) {
			this.foundation_.setSelectedIndex(e)
		}
		get selectedItemIndex() {
			return this.foundation_.getSelectedIndex()
		}
		set rememberSelection(e) {
			this.foundation_.setRememberSelection(e)
		}
		set quickOpen(e) {
			this.foundation_.setQuickOpen(e)
		}
		getDefaultFoundation() {
			return new d({
				addClass: e => this.root_.classList.add(e),
				removeClass: e => this.root_.classList.remove(e),
				hasClass: e => this.root_.classList.contains(e),
				hasNecessaryDom: () => Boolean(this.itemsContainer_),
				getAttributeForEventTarget: (e, t) => e.getAttribute(t),
				getInnerDimensions: () => {
					const {
						itemsContainer_: e
					} = this;
					return {
						width: e.offsetWidth,
						height: e.offsetHeight
					}
				},
				hasAnchor: () => this.root_.parentElement && this.root_.parentElement.classList.contains("mdc-menu-anchor"),
				getAnchorDimensions: () => this.root_.parentElement.getBoundingClientRect(),
				getWindowDimensions: () => ({
					width: window.innerWidth,
					height: window.innerHeight
				}),
				getNumberOfItems: () => this.items.length,
				registerInteractionHandler: (e, t) => this.root_.addEventListener(e, t),
				deregisterInteractionHandler: (e, t) => this.root_.removeEventListener(e, t),
				registerBodyClickHandler: e => document.body.addEventListener("click", e),
				deregisterBodyClickHandler: e => document.body.removeEventListener("click", e),
				getIndexForEventTarget: e => this.items.indexOf(e),
				notifySelected: e => this.emit(d.strings.SELECTED_EVENT, {
					index: e.index,
					item: this.items[e.index]
				}),
				notifyCancel: () => this.emit(d.strings.CANCEL_EVENT, {}),
				saveFocus: () => {
					this.previousFocus_ = document.activeElement
				},
				restoreFocus: () => {
					this.previousFocus_ && this.previousFocus_.focus && this.previousFocus_.focus()
				},
				isFocused: () => document.activeElement === this.root_,
				focus: () => this.root_.focus(),
				getFocusedItemIndex: () => this.items.indexOf(document.activeElement),
				focusItemAtIndex: e => this.items[e].focus(),
				isRtl: () => "rtl" === getComputedStyle(this.root_).getPropertyValue("direction"),
				setTransformOrigin: e => {
					this.root_.style[`${function(e,t=!1){if(void 0===i||t){const t="transform"in e.document.createElement("div").style?"transform":"webkitTransform";i=t}return i}(window)}-origin`] = e
				},
				setPosition: e => {
					this.root_.style.left = "left" in e ? e.left : null, this.root_.style.right = "right" in e ? e.right : null, this.root_.style.top = "top" in e ? e.top : null, this.root_.style.bottom = "bottom" in e ? e.bottom : null
				},
				setMaxHeight: e => {
					this.root_.style.maxHeight = e
				},
				setAttrForOptionAtIndex: (e, t, n) => this.items[e].setAttribute(t, n),
				rmAttrForOptionAtIndex: (e, t) => this.items[e].removeAttribute(t),
				addClassForOptionAtIndex: (e, t) => this.items[e].classList.add(t),
				rmClassForOptionAtIndex: (e, t) => this.items[e].classList.remove(t)
			})
		}
	}
}, function (e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	}), t.default = function () {
		var e = window.location.hostname.match("([^.]+).khantribute.localgrid.de");
		if (null === e) return "sv-SE";
		var t = e[1];
		return t.length <= 2 ? t : t.slice(0, 2) + "-" + t.slice(2).toUpperCase()
	}
}, function (e, t, n) {
	"use strict";
	Object.defineProperty(t, "__esModule", {
		value: !0
	});
	var r = ["Happy", "Sad", "Smart", "Tired", "Green", "Purple", "Small", "Large", "Real", "Weird"],
		i = ["Aardvark", "Buffalo", "Chair", "Dog", "Eagle", "Fountain", "Goat", "Human", "Igloo", "Juniper"];
	t.default = function () {
		return r[Math.floor(Math.random() * r.length)] + i[Math.floor(Math.random() * i.length)]
	}
}, function (e) {
	e.exports = {
		apiPrefix: "https://katc.localgrid.de/apiv3/khantribute"
	}
}, function (e) {
	e.exports = [{
		bld: "sv-SE",
		name: "Swedish"
	}, {
		bld: "es",
		name: "Spanish"
	}, {
		bld: "pt",
		name: "Portuguese (Brazilian)"
	}, {
		bld: "pt-pt",
		name: "Portuguese (European)"
	}, {
		bld: "fr",
		name: "French"
	}, {
		bld: "tr",
		name: "Turkish"
	}, {
		bld: "nb",
		name: "Norwegian Bokmål"
	}, {
		bld: "hi",
		name: "Hindi"
	}, {
		bld: "id",
		name: "Indonesian"
	}, {
		bld: "cs",
		name: "Czech"
	}, {
		bld: "da",
		name: "Danish"
	}, {
		bld: "de",
		name: "German"
	}, {
		bld: "it",
		name: "Italian"
	}, {
		bld: "nl",
		name: "Dutch"
	}, {
		bld: "pl",
		name: "Polish"
	}, {
		bld: "el",
		name: "Greek"
	}, {
		bld: "bg",
		name: "Bulgarian"
	}, {
		bld: "mn",
		name: "Mongolian"
	}, {
		bld: "ru",
		name: "Russian"
	}, {
		bld: "sr",
		name: "Serbian"
	}, {
		bld: "hy",
		name: "Armenian"
	}, {
		bld: "ur",
		name: "Urdu"
	}, {
		bld: "ar",
		name: "Arabic"
	}, {
		bld: "bn",
		name: "Bengali"
	}, {
		bld: "th",
		name: "Thai"
	}, {
		bld: "zh-hans",
		name: "Simplified Chinese"
	}, {
		bld: "ja",
		name: "Japanese"
	}, {
		bld: "ko",
		name: "Korean"
	}, {
		bld: "ka",
		name: "Georgian"
	}]
}, function (e, t, n) {
	var r;
	! function (t, n) {
		"use strict";
		"object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function (e) {
			if (!e.document) throw new Error("jQuery requires a window with a document");
			return n(e)
		} : n(t)
	}("undefined" != typeof window ? window : this, function (n, i) {
		"use strict";
		var o = [],
			s = n.document,
			a = Object.getPrototypeOf,
			u = o.slice,
			l = o.concat,
			c = o.push,
			d = o.indexOf,
			f = {},
			p = f.toString,
			h = f.hasOwnProperty,
			m = h.toString,
			g = m.call(Object),
			v = {},
			y = function (e) {
				return "function" == typeof e && "number" != typeof e.nodeType
			},
			x = function (e) {
				return null != e && e === e.window
			},
			b = {
				type: !0,
				src: !0,
				noModule: !0
			};

		function T(e, t, n) {
			var r, i = (t = t || s).createElement("script");
			if (i.text = e, n)
				for (r in b) n[r] && (i[r] = n[r]);
			t.head.appendChild(i).parentNode.removeChild(i)
		}

		function _(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? f[p.call(e)] || "object" : typeof e
		}
		var w = function (e, t) {
				return new w.fn.init(e, t)
			},
			C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

		function E(e) {
			var t = !!e && "length" in e && e.length,
				n = _(e);
			return !y(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
		}
		w.fn = w.prototype = {
			jquery: "3.3.1",
			constructor: w,
			length: 0,
			toArray: function () {
				return u.call(this)
			},
			get: function (e) {
				return null == e ? u.call(this) : e < 0 ? this[e + this.length] : this[e]
			},
			pushStack: function (e) {
				var t = w.merge(this.constructor(), e);
				return t.prevObject = this, t
			},
			each: function (e) {
				return w.each(this, e)
			},
			map: function (e) {
				return this.pushStack(w.map(this, function (t, n) {
					return e.call(t, n, t)
				}))
			},
			slice: function () {
				return this.pushStack(u.apply(this, arguments))
			},
			first: function () {
				return this.eq(0)
			},
			last: function () {
				return this.eq(-1)
			},
			eq: function (e) {
				var t = this.length,
					n = +e + (e < 0 ? t : 0);
				return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
			},
			end: function () {
				return this.prevObject || this.constructor()
			},
			push: c,
			sort: o.sort,
			splice: o.splice
		}, w.extend = w.fn.extend = function () {
			var e, t, n, r, i, o, s = arguments[0] || {},
				a = 1,
				u = arguments.length,
				l = !1;
			for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || y(s) || (s = {}), a === u && (s = this, a--); a < u; a++)
				if (null != (e = arguments[a]))
					for (t in e) n = s[t], s !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, s[t] = w.extend(l, o, r)) : void 0 !== r && (s[t] = r));
			return s
		}, w.extend({
			expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function (e) {
				throw new Error(e)
			},
			noop: function () {},
			isPlainObject: function (e) {
				var t, n;
				return !(!e || "[object Object]" !== p.call(e)) && (!(t = a(e)) || "function" == typeof (n = h.call(t, "constructor") && t.constructor) && m.call(n) === g)
			},
			isEmptyObject: function (e) {
				var t;
				for (t in e) return !1;
				return !0
			},
			globalEval: function (e) {
				T(e)
			},
			each: function (e, t) {
				var n, r = 0;
				if (E(e))
					for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
				else
					for (r in e)
						if (!1 === t.call(e[r], r, e[r])) break;
				return e
			},
			trim: function (e) {
				return null == e ? "" : (e + "").replace(C, "")
			},
			makeArray: function (e, t) {
				var n = t || [];
				return null != e && (E(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : c.call(n, e)), n
			},
			inArray: function (e, t, n) {
				return null == t ? -1 : d.call(t, e, n)
			},
			merge: function (e, t) {
				for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
				return e.length = i, e
			},
			grep: function (e, t, n) {
				for (var r = [], i = 0, o = e.length, s = !n; i < o; i++) !t(e[i], i) !== s && r.push(e[i]);
				return r
			},
			map: function (e, t, n) {
				var r, i, o = 0,
					s = [];
				if (E(e))
					for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && s.push(i);
				else
					for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
				return l.apply([], s)
			},
			guid: 1,
			support: v
		}), "function" == typeof Symbol && (w.fn[Symbol.iterator] = o[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
			f["[object " + t + "]"] = t.toLowerCase()
		});
		var A = function (e) {
			var t, n, r, i, o, s, a, u, l, c, d, f, p, h, m, g, v, y, x, b = "sizzle" + 1 * new Date,
				T = e.document,
				_ = 0,
				w = 0,
				C = se(),
				E = se(),
				A = se(),
				k = function (e, t) {
					return e === t && (d = !0), 0
				},
				S = {}.hasOwnProperty,
				I = [],
				O = I.pop,
				D = I.push,
				N = I.push,
				M = I.slice,
				H = function (e, t) {
					for (var n = 0, r = e.length; n < r; n++)
						if (e[n] === t) return n;
					return -1
				},
				L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				j = "[\\x20\\t\\r\\n\\f]",
				R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
				q = "\\[" + j + "*(" + R + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + j + "*\\]",
				P = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)",
				F = new RegExp(j + "+", "g"),
				B = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
				W = new RegExp("^" + j + "*," + j + "*"),
				$ = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
				G = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"),
				U = new RegExp(P),
				z = new RegExp("^" + R + "$"),
				X = {
					ID: new RegExp("^#(" + R + ")"),
					CLASS: new RegExp("^\\.(" + R + ")"),
					TAG: new RegExp("^(" + R + "|[*])"),
					ATTR: new RegExp("^" + q),
					PSEUDO: new RegExp("^" + P),
					CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
					bool: new RegExp("^(?:" + L + ")$", "i"),
					needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
				},
				V = /^(?:input|select|textarea|button)$/i,
				K = /^h\d$/i,
				Y = /^[^{]+\{\s*\[native \w/,
				J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				Q = /[+~]/,
				Z = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"),
				ee = function (e, t, n) {
					var r = "0x" + t - 65536;
					return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
				},
				te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
				ne = function (e, t) {
					return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
				},
				re = function () {
					f()
				},
				ie = ye(function (e) {
					return !0 === e.disabled && ("form" in e || "label" in e)
				}, {
					dir: "parentNode",
					next: "legend"
				});
			try {
				N.apply(I = M.call(T.childNodes), T.childNodes), I[T.childNodes.length].nodeType
			}
			catch (e) {
				N = {
					apply: I.length ? function (e, t) {
						D.apply(e, M.call(t))
					} : function (e, t) {
						for (var n = e.length, r = 0; e[n++] = t[r++];);
						e.length = n - 1
					}
				}
			}

			function oe(e, t, r, i) {
				var o, a, l, c, d, h, v, y = t && t.ownerDocument,
					_ = t ? t.nodeType : 9;
				if (r = r || [], "string" != typeof e || !e || 1 !== _ && 9 !== _ && 11 !== _) return r;
				if (!i && ((t ? t.ownerDocument || t : T) !== p && f(t), t = t || p, m)) {
					if (11 !== _ && (d = J.exec(e)))
						if (o = d[1]) {
							if (9 === _) {
								if (!(l = t.getElementById(o))) return r;
								if (l.id === o) return r.push(l), r
							}
							else if (y && (l = y.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r
						}
					else {
						if (d[2]) return N.apply(r, t.getElementsByTagName(e)), r;
						if ((o = d[3]) && n.getElementsByClassName && t.getElementsByClassName) return N.apply(r, t.getElementsByClassName(o)), r
					}
					if (n.qsa && !A[e + " "] && (!g || !g.test(e))) {
						if (1 !== _) y = t, v = e;
						else if ("object" !== t.nodeName.toLowerCase()) {
							for ((c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), a = (h = s(e)).length; a--;) h[a] = "#" + c + " " + ve(h[a]);
							v = h.join(","), y = Q.test(e) && me(t.parentNode) || t
						}
						if (v) try {
							return N.apply(r, y.querySelectorAll(v)), r
						}
						catch (e) {}
						finally {
							c === b && t.removeAttribute("id")
						}
					}
				}
				return u(e.replace(B, "$1"), t, r, i)
			}

			function se() {
				var e = [];
				return function t(n, i) {
					return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
				}
			}

			function ae(e) {
				return e[b] = !0, e
			}

			function ue(e) {
				var t = p.createElement("fieldset");
				try {
					return !!e(t)
				}
				catch (e) {
					return !1
				}
				finally {
					t.parentNode && t.parentNode.removeChild(t), t = null
				}
			}

			function le(e, t) {
				for (var n = e.split("|"), i = n.length; i--;) r.attrHandle[n[i]] = t
			}

			function ce(e, t) {
				var n = t && e,
					r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
				if (r) return r;
				if (n)
					for (; n = n.nextSibling;)
						if (n === t) return -1;
				return e ? 1 : -1
			}

			function de(e) {
				return function (t) {
					return "input" === t.nodeName.toLowerCase() && t.type === e
				}
			}

			function fe(e) {
				return function (t) {
					var n = t.nodeName.toLowerCase();
					return ("input" === n || "button" === n) && t.type === e
				}
			}

			function pe(e) {
				return function (t) {
					return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e
				}
			}

			function he(e) {
				return ae(function (t) {
					return t = +t, ae(function (n, r) {
						for (var i, o = e([], n.length, t), s = o.length; s--;) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
					})
				})
			}

			function me(e) {
				return e && void 0 !== e.getElementsByTagName && e
			}
			for (t in n = oe.support = {}, o = oe.isXML = function (e) {
					var t = e && (e.ownerDocument || e).documentElement;
					return !!t && "HTML" !== t.nodeName
				}, f = oe.setDocument = function (e) {
					var t, i, s = e ? e.ownerDocument || e : T;
					return s !== p && 9 === s.nodeType && s.documentElement ? (h = (p = s).documentElement, m = !o(p), T !== p && (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function (e) {
						return e.className = "i", !e.getAttribute("className")
					}), n.getElementsByTagName = ue(function (e) {
						return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
					}), n.getElementsByClassName = Y.test(p.getElementsByClassName), n.getById = ue(function (e) {
						return h.appendChild(e).id = b, !p.getElementsByName || !p.getElementsByName(b).length
					}), n.getById ? (r.filter.ID = function (e) {
						var t = e.replace(Z, ee);
						return function (e) {
							return e.getAttribute("id") === t
						}
					}, r.find.ID = function (e, t) {
						if (void 0 !== t.getElementById && m) {
							var n = t.getElementById(e);
							return n ? [n] : []
						}
					}) : (r.filter.ID = function (e) {
						var t = e.replace(Z, ee);
						return function (e) {
							var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
							return n && n.value === t
						}
					}, r.find.ID = function (e, t) {
						if (void 0 !== t.getElementById && m) {
							var n, r, i, o = t.getElementById(e);
							if (o) {
								if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
								for (i = t.getElementsByName(e), r = 0; o = i[r++];)
									if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
							}
							return []
						}
					}), r.find.TAG = n.getElementsByTagName ? function (e, t) {
						return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
					} : function (e, t) {
						var n, r = [],
							i = 0,
							o = t.getElementsByTagName(e);
						if ("*" === e) {
							for (; n = o[i++];) 1 === n.nodeType && r.push(n);
							return r
						}
						return o
					}, r.find.CLASS = n.getElementsByClassName && function (e, t) {
						if (void 0 !== t.getElementsByClassName && m) return t.getElementsByClassName(e)
					}, v = [], g = [], (n.qsa = Y.test(p.querySelectorAll)) && (ue(function (e) {
						h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || g.push("\\[" + j + "*(?:value|" + L + ")"), e.querySelectorAll("[id~=" + b + "-]").length || g.push("~="), e.querySelectorAll(":checked").length || g.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || g.push(".#.+[+~]")
					}), ue(function (e) {
						e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
						var t = p.createElement("input");
						t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + j + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
					})), (n.matchesSelector = Y.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function (e) {
						n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), v.push("!=", P)
					}), g = g.length && new RegExp(g.join("|")), v = v.length && new RegExp(v.join("|")), t = Y.test(h.compareDocumentPosition), x = t || Y.test(h.contains) ? function (e, t) {
						var n = 9 === e.nodeType ? e.documentElement : e,
							r = t && t.parentNode;
						return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
					} : function (e, t) {
						if (t)
							for (; t = t.parentNode;)
								if (t === e) return !0;
						return !1
					}, k = t ? function (e, t) {
						if (e === t) return d = !0, 0;
						var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
						return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === p || e.ownerDocument === T && x(T, e) ? -1 : t === p || t.ownerDocument === T && x(T, t) ? 1 : c ? H(c, e) - H(c, t) : 0 : 4 & r ? -1 : 1)
					} : function (e, t) {
						if (e === t) return d = !0, 0;
						var n, r = 0,
							i = e.parentNode,
							o = t.parentNode,
							s = [e],
							a = [t];
						if (!i || !o) return e === p ? -1 : t === p ? 1 : i ? -1 : o ? 1 : c ? H(c, e) - H(c, t) : 0;
						if (i === o) return ce(e, t);
						for (n = e; n = n.parentNode;) s.unshift(n);
						for (n = t; n = n.parentNode;) a.unshift(n);
						for (; s[r] === a[r];) r++;
						return r ? ce(s[r], a[r]) : s[r] === T ? -1 : a[r] === T ? 1 : 0
					}, p) : p
				}, oe.matches = function (e, t) {
					return oe(e, null, null, t)
				}, oe.matchesSelector = function (e, t) {
					if ((e.ownerDocument || e) !== p && f(e), t = t.replace(G, "='$1']"), n.matchesSelector && m && !A[t + " "] && (!v || !v.test(t)) && (!g || !g.test(t))) try {
						var r = y.call(e, t);
						if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
					}
					catch (e) {}
					return oe(t, p, null, [e]).length > 0
				}, oe.contains = function (e, t) {
					return (e.ownerDocument || e) !== p && f(e), x(e, t)
				}, oe.attr = function (e, t) {
					(e.ownerDocument || e) !== p && f(e);
					var i = r.attrHandle[t.toLowerCase()],
						o = i && S.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !m) : void 0;
					return void 0 !== o ? o : n.attributes || !m ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
				}, oe.escape = function (e) {
					return (e + "").replace(te, ne)
				}, oe.error = function (e) {
					throw new Error("Syntax error, unrecognized expression: " + e)
				}, oe.uniqueSort = function (e) {
					var t, r = [],
						i = 0,
						o = 0;
					if (d = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(k), d) {
						for (; t = e[o++];) t === e[o] && (i = r.push(o));
						for (; i--;) e.splice(r[i], 1)
					}
					return c = null, e
				}, i = oe.getText = function (e) {
					var t, n = "",
						r = 0,
						o = e.nodeType;
					if (o) {
						if (1 === o || 9 === o || 11 === o) {
							if ("string" == typeof e.textContent) return e.textContent;
							for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
						}
						else if (3 === o || 4 === o) return e.nodeValue
					}
					else
						for (; t = e[r++];) n += i(t);
					return n
				}, (r = oe.selectors = {
					cacheLength: 50,
					createPseudo: ae,
					match: X,
					attrHandle: {},
					find: {},
					relative: {
						">": {
							dir: "parentNode",
							first: !0
						},
						" ": {
							dir: "parentNode"
						},
						"+": {
							dir: "previousSibling",
							first: !0
						},
						"~": {
							dir: "previousSibling"
						}
					},
					preFilter: {
						ATTR: function (e) {
							return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
						},
						CHILD: function (e) {
							return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
						},
						PSEUDO: function (e) {
							var t, n = !e[6] && e[2];
							return X.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = s(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
						}
					},
					filter: {
						TAG: function (e) {
							var t = e.replace(Z, ee).toLowerCase();
							return "*" === e ? function () {
								return !0
							} : function (e) {
								return e.nodeName && e.nodeName.toLowerCase() === t
							}
						},
						CLASS: function (e) {
							var t = C[e + " "];
							return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && C(e, function (e) {
								return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
							})
						},
						ATTR: function (e, t, n) {
							return function (r) {
								var i = oe.attr(r, e);
								return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(F, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"))
							}
						},
						CHILD: function (e, t, n, r, i) {
							var o = "nth" !== e.slice(0, 3),
								s = "last" !== e.slice(-4),
								a = "of-type" === t;
							return 1 === r && 0 === i ? function (e) {
								return !!e.parentNode
							} : function (t, n, u) {
								var l, c, d, f, p, h, m = o !== s ? "nextSibling" : "previousSibling",
									g = t.parentNode,
									v = a && t.nodeName.toLowerCase(),
									y = !u && !a,
									x = !1;
								if (g) {
									if (o) {
										for (; m;) {
											for (f = t; f = f[m];)
												if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
											h = m = "only" === e && !h && "nextSibling"
										}
										return !0
									}
									if (h = [s ? g.firstChild : g.lastChild], s && y) {
										for (x = (p = (l = (c = (d = (f = g)[b] || (f[b] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === _ && l[1]) && l[2], f = p && g.childNodes[p]; f = ++p && f && f[m] || (x = p = 0) || h.pop();)
											if (1 === f.nodeType && ++x && f === t) {
												c[e] = [_, p, x];
												break
											}
									}
									else if (y && (x = p = (l = (c = (d = (f = t)[b] || (f[b] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === _ && l[1]), !1 === x)
										for (;
											(f = ++p && f && f[m] || (x = p = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++x || (y && ((c = (d = f[b] || (f[b] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] = [_, x]), f !== t)););
									return (x -= i) === r || x % r == 0 && x / r >= 0
								}
							}
						},
						PSEUDO: function (e, t) {
							var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
							return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ae(function (e, n) {
								for (var r, o = i(e, t), s = o.length; s--;) e[r = H(e, o[s])] = !(n[r] = o[s])
							}) : function (e) {
								return i(e, 0, n)
							}) : i
						}
					},
					pseudos: {
						not: ae(function (e) {
							var t = [],
								n = [],
								r = a(e.replace(B, "$1"));
							return r[b] ? ae(function (e, t, n, i) {
								for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
							}) : function (e, i, o) {
								return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
							}
						}),
						has: ae(function (e) {
							return function (t) {
								return oe(e, t).length > 0
							}
						}),
						contains: ae(function (e) {
							return e = e.replace(Z, ee),
								function (t) {
									return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
								}
						}),
						lang: ae(function (e) {
							return z.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(),
								function (t) {
									var n;
									do {
										if (n = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
									} while ((t = t.parentNode) && 1 === t.nodeType);
									return !1
								}
						}),
						target: function (t) {
							var n = e.location && e.location.hash;
							return n && n.slice(1) === t.id
						},
						root: function (e) {
							return e === h
						},
						focus: function (e) {
							return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
						},
						enabled: pe(!1),
						disabled: pe(!0),
						checked: function (e) {
							var t = e.nodeName.toLowerCase();
							return "input" === t && !!e.checked || "option" === t && !!e.selected
						},
						selected: function (e) {
							return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
						},
						empty: function (e) {
							for (e = e.firstChild; e; e = e.nextSibling)
								if (e.nodeType < 6) return !1;
							return !0
						},
						parent: function (e) {
							return !r.pseudos.empty(e)
						},
						header: function (e) {
							return K.test(e.nodeName)
						},
						input: function (e) {
							return V.test(e.nodeName)
						},
						button: function (e) {
							var t = e.nodeName.toLowerCase();
							return "input" === t && "button" === e.type || "button" === t
						},
						text: function (e) {
							var t;
							return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
						},
						first: he(function () {
							return [0]
						}),
						last: he(function (e, t) {
							return [t - 1]
						}),
						eq: he(function (e, t, n) {
							return [n < 0 ? n + t : n]
						}),
						even: he(function (e, t) {
							for (var n = 0; n < t; n += 2) e.push(n);
							return e
						}),
						odd: he(function (e, t) {
							for (var n = 1; n < t; n += 2) e.push(n);
							return e
						}),
						lt: he(function (e, t, n) {
							for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
							return e
						}),
						gt: he(function (e, t, n) {
							for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
							return e
						})
					}
				}).pseudos.nth = r.pseudos.eq, {
					radio: !0,
					checkbox: !0,
					file: !0,
					password: !0,
					image: !0
				}) r.pseudos[t] = de(t);
			for (t in {
					submit: !0,
					reset: !0
				}) r.pseudos[t] = fe(t);

			function ge() {}

			function ve(e) {
				for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
				return r
			}

			function ye(e, t, n) {
				var r = t.dir,
					i = t.next,
					o = i || r,
					s = n && "parentNode" === o,
					a = w++;
				return t.first ? function (t, n, i) {
					for (; t = t[r];)
						if (1 === t.nodeType || s) return e(t, n, i);
					return !1
				} : function (t, n, u) {
					var l, c, d, f = [_, a];
					if (u) {
						for (; t = t[r];)
							if ((1 === t.nodeType || s) && e(t, n, u)) return !0
					}
					else
						for (; t = t[r];)
							if (1 === t.nodeType || s)
								if (c = (d = t[b] || (t[b] = {}))[t.uniqueID] || (d[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
								else {
									if ((l = c[o]) && l[0] === _ && l[1] === a) return f[2] = l[2];
									if (c[o] = f, f[2] = e(t, n, u)) return !0
								} return !1
				}
			}

			function xe(e) {
				return e.length > 1 ? function (t, n, r) {
					for (var i = e.length; i--;)
						if (!e[i](t, n, r)) return !1;
					return !0
				} : e[0]
			}

			function be(e, t, n, r, i) {
				for (var o, s = [], a = 0, u = e.length, l = null != t; a < u; a++)(o = e[a]) && (n && !n(o, r, i) || (s.push(o), l && t.push(a)));
				return s
			}

			function Te(e, t, n, r, i, o) {
				return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), ae(function (o, s, a, u) {
					var l, c, d, f = [],
						p = [],
						h = s.length,
						m = o || function (e, t, n) {
							for (var r = 0, i = t.length; r < i; r++) oe(e, t[r], n);
							return n
						}(t || "*", a.nodeType ? [a] : a, []),
						g = !e || !o && t ? m : be(m, f, e, a, u),
						v = n ? i || (o ? e : h || r) ? [] : s : g;
					if (n && n(g, v, a, u), r)
						for (l = be(v, p), r(l, [], a, u), c = l.length; c--;)(d = l[c]) && (v[p[c]] = !(g[p[c]] = d));
					if (o) {
						if (i || e) {
							if (i) {
								for (l = [], c = v.length; c--;)(d = v[c]) && l.push(g[c] = d);
								i(null, v = [], l, u)
							}
							for (c = v.length; c--;)(d = v[c]) && (l = i ? H(o, d) : f[c]) > -1 && (o[l] = !(s[l] = d))
						}
					}
					else v = be(v === s ? v.splice(h, v.length) : v), i ? i(null, s, v, u) : N.apply(s, v)
				})
			}

			function _e(e) {
				for (var t, n, i, o = e.length, s = r.relative[e[0].type], a = s || r.relative[" "], u = s ? 1 : 0, c = ye(function (e) {
						return e === t
					}, a, !0), d = ye(function (e) {
						return H(t, e) > -1
					}, a, !0), f = [function (e, n, r) {
						var i = !s && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : d(e, n, r));
						return t = null, i
					}]; u < o; u++)
					if (n = r.relative[e[u].type]) f = [ye(xe(f), n)];
					else {
						if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
							for (i = ++u; i < o && !r.relative[e[i].type]; i++);
							return Te(u > 1 && xe(f), u > 1 && ve(e.slice(0, u - 1).concat({
								value: " " === e[u - 2].type ? "*" : ""
							})).replace(B, "$1"), n, u < i && _e(e.slice(u, i)), i < o && _e(e = e.slice(i)), i < o && ve(e))
						}
						f.push(n)
					} return xe(f)
			}
			return ge.prototype = r.filters = r.pseudos, r.setFilters = new ge, s = oe.tokenize = function (e, t) {
				var n, i, o, s, a, u, l, c = E[e + " "];
				if (c) return t ? 0 : c.slice(0);
				for (a = e, u = [], l = r.preFilter; a;) {
					for (s in n && !(i = W.exec(a)) || (i && (a = a.slice(i[0].length) || a), u.push(o = [])), n = !1, (i = $.exec(a)) && (n = i.shift(), o.push({
							value: n,
							type: i[0].replace(B, " ")
						}), a = a.slice(n.length)), r.filter) !(i = X[s].exec(a)) || l[s] && !(i = l[s](i)) || (n = i.shift(), o.push({
						value: n,
						type: s,
						matches: i
					}), a = a.slice(n.length));
					if (!n) break
				}
				return t ? a.length : a ? oe.error(e) : E(e, u).slice(0)
			}, a = oe.compile = function (e, t) {
				var n, i = [],
					o = [],
					a = A[e + " "];
				if (!a) {
					for (t || (t = s(e)), n = t.length; n--;)(a = _e(t[n]))[b] ? i.push(a) : o.push(a);
					(a = A(e, function (e, t) {
						var n = t.length > 0,
							i = e.length > 0,
							o = function (o, s, a, u, c) {
								var d, h, g, v = 0,
									y = "0",
									x = o && [],
									b = [],
									T = l,
									w = o || i && r.find.TAG("*", c),
									C = _ += null == T ? 1 : Math.random() || .1,
									E = w.length;
								for (c && (l = s === p || s || c); y !== E && null != (d = w[y]); y++) {
									if (i && d) {
										for (h = 0, s || d.ownerDocument === p || (f(d), a = !m); g = e[h++];)
											if (g(d, s || p, a)) {
												u.push(d);
												break
											} c && (_ = C)
									}
									n && ((d = !g && d) && v--, o && x.push(d))
								}
								if (v += y, n && y !== v) {
									for (h = 0; g = t[h++];) g(x, b, s, a);
									if (o) {
										if (v > 0)
											for (; y--;) x[y] || b[y] || (b[y] = O.call(u));
										b = be(b)
									}
									N.apply(u, b), c && !o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u)
								}
								return c && (_ = C, l = T), x
							};
						return n ? ae(o) : o
					}(o, i))).selector = e
				}
				return a
			}, u = oe.select = function (e, t, n, i) {
				var o, u, l, c, d, f = "function" == typeof e && e,
					p = !i && s(e = f.selector || e);
				if (n = n || [], 1 === p.length) {
					if ((u = p[0] = p[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && m && r.relative[u[1].type]) {
						if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;
						f && (t = t.parentNode), e = e.slice(u.shift().value.length)
					}
					for (o = X.needsContext.test(e) ? 0 : u.length; o-- && (l = u[o], !r.relative[c = l.type]);)
						if ((d = r.find[c]) && (i = d(l.matches[0].replace(Z, ee), Q.test(u[0].type) && me(t.parentNode) || t))) {
							if (u.splice(o, 1), !(e = i.length && ve(u))) return N.apply(n, i), n;
							break
						}
				}
				return (f || a(e, p))(i, t, !m, n, !t || Q.test(e) && me(t.parentNode) || t), n
			}, n.sortStable = b.split("").sort(k).join("") === b, n.detectDuplicates = !!d, f(), n.sortDetached = ue(function (e) {
				return 1 & e.compareDocumentPosition(p.createElement("fieldset"))
			}), ue(function (e) {
				return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
			}) || le("type|href|height|width", function (e, t, n) {
				if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
			}), n.attributes && ue(function (e) {
				return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
			}) || le("value", function (e, t, n) {
				if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
			}), ue(function (e) {
				return null == e.getAttribute("disabled")
			}) || le(L, function (e, t, n) {
				var r;
				if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
			}), oe
		}(n);
		w.find = A, w.expr = A.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = A.uniqueSort, w.text = A.getText, w.isXMLDoc = A.isXML, w.contains = A.contains, w.escapeSelector = A.escape;
		var k = function (e, t, n) {
				for (var r = [], i = void 0 !== n;
					(e = e[t]) && 9 !== e.nodeType;)
					if (1 === e.nodeType) {
						if (i && w(e).is(n)) break;
						r.push(e)
					} return r
			},
			S = function (e, t) {
				for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
				return n
			},
			I = w.expr.match.needsContext;

		function O(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		}
		var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

		function N(e, t, n) {
			return y(t) ? w.grep(e, function (e, r) {
				return !!t.call(e, r, e) !== n
			}) : t.nodeType ? w.grep(e, function (e) {
				return e === t !== n
			}) : "string" != typeof t ? w.grep(e, function (e) {
				return d.call(t, e) > -1 !== n
			}) : w.filter(t, e, n)
		}
		w.filter = function (e, t, n) {
			var r = t[0];
			return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) {
				return 1 === e.nodeType
			}))
		}, w.fn.extend({
			find: function (e) {
				var t, n, r = this.length,
					i = this;
				if ("string" != typeof e) return this.pushStack(w(e).filter(function () {
					for (t = 0; t < r; t++)
						if (w.contains(i[t], this)) return !0
				}));
				for (n = this.pushStack([]), t = 0; t < r; t++) w.find(e, i[t], n);
				return r > 1 ? w.uniqueSort(n) : n
			},
			filter: function (e) {
				return this.pushStack(N(this, e || [], !1))
			},
			not: function (e) {
				return this.pushStack(N(this, e || [], !0))
			},
			is: function (e) {
				return !!N(this, "string" == typeof e && I.test(e) ? w(e) : e || [], !1).length
			}
		});
		var M, H = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
		(w.fn.init = function (e, t, n) {
			var r, i;
			if (!e) return this;
			if (n = n || M, "string" == typeof e) {
				if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : H.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
				if (r[1]) {
					if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : s, !0)), D.test(r[1]) && w.isPlainObject(t))
						for (r in t) y(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
					return this
				}
				return (i = s.getElementById(r[2])) && (this[0] = i, this.length = 1), this
			}
			return e.nodeType ? (this[0] = e, this.length = 1, this) : y(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this)
		}).prototype = w.fn, M = w(s);
		var L = /^(?:parents|prev(?:Until|All))/,
			j = {
				children: !0,
				contents: !0,
				next: !0,
				prev: !0
			};

		function R(e, t) {
			for (;
				(e = e[t]) && 1 !== e.nodeType;);
			return e
		}
		w.fn.extend({
			has: function (e) {
				var t = w(e, this),
					n = t.length;
				return this.filter(function () {
					for (var e = 0; e < n; e++)
						if (w.contains(this, t[e])) return !0
				})
			},
			closest: function (e, t) {
				var n, r = 0,
					i = this.length,
					o = [],
					s = "string" != typeof e && w(e);
				if (!I.test(e))
					for (; r < i; r++)
						for (n = this[r]; n && n !== t; n = n.parentNode)
							if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
								o.push(n);
								break
							} return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o)
			},
			index: function (e) {
				return e ? "string" == typeof e ? d.call(w(e), this[0]) : d.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
			},
			add: function (e, t) {
				return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))))
			},
			addBack: function (e) {
				return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
			}
		}), w.each({
			parent: function (e) {
				var t = e.parentNode;
				return t && 11 !== t.nodeType ? t : null
			},
			parents: function (e) {
				return k(e, "parentNode")
			},
			parentsUntil: function (e, t, n) {
				return k(e, "parentNode", n)
			},
			next: function (e) {
				return R(e, "nextSibling")
			},
			prev: function (e) {
				return R(e, "previousSibling")
			},
			nextAll: function (e) {
				return k(e, "nextSibling")
			},
			prevAll: function (e) {
				return k(e, "previousSibling")
			},
			nextUntil: function (e, t, n) {
				return k(e, "nextSibling", n)
			},
			prevUntil: function (e, t, n) {
				return k(e, "previousSibling", n)
			},
			siblings: function (e) {
				return S((e.parentNode || {}).firstChild, e)
			},
			children: function (e) {
				return S(e.firstChild)
			},
			contents: function (e) {
				return O(e, "iframe") ? e.contentDocument : (O(e, "template") && (e = e.content || e), w.merge([], e.childNodes))
			}
		}, function (e, t) {
			w.fn[e] = function (n, r) {
				var i = w.map(this, t, n);
				return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (j[e] || w.uniqueSort(i), L.test(e) && i.reverse()), this.pushStack(i)
			}
		});
		var q = /[^\x20\t\r\n\f]+/g;

		function P(e) {
			return e
		}

		function F(e) {
			throw e
		}

		function B(e, t, n, r) {
			var i;
			try {
				e && y(i = e.promise) ? i.call(e).done(t).fail(n) : e && y(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
			}
			catch (e) {
				n.apply(void 0, [e])
			}
		}
		w.Callbacks = function (e) {
			e = "string" == typeof e ? function (e) {
				var t = {};
				return w.each(e.match(q) || [], function (e, n) {
					t[n] = !0
				}), t
			}(e) : w.extend({}, e);
			var t, n, r, i, o = [],
				s = [],
				a = -1,
				u = function () {
					for (i = i || e.once, r = t = !0; s.length; a = -1)
						for (n = s.shift(); ++a < o.length;) !1 === o[a].apply(n[0], n[1]) && e.stopOnFalse && (a = o.length, n = !1);
					e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
				},
				l = {
					add: function () {
						return o && (n && !t && (a = o.length - 1, s.push(n)), function t(n) {
							w.each(n, function (n, r) {
								y(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== _(r) && t(r)
							})
						}(arguments), n && !t && u()), this
					},
					remove: function () {
						return w.each(arguments, function (e, t) {
							for (var n;
								(n = w.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= a && a--
						}), this
					},
					has: function (e) {
						return e ? w.inArray(e, o) > -1 : o.length > 0
					},
					empty: function () {
						return o && (o = []), this
					},
					disable: function () {
						return i = s = [], o = n = "", this
					},
					disabled: function () {
						return !o
					},
					lock: function () {
						return i = s = [], n || t || (o = n = ""), this
					},
					locked: function () {
						return !!i
					},
					fireWith: function (e, n) {
						return i || (n = [e, (n = n || []).slice ? n.slice() : n], s.push(n), t || u()), this
					},
					fire: function () {
						return l.fireWith(this, arguments), this
					},
					fired: function () {
						return !!r
					}
				};
			return l
		}, w.extend({
			Deferred: function (e) {
				var t = [
						["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2],
						["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"],
						["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]
					],
					r = "pending",
					i = {
						state: function () {
							return r
						},
						always: function () {
							return o.done(arguments).fail(arguments), this
						},
						catch: function (e) {
							return i.then(null, e)
						},
						pipe: function () {
							var e = arguments;
							return w.Deferred(function (n) {
								w.each(t, function (t, r) {
									var i = y(e[r[4]]) && e[r[4]];
									o[r[1]](function () {
										var e = i && i.apply(this, arguments);
										e && y(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, i ? [e] : arguments)
									})
								}), e = null
							}).promise()
						},
						then: function (e, r, i) {
							var o = 0;

							function s(e, t, r, i) {
								return function () {
									var a = this,
										u = arguments,
										l = function () {
											var n, l;
											if (!(e < o)) {
												if ((n = r.apply(a, u)) === t.promise()) throw new TypeError("Thenable self-resolution");
												l = n && ("object" == typeof n || "function" == typeof n) && n.then, y(l) ? i ? l.call(n, s(o, t, P, i), s(o, t, F, i)) : (o++, l.call(n, s(o, t, P, i), s(o, t, F, i), s(o, t, P, t.notifyWith))) : (r !== P && (a = void 0, u = [n]), (i || t.resolveWith)(a, u))
											}
										},
										c = i ? l : function () {
											try {
												l()
											}
											catch (n) {
												w.Deferred.exceptionHook && w.Deferred.exceptionHook(n, c.stackTrace), e + 1 >= o && (r !== F && (a = void 0, u = [n]), t.rejectWith(a, u))
											}
										};
									e ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), n.setTimeout(c))
								}
							}
							return w.Deferred(function (n) {
								t[0][3].add(s(0, n, y(i) ? i : P, n.notifyWith)), t[1][3].add(s(0, n, y(e) ? e : P)), t[2][3].add(s(0, n, y(r) ? r : F))
							}).promise()
						},
						promise: function (e) {
							return null != e ? w.extend(e, i) : i
						}
					},
					o = {};
				return w.each(t, function (e, n) {
					var s = n[2],
						a = n[5];
					i[n[1]] = s.add, a && s.add(function () {
						r = a
					}, t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), s.add(n[3].fire), o[n[0]] = function () {
						return o[n[0] + "With"](this === o ? void 0 : this, arguments), this
					}, o[n[0] + "With"] = s.fireWith
				}), i.promise(o), e && e.call(o, o), o
			},
			when: function (e) {
				var t = arguments.length,
					n = t,
					r = Array(n),
					i = u.call(arguments),
					o = w.Deferred(),
					s = function (e) {
						return function (n) {
							r[e] = this, i[e] = arguments.length > 1 ? u.call(arguments) : n, --t || o.resolveWith(r, i)
						}
					};
				if (t <= 1 && (B(e, o.done(s(n)).resolve, o.reject, !t), "pending" === o.state() || y(i[n] && i[n].then))) return o.then();
				for (; n--;) B(i[n], s(n), o.reject);
				return o.promise()
			}
		});
		var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
		w.Deferred.exceptionHook = function (e, t) {
			n.console && n.console.warn && e && W.test(e.name) && n.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
		}, w.readyException = function (e) {
			n.setTimeout(function () {
				throw e
			})
		};
		var $ = w.Deferred();

		function G() {
			s.removeEventListener("DOMContentLoaded", G), n.removeEventListener("load", G), w.ready()
		}
		w.fn.ready = function (e) {
			return $.then(e).catch(function (e) {
				w.readyException(e)
			}), this
		}, w.extend({
			isReady: !1,
			readyWait: 1,
			ready: function (e) {
				(!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || $.resolveWith(s, [w]))
			}
		}), w.ready.then = $.then, "complete" === s.readyState || "loading" !== s.readyState && !s.documentElement.doScroll ? n.setTimeout(w.ready) : (s.addEventListener("DOMContentLoaded", G), n.addEventListener("load", G));
		var U = function (e, t, n, r, i, o, s) {
				var a = 0,
					u = e.length,
					l = null == n;
				if ("object" === _(n))
					for (a in i = !0, n) U(e, t, a, n[a], !0, o, s);
				else if (void 0 !== r && (i = !0, y(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
						return l.call(w(e), n)
					})), t))
					for (; a < u; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
				return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
			},
			z = /^-ms-/,
			X = /-([a-z])/g;

		function V(e, t) {
			return t.toUpperCase()
		}

		function K(e) {
			return e.replace(z, "ms-").replace(X, V)
		}
		var Y = function (e) {
			return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
		};

		function J() {
			this.expando = w.expando + J.uid++
		}
		J.uid = 1, J.prototype = {
			cache: function (e) {
				var t = e[this.expando];
				return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
					value: t,
					configurable: !0
				}))), t
			},
			set: function (e, t, n) {
				var r, i = this.cache(e);
				if ("string" == typeof t) i[K(t)] = n;
				else
					for (r in t) i[K(r)] = t[r];
				return i
			},
			get: function (e, t) {
				return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][K(t)]
			},
			access: function (e, t, n) {
				return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
			},
			remove: function (e, t) {
				var n, r = e[this.expando];
				if (void 0 !== r) {
					if (void 0 !== t) {
						n = (t = Array.isArray(t) ? t.map(K) : (t = K(t)) in r ? [t] : t.match(q) || []).length;
						for (; n--;) delete r[t[n]]
					}(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
				}
			},
			hasData: function (e) {
				var t = e[this.expando];
				return void 0 !== t && !w.isEmptyObject(t)
			}
		};
		var Q = new J,
			Z = new J,
			ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			te = /[A-Z]/g;

		function ne(e, t, n) {
			var r;
			if (void 0 === n && 1 === e.nodeType)
				if (r = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
					try {
						n = function (e) {
							return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ee.test(e) ? JSON.parse(e) : e)
						}(n)
					}
					catch (e) {}
					Z.set(e, t, n)
				}
			else n = void 0;
			return n
		}
		w.extend({
			hasData: function (e) {
				return Z.hasData(e) || Q.hasData(e)
			},
			data: function (e, t, n) {
				return Z.access(e, t, n)
			},
			removeData: function (e, t) {
				Z.remove(e, t)
			},
			_data: function (e, t, n) {
				return Q.access(e, t, n)
			},
			_removeData: function (e, t) {
				Q.remove(e, t)
			}
		}), w.fn.extend({
			data: function (e, t) {
				var n, r, i, o = this[0],
					s = o && o.attributes;
				if (void 0 === e) {
					if (this.length && (i = Z.get(o), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))) {
						for (n = s.length; n--;) s[n] && 0 === (r = s[n].name).indexOf("data-") && (r = K(r.slice(5)), ne(o, r, i[r]));
						Q.set(o, "hasDataAttrs", !0)
					}
					return i
				}
				return "object" == typeof e ? this.each(function () {
					Z.set(this, e)
				}) : U(this, function (t) {
					var n;
					if (o && void 0 === t) return void 0 !== (n = Z.get(o, e)) ? n : void 0 !== (n = ne(o, e)) ? n : void 0;
					this.each(function () {
						Z.set(this, e, t)
					})
				}, null, t, arguments.length > 1, null, !0)
			},
			removeData: function (e) {
				return this.each(function () {
					Z.remove(this, e)
				})
			}
		}), w.extend({
			queue: function (e, t, n) {
				var r;
				if (e) return t = (t || "fx") + "queue", r = Q.get(e, t), n && (!r || Array.isArray(n) ? r = Q.access(e, t, w.makeArray(n)) : r.push(n)), r || []
			},
			dequeue: function (e, t) {
				t = t || "fx";
				var n = w.queue(e, t),
					r = n.length,
					i = n.shift(),
					o = w._queueHooks(e, t);
				"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
					w.dequeue(e, t)
				}, o)), !r && o && o.empty.fire()
			},
			_queueHooks: function (e, t) {
				var n = t + "queueHooks";
				return Q.get(e, n) || Q.access(e, n, {
					empty: w.Callbacks("once memory").add(function () {
						Q.remove(e, [t + "queue", n])
					})
				})
			}
		}), w.fn.extend({
			queue: function (e, t) {
				var n = 2;
				return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () {
					var n = w.queue(this, e, t);
					w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e)
				})
			},
			dequeue: function (e) {
				return this.each(function () {
					w.dequeue(this, e)
				})
			},
			clearQueue: function (e) {
				return this.queue(e || "fx", [])
			},
			promise: function (e, t) {
				var n, r = 1,
					i = w.Deferred(),
					o = this,
					s = this.length,
					a = function () {
						--r || i.resolveWith(o, [o])
					};
				for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = Q.get(o[s], e + "queueHooks")) && n.empty && (r++, n.empty.add(a));
				return a(), i.promise(t)
			}
		});
		var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
			ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
			oe = ["Top", "Right", "Bottom", "Left"],
			se = function (e, t) {
				return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display")
			},
			ae = function (e, t, n, r) {
				var i, o, s = {};
				for (o in t) s[o] = e.style[o], e.style[o] = t[o];
				for (o in i = n.apply(e, r || []), t) e.style[o] = s[o];
				return i
			};

		function ue(e, t, n, r) {
			var i, o, s = 20,
				a = r ? function () {
					return r.cur()
				} : function () {
					return w.css(e, t, "")
				},
				u = a(),
				l = n && n[3] || (w.cssNumber[t] ? "" : "px"),
				c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t));
			if (c && c[3] !== l) {
				for (u /= 2, l = l || c[3], c = +u || 1; s--;) w.style(e, t, c + l), (1 - o) * (1 - (o = a() / u || .5)) <= 0 && (s = 0), c /= o;
				c *= 2, w.style(e, t, c + l), n = n || []
			}
			return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
		}
		var le = {};

		function ce(e) {
			var t, n = e.ownerDocument,
				r = e.nodeName,
				i = le[r];
			return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i)
		}

		function de(e, t) {
			for (var n, r, i = [], o = 0, s = e.length; o < s; o++)(r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = Q.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && se(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", Q.set(r, "display", n)));
			for (o = 0; o < s; o++) null != i[o] && (e[o].style.display = i[o]);
			return e
		}
		w.fn.extend({
			show: function () {
				return de(this, !0)
			},
			hide: function () {
				return de(this)
			},
			toggle: function (e) {
				return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
					se(this) ? w(this).show() : w(this).hide()
				})
			}
		});
		var fe = /^(?:checkbox|radio)$/i,
			pe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
			he = /^$|^module$|\/(?:java|ecma)script/i,
			me = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				thead: [1, "<table>", "</table>"],
				col: [2, "<table><colgroup>", "</colgroup></table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				_default: [0, "", ""]
			};

		function ge(e, t) {
			var n;
			return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && O(e, t) ? w.merge([e], n) : n
		}

		function ve(e, t) {
			for (var n = 0, r = e.length; n < r; n++) Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
		}
		me.optgroup = me.option, me.tbody = me.tfoot = me.colgroup = me.caption = me.thead, me.th = me.td;
		var ye, xe, be = /<|&#?\w+;/;

		function Te(e, t, n, r, i) {
			for (var o, s, a, u, l, c, d = t.createDocumentFragment(), f = [], p = 0, h = e.length; p < h; p++)
				if ((o = e[p]) || 0 === o)
					if ("object" === _(o)) w.merge(f, o.nodeType ? [o] : o);
					else if (be.test(o)) {
				for (s = s || d.appendChild(t.createElement("div")), a = (pe.exec(o) || ["", ""])[1].toLowerCase(), u = me[a] || me._default, s.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0]; c--;) s = s.lastChild;
				w.merge(f, s.childNodes), (s = d.firstChild).textContent = ""
			}
			else f.push(t.createTextNode(o));
			for (d.textContent = "", p = 0; o = f[p++];)
				if (r && w.inArray(o, r) > -1) i && i.push(o);
				else if (l = w.contains(o.ownerDocument, o), s = ge(d.appendChild(o), "script"), l && ve(s), n)
				for (c = 0; o = s[c++];) he.test(o.type || "") && n.push(o);
			return d
		}
		ye = s.createDocumentFragment().appendChild(s.createElement("div")), (xe = s.createElement("input")).setAttribute("type", "radio"), xe.setAttribute("checked", "checked"), xe.setAttribute("name", "t"), ye.appendChild(xe), v.checkClone = ye.cloneNode(!0).cloneNode(!0).lastChild.checked, ye.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!ye.cloneNode(!0).lastChild.defaultValue;
		var _e = s.documentElement,
			we = /^key/,
			Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
			Ee = /^([^.]*)(?:\.(.+)|)/;

		function Ae() {
			return !0
		}

		function ke() {
			return !1
		}

		function Se() {
			try {
				return s.activeElement
			}
			catch (e) {}
		}

		function Ie(e, t, n, r, i, o) {
			var s, a;
			if ("object" == typeof t) {
				for (a in "string" != typeof n && (r = r || n, n = void 0), t) Ie(e, a, n, r, t[a], o);
				return e
			}
			if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke;
			else if (!i) return e;
			return 1 === o && (s = i, (i = function (e) {
				return w().off(e), s.apply(this, arguments)
			}).guid = s.guid || (s.guid = w.guid++)), e.each(function () {
				w.event.add(this, t, i, r, n)
			})
		}
		w.event = {
			global: {},
			add: function (e, t, n, r, i) {
				var o, s, a, u, l, c, d, f, p, h, m, g = Q.get(e);
				if (g)
					for (n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(_e, i), n.guid || (n.guid = w.guid++), (u = g.events) || (u = g.events = {}), (s = g.handle) || (s = g.handle = function (t) {
							return void 0 !== w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0
						}), l = (t = (t || "").match(q) || [""]).length; l--;) p = m = (a = Ee.exec(t[l]) || [])[1], h = (a[2] || "").split(".").sort(), p && (d = w.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, d = w.event.special[p] || {}, c = w.extend({
						type: p,
						origType: m,
						data: r,
						handler: n,
						guid: n.guid,
						selector: i,
						needsContext: i && w.expr.match.needsContext.test(i),
						namespace: h.join(".")
					}, o), (f = u[p]) || ((f = u[p] = []).delegateCount = 0, d.setup && !1 !== d.setup.call(e, r, h, s) || e.addEventListener && e.addEventListener(p, s)), d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), w.event.global[p] = !0)
			},
			remove: function (e, t, n, r, i) {
				var o, s, a, u, l, c, d, f, p, h, m, g = Q.hasData(e) && Q.get(e);
				if (g && (u = g.events)) {
					for (l = (t = (t || "").match(q) || [""]).length; l--;)
						if (p = m = (a = Ee.exec(t[l]) || [])[1], h = (a[2] || "").split(".").sort(), p) {
							for (d = w.event.special[p] || {}, f = u[p = (r ? d.delegateType : d.bindType) || p] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = f.length; o--;) c = f[o], !i && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(e, c));
							s && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, g.handle) || w.removeEvent(e, p, g.handle), delete u[p])
						}
					else
						for (p in u) w.event.remove(e, p + t[l], n, r, !0);
					w.isEmptyObject(u) && Q.remove(e, "handle events")
				}
			},
			dispatch: function (e) {
				var t, n, r, i, o, s, a = w.event.fix(e),
					u = new Array(arguments.length),
					l = (Q.get(this, "events") || {})[a.type] || [],
					c = w.event.special[a.type] || {};
				for (u[0] = a, t = 1; t < arguments.length; t++) u[t] = arguments[t];
				if (a.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, a)) {
					for (s = w.event.handlers.call(this, a, l), t = 0;
						(i = s[t++]) && !a.isPropagationStopped();)
						for (a.currentTarget = i.elem, n = 0;
							(o = i.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(o.namespace) || (a.handleObj = o, a.data = o.data, void 0 !== (r = ((w.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (a.result = r) && (a.preventDefault(), a.stopPropagation()));
					return c.postDispatch && c.postDispatch.call(this, a), a.result
				}
			},
			handlers: function (e, t) {
				var n, r, i, o, s, a = [],
					u = t.delegateCount,
					l = e.target;
				if (u && l.nodeType && !("click" === e.type && e.button >= 1))
					for (; l !== this; l = l.parentNode || this)
						if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
							for (o = [], s = {}, n = 0; n < u; n++) void 0 === s[i = (r = t[n]).selector + " "] && (s[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), s[i] && o.push(r);
							o.length && a.push({
								elem: l,
								handlers: o
							})
						} return l = this, u < t.length && a.push({
					elem: l,
					handlers: t.slice(u)
				}), a
			},
			addProp: function (e, t) {
				Object.defineProperty(w.Event.prototype, e, {
					enumerable: !0,
					configurable: !0,
					get: y(t) ? function () {
						if (this.originalEvent) return t(this.originalEvent)
					} : function () {
						if (this.originalEvent) return this.originalEvent[e]
					},
					set: function (t) {
						Object.defineProperty(this, e, {
							enumerable: !0,
							configurable: !0,
							writable: !0,
							value: t
						})
					}
				})
			},
			fix: function (e) {
				return e[w.expando] ? e : new w.Event(e)
			},
			special: {
				load: {
					noBubble: !0
				},
				focus: {
					trigger: function () {
						if (this !== Se() && this.focus) return this.focus(), !1
					},
					delegateType: "focusin"
				},
				blur: {
					trigger: function () {
						if (this === Se() && this.blur) return this.blur(), !1
					},
					delegateType: "focusout"
				},
				click: {
					trigger: function () {
						if ("checkbox" === this.type && this.click && O(this, "input")) return this.click(), !1
					},
					_default: function (e) {
						return O(e.target, "a")
					}
				},
				beforeunload: {
					postDispatch: function (e) {
						void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
					}
				}
			}
		}, w.removeEvent = function (e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n)
		}, w.Event = function (e, t) {
			if (!(this instanceof w.Event)) return new w.Event(e, t);
			e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ae : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0
		}, w.Event.prototype = {
			constructor: w.Event,
			isDefaultPrevented: ke,
			isPropagationStopped: ke,
			isImmediatePropagationStopped: ke,
			isSimulated: !1,
			preventDefault: function () {
				var e = this.originalEvent;
				this.isDefaultPrevented = Ae, e && !this.isSimulated && e.preventDefault()
			},
			stopPropagation: function () {
				var e = this.originalEvent;
				this.isPropagationStopped = Ae, e && !this.isSimulated && e.stopPropagation()
			},
			stopImmediatePropagation: function () {
				var e = this.originalEvent;
				this.isImmediatePropagationStopped = Ae, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
			}
		}, w.each({
			altKey: !0,
			bubbles: !0,
			cancelable: !0,
			changedTouches: !0,
			ctrlKey: !0,
			detail: !0,
			eventPhase: !0,
			metaKey: !0,
			pageX: !0,
			pageY: !0,
			shiftKey: !0,
			view: !0,
			char: !0,
			charCode: !0,
			key: !0,
			keyCode: !0,
			button: !0,
			buttons: !0,
			clientX: !0,
			clientY: !0,
			offsetX: !0,
			offsetY: !0,
			pointerId: !0,
			pointerType: !0,
			screenX: !0,
			screenY: !0,
			targetTouches: !0,
			toElement: !0,
			touches: !0,
			which: function (e) {
				var t = e.button;
				return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ce.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
			}
		}, w.event.addProp), w.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function (e, t) {
			w.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function (e) {
					var n, r = e.relatedTarget,
						i = e.handleObj;
					return r && (r === this || w.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
				}
			}
		}), w.fn.extend({
			on: function (e, t, n, r) {
				return Ie(this, e, t, n, r)
			},
			one: function (e, t, n, r) {
				return Ie(this, e, t, n, r, 1)
			},
			off: function (e, t, n) {
				var r, i;
				if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
				if ("object" == typeof e) {
					for (i in e) this.off(i, t, e[i]);
					return this
				}
				return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function () {
					w.event.remove(this, e, n, t)
				})
			}
		});
		var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
			De = /<script|<style|<link/i,
			Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
			Me = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

		function He(e, t) {
			return O(e, "table") && O(11 !== t.nodeType ? t : t.firstChild, "tr") && w(e).children("tbody")[0] || e
		}

		function Le(e) {
			return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
		}

		function je(e) {
			return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
		}

		function Re(e, t) {
			var n, r, i, o, s, a, u, l;
			if (1 === t.nodeType) {
				if (Q.hasData(e) && (o = Q.access(e), s = Q.set(t, o), l = o.events))
					for (i in delete s.handle, s.events = {}, l)
						for (n = 0, r = l[i].length; n < r; n++) w.event.add(t, i, l[i][n]);
				Z.hasData(e) && (a = Z.access(e), u = w.extend({}, a), Z.set(t, u))
			}
		}

		function qe(e, t, n, r) {
			t = l.apply([], t);
			var i, o, s, a, u, c, d = 0,
				f = e.length,
				p = f - 1,
				h = t[0],
				m = y(h);
			if (m || f > 1 && "string" == typeof h && !v.checkClone && Ne.test(h)) return e.each(function (i) {
				var o = e.eq(i);
				m && (t[0] = h.call(this, i, o.html())), qe(o, t, n, r)
			});
			if (f && (o = (i = Te(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
				for (a = (s = w.map(ge(i, "script"), Le)).length; d < f; d++) u = i, d !== p && (u = w.clone(u, !0, !0), a && w.merge(s, ge(u, "script"))), n.call(e[d], u, d);
				if (a)
					for (c = s[s.length - 1].ownerDocument, w.map(s, je), d = 0; d < a; d++) u = s[d], he.test(u.type || "") && !Q.access(u, "globalEval") && w.contains(c, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(u.src) : T(u.textContent.replace(Me, ""), c, u))
			}
			return e
		}

		function Pe(e, t, n) {
			for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || w.cleanData(ge(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ge(r, "script")), r.parentNode.removeChild(r));
			return e
		}
		w.extend({
			htmlPrefilter: function (e) {
				return e.replace(Oe, "<$1></$2>")
			},
			clone: function (e, t, n) {
				var r, i, o, s, a, u, l, c = e.cloneNode(!0),
					d = w.contains(e.ownerDocument, e);
				if (!(v.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e)))
					for (s = ge(c), r = 0, i = (o = ge(e)).length; r < i; r++) a = o[r], u = s[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && fe.test(a.type) ? u.checked = a.checked : "input" !== l && "textarea" !== l || (u.defaultValue = a.defaultValue);
				if (t)
					if (n)
						for (o = o || ge(e), s = s || ge(c), r = 0, i = o.length; r < i; r++) Re(o[r], s[r]);
					else Re(e, c);
				return (s = ge(c, "script")).length > 0 && ve(s, !d && ge(e, "script")), c
			},
			cleanData: function (e) {
				for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++)
					if (Y(n)) {
						if (t = n[Q.expando]) {
							if (t.events)
								for (r in t.events) i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
							n[Q.expando] = void 0
						}
						n[Z.expando] && (n[Z.expando] = void 0)
					}
			}
		}), w.fn.extend({
			detach: function (e) {
				return Pe(this, e, !0)
			},
			remove: function (e) {
				return Pe(this, e)
			},
			text: function (e) {
				return U(this, function (e) {
					return void 0 === e ? w.text(this) : this.empty().each(function () {
						1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
					})
				}, null, e, arguments.length)
			},
			append: function () {
				return qe(this, arguments, function (e) {
					1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || He(this, e).appendChild(e)
				})
			},
			prepend: function () {
				return qe(this, arguments, function (e) {
					if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
						var t = He(this, e);
						t.insertBefore(e, t.firstChild)
					}
				})
			},
			before: function () {
				return qe(this, arguments, function (e) {
					this.parentNode && this.parentNode.insertBefore(e, this)
				})
			},
			after: function () {
				return qe(this, arguments, function (e) {
					this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
				})
			},
			empty: function () {
				for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (w.cleanData(ge(e, !1)), e.textContent = "");
				return this
			},
			clone: function (e, t) {
				return e = null != e && e, t = null == t ? e : t, this.map(function () {
					return w.clone(this, e, t)
				})
			},
			html: function (e) {
				return U(this, function (e) {
					var t = this[0] || {},
						n = 0,
						r = this.length;
					if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
					if ("string" == typeof e && !De.test(e) && !me[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
						e = w.htmlPrefilter(e);
						try {
							for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (w.cleanData(ge(t, !1)), t.innerHTML = e);
							t = 0
						}
						catch (e) {}
					}
					t && this.empty().append(e)
				}, null, e, arguments.length)
			},
			replaceWith: function () {
				var e = [];
				return qe(this, arguments, function (t) {
					var n = this.parentNode;
					w.inArray(this, e) < 0 && (w.cleanData(ge(this)), n && n.replaceChild(t, this))
				}, e)
			}
		}), w.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function (e, t) {
			w.fn[e] = function (e) {
				for (var n, r = [], i = w(e), o = i.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.clone(!0), w(i[s])[t](n), c.apply(r, n.get());
				return this.pushStack(r)
			}
		});
		var Fe = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
			Be = function (e) {
				var t = e.ownerDocument.defaultView;
				return t && t.opener || (t = n), t.getComputedStyle(e)
			},
			We = new RegExp(oe.join("|"), "i");

		function $e(e, t, n) {
			var r, i, o, s, a = e.style;
			return (n = n || Be(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (s = w.style(e, t)), !v.pixelBoxStyles() && Fe.test(s) && We.test(t) && (r = a.width, i = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = i, a.maxWidth = o)), void 0 !== s ? s + "" : s
		}

		function Ge(e, t) {
			return {
				get: function () {
					if (!e()) return (this.get = t).apply(this, arguments);
					delete this.get
				}
			}
		}! function () {
			function e() {
				if (c) {
					l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", _e.appendChild(l).appendChild(c);
					var e = n.getComputedStyle(c);
					r = "1%" !== e.top, u = 12 === t(e.marginLeft), c.style.right = "60%", a = 36 === t(e.right), i = 36 === t(e.width), c.style.position = "absolute", o = 36 === c.offsetWidth || "absolute", _e.removeChild(l), c = null
				}
			}

			function t(e) {
				return Math.round(parseFloat(e))
			}
			var r, i, o, a, u, l = s.createElement("div"),
				c = s.createElement("div");
			c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(v, {
				boxSizingReliable: function () {
					return e(), i
				},
				pixelBoxStyles: function () {
					return e(), a
				},
				pixelPosition: function () {
					return e(), r
				},
				reliableMarginLeft: function () {
					return e(), u
				},
				scrollboxSize: function () {
					return e(), o
				}
			}))
		}();
		var Ue = /^(none|table(?!-c[ea]).+)/,
			ze = /^--/,
			Xe = {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			},
			Ve = {
				letterSpacing: "0",
				fontWeight: "400"
			},
			Ke = ["Webkit", "Moz", "ms"],
			Ye = s.createElement("div").style;

		function Je(e) {
			var t = w.cssProps[e];
			return t || (t = w.cssProps[e] = function (e) {
				if (e in Ye) return e;
				for (var t = e[0].toUpperCase() + e.slice(1), n = Ke.length; n--;)
					if ((e = Ke[n] + t) in Ye) return e
			}(e) || e), t
		}

		function Qe(e, t, n) {
			var r = ie.exec(t);
			return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
		}

		function Ze(e, t, n, r, i, o) {
			var s = "width" === t ? 1 : 0,
				a = 0,
				u = 0;
			if (n === (r ? "border" : "content")) return 0;
			for (; s < 4; s += 2) "margin" === n && (u += w.css(e, n + oe[s], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[s], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[s] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[s], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[s] + "Width", !0, i) : a += w.css(e, "border" + oe[s] + "Width", !0, i));
			return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - a - .5))), u
		}

		function et(e, t, n) {
			var r = Be(e),
				i = $e(e, t, r),
				o = "border-box" === w.css(e, "boxSizing", !1, r),
				s = o;
			if (Fe.test(i)) {
				if (!n) return i;
				i = "auto"
			}
			return s = s && (v.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], s = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), s, r, i) + "px"
		}

		function tt(e, t, n, r, i) {
			return new tt.prototype.init(e, t, n, r, i)
		}
		w.extend({
			cssHooks: {
				opacity: {
					get: function (e, t) {
						if (t) {
							var n = $e(e, "opacity");
							return "" === n ? "1" : n
						}
					}
				}
			},
			cssNumber: {
				animationIterationCount: !0,
				columnCount: !0,
				fillOpacity: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0
			},
			cssProps: {},
			style: function (e, t, n, r) {
				if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
					var i, o, s, a = K(t),
						u = ze.test(t),
						l = e.style;
					if (u || (t = Je(a)), s = w.cssHooks[t] || w.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (i = s.get(e, !1, r)) ? i : l[t];
					"string" === (o = typeof n) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (w.cssNumber[a] ? "" : "px")), v.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
				}
			},
			css: function (e, t, n, r) {
				var i, o, s, a = K(t);
				return ze.test(t) || (t = Je(a)), (s = w.cssHooks[t] || w.cssHooks[a]) && "get" in s && (i = s.get(e, !0, n)), void 0 === i && (i = $e(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
			}
		}), w.each(["height", "width"], function (e, t) {
			w.cssHooks[t] = {
				get: function (e, n, r) {
					if (n) return !Ue.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : ae(e, Xe, function () {
						return et(e, t, r)
					})
				},
				set: function (e, n, r) {
					var i, o = Be(e),
						s = "border-box" === w.css(e, "boxSizing", !1, o),
						a = r && Ze(e, t, r, s, o);
					return s && v.scrollboxSize() === o.position && (a -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), a && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Qe(0, n, a)
				}
			}
		}), w.cssHooks.marginLeft = Ge(v.reliableMarginLeft, function (e, t) {
			if (t) return (parseFloat($e(e, "marginLeft")) || e.getBoundingClientRect().left - ae(e, {
				marginLeft: 0
			}, function () {
				return e.getBoundingClientRect().left
			})) + "px"
		}), w.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function (e, t) {
			w.cssHooks[e + t] = {
				expand: function (n) {
					for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
					return i
				}
			}, "margin" !== e && (w.cssHooks[e + t].set = Qe)
		}), w.fn.extend({
			css: function (e, t) {
				return U(this, function (e, t, n) {
					var r, i, o = {},
						s = 0;
					if (Array.isArray(t)) {
						for (r = Be(e), i = t.length; s < i; s++) o[t[s]] = w.css(e, t[s], !1, r);
						return o
					}
					return void 0 !== n ? w.style(e, t, n) : w.css(e, t)
				}, e, t, arguments.length > 1)
			}
		}), w.Tween = tt, tt.prototype = {
			constructor: tt,
			init: function (e, t, n, r, i, o) {
				this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px")
			},
			cur: function () {
				var e = tt.propHooks[this.prop];
				return e && e.get ? e.get(this) : tt.propHooks._default.get(this)
			},
			run: function (e) {
				var t, n = tt.propHooks[this.prop];
				return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this
			}
		}, tt.prototype.init.prototype = tt.prototype, tt.propHooks = {
			_default: {
				get: function (e) {
					var t;
					return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
				},
				set: function (e) {
					w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit)
				}
			}
		}, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = {
			set: function (e) {
				e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
			}
		}, w.easing = {
			linear: function (e) {
				return e
			},
			swing: function (e) {
				return .5 - Math.cos(e * Math.PI) / 2
			},
			_default: "swing"
		}, w.fx = tt.prototype.init, w.fx.step = {};
		var nt, rt, it = /^(?:toggle|show|hide)$/,
			ot = /queueHooks$/;

		function st() {
			rt && (!1 === s.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(st) : n.setTimeout(st, w.fx.interval), w.fx.tick())
		}

		function at() {
			return n.setTimeout(function () {
				nt = void 0
			}), nt = Date.now()
		}

		function ut(e, t) {
			var n, r = 0,
				i = {
					height: e
				};
			for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = oe[r])] = i["padding" + n] = e;
			return t && (i.opacity = i.width = e), i
		}

		function lt(e, t, n) {
			for (var r, i = (ct.tweeners[t] || []).concat(ct.tweeners["*"]), o = 0, s = i.length; o < s; o++)
				if (r = i[o].call(n, t, e)) return r
		}

		function ct(e, t, n) {
			var r, i, o = 0,
				s = ct.prefilters.length,
				a = w.Deferred().always(function () {
					delete u.elem
				}),
				u = function () {
					if (i) return !1;
					for (var t = nt || at(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, s = l.tweens.length; o < s; o++) l.tweens[o].run(r);
					return a.notifyWith(e, [l, r, n]), r < 1 && s ? n : (s || a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l]), !1)
				},
				l = a.promise({
					elem: e,
					props: w.extend({}, t),
					opts: w.extend(!0, {
						specialEasing: {},
						easing: w.easing._default
					}, n),
					originalProperties: t,
					originalOptions: n,
					startTime: nt || at(),
					duration: n.duration,
					tweens: [],
					createTween: function (t, n) {
						var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
						return l.tweens.push(r), r
					},
					stop: function (t) {
						var n = 0,
							r = t ? l.tweens.length : 0;
						if (i) return this;
						for (i = !0; n < r; n++) l.tweens[n].run(1);
						return t ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t])) : a.rejectWith(e, [l, t]), this
					}
				}),
				c = l.props;
			for (! function (e, t) {
					var n, r, i, o, s;
					for (n in e)
						if (i = t[r = K(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (s = w.cssHooks[r]) && "expand" in s)
							for (n in o = s.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
						else t[r] = i
				}(c, l.opts.specialEasing); o < s; o++)
				if (r = ct.prefilters[o].call(l, e, c, l.opts)) return y(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
			return w.map(c, lt, l), y(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, {
				elem: e,
				anim: l,
				queue: l.opts.queue
			})), l
		}
		w.Animation = w.extend(ct, {
				tweeners: {
					"*": [function (e, t) {
						var n = this.createTween(e, t);
						return ue(n.elem, e, ie.exec(t), n), n
					}]
				},
				tweener: function (e, t) {
					y(e) ? (t = e, e = ["*"]) : e = e.match(q);
					for (var n, r = 0, i = e.length; r < i; r++) n = e[r], ct.tweeners[n] = ct.tweeners[n] || [], ct.tweeners[n].unshift(t)
				},
				prefilters: [function (e, t, n) {
					var r, i, o, s, a, u, l, c, d = "width" in t || "height" in t,
						f = this,
						p = {},
						h = e.style,
						m = e.nodeType && se(e),
						g = Q.get(e, "fxshow");
					for (r in n.queue || (null == (s = w._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
							s.unqueued || a()
						}), s.unqueued++, f.always(function () {
							f.always(function () {
								s.unqueued--, w.queue(e, "fx").length || s.empty.fire()
							})
						})), t)
						if (i = t[r], it.test(i)) {
							if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
								if ("show" !== i || !g || void 0 === g[r]) continue;
								m = !0
							}
							p[r] = g && g[r] || w.style(e, r)
						} if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(p))
						for (r in d && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = g && g.display) && (l = Q.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (de([e], !0), l = e.style.display || l, c = w.css(e, "display"), de([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (f.done(function () {
								h.display = l
							}), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.always(function () {
								h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
							})), u = !1, p) u || (g ? "hidden" in g && (m = g.hidden) : g = Q.access(e, "fxshow", {
							display: l
						}), o && (g.hidden = !m), m && de([e], !0), f.done(function () {
							for (r in m || de([e]), Q.remove(e, "fxshow"), p) w.style(e, r, p[r])
						})), u = lt(m ? g[r] : 0, r, f), r in g || (g[r] = u.start, m && (u.end = u.start, u.start = 0))
				}],
				prefilter: function (e, t) {
					t ? ct.prefilters.unshift(e) : ct.prefilters.push(e)
				}
			}), w.speed = function (e, t, n) {
				var r = e && "object" == typeof e ? w.extend({}, e) : {
					complete: n || !n && t || y(e) && e,
					duration: e,
					easing: n && t || t && !y(t) && t
				};
				return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
					y(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue)
				}, r
			}, w.fn.extend({
				fadeTo: function (e, t, n, r) {
					return this.filter(se).css("opacity", 0).show().end().animate({
						opacity: t
					}, e, n, r)
				},
				animate: function (e, t, n, r) {
					var i = w.isEmptyObject(e),
						o = w.speed(t, n, r),
						s = function () {
							var t = ct(this, w.extend({}, e), o);
							(i || Q.get(this, "finish")) && t.stop(!0)
						};
					return s.finish = s, i || !1 === o.queue ? this.each(s) : this.queue(o.queue, s)
				},
				stop: function (e, t, n) {
					var r = function (e) {
						var t = e.stop;
						delete e.stop, t(n)
					};
					return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
						var t = !0,
							i = null != e && e + "queueHooks",
							o = w.timers,
							s = Q.get(this);
						if (i) s[i] && s[i].stop && r(s[i]);
						else
							for (i in s) s[i] && s[i].stop && ot.test(i) && r(s[i]);
						for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
						!t && n || w.dequeue(this, e)
					})
				},
				finish: function (e) {
					return !1 !== e && (e = e || "fx"), this.each(function () {
						var t, n = Q.get(this),
							r = n[e + "queue"],
							i = n[e + "queueHooks"],
							o = w.timers,
							s = r ? r.length : 0;
						for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
						for (t = 0; t < s; t++) r[t] && r[t].finish && r[t].finish.call(this);
						delete n.finish
					})
				}
			}), w.each(["toggle", "show", "hide"], function (e, t) {
				var n = w.fn[t];
				w.fn[t] = function (e, r, i) {
					return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i)
				}
			}), w.each({
				slideDown: ut("show"),
				slideUp: ut("hide"),
				slideToggle: ut("toggle"),
				fadeIn: {
					opacity: "show"
				},
				fadeOut: {
					opacity: "hide"
				},
				fadeToggle: {
					opacity: "toggle"
				}
			}, function (e, t) {
				w.fn[e] = function (e, n, r) {
					return this.animate(t, e, n, r)
				}
			}), w.timers = [], w.fx.tick = function () {
				var e, t = 0,
					n = w.timers;
				for (nt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
				n.length || w.fx.stop(), nt = void 0
			}, w.fx.timer = function (e) {
				w.timers.push(e), w.fx.start()
			}, w.fx.interval = 13, w.fx.start = function () {
				rt || (rt = !0, st())
			}, w.fx.stop = function () {
				rt = null
			}, w.fx.speeds = {
				slow: 600,
				fast: 200,
				_default: 400
			}, w.fn.delay = function (e, t) {
				return e = w.fx && w.fx.speeds[e] || e, t = t || "fx", this.queue(t, function (t, r) {
					var i = n.setTimeout(t, e);
					r.stop = function () {
						n.clearTimeout(i)
					}
				})
			},
			function () {
				var e = s.createElement("input"),
					t = s.createElement("select").appendChild(s.createElement("option"));
				e.type = "checkbox", v.checkOn = "" !== e.value, v.optSelected = t.selected, (e = s.createElement("input")).value = "t", e.type = "radio", v.radioValue = "t" === e.value
			}();
		var dt, ft = w.expr.attrHandle;
		w.fn.extend({
			attr: function (e, t) {
				return U(this, w.attr, e, t, arguments.length > 1)
			},
			removeAttr: function (e) {
				return this.each(function () {
					w.removeAttr(this, e)
				})
			}
		}), w.extend({
			attr: function (e, t, n) {
				var r, i, o = e.nodeType;
				if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r)
			},
			attrHooks: {
				type: {
					set: function (e, t) {
						if (!v.radioValue && "radio" === t && O(e, "input")) {
							var n = e.value;
							return e.setAttribute("type", t), n && (e.value = n), t
						}
					}
				}
			},
			removeAttr: function (e, t) {
				var n, r = 0,
					i = t && t.match(q);
				if (i && 1 === e.nodeType)
					for (; n = i[r++];) e.removeAttribute(n)
			}
		}), dt = {
			set: function (e, t, n) {
				return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n
			}
		}, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
			var n = ft[t] || w.find.attr;
			ft[t] = function (e, t, r) {
				var i, o, s = t.toLowerCase();
				return r || (o = ft[s], ft[s] = i, i = null != n(e, t, r) ? s : null, ft[s] = o), i
			}
		});
		var pt = /^(?:input|select|textarea|button)$/i,
			ht = /^(?:a|area)$/i;

		function mt(e) {
			return (e.match(q) || []).join(" ")
		}

		function gt(e) {
			return e.getAttribute && e.getAttribute("class") || ""
		}

		function vt(e) {
			return Array.isArray(e) ? e : "string" == typeof e && e.match(q) || []
		}
		w.fn.extend({
			prop: function (e, t) {
				return U(this, w.prop, e, t, arguments.length > 1)
			},
			removeProp: function (e) {
				return this.each(function () {
					delete this[w.propFix[e] || e]
				})
			}
		}), w.extend({
			prop: function (e, t, n) {
				var r, i, o = e.nodeType;
				if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
			},
			propHooks: {
				tabIndex: {
					get: function (e) {
						var t = w.find.attr(e, "tabindex");
						return t ? parseInt(t, 10) : pt.test(e.nodeName) || ht.test(e.nodeName) && e.href ? 0 : -1
					}
				}
			},
			propFix: {
				for: "htmlFor",
				class: "className"
			}
		}), v.optSelected || (w.propHooks.selected = {
			get: function (e) {
				var t = e.parentNode;
				return t && t.parentNode && t.parentNode.selectedIndex, null
			},
			set: function (e) {
				var t = e.parentNode;
				t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
			}
		}), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
			w.propFix[this.toLowerCase()] = this
		}), w.fn.extend({
			addClass: function (e) {
				var t, n, r, i, o, s, a, u = 0;
				if (y(e)) return this.each(function (t) {
					w(this).addClass(e.call(this, t, gt(this)))
				});
				if ((t = vt(e)).length)
					for (; n = this[u++];)
						if (i = gt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
							for (s = 0; o = t[s++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
							i !== (a = mt(r)) && n.setAttribute("class", a)
						} return this
			},
			removeClass: function (e) {
				var t, n, r, i, o, s, a, u = 0;
				if (y(e)) return this.each(function (t) {
					w(this).removeClass(e.call(this, t, gt(this)))
				});
				if (!arguments.length) return this.attr("class", "");
				if ((t = vt(e)).length)
					for (; n = this[u++];)
						if (i = gt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
							for (s = 0; o = t[s++];)
								for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
							i !== (a = mt(r)) && n.setAttribute("class", a)
						} return this
			},
			toggleClass: function (e, t) {
				var n = typeof e,
					r = "string" === n || Array.isArray(e);
				return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : y(e) ? this.each(function (n) {
					w(this).toggleClass(e.call(this, n, gt(this), t), t)
				}) : this.each(function () {
					var t, i, o, s;
					if (r)
						for (i = 0, o = w(this), s = vt(e); t = s[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
					else void 0 !== e && "boolean" !== n || ((t = gt(this)) && Q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Q.get(this, "__className__") || ""))
				})
			},
			hasClass: function (e) {
				var t, n, r = 0;
				for (t = " " + e + " "; n = this[r++];)
					if (1 === n.nodeType && (" " + mt(gt(n)) + " ").indexOf(t) > -1) return !0;
				return !1
			}
		});
		var yt = /\r/g;
		w.fn.extend({
			val: function (e) {
				var t, n, r, i = this[0];
				return arguments.length ? (r = y(e), this.each(function (n) {
					var i;
					1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function (e) {
						return null == e ? "" : e + ""
					})), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
				})) : i ? (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(yt, "") : null == n ? "" : n : void 0
			}
		}), w.extend({
			valHooks: {
				option: {
					get: function (e) {
						var t = w.find.attr(e, "value");
						return null != t ? t : mt(w.text(e))
					}
				},
				select: {
					get: function (e) {
						var t, n, r, i = e.options,
							o = e.selectedIndex,
							s = "select-one" === e.type,
							a = s ? null : [],
							u = s ? o + 1 : i.length;
						for (r = o < 0 ? u : s ? o : 0; r < u; r++)
							if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !O(n.parentNode, "optgroup"))) {
								if (t = w(n).val(), s) return t;
								a.push(t)
							} return a
					},
					set: function (e, t) {
						for (var n, r, i = e.options, o = w.makeArray(t), s = i.length; s--;)((r = i[s]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
						return n || (e.selectedIndex = -1), o
					}
				}
			}
		}), w.each(["radio", "checkbox"], function () {
			w.valHooks[this] = {
				set: function (e, t) {
					if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1
				}
			}, v.checkOn || (w.valHooks[this].get = function (e) {
				return null === e.getAttribute("value") ? "on" : e.value
			})
		}), v.focusin = "onfocusin" in n;
		var xt = /^(?:focusinfocus|focusoutblur)$/,
			bt = function (e) {
				e.stopPropagation()
			};
		w.extend(w.event, {
			trigger: function (e, t, r, i) {
				var o, a, u, l, c, d, f, p, m = [r || s],
					g = h.call(e, "type") ? e.type : e,
					v = h.call(e, "namespace") ? e.namespace.split(".") : [];
				if (a = p = u = r = r || s, 3 !== r.nodeType && 8 !== r.nodeType && !xt.test(g + w.event.triggered) && (g.indexOf(".") > -1 && (g = (v = g.split(".")).shift(), v.sort()), c = g.indexOf(":") < 0 && "on" + g, (e = e[w.expando] ? e : new w.Event(g, "object" == typeof e && e)).isTrigger = i ? 2 : 3, e.namespace = v.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), t = null == t ? [e] : w.makeArray(t, [e]), f = w.event.special[g] || {}, i || !f.trigger || !1 !== f.trigger.apply(r, t))) {
					if (!i && !f.noBubble && !x(r)) {
						for (l = f.delegateType || g, xt.test(l + g) || (a = a.parentNode); a; a = a.parentNode) m.push(a), u = a;
						u === (r.ownerDocument || s) && m.push(u.defaultView || u.parentWindow || n)
					}
					for (o = 0;
						(a = m[o++]) && !e.isPropagationStopped();) p = a, e.type = o > 1 ? l : f.bindType || g, (d = (Q.get(a, "events") || {})[e.type] && Q.get(a, "handle")) && d.apply(a, t), (d = c && a[c]) && d.apply && Y(a) && (e.result = d.apply(a, t), !1 === e.result && e.preventDefault());
					return e.type = g, i || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(m.pop(), t) || !Y(r) || c && y(r[g]) && !x(r) && ((u = r[c]) && (r[c] = null), w.event.triggered = g, e.isPropagationStopped() && p.addEventListener(g, bt), r[g](), e.isPropagationStopped() && p.removeEventListener(g, bt), w.event.triggered = void 0, u && (r[c] = u)), e.result
				}
			},
			simulate: function (e, t, n) {
				var r = w.extend(new w.Event, n, {
					type: e,
					isSimulated: !0
				});
				w.event.trigger(r, null, t)
			}
		}), w.fn.extend({
			trigger: function (e, t) {
				return this.each(function () {
					w.event.trigger(e, t, this)
				})
			},
			triggerHandler: function (e, t) {
				var n = this[0];
				if (n) return w.event.trigger(e, t, n, !0)
			}
		}), v.focusin || w.each({
			focus: "focusin",
			blur: "focusout"
		}, function (e, t) {
			var n = function (e) {
				w.event.simulate(t, e.target, w.event.fix(e))
			};
			w.event.special[t] = {
				setup: function () {
					var r = this.ownerDocument || this,
						i = Q.access(r, t);
					i || r.addEventListener(e, n, !0), Q.access(r, t, (i || 0) + 1)
				},
				teardown: function () {
					var r = this.ownerDocument || this,
						i = Q.access(r, t) - 1;
					i ? Q.access(r, t, i) : (r.removeEventListener(e, n, !0), Q.remove(r, t))
				}
			}
		});
		var Tt = n.location,
			_t = Date.now(),
			wt = /\?/;
		w.parseXML = function (e) {
			var t;
			if (!e || "string" != typeof e) return null;
			try {
				t = (new n.DOMParser).parseFromString(e, "text/xml")
			}
			catch (e) {
				t = void 0
			}
			return t && !t.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + e), t
		};
		var Ct = /\[\]$/,
			Et = /\r?\n/g,
			At = /^(?:submit|button|image|reset|file)$/i,
			kt = /^(?:input|select|textarea|keygen)/i;

		function St(e, t, n, r) {
			var i;
			if (Array.isArray(t)) w.each(t, function (t, i) {
				n || Ct.test(e) ? r(e, i) : St(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
			});
			else if (n || "object" !== _(t)) r(e, t);
			else
				for (i in t) St(e + "[" + i + "]", t[i], n, r)
		}
		w.param = function (e, t) {
			var n, r = [],
				i = function (e, t) {
					var n = y(t) ? t() : t;
					r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
				};
			if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () {
				i(this.name, this.value)
			});
			else
				for (n in e) St(n, e[n], t, i);
			return r.join("&")
		}, w.fn.extend({
			serialize: function () {
				return w.param(this.serializeArray())
			},
			serializeArray: function () {
				return this.map(function () {
					var e = w.prop(this, "elements");
					return e ? w.makeArray(e) : this
				}).filter(function () {
					var e = this.type;
					return this.name && !w(this).is(":disabled") && kt.test(this.nodeName) && !At.test(e) && (this.checked || !fe.test(e))
				}).map(function (e, t) {
					var n = w(this).val();
					return null == n ? null : Array.isArray(n) ? w.map(n, function (e) {
						return {
							name: t.name,
							value: e.replace(Et, "\r\n")
						}
					}) : {
						name: t.name,
						value: n.replace(Et, "\r\n")
					}
				}).get()
			}
		});
		var It = /%20/g,
			Ot = /#.*$/,
			Dt = /([?&])_=[^&]*/,
			Nt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
			Mt = /^(?:GET|HEAD)$/,
			Ht = /^\/\//,
			Lt = {},
			jt = {},
			Rt = "*/".concat("*"),
			qt = s.createElement("a");

		function Pt(e) {
			return function (t, n) {
				"string" != typeof t && (n = t, t = "*");
				var r, i = 0,
					o = t.toLowerCase().match(q) || [];
				if (y(n))
					for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
			}
		}

		function Ft(e, t, n, r) {
			var i = {},
				o = e === jt;

			function s(a) {
				var u;
				return i[a] = !0, w.each(e[a] || [], function (e, a) {
					var l = a(t, n, r);
					return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), s(l), !1)
				}), u
			}
			return s(t.dataTypes[0]) || !i["*"] && s("*")
		}

		function Bt(e, t) {
			var n, r, i = w.ajaxSettings.flatOptions || {};
			for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
			return r && w.extend(!0, e, r), e
		}
		qt.href = Tt.href, w.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: Tt.href,
				type: "GET",
				isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": Rt,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": JSON.parse,
					"text xml": w.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function (e, t) {
				return t ? Bt(Bt(e, w.ajaxSettings), t) : Bt(w.ajaxSettings, e)
			},
			ajaxPrefilter: Pt(Lt),
			ajaxTransport: Pt(jt),
			ajax: function (e, t) {
				"object" == typeof e && (t = e, e = void 0), t = t || {};
				var r, i, o, a, u, l, c, d, f, p, h = w.ajaxSetup({}, t),
					m = h.context || h,
					g = h.context && (m.nodeType || m.jquery) ? w(m) : w.event,
					v = w.Deferred(),
					y = w.Callbacks("once memory"),
					x = h.statusCode || {},
					b = {},
					T = {},
					_ = "canceled",
					C = {
						readyState: 0,
						getResponseHeader: function (e) {
							var t;
							if (c) {
								if (!a)
									for (a = {}; t = Nt.exec(o);) a[t[1].toLowerCase()] = t[2];
								t = a[e.toLowerCase()]
							}
							return null == t ? null : t
						},
						getAllResponseHeaders: function () {
							return c ? o : null
						},
						setRequestHeader: function (e, t) {
							return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this
						},
						overrideMimeType: function (e) {
							return null == c && (h.mimeType = e), this
						},
						statusCode: function (e) {
							var t;
							if (e)
								if (c) C.always(e[C.status]);
								else
									for (t in e) x[t] = [x[t], e[t]];
							return this
						},
						abort: function (e) {
							var t = e || _;
							return r && r.abort(t), E(0, t), this
						}
					};
				if (v.promise(C), h.url = ((e || h.url || Tt.href) + "").replace(Ht, Tt.protocol + "//"), h.type = t.method || t.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(q) || [""], null == h.crossDomain) {
					l = s.createElement("a");
					try {
						l.href = h.url, l.href = l.href, h.crossDomain = qt.protocol + "//" + qt.host != l.protocol + "//" + l.host
					}
					catch (e) {
						h.crossDomain = !0
					}
				}
				if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), Ft(Lt, h, t, C), c) return C;
				for (f in (d = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), i = h.url.replace(Ot, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(It, "+")) : (p = h.url.slice(i.length), h.data && (h.processData || "string" == typeof h.data) && (i += (wt.test(i) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (i = i.replace(Dt, "$1"), p = (wt.test(i) ? "&" : "?") + "_=" + _t++ + p), h.url = i + p), h.ifModified && (w.lastModified[i] && C.setRequestHeader("If-Modified-Since", w.lastModified[i]), w.etag[i] && C.setRequestHeader("If-None-Match", w.etag[i])), (h.data && h.hasContent && !1 !== h.contentType || t.contentType) && C.setRequestHeader("Content-Type", h.contentType), C.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : h.accepts["*"]), h.headers) C.setRequestHeader(f, h.headers[f]);
				if (h.beforeSend && (!1 === h.beforeSend.call(m, C, h) || c)) return C.abort();
				if (_ = "abort", y.add(h.complete), C.done(h.success), C.fail(h.error), r = Ft(jt, h, t, C)) {
					if (C.readyState = 1, d && g.trigger("ajaxSend", [C, h]), c) return C;
					h.async && h.timeout > 0 && (u = n.setTimeout(function () {
						C.abort("timeout")
					}, h.timeout));
					try {
						c = !1, r.send(b, E)
					}
					catch (e) {
						if (c) throw e;
						E(-1, e)
					}
				}
				else E(-1, "No Transport");

				function E(e, t, s, a) {
					var l, f, p, b, T, _ = t;
					c || (c = !0, u && n.clearTimeout(u), r = void 0, o = a || "", C.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || 304 === e, s && (b = function (e, t, n) {
						for (var r, i, o, s, a = e.contents, u = e.dataTypes;
							"*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
						if (r)
							for (i in a)
								if (a[i] && a[i].test(r)) {
									u.unshift(i);
									break
								} if (u[0] in n) o = u[0];
						else {
							for (i in n) {
								if (!u[0] || e.converters[i + " " + u[0]]) {
									o = i;
									break
								}
								s || (s = i)
							}
							o = o || s
						}
						if (o) return o !== u[0] && u.unshift(o), n[o]
					}(h, C, s)), b = function (e, t, n, r) {
						var i, o, s, a, u, l = {},
							c = e.dataTypes.slice();
						if (c[1])
							for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
						for (o = c.shift(); o;)
							if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
								if ("*" === o) o = u;
								else if ("*" !== u && u !== o) {
							if (!(s = l[u + " " + o] || l["* " + o]))
								for (i in l)
									if ((a = i.split(" "))[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
										!0 === s ? s = l[i] : !0 !== l[i] && (o = a[0], c.unshift(a[1]));
										break
									} if (!0 !== s)
								if (s && e.throws) t = s(t);
								else try {
									t = s(t)
								}
							catch (e) {
								return {
									state: "parsererror",
									error: s ? e : "No conversion from " + u + " to " + o
								}
							}
						}
						return {
							state: "success",
							data: t
						}
					}(h, b, C, l), l ? (h.ifModified && ((T = C.getResponseHeader("Last-Modified")) && (w.lastModified[i] = T), (T = C.getResponseHeader("etag")) && (w.etag[i] = T)), 204 === e || "HEAD" === h.type ? _ = "nocontent" : 304 === e ? _ = "notmodified" : (_ = b.state, f = b.data, l = !(p = b.error))) : (p = _, !e && _ || (_ = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (t || _) + "", l ? v.resolveWith(m, [f, _, C]) : v.rejectWith(m, [C, _, p]), C.statusCode(x), x = void 0, d && g.trigger(l ? "ajaxSuccess" : "ajaxError", [C, h, l ? f : p]), y.fireWith(m, [C, _]), d && (g.trigger("ajaxComplete", [C, h]), --w.active || w.event.trigger("ajaxStop")))
				}
				return C
			},
			getJSON: function (e, t, n) {
				return w.get(e, t, n, "json")
			},
			getScript: function (e, t) {
				return w.get(e, void 0, t, "script")
			}
		}), w.each(["get", "post"], function (e, t) {
			w[t] = function (e, n, r, i) {
				return y(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({
					url: e,
					type: t,
					dataType: i,
					data: n,
					success: r
				}, w.isPlainObject(e) && e))
			}
		}), w._evalUrl = function (e) {
			return w.ajax({
				url: e,
				type: "GET",
				dataType: "script",
				cache: !0,
				async: !1,
				global: !1,
				throws: !0
			})
		}, w.fn.extend({
			wrapAll: function (e) {
				var t;
				return this[0] && (y(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
					for (var e = this; e.firstElementChild;) e = e.firstElementChild;
					return e
				}).append(this)), this
			},
			wrapInner: function (e) {
				return y(e) ? this.each(function (t) {
					w(this).wrapInner(e.call(this, t))
				}) : this.each(function () {
					var t = w(this),
						n = t.contents();
					n.length ? n.wrapAll(e) : t.append(e)
				})
			},
			wrap: function (e) {
				var t = y(e);
				return this.each(function (n) {
					w(this).wrapAll(t ? e.call(this, n) : e)
				})
			},
			unwrap: function (e) {
				return this.parent(e).not("body").each(function () {
					w(this).replaceWith(this.childNodes)
				}), this
			}
		}), w.expr.pseudos.hidden = function (e) {
			return !w.expr.pseudos.visible(e)
		}, w.expr.pseudos.visible = function (e) {
			return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
		}, w.ajaxSettings.xhr = function () {
			try {
				return new n.XMLHttpRequest
			}
			catch (e) {}
		};
		var Wt = {
				0: 200,
				1223: 204
			},
			$t = w.ajaxSettings.xhr();
		v.cors = !!$t && "withCredentials" in $t, v.ajax = $t = !!$t, w.ajaxTransport(function (e) {
			var t, r;
			if (v.cors || $t && !e.crossDomain) return {
				send: function (i, o) {
					var s, a = e.xhr();
					if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
						for (s in e.xhrFields) a[s] = e.xhrFields[s];
					for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) a.setRequestHeader(s, i[s]);
					t = function (e) {
						return function () {
							t && (t = r = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? o(0, "error") : o(a.status, a.statusText) : o(Wt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
								binary: a.response
							} : {
								text: a.responseText
							}, a.getAllResponseHeaders()))
						}
					}, a.onload = t(), r = a.onerror = a.ontimeout = t("error"), void 0 !== a.onabort ? a.onabort = r : a.onreadystatechange = function () {
						4 === a.readyState && n.setTimeout(function () {
							t && r()
						})
					}, t = t("abort");
					try {
						a.send(e.hasContent && e.data || null)
					}
					catch (e) {
						if (t) throw e
					}
				},
				abort: function () {
					t && t()
				}
			}
		}), w.ajaxPrefilter(function (e) {
			e.crossDomain && (e.contents.script = !1)
		}), w.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function (e) {
					return w.globalEval(e), e
				}
			}
		}), w.ajaxPrefilter("script", function (e) {
			void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
		}), w.ajaxTransport("script", function (e) {
			var t, n;
			if (e.crossDomain) return {
				send: function (r, i) {
					t = w("<script>").prop({
						charset: e.scriptCharset,
						src: e.url
					}).on("load error", n = function (e) {
						t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
					}), s.head.appendChild(t[0])
				},
				abort: function () {
					n && n()
				}
			}
		});
		var Gt, Ut = [],
			zt = /(=)\?(?=&|$)|\?\?/;
		w.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function () {
				var e = Ut.pop() || w.expando + "_" + _t++;
				return this[e] = !0, e
			}
		}), w.ajaxPrefilter("json jsonp", function (e, t, r) {
			var i, o, s, a = !1 !== e.jsonp && (zt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && zt.test(e.data) && "data");
			if (a || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = y(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(zt, "$1" + i) : !1 !== e.jsonp && (e.url += (wt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
				return s || w.error(i + " was not called"), s[0]
			}, e.dataTypes[0] = "json", o = n[i], n[i] = function () {
				s = arguments
			}, r.always(function () {
				void 0 === o ? w(n).removeProp(i) : n[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, Ut.push(i)), s && y(o) && o(s[0]), s = o = void 0
			}), "script"
		}), v.createHTMLDocument = ((Gt = s.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Gt.childNodes.length), w.parseHTML = function (e, t, n) {
			return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (v.createHTMLDocument ? ((r = (t = s.implementation.createHTMLDocument("")).createElement("base")).href = s.location.href, t.head.appendChild(r)) : t = s), i = D.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = Te([e], t, o), o && o.length && w(o).remove(), w.merge([], i.childNodes)));
			var r, i, o
		}, w.fn.load = function (e, t, n) {
			var r, i, o, s = this,
				a = e.indexOf(" ");
			return a > -1 && (r = mt(e.slice(a)), e = e.slice(0, a)), y(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), s.length > 0 && w.ajax({
				url: e,
				type: i || "GET",
				dataType: "html",
				data: t
			}).done(function (e) {
				o = arguments, s.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e)
			}).always(n && function (e, t) {
				s.each(function () {
					n.apply(this, o || [e.responseText, t, e])
				})
			}), this
		}, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
			w.fn[t] = function (e) {
				return this.on(t, e)
			}
		}), w.expr.pseudos.animated = function (e) {
			return w.grep(w.timers, function (t) {
				return e === t.elem
			}).length
		}, w.offset = {
			setOffset: function (e, t, n) {
				var r, i, o, s, a, u, l = w.css(e, "position"),
					c = w(e),
					d = {};
				"static" === l && (e.style.position = "relative"), a = c.offset(), o = w.css(e, "top"), u = w.css(e, "left"), ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1 ? (s = (r = c.position()).top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), y(t) && (t = t.call(e, n, w.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + i), "using" in t ? t.using.call(e, d) : c.css(d)
			}
		}, w.fn.extend({
			offset: function (e) {
				if (arguments.length) return void 0 === e ? this : this.each(function (t) {
					w.offset.setOffset(this, e, t)
				});
				var t, n, r = this[0];
				return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
					top: t.top + n.pageYOffset,
					left: t.left + n.pageXOffset
				}) : {
					top: 0,
					left: 0
				} : void 0
			},
			position: function () {
				if (this[0]) {
					var e, t, n, r = this[0],
						i = {
							top: 0,
							left: 0
						};
					if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();
					else {
						for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position");) e = e.parentNode;
						e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0))
					}
					return {
						top: t.top - i.top - w.css(r, "marginTop", !0),
						left: t.left - i.left - w.css(r, "marginLeft", !0)
					}
				}
			},
			offsetParent: function () {
				return this.map(function () {
					for (var e = this.offsetParent; e && "static" === w.css(e, "position");) e = e.offsetParent;
					return e || _e
				})
			}
		}), w.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function (e, t) {
			var n = "pageYOffset" === t;
			w.fn[e] = function (r) {
				return U(this, function (e, r, i) {
					var o;
					if (x(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];
					o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i
				}, e, r, arguments.length)
			}
		}), w.each(["top", "left"], function (e, t) {
			w.cssHooks[t] = Ge(v.pixelPosition, function (e, n) {
				if (n) return n = $e(e, t), Fe.test(n) ? w(e).position()[t] + "px" : n
			})
		}), w.each({
			Height: "height",
			Width: "width"
		}, function (e, t) {
			w.each({
				padding: "inner" + e,
				content: t,
				"": "outer" + e
			}, function (n, r) {
				w.fn[r] = function (i, o) {
					var s = arguments.length && (n || "boolean" != typeof i),
						a = n || (!0 === i || !0 === o ? "margin" : "border");
					return U(this, function (t, n, i) {
						var o;
						return x(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, a) : w.style(t, n, i, a)
					}, t, s ? i : void 0, s)
				}
			})
		}), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
			w.fn[t] = function (e, n) {
				return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
			}
		}), w.fn.extend({
			hover: function (e, t) {
				return this.mouseenter(e).mouseleave(t || e)
			}
		}), w.fn.extend({
			bind: function (e, t, n) {
				return this.on(e, null, t, n)
			},
			unbind: function (e, t) {
				return this.off(e, null, t)
			},
			delegate: function (e, t, n, r) {
				return this.on(t, e, n, r)
			},
			undelegate: function (e, t, n) {
				return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
			}
		}), w.proxy = function (e, t) {
			var n, r, i;
			if ("string" == typeof t && (n = e[t], t = e, e = n), y(e)) return r = u.call(arguments, 2), (i = function () {
				return e.apply(t || this, r.concat(u.call(arguments)))
			}).guid = e.guid = e.guid || w.guid++, i
		}, w.holdReady = function (e) {
			e ? w.readyWait++ : w.ready(!0)
		}, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = O, w.isFunction = y, w.isWindow = x, w.camelCase = K, w.type = _, w.now = Date.now, w.isNumeric = function (e) {
			var t = w.type(e);
			return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
		}, void 0 === (r = function () {
			return w
		}.apply(t, [])) || (e.exports = r);
		var Xt = n.jQuery,
			Vt = n.$;
		return w.noConflict = function (e) {
			return n.$ === w && (n.$ = Vt), e && n.jQuery === w && (n.jQuery = Xt), w
		}, i || (n.jQuery = n.$ = w), w
	})
}, , , , , , , function (e, t, n) {}, function (e, t, n) {
	"use strict";
	var r = u(n(12)),
		i = n(7),
		o = u(n(11)),
		s = u(n(10)),
		a = u(n(9));

	function u(e) {
		return e && e.__esModule ? e : {
			default: e
		}
	}
	var l = (0, u(n(8)).default)();
	(0, r.default)("#language").text(l);
	var c = s.default.apiPrefix,
		d = (0, a.default)(),
		f = null,
		p = 0;
	window.location.hostname.includes(".khantribute.localgrid.de") && (c = "/apiv3/khantribute"), (0, r.default)(document).ready(function () {
		(0, r.default)("#nickname").text(d), localStorage.getItem("kaid") || (f = ("" + Math.random()).slice(2), localStorage.setItem("kaid", f)), f = localStorage.getItem("kaid"), r.default.getJSON(c + "/user/" + l, {
			client: f
		}, function (e) {
			console.log(e), p = e.num_votes, (0, r.default)("#score").text(p), d = e.nickname || d, (0, r.default)("#nickname").text(d)
		});
		var e = new i.MDCMenu(document.getElementById("menu"));
		(0, r.default)("#menu-button").click(function () {
			e.open = !e.open
		});
		var t = new i.MDCMenu(document.getElementById("lang-menu"));
		(0, r.default)("#lang-menu-button").click(function () {
			t.open = !t.open
		}), (0, r.default)("#lang-list").append(o.default.map(function (e) {
			var t = e.bld,
				n = e.name;
			return (0, r.default)('<li class="mdc-list-item" role="menuitem">' + n + "</li>").click(function () {
				null != window.location.hostname.match("([^.]+).khantribute.localgrid.de") && (window.location = "https://" + t + ".khantribute.localgrid.de")
			})
		})), (0, r.default)("#change-nick").click(function () {
			var e;
			0 === (e = prompt("Enter your new nickname") || d).length && (e = d), d = e, (0, r.default)("#nickname").text(e), r.default.getJSON(c + "/set-nickname/" + l, {
				client: f,
				nickname: e
			}, function (e) {})
		}), r.default.getJSON(c + "/leaderboard/" + l, {
			client: f
		}, function (e) {
			(0, r.default)("#leaderboard-container").append(e.map(function (e) {
				return (0, r.default)('<div class="leaderboard-entry"><span class="leaderboard-name">' + e.nickname + '</span><span class="leaderboard-score">' + e.num_votes + "</span></div>")
			}))
		})
	})
}, function (e, t, n) {
	n(20), e.exports = n(19)
}]);
//# sourceMappingURL=leaderboard.js.map