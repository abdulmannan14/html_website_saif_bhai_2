/*! For license information please see project.js.LICENSE.txt */
(() => {
  var t = {
      7312: (t) => {
        !(function () {
          var e = function (t, n) {
            var r = this;
            (e.count = (e.count || 0) + 1),
              (this.count = e.count),
              (this.isOpened = !1),
              (this.input = i(t)),
              this.input.setAttribute("autocomplete", "off"),
              this.input.setAttribute("aria-expanded", "false"),
              this.input.setAttribute(
                "aria-owns",
                "awesomplete_list_" + this.count
              ),
              this.input.setAttribute("role", "combobox"),
              (this.options = n = n || {}),
              (function (t, e, n) {
                for (var r in e) {
                  var i = e[r],
                    o = t.input.getAttribute("data-" + r.toLowerCase());
                  (t[r] =
                    "number" == typeof i
                      ? parseInt(o)
                      : !1 === i
                      ? null !== o
                      : i instanceof Function
                      ? null
                      : o),
                    t[r] || 0 === t[r] || (t[r] = r in n ? n[r] : i);
                }
              })(
                this,
                {
                  minChars: 2,
                  maxItems: 10,
                  autoFirst: !1,
                  data: e.DATA,
                  filter: e.FILTER_CONTAINS,
                  sort: !1 !== n.sort && e.SORT_BYLENGTH,
                  container: e.CONTAINER,
                  item: e.ITEM,
                  replace: e.REPLACE,
                  tabSelect: !1,
                },
                n
              ),
              (this.index = -1),
              (this.container = this.container(t)),
              (this.ul = i.create("ul", {
                hidden: "hidden",
                role: "listbox",
                id: "awesomplete_list_" + this.count,
                inside: this.container,
              })),
              (this.status = i.create("span", {
                className: "visually-hidden",
                role: "status",
                "aria-live": "assertive",
                "aria-atomic": !0,
                inside: this.container,
                textContent:
                  0 != this.minChars
                    ? "Type " +
                      this.minChars +
                      " or more characters for results."
                    : "Begin typing for results.",
              })),
              (this._events = {
                input: {
                  input: this.evaluate.bind(this),
                  blur: this.close.bind(this, { reason: "blur" }),
                  keydown: function (t) {
                    var e = t.keyCode;
                    r.opened &&
                      (13 === e && r.selected
                        ? (t.preventDefault(), r.select(void 0, void 0, t))
                        : 9 === e && r.selected && r.tabSelect
                        ? r.select(void 0, void 0, t)
                        : 27 === e
                        ? r.close({ reason: "esc" })
                        : (38 !== e && 40 !== e) ||
                          (t.preventDefault(),
                          r[38 === e ? "previous" : "next"]()));
                  },
                },
                form: { submit: this.close.bind(this, { reason: "submit" }) },
                ul: {
                  mousedown: function (t) {
                    t.preventDefault();
                  },
                  click: function (t) {
                    var e = t.target;
                    if (e !== this) {
                      for (; e && !/li/i.test(e.nodeName); ) e = e.parentNode;
                      e &&
                        0 === t.button &&
                        (t.preventDefault(), r.select(e, t.target, t));
                    }
                  },
                },
              }),
              i.bind(this.input, this._events.input),
              i.bind(this.input.form, this._events.form),
              i.bind(this.ul, this._events.ul),
              this.input.hasAttribute("list")
                ? ((this.list = "#" + this.input.getAttribute("list")),
                  this.input.removeAttribute("list"))
                : (this.list =
                    this.input.getAttribute("data-list") || n.list || []),
              e.all.push(this);
          };
          function n(t) {
            var e = Array.isArray(t)
              ? { label: t[0], value: t[1] }
              : "object" == typeof t && "label" in t && "value" in t
              ? t
              : { label: t, value: t };
            (this.label = e.label || e.value), (this.value = e.value);
          }
          (e.prototype = {
            set list(t) {
              if (Array.isArray(t)) this._list = t;
              else if ("string" == typeof t && t.indexOf(",") > -1)
                this._list = t.split(/\s*,\s*/);
              else if ((t = i(t)) && t.children) {
                var e = [];
                r.apply(t.children).forEach(function (t) {
                  if (!t.disabled) {
                    var n = t.textContent.trim(),
                      r = t.value || n,
                      i = t.label || n;
                    "" !== r && e.push({ label: i, value: r });
                  }
                }),
                  (this._list = e);
              }
              document.activeElement === this.input && this.evaluate();
            },
            get selected() {
              return this.index > -1;
            },
            get opened() {
              return this.isOpened;
            },
            close: function (t) {
              this.opened &&
                (this.input.setAttribute("aria-expanded", "false"),
                this.ul.setAttribute("hidden", ""),
                (this.isOpened = !1),
                (this.index = -1),
                this.status.setAttribute("hidden", ""),
                i.fire(this.input, "awesomplete-close", t || {}));
            },
            open: function () {
              this.input.setAttribute("aria-expanded", "true"),
                this.ul.removeAttribute("hidden"),
                (this.isOpened = !0),
                this.status.removeAttribute("hidden"),
                this.autoFirst && -1 === this.index && this.goto(0),
                i.fire(this.input, "awesomplete-open");
            },
            destroy: function () {
              if (
                (i.unbind(this.input, this._events.input),
                i.unbind(this.input.form, this._events.form),
                !this.options.container)
              ) {
                var t = this.container.parentNode;
                t.insertBefore(this.input, this.container),
                  t.removeChild(this.container);
              }
              this.input.removeAttribute("autocomplete"),
                this.input.removeAttribute("aria-autocomplete");
              var n = e.all.indexOf(this);
              -1 !== n && e.all.splice(n, 1);
            },
            next: function () {
              var t = this.ul.children.length;
              this.goto(this.index < t - 1 ? this.index + 1 : t ? 0 : -1);
            },
            previous: function () {
              var t = this.ul.children.length,
                e = this.index - 1;
              this.goto(this.selected && -1 !== e ? e : t - 1);
            },
            goto: function (t) {
              var e = this.ul.children;
              this.selected &&
                e[this.index].setAttribute("aria-selected", "false"),
                (this.index = t),
                t > -1 &&
                  e.length > 0 &&
                  (e[t].setAttribute("aria-selected", "true"),
                  (this.status.textContent =
                    e[t].textContent +
                    ", list item " +
                    (t + 1) +
                    " of " +
                    e.length),
                  this.input.setAttribute(
                    "aria-activedescendant",
                    this.ul.id + "_item_" + this.index
                  ),
                  (this.ul.scrollTop =
                    e[t].offsetTop - this.ul.clientHeight + e[t].clientHeight),
                  i.fire(this.input, "awesomplete-highlight", {
                    text: this.suggestions[this.index],
                  }));
            },
            select: function (t, e, n) {
              if (
                (t
                  ? (this.index = i.siblingIndex(t))
                  : (t = this.ul.children[this.index]),
                t)
              ) {
                var r = this.suggestions[this.index];
                i.fire(this.input, "awesomplete-select", {
                  text: r,
                  origin: e || t,
                  originalEvent: n,
                }) &&
                  (this.replace(r),
                  this.close({ reason: "select" }),
                  i.fire(this.input, "awesomplete-selectcomplete", {
                    text: r,
                    originalEvent: n,
                  }));
              }
            },
            evaluate: function () {
              var t = this,
                e = this.input.value;
              e.length >= this.minChars && this._list && this._list.length > 0
                ? ((this.index = -1),
                  (this.ul.innerHTML = ""),
                  (this.suggestions = this._list
                    .map(function (r) {
                      return new n(t.data(r, e));
                    })
                    .filter(function (n) {
                      return t.filter(n, e);
                    })),
                  !1 !== this.sort &&
                    (this.suggestions = this.suggestions.sort(this.sort)),
                  (this.suggestions = this.suggestions.slice(0, this.maxItems)),
                  this.suggestions.forEach(function (n, r) {
                    t.ul.appendChild(t.item(n, e, r));
                  }),
                  0 === this.ul.children.length
                    ? ((this.status.textContent = "No results found"),
                      this.close({ reason: "nomatches" }))
                    : (this.open(),
                      (this.status.textContent =
                        this.ul.children.length + " results found")))
                : (this.close({ reason: "nomatches" }),
                  (this.status.textContent = "No results found"));
            },
          }),
            (e.all = []),
            (e.FILTER_CONTAINS = function (t, e) {
              return RegExp(i.regExpEscape(e.trim()), "i").test(t);
            }),
            (e.FILTER_STARTSWITH = function (t, e) {
              return RegExp("^" + i.regExpEscape(e.trim()), "i").test(t);
            }),
            (e.SORT_BYLENGTH = function (t, e) {
              return t.length !== e.length
                ? t.length - e.length
                : t < e
                ? -1
                : 1;
            }),
            (e.CONTAINER = function (t) {
              return i.create("div", { className: "awesomplete", around: t });
            }),
            (e.ITEM = function (t, e, n) {
              var r =
                "" === e.trim()
                  ? t
                  : t.replace(
                      RegExp(i.regExpEscape(e.trim()), "gi"),
                      "<mark>$&</mark>"
                    );
              return i.create("li", {
                innerHTML: r,
                role: "option",
                "aria-selected": "false",
                id: "awesomplete_list_" + this.count + "_item_" + n,
              });
            }),
            (e.REPLACE = function (t) {
              this.input.value = t.value;
            }),
            (e.DATA = function (t) {
              return t;
            }),
            Object.defineProperty(
              (n.prototype = Object.create(String.prototype)),
              "length",
              {
                get: function () {
                  return this.label.length;
                },
              }
            ),
            (n.prototype.toString = n.prototype.valueOf =
              function () {
                return "" + this.label;
              });
          var r = Array.prototype.slice;
          function i(t, e) {
            return "string" == typeof t
              ? (e || document).querySelector(t)
              : t || null;
          }
          function o(t, e) {
            return r.call((e || document).querySelectorAll(t));
          }
          function a() {
            o("input.awesomplete").forEach(function (t) {
              new e(t);
            });
          }
          (i.create = function (t, e) {
            var n = document.createElement(t);
            for (var r in e) {
              var o = e[r];
              if ("inside" === r) i(o).appendChild(n);
              else if ("around" === r) {
                var a = i(o);
                a.parentNode.insertBefore(n, a),
                  n.appendChild(a),
                  null != a.getAttribute("autofocus") && a.focus();
              } else r in n ? (n[r] = o) : n.setAttribute(r, o);
            }
            return n;
          }),
            (i.bind = function (t, e) {
              if (t)
                for (var n in e) {
                  var r = e[n];
                  n.split(/\s+/).forEach(function (e) {
                    t.addEventListener(e, r);
                  });
                }
            }),
            (i.unbind = function (t, e) {
              if (t)
                for (var n in e) {
                  var r = e[n];
                  n.split(/\s+/).forEach(function (e) {
                    t.removeEventListener(e, r);
                  });
                }
            }),
            (i.fire = function (t, e, n) {
              var r = document.createEvent("HTMLEvents");
              for (var i in (r.initEvent(e, !0, !0), n)) r[i] = n[i];
              return t.dispatchEvent(r);
            }),
            (i.regExpEscape = function (t) {
              return t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
            }),
            (i.siblingIndex = function (t) {
              for (var e = 0; (t = t.previousElementSibling); e++);
              return e;
            }),
            "undefined" != typeof self && (self.Awesomplete = e),
            "undefined" != typeof Document &&
              ("loading" !== document.readyState
                ? a()
                : document.addEventListener("DOMContentLoaded", a)),
            (e.$ = i),
            (e.$$ = o),
            t.exports && (t.exports = e);
        })();
      },
      1220: (t, e, n) => {
        "use strict";
        n.d(e, { Z: () => a });
        var r = n(8656);
        let i;
        const o = () => {
            const t = document.createElement("div"),
              e = document.querySelector("body");
            e.classList.add("covid-preamp-enabled"),
              t.classList.add("banner__covid"),
              e.insertBefore(t, e.firstChild),
              (() => {
                const t = document.createElement("div");
                t.classList.add("banner__copy"),
                  (t.innerHTML =
                    '\n  How COVID-19 affects your service.\n    <span class="banner__cta">\n      Learn More\n    </span>\n    <img src="/assets/images/angle-right-4974e07cde.svg" class="banner__svg" />');
                const e = document.querySelector(".banner__covid");
                e.insertBefore(t, e.firstChild);
              })(),
              (() => {
                const t = {
                    webElement: {
                      location:
                        -1 !==
                        window.location.pathname.indexOf(
                          "/shop/residential/electricity/TX/"
                        )
                          ? "Product Grid"
                          : "Landing Page",
                      elementType: "Banner",
                      text: "COVID Learn More",
                    },
                  },
                  e = document.querySelector(".banner__covid");
                document
                  .querySelector(".site-root")
                  .classList.add("cov-banner-preamp-active"),
                  e.addEventListener("click", () => {
                    (0, r.Z)("ElementClicked", t),
                      window.fuse(
                        "run",
                        [
                          {
                            pool: "w8rHzZDVBLTMndNhVUUsrB",
                            name: "ES-CHOOSE-FUSE-PERMA-BANNER",
                          },
                        ],
                        { metaKey: "" },
                        (t, e) =>
                          t
                            ? console.error("Fuse error", t)
                            : ((i = ((t) => {
                                const e = t
                                  .replace(/\D/g, "")
                                  .match(/^(\d{3})(\d{3})(\d{4})$/);
                                return e ? `1-${e[1]}-${e[2]}-${e[3]}` : null;
                              })(e[0].dnis)),
                              (() => {
                                const t =
                                  document.querySelector(".modal__wrapper");
                                if (t)
                                  t.classList.add("modal__wrapper--active");
                                else {
                                  const t = document.createElement("div"),
                                    e = document.querySelector("body");
                                  (e.style.position = "relative"),
                                    t.classList.add("modal__wrapper"),
                                    t.classList.add("modal__wrapper--active"),
                                    (t.innerHTML = `\n      <div class="modal__container">\n        <img src="/assets/images/icon-close-dark-0063a9945d.svg" class="modal__close-svg--dark" />\n        <div class="ul__wrapper">\n          <ul>\n            <li class="modal__copy">All providers are still turning on service with no delays.</li>\n            <li class="modal__copy">\n              Most homes can be set up remotely. We'll let you know if that’s the case for you.\n            </li>\n            <li class="modal__copy">\n              Texas has suspended non-payment shutoffs. To learn about flexible payment options,\n              please contact your provider at the number in your confirmation email.\n            </li>\n          </ul>\n        </div>\n        <div class="modal__copy fuse-number">\n          Other questions? We're here.\n          <span class="modal__bold">\n            Call\n            <a class="modal__bold" href="tel:${i}">\n              ${i}.\n            </a>\n          </span>\n        </div>\n        <button class="modal__button">\n          <span>\n            Close\n          </span>\n        </button>\n      </div>\n    `),
                                    e.insertBefore(t, e.firstChild),
                                    (() => {
                                      const t = document.querySelector(
                                          ".modal__close-svg--dark"
                                        ),
                                        e =
                                          document.querySelector(
                                            ".modal__button"
                                          );
                                      t &&
                                        t.addEventListener("click", () => {
                                          document
                                            .querySelector(".modal__wrapper")
                                            .classList.remove(
                                              "modal__wrapper--active"
                                            );
                                        }),
                                        e &&
                                          e.addEventListener("click", () => {
                                            document
                                              .querySelector(".modal__wrapper")
                                              .classList.remove(
                                                "modal__wrapper--active"
                                              );
                                          });
                                    })();
                                }
                              })())
                      );
                  });
              })();
          },
          a = () => {
            let t = 0;
            const e = setInterval(() => {
              window.cohesion &&
                (window.cohesion("preamp:done", () => {
                  window.showCovidBanner && o();
                }),
                clearInterval(e)),
                (t += 10),
                t > 4e3 && clearInterval(e);
            }, 10);
          };
      },
      8656: (t, e, n) => {
        "use strict";
        function r(t, e) {
          window.tagular &&
            window.tagular("beam", t, {
              "@type": `redventures.usertracking.v3.${t}`,
              ...e,
            });
        }
        n.d(e, { Z: () => r });
      },
      3771: () => {
        var t, e, n, r, i, o, a;
        for (
          t = document.getElementsByClassName("js-custom-select"), e = 0;
          e < t.length;
          e++
        ) {
          for (
            r = t[e].getElementsByTagName("select")[0],
              (i = document.createElement("DIV")).setAttribute(
                "class",
                "select-selected"
              ),
              i.innerHTML = r.options[r.selectedIndex].innerHTML,
              t[e].appendChild(i),
              (o = document.createElement("DIV")).setAttribute(
                "class",
                "select-items select-hide"
              ),
              n = 1;
            n < r.length;
            n++
          )
            ((a = document.createElement("DIV")).innerHTML =
              r.options[n].innerHTML),
              a.addEventListener("click", function (t) {
                var e, n, r, i, o;
                for (
                  i =
                    this.parentNode.parentNode.getElementsByTagName(
                      "select"
                    )[0],
                    o = this.parentNode.previousSibling,
                    n = 0;
                  n < i.length;
                  n++
                )
                  if (i.options[n].innerHTML == this.innerHTML) {
                    for (
                      i.selectedIndex = n,
                        o.innerHTML = this.innerHTML,
                        e =
                          this.parentNode.getElementsByClassName(
                            "same-as-selected"
                          ),
                        r = 0;
                      r < e.length;
                      r++
                    )
                      e[r].removeAttribute("class");
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                o.click();
              }),
              o.appendChild(a);
          t[e].appendChild(o),
            i.addEventListener("click", function (t) {
              t.stopPropagation(),
                s(this),
                this.nextSibling.classList.toggle("select-hide"),
                this.classList.toggle("select-arrow-active");
            });
        }
        function s(t) {
          var e,
            n,
            r,
            i = [];
          for (
            e = document.getElementsByClassName("select-items"),
              n = document.getElementsByClassName("select-selected"),
              r = 0;
            r < n.length;
            r++
          )
            t == n[r]
              ? i.push(r)
              : n[r].classList.remove("select-arrow-active");
          for (r = 0; r < e.length; r++)
            i.indexOf(r) && e[r].classList.add("select-hide");
        }
        document.addEventListener("click", s);
      },
      7059: function (t) {
        t.exports = (function () {
          "use strict";
          var t = "undefined" != typeof document && document.documentMode,
            e = {
              rootMargin: "0px",
              threshold: 0,
              load: function (e) {
                if ("picture" === e.nodeName.toLowerCase()) {
                  var n = e.querySelector("img"),
                    r = !1;
                  null === n && ((n = document.createElement("img")), (r = !0)),
                    t &&
                      e.getAttribute("data-iesrc") &&
                      (n.src = e.getAttribute("data-iesrc")),
                    e.getAttribute("data-alt") &&
                      (n.alt = e.getAttribute("data-alt")),
                    r && e.append(n);
                }
                if (
                  "video" === e.nodeName.toLowerCase() &&
                  !e.getAttribute("data-src") &&
                  e.children
                ) {
                  for (
                    var i = e.children, o = void 0, a = 0;
                    a <= i.length - 1;
                    a++
                  )
                    (o = i[a].getAttribute("data-src")) && (i[a].src = o);
                  e.load();
                }
                e.getAttribute("data-poster") &&
                  (e.poster = e.getAttribute("data-poster")),
                  e.getAttribute("data-src") &&
                    (e.src = e.getAttribute("data-src")),
                  e.getAttribute("data-srcset") &&
                    e.setAttribute("srcset", e.getAttribute("data-srcset"));
                var s = ",";
                if (
                  (e.getAttribute("data-background-delimiter") &&
                    (s = e.getAttribute("data-background-delimiter")),
                  e.getAttribute("data-background-image"))
                )
                  e.style.backgroundImage =
                    "url('" +
                    e
                      .getAttribute("data-background-image")
                      .split(s)
                      .join("'),url('") +
                    "')";
                else if (e.getAttribute("data-background-image-set")) {
                  var p = e.getAttribute("data-background-image-set").split(s),
                    c = p[0].substr(0, p[0].indexOf(" ")) || p[0];
                  (c = -1 === c.indexOf("url(") ? "url(" + c + ")" : c),
                    1 === p.length
                      ? (e.style.backgroundImage = c)
                      : e.setAttribute(
                          "style",
                          (e.getAttribute("style") || "") +
                            "background-image: " +
                            c +
                            "; background-image: -webkit-image-set(" +
                            p +
                            "); background-image: image-set(" +
                            p +
                            ")"
                        );
                }
                e.getAttribute("data-toggle-class") &&
                  e.classList.toggle(e.getAttribute("data-toggle-class"));
              },
              loaded: function () {},
            };
          function n(t) {
            t.setAttribute("data-loaded", !0);
          }
          var r = function (t) {
              return "true" === t.getAttribute("data-loaded");
            },
            i = function (t) {
              var e =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : document;
              return t instanceof Element
                ? [t]
                : t instanceof NodeList
                ? t
                : e.querySelectorAll(t);
            };
          return function () {
            var t,
              o,
              a =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : ".lozad",
              s =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              p = Object.assign({}, e, s),
              c = p.root,
              l = p.rootMargin,
              d = p.threshold,
              u = p.load,
              f = p.loaded,
              m = void 0;
            "undefined" != typeof window &&
              window.IntersectionObserver &&
              (m = new IntersectionObserver(
                ((t = u),
                (o = f),
                function (e, i) {
                  e.forEach(function (e) {
                    (0 < e.intersectionRatio || e.isIntersecting) &&
                      (i.unobserve(e.target),
                      r(e.target) || (t(e.target), n(e.target), o(e.target)));
                  });
                }),
                { root: c, rootMargin: l, threshold: d }
              ));
            for (var h, b = i(a, c), y = 0; y < b.length; y++)
              (h = b[y]).getAttribute("data-placeholder-background") &&
                (h.style.background = h.getAttribute(
                  "data-placeholder-background"
                ));
            return {
              observe: function () {
                for (var t = i(a, c), e = 0; e < t.length; e++)
                  r(t[e]) ||
                    (m ? m.observe(t[e]) : (u(t[e]), n(t[e]), f(t[e])));
              },
              triggerLoad: function (t) {
                r(t) || (u(t), n(t), f(t));
              },
              observer: m,
            };
          };
        })();
      },
    },
    e = {};
  function n(r) {
    var i = e[r];
    if (void 0 !== i) return i.exports;
    var o = (e[r] = { exports: {} });
    return t[r].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      "use strict";
      var t =
          ("undefined" != typeof globalThis && globalThis) ||
          ("undefined" != typeof self && self) ||
          (void 0 !== t && t),
        e = "URLSearchParams" in t,
        r = "Symbol" in t && "iterator" in Symbol,
        i =
          "FileReader" in t &&
          "Blob" in t &&
          (function () {
            try {
              return new Blob(), !0;
            } catch (t) {
              return !1;
            }
          })(),
        o = "FormData" in t,
        a = "ArrayBuffer" in t;
      if (a)
        var s = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]",
          ],
          p =
            ArrayBuffer.isView ||
            function (t) {
              return t && s.indexOf(Object.prototype.toString.call(t)) > -1;
            };
      function c(t) {
        if (
          ("string" != typeof t && (t = String(t)),
          /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t) || "" === t)
        )
          throw new TypeError(
            'Invalid character in header field name: "' + t + '"'
          );
        return t.toLowerCase();
      }
      function l(t) {
        return "string" != typeof t && (t = String(t)), t;
      }
      function d(t) {
        var e = {
          next: function () {
            var e = t.shift();
            return { done: void 0 === e, value: e };
          },
        };
        return (
          r &&
            (e[Symbol.iterator] = function () {
              return e;
            }),
          e
        );
      }
      function u(t) {
        (this.map = {}),
          t instanceof u
            ? t.forEach(function (t, e) {
                this.append(e, t);
              }, this)
            : Array.isArray(t)
            ? t.forEach(function (t) {
                this.append(t[0], t[1]);
              }, this)
            : t &&
              Object.getOwnPropertyNames(t).forEach(function (e) {
                this.append(e, t[e]);
              }, this);
      }
      function f(t) {
        if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
        t.bodyUsed = !0;
      }
      function m(t) {
        return new Promise(function (e, n) {
          (t.onload = function () {
            e(t.result);
          }),
            (t.onerror = function () {
              n(t.error);
            });
        });
      }
      function h(t) {
        var e = new FileReader(),
          n = m(e);
        return e.readAsArrayBuffer(t), n;
      }
      function b(t) {
        if (t.slice) return t.slice(0);
        var e = new Uint8Array(t.byteLength);
        return e.set(new Uint8Array(t)), e.buffer;
      }
      function y() {
        return (
          (this.bodyUsed = !1),
          (this._initBody = function (t) {
            var n;
            (this.bodyUsed = this.bodyUsed),
              (this._bodyInit = t),
              t
                ? "string" == typeof t
                  ? (this._bodyText = t)
                  : i && Blob.prototype.isPrototypeOf(t)
                  ? (this._bodyBlob = t)
                  : o && FormData.prototype.isPrototypeOf(t)
                  ? (this._bodyFormData = t)
                  : e && URLSearchParams.prototype.isPrototypeOf(t)
                  ? (this._bodyText = t.toString())
                  : a && i && (n = t) && DataView.prototype.isPrototypeOf(n)
                  ? ((this._bodyArrayBuffer = b(t.buffer)),
                    (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                  : a && (ArrayBuffer.prototype.isPrototypeOf(t) || p(t))
                  ? (this._bodyArrayBuffer = b(t))
                  : (this._bodyText = t = Object.prototype.toString.call(t))
                : (this._bodyText = ""),
              this.headers.get("content-type") ||
                ("string" == typeof t
                  ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                  : this._bodyBlob && this._bodyBlob.type
                  ? this.headers.set("content-type", this._bodyBlob.type)
                  : e &&
                    URLSearchParams.prototype.isPrototypeOf(t) &&
                    this.headers.set(
                      "content-type",
                      "application/x-www-form-urlencoded;charset=UTF-8"
                    ));
          }),
          i &&
            ((this.blob = function () {
              var t = f(this);
              if (t) return t;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer)
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData)
                throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]));
            }),
            (this.arrayBuffer = function () {
              return this._bodyArrayBuffer
                ? f(this) ||
                    (ArrayBuffer.isView(this._bodyArrayBuffer)
                      ? Promise.resolve(
                          this._bodyArrayBuffer.buffer.slice(
                            this._bodyArrayBuffer.byteOffset,
                            this._bodyArrayBuffer.byteOffset +
                              this._bodyArrayBuffer.byteLength
                          )
                        )
                      : Promise.resolve(this._bodyArrayBuffer))
                : this.blob().then(h);
            })),
          (this.text = function () {
            var t,
              e,
              n,
              r = f(this);
            if (r) return r;
            if (this._bodyBlob)
              return (
                (t = this._bodyBlob),
                (n = m((e = new FileReader()))),
                e.readAsText(t),
                n
              );
            if (this._bodyArrayBuffer)
              return Promise.resolve(
                (function (t) {
                  for (
                    var e = new Uint8Array(t), n = new Array(e.length), r = 0;
                    r < e.length;
                    r++
                  )
                    n[r] = String.fromCharCode(e[r]);
                  return n.join("");
                })(this._bodyArrayBuffer)
              );
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }),
          o &&
            (this.formData = function () {
              return this.text().then(w);
            }),
          (this.json = function () {
            return this.text().then(JSON.parse);
          }),
          this
        );
      }
      (u.prototype.append = function (t, e) {
        (t = c(t)), (e = l(e));
        var n = this.map[t];
        this.map[t] = n ? n + ", " + e : e;
      }),
        (u.prototype.delete = function (t) {
          delete this.map[c(t)];
        }),
        (u.prototype.get = function (t) {
          return (t = c(t)), this.has(t) ? this.map[t] : null;
        }),
        (u.prototype.has = function (t) {
          return this.map.hasOwnProperty(c(t));
        }),
        (u.prototype.set = function (t, e) {
          this.map[c(t)] = l(e);
        }),
        (u.prototype.forEach = function (t, e) {
          for (var n in this.map)
            this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this);
        }),
        (u.prototype.keys = function () {
          var t = [];
          return (
            this.forEach(function (e, n) {
              t.push(n);
            }),
            d(t)
          );
        }),
        (u.prototype.values = function () {
          var t = [];
          return (
            this.forEach(function (e) {
              t.push(e);
            }),
            d(t)
          );
        }),
        (u.prototype.entries = function () {
          var t = [];
          return (
            this.forEach(function (e, n) {
              t.push([n, e]);
            }),
            d(t)
          );
        }),
        r && (u.prototype[Symbol.iterator] = u.prototype.entries);
      var v = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
      function g(t, e) {
        if (!(this instanceof g))
          throw new TypeError(
            'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
          );
        var n,
          r,
          i = (e = e || {}).body;
        if (t instanceof g) {
          if (t.bodyUsed) throw new TypeError("Already read");
          (this.url = t.url),
            (this.credentials = t.credentials),
            e.headers || (this.headers = new u(t.headers)),
            (this.method = t.method),
            (this.mode = t.mode),
            (this.signal = t.signal),
            i || null == t._bodyInit || ((i = t._bodyInit), (t.bodyUsed = !0));
        } else this.url = String(t);
        if (
          ((this.credentials =
            e.credentials || this.credentials || "same-origin"),
          (!e.headers && this.headers) || (this.headers = new u(e.headers)),
          (this.method =
            ((r = (n = e.method || this.method || "GET").toUpperCase()),
            v.indexOf(r) > -1 ? r : n)),
          (this.mode = e.mode || this.mode || null),
          (this.signal = e.signal || this.signal),
          (this.referrer = null),
          ("GET" === this.method || "HEAD" === this.method) && i)
        )
          throw new TypeError("Body not allowed for GET or HEAD requests");
        if (
          (this._initBody(i),
          !(
            ("GET" !== this.method && "HEAD" !== this.method) ||
            ("no-store" !== e.cache && "no-cache" !== e.cache)
          ))
        ) {
          var o = /([?&])_=[^&]*/;
          o.test(this.url)
            ? (this.url = this.url.replace(o, "$1_=" + new Date().getTime()))
            : (this.url +=
                (/\?/.test(this.url) ? "&" : "?") +
                "_=" +
                new Date().getTime());
        }
      }
      function w(t) {
        var e = new FormData();
        return (
          t
            .trim()
            .split("&")
            .forEach(function (t) {
              if (t) {
                var n = t.split("="),
                  r = n.shift().replace(/\+/g, " "),
                  i = n.join("=").replace(/\+/g, " ");
                e.append(decodeURIComponent(r), decodeURIComponent(i));
              }
            }),
          e
        );
      }
      function x(t, e) {
        if (!(this instanceof x))
          throw new TypeError(
            'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
          );
        e || (e = {}),
          (this.type = "default"),
          (this.status = void 0 === e.status ? 200 : e.status),
          (this.ok = this.status >= 200 && this.status < 300),
          (this.statusText = void 0 === e.statusText ? "" : "" + e.statusText),
          (this.headers = new u(e.headers)),
          (this.url = e.url || ""),
          this._initBody(t);
      }
      (g.prototype.clone = function () {
        return new g(this, { body: this._bodyInit });
      }),
        y.call(g.prototype),
        y.call(x.prototype),
        (x.prototype.clone = function () {
          return new x(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new u(this.headers),
            url: this.url,
          });
        }),
        (x.error = function () {
          var t = new x(null, { status: 0, statusText: "" });
          return (t.type = "error"), t;
        });
      var E = [301, 302, 303, 307, 308];
      x.redirect = function (t, e) {
        if (-1 === E.indexOf(e)) throw new RangeError("Invalid status code");
        return new x(null, { status: e, headers: { location: t } });
      };
      var L = t.DOMException;
      try {
        new L();
      } catch (t) {
        ((L = function (t, e) {
          (this.message = t), (this.name = e);
          var n = Error(t);
          this.stack = n.stack;
        }).prototype = Object.create(Error.prototype)),
          (L.prototype.constructor = L);
      }
      function A(e, n) {
        return new Promise(function (r, o) {
          var s = new g(e, n);
          if (s.signal && s.signal.aborted)
            return o(new L("Aborted", "AbortError"));
          var p = new XMLHttpRequest();
          function c() {
            p.abort();
          }
          (p.onload = function () {
            var t,
              e,
              n = {
                status: p.status,
                statusText: p.statusText,
                headers:
                  ((t = p.getAllResponseHeaders() || ""),
                  (e = new u()),
                  t
                    .replace(/\r?\n[\t ]+/g, " ")
                    .split("\r")
                    .map(function (t) {
                      return 0 === t.indexOf("\n") ? t.substr(1, t.length) : t;
                    })
                    .forEach(function (t) {
                      var n = t.split(":"),
                        r = n.shift().trim();
                      if (r) {
                        var i = n.join(":").trim();
                        e.append(r, i);
                      }
                    }),
                  e),
              };
            n.url =
              "responseURL" in p
                ? p.responseURL
                : n.headers.get("X-Request-URL");
            var i = "response" in p ? p.response : p.responseText;
            setTimeout(function () {
              r(new x(i, n));
            }, 0);
          }),
            (p.onerror = function () {
              setTimeout(function () {
                o(new TypeError("Network request failed"));
              }, 0);
            }),
            (p.ontimeout = function () {
              setTimeout(function () {
                o(new TypeError("Network request failed"));
              }, 0);
            }),
            (p.onabort = function () {
              setTimeout(function () {
                o(new L("Aborted", "AbortError"));
              }, 0);
            }),
            p.open(
              s.method,
              (function (e) {
                try {
                  return "" === e && t.location.href ? t.location.href : e;
                } catch (t) {
                  return e;
                }
              })(s.url),
              !0
            ),
            "include" === s.credentials
              ? (p.withCredentials = !0)
              : "omit" === s.credentials && (p.withCredentials = !1),
            "responseType" in p &&
              (i
                ? (p.responseType = "blob")
                : a &&
                  s.headers.get("Content-Type") &&
                  -1 !==
                    s.headers
                      .get("Content-Type")
                      .indexOf("application/octet-stream") &&
                  (p.responseType = "arraybuffer")),
            !n || "object" != typeof n.headers || n.headers instanceof u
              ? s.headers.forEach(function (t, e) {
                  p.setRequestHeader(e, t);
                })
              : Object.getOwnPropertyNames(n.headers).forEach(function (t) {
                  p.setRequestHeader(t, l(n.headers[t]));
                }),
            s.signal &&
              (s.signal.addEventListener("abort", c),
              (p.onreadystatechange = function () {
                4 === p.readyState && s.signal.removeEventListener("abort", c);
              })),
            p.send(void 0 === s._bodyInit ? null : s._bodyInit);
        });
      }
      (A.polyfill = !0),
        t.fetch ||
          ((t.fetch = A), (t.Headers = u), (t.Request = g), (t.Response = x)),
        n(7312);
      var _ = n(7059),
        k = n.n(_),
        S = n(8656);
      function T(t) {
        let e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
        return fetch(`https://api.saveonenergy.cloud/zipcode/${t}`, {
          method: "GET",
        })
          .then((t) => t.json())
          .catch(() =>
            1 === e
              ? /7([5-9]\d{3}|33\d{2})|885\d{2}/.test(t)
                ? "TX"
                : null
              : T(t, e - 1)
          );
      }
      const O = "input[name=zip]",
        C = "js-bill-type",
        q = "js-zip-search";
      function N(t) {
        const e = t.target.querySelector(O),
          n = e.value,
          r = e.classList.contains("zip-search__input--natural-gas")
            ? "natural-gas"
            : null,
          i = t.target.querySelector('input[name="m"]'),
          o = document.querySelector(".ep-modal__button"),
          a = document.querySelector(".ep-modal__link");
        return T(n).then((e) => {
          let { state: s, utilityRedirectURL: p } = e;
          const c = (function (t) {
            return document.querySelector(`.${C}`)
              ? t.target.parentElement
                  .querySelector(`.${C}`)
                  .querySelector("select").value
              : null;
          })(t);
          let l = p;
          if (!p) {
            l = (function (t, e, n, r) {
              return "natural-gas" === r && "TX" !== n
                ? `/shop/residential/naturalgas/${n}/${e}/`
                : t
                ? "TX" === n
                  ? "/for-business/commercial-rates"
                  : "smb_2501" === t
                  ? `/shop/commercial/electricity/${n}/${e}/`
                  : `/shop/smallbusiness/electricity/${n}/${e}/?pricingBucket=${t}`
                : "TX" === n
                ? void 0 !== window.electricPhoenixToggle
                  ? (function (t, e) {
                      return `/home-info?zipcode=${t}&option=${window.electricPhoenixToggle}`;
                    })(e)
                  : `/shop/residential/electricity/${n}/${e}/`
                : `/shop/residential/electricity/${n}/${e}?isNTX=true`;
            })(c, n, s, r);
            const e = l.includes("?") ? "&" : "?",
              o = ("TX" === s && i) || !1,
              a = t.target.querySelector('input[value="movey"]').checked,
              p = t.target.querySelector('input[value="moven"]').checked;
            o && a && (l += `${e}m=movey`), o && p && (l += `${e}m=moven`);
          }
          if (
            ((function (t) {
              const e =
                  "/" === window.location.pathname
                    ? `Homepage ${t.formVersion}`
                    : `Landing page ${t.formVersion}`,
                n = {
                  formContext: {
                    formType: "Zip Check",
                    formName: t.formName,
                    formVersion: e,
                  },
                  outboundUrl: t.targetUrl,
                  field: [
                    {
                      fieldType: "Zip Entry",
                      fieldName: "Zip",
                      fieldValue: t.zip,
                    },
                  ],
                };
              null !== t.billType &&
                n.field.push({
                  fieldType: "Dropdown",
                  fieldName: "Type of Zip",
                  fieldValue: t.billType,
                }),
                (0, S.Z)("FormSubmitted", n);
            })({
              zip: n,
              targetUrl: l,
              billType: c,
              formName: t.target.name,
              formVersion: t.submitter.dataset.name,
            }),
            "TX" === s && !0 === window.electricPhoenixToggle)
          )
            return (
              (o.href = l),
              (a.href = `/shop/residential/electricity/${s}/${n}?electricPhoenixToggleActive=true&option=true&zipcode=${n}`),
              void window.popOptInModal()
            );
          var d;
          ((d = 500), new Promise((t) => setTimeout(t, d))).then(() => {
            document.location.href = l;
          });
        });
      }
      const I = { CallCenterHours: !0 };
      const B = document.querySelectorAll(".js-zip-search");
      var M =
          "undefined" != typeof window &&
          "undefined" != typeof document &&
          "undefined" != typeof navigator,
        j = (function () {
          for (
            var t = ["Edge", "Trident", "Firefox"], e = 0;
            e < t.length;
            e += 1
          )
            if (M && navigator.userAgent.indexOf(t[e]) >= 0) return 1;
          return 0;
        })(),
        D =
          M && window.Promise
            ? function (t) {
                var e = !1;
                return function () {
                  e ||
                    ((e = !0),
                    window.Promise.resolve().then(function () {
                      (e = !1), t();
                    }));
                };
              }
            : function (t) {
                var e = !1;
                return function () {
                  e ||
                    ((e = !0),
                    setTimeout(function () {
                      (e = !1), t();
                    }, j));
                };
              };
      function H(t) {
        return t && "[object Function]" === {}.toString.call(t);
      }
      function P(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n;
      }
      function F(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host;
      }
      function R(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
          case "HTML":
          case "BODY":
            return t.ownerDocument.body;
          case "#document":
            return t.body;
        }
        var e = P(t),
          n = e.overflow,
          r = e.overflowX,
          i = e.overflowY;
        return /(auto|scroll|overlay)/.test(n + i + r) ? t : R(F(t));
      }
      function U(t) {
        return t && t.referenceNode ? t.referenceNode : t;
      }
      var z = M && !(!window.MSInputMethodContext || !document.documentMode),
        Y = M && /MSIE 10/.test(navigator.userAgent);
      function X(t) {
        return 11 === t ? z : 10 === t ? Y : z || Y;
      }
      function $(t) {
        if (!t) return document.documentElement;
        for (
          var e = X(10) ? document.body : null, n = t.offsetParent || null;
          n === e && t.nextElementSibling;

        )
          n = (t = t.nextElementSibling).offsetParent;
        var r = n && n.nodeName;
        return r && "BODY" !== r && "HTML" !== r
          ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
            "static" === P(n, "position")
            ? $(n)
            : n
          : t
          ? t.ownerDocument.documentElement
          : document.documentElement;
      }
      function V(t) {
        return null !== t.parentNode ? V(t.parentNode) : t;
      }
      function W(t, e) {
        if (!(t && t.nodeType && e && e.nodeType))
          return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
          r = n ? t : e,
          i = n ? e : t,
          o = document.createRange();
        o.setStart(r, 0), o.setEnd(i, 0);
        var a,
          s,
          p = o.commonAncestorContainer;
        if ((t !== p && e !== p) || r.contains(i))
          return "BODY" === (s = (a = p).nodeName) ||
            ("HTML" !== s && $(a.firstElementChild) !== a)
            ? $(p)
            : p;
        var c = V(t);
        return c.host ? W(c.host, e) : W(t, V(e).host);
      }
      function G(t) {
        var e =
            "top" ===
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "top")
              ? "scrollTop"
              : "scrollLeft",
          n = t.nodeName;
        if ("BODY" === n || "HTML" === n) {
          var r = t.ownerDocument.documentElement;
          return (t.ownerDocument.scrollingElement || r)[e];
        }
        return t[e];
      }
      function Z(t, e) {
        var n = "x" === e ? "Left" : "Top",
          r = "Left" === n ? "Right" : "Bottom";
        return (
          parseFloat(t["border" + n + "Width"]) +
          parseFloat(t["border" + r + "Width"])
        );
      }
      function K(t, e, n, r) {
        return Math.max(
          e["offset" + t],
          e["scroll" + t],
          n["client" + t],
          n["offset" + t],
          n["scroll" + t],
          X(10)
            ? parseInt(n["offset" + t]) +
                parseInt(r["margin" + ("Height" === t ? "Top" : "Left")]) +
                parseInt(r["margin" + ("Height" === t ? "Bottom" : "Right")])
            : 0
        );
      }
      function J(t) {
        var e = t.body,
          n = t.documentElement,
          r = X(10) && getComputedStyle(n);
        return { height: K("Height", e, n, r), width: K("Width", e, n, r) };
      }
      var Q = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
            }
          }
          return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
          };
        })(),
        tt = function (t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        },
        et =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
          };
      function nt(t) {
        return et({}, t, { right: t.left + t.width, bottom: t.top + t.height });
      }
      function rt(t) {
        var e = {};
        try {
          if (X(10)) {
            e = t.getBoundingClientRect();
            var n = G(t, "top"),
              r = G(t, "left");
            (e.top += n), (e.left += r), (e.bottom += n), (e.right += r);
          } else e = t.getBoundingClientRect();
        } catch (t) {}
        var i = {
            left: e.left,
            top: e.top,
            width: e.right - e.left,
            height: e.bottom - e.top,
          },
          o = "HTML" === t.nodeName ? J(t.ownerDocument) : {},
          a = o.width || t.clientWidth || i.width,
          s = o.height || t.clientHeight || i.height,
          p = t.offsetWidth - a,
          c = t.offsetHeight - s;
        if (p || c) {
          var l = P(t);
          (p -= Z(l, "x")), (c -= Z(l, "y")), (i.width -= p), (i.height -= c);
        }
        return nt(i);
      }
      function it(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = X(10),
          i = "HTML" === e.nodeName,
          o = rt(t),
          a = rt(e),
          s = R(t),
          p = P(e),
          c = parseFloat(p.borderTopWidth),
          l = parseFloat(p.borderLeftWidth);
        n &&
          i &&
          ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
        var d = nt({
          top: o.top - a.top - c,
          left: o.left - a.left - l,
          width: o.width,
          height: o.height,
        });
        if (((d.marginTop = 0), (d.marginLeft = 0), !r && i)) {
          var u = parseFloat(p.marginTop),
            f = parseFloat(p.marginLeft);
          (d.top -= c - u),
            (d.bottom -= c - u),
            (d.left -= l - f),
            (d.right -= l - f),
            (d.marginTop = u),
            (d.marginLeft = f);
        }
        return (
          (r && !n ? e.contains(s) : e === s && "BODY" !== s.nodeName) &&
            (d = (function (t, e) {
              var n =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2],
                r = G(e, "top"),
                i = G(e, "left"),
                o = n ? -1 : 1;
              return (
                (t.top += r * o),
                (t.bottom += r * o),
                (t.left += i * o),
                (t.right += i * o),
                t
              );
            })(d, e)),
          d
        );
      }
      function ot(t) {
        var e = t.nodeName;
        if ("BODY" === e || "HTML" === e) return !1;
        if ("fixed" === P(t, "position")) return !0;
        var n = F(t);
        return !!n && ot(n);
      }
      function at(t) {
        if (!t || !t.parentElement || X()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === P(e, "transform"); )
          e = e.parentElement;
        return e || document.documentElement;
      }
      function st(t, e, n, r) {
        var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
          o = { top: 0, left: 0 },
          a = i ? at(t) : W(t, U(e));
        if ("viewport" === r)
          o = (function (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = t.ownerDocument.documentElement,
              r = it(t, n),
              i = Math.max(n.clientWidth, window.innerWidth || 0),
              o = Math.max(n.clientHeight, window.innerHeight || 0),
              a = e ? 0 : G(n),
              s = e ? 0 : G(n, "left");
            return nt({
              top: a - r.top + r.marginTop,
              left: s - r.left + r.marginLeft,
              width: i,
              height: o,
            });
          })(a, i);
        else {
          var s = void 0;
          "scrollParent" === r
            ? "BODY" === (s = R(F(e))).nodeName &&
              (s = t.ownerDocument.documentElement)
            : (s = "window" === r ? t.ownerDocument.documentElement : r);
          var p = it(s, a, i);
          if ("HTML" !== s.nodeName || ot(a)) o = p;
          else {
            var c = J(t.ownerDocument),
              l = c.height,
              d = c.width;
            (o.top += p.top - p.marginTop),
              (o.bottom = l + p.top),
              (o.left += p.left - p.marginLeft),
              (o.right = d + p.left);
          }
        }
        var u = "number" == typeof (n = n || 0);
        return (
          (o.left += u ? n : n.left || 0),
          (o.top += u ? n : n.top || 0),
          (o.right -= u ? n : n.right || 0),
          (o.bottom -= u ? n : n.bottom || 0),
          o
        );
      }
      function pt(t, e, n, r, i) {
        var o =
          arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var a = st(n, r, o, i),
          s = {
            top: { width: a.width, height: e.top - a.top },
            right: { width: a.right - e.right, height: a.height },
            bottom: { width: a.width, height: a.bottom - e.bottom },
            left: { width: e.left - a.left, height: a.height },
          },
          p = Object.keys(s)
            .map(function (t) {
              return et({ key: t }, s[t], {
                area: ((e = s[t]), e.width * e.height),
              });
              var e;
            })
            .sort(function (t, e) {
              return e.area - t.area;
            }),
          c = p.filter(function (t) {
            var e = t.width,
              r = t.height;
            return e >= n.clientWidth && r >= n.clientHeight;
          }),
          l = c.length > 0 ? c[0].key : p[0].key,
          d = t.split("-")[1];
        return l + (d ? "-" + d : "");
      }
      function ct(t, e, n) {
        var r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        return it(n, r ? at(e) : W(e, U(n)), r);
      }
      function lt(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
          n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
          r = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return { width: t.offsetWidth + r, height: t.offsetHeight + n };
      }
      function dt(t) {
        var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
        return t.replace(/left|right|bottom|top/g, function (t) {
          return e[t];
        });
      }
      function ut(t, e, n) {
        n = n.split("-")[0];
        var r = lt(t),
          i = { width: r.width, height: r.height },
          o = -1 !== ["right", "left"].indexOf(n),
          a = o ? "top" : "left",
          s = o ? "left" : "top",
          p = o ? "height" : "width",
          c = o ? "width" : "height";
        return (
          (i[a] = e[a] + e[p] / 2 - r[p] / 2),
          (i[s] = n === s ? e[s] - r[c] : e[dt(s)]),
          i
        );
      }
      function ft(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0];
      }
      function mt(t, e, n) {
        return (
          (void 0 === n
            ? t
            : t.slice(
                0,
                (function (t, e, n) {
                  if (Array.prototype.findIndex)
                    return t.findIndex(function (t) {
                      return t[e] === n;
                    });
                  var r = ft(t, function (t) {
                    return t[e] === n;
                  });
                  return t.indexOf(r);
                })(t, "name", n)
              )
          ).forEach(function (t) {
            t.function &&
              console.warn(
                "`modifier.function` is deprecated, use `modifier.fn`!"
              );
            var n = t.function || t.fn;
            t.enabled &&
              H(n) &&
              ((e.offsets.popper = nt(e.offsets.popper)),
              (e.offsets.reference = nt(e.offsets.reference)),
              (e = n(e, t)));
          }),
          e
        );
      }
      function ht() {
        if (!this.state.isDestroyed) {
          var t = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: !1,
            offsets: {},
          };
          (t.offsets.reference = ct(
            this.state,
            this.popper,
            this.reference,
            this.options.positionFixed
          )),
            (t.placement = pt(
              this.options.placement,
              t.offsets.reference,
              this.popper,
              this.reference,
              this.options.modifiers.flip.boundariesElement,
              this.options.modifiers.flip.padding
            )),
            (t.originalPlacement = t.placement),
            (t.positionFixed = this.options.positionFixed),
            (t.offsets.popper = ut(
              this.popper,
              t.offsets.reference,
              t.placement
            )),
            (t.offsets.popper.position = this.options.positionFixed
              ? "fixed"
              : "absolute"),
            (t = mt(this.modifiers, t)),
            this.state.isCreated
              ? this.options.onUpdate(t)
              : ((this.state.isCreated = !0), this.options.onCreate(t));
        }
      }
      function bt(t, e) {
        return t.some(function (t) {
          var n = t.name;
          return t.enabled && n === e;
        });
      }
      function yt(t) {
        for (
          var e = [!1, "ms", "Webkit", "Moz", "O"],
            n = t.charAt(0).toUpperCase() + t.slice(1),
            r = 0;
          r < e.length;
          r++
        ) {
          var i = e[r],
            o = i ? "" + i + n : t;
          if (void 0 !== document.body.style[o]) return o;
        }
        return null;
      }
      function vt() {
        return (
          (this.state.isDestroyed = !0),
          bt(this.modifiers, "applyStyle") &&
            (this.popper.removeAttribute("x-placement"),
            (this.popper.style.position = ""),
            (this.popper.style.top = ""),
            (this.popper.style.left = ""),
            (this.popper.style.right = ""),
            (this.popper.style.bottom = ""),
            (this.popper.style.willChange = ""),
            (this.popper.style[yt("transform")] = "")),
          this.disableEventListeners(),
          this.options.removeOnDestroy &&
            this.popper.parentNode.removeChild(this.popper),
          this
        );
      }
      function gt(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window;
      }
      function wt(t, e, n, r) {
        var i = "BODY" === t.nodeName,
          o = i ? t.ownerDocument.defaultView : t;
        o.addEventListener(e, n, { passive: !0 }),
          i || wt(R(o.parentNode), e, n, r),
          r.push(o);
      }
      function xt(t, e, n, r) {
        (n.updateBound = r),
          gt(t).addEventListener("resize", n.updateBound, { passive: !0 });
        var i = R(t);
        return (
          wt(i, "scroll", n.updateBound, n.scrollParents),
          (n.scrollElement = i),
          (n.eventsEnabled = !0),
          n
        );
      }
      function Et() {
        this.state.eventsEnabled ||
          (this.state = xt(
            this.reference,
            this.options,
            this.state,
            this.scheduleUpdate
          ));
      }
      function Lt() {
        var t, e;
        this.state.eventsEnabled &&
          (cancelAnimationFrame(this.scheduleUpdate),
          (this.state =
            ((t = this.reference),
            (e = this.state),
            gt(t).removeEventListener("resize", e.updateBound),
            e.scrollParents.forEach(function (t) {
              t.removeEventListener("scroll", e.updateBound);
            }),
            (e.updateBound = null),
            (e.scrollParents = []),
            (e.scrollElement = null),
            (e.eventsEnabled = !1),
            e)));
      }
      function At(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
      }
      function _t(t, e) {
        Object.keys(e).forEach(function (n) {
          var r = "";
          -1 !==
            ["width", "height", "top", "right", "bottom", "left"].indexOf(n) &&
            At(e[n]) &&
            (r = "px"),
            (t.style[n] = e[n] + r);
        });
      }
      var kt = M && /Firefox/i.test(navigator.userAgent);
      function St(t, e, n) {
        var r = ft(t, function (t) {
            return t.name === e;
          }),
          i =
            !!r &&
            t.some(function (t) {
              return t.name === n && t.enabled && t.order < r.order;
            });
        if (!i) {
          var o = "`" + e + "`",
            a = "`" + n + "`";
          console.warn(
            a +
              " modifier is required by " +
              o +
              " modifier in order to work, be sure to include it before " +
              o +
              "!"
          );
        }
        return i;
      }
      var Tt = [
          "auto-start",
          "auto",
          "auto-end",
          "top-start",
          "top",
          "top-end",
          "right-start",
          "right",
          "right-end",
          "bottom-end",
          "bottom",
          "bottom-start",
          "left-end",
          "left",
          "left-start",
        ],
        Ot = Tt.slice(3);
      function Ct(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          n = Ot.indexOf(t),
          r = Ot.slice(n + 1).concat(Ot.slice(0, n));
        return e ? r.reverse() : r;
      }
      var qt = {
          placement: "bottom",
          positionFixed: !1,
          eventsEnabled: !0,
          removeOnDestroy: !1,
          onCreate: function () {},
          onUpdate: function () {},
          modifiers: {
            shift: {
              order: 100,
              enabled: !0,
              fn: function (t) {
                var e = t.placement,
                  n = e.split("-")[0],
                  r = e.split("-")[1];
                if (r) {
                  var i = t.offsets,
                    o = i.reference,
                    a = i.popper,
                    s = -1 !== ["bottom", "top"].indexOf(n),
                    p = s ? "left" : "top",
                    c = s ? "width" : "height",
                    l = {
                      start: tt({}, p, o[p]),
                      end: tt({}, p, o[p] + o[c] - a[c]),
                    };
                  t.offsets.popper = et({}, a, l[r]);
                }
                return t;
              },
            },
            offset: {
              order: 200,
              enabled: !0,
              fn: function (t, e) {
                var n,
                  r = e.offset,
                  i = t.placement,
                  o = t.offsets,
                  a = o.popper,
                  s = o.reference,
                  p = i.split("-")[0];
                return (
                  (n = At(+r)
                    ? [+r, 0]
                    : (function (t, e, n, r) {
                        var i = [0, 0],
                          o = -1 !== ["right", "left"].indexOf(r),
                          a = t.split(/(\+|\-)/).map(function (t) {
                            return t.trim();
                          }),
                          s = a.indexOf(
                            ft(a, function (t) {
                              return -1 !== t.search(/,|\s/);
                            })
                          );
                        a[s] &&
                          -1 === a[s].indexOf(",") &&
                          console.warn(
                            "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
                          );
                        var p = /\s*,\s*|\s+/,
                          c =
                            -1 !== s
                              ? [
                                  a.slice(0, s).concat([a[s].split(p)[0]]),
                                  [a[s].split(p)[1]].concat(a.slice(s + 1)),
                                ]
                              : [a];
                        return (
                          (c = c.map(function (t, r) {
                            var i = (1 === r ? !o : o) ? "height" : "width",
                              a = !1;
                            return t
                              .reduce(function (t, e) {
                                return "" === t[t.length - 1] &&
                                  -1 !== ["+", "-"].indexOf(e)
                                  ? ((t[t.length - 1] = e), (a = !0), t)
                                  : a
                                  ? ((t[t.length - 1] += e), (a = !1), t)
                                  : t.concat(e);
                              }, [])
                              .map(function (t) {
                                return (function (t, e, n, r) {
                                  var i = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                    o = +i[1],
                                    a = i[2];
                                  return o
                                    ? 0 === a.indexOf("%")
                                      ? (nt("%p" === a ? n : r)[e] / 100) * o
                                      : "vh" === a || "vw" === a
                                      ? (("vh" === a
                                          ? Math.max(
                                              document.documentElement
                                                .clientHeight,
                                              window.innerHeight || 0
                                            )
                                          : Math.max(
                                              document.documentElement
                                                .clientWidth,
                                              window.innerWidth || 0
                                            )) /
                                          100) *
                                        o
                                      : o
                                    : t;
                                })(t, i, e, n);
                              });
                          })).forEach(function (t, e) {
                            t.forEach(function (n, r) {
                              At(n) &&
                                (i[e] += n * ("-" === t[r - 1] ? -1 : 1));
                            });
                          }),
                          i
                        );
                      })(r, a, s, p)),
                  "left" === p
                    ? ((a.top += n[0]), (a.left -= n[1]))
                    : "right" === p
                    ? ((a.top += n[0]), (a.left += n[1]))
                    : "top" === p
                    ? ((a.left += n[0]), (a.top -= n[1]))
                    : "bottom" === p && ((a.left += n[0]), (a.top += n[1])),
                  (t.popper = a),
                  t
                );
              },
              offset: 0,
            },
            preventOverflow: {
              order: 300,
              enabled: !0,
              fn: function (t, e) {
                var n = e.boundariesElement || $(t.instance.popper);
                t.instance.reference === n && (n = $(n));
                var r = yt("transform"),
                  i = t.instance.popper.style,
                  o = i.top,
                  a = i.left,
                  s = i[r];
                (i.top = ""), (i.left = ""), (i[r] = "");
                var p = st(
                  t.instance.popper,
                  t.instance.reference,
                  e.padding,
                  n,
                  t.positionFixed
                );
                (i.top = o), (i.left = a), (i[r] = s), (e.boundaries = p);
                var c = e.priority,
                  l = t.offsets.popper,
                  d = {
                    primary: function (t) {
                      var n = l[t];
                      return (
                        l[t] < p[t] &&
                          !e.escapeWithReference &&
                          (n = Math.max(l[t], p[t])),
                        tt({}, t, n)
                      );
                    },
                    secondary: function (t) {
                      var n = "right" === t ? "left" : "top",
                        r = l[n];
                      return (
                        l[t] > p[t] &&
                          !e.escapeWithReference &&
                          (r = Math.min(
                            l[n],
                            p[t] - ("right" === t ? l.width : l.height)
                          )),
                        tt({}, n, r)
                      );
                    },
                  };
                return (
                  c.forEach(function (t) {
                    var e =
                      -1 !== ["left", "top"].indexOf(t)
                        ? "primary"
                        : "secondary";
                    l = et({}, l, d[e](t));
                  }),
                  (t.offsets.popper = l),
                  t
                );
              },
              priority: ["left", "right", "top", "bottom"],
              padding: 5,
              boundariesElement: "scrollParent",
            },
            keepTogether: {
              order: 400,
              enabled: !0,
              fn: function (t) {
                var e = t.offsets,
                  n = e.popper,
                  r = e.reference,
                  i = t.placement.split("-")[0],
                  o = Math.floor,
                  a = -1 !== ["top", "bottom"].indexOf(i),
                  s = a ? "right" : "bottom",
                  p = a ? "left" : "top",
                  c = a ? "width" : "height";
                return (
                  n[s] < o(r[p]) && (t.offsets.popper[p] = o(r[p]) - n[c]),
                  n[p] > o(r[s]) && (t.offsets.popper[p] = o(r[s])),
                  t
                );
              },
            },
            arrow: {
              order: 500,
              enabled: !0,
              fn: function (t, e) {
                var n;
                if (!St(t.instance.modifiers, "arrow", "keepTogether"))
                  return t;
                var r = e.element;
                if ("string" == typeof r) {
                  if (!(r = t.instance.popper.querySelector(r))) return t;
                } else if (!t.instance.popper.contains(r))
                  return (
                    console.warn(
                      "WARNING: `arrow.element` must be child of its popper element!"
                    ),
                    t
                  );
                var i = t.placement.split("-")[0],
                  o = t.offsets,
                  a = o.popper,
                  s = o.reference,
                  p = -1 !== ["left", "right"].indexOf(i),
                  c = p ? "height" : "width",
                  l = p ? "Top" : "Left",
                  d = l.toLowerCase(),
                  u = p ? "left" : "top",
                  f = p ? "bottom" : "right",
                  m = lt(r)[c];
                s[f] - m < a[d] && (t.offsets.popper[d] -= a[d] - (s[f] - m)),
                  s[d] + m > a[f] && (t.offsets.popper[d] += s[d] + m - a[f]),
                  (t.offsets.popper = nt(t.offsets.popper));
                var h = s[d] + s[c] / 2 - m / 2,
                  b = P(t.instance.popper),
                  y = parseFloat(b["margin" + l]),
                  v = parseFloat(b["border" + l + "Width"]),
                  g = h - t.offsets.popper[d] - y - v;
                return (
                  (g = Math.max(Math.min(a[c] - m, g), 0)),
                  (t.arrowElement = r),
                  (t.offsets.arrow =
                    (tt((n = {}), d, Math.round(g)), tt(n, u, ""), n)),
                  t
                );
              },
              element: "[x-arrow]",
            },
            flip: {
              order: 600,
              enabled: !0,
              fn: function (t, e) {
                if (bt(t.instance.modifiers, "inner")) return t;
                if (t.flipped && t.placement === t.originalPlacement) return t;
                var n = st(
                    t.instance.popper,
                    t.instance.reference,
                    e.padding,
                    e.boundariesElement,
                    t.positionFixed
                  ),
                  r = t.placement.split("-")[0],
                  i = dt(r),
                  o = t.placement.split("-")[1] || "",
                  a = [];
                switch (e.behavior) {
                  case "flip":
                    a = [r, i];
                    break;
                  case "clockwise":
                    a = Ct(r);
                    break;
                  case "counterclockwise":
                    a = Ct(r, !0);
                    break;
                  default:
                    a = e.behavior;
                }
                return (
                  a.forEach(function (s, p) {
                    if (r !== s || a.length === p + 1) return t;
                    (r = t.placement.split("-")[0]), (i = dt(r));
                    var c = t.offsets.popper,
                      l = t.offsets.reference,
                      d = Math.floor,
                      u =
                        ("left" === r && d(c.right) > d(l.left)) ||
                        ("right" === r && d(c.left) < d(l.right)) ||
                        ("top" === r && d(c.bottom) > d(l.top)) ||
                        ("bottom" === r && d(c.top) < d(l.bottom)),
                      f = d(c.left) < d(n.left),
                      m = d(c.right) > d(n.right),
                      h = d(c.top) < d(n.top),
                      b = d(c.bottom) > d(n.bottom),
                      y =
                        ("left" === r && f) ||
                        ("right" === r && m) ||
                        ("top" === r && h) ||
                        ("bottom" === r && b),
                      v = -1 !== ["top", "bottom"].indexOf(r),
                      g =
                        !!e.flipVariations &&
                        ((v && "start" === o && f) ||
                          (v && "end" === o && m) ||
                          (!v && "start" === o && h) ||
                          (!v && "end" === o && b)),
                      w =
                        !!e.flipVariationsByContent &&
                        ((v && "start" === o && m) ||
                          (v && "end" === o && f) ||
                          (!v && "start" === o && b) ||
                          (!v && "end" === o && h)),
                      x = g || w;
                    (u || y || x) &&
                      ((t.flipped = !0),
                      (u || y) && (r = a[p + 1]),
                      x &&
                        (o = (function (t) {
                          return "end" === t
                            ? "start"
                            : "start" === t
                            ? "end"
                            : t;
                        })(o)),
                      (t.placement = r + (o ? "-" + o : "")),
                      (t.offsets.popper = et(
                        {},
                        t.offsets.popper,
                        ut(t.instance.popper, t.offsets.reference, t.placement)
                      )),
                      (t = mt(t.instance.modifiers, t, "flip")));
                  }),
                  t
                );
              },
              behavior: "flip",
              padding: 5,
              boundariesElement: "viewport",
              flipVariations: !1,
              flipVariationsByContent: !1,
            },
            inner: {
              order: 700,
              enabled: !1,
              fn: function (t) {
                var e = t.placement,
                  n = e.split("-")[0],
                  r = t.offsets,
                  i = r.popper,
                  o = r.reference,
                  a = -1 !== ["left", "right"].indexOf(n),
                  s = -1 === ["top", "left"].indexOf(n);
                return (
                  (i[a ? "left" : "top"] =
                    o[n] - (s ? i[a ? "width" : "height"] : 0)),
                  (t.placement = dt(e)),
                  (t.offsets.popper = nt(i)),
                  t
                );
              },
            },
            hide: {
              order: 800,
              enabled: !0,
              fn: function (t) {
                if (!St(t.instance.modifiers, "hide", "preventOverflow"))
                  return t;
                var e = t.offsets.reference,
                  n = ft(t.instance.modifiers, function (t) {
                    return "preventOverflow" === t.name;
                  }).boundaries;
                if (
                  e.bottom < n.top ||
                  e.left > n.right ||
                  e.top > n.bottom ||
                  e.right < n.left
                ) {
                  if (!0 === t.hide) return t;
                  (t.hide = !0), (t.attributes["x-out-of-boundaries"] = "");
                } else {
                  if (!1 === t.hide) return t;
                  (t.hide = !1), (t.attributes["x-out-of-boundaries"] = !1);
                }
                return t;
              },
            },
            computeStyle: {
              order: 850,
              enabled: !0,
              fn: function (t, e) {
                var n = e.x,
                  r = e.y,
                  i = t.offsets.popper,
                  o = ft(t.instance.modifiers, function (t) {
                    return "applyStyle" === t.name;
                  }).gpuAcceleration;
                void 0 !== o &&
                  console.warn(
                    "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                  );
                var a,
                  s,
                  p = void 0 !== o ? o : e.gpuAcceleration,
                  c = $(t.instance.popper),
                  l = rt(c),
                  d = { position: i.position },
                  u = (function (t, e) {
                    var n = t.offsets,
                      r = n.popper,
                      i = n.reference,
                      o = Math.round,
                      a = Math.floor,
                      s = function (t) {
                        return t;
                      },
                      p = o(i.width),
                      c = o(r.width),
                      l = -1 !== ["left", "right"].indexOf(t.placement),
                      d = -1 !== t.placement.indexOf("-"),
                      u = e ? (l || d || p % 2 == c % 2 ? o : a) : s,
                      f = e ? o : s;
                    return {
                      left: u(
                        p % 2 == 1 && c % 2 == 1 && !d && e
                          ? r.left - 1
                          : r.left
                      ),
                      top: f(r.top),
                      bottom: f(r.bottom),
                      right: u(r.right),
                    };
                  })(t, window.devicePixelRatio < 2 || !kt),
                  f = "bottom" === n ? "top" : "bottom",
                  m = "right" === r ? "left" : "right",
                  h = yt("transform");
                if (
                  ((s =
                    "bottom" === f
                      ? "HTML" === c.nodeName
                        ? -c.clientHeight + u.bottom
                        : -l.height + u.bottom
                      : u.top),
                  (a =
                    "right" === m
                      ? "HTML" === c.nodeName
                        ? -c.clientWidth + u.right
                        : -l.width + u.right
                      : u.left),
                  p && h)
                )
                  (d[h] = "translate3d(" + a + "px, " + s + "px, 0)"),
                    (d[f] = 0),
                    (d[m] = 0),
                    (d.willChange = "transform");
                else {
                  var b = "bottom" === f ? -1 : 1,
                    y = "right" === m ? -1 : 1;
                  (d[f] = s * b), (d[m] = a * y), (d.willChange = f + ", " + m);
                }
                var v = { "x-placement": t.placement };
                return (
                  (t.attributes = et({}, v, t.attributes)),
                  (t.styles = et({}, d, t.styles)),
                  (t.arrowStyles = et({}, t.offsets.arrow, t.arrowStyles)),
                  t
                );
              },
              gpuAcceleration: !0,
              x: "bottom",
              y: "right",
            },
            applyStyle: {
              order: 900,
              enabled: !0,
              fn: function (t) {
                var e, n;
                return (
                  _t(t.instance.popper, t.styles),
                  (e = t.instance.popper),
                  (n = t.attributes),
                  Object.keys(n).forEach(function (t) {
                    !1 !== n[t]
                      ? e.setAttribute(t, n[t])
                      : e.removeAttribute(t);
                  }),
                  t.arrowElement &&
                    Object.keys(t.arrowStyles).length &&
                    _t(t.arrowElement, t.arrowStyles),
                  t
                );
              },
              onLoad: function (t, e, n, r, i) {
                var o = ct(i, e, t, n.positionFixed),
                  a = pt(
                    n.placement,
                    o,
                    e,
                    t,
                    n.modifiers.flip.boundariesElement,
                    n.modifiers.flip.padding
                  );
                return (
                  e.setAttribute("x-placement", a),
                  _t(e, { position: n.positionFixed ? "fixed" : "absolute" }),
                  n
                );
              },
              gpuAcceleration: void 0,
            },
          },
        },
        Nt = (function () {
          function t(e, n) {
            var r = this,
              i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {};
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.scheduleUpdate = function () {
                return requestAnimationFrame(r.update);
              }),
              (this.update = D(this.update.bind(this))),
              (this.options = et({}, t.Defaults, i)),
              (this.state = {
                isDestroyed: !1,
                isCreated: !1,
                scrollParents: [],
              }),
              (this.reference = e && e.jquery ? e[0] : e),
              (this.popper = n && n.jquery ? n[0] : n),
              (this.options.modifiers = {}),
              Object.keys(et({}, t.Defaults.modifiers, i.modifiers)).forEach(
                function (e) {
                  r.options.modifiers[e] = et(
                    {},
                    t.Defaults.modifiers[e] || {},
                    i.modifiers ? i.modifiers[e] : {}
                  );
                }
              ),
              (this.modifiers = Object.keys(this.options.modifiers)
                .map(function (t) {
                  return et({ name: t }, r.options.modifiers[t]);
                })
                .sort(function (t, e) {
                  return t.order - e.order;
                })),
              this.modifiers.forEach(function (t) {
                t.enabled &&
                  H(t.onLoad) &&
                  t.onLoad(r.reference, r.popper, r.options, t, r.state);
              }),
              this.update();
            var o = this.options.eventsEnabled;
            o && this.enableEventListeners(), (this.state.eventsEnabled = o);
          }
          return (
            Q(t, [
              {
                key: "update",
                value: function () {
                  return ht.call(this);
                },
              },
              {
                key: "destroy",
                value: function () {
                  return vt.call(this);
                },
              },
              {
                key: "enableEventListeners",
                value: function () {
                  return Et.call(this);
                },
              },
              {
                key: "disableEventListeners",
                value: function () {
                  return Lt.call(this);
                },
              },
            ]),
            t
          );
        })();
      (Nt.Utils = ("undefined" != typeof window ? window : n.g).PopperUtils),
        (Nt.placements = Tt),
        (Nt.Defaults = qt);
      const It = Nt;
      function Bt() {
        return (
          (Bt =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              }
              return t;
            }),
          Bt.apply(this, arguments)
        );
      }
      var Mt = "undefined" != typeof window && "undefined" != typeof document,
        jt = Mt ? navigator.userAgent : "",
        Dt = /MSIE |Trident\//.test(jt),
        Ht = /UCBrowser\//.test(jt),
        Pt =
          Mt && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream,
        Ft = {
          a11y: !0,
          allowHTML: !0,
          animateFill: !0,
          animation: "shift-away",
          appendTo: function () {
            return document.body;
          },
          aria: "describedby",
          arrow: !1,
          arrowType: "sharp",
          boundary: "scrollParent",
          content: "",
          delay: 0,
          distance: 10,
          duration: [325, 275],
          flip: !0,
          flipBehavior: "flip",
          flipOnUpdate: !1,
          followCursor: !1,
          hideOnClick: !0,
          ignoreAttributes: !1,
          inertia: !1,
          interactive: !1,
          interactiveBorder: 2,
          interactiveDebounce: 0,
          lazy: !0,
          maxWidth: 350,
          multiple: !1,
          offset: 0,
          onHidden: function () {},
          onHide: function () {},
          onMount: function () {},
          onShow: function () {},
          onShown: function () {},
          onTrigger: function () {},
          placement: "top",
          popperOptions: {},
          role: "tooltip",
          showOnInit: !1,
          size: "regular",
          sticky: !1,
          target: "",
          theme: "dark",
          touch: !0,
          touchHold: !1,
          trigger: "mouseenter focus",
          triggerTarget: null,
          updateDuration: 0,
          wait: null,
          zIndex: 9999,
        },
        Rt = [
          "arrow",
          "arrowType",
          "boundary",
          "distance",
          "flip",
          "flipBehavior",
          "flipOnUpdate",
          "offset",
          "placement",
          "popperOptions",
        ],
        Ut = Mt ? Element.prototype : {},
        zt =
          Ut.matches ||
          Ut.matchesSelector ||
          Ut.webkitMatchesSelector ||
          Ut.mozMatchesSelector ||
          Ut.msMatchesSelector;
      function Yt(t) {
        return [].slice.call(t);
      }
      function Xt(t, e) {
        return $t(t, function (t) {
          return zt.call(t, e);
        });
      }
      function $t(t, e) {
        for (; t; ) {
          if (e(t)) return t;
          t = t.parentElement;
        }
        return null;
      }
      var Vt = { passive: !0 },
        Wt = 4,
        Gt = "x-placement",
        Zt = "x-out-of-boundaries",
        Kt = "tippy-iOS",
        Jt = "tippy-active",
        Qt = "tippy-popper",
        te = "tippy-tooltip",
        ee = "tippy-content",
        ne = "tippy-backdrop",
        re = "tippy-arrow",
        ie = "tippy-roundarrow",
        oe = ".".concat(Qt),
        ae = ".".concat(te),
        se = ".".concat(ee),
        pe = ".".concat(ne),
        ce = ".".concat(re),
        le = ".".concat(ie),
        de = !1;
      function ue() {
        de ||
          ((de = !0),
          Pt && document.body.classList.add(Kt),
          window.performance && document.addEventListener("mousemove", me));
      }
      var fe = 0;
      function me() {
        var t = performance.now();
        t - fe < 20 &&
          ((de = !1),
          document.removeEventListener("mousemove", me),
          Pt || document.body.classList.remove(Kt)),
          (fe = t);
      }
      function he() {
        var t = document.activeElement;
        t && t.blur && t._tippy && t.blur();
      }
      var be = Object.keys(Ft);
      function ye(t, e) {
        return {}.hasOwnProperty.call(t, e);
      }
      function ve(t, e, n) {
        if (Array.isArray(t)) {
          var r = t[e];
          return null == r ? n : r;
        }
        return t;
      }
      function ge(t, e) {
        return 0 === e
          ? t
          : function (r) {
              clearTimeout(n),
                (n = setTimeout(function () {
                  t(r);
                }, e));
            };
        var n;
      }
      function we(t, e) {
        return t && t.modifiers && t.modifiers[e];
      }
      function xe(t, e) {
        return t.indexOf(e) > -1;
      }
      function Ee(t) {
        return t instanceof Element;
      }
      function Le(t) {
        return !(!t || !ye(t, "isVirtual")) || Ee(t);
      }
      function Ae(t, e) {
        return "function" == typeof t ? t.apply(null, e) : t;
      }
      function _e(t, e) {
        t.filter(function (t) {
          return "flip" === t.name;
        })[0].enabled = e;
      }
      function ke() {
        return document.createElement("div");
      }
      function Se(t, e) {
        t.forEach(function (t) {
          t && (t.style.transitionDuration = "".concat(e, "ms"));
        });
      }
      function Te(t, e) {
        t.forEach(function (t) {
          t && t.setAttribute("data-state", e);
        });
      }
      function Oe(t, e) {
        var n = Bt(
          {},
          e,
          { content: Ae(e.content, [t]) },
          e.ignoreAttributes
            ? {}
            : (function (t) {
                return be.reduce(function (e, n) {
                  var r = (
                    t.getAttribute("data-tippy-".concat(n)) || ""
                  ).trim();
                  if (!r) return e;
                  if ("content" === n) e[n] = r;
                  else
                    try {
                      e[n] = JSON.parse(r);
                    } catch (t) {
                      e[n] = r;
                    }
                  return e;
                }, {});
              })(t)
        );
        return (n.arrow || Ht) && (n.animateFill = !1), n;
      }
      function Ce(t, e) {
        Object.keys(t).forEach(function (t) {
          if (!ye(e, t))
            throw new Error("[tippy]: `".concat(t, "` is not a valid option"));
        });
      }
      function qe(t, e) {
        t.innerHTML = Ee(e) ? e.innerHTML : e;
      }
      function Ne(t, e) {
        Ee(e.content)
          ? (qe(t, ""), t.appendChild(e.content))
          : "function" != typeof e.content &&
            (t[e.allowHTML ? "innerHTML" : "textContent"] = e.content);
      }
      function Ie(t) {
        return {
          tooltip: t.querySelector(ae),
          backdrop: t.querySelector(pe),
          content: t.querySelector(se),
          arrow: t.querySelector(ce) || t.querySelector(le),
        };
      }
      function Be(t) {
        t.setAttribute("data-inertia", "");
      }
      function Me(t) {
        var e = ke();
        return (
          "round" === t
            ? ((e.className = ie),
              qe(
                e,
                '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>'
              ))
            : (e.className = re),
          e
        );
      }
      function je() {
        var t = ke();
        return (t.className = ne), t.setAttribute("data-state", "hidden"), t;
      }
      function De(t, e) {
        t.setAttribute("tabindex", "-1"),
          e.setAttribute("data-interactive", "");
      }
      function He(t, e, n) {
        var r =
          Ht && void 0 !== document.body.style.webkitTransition
            ? "webkitTransitionEnd"
            : "transitionend";
        t[e + "EventListener"](r, n);
      }
      function Pe(t) {
        var e = t.getAttribute(Gt);
        return e ? e.split("-")[0] : "";
      }
      function Fe(t, e, n) {
        n.split(" ").forEach(function (n) {
          t.classList[e](n + "-theme");
        });
      }
      var Re = 1,
        Ue = [];
      function ze(t, e) {
        var n,
          r,
          i,
          o,
          a,
          s = Oe(t, e);
        if (!s.multiple && t._tippy) return null;
        var p,
          c,
          l,
          d,
          u,
          f = !1,
          m = !1,
          h = !1,
          b = !1,
          y = [],
          v = ge(j, s.interactiveDebounce),
          g = Re++,
          w = (function (t, e) {
            var n = ke();
            (n.className = Qt),
              (n.id = "tippy-".concat(t)),
              (n.style.zIndex = "" + e.zIndex),
              (n.style.position = "absolute"),
              (n.style.top = "0"),
              (n.style.left = "0"),
              e.role && n.setAttribute("role", e.role);
            var r = ke();
            (r.className = te),
              (r.style.maxWidth =
                e.maxWidth + ("number" == typeof e.maxWidth ? "px" : "")),
              r.setAttribute("data-size", e.size),
              r.setAttribute("data-animation", e.animation),
              r.setAttribute("data-state", "hidden"),
              Fe(r, "add", e.theme);
            var i = ke();
            return (
              (i.className = ee),
              i.setAttribute("data-state", "hidden"),
              e.interactive && De(n, r),
              e.arrow && r.appendChild(Me(e.arrowType)),
              e.animateFill &&
                (r.appendChild(je()), r.setAttribute("data-animatefill", "")),
              e.inertia && Be(r),
              Ne(i, e),
              r.appendChild(i),
              n.appendChild(r),
              n
            );
          })(g, s),
          x = Ie(w),
          E = {
            id: g,
            reference: t,
            popper: w,
            popperChildren: x,
            popperInstance: null,
            props: s,
            state: {
              isEnabled: !0,
              isVisible: !1,
              isDestroyed: !1,
              isMounted: !1,
              isShown: !1,
            },
            clearDelayTimeouts: V,
            set: W,
            setContent: function (t) {
              W({ content: t });
            },
            show: G,
            hide: Z,
            enable: function () {
              E.state.isEnabled = !0;
            },
            disable: function () {
              E.state.isEnabled = !1;
            },
            destroy: function (e) {
              if (!E.state.isDestroyed) {
                (m = !0), E.state.isMounted && Z(0), I(), delete t._tippy;
                var n = E.props.target;
                n &&
                  e &&
                  Ee(t) &&
                  Yt(t.querySelectorAll(n)).forEach(function (t) {
                    t._tippy && t._tippy.destroy();
                  }),
                  E.popperInstance && E.popperInstance.destroy(),
                  (m = !1),
                  (E.state.isDestroyed = !0);
              }
            },
          };
        return (
          (t._tippy = E),
          (w._tippy = E),
          N(),
          s.lazy || z(),
          s.showOnInit && Y(),
          !s.a11y ||
            s.target ||
            !Ee((u = _())) ||
            (zt.call(
              u,
              "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]"
            ) &&
              !u.hasAttribute("disabled")) ||
            _().setAttribute("tabindex", "0"),
          w.addEventListener("mouseenter", function (t) {
            E.props.interactive &&
              E.state.isVisible &&
              "mouseenter" === n &&
              Y(t, !0);
          }),
          w.addEventListener("mouseleave", function () {
            E.props.interactive &&
              "mouseenter" === n &&
              document.addEventListener("mousemove", v);
          }),
          E
        );
        function L() {
          document.removeEventListener("mousemove", B);
        }
        function A() {
          document.body.removeEventListener("mouseleave", X),
            document.removeEventListener("mousemove", v),
            (Ue = Ue.filter(function (t) {
              return t !== v;
            }));
        }
        function _() {
          return E.props.triggerTarget || t;
        }
        function k() {
          document.addEventListener("click", $, !0);
        }
        function S() {
          document.removeEventListener("click", $, !0);
        }
        function T() {
          return [
            E.popperChildren.tooltip,
            E.popperChildren.backdrop,
            E.popperChildren.content,
          ];
        }
        function O() {
          var t = E.props.followCursor;
          return (t && "focus" !== n) || (de && "initial" === t);
        }
        function C(t, e) {
          var n = E.popperChildren.tooltip;
          function r(t) {
            t.target === n && (He(n, "remove", r), e());
          }
          if (0 === t) return e();
          He(n, "remove", l), He(n, "add", r), (l = r);
        }
        function q(t, e) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          _().addEventListener(t, e, n),
            y.push({ eventType: t, handler: e, options: n });
        }
        function N() {
          E.props.touchHold &&
            !E.props.target &&
            (q("touchstart", M, Vt), q("touchend", D, Vt)),
            E.props.trigger
              .trim()
              .split(" ")
              .forEach(function (t) {
                if ("manual" !== t)
                  if (E.props.target)
                    switch (t) {
                      case "mouseenter":
                        q("mouseover", P), q("mouseout", F);
                        break;
                      case "focus":
                        q("focusin", P), q("focusout", F);
                        break;
                      case "click":
                        q(t, P);
                    }
                  else
                    switch ((q(t, M), t)) {
                      case "mouseenter":
                        q("mouseleave", D);
                        break;
                      case "focus":
                        q(Dt ? "focusout" : "blur", H);
                    }
              });
        }
        function I() {
          y.forEach(function (t) {
            var e = t.eventType,
              n = t.handler,
              r = t.options;
            _().removeEventListener(e, n, r);
          }),
            (y = []);
        }
        function B(e) {
          var n = (r = e),
            i = n.clientX,
            o = n.clientY;
          if (d) {
            var a = $t(e.target, function (e) {
                return e === t;
              }),
              s = t.getBoundingClientRect(),
              p = E.props.followCursor,
              c = "horizontal" === p,
              l = "vertical" === p,
              u = xe(["top", "bottom"], Pe(w)),
              f = w.getAttribute(Gt),
              m = !!f && !!f.split("-")[1],
              h = u ? w.offsetWidth : w.offsetHeight,
              b = h / 2,
              y = u ? 0 : m ? h : b,
              v = u ? (m ? h : b) : 0;
            (!a && E.props.interactive) ||
              ((E.popperInstance.reference = Bt(
                {},
                E.popperInstance.reference,
                {
                  referenceNode: t,
                  clientWidth: 0,
                  clientHeight: 0,
                  getBoundingClientRect: function () {
                    return {
                      width: u ? h : 0,
                      height: u ? 0 : h,
                      top: (c ? s.top : o) - y,
                      bottom: (c ? s.bottom : o) + y,
                      left: (l ? s.left : i) - v,
                      right: (l ? s.right : i) + v,
                    };
                  },
                }
              )),
              E.popperInstance.update()),
              "initial" === p && E.state.isVisible && L();
          }
        }
        function M(t) {
          E.state.isEnabled &&
            !R(t) &&
            (E.state.isVisible ||
              ((n = t.type),
              t instanceof MouseEvent &&
                ((r = t),
                Ue.forEach(function (e) {
                  return e(t);
                }))),
            "click" === t.type &&
            !1 !== E.props.hideOnClick &&
            E.state.isVisible
              ? X()
              : Y(t));
        }
        function j(e) {
          var n = Xt(e.target, oe) === w,
            r = $t(e.target, function (e) {
              return e === t;
            });
          n ||
            r ||
            ((function (t, e, n, r) {
              if (!t) return !0;
              var i = n.clientX,
                o = n.clientY,
                a = r.interactiveBorder,
                s = r.distance,
                p = e.top - o > ("top" === t ? a + s : a),
                c = o - e.bottom > ("bottom" === t ? a + s : a),
                l = e.left - i > ("left" === t ? a + s : a),
                d = i - e.right > ("right" === t ? a + s : a);
              return p || c || l || d;
            })(Pe(w), w.getBoundingClientRect(), e, E.props) &&
              (A(), X()));
        }
        function D(t) {
          if (!R(t))
            return E.props.interactive
              ? (document.body.addEventListener("mouseleave", X),
                document.addEventListener("mousemove", v),
                void Ue.push(v))
              : void X();
        }
        function H(t) {
          t.target === _() &&
            ((E.props.interactive &&
              t.relatedTarget &&
              w.contains(t.relatedTarget)) ||
              X());
        }
        function P(t) {
          Xt(t.target, E.props.target) && Y(t);
        }
        function F(t) {
          Xt(t.target, E.props.target) && X();
        }
        function R(t) {
          var e = "ontouchstart" in window,
            n = xe(t.type, "touch"),
            r = E.props.touchHold;
          return (e && de && r && !n) || (de && !r && n);
        }
        function U() {
          !b &&
            c &&
            ((b = !0),
            (function (t) {
              t.offsetHeight;
            })(w),
            c());
        }
        function z() {
          var e = E.props.popperOptions,
            n = E.popperChildren,
            r = n.tooltip,
            i = n.arrow,
            o = we(e, "preventOverflow");
          function a(t) {
            E.props.flip &&
              !E.props.flipOnUpdate &&
              (t.flipped && (E.popperInstance.options.placement = t.placement),
              _e(E.popperInstance.modifiers, !1)),
              r.setAttribute(Gt, t.placement),
              !1 !== t.attributes[Zt]
                ? r.setAttribute(Zt, "")
                : r.removeAttribute(Zt),
              p &&
                p !== t.placement &&
                h &&
                ((r.style.transition = "none"),
                requestAnimationFrame(function () {
                  r.style.transition = "";
                })),
              (p = t.placement),
              (h = E.state.isVisible);
            var e = Pe(w),
              n = r.style;
            (n.top = n.bottom = n.left = n.right = ""),
              (n[e] = -(E.props.distance - 10) + "px");
            var i = o && void 0 !== o.padding ? o.padding : Wt,
              a = "number" == typeof i,
              s = Bt(
                {
                  top: a ? i : i.top,
                  bottom: a ? i : i.bottom,
                  left: a ? i : i.left,
                  right: a ? i : i.right,
                },
                !a && i
              );
            (s[e] = a ? i + E.props.distance : (i[e] || 0) + E.props.distance),
              (E.popperInstance.modifiers.filter(function (t) {
                return "preventOverflow" === t.name;
              })[0].padding = s),
              (d = s);
          }
          var s = Bt({ eventsEnabled: !1, placement: E.props.placement }, e, {
            modifiers: Bt({}, e ? e.modifiers : {}, {
              preventOverflow: Bt(
                { boundariesElement: E.props.boundary, padding: Wt },
                o
              ),
              arrow: Bt({ element: i, enabled: !!i }, we(e, "arrow")),
              flip: Bt(
                {
                  enabled: E.props.flip,
                  padding: E.props.distance + Wt,
                  behavior: E.props.flipBehavior,
                },
                we(e, "flip")
              ),
              offset: Bt({ offset: E.props.offset }, we(e, "offset")),
            }),
            onCreate: function (t) {
              a(t), U(), e && e.onCreate && e.onCreate(t);
            },
            onUpdate: function (t) {
              a(t), U(), e && e.onUpdate && e.onUpdate(t);
            },
          });
          E.popperInstance = new It(t, w, s);
        }
        function Y(t, n) {
          if ((V(), !E.state.isVisible)) {
            if (E.props.target)
              return (function (t) {
                if (t) {
                  var n = Xt(t.target, E.props.target);
                  n &&
                    !n._tippy &&
                    ze(
                      n,
                      Bt({}, E.props, {
                        content: Ae(e.content, [n]),
                        appendTo: e.appendTo,
                        target: "",
                        showOnInit: !0,
                      })
                    );
                }
              })(t);
            if (((f = !0), t && !n && E.props.onTrigger(E, t), E.props.wait))
              return E.props.wait(E, t);
            O() &&
              !E.state.isMounted &&
              (E.popperInstance || z(),
              document.addEventListener("mousemove", B)),
              k();
            var r = ve(E.props.delay, 0, Ft.delay);
            r
              ? (i = setTimeout(function () {
                  G();
                }, r))
              : G();
          }
        }
        function X() {
          if ((V(), !E.state.isVisible)) return L(), void S();
          f = !1;
          var t = ve(E.props.delay, 1, Ft.delay);
          t
            ? (o = setTimeout(function () {
                E.state.isVisible && Z();
              }, t))
            : (a = requestAnimationFrame(function () {
                Z();
              }));
        }
        function $(t) {
          if (!E.props.interactive || !w.contains(t.target)) {
            if (_().contains(t.target)) {
              if (de) return;
              if (E.state.isVisible && xe(E.props.trigger, "click")) return;
            }
            !0 === E.props.hideOnClick && (V(), Z());
          }
        }
        function V() {
          clearTimeout(i), clearTimeout(o), cancelAnimationFrame(a);
        }
        function W(e) {
          Ce((e = e || {}), Ft), I();
          var n = E.props,
            i = Oe(t, Bt({}, E.props, {}, e, { ignoreAttributes: !0 }));
          (i.ignoreAttributes = ye(e, "ignoreAttributes")
            ? e.ignoreAttributes || !1
            : n.ignoreAttributes),
            (E.props = i),
            N(),
            A(),
            (v = ge(j, i.interactiveDebounce)),
            (function (t, e, n) {
              var r = Ie(t),
                i = r.tooltip,
                o = r.content,
                a = r.backdrop,
                s = r.arrow;
              (t.style.zIndex = "" + n.zIndex),
                i.setAttribute("data-size", n.size),
                i.setAttribute("data-animation", n.animation),
                (i.style.maxWidth =
                  n.maxWidth + ("number" == typeof n.maxWidth ? "px" : "")),
                n.role
                  ? t.setAttribute("role", n.role)
                  : t.removeAttribute("role"),
                e.content !== n.content && Ne(o, n),
                !e.animateFill && n.animateFill
                  ? (i.appendChild(je()),
                    i.setAttribute("data-animatefill", ""))
                  : e.animateFill &&
                    !n.animateFill &&
                    (i.removeChild(a), i.removeAttribute("data-animatefill")),
                !e.arrow && n.arrow
                  ? i.appendChild(Me(n.arrowType))
                  : e.arrow && !n.arrow && i.removeChild(s),
                e.arrow &&
                  n.arrow &&
                  e.arrowType !== n.arrowType &&
                  i.replaceChild(Me(n.arrowType), s),
                !e.interactive && n.interactive
                  ? De(t, i)
                  : e.interactive &&
                    !n.interactive &&
                    (function (t, e) {
                      t.removeAttribute("tabindex"),
                        e.removeAttribute("data-interactive");
                    })(t, i),
                !e.inertia && n.inertia
                  ? Be(i)
                  : e.inertia &&
                    !n.inertia &&
                    (function (t) {
                      t.removeAttribute("data-inertia");
                    })(i),
                e.theme !== n.theme &&
                  (Fe(i, "remove", e.theme), Fe(i, "add", n.theme));
            })(w, n, i),
            (E.popperChildren = Ie(w)),
            E.popperInstance &&
              (Rt.some(function (t) {
                return ye(e, t) && e[t] !== n[t];
              })
                ? (E.popperInstance.destroy(),
                  z(),
                  E.state.isVisible && E.popperInstance.enableEventListeners(),
                  E.props.followCursor && r && B(r))
                : E.popperInstance.update());
        }
        function G() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : ve(E.props.duration, 0, Ft.duration[1]);
          if (
            !E.state.isDestroyed &&
            E.state.isEnabled &&
            (!de || E.props.touch) &&
            !_().hasAttribute("disabled") &&
            !1 !== E.props.onShow(E)
          ) {
            k(),
              (w.style.visibility = "visible"),
              (E.state.isVisible = !0),
              E.props.interactive && _().classList.add(Jt);
            var n = T();
            Se(n.concat(w), 0),
              (c = function () {
                if (E.state.isVisible) {
                  var i = O();
                  i && r ? B(r) : i || E.popperInstance.update(),
                    E.popperChildren.backdrop &&
                      (E.popperChildren.content.style.transitionDelay =
                        Math.round(e / 12) + "ms"),
                    E.props.sticky &&
                      (function () {
                        Se([w], Dt ? 0 : E.props.updateDuration);
                        var e = t.getBoundingClientRect();
                        !(function n() {
                          var r = t.getBoundingClientRect();
                          (e.top === r.top &&
                            e.right === r.right &&
                            e.bottom === r.bottom &&
                            e.left === r.left) ||
                            E.popperInstance.scheduleUpdate(),
                            (e = r),
                            E.state.isMounted && requestAnimationFrame(n);
                        })();
                      })(),
                    Se([w], E.props.updateDuration),
                    Se(n, e),
                    Te(n, "visible"),
                    (function (t, e) {
                      C(t, function () {
                        E.props.aria &&
                          _().setAttribute("aria-".concat(E.props.aria), w.id),
                          E.props.onShown(E),
                          (E.state.isShown = !0);
                      });
                    })(e);
                }
              }),
              (function () {
                b = !1;
                var e = O();
                E.popperInstance
                  ? (_e(E.popperInstance.modifiers, E.props.flip),
                    e ||
                      ((E.popperInstance.reference = t),
                      E.popperInstance.enableEventListeners()),
                    E.popperInstance.scheduleUpdate())
                  : (z(), e || E.popperInstance.enableEventListeners());
                var n = E.props.appendTo,
                  r = "parent" === n ? t.parentNode : Ae(n, [t]);
                r.contains(w) ||
                  (r.appendChild(w),
                  E.props.onMount(E),
                  (E.state.isMounted = !0));
              })();
          }
        }
        function Z() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : ve(E.props.duration, 1, Ft.duration[1]);
          if (
            !E.state.isDestroyed &&
            (E.state.isEnabled || m) &&
            (!1 !== E.props.onHide(E) || m)
          ) {
            S(),
              (w.style.visibility = "hidden"),
              (E.state.isVisible = !1),
              (E.state.isShown = !1),
              (h = !1),
              E.props.interactive && _().classList.remove(Jt);
            var e = T();
            Se(e, t),
              Te(e, "hidden"),
              (function (t, e) {
                C(t, function () {
                  !E.state.isVisible &&
                    w.parentNode &&
                    w.parentNode.contains(w) &&
                    (f || L(),
                    E.props.aria &&
                      _().removeAttribute("aria-".concat(E.props.aria)),
                    E.popperInstance.disableEventListeners(),
                    (E.popperInstance.options.placement = E.props.placement),
                    w.parentNode.removeChild(w),
                    E.props.onHidden(E),
                    (E.state.isMounted = !1));
                });
              })(t);
          }
        }
      }
      var Ye = !1;
      function Xe(t, e) {
        Ce(e || {}, Ft),
          Ye ||
            (document.addEventListener("touchstart", ue, Vt),
            window.addEventListener("blur", he),
            (Ye = !0));
        var n,
          r = Bt({}, Ft, {}, e);
        (n = t),
          "[object Object]" !== {}.toString.call(n) ||
            n.addEventListener ||
            (function (t) {
              var e = {
                isVirtual: !0,
                attributes: t.attributes || {},
                contains: function () {},
                setAttribute: function (e, n) {
                  t.attributes[e] = n;
                },
                getAttribute: function (e) {
                  return t.attributes[e];
                },
                removeAttribute: function (e) {
                  delete t.attributes[e];
                },
                hasAttribute: function (e) {
                  return e in t.attributes;
                },
                addEventListener: function () {},
                removeEventListener: function () {},
                classList: {
                  classNames: {},
                  add: function (e) {
                    t.classList.classNames[e] = !0;
                  },
                  remove: function (e) {
                    delete t.classList.classNames[e];
                  },
                  contains: function (e) {
                    return e in t.classList.classNames;
                  },
                },
              };
              for (var n in e) t[n] = e[n];
            })(t);
        var i = (function (t) {
          if (Le(t)) return [t];
          if (t instanceof NodeList) return Yt(t);
          if (Array.isArray(t)) return t;
          try {
            return Yt(document.querySelectorAll(t));
          } catch (t) {
            return [];
          }
        })(t).reduce(function (t, e) {
          var n = e && ze(e, r);
          return n && t.push(n), t;
        }, []);
        return Le(t) ? i[0] : i;
      }
      (Xe.version = "4.3.5"),
        (Xe.defaults = Ft),
        (Xe.setDefaults = function (t) {
          Object.keys(t).forEach(function (e) {
            Ft[e] = t[e];
          });
        }),
        (Xe.hideAll = function () {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            e = t.exclude,
            n = t.duration;
          Yt(document.querySelectorAll(oe)).forEach(function (t) {
            var r,
              i = t._tippy;
            if (i) {
              var o = !1;
              e &&
                (o =
                  (r = e)._tippy && !zt.call(r, oe)
                    ? i.reference === e
                    : t === e.popper),
                o || i.hide(n);
            }
          });
        }),
        (Xe.group = function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = e.delay,
            r = void 0 === n ? t[0].props.delay : n,
            i = e.duration,
            o = void 0 === i ? 0 : i,
            a = !1;
          function s(t) {
            (a = t), d();
          }
          function p(e) {
            e._originalProps.onShow(e),
              t.forEach(function (t) {
                t.set({ duration: o }), t.state.isVisible && t.hide();
              }),
              s(!0);
          }
          function c(t) {
            t._originalProps.onHide(t), s(!1);
          }
          function l(t) {
            t._originalProps.onShown(t),
              t.set({ duration: t._originalProps.duration });
          }
          function d() {
            t.forEach(function (t) {
              t.set({
                onShow: p,
                onShown: l,
                onHide: c,
                delay: a ? [0, Array.isArray(r) ? r[1] : r] : r,
                duration: a ? o : t._originalProps.duration,
              });
            });
          }
          t.forEach(function (t) {
            t._originalProps
              ? t.set(t._originalProps)
              : (t._originalProps = Bt({}, t.props));
          }),
            d();
        }),
        Mt &&
          setTimeout(function () {
            Yt(document.querySelectorAll("[data-tippy]")).forEach(function (t) {
              var e = t.getAttribute("data-tippy");
              e && Xe(t, { content: e });
            });
          }),
        (function (t) {
          if (Mt) {
            var e = document.createElement("style");
            (e.type = "text/css"),
              (e.textContent =
                '.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{transition-timing-function:cubic-bezier(.165,.84,.44,1);max-width:calc(100% - 8px);pointer-events:none;outline:0}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-7px;bottom:-6.5px;-webkit-transform-origin:50% 0;transform-origin:50% 0;margin:0 3px}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 3px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(-10px);transform:perspective(700px) translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateX(60deg);transform:perspective(700px) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=top] [data-animation=scale]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px) scale(.5);transform:translateY(-10px) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-7px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;margin:0 3px}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 3px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(10px);transform:perspective(700px) translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateX(-60deg);transform:perspective(700px) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=scale]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px) scale(.5);transform:translateY(10px) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-12px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%;margin:3px 0}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(-10px);transform:perspective(700px) translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateY(-60deg);transform:perspective(700px) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=left] [data-animation=scale]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px) scale(.5);transform:translateX(-10px) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-12px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%;margin:3px 0}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(10px);transform:perspective(700px) translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) rotateY(60deg);transform:perspective(700px) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0}.tippy-popper[x-placement^=right] [data-animation=scale]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px) scale(.5);transform:translateX(10px) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;padding:.3125rem .5625rem;line-height:1.4;text-align:center;background-color:#333}.tippy-tooltip[data-size=small]{padding:.1875rem .375rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.375rem .75rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:initial}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] .tippy-roundarrow path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:18px;height:7px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}'),
              e.setAttribute("data-tippy-stylesheet", "");
            var n = document.head,
              r = n.querySelector("style,link");
            r ? n.insertBefore(e, r) : n.appendChild(e);
          }
        })();
      const $e = Xe,
        Ve = "https://api.saveonenergy.cloud/beg-lead";
      n(3771);
      var We = n(1220);
      const Ge = () =>
        document.querySelector(".navigation-sticky-zip__secondary");
      k()().observe();
      const Ze = [
        We.Z,
        function () {
          (() => {
            const t = document.querySelectorAll(".radio-container");
            t.forEach((e, n) => {
              const r = e.querySelectorAll(".radio-item");
              r.forEach((i) => {
                i.querySelector(".radio-button").addEventListener(
                  "click",
                  (o) => {
                    const a = o.target;
                    t[n] === e &&
                      (i
                        .querySelector(".radio-button__inner-circle")
                        .classList.add("is-active"),
                      a.id
                        ? (a.checked = !0)
                        : (a.querySelector("input").checked = !0),
                      r.forEach((t) => {
                        const e = t.querySelector("input").checked,
                          n = t
                            .querySelector(".radio-button__inner-circle")
                            .classList.contains("is-active");
                        !e &&
                          n &&
                          t
                            .querySelector(".radio-button__inner-circle")
                            .classList.remove("is-active");
                      }));
                  }
                );
              });
            });
          })(),
            window.addEventListener("submit", (t) => {
              (function (t) {
                const e = t.target.className;
                return "string" == typeof e && -1 !== e.indexOf(q);
              })(t) && (t.preventDefault(), N(t));
            });
        },
        function () {
          const t = document.querySelector(".js-site-root"),
            e = document.getElementById("header-menu-toggle"),
            n = document.getElementById("header-menu"),
            r = document.querySelectorAll(".navigation__sub-menu-toggle"),
            i = document.querySelectorAll(".navigation__sub-menu"),
            o = document.querySelector(".js-nav-open"),
            a = document.querySelector(".js-nav-close");
          e.addEventListener("click", function (e) {
            e.preventDefault(),
              n.classList.toggle("is-open"),
              this.classList.toggle("navigation__toggle--open"),
              t.classList.toggle("is-open"),
              r.forEach((t) => {
                t.classList.remove("is-open");
              }),
              i.forEach((t) => {
                t.classList.remove("is-open");
              }),
              o.classList.toggle("u-display-none"),
              a.classList.toggle("u-display-none"),
              document.querySelector(".wp-sticky-zip") &&
                (window.scrollTo(0, 0),
                document
                  .querySelector("body")
                  .classList.toggle("has-overflow-hidden"));
          }),
            r.forEach((t) => {
              t.addEventListener("click", function (t) {
                document.querySelector("body").offsetWidth < 768 &&
                  t.preventDefault(),
                  r.forEach((t) => {
                    t.classList.remove("is-open");
                  }),
                  i.forEach((t) => {
                    t.classList.remove("is-open");
                  }),
                  this.classList.add("is-open"),
                  this.parentNode
                    .querySelector(".navigation__sub-menu")
                    .classList.add("is-open");
              });
            });
        },
        function () {
          const t = document.getElementById("header-menu"),
            e = document.querySelectorAll(".navigation__sub-menu-toggle"),
            n = document.querySelectorAll(".navigation__sub-menu");
          let r = 0;
          t &&
            document.addEventListener("click", (r) => {
              t.contains(r.target) ||
                (e.forEach((t) => {
                  t.classList.remove("is-open");
                }),
                n.forEach((t) => {
                  t.classList.remove("is-open");
                }));
            }),
            window.addEventListener("scroll", function () {
              const t = window.scrollY;
              t > r &&
                (e.forEach((t) => {
                  t.classList.remove("is-open");
                }),
                n.forEach((t) => {
                  t.classList.remove("is-open");
                })),
                (r = t);
            });
        },
        function () {
          const t = document.getElementById("js-list-expander"),
            e = document.querySelectorAll(".js-list-item");
          t &&
            t.addEventListener("click", function () {
              this.classList.add("u-display-none"),
                e.forEach((t) => {
                  t.classList.remove("u-display-none"), console.log(t);
                });
            });
        },
        function () {
          const t = document.querySelectorAll(".tabs__navigation-item"),
            e = document.querySelectorAll(".tabs__content");
          t.forEach(function (n, r) {
            n.addEventListener("click", function (n) {
              t.forEach(function (t, e) {
                t.classList.remove("tabs__navigation-item--active");
              }),
                e.forEach(function (t, e) {
                  t.classList.remove("tabs__content--active");
                });
              const r = document.querySelector(
                  `.tabs [data-target="${this.dataset.trigger}"]`
                ),
                i = document.querySelector(
                  `.tabs [data-trigger="${this.dataset.trigger}"]`
                );
              r.classList.add("tabs__content--active"),
                i.classList.add("tabs__navigation-item--active");
            });
          });
        },
        function () {
          document.querySelectorAll(".js-expander").forEach((t) => {
            t.addEventListener("click", function () {
              this.classList.toggle("is-open"),
                this.nextElementSibling.classList.toggle("is-open"),
                this.querySelector(".js-plus").classList.toggle("is-open"),
                this.querySelector(".js-minus").classList.toggle("is-open");
            });
          });
        },
        function () {
          document.querySelectorAll(".js-glossary-word").forEach((t) => {
            const e = t.innerText.charAt(0);
            t.previousElementSibling.setAttribute("id", e);
          });
        },
        () =>
          !(window.location.href.indexOf("/plans") > -1) &&
          fetch("https://api.saveonenergy.cloud/zipcode-ip", { method: "GET" })
            .then((t) => t.json())
            .then((t) => {
              const { zipcode: e } = t;
              var n;
              e &&
                ((n = e),
                B.forEach((t) => {
                  const e = t.querySelector("input");
                  e &&
                    (((t) => {
                      t.addEventListener("blur", (t) =>
                        void 0 === t.target.value
                          ? null
                          : (0, S.Z)(
                              "FieldInputted",
                              ((t) => ({
                                userInputField: {
                                  fieldName: t.target.placeholder,
                                  fieldValue: t.target.value,
                                },
                              }))(t)
                            )
                      );
                    })(e),
                    (e.value = n));
                }));
            })
            .catch((t) => {
              throw t;
            }),
        function () {
          $e(".block-list__info", { arrow: !0, theme: "blockList" });
        },
        function () {
          const t = document.querySelector(".business-form-wrapper"),
            e = document.querySelector(".business-form"),
            n = document.querySelector(".business-form-confirm");
          e &&
            e.addEventListener("submit", (e) => {
              e.preventDefault();
              const r = {
                  companyName: document.querySelector(
                    ".business-form input[name=businessName]"
                  ).value,
                  firstName: document.querySelector(
                    ".business-form input[name=firstName]"
                  ).value,
                  lastName: document.querySelector(
                    ".business-form input[name=lastName]"
                  ).value,
                  email: document.querySelector(
                    ".business-form input[name=email]"
                  ).value,
                  zipCode: document.querySelector(
                    ".business-form input[name=zipCode]"
                  ).value,
                  phone: document.querySelector(
                    ".business-form input[name=phone]"
                  ).value,
                  marketingProgram: document.querySelector(
                    ".business-form input[name=marketingProgram]"
                  ).value,
                  disclosureId: document.querySelector(
                    ".business-form input[name=disclosureId]"
                  ).value,
                  disclosureHash: document.querySelector(
                    ".business-form input[name=disclosureHash]"
                  ).value,
                  billAmount: 8,
                },
                {
                  _Cohesion: {
                    anonymousId: i = "",
                    sessionId: o = "",
                    writeKey: a = "",
                  } = {},
                } = window;
              fetch(`${Ve}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...r,
                  anonymousId: i,
                  webSessionId: o,
                  writeKey: a,
                }),
              }).then(
                (e) => (
                  (t.style.display = "none"),
                  (n.style.display = "block"),
                  e.json()
                )
              );
            });
        },
        function () {
          return fetch(`${Ve}/tcpa?site=chooseenergy.com`)
            .then((t) =>
              t.ok
                ? t.json()
                : Promise.reject(new Error("error fetching disclosures"))
            )
            .then((t) => {
              let { id: e, hash: n, text: r } = t;
              (document.querySelector("input[name=disclosureId]").value = e),
                (document.querySelector("input[name=disclosureHash]").value =
                  n),
                (document.querySelector(".js-disclosure-text").innerHTML = r),
                (document.querySelector("input[type=submit]").disabled = !1);
            })
            .catch(console.error);
        },
        function () {
          const t = document.querySelector(".js-state-search");
          if (t) {
            const e = t.querySelector(".js-state-search-input"),
              n = t.querySelector(".js-state-search-submit"),
              r = [
                ...document.querySelector(".js-state-search-datalist").options,
              ],
              i = [];
            document
              .querySelector("#awesomplete_list_1")
              .setAttribute("aria-label", "awesomplete_list_1 states Label"),
              r.forEach((t) => {
                i.push(t.value, t.innerHTML);
              }),
              t.addEventListener("awesomplete-selectcomplete", (t) => {
                e.value = t.text.label;
              }),
              t.addEventListener("submit", (t) => {
                t.preventDefault();
                const n = e.value.toLowerCase();
                i.indexOf(e.value) && (document.location.href = `/${n}`);
              });
            const o = () => {
              i.indexOf(e.value) >= 0 ? (n.disabled = !1) : (n.disabled = !0);
            };
            e.addEventListener("input", () => o()),
              e.addEventListener("change", () => o()),
              e.addEventListener("awesomplete-selectcomplete", () => o());
          }
        },
        function () {
          document.querySelector(".js-navigation-pop-in-banner") &&
            setTimeout(() => {
              document.body.classList.add("has-pop-in-banner");
            }, 5e3);
        },
        () => {
          const t = document.createElement("script"),
            e = document.querySelector("head");
          t.setAttribute("type", "text/javascript"),
            (t.async = 0),
            (t.innerText =
              'window._fs_debug=!1,window._fs_host="fullstory.com",window._fs_script="edge.fullstory.com/s/fs.js",window._fs_org="1utP",window._fs_namespace="FS",function(n,e,o,t,s,c,i,f){o in n?n.console&&n.console.log&&n.console.log(\'FullStory namespace conflict. Please set window["_fs_namespace"].\'):((i=n[o]=function(n,e,o){i.q?i.q.push([n,e,o]):i._api(n,e,o)}).q=[],(c=e.createElement(t)).defer=!0,c.crossOrigin="anonymous",c.src="https://"+_fs_script,(f=e.getElementsByTagName(t)[0]).parentNode.insertBefore(c,f),i.identify=function(n,e,o){i(s,{uid:n},o),e&&i(s,e,o)},i.setUserVars=function(n,e){i(s,n,e)},i.event=function(n,e,o){i("event",{n:n,p:e},o)},i.anonymize=function(){i.identify(!1)},i.shutdown=function(){i("rec",!1)},i.restart=function(){i("rec",!0)},i.log=function(n,e){i("log",[n,e])},i.consent=function(n){i("consent",!arguments.length||n)},i.identifyAccount=function(n,e){c="account",(e=e||{}).acctId=n,i(c,e)},i.clearUserCookie=function(){},i._w={},f="XMLHttpRequest",i._w[f]=n[f],f="fetch",i._w[f]=n[f],n[f]&&(n[f]=function(){return i._w[f].apply(this,arguments)}),i._v="1.2.0")}(window,document,window._fs_namespace,"script","user");'),
            e.appendChild(t);
        },
        () => {
          const t = document.querySelector("head"),
            e = document.createElement("link");
          e.setAttribute("rel", "stylesheet"),
            e.setAttribute(
              "href",
              "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            ),
            e.setAttribute(
              "integrity",
              "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            ),
            e.setAttribute("crossorigin", "anonymous"),
            t.appendChild(e);
        },
        () => {
          const t = document.querySelector(".ep-modal"),
            e = document.querySelector("body"),
            n = document.querySelector(".ep-modal__close-icon");
          (window.popOptInModal = () => {
            e.classList.add("ep-modal--active"), t.classList.add("active");
          }),
            n.addEventListener("click", () => {
              t.classList.remove("active"),
                e.classList.remove("ep-modal--active");
            }),
            t.addEventListener("click", (n) => {
              n.target.classList.contains("ep-modal") &&
                (t.classList.remove("active"),
                e.classList.remove("ep-modal--active"));
            });
        },
        () => {
          const t = window.innerWidth < 768,
            e = document.querySelector(".wp-sticky-zip");
          if (e) {
            const n = e.querySelector(
                ".navigation-sticky-zip__form" + (t ? "" : "--secondary")
              ),
              r = n.querySelector(".zip-search__input"),
              i = n.querySelector(".zip-search__radio-group"),
              o = e.querySelector(".navigation-sticky-zip__phone-wrapper"),
              a = e.querySelector(".navigation-sticky-zip__underlay"),
              s = e.querySelector(".js-header-menu-toggle-secondary"),
              p = e.querySelector(".expanded-header");
            o &&
              document
                .querySelector(".header")
                .classList.add("header--sticky-zip");
            const c = (e) => {
                let { target: n } = e;
                var r, s;
                (r = n),
                  (s = ".wp-sticky-zip"),
                  [...document.querySelectorAll(s)].some(
                    (t) => t !== r && t.contains(r)
                  ) ||
                    (i.classList.remove("is-visible"),
                    t && o
                      ? o.classList.remove("is-radio-visible")
                      : a.classList.remove("is-visible"),
                    document.removeEventListener("click", c),
                    document.removeEventListener("scroll", c));
              },
              l = () => {
                i.classList.add("is-visible"),
                  t && o
                    ? o.classList.add("is-radio-visible")
                    : a.classList.add("is-visible"),
                  document.addEventListener("click", c),
                  document.addEventListener("scroll", c);
              };
            function d(t) {
              let e,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 15;
              return function () {
                for (
                  var r = arguments.length, i = new Array(r), o = 0;
                  o < r;
                  o++
                )
                  i[o] = arguments[o];
                clearTimeout(e),
                  (e = setTimeout(() => {
                    t.apply(this, i);
                  }, n));
              };
            }
            r.addEventListener("focus", l),
              s.addEventListener("click", () => {
                p.classList.toggle("expanded"),
                  t
                    ? (s
                        .querySelector(".js-nav-open")
                        .classList.toggle("u-display-none"),
                      s
                        .querySelector(".js-nav-close")
                        .classList.toggle("u-display-none"))
                    : s.classList.toggle("expanded");
              });
            const u = () => {
                if (!e) return;
                const { pageYOffset: t } = window;
                t > 25 &&
                  (e.classList.contains("has-background") ||
                    e.classList.add("has-background"));
              },
              f = d(() => {
                const { pageYOffset: t } = window;
                t > 25
                  ? e.classList.add("has-background")
                  : e.classList.remove("has-background");
              });
            document.addEventListener("scroll", f),
              u(),
              window.fuse(
                "run",
                [
                  {
                    pool: "w8rHzZDVBLTMndNhVUUsrB",
                    name: "ES-CHOOSE-FUSE-PERMA-BANNER",
                  },
                ],
                { metaKey: "" },
                (t) => {
                  t && console.error("Fuse error", t);
                }
              );
          }
        },
        function () {
          var t, e;
          ((t, e) => {
            let n, r;
            e.forEach((e) => {
              (n = document.querySelector(`.${t} .${e}`)),
                n &&
                  n.addEventListener("click", () => {
                    (r = document.querySelector(
                      `.${t} .${e.replace("navlink-identifier", "submenu")}`
                    )),
                      r &&
                        (r.classList.add("expanded"),
                        r
                          .querySelector(".close-submenu-button")
                          .addEventListener("click", (t) => {
                            if (r.classList.contains("expanded"))
                              r.classList.remove("expanded");
                            else {
                              const e = t.target.parentNode.parentNode;
                              e.classList.contains("expanded") &&
                                e.classList.remove("expanded");
                            }
                          }));
                  });
            });
          })(
            "expanded-header",
            (() => {
              const t = [];
              return (
                document
                  .querySelectorAll(".expanded-header .navlink")
                  .forEach((e) => {
                    for (let n = 0, r = e.classList.length; n < r; n += 1)
                      if (/navlink-identifier__.*/.test(e.classList[n])) {
                        t.push(e.classList[n]);
                        break;
                      }
                  }),
                t
              );
            })()
          ),
            (t = [document.querySelector("#header-menu-toggle-secondary")]),
            (e = document.querySelector(".expanded-header")) &&
              t.forEach((n) => {
                n &&
                  ((t, e) => {
                    t.addEventListener("click", () => {
                      for (let n = 0; n < e.length; n += 1)
                        t.classList.contains("expanded") &&
                          e[n].querySelectorAll(".submenu").length &&
                          setTimeout(() => {
                            const r = e[n].querySelectorAll(".submenu");
                            for (let e = 0; e < r.length; e += 1)
                              r[e].classList.remove("expanded"),
                                Ge().classList.remove("header-expanded"),
                                t.classList.remove("expanded");
                          }, 300),
                          Ge().classList.add("header-expanded"),
                          t.classList.add("expanded"),
                          e[n].classList.toggle("expanded");
                    });
                  })(n, [e].concat(t));
              });
        },
        () => {
          if (null !== localStorage.getItem("isPaidSearch")) return;
          const t =
            "cpc" ===
            new URLSearchParams(window.location.search).get("utm_medium");
          localStorage.setItem("isPaidSearch", t);
        },
      ];
      window.addEventListener("load", () => {
        var t, e;
        (() => {
          const t = document.createElement("script"),
            e = document.createElement("script"),
            n = document.querySelector("head");
          t.setAttribute(
            "src",
            "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          ),
            t.setAttribute("type", "text/javascript"),
            t.setAttribute("charset", "UTF-8"),
            t.setAttribute(
              "data-domain-script",
              "7de95d65-d17f-4b41-b501-1d43b57a3f22"
            ),
            e.setAttribute("type", "text/javascript"),
            n.appendChild(t),
            n.appendChild(e);
        })(),
          (e = I),
          localStorage.setItem("Features", JSON.stringify(e)),
          (t = "CallCenterHours"),
          JSON.parse(localStorage.getItem("Features"))[t] &&
            (function () {
              const t = new XMLHttpRequest();
              (t.onreadystatechange = function () {
                4 === this.readyState &&
                  200 === this.status &&
                  !JSON.parse(this.responseText).isOpen &&
                  document
                    .querySelectorAll(".js-call-center-info")
                    .forEach((t) => {
                      t.classList.contains("header__contact")
                        ? t.classList.add("u-opacity-0")
                        : t.classList.add("u-visually-hidden");
                    });
              }),
                t.open(
                  "GET",
                  "https://api.saveonenergy.cloud/call-center/open",
                  !0
                ),
                t.send();
            })(),
          Ze.forEach((t) => {
            try {
              t();
            } catch (t) {
              console.error(t);
            }
          });
      });
    })();
})();
