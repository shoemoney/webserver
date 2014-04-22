/*
// Copyright 2012 Twitter, Inc
// http://www.apache.org/licenses/LICENSE-2.0

// TwitterCLDR (JavaScript) v2.1.0
// Authors:     Cameron Dutro [@camertron]
                Kirill Lashuk [@KL_7]
                portions by Sven Fuchs [@svenfuchs]
// Homepage:    https://twitter.com
// Description: Provides date, time, number, and list formatting functionality for various Twitter-supported locales in Javascript.
*/
/*-module-*/
/*_lib/twitter_cldr_*/
(function() {
  var e, t, n, r, i, s, o, u, a = {}.hasOwnProperty,
    f = function(e, t) {
      function r() {
        this.constructor = e
      }
      for (var n in t) a.call(t, n) && (e[n] = t[n]);
      return r.prototype = t.prototype, e.prototype = new r, e.__super__ = t.prototype, e
    };
  e = {}, e.is_rtl = !1, e.Utilities = function() {
    function e() {}
    return e.from_char_code = function(e) {
      return e > 65535 ? (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (e & 1023))) : String.fromCharCode(e)
    }, e.char_code_at = function(e, t) {
      var n, r, i, s, o, u;
      e += "", r = e.length, u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      while (u.exec(e) !== null) {
        s = u.lastIndex;
        if (!(s - 2 < t)) break;
        t += 1
      }
      return t >= r || t < 0 ? NaN : (n = e.charCodeAt(t), 55296 <= n && n <= 56319 ? (i = n, o = e.charCodeAt(t + 1), (i - 55296) * 1024 + (o - 56320) + 65536) : n)
    }, e.unpack_string = function(e) {
      var t, n, r, i, s;
      r = [];
      for (n = i = 0, s = e.length; 0 <= s ? i < s : i > s; n = 0 <= s ? ++i : --i) {
        t = this.char_code_at(e, n);
        if (!t) break;
        r.push(t)
      }
      return r
    }, e.pack_array = function(e) {
      var t;
      return function() {
        var n, r, i;
        i = [];
        for (n = 0, r = e.length; n < r; n++) t = e[n], i.push(this.from_char_code(t));
        return i
      }.call(this).join("")
    }, e.arraycopy = function(e, t, n, r, i) {
      var s, o, u, a, f;
      f = e.slice(t, t + i);
      for (s = u = 0, a = f.length; u < a; s = ++u) o = f[s], n[r + s] = o
    }, e.max = function(e) {
      var t, n, r, i, s, o, u, a;
      r = null;
      for (i = s = 0, u = e.length; s < u; i = ++s) {
        t = e[i];
        if (t != null) {
          r = t;
          break
        }
      }
      for (n = o = i, a = e.length; i <= a ? o <= a : o >= a; n = i <= a ? ++o : --o) e[n] > r && (r = e[n]);
      return r
    }, e.min = function(e) {
      var t, n, r, i, s, o, u, a;
      r = null;
      for (i = s = 0, u = e.length; s < u; i = ++s) {
        t = e[i];
        if (t != null) {
          r = t;
          break
        }
      }
      for (n = o = i, a = e.length; i <= a ? o <= a : o >= a; n = i <= a ? ++o : --o) e[n] < r && (r = e[n]);
      return r
    }, e.is_even = function(e) {
      return e % 2 === 0
    }, e.is_odd = function(e) {
      return e % 2 === 1
    }, e
  }(), e.PluralRules = function() {
    function e() {}
    return e.rules = {
      keys: ["one", "other"],
      rule: function(e) {
        return function() {
          return e == 1 ? "one" : "other"
        }()
      }
    }, e.all = function() {
      return this.rules.keys
    }, e.rule_for = function(e) {
      var t;
      try {
        return this.rules.rule(e)
      } catch (n) {
        return t = n, "other"
      }
    }, e
  }(), e.TimespanFormatter = function() {
    function t() {
      this.approximate_multiplier = .75, this.default_type = "default", this.tokens = {
        ago: {
          second: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " second ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " seconds ago",
                type: "plaintext"
              }]
            }
          },
          minute: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " minute ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " minutes ago",
                type: "plaintext"
              }]
            }
          },
          hour: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hour ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hours ago",
                type: "plaintext"
              }]
            }
          },
          day: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " day ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " days ago",
                type: "plaintext"
              }]
            }
          },
          week: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " week ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " weeks ago",
                type: "plaintext"
              }]
            }
          },
          month: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " month ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " months ago",
                type: "plaintext"
              }]
            }
          },
          year: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " year ago",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " years ago",
                type: "plaintext"
              }]
            }
          }
        },
        until: {
          second: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " second",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " seconds",
                type: "plaintext"
              }]
            }
          },
          minute: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " minute",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " minutes",
                type: "plaintext"
              }]
            }
          },
          hour: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hour",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hours",
                type: "plaintext"
              }]
            }
          },
          day: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " day",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " days",
                type: "plaintext"
              }]
            }
          },
          week: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " week",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " weeks",
                type: "plaintext"
              }]
            }
          },
          month: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " month",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " months",
                type: "plaintext"
              }]
            }
          },
          year: {
            "default": {
              one: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " year",
                type: "plaintext"
              }],
              other: [{
                value: "In ",
                type: "plaintext"
              }, {
                value: "{0}",
                type: "placeholder"
              }, {
                value: " years",
                type: "plaintext"
              }]
            }
          }
        },
        none: {
          second: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " second",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " seconds",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " sec",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " secs",
                type: "plaintext"
              }]
            },
            abbreviated: {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "s",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "s",
                type: "plaintext"
              }]
            }
          },
          minute: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " minute",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " minutes",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " min",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " mins",
                type: "plaintext"
              }]
            },
            abbreviated: {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "m",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "m",
                type: "plaintext"
              }]
            }
          },
          hour: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hour",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hours",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hr",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " hrs",
                type: "plaintext"
              }]
            },
            abbreviated: {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "h",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "h",
                type: "plaintext"
              }]
            }
          },
          day: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " day",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " days",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " day",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " days",
                type: "plaintext"
              }]
            },
            abbreviated: {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "d",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: "d",
                type: "plaintext"
              }]
            }
          },
          week: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " week",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " weeks",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " wk",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " wks",
                type: "plaintext"
              }]
            }
          },
          month: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " month",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " months",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " mth",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " mths",
                type: "plaintext"
              }]
            }
          },
          year: {
            "default": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " year",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " years",
                type: "plaintext"
              }]
            },
            "short": {
              one: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " yr",
                type: "plaintext"
              }],
              other: [{
                value: "{0}",
                type: "placeholder"
              }, {
                value: " yrs",
                type: "plaintext"
              }]
            }
          }
        }
      }, this.time_in_seconds = {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2629743.83,
        year: 31556926
      }
    }
    return t.prototype.format = function(t, n) {
      var r, i, s, o, u, a;
      n == null && (n = {}), o = {};
      for (r in n) s = n[r], o[r] = s;
      o.direction || (o.direction = t < 0 ? "ago" : "until");
      if (o.unit === null || o.unit === void 0) o.unit = this.calculate_unit(Math.abs(t), o);
      return o.type || (o.type = this.default_type), o.number = this.calculate_time(Math.abs(t), o.unit), i = this.calculate_time(Math.abs(t), o.unit), o.rule = e.PluralRules.rule_for(i), u = function() {
        var e, t, n, r;
        n = this.tokens[o.direction][o.unit][o.type][o.rule], r = [];
        for (e = 0, t = n.length; e < t; e++) a = n[e], r.push(a.value);
        return r
      }.call(this), u.join("").replace(/\{[0-9]\}/, i.toString())
    }, t.prototype.calculate_unit = function(e, t) {
      var n, r, i, s;
      t == null && (t = {}), s = {};
      for (n in t) i = t[n], s[n] = i;
      return s.approximate == null && (s.approximate = !1), r = s.approximate ? this.approximate_multiplier : 1, e < this.time_in_seconds.minute * r ? "second" : e < this.time_in_seconds.hour * r ? "minute" : e < this.time_in_seconds.day * r ? "hour" : e < this.time_in_seconds.week * r ? "day" : e < this.time_in_seconds.month * r ? "week" : e < this.time_in_seconds.year * r ? "month" : "year"
    }, t.prototype.calculate_time = function(e, t) {
      return Math.round(e / this.time_in_seconds[t])
    }, t
  }(), e.DateTimeFormatter = function() {
    function t() {
      this.tokens = {
        date_time: {
          "default": [{
            value: "MMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }, {
            value: ",",
            type: "plaintext"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }],
          full: [{
            value: "EEEE",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "MMMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "'at'",
            type: "plaintext"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "zzzz",
            type: "pattern"
          }],
          "long": [{
            value: "MMMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "'at'",
            type: "plaintext"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "z",
            type: "pattern"
          }],
          medium: [{
            value: "MMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }, {
            value: ",",
            type: "plaintext"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }],
          "short": [{
            value: "M",
            type: "pattern"
          }, {
            value: "/",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: "/",
            type: "plaintext"
          }, {
            value: "yy",
            type: "pattern"
          }, {
            value: ",",
            type: "plaintext"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }],
          additional: {
            EHm: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }],
            EHms: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            Ed: [{
              value: "d",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "E",
              type: "pattern"
            }],
            Ehm: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            Ehms: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            Gy: [{
              value: "y",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "G",
              type: "pattern"
            }],
            H: [{
              value: "HH",
              type: "pattern"
            }],
            Hm: [{
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }],
            Hms: [{
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            M: [{
              value: "L",
              type: "pattern"
            }],
            MEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            MMM: [{
              value: "LLL",
              type: "pattern"
            }],
            MMMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            MMMd: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            Md: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            d: [{
              value: "d",
              type: "pattern"
            }],
            h: [{
              value: "h",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            hm: [{
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            hms: [{
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            ms: [{
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            y: [{
              value: "y",
              type: "pattern"
            }],
            yM: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMM: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMMd: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMd: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yQQQ: [{
              value: "QQQ",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yQQQQ: [{
              value: "QQQQ",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }]
          }
        },
        time: {
          "default": [{
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }],
          full: [{
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "zzzz",
            type: "pattern"
          }],
          "long": [{
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "z",
            type: "pattern"
          }],
          medium: [{
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "ss",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }],
          "short": [{
            value: "h",
            type: "pattern"
          }, {
            value: ":",
            type: "plaintext"
          }, {
            value: "mm",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "a",
            type: "pattern"
          }],
          additional: {
            EHm: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }],
            EHms: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            Ed: [{
              value: "d",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "E",
              type: "pattern"
            }],
            Ehm: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            Ehms: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            Gy: [{
              value: "y",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "G",
              type: "pattern"
            }],
            H: [{
              value: "HH",
              type: "pattern"
            }],
            Hm: [{
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }],
            Hms: [{
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            M: [{
              value: "L",
              type: "pattern"
            }],
            MEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            MMM: [{
              value: "LLL",
              type: "pattern"
            }],
            MMMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            MMMd: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            Md: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            d: [{
              value: "d",
              type: "pattern"
            }],
            h: [{
              value: "h",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            hm: [{
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            hms: [{
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            ms: [{
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            y: [{
              value: "y",
              type: "pattern"
            }],
            yM: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMM: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMMd: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMd: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yQQQ: [{
              value: "QQQ",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yQQQQ: [{
              value: "QQQQ",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }]
          }
        },
        date: {
          "default": [{
            value: "MMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }],
          full: [{
            value: "EEEE",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "MMMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }],
          "long": [{
            value: "MMMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }],
          medium: [{
            value: "MMM",
            type: "pattern"
          }, {
            value: " ",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: ", ",
            type: "plaintext"
          }, {
            value: "y",
            type: "pattern"
          }],
          "short": [{
            value: "M",
            type: "pattern"
          }, {
            value: "/",
            type: "plaintext"
          }, {
            value: "d",
            type: "pattern"
          }, {
            value: "/",
            type: "plaintext"
          }, {
            value: "yy",
            type: "pattern"
          }],
          additional: {
            EHm: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }],
            EHms: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            Ed: [{
              value: "d",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "E",
              type: "pattern"
            }],
            Ehm: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            Ehms: [{
              value: "E",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            Gy: [{
              value: "y",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "G",
              type: "pattern"
            }],
            H: [{
              value: "HH",
              type: "pattern"
            }],
            Hm: [{
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }],
            Hms: [{
              value: "HH",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            M: [{
              value: "L",
              type: "pattern"
            }],
            MEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            MMM: [{
              value: "LLL",
              type: "pattern"
            }],
            MMMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            MMMd: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            Md: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }],
            d: [{
              value: "d",
              type: "pattern"
            }],
            h: [{
              value: "h",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            hm: [{
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            hms: [{
              value: "h",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "a",
              type: "pattern"
            }],
            ms: [{
              value: "mm",
              type: "pattern"
            }, {
              value: ":",
              type: "plaintext"
            }, {
              value: "ss",
              type: "pattern"
            }],
            y: [{
              value: "y",
              type: "pattern"
            }],
            yM: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMM: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMMEd: [{
              value: "E",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMMMd: [{
              value: "MMM",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: ", ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yMd: [{
              value: "M",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "d",
              type: "pattern"
            }, {
              value: "/",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yQQQ: [{
              value: "QQQ",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }],
            yQQQQ: [{
              value: "QQQQ",
              type: "pattern"
            }, {
              value: " ",
              type: "plaintext"
            }, {
              value: "y",
              type: "pattern"
            }]
          }
        }
      }, this.weekday_keys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], this.methods = {
        G: "era",
        y: "year",
        Y: "year_of_week_of_year",
        Q: "quarter",
        q: "quarter_stand_alone",
        M: "month",
        L: "month_stand_alone",
        w: "week_of_year",
        W: "week_of_month",
        d: "day",
        D: "day_of_month",
        F: "day_of_week_in_month",
        E: "weekday",
        e: "weekday_local",
        c: "weekday_local_stand_alone",
        a: "period",
        h: "hour",
        H: "hour",
        K: "hour",
        k: "hour",
        m: "minute",
        s: "second",
        S: "second_fraction",
        z: "timezone",
        Z: "timezone",
        v: "timezone_generic_non_location",
        V: "timezone_metazone"
      }
    }
    return t.prototype.format = function(e, t) {
      var n, r, i, s = this;
      return n = function(t) {
        var n;
        n = "";
        switch (t.type) {
          case "pattern":
            return s.result_for_token(t, e);
          default:
            return t.value.length > 0 && t.value[0] === "'" && t.value[t.value.length - 1] === "'" ? t.value.substring(1, t.value.length - 1) : t.value
        }
      }, i = this.get_tokens(e, t),
      function() {
        var e, t, s;
        s = [];
        for (e = 0, t = i.length; e < t; e++) r = i[e], s.push(n(r));
        return s
      }().join("")
    }, t.prototype.get_tokens = function(e, t) {
      var n, r;
      return n = t.format || "date_time", r = t.type || "default", n === "additional" ? this.tokens.date_time[n][this.additional_format_selector().find_closest(t.type)] : this.tokens[n][r]
    }, t.prototype.result_for_token = function(e, t) {
      return this[this.methods[e.value[0]]](t, e.value, e.value.length)
    }, t.prototype.additional_format_selector = function() {
      return new e.AdditionalDateFormatSelector(this.tokens.date_time.additional)
    }, t.additional_formats = function() {
      return (new e.DateTimeFormatter).additional_format_selector().patterns()
    }, t.prototype.era = function(t, n, r) {
      var i, s, o;
      switch (r) {
        case 0:
          i = ["", ""];
          break;
        case 1:
        case 2:
        case 3:
          i = e.Calendar.calendar.eras.abbr;
          break;
        default:
          i = e.Calendar.calendar.eras.name
      }
      return s = t.getFullYear() < 0 ? 0 : 1, o = i[s], o != null ? o : this.era(t, n.slice(0, -1), r - 1)
    }, t.prototype.year = function(e, t, n) {
      var r;
      return r = e.getFullYear().toString(), n === 2 && r.length !== 1 && (r = r.slice(-2)), n > 1 && (r = ("0000" + r).slice(-n)), r
    }, t.prototype.year_of_week_of_year = function(e, t, n) {
      throw "not implemented"
    }, t.prototype.day_of_week_in_month = function(e, t, n) {
      throw "not implemented"
    }, t.prototype.quarter = function(t, n, r) {
      var i;
      i = (t.getMonth() / 3 | 0) + 1;
      switch (r) {
        case 1:
          return i.toString();
        case 2:
          return ("0000" + i.toString()).slice(-r);
        case 3:
          return e.Calendar.calendar.quarters.format.abbreviated[i];
        case 4:
          return e.Calendar.calendar.quarters.format.wide[i]
      }
    }, t.prototype.quarter_stand_alone = function(t, n, r) {
      var i;
      i = (t.getMonth() - 1) / 3 + 1;
      switch (r) {
        case 1:
          return i.toString();
        case 2:
          return ("0000" + i.toString()).slice(-r);
        case 3:
          throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        case 4:
          throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        case 5:
          return e.Calendar.calendar.quarters["stand-alone"].narrow[i]
      }
    }, t.prototype.month = function(t, n, r) {
      var i;
      i = (t.getMonth() + 1).toString();
      switch (r) {
        case 1:
          return i;
        case 2:
          return ("0000" + i).slice(-r);
        case 3:
          return e.Calendar.calendar.months.format.abbreviated[i];
        case 4:
          return e.Calendar.calendar.months.format.wide[i];
        case 5:
          throw 'not yet implemented (requires cldr\'s "multiple inheritance")';
        default:
          throw "Unknown date format"
      }
    }, t.prototype.month_stand_alone = function(t, n, r) {
      var i;
      i = (t.getMonth() + 1).toString();
      switch (r) {
        case 1:
          return i;
        case 2:
          return ("0000" + i).slice(-r);
        case 3:
          return e.Calendar.calendar.months["stand-alone"].abbreviated[i];
        case 4:
          return e.Calendar.calendar.months["stand-alone"].wide[i];
        case 5:
          return e.Calendar.calendar.months["stand-alone"].narrow[i];
        default:
          throw "Unknown date format"
      }
    }, t.prototype.day = function(e, t, n) {
      switch (n) {
        case 1:
          return e.getDate().toString();
        case 2:
          return ("0000" + e.getDate().toString()).slice(-n)
      }
    }, t.prototype.weekday = function(t, n, r) {
      var i;
      i = this.weekday_keys[t.getDay()];
      switch (r) {
        case 1:
        case 2:
        case 3:
          return e.Calendar.calendar.days.format.abbreviated[i];
        case 4:
          return e.Calendar.calendar.days.format.wide[i];
        case 5:
          return e.Calendar.calendar.days["stand-alone"].narrow[i]
      }
    }, t.prototype.weekday_local = function(e, t, n) {
      var r;
      switch (n) {
        case 1:
        case 2:
          return r = e.getDay(), r === 0 ? "7" : r.toString();
        default:
          return this.weekday(e, t, n)
      }
    }, t.prototype.weekday_local_stand_alone = function(e, t, n) {
      switch (n) {
        case 1:
          return this.weekday_local(e, t, n);
        default:
          return this.weekday(e, t, n)
      }
    }, t.prototype.period = function(t, n, r) {
      return t.getHours() > 11 ? e.Calendar.calendar.periods.format.wide.pm : e.Calendar.calendar.periods.format.wide.am
    }, t.prototype.hour = function(e, t, n) {
      var r;
      r = e.getHours();
      switch (t[0]) {
        case "h":
          r > 12 ? r -= 12 : r === 0 && (r = 12);
          break;
        case "K":
          r > 11 && (r -= 12);
          break;
        case "k":
          r === 0 && (r = 24)
      }
      return n === 1 ? r.toString() : ("000000" + r.toString()).slice(-n)
    }, t.prototype.minute = function(e, t, n) {
      return n === 1 ? e.getMinutes().toString() : ("000000" + e.getMinutes().toString()).slice(-n)
    }, t.prototype.second = function(e, t, n) {
      return n === 1 ? e.getSeconds().toString() : ("000000" + e.getSeconds().toString()).slice(-n)
    }, t.prototype.second_fraction = function(e, t, n) {
      if (n > 6) throw "can not use the S format with more than 6 digits";
      return ("000000" + Math.round(Math.pow(e.getMilliseconds() * 100, 6 - n)).toString()).slice(-n)
    }, t.prototype.timezone = function(e, t, n) {
      var r, i, s, o, u;
      s = e.getTimezoneOffset(), r = ("00" + (Math.abs(s) / 60).toString()).slice(-2), i = ("00" + (Math.abs(s) % 60).toString()).slice(-2), u = s > 0 ? "-" : "+", o = u + r + ":" + i;
      switch (n) {
        case 1:
        case 2:
        case 3:
          return o;
        default:
          return "UTC" + o
      }
    }, t.prototype.timezone_generic_non_location = function(e, t, n) {
      throw 'not yet implemented (requires timezone translation data")'
    }, t
  }(), e.AdditionalDateFormatSelector = function() {
    function e(e) {
      this.pattern_hash = e
    }
    return e.prototype.find_closest = function(e) {
      var t, n, r, i, s;
      if (e == null || e.trim().length === 0) return null;
      s = this.rank(e), r = 100, n = null;
      for (t in s) i = s[t], i < r && (r = i, n = t);
      return n
    }, e.prototype.patterns = function() {
      var e, t;
      t = [];
      for (e in this.pattern_hash) t.push(e);
      return t
    }, e.prototype.separate = function(e) {
      var t, n, r, i, s;
      n = "", r = [];
      for (i = 0, s = e.length; i < s; i++) t = e[i], t === n ? r[r.length - 1] += t : r.push(t), n = t;
      return r
    }, e.prototype.all_separated_patterns = function() {
      var e, t;
      t = [];
      for (e in this.pattern_hash) t.push(this.separate(e));
      return t
    }, e.prototype.score = function(e, t) {
      var n;
      return n = this.exist_score(e, t) * 2, n += this.position_score(e, t), n + this.count_score(e, t)
    }, e.prototype.position_score = function(e, t) {
      var n, r, i, s;
      s = 0;
      for (i in t) r = t[i], n = e.indexOf(r), n > -1 && (s += Math.abs(n - i));
      return s
    }, e.prototype.exist_score = function(e, t) {
      var n, r, i, s, o;
      n = 0;
      for (s = 0, o = t.length; s < o; s++) i = t[s],
      function() {
        var t, n, s;
        s = [];
        for (t = 0, n = e.length; t < n; t++) r = e[t], r[0] === i[0] && s.push(r);
        return s
      }().length > 0 || (n += 1);
      return n
    }, e.prototype.count_score = function(e, t) {
      var n, r, i, s, o, u;
      s = 0;
      for (o = 0, u = t.length; o < u; o++) i = t[o], r = function() {
        var t, r, s;
        s = [];
        for (t = 0, r = e.length; t < r; t++) n = e[t], n[0] === i[0] && s.push(n);
        return s
      }()[0], r != null && (s += Math.abs(r.length - i.length));
      return s
    }, e.prototype.rank = function(e) {
      var t, n, r, i, s, o;
      n = this.separate(e), t = {}, o = this.all_separated_patterns();
      for (i = 0, s = o.length; i < s; i++) r = o[i], t[r.join("")] = this.score(r, n);
      return t
    }, e
  }(), e.NumberFormatter = function() {
    function t() {
      this.all_tokens = {
        decimal: {
          positive: ["", "#,##0.###"],
          negative: ["-", "#,##0.###"]
        },
        percent: {
          positive: ["", "#,##0", "%"],
          negative: ["-", "#,##0", "%"]
        },
        currency: {
          positive: ["¤", "#,##0.00"],
          negative: ["-(¤", "#,##0.00", ")"]
        },
        short_decimal: {
          positive: {
            1e3: ["", "0", "k"],
            1e4: ["", "00", "k"],
            1e5: ["", "000", "k"],
            1e6: ["", "0", "M"],
            1e7: ["", "00", "M"],
            1e8: ["", "000", "M"],
            1e9: ["", "0", "B"],
            1e10: ["", "00", "B"],
            1e11: ["", "000", "B"],
            1e12: ["", "0", "T"],
            1e13: ["", "00", "T"],
            1e14: ["", "000", "T"]
          },
          negative: {
            1e3: ["-", "0", "k"],
            1e4: ["-", "00", "k"],
            1e5: ["-", "000", "k"],
            1e6: ["-", "0", "M"],
            1e7: ["-", "00", "M"],
            1e8: ["-", "000", "M"],
            1e9: ["-", "0", "B"],
            1e10: ["-", "00", "B"],
            1e11: ["-", "000", "B"],
            1e12: ["-", "0", "T"],
            1e13: ["-", "00", "T"],
            1e14: ["-", "000", "T"]
          }
        },
        long_decimal: {
          positive: {
            1e3: ["", "0", " thousand"],
            1e4: ["", "00", " thousand"],
            1e5: ["", "000", " thousand"],
            1e6: ["", "0", " million"],
            1e7: ["", "00", " million"],
            1e8: ["", "000", " million"],
            1e9: ["", "0", " billion"],
            1e10: ["", "00", " billion"],
            1e11: ["", "000", " billion"],
            1e12: ["", "0", " trillion"],
            1e13: ["", "00", " trillion"],
            1e14: ["", "000", " trillion"]
          },
          negative: {
            1e3: ["-", "0", " thousand"],
            1e4: ["-", "00", " thousand"],
            1e5: ["-", "000", " thousand"],
            1e6: ["-", "0", " million"],
            1e7: ["-", "00", " million"],
            1e8: ["-", "000", " million"],
            1e9: ["-", "0", " billion"],
            1e10: ["-", "00", " billion"],
            1e11: ["-", "000", " billion"],
            1e12: ["-", "0", " trillion"],
            1e13: ["-", "00", " trillion"],
            1e14: ["-", "000", " trillion"]
          }
        }
      }, this.tokens = [], this.symbols = {
        alias: "",
        decimal: ".",
        exponential: "E",
        group: ",",
        infinity: "∞",
        list: ";",
        minus_sign: "-",
        nan: "NaN",
        per_mille: "‰",
        percent_sign: "%",
        plus_sign: "+"
      }, this.default_symbols = {
        group: ",",
        decimal: ".",
        plus_sign: "+",
        minus_sign: "-"
      }
    }
    return t.prototype.format = function(e, t) {
      var n, r, i, s, o, u, a, f, l, c, h, p, d;
      t == null && (t = {}), u = this.default_format_options_for(e);
      for (o in t) h = t[o], u[o] = t[o] != null ? t[o] : u[o];
      return p = this.partition_tokens(this.get_tokens(e, u)), a = p[0], c = p[1], i = p[2], r = p[3], e = this.transform_number(e), d = this.parse_number(e, u), s = d[0], n = d[1], f = i.apply(parseFloat(s), u), n && (f += r.apply(n, u)),
      l = e < 0 && a !== "-" ? this.symbols.minus_sign || this.default_symbols.minus_sign : "", "" + a + f + c
    }, t.prototype.transform_number = function(e) {
      return e
    }, t.prototype.partition_tokens = function(t) {
      return [t[0] || "", t[2] || "", new e.NumberFormatter.IntegerHelper(t[1], this.symbols), new e.NumberFormatter.FractionHelper(t[1], this.symbols)]
    }, t.prototype.parse_number = function(e, t) {
      var n;
      return t == null && (t = {}), t.precision != null ? n = t.precision : n = this.precision_from(e), e = this.round_to(e, n), Math.abs(e).toFixed(n).split(".")
    }, t.prototype.precision_from = function(e) {
      var t;
      return t = e.toString().split("."), t.length === 2 ? t[1].length : 0
    }, t.prototype.round_to = function(e, t) {
      var n;
      return n = Math.pow(10, t), Math.round(e * n) / n
    }, t.prototype.get_tokens = function() {
      throw "get_tokens() not implemented - use a derived class like PercentFormatter."
    }, t
  }(), e.PercentFormatter = function(e) {
    function t(e) {
      e == null && (e = {}), this.default_percent_sign = "%", t.__super__.constructor.apply(this, arguments)
    }
    return f(t, e), t.prototype.format = function(e, n) {
      return n == null && (n = {}), t.__super__.format.call(this, e, n).replace("¤", this.symbols.percent_sign || this.default_percent_sign)
    }, t.prototype.default_format_options_for = function(e) {
      return {
        precision: 0
      }
    }, t.prototype.get_tokens = function(e, t) {
      return e < 0 ? this.all_tokens.percent.negative : this.all_tokens.percent.positive
    }, t
  }(e.NumberFormatter), e.DecimalFormatter = function(e) {
    function t() {
      return i = t.__super__.constructor.apply(this, arguments), i
    }
    return f(t, e), t.prototype.format = function(e, n) {
      var r;
      n == null && (n = {});
      try {
        return t.__super__.format.call(this, e, n)
      } catch (i) {
        return r = i, e
      }
    }, t.prototype.default_format_options_for = function(e) {
      return {
        precision: this.precision_from(e)
      }
    }, t.prototype.get_tokens = function(e, t) {
      return t == null && (t = {}), e < 0 ? this.all_tokens.decimal.negative : this.all_tokens.decimal.positive
    }, t
  }(e.NumberFormatter), e.CurrencyFormatter = function(t) {
    function n(e) {
      e == null && (e = {}), this.default_currency_symbol = "$", this.default_precision = 2, n.__super__.constructor.apply(this, arguments)
    }
    return f(n, t), n.prototype.format = function(t, r) {
      var i, s;
      return r == null && (r = {}), r.currency ? e.Currencies != null ? (i = e.Currencies.for_code(r.currency), i || (i = {
        symbol: r.currency
      })) : i = {
        symbol: r.currency
      } : i = {
        symbol: this.default_currency_symbol
      }, s = r.use_cldr_symbol ? i.cldr_symbol : i.symbol, n.__super__.format.call(this, t, r).replace("¤", s)
    }, n.prototype.default_format_options_for = function(e) {
      var t;
      return t = this.precision_from(e), t === 0 && (t = this.default_precision), {
        precision: t
      }
    }, n.prototype.get_tokens = function(e, t) {
      return t == null && (t = {}), e < 0 ? this.all_tokens.currency.negative : this.all_tokens.currency.positive
    }, n
  }(e.NumberFormatter), e.AbbreviatedNumberFormatter = function(e) {
    function t() {
      return s = t.__super__.constructor.apply(this, arguments), s
    }
    return f(t, e), t.prototype.NUMBER_MAX = Math.pow(10, 15), t.prototype.NUMBER_MIN = 1e3, t.prototype.default_format_options_for = function(e) {
      return {
        precision: this.precision_from(e)
      }
    }, t.prototype.get_type = function() {
      return "decimal"
    }, t.prototype.get_key = function(e) {
      var t, n;
      return n = function() {
        var n, r, i;
        i = [];
        for (t = n = 0, r = Math.floor(e).toString().length - 1; 0 <= r ? n < r : n > r; t = 0 <= r ? ++n : --n) i.push("0");
        return i
      }().join(""), "1" + n
    }, t.prototype.get_tokens = function(e, t) {
      var n, r, i;
      return t == null && (t = {}), i = e < this.NUMBER_MAX && e >= this.NUMBER_MIN ? this.get_type() : "decimal", n = i === this.get_type() ? this.get_key(e) : null, r = this.all_tokens[i], r = e < 0 ? r.negative : r.positive, n != null && (r = r[n]), r
    }, t.prototype.transform_number = function(e) {
      var t, n;
      return e < this.NUMBER_MAX && e >= this.NUMBER_MIN ? (n = Math.floor((e.toString().length - 1) / 3) * 3, t = Math.pow(10, n), e / t) : e
    }, t
  }(e.NumberFormatter), e.ShortDecimalFormatter = function(e) {
    function t() {
      return o = t.__super__.constructor.apply(this, arguments), o
    }
    return f(t, e), t.prototype.get_type = function() {
      return "short_decimal"
    }, t
  }(e.AbbreviatedNumberFormatter), e.LongDecimalFormatter = function(e) {
    function t() {
      return u = t.__super__.constructor.apply(this, arguments), u
    }
    return f(t, e), t.prototype.get_type = function() {
      return "long_decimal"
    }, t
  }(e.AbbreviatedNumberFormatter), e.NumberFormatter.BaseHelper = function() {
    function e() {}
    return e.prototype.interpolate = function(e, t, n) {
      var r, i, s;
      return n == null && (n = "right"), t = t.toString(), i = t.length, s = n === "left" ? 0 : -i, e.length < i && (e = (function() {
        var e, t;
        t = [];
        for (r = e = 0; 0 <= i ? e < i : e > i; r = 0 <= i ? ++e : --e) t.push("#");
        return t
      }().join("") + e).slice(-i)), s < 0 ? e = e.slice(0, s + e.length) + t : e = e.slice(0, s) + t + e.slice(i), e.replace(/#/g, "")
    }, e
  }(), e.NumberFormatter.IntegerHelper = function(e) {
    function t(e, t) {
      var n;
      t == null && (t = {}), n = e.split(".")[0], this.format = this.prepare_format(n, t), this.groups = this.parse_groups(n), this.separator = t.group || ","
    }
    return f(t, e), t.prototype.apply = function(e, t) {
      return t == null && (t = {}), this.format_groups(this.interpolate(this.format, parseInt(e)))
    }, t.prototype.format_groups = function(e) {
      var t, n, r;
      if (this.groups.length === 0) return e;
      r = [], t = this.chop_group(e, this.groups[0]), r.push(t), t && (e = e.slice(0, e.length - t.length));
      while (e.length > this.groups[this.groups.length - 1]) t = this.chop_group(e, this.groups[this.groups.length - 1]), r.push(t), t && (e = e.slice(0, e.length - t.length));
      return r.push(e),
      function() {
        var e, t, i;
        i = [];
        for (e = 0, t = r.length; e < t; e++) n = r[e], n !== null && i.push(n);
        return i
      }().reverse().join(this.separator)
    }, t.prototype.parse_groups = function(e) {
      var t, n, r, i;
      return t = e.lastIndexOf(","), t > 0 ? (n = e.slice(0, t), i = [e.length - t - 1], n.lastIndexOf(",") > -1 && i.push(n.length - n.lastIndexOf(",") - 1), i = function() {
        var e, t, n;
        n = [];
        for (e = 0, t = i.length; e < t; e++) r = i[e], r !== null && n.push(r);
        return n
      }(), i.reverse(), function() {
        var e, n, r;
        r = [];
        for (t = e = 0, n = i.length; 0 <= n ? e < n : e > n; t = 0 <= n ? ++e : --e) i.indexOf(i[t], t + 1) === -1 && r.push(i[t]);
        return r
      }().reverse()) : []
    }, t.prototype.chop_group = function(e, t) {
      return e.length > t ? e.slice(-t) : null
    }, t.prototype.prepare_format = function(e, t) {
      return e.replace(",", "").replace("+", t.plus_sign).replace("-", t.minus_sign)
    }, t
  }(e.NumberFormatter.BaseHelper), e.NumberFormatter.FractionHelper = function(e) {
    function t(e, t) {
      t == null && (t = {}), this.format = e ? e.split(".").pop() : "", this.decimal = t.decimal || ".", this.precision = this.format.length
    }
    return f(t, e), t.prototype.apply = function(e, t) {
      var n;
      return t == null && (t = {}), n = t.precision != null ? t.precision : this.precision, n > 0 ? this.decimal + this.interpolate(this.format_for(t), e, "left") : ""
    }, t.prototype.format_for = function(e) {
      var t, n;
      return n = e.precision != null ? e.precision : this.precision, n ? function() {
        var e, r;
        r = [];
        for (t = e = 0; 0 <= n ? e < n : e > n; t = 0 <= n ? ++e : --e) r.push("0");
        return r
      }().join("") : this.format
    }, t
  }(e.NumberFormatter.BaseHelper), e.Currencies = function() {
    function e() {}
    return e.currencies = {
      ADP: {
        currency: "ADP",
        name: "Andorran peseta",
        cldr_symbol: "ADP",
        symbol: "ADP",
        code_points: [65, 68, 80]
      },
      AED: {
        currency: "AED",
        name: "UAE dirham",
        cldr_symbol: "AED",
        symbol: "AED",
        code_points: [65, 69, 68]
      },
      AFA: {
        currency: "AFA",
        name: "Afghan afghani (1927-2002)",
        cldr_symbol: "AFA",
        symbol: "AFA",
        code_points: [65, 70, 65]
      },
      AFN: {
        currency: "AFN",
        name: "Afghan Afghani",
        cldr_symbol: "AFN",
        symbol: "؋",
        code_points: [1547]
      },
      ALK: {
        currency: "ALK",
        name: "Albanian lek (1946-1965)",
        cldr_symbol: "ALK",
        symbol: "ALK",
        code_points: [65, 76, 75]
      },
      ALL: {
        currency: "ALL",
        name: "Albanian lek",
        cldr_symbol: "ALL",
        symbol: "LEK",
        code_points: [76, 69, 75]
      },
      AMD: {
        currency: "AMD",
        name: "Armenian dram",
        cldr_symbol: "AMD",
        symbol: "AMD",
        code_points: [65, 77, 68]
      },
      ANG: {
        currency: "ANG",
        name: "Netherlands Antillean guilder",
        cldr_symbol: "ANG",
        symbol: "ƒ",
        code_points: [402]
      },
      AOA: {
        currency: "AOA",
        name: "Angolan kwanza",
        cldr_symbol: "AOA",
        symbol: "AOA",
        code_points: [65, 79, 65]
      },
      AOK: {
        currency: "AOK",
        name: "Angolan kwanza (1977-1991)",
        cldr_symbol: "AOK",
        symbol: "AOK",
        code_points: [65, 79, 75]
      },
      AON: {
        currency: "AON",
        name: "Angolan new kwanza (1990-2000)",
        cldr_symbol: "AON",
        symbol: "AON",
        code_points: [65, 79, 78]
      },
      AOR: {
        currency: "AOR",
        name: "Angolan readjusted kwanza (1995-1999)",
        cldr_symbol: "AOR",
        symbol: "AOR",
        code_points: [65, 79, 82]
      },
      ARA: {
        currency: "ARA",
        name: "Argentine austral",
        cldr_symbol: "ARA",
        symbol: "ARA",
        code_points: [65, 82, 65]
      },
      ARL: {
        currency: "ARL",
        name: "Argentine peso ley (1970-1983)",
        cldr_symbol: "ARL",
        symbol: "ARL",
        code_points: [65, 82, 76]
      },
      ARM: {
        currency: "ARM",
        name: "Argentine peso (1881-1970)",
        cldr_symbol: "ARM",
        symbol: "ARM",
        code_points: [65, 82, 77]
      },
      ARP: {
        currency: "ARP",
        name: "Argentine peso (1983-1985)",
        cldr_symbol: "ARP",
        symbol: "ARP",
        code_points: [65, 82, 80]
      },
      ARS: {
        currency: "ARS",
        name: "Argentine peso",
        cldr_symbol: "ARS",
        symbol: "$",
        code_points: [36]
      },
      ATS: {
        currency: "ATS",
        name: "Austrian schilling",
        cldr_symbol: "ATS",
        symbol: "ATS",
        code_points: [65, 84, 83]
      },
      AUD: {
        currency: "AUD",
        name: "Australian dollar",
        cldr_symbol: "A$",
        symbol: "$",
        code_points: [36]
      },
      AWG: {
        currency: "AWG",
        name: "Aruban florin",
        cldr_symbol: "AWG",
        symbol: "ƒ",
        code_points: [402],
        alt_name: "Florins"
      },
      AZM: {
        currency: "AZM",
        name: "Azerbaijani manat (1993-2006)",
        cldr_symbol: "AZM",
        symbol: "AZM",
        code_points: [65, 90, 77]
      },
      AZN: {
        currency: "AZN",
        name: "Azerbaijani manat",
        cldr_symbol: "AZN",
        symbol: "ман",
        code_points: [1084, 1072, 1085]
      },
      BAD: {
        currency: "BAD",
        name: "Bosnia-Herzegovina dinar (1992-1994)",
        cldr_symbol: "BAD",
        symbol: "BAD",
        code_points: [66, 65, 68]
      },
      BAM: {
        currency: "BAM",
        name: "Bosnia-Herzegovina convertible mark",
        cldr_symbol: "BAM",
        symbol: "KM",
        code_points: [75, 77]
      },
      BAN: {
        currency: "BAN",
        name: "Bosnia-Herzegovina new dinar (1994-1997)",
        cldr_symbol: "BAN",
        symbol: "BAN",
        code_points: [66, 65, 78]
      },
      BBD: {
        currency: "BBD",
        name: "Barbadian dollar",
        cldr_symbol: "BBD",
        symbol: "$",
        code_points: [36]
      },
      BDT: {
        currency: "BDT",
        name: "Bangladeshi taka",
        cldr_symbol: "BDT",
        symbol: "BDT",
        code_points: [66, 68, 84]
      },
      BEC: {
        currency: "BEC",
        name: "Belgian franc (convertible)",
        cldr_symbol: "BEC",
        symbol: "BEC",
        code_points: [66, 69, 67]
      },
      BEF: {
        currency: "BEF",
        name: "Belgian franc",
        cldr_symbol: "BEF",
        symbol: "BEF",
        code_points: [66, 69, 70]
      },
      BEL: {
        currency: "BEL",
        name: "Belgian franc (financial)",
        cldr_symbol: "BEL",
        symbol: "BEL",
        code_points: [66, 69, 76]
      },
      BGL: {
        currency: "BGL",
        name: "Bulgarian hard lev",
        cldr_symbol: "BGL",
        symbol: "BGL",
        code_points: [66, 71, 76]
      },
      BGM: {
        currency: "BGM",
        name: "Bulgarian socialist lev",
        cldr_symbol: "BGM",
        symbol: "BGM",
        code_points: [66, 71, 77]
      },
      BGN: {
        currency: "BGN",
        name: "Bulgarian lev",
        cldr_symbol: "BGN",
        symbol: "лв",
        code_points: [1083, 1074]
      },
      BGO: {
        currency: "BGO",
        name: "Bulgarian lev (1879-1952)",
        cldr_symbol: "BGO",
        symbol: "BGO",
        code_points: [66, 71, 79]
      },
      BHD: {
        currency: "BHD",
        name: "Bahraini dinar",
        cldr_symbol: "BHD",
        symbol: "BHD",
        code_points: [66, 72, 68]
      },
      BIF: {
        currency: "BIF",
        name: "Burundian franc",
        cldr_symbol: "BIF",
        symbol: "BIF",
        code_points: [66, 73, 70]
      },
      BMD: {
        currency: "BMD",
        name: "Bermudan dollar",
        cldr_symbol: "BMD",
        symbol: "$",
        code_points: [36]
      },
      BND: {
        currency: "BND",
        name: "Brunei dollar",
        cldr_symbol: "BND",
        symbol: "$",
        code_points: [36]
      },
      BOB: {
        currency: "BOB",
        name: "Bolivian boliviano",
        cldr_symbol: "BOB",
        symbol: "$b",
        code_points: [36, 98]
      },
      BOL: {
        currency: "BOL",
        name: "Bolivian boliviano (1863-1963)",
        cldr_symbol: "BOL",
        symbol: "BOL",
        code_points: [66, 79, 76]
      },
      BOP: {
        currency: "BOP",
        name: "Bolivian peso",
        cldr_symbol: "BOP",
        symbol: "BOP",
        code_points: [66, 79, 80]
      },
      BOV: {
        currency: "BOV",
        name: "Bolivian mvdol",
        cldr_symbol: "BOV",
        symbol: "BOV",
        code_points: [66, 79, 86]
      },
      BRB: {
        currency: "BRB",
        name: "Brazilian new cruzeiro (1967-1986)",
        cldr_symbol: "BRB",
        symbol: "BRB",
        code_points: [66, 82, 66]
      },
      BRC: {
        currency: "BRC",
        name: "Brazilian cruzado (1986-1989)",
        cldr_symbol: "BRC",
        symbol: "BRC",
        code_points: [66, 82, 67]
      },
      BRE: {
        currency: "BRE",
        name: "Brazilian cruzeiro (1990-1993)",
        cldr_symbol: "BRE",
        symbol: "BRE",
        code_points: [66, 82, 69]
      },
      BRL: {
        currency: "BRL",
        name: "Brazilian real",
        cldr_symbol: "R$",
        symbol: "R$",
        code_points: [82, 36]
      },
      BRN: {
        currency: "BRN",
        name: "Brazilian new cruzado (1989-1990)",
        cldr_symbol: "BRN",
        symbol: "BRN",
        code_points: [66, 82, 78]
      },
      BRR: {
        currency: "BRR",
        name: "Brazilian cruzeiro (1993-1994)",
        cldr_symbol: "BRR",
        symbol: "BRR",
        code_points: [66, 82, 82]
      },
      BRZ: {
        currency: "BRZ",
        name: "Brazilian cruzeiro (1942-1967)",
        cldr_symbol: "BRZ",
        symbol: "BRZ",
        code_points: [66, 82, 90]
      },
      BSD: {
        currency: "BSD",
        name: "Bahamian dollar",
        cldr_symbol: "BSD",
        symbol: "$",
        code_points: [36]
      },
      BTN: {
        currency: "BTN",
        name: "Bhutanese ngultrum",
        cldr_symbol: "BTN",
        symbol: "BTN",
        code_points: [66, 84, 78]
      },
      BUK: {
        currency: "BUK",
        name: "Burmese kyat",
        cldr_symbol: "BUK",
        symbol: "BUK",
        code_points: [66, 85, 75]
      },
      BWP: {
        currency: "BWP",
        name: "Botswanan pula",
        cldr_symbol: "BWP",
        symbol: "P",
        code_points: [80]
      },
      BYB: {
        currency: "BYB",
        name: "Belarusian new ruble (1994-1999)",
        cldr_symbol: "BYB",
        symbol: "BYB",
        code_points: [66, 89, 66]
      },
      BYR: {
        currency: "BYR",
        name: "Belarusian ruble",
        cldr_symbol: "BYR",
        symbol: "p.",
        code_points: [112, 46]
      },
      BZD: {
        currency: "BZD",
        name: "Belize dollar",
        cldr_symbol: "BZD",
        symbol: "BZ$",
        code_points: [66, 90, 36]
      },
      CAD: {
        currency: "CAD",
        name: "Canadian dollar",
        cldr_symbol: "CA$",
        symbol: "$",
        code_points: [36]
      },
      CDF: {
        currency: "CDF",
        name: "Congolese franc",
        cldr_symbol: "CDF",
        symbol: "CDF",
        code_points: [67, 68, 70]
      },
      CHE: {
        currency: "CHE",
        name: "WIR euro",
        cldr_symbol: "CHE",
        symbol: "CHE",
        code_points: [67, 72, 69]
      },
      CHF: {
        currency: "CHF",
        name: "Swiss franc",
        cldr_symbol: "CHF",
        symbol: "CHF",
        code_points: [67, 72, 70]
      },
      CHW: {
        currency: "CHW",
        name: "WIR franc",
        cldr_symbol: "CHW",
        symbol: "CHW",
        code_points: [67, 72, 87]
      },
      CLE: {
        currency: "CLE",
        name: "Chilean escudo",
        cldr_symbol: "CLE",
        symbol: "CLE",
        code_points: [67, 76, 69]
      },
      CLF: {
        currency: "CLF",
        name: "Chilean unit of account (UF)",
        cldr_symbol: "CLF",
        symbol: "CLF",
        code_points: [67, 76, 70]
      },
      CLP: {
        currency: "CLP",
        name: "Chilean peso",
        cldr_symbol: "CLP",
        symbol: "$",
        code_points: [36]
      },
      CNX: {
        currency: "CNX",
        name: "Chinese People’s Bank dollar",
        cldr_symbol: "CNX",
        symbol: "CNX",
        code_points: [67, 78, 88]
      },
      CNY: {
        currency: "CNY",
        name: "Chinese yuan",
        cldr_symbol: "CN¥",
        symbol: "¥",
        code_points: [165]
      },
      COP: {
        currency: "COP",
        name: "Colombian peso",
        cldr_symbol: "COP",
        symbol: "$",
        code_points: [36]
      },
      COU: {
        currency: "COU",
        name: "Colombian real value unit",
        cldr_symbol: "COU",
        symbol: "COU",
        code_points: [67, 79, 85]
      },
      CRC: {
        currency: "CRC",
        name: "Costa Rican colón",
        cldr_symbol: "CRC",
        symbol: "₡",
        code_points: [8353]
      },
      CSD: {
        currency: "CSD",
        name: "Serbian dinar (2002-2006)",
        cldr_symbol: "CSD",
        symbol: "CSD",
        code_points: [67, 83, 68]
      },
      CSK: {
        currency: "CSK",
        name: "Czechoslovak hard koruna",
        cldr_symbol: "CSK",
        symbol: "CSK",
        code_points: [67, 83, 75]
      },
      CUC: {
        currency: "CUC",
        name: "Cuban convertible peso",
        cldr_symbol: "CUC",
        symbol: "CUC",
        code_points: [67, 85, 67]
      },
      CUP: {
        currency: "CUP",
        name: "Cuban peso",
        cldr_symbol: "CUP",
        symbol: "₱",
        code_points: [8369]
      },
      CVE: {
        currency: "CVE",
        name: "Cape Verdean escudo",
        cldr_symbol: "CVE",
        symbol: "CVE",
        code_points: [67, 86, 69]
      },
      CYP: {
        currency: "CYP",
        name: "Cypriot pound",
        cldr_symbol: "CYP",
        symbol: "CYP",
        code_points: [67, 89, 80]
      },
      CZK: {
        currency: "CZK",
        name: "Czech Republic koruna",
        cldr_symbol: "CZK",
        symbol: "Kč",
        code_points: [75, 269]
      },
      DDM: {
        currency: "DDM",
        name: "East German mark",
        cldr_symbol: "DDM",
        symbol: "DDM",
        code_points: [68, 68, 77]
      },
      DEM: {
        currency: "DEM",
        name: "German mark",
        cldr_symbol: "DEM",
        symbol: "DEM",
        code_points: [68, 69, 77]
      },
      DJF: {
        currency: "DJF",
        name: "Djiboutian franc",
        cldr_symbol: "DJF",
        symbol: "DJF",
        code_points: [68, 74, 70]
      },
      DKK: {
        currency: "DKK",
        name: "Danish krone",
        cldr_symbol: "DKK",
        symbol: "kr",
        code_points: [107, 114]
      },
      DOP: {
        currency: "DOP",
        name: "Dominican peso",
        cldr_symbol: "DOP",
        symbol: "RD$",
        code_points: [82, 68, 36]
      },
      DZD: {
        currency: "DZD",
        name: "Algerian dinar",
        cldr_symbol: "DZD",
        symbol: "DZD",
        code_points: [68, 90, 68]
      },
      ECS: {
        currency: "ECS",
        name: "Ecuadorian sucre",
        cldr_symbol: "ECS",
        symbol: "ECS",
        code_points: [69, 67, 83]
      },
      ECV: {
        currency: "ECV",
        name: "Ecuadorian unit of constant value",
        cldr_symbol: "ECV",
        symbol: "ECV",
        code_points: [69, 67, 86]
      },
      EEK: {
        currency: "EEK",
        name: "Estonian kroon",
        cldr_symbol: "EEK",
        symbol: "kr",
        code_points: [107, 114]
      },
      EGP: {
        currency: "EGP",
        name: "Egyptian pound",
        cldr_symbol: "EGP",
        symbol: "£",
        code_points: [163]
      },
      ERN: {
        currency: "ERN",
        name: "Eritrean nakfa",
        cldr_symbol: "ERN",
        symbol: "ERN",
        code_points: [69, 82, 78]
      },
      ESA: {
        currency: "ESA",
        name: "Spanish peseta (A account)",
        cldr_symbol: "ESA",
        symbol: "ESA",
        code_points: [69, 83, 65]
      },
      ESB: {
        currency: "ESB",
        name: "Spanish peseta (convertible account)",
        cldr_symbol: "ESB",
        symbol: "ESB",
        code_points: [69, 83, 66]
      },
      ESP: {
        currency: "ESP",
        name: "Spanish peseta",
        cldr_symbol: "ESP",
        symbol: "ESP",
        code_points: [69, 83, 80]
      },
      ETB: {
        currency: "ETB",
        name: "Ethiopian birr",
        cldr_symbol: "ETB",
        symbol: "ETB",
        code_points: [69, 84, 66]
      },
      EUR: {
        currency: "EUR",
        name: "euro",
        cldr_symbol: "€",
        symbol: "€",
        code_points: [8364]
      },
      FIM: {
        currency: "FIM",
        name: "Finnish markka",
        cldr_symbol: "FIM",
        symbol: "FIM",
        code_points: [70, 73, 77]
      },
      FJD: {
        currency: "FJD",
        name: "Fijian dollar",
        cldr_symbol: "FJD",
        symbol: "FJD",
        code_points: [70, 74, 68]
      },
      FKP: {
        currency: "FKP",
        name: "Falkland Islands pound",
        cldr_symbol: "FKP",
        symbol: "£",
        code_points: [163]
      },
      FRF: {
        currency: "FRF",
        name: "French franc",
        cldr_symbol: "FRF",
        symbol: "FRF",
        code_points: [70, 82, 70]
      },
      GBP: {
        currency: "GBP",
        name: "British pound sterling",
        cldr_symbol: "£",
        symbol: "£",
        code_points: [163]
      },
      GEK: {
        currency: "GEK",
        name: "Georgian kupon larit",
        cldr_symbol: "GEK",
        symbol: "GEK",
        code_points: [71, 69, 75]
      },
      GEL: {
        currency: "GEL",
        name: "Georgian lari",
        cldr_symbol: "GEL",
        symbol: "GEL",
        code_points: [71, 69, 76]
      },
      GHC: {
        currency: "GHC",
        name: "Ghanaian cedi (1979-2007)",
        cldr_symbol: "GHC",
        symbol: "GHC",
        code_points: [71, 72, 67]
      },
      GHS: {
        currency: "GHS",
        name: "Ghanaian cedi",
        cldr_symbol: "GHS",
        symbol: "¢",
        code_points: [162]
      },
      GIP: {
        currency: "GIP",
        name: "Gibraltar pound",
        cldr_symbol: "GIP",
        symbol: "£",
        code_points: [163]
      },
      GMD: {
        currency: "GMD",
        name: "Gambian dalasi",
        cldr_symbol: "GMD",
        symbol: "GMD",
        code_points: [71, 77, 68]
      },
      GNF: {
        currency: "GNF",
        name: "Guinean franc",
        cldr_symbol: "GNF",
        symbol: "GNF",
        code_points: [71, 78, 70]
      },
      GNS: {
        currency: "GNS",
        name: "Guinean syli",
        cldr_symbol: "GNS",
        symbol: "GNS",
        code_points: [71, 78, 83]
      },
      GQE: {
        currency: "GQE",
        name: "Equatorial Guinean ekwele",
        cldr_symbol: "GQE",
        symbol: "GQE",
        code_points: [71, 81, 69]
      },
      GRD: {
        currency: "GRD",
        name: "Greek drachma",
        cldr_symbol: "GRD",
        symbol: "GRD",
        code_points: [71, 82, 68]
      },
      GTQ: {
        currency: "GTQ",
        name: "Guatemalan quetzal",
        cldr_symbol: "GTQ",
        symbol: "Q",
        code_points: [81]
      },
      GWE: {
        currency: "GWE",
        name: "Portuguese Guinea escudo",
        cldr_symbol: "GWE",
        symbol: "GWE",
        code_points: [71, 87, 69]
      },
      GWP: {
        currency: "GWP",
        name: "Guinea-Bissau peso",
        cldr_symbol: "GWP",
        symbol: "GWP",
        code_points: [71, 87, 80]
      },
      GYD: {
        currency: "GYD",
        name: "Guyanaese dollar",
        cldr_symbol: "GYD",
        symbol: "GYD",
        code_points: [71, 89, 68]
      },
      HKD: {
        currency: "HKD",
        name: "Hong Kong dollar",
        cldr_symbol: "HK$",
        symbol: "$",
        code_points: [36]
      },
      HNL: {
        currency: "HNL",
        name: "Honduran lempira",
        cldr_symbol: "HNL",
        symbol: "L",
        code_points: [76]
      },
      HRD: {
        currency: "HRD",
        name: "Croatian dinar",
        cldr_symbol: "HRD",
        symbol: "HRD",
        code_points: [72, 82, 68]
      },
      HRK: {
        currency: "HRK",
        name: "Croatian kuna",
        cldr_symbol: "HRK",
        symbol: "kn",
        code_points: [107, 110]
      },
      HTG: {
        currency: "HTG",
        name: "Haitian gourde",
        cldr_symbol: "HTG",
        symbol: "HTG",
        code_points: [72, 84, 71]
      },
      HUF: {
        currency: "HUF",
        name: "Hungarian forint",
        cldr_symbol: "HUF",
        symbol: "Ft",
        code_points: [70, 116]
      },
      IDR: {
        currency: "IDR",
        name: "Indonesian rupiah",
        cldr_symbol: "IDR",
        symbol: "Rp",
        code_points: [82, 112]
      },
      IEP: {
        currency: "IEP",
        name: "Irish pound",
        cldr_symbol: "IEP",
        symbol: "IEP",
        code_points: [73, 69, 80]
      },
      ILP: {
        currency: "ILP",
        name: "Israeli pound",
        cldr_symbol: "ILP",
        symbol: "ILP",
        code_points: [73, 76, 80]
      },
      ILR: {
        currency: "ILR",
        name: "Israeli sheqel (1980-1985)",
        cldr_symbol: "ILR",
        symbol: "ILR",
        code_points: [73, 76, 82]
      },
      ILS: {
        currency: "ILS",
        name: "Israeli new sheqel",
        cldr_symbol: "₪",
        symbol: "₪",
        code_points: [8362]
      },
      INR: {
        currency: "INR",
        name: "Indian rupee",
        cldr_symbol: "₹",
        symbol: "₨",
        code_points: [8360]
      },
      IQD: {
        currency: "IQD",
        name: "Iraqi dinar",
        cldr_symbol: "IQD",
        symbol: "IQD",
        code_points: [73, 81, 68]
      },
      IRR: {
        currency: "IRR",
        name: "Iranian rial",
        cldr_symbol: "IRR",
        symbol: "﷼",
        code_points: [65020]
      },
      ISJ: {
        currency: "ISJ",
        name: "Icelandic króna (1918-1981)",
        cldr_symbol: "ISJ",
        symbol: "ISJ",
        code_points: [73, 83, 74]
      },
      ISK: {
        currency: "ISK",
        name: "Icelandic króna",
        cldr_symbol: "ISK",
        symbol: "kr",
        code_points: [107, 114]
      },
      ITL: {
        currency: "ITL",
        name: "Italian lira",
        cldr_symbol: "ITL",
        symbol: "ITL",
        code_points: [73, 84, 76]
      },
      JMD: {
        currency: "JMD",
        name: "Jamaican dollar",
        cldr_symbol: "JMD",
        symbol: "JMD",
        code_points: [74, 77, 68]
      },
      JOD: {
        currency: "JOD",
        name: "Jordanian dinar",
        cldr_symbol: "JOD",
        symbol: "JOD",
        code_points: [74, 79, 68]
      },
      JPY: {
        currency: "JPY",
        name: "Japanese yen",
        cldr_symbol: "¥",
        symbol: "¥",
        code_points: [165]
      },
      KES: {
        currency: "KES",
        name: "Kenyan shilling",
        cldr_symbol: "KES",
        symbol: "KES",
        code_points: [75, 69, 83]
      },
      KGS: {
        currency: "KGS",
        name: "Kyrgystani som",
        cldr_symbol: "KGS",
        symbol: "лв",
        code_points: [1083, 1074]
      },
      KHR: {
        currency: "KHR",
        name: "Cambodian riel",
        cldr_symbol: "KHR",
        symbol: "KHR",
        code_points: [75, 72, 82]
      },
      KMF: {
        currency: "KMF",
        name: "Comorian franc",
        cldr_symbol: "KMF",
        symbol: "KMF",
        code_points: [75, 77, 70]
      },
      KPW: {
        currency: "KPW",
        name: "North Korean won",
        cldr_symbol: "KPW",
        symbol: "₩",
        code_points: [8361]
      },
      KRH: {
        currency: "KRH",
        name: "South Korean hwan (1953-1962)",
        cldr_symbol: "KRH",
        symbol: "KRH",
        code_points: [75, 82, 72]
      },
      KRO: {
        currency: "KRO",
        name: "South Korean won (1945-1953)",
        cldr_symbol: "KRO",
        symbol: "KRO",
        code_points: [75, 82, 79]
      },
      KRW: {
        currency: "KRW",
        name: "South Korean won",
        cldr_symbol: "₩",
        symbol: "₩",
        code_points: [8361]
      },
      KWD: {
        currency: "KWD",
        name: "Kuwaiti dinar",
        cldr_symbol: "KWD",
        symbol: "KWD",
        code_points: [75, 87, 68]
      },
      KYD: {
        currency: "KYD",
        name: "Cayman Islands dollar",
        cldr_symbol: "KYD",
        symbol: "$",
        code_points: [36]
      },
      KZT: {
        currency: "KZT",
        name: "Kazakhstani tenge",
        cldr_symbol: "KZT",
        symbol: "лв",
        code_points: [1083, 1074]
      },
      LAK: {
        currency: "LAK",
        name: "Laotian kip",
        cldr_symbol: "LAK",
        symbol: "₭",
        code_points: [8365]
      },
      LBP: {
        currency: "LBP",
        name: "Lebanese pound",
        cldr_symbol: "LBP",
        symbol: "£",
        code_points: [163]
      },
      LKR: {
        currency: "LKR",
        name: "Sri Lankan rupee",
        cldr_symbol: "LKR",
        symbol: "₨",
        code_points: [8360]
      },
      LRD: {
        currency: "LRD",
        name: "Liberian dollar",
        cldr_symbol: "LRD",
        symbol: "$",
        code_points: [36]
      },
      LSL: {
        currency: "LSL",
        name: "Lesotho loti",
        cldr_symbol: "LSL",
        symbol: "LSL",
        code_points: [76, 83, 76]
      },
      LTL: {
        currency: "LTL",
        name: "Lithuanian litas",
        cldr_symbol: "LTL",
        symbol: "Lt",
        code_points: [76, 116]
      },
      LTT: {
        currency: "LTT",
        name: "Lithuanian talonas",
        cldr_symbol: "LTT",
        symbol: "LTT",
        code_points: [76, 84, 84]
      },
      LUC: {
        currency: "LUC",
        name: "Luxembourgian convertible franc",
        cldr_symbol: "LUC",
        symbol: "LUC",
        code_points: [76, 85, 67]
      },
      LUF: {
        currency: "LUF",
        name: "Luxembourgian franc",
        cldr_symbol: "LUF",
        symbol: "LUF",
        code_points: [76, 85, 70]
      },
      LUL: {
        currency: "LUL",
        name: "Luxembourg financial franc",
        cldr_symbol: "LUL",
        symbol: "LUL",
        code_points: [76, 85, 76]
      },
      LVL: {
        currency: "LVL",
        name: "Latvian lats",
        cldr_symbol: "LVL",
        symbol: "Ls",
        code_points: [76, 115]
      },
      LVR: {
        currency: "LVR",
        name: "Latvian ruble",
        cldr_symbol: "LVR",
        symbol: "LVR",
        code_points: [76, 86, 82]
      },
      LYD: {
        currency: "LYD",
        name: "Libyan dinar",
        cldr_symbol: "LYD",
        symbol: "LYD",
        code_points: [76, 89, 68]
      },
      MAD: {
        currency: "MAD",
        name: "Moroccan dirham",
        cldr_symbol: "MAD",
        symbol: "MAD",
        code_points: [77, 65, 68]
      },
      MAF: {
        currency: "MAF",
        name: "Moroccan franc",
        cldr_symbol: "MAF",
        symbol: "MAF",
        code_points: [77, 65, 70]
      },
      MCF: {
        currency: "MCF",
        name: "Monegasque franc",
        cldr_symbol: "MCF",
        symbol: "MCF",
        code_points: [77, 67, 70]
      },
      MDC: {
        currency: "MDC",
        name: "Moldovan cupon",
        cldr_symbol: "MDC",
        symbol: "MDC",
        code_points: [77, 68, 67]
      },
      MDL: {
        currency: "MDL",
        name: "Moldovan leu",
        cldr_symbol: "MDL",
        symbol: "MDL",
        code_points: [77, 68, 76]
      },
      MGA: {
        currency: "MGA",
        name: "Malagasy Ariary",
        cldr_symbol: "MGA",
        symbol: "MGA",
        code_points: [77, 71, 65]
      },
      MGF: {
        currency: "MGF",
        name: "Malagasy franc",
        cldr_symbol: "MGF",
        symbol: "MGF",
        code_points: [77, 71, 70]
      },
      MKD: {
        currency: "MKD",
        name: "Macedonian denar",
        cldr_symbol: "MKD",
        symbol: "MKD",
        code_points: [77, 75, 68]
      },
      MKN: {
        currency: "MKN",
        name: "Macedonian denar (1992-1993)",
        cldr_symbol: "MKN",
        symbol: "MKN",
        code_points: [77, 75, 78]
      },
      MLF: {
        currency: "MLF",
        name: "Malian franc",
        cldr_symbol: "MLF",
        symbol: "MLF",
        code_points: [77, 76, 70]
      },
      MMK: {
        currency: "MMK",
        name: "Myanma kyat",
        cldr_symbol: "MMK",
        symbol: "MMK",
        code_points: [77, 77, 75]
      },
      MNT: {
        currency: "MNT",
        name: "Mongolian tugrik",
        cldr_symbol: "MNT",
        symbol: "₮",
        code_points: [8366]
      },
      MOP: {
        currency: "MOP",
        name: "Macanese pataca",
        cldr_symbol: "MOP",
        symbol: "MOP",
        code_points: [77, 79, 80]
      },
      MRO: {
        currency: "MRO",
        name: "Mauritanian ouguiya",
        cldr_symbol: "MRO",
        symbol: "MRO",
        code_points: [77, 82, 79]
      },
      MTL: {
        currency: "MTL",
        name: "Maltese lira",
        cldr_symbol: "MTL",
        symbol: "MTL",
        code_points: [77, 84, 76]
      },
      MTP: {
        currency: "MTP",
        name: "Maltese pound",
        cldr_symbol: "MTP",
        symbol: "MTP",
        code_points: [77, 84, 80]
      },
      MUR: {
        currency: "MUR",
        name: "Mauritian rupee",
        cldr_symbol: "MUR",
        symbol: "₨",
        code_points: [8360]
      },
      MVP: {
        currency: "MVP",
        name: "Maldivian rupee",
        cldr_symbol: "MVP",
        symbol: "MVP",
        code_points: [77, 86, 80]
      },
      MVR: {
        currency: "MVR",
        name: "Maldivian rufiyaa",
        cldr_symbol: "MVR",
        symbol: "MVR",
        code_points: [77, 86, 82]
      },
      MWK: {
        currency: "MWK",
        name: "Malawian Kwacha",
        cldr_symbol: "MWK",
        symbol: "MWK",
        code_points: [77, 87, 75]
      },
      MXN: {
        currency: "MXN",
        name: "Mexican peso",
        cldr_symbol: "MX$",
        symbol: "$",
        code_points: [36]
      },
      MXP: {
        currency: "MXP",
        name: "Mexican silver peso (1861-1992)",
        cldr_symbol: "MXP",
        symbol: "MXP",
        code_points: [77, 88, 80]
      },
      MXV: {
        currency: "MXV",
        name: "Mexican investment unit",
        cldr_symbol: "MXV",
        symbol: "MXV",
        code_points: [77, 88, 86]
      },
      MYR: {
        currency: "MYR",
        name: "Malaysian ringgit",
        cldr_symbol: "MYR",
        symbol: "RM",
        code_points: [82, 77]
      },
      MZE: {
        currency: "MZE",
        name: "Mozambican escudo",
        cldr_symbol: "MZE",
        symbol: "MZE",
        code_points: [77, 90, 69]
      },
      MZM: {
        currency: "MZM",
        name: "Mozambican metical (1980-2006)",
        cldr_symbol: "MZM",
        symbol: "MZM",
        code_points: [77, 90, 77]
      },
      MZN: {
        currency: "MZN",
        name: "Mozambican metical",
        cldr_symbol: "MZN",
        symbol: "MT",
        code_points: [77, 84]
      },
      NAD: {
        currency: "NAD",
        name: "Namibian dollar",
        cldr_symbol: "NAD",
        symbol: "$",
        code_points: [36]
      },
      NGN: {
        currency: "NGN",
        name: "Nigerian naira",
        cldr_symbol: "NGN",
        symbol: "₦",
        code_points: [8358]
      },
      NIC: {
        currency: "NIC",
        name: "Nicaraguan córdoba (1988-1991)",
        cldr_symbol: "NIC",
        symbol: "NIC",
        code_points: [78, 73, 67]
      },
      NIO: {
        currency: "NIO",
        name: "Nicaraguan córdoba",
        cldr_symbol: "NIO",
        symbol: "C$",
        code_points: [67, 36]
      },
      NLG: {
        currency: "NLG",
        name: "Dutch guilder",
        cldr_symbol: "NLG",
        symbol: "NLG",
        code_points: [78, 76, 71]
      },
      NOK: {
        currency: "NOK",
        name: "Norwegian krone",
        cldr_symbol: "NOK",
        symbol: "kr",
        code_points: [107, 114]
      },
      NPR: {
        currency: "NPR",
        name: "Nepalese rupee",
        cldr_symbol: "NPR",
        symbol: "₨",
        code_points: [8360]
      },
      NZD: {
        currency: "NZD",
        name: "New Zealand dollar",
        cldr_symbol: "NZ$",
        symbol: "$",
        code_points: [36]
      },
      OMR: {
        currency: "OMR",
        name: "Omani rial",
        cldr_symbol: "OMR",
        symbol: "﷼",
        code_points: [65020]
      },
      PAB: {
        currency: "PAB",
        name: "Panamanian balboa",
        cldr_symbol: "PAB",
        symbol: "B/.",
        code_points: [66, 47, 46]
      },
      PEI: {
        currency: "PEI",
        name: "Peruvian inti",
        cldr_symbol: "PEI",
        symbol: "PEI",
        code_points: [80, 69, 73]
      },
      PEN: {
        currency: "PEN",
        name: "Peruvian nuevo sol",
        cldr_symbol: "PEN",
        symbol: "S/.",
        code_points: [83, 47, 46]
      },
      PES: {
        currency: "PES",
        name: "Peruvian sol (1863-1965)",
        cldr_symbol: "PES",
        symbol: "PES",
        code_points: [80, 69, 83]
      },
      PGK: {
        currency: "PGK",
        name: "Papua New Guinean kina",
        cldr_symbol: "PGK",
        symbol: "PGK",
        code_points: [80, 71, 75]
      },
      PHP: {
        currency: "PHP",
        name: "Philippine peso",
        cldr_symbol: "PHP",
        symbol: "Php",
        code_points: [80, 104, 112]
      },
      PKR: {
        currency: "PKR",
        name: "Pakistani rupee",
        cldr_symbol: "PKR",
        symbol: "₨",
        code_points: [8360]
      },
      PLN: {
        currency: "PLN",
        name: "Polish zloty",
        cldr_symbol: "PLN",
        symbol: "zł",
        code_points: [122, 322]
      },
      PLZ: {
        currency: "PLZ",
        name: "Polish zloty (PLZ)",
        cldr_symbol: "PLZ",
        symbol: "PLZ",
        code_points: [80, 76, 90]
      },
      PTE: {
        currency: "PTE",
        name: "Portuguese escudo",
        cldr_symbol: "PTE",
        symbol: "PTE",
        code_points: [80, 84, 69]
      },
      PYG: {
        currency: "PYG",
        name: "Paraguayan guarani",
        cldr_symbol: "PYG",
        symbol: "Gs",
        code_points: [71, 115]
      },
      QAR: {
        currency: "QAR",
        name: "Qatari rial",
        cldr_symbol: "QAR",
        symbol: "﷼",
        code_points: [65020]
      },
      RHD: {
        currency: "RHD",
        name: "Rhodesian dollar",
        cldr_symbol: "RHD",
        symbol: "RHD",
        code_points: [82, 72, 68]
      },
      ROL: {
        currency: "ROL",
        name: "Romanian leu (1952-2006)",
        cldr_symbol: "ROL",
        symbol: "ROL",
        code_points: [82, 79, 76]
      },
      RON: {
        currency: "RON",
        name: "Romanian leu",
        cldr_symbol: "RON",
        symbol: "lei",
        code_points: [108, 101, 105]
      },
      RSD: {
        currency: "RSD",
        name: "Serbian dinar",
        cldr_symbol: "RSD",
        symbol: "Дин.",
        code_points: [1044, 1080, 1085, 46]
      },
      RUB: {
        currency: "RUB",
        name: "Russian ruble",
        cldr_symbol: "RUB",
        symbol: "руб",
        code_points: [1088, 1091, 1073]
      },
      RUR: {
        currency: "RUR",
        name: "Russian ruble (1991-1998)",
        cldr_symbol: "RUR",
        symbol: "RUR",
        code_points: [82, 85, 82]
      },
      RWF: {
        currency: "RWF",
        name: "Rwandan franc",
        cldr_symbol: "RWF",
        symbol: "RWF",
        code_points: [82, 87, 70]
      },
      SAR: {
        currency: "SAR",
        name: "Saudi riyal",
        cldr_symbol: "SAR",
        symbol: "﷼",
        code_points: [65020]
      },
      SBD: {
        currency: "SBD",
        name: "Solomon Islands dollar",
        cldr_symbol: "SBD",
        symbol: "$",
        code_points: [36]
      },
      SCR: {
        currency: "SCR",
        name: "Seychellois rupee",
        cldr_symbol: "SCR",
        symbol: "₨",
        code_points: [8360]
      },
      SDD: {
        currency: "SDD",
        name: "Sudanese dinar (1992-2007)",
        cldr_symbol: "SDD",
        symbol: "SDD",
        code_points: [83, 68, 68]
      },
      SDG: {
        currency: "SDG",
        name: "Sudanese pound",
        cldr_symbol: "SDG",
        symbol: "SDG",
        code_points: [83, 68, 71]
      },
      SDP: {
        currency: "SDP",
        name: "Sudanese pound (1957-1998)",
        cldr_symbol: "SDP",
        symbol: "SDP",
        code_points: [83, 68, 80]
      },
      SEK: {
        currency: "SEK",
        name: "Swedish krona",
        cldr_symbol: "SEK",
        symbol: "kr",
        code_points: [107, 114]
      },
      SGD: {
        currency: "SGD",
        name: "Singapore dollar",
        cldr_symbol: "SGD",
        symbol: "$",
        code_points: [36]
      },
      SHP: {
        currency: "SHP",
        name: "Saint Helena pound",
        cldr_symbol: "SHP",
        symbol: "£",
        code_points: [163]
      },
      SIT: {
        currency: "SIT",
        name: "Slovenian tolar",
        cldr_symbol: "SIT",
        symbol: "SIT",
        code_points: [83, 73, 84]
      },
      SKK: {
        currency: "SKK",
        name: "Slovak koruna",
        cldr_symbol: "SKK",
        symbol: "SKK",
        code_points: [83, 75, 75]
      },
      SLL: {
        currency: "SLL",
        name: "Sierra Leonean leone",
        cldr_symbol: "SLL",
        symbol: "SLL",
        code_points: [83, 76, 76]
      },
      SOS: {
        currency: "SOS",
        name: "Somali shilling",
        cldr_symbol: "SOS",
        symbol: "S",
        code_points: [83]
      },
      SRD: {
        currency: "SRD",
        name: "Surinamese dollar",
        cldr_symbol: "SRD",
        symbol: "$",
        code_points: [36]
      },
      SRG: {
        currency: "SRG",
        name: "Surinamese guilder",
        cldr_symbol: "SRG",
        symbol: "SRG",
        code_points: [83, 82, 71]
      },
      SSP: {
        currency: "SSP",
        name: "South Sudanese pound",
        cldr_symbol: "SSP",
        symbol: "SSP",
        code_points: [83, 83, 80]
      },
      STD: {
        currency: "STD",
        name: "São Tomé and Príncipe dobra",
        cldr_symbol: "STD",
        symbol: "STD",
        code_points: [83, 84, 68]
      },
      SUR: {
        currency: "SUR",
        name: "Soviet rouble",
        cldr_symbol: "SUR",
        symbol: "SUR",
        code_points: [83, 85, 82]
      },
      SVC: {
        currency: "SVC",
        name: "Salvadoran colón",
        cldr_symbol: "SVC",
        symbol: "SVC",
        code_points: [83, 86, 67]
      },
      SYP: {
        currency: "SYP",
        name: "Syrian pound",
        cldr_symbol: "SYP",
        symbol: "£",
        code_points: [163]
      },
      SZL: {
        currency: "SZL",
        name: "Swazi lilangeni",
        cldr_symbol: "SZL",
        symbol: "SZL",
        code_points: [83, 90, 76]
      },
      THB: {
        currency: "THB",
        name: "Thai baht",
        cldr_symbol: "฿",
        symbol: "฿",
        code_points: [3647]
      },
      TJR: {
        currency: "TJR",
        name: "Tajikistani ruble",
        cldr_symbol: "TJR",
        symbol: "TJR",
        code_points: [84, 74, 82]
      },
      TJS: {
        currency: "TJS",
        name: "Tajikistani somoni",
        cldr_symbol: "TJS",
        symbol: "TJS",
        code_points: [84, 74, 83]
      },
      TMM: {
        currency: "TMM",
        name: "Turkmenistani manat (1993-2009)",
        cldr_symbol: "TMM",
        symbol: "TMM",
        code_points: [84, 77, 77]
      },
      TMT: {
        currency: "TMT",
        name: "Turkmenistani manat",
        cldr_symbol: "TMT",
        symbol: "TMT",
        code_points: [84, 77, 84]
      },
      TND: {
        currency: "TND",
        name: "Tunisian dinar",
        cldr_symbol: "TND",
        symbol: "TND",
        code_points: [84, 78, 68]
      },
      TOP: {
        currency: "TOP",
        name: "Tongan paʻanga",
        cldr_symbol: "TOP",
        symbol: "TOP",
        code_points: [84, 79, 80]
      },
      TPE: {
        currency: "TPE",
        name: "Timorese escudo",
        cldr_symbol: "TPE",
        symbol: "TPE",
        code_points: [84, 80, 69]
      },
      TRL: {
        currency: "TRL",
        name: "Turkish lira (1922-2005)",
        cldr_symbol: "TRL",
        symbol: "TRL",
        code_points: [84, 82, 76]
      },
      TRY: {
        currency: "TRY",
        name: "Turkish lira",
        cldr_symbol: "TRY",
        symbol: "TL",
        code_points: [84, 76]
      },
      TTD: {
        currency: "TTD",
        name: "Trinidad and Tobago dollar",
        cldr_symbol: "TTD",
        symbol: "$",
        code_points: [36]
      },
      TWD: {
        currency: "TWD",
        name: "New Taiwan dollar",
        cldr_symbol: "NT$",
        symbol: "NT$",
        code_points: [78, 84, 36]
      },
      TZS: {
        currency: "TZS",
        name: "Tanzanian shilling",
        cldr_symbol: "TZS",
        symbol: "TZS",
        code_points: [84, 90, 83]
      },
      UAH: {
        currency: "UAH",
        name: "Ukrainian hryvnia",
        cldr_symbol: "UAH",
        symbol: "₴",
        code_points: [8372]
      },
      UAK: {
        currency: "UAK",
        name: "Ukrainian karbovanets",
        cldr_symbol: "UAK",
        symbol: "UAK",
        code_points: [85, 65, 75]
      },
      UGS: {
        currency: "UGS",
        name: "Ugandan shilling (1966-1987)",
        cldr_symbol: "UGS",
        symbol: "UGS",
        code_points: [85, 71, 83]
      },
      UGX: {
        currency: "UGX",
        name: "Ugandan shilling",
        cldr_symbol: "UGX",
        symbol: "UGX",
        code_points: [85, 71, 88]
      },
      USD: {
        currency: "USD",
        name: "US dollar",
        cldr_symbol: "$",
        symbol: "$",
        code_points: [36]
      },
      USN: {
        currency: "USN",
        name: "US dollar (next day)",
        cldr_symbol: "USN",
        symbol: "USN",
        code_points: [85, 83, 78]
      },
      USS: {
        currency: "USS",
        name: "US dollar (same day)",
        cldr_symbol: "USS",
        symbol: "USS",
        code_points: [85, 83, 83]
      },
      UYI: {
        currency: "UYI",
        name: "Uruguayan peso (indexed units)",
        cldr_symbol: "UYI",
        symbol: "UYI",
        code_points: [85, 89, 73]
      },
      UYP: {
        currency: "UYP",
        name: "Uruguayan peso (1975-1993)",
        cldr_symbol: "UYP",
        symbol: "UYP",
        code_points: [85, 89, 80]
      },
      UYU: {
        currency: "UYU",
        name: "Uruguayan peso",
        cldr_symbol: "UYU",
        symbol: "$U",
        code_points: [36, 85]
      },
      UZS: {
        currency: "UZS",
        name: "Uzbekistan som",
        cldr_symbol: "UZS",
        symbol: "лв",
        code_points: [1083, 1074]
      },
      VEB: {
        currency: "VEB",
        name: "Venezuelan bolívar (1871-2008)",
        cldr_symbol: "VEB",
        symbol: "VEB",
        code_points: [86, 69, 66]
      },
      VEF: {
        currency: "VEF",
        name: "Venezuelan bolívar",
        cldr_symbol: "VEF",
        symbol: "Bs",
        code_points: [66, 115]
      },
      VND: {
        currency: "VND",
        name: "Vietnamese dong",
        cldr_symbol: "₫",
        symbol: "₫",
        code_points: [8363]
      },
      VNN: {
        currency: "VNN",
        name: "Vietnamese dong (1978-1985)",
        cldr_symbol: "VNN",
        symbol: "VNN",
        code_points: [86, 78, 78]
      },
      VUV: {
        currency: "VUV",
        name: "Vanuatu vatu",
        cldr_symbol: "VUV",
        symbol: "VUV",
        code_points: [86, 85, 86]
      },
      WST: {
        currency: "WST",
        name: "Samoan tala",
        cldr_symbol: "WST",
        symbol: "WST",
        code_points: [87, 83, 84]
      },
      XAF: {
        currency: "XAF",
        name: "CFA franc BEAC",
        cldr_symbol: "FCFA",
        symbol: "FCFA",
        code_points: [70, 67, 70, 65]
      },
      XAG: {
        currency: "XAG",
        name: "troy ounce of silver",
        cldr_symbol: "XAG",
        symbol: "XAG",
        code_points: [88, 65, 71]
      },
      XAU: {
        currency: "XAU",
        name: "troy ounce of gold",
        cldr_symbol: "XAU",
        symbol: "XAU",
        code_points: [88, 65, 85]
      },
      XBA: {
        currency: "XBA",
        name: "European composite unit",
        cldr_symbol: "XBA",
        symbol: "XBA",
        code_points: [88, 66, 65]
      },
      XBB: {
        currency: "XBB",
        name: "European monetary unit",
        cldr_symbol: "XBB",
        symbol: "XBB",
        code_points: [88, 66, 66]
      },
      XBC: {
        currency: "XBC",
        name: "European unit of account (XBC)",
        cldr_symbol: "XBC",
        symbol: "XBC",
        code_points: [88, 66, 67]
      },
      XBD: {
        currency: "XBD",
        name: "European unit of account (XBD)",
        cldr_symbol: "XBD",
        symbol: "XBD",
        code_points: [88, 66, 68]
      },
      XCD: {
        currency: "XCD",
        name: "East Caribbean dollar",
        cldr_symbol: "EC$",
        symbol: "$",
        code_points: [36]
      },
      XDR: {
        currency: "XDR",
        name: "special drawing rights",
        cldr_symbol: "XDR",
        symbol: "XDR",
        code_points: [88, 68, 82]
      },
      XEU: {
        currency: "XEU",
        name: "European currency unit",
        cldr_symbol: "XEU",
        symbol: "XEU",
        code_points: [88, 69, 85]
      },
      XFO: {
        currency: "XFO",
        name: "French gold franc",
        cldr_symbol: "XFO",
        symbol: "XFO",
        code_points: [88, 70, 79]
      },
      XFU: {
        currency: "XFU",
        name: "French UIC-franc",
        cldr_symbol: "XFU",
        symbol: "XFU",
        code_points: [88, 70, 85]
      },
      XOF: {
        currency: "XOF",
        name: "CFA franc BCEAO",
        cldr_symbol: "CFA",
        symbol: "CFA",
        code_points: [67, 70, 65]
      },
      XPD: {
        currency: "XPD",
        name: "troy ounce of palladium",
        cldr_symbol: "XPD",
        symbol: "XPD",
        code_points: [88, 80, 68]
      },
      XPF: {
        currency: "XPF",
        name: "CFP franc",
        cldr_symbol: "CFPF",
        symbol: "CFPF",
        code_points: [67, 70, 80, 70]
      },
      XPT: {
        currency: "XPT",
        name: "troy ounce of platinum",
        cldr_symbol: "XPT",
        symbol: "XPT",
        code_points: [88, 80, 84]
      },
      XRE: {
        currency: "XRE",
        name: "RINET Funds unit",
        cldr_symbol: "XRE",
        symbol: "XRE",
        code_points: [88, 82, 69]
      },
      XSU: {
        currency: "XSU",
        name: "Sucre",
        cldr_symbol: "XSU",
        symbol: "XSU",
        code_points: [88, 83, 85]
      },
      XTS: {
        currency: "XTS",
        name: "Testing Currency unit",
        cldr_symbol: "XTS",
        symbol: "XTS",
        code_points: [88, 84, 83]
      },
      XUA: {
        currency: "XUA",
        name: "ADB unit of account",
        cldr_symbol: "XUA",
        symbol: "XUA",
        code_points: [88, 85, 65]
      },
      XXX: {
        currency: "XXX",
        name: "(unknown unit of currency)",
        cldr_symbol: "XXX",
        symbol: "XXX",
        code_points: [88, 88, 88]
      },
      YDD: {
        currency: "YDD",
        name: "Yemeni dinar",
        cldr_symbol: "YDD",
        symbol: "YDD",
        code_points: [89, 68, 68]
      },
      YER: {
        currency: "YER",
        name: "Yemeni rial",
        cldr_symbol: "YER",
        symbol: "﷼",
        code_points: [65020]
      },
      YUD: {
        currency: "YUD",
        name: "Yugoslavian hard dinar (1966-1990)",
        cldr_symbol: "YUD",
        symbol: "YUD",
        code_points: [89, 85, 68]
      },
      YUM: {
        currency: "YUM",
        name: "Yugoslavian new dinar (1994-2002)",
        cldr_symbol: "YUM",
        symbol: "YUM",
        code_points: [89, 85, 77]
      },
      YUN: {
        currency: "YUN",
        name: "Yugoslavian convertible dinar (1990-1992)",
        cldr_symbol: "YUN",
        symbol: "YUN",
        code_points: [89, 85, 78]
      },
      YUR: {
        currency: "YUR",
        name: "Yugoslavian reformed dinar (1992-1993)",
        cldr_symbol: "YUR",
        symbol: "YUR",
        code_points: [89, 85, 82]
      },
      ZAL: {
        currency: "ZAL",
        name: "South African rand (financial)",
        cldr_symbol: "ZAL",
        symbol: "ZAL",
        code_points: [90, 65, 76]
      },
      ZAR: {
        currency: "ZAR",
        name: "South African rand",
        cldr_symbol: "ZAR",
        symbol: "R",
        code_points: [82]
      },
      ZMK: {
        currency: "ZMK",
        name: "Zambian kwacha",
        cldr_symbol: "ZMK",
        symbol: "ZMK",
        code_points: [90, 77, 75]
      },
      ZRN: {
        currency: "ZRN",
        name: "Zairean new zaire (1993-1998)",
        cldr_symbol: "ZRN",
        symbol: "ZRN",
        code_points: [90, 82, 78]
      },
      ZRZ: {
        currency: "ZRZ",
        name: "Zairean zaire (1971-1993)",
        cldr_symbol: "ZRZ",
        symbol: "ZRZ",
        code_points: [90, 82, 90]
      },
      ZWD: {
        currency: "ZWD",
        name: "Zimbabwean dollar (1980-2008)",
        cldr_symbol: "ZWD",
        symbol: "Z$",
        code_points: [90, 36]
      },
      ZWL: {
        currency: "ZWL",
        name: "Zimbabwean dollar (2009)",
        cldr_symbol: "ZWL",
        symbol: "ZWL",
        code_points: [90, 87, 76]
      },
      ZWR: {
        currency: "ZWR",
        name: "Zimbabwean dollar (2008)",
        cldr_symbol: "ZWR",
        symbol: "ZWR",
        code_points: [90, 87, 82]
      }
    }, e.currency_codes = function() {
      var e, t;
      return this.codes || (this.codes = function() {
        var n, r;
        n = this.currencies, r = [];
        for (t in n) e = n[t], r.push(e.code);
        return r
      }.call(this))
    }, e.for_code = function(e) {
      var t, n, r, i;
      r = null, i = this.currencies;
      for (t in i) {
        n = i[t];
        if (n.currency === e) {
          r = {
            country: t,
            cldr_symbol: n.cldr_symbol,
            symbol: n.symbol,
            currency: n.currency
          };
          break
        }
      }
      return r
    }, e
  }(), e.ListFormatter = function() {
    function t(e) {
      e == null && (e = {}), this.formats = {
        2: "{0} and {1}",
        end: "{0}, and {1}",
        middle: "{0}, {1}",
        start: "{0}, {1}"
      }
    }
    return t.prototype.format = function(e) {
      return this.formats[e.length.toString()] != null ? this.compose(this.formats[e.length.toString()], e) : this.compose_list(e)
    }, t.prototype.compose_list = function(e) {
      var t, n, r, i, s;
      r = this.compose(this.formats.end || this.formats.middle || "", [e[e.length - 2], e[e.length - 1]]);
      if (e.length > 2)
        for (n = i = 3, s = e.length; 3 <= s ? i <= s : i >= s; n = 3 <= s ? ++i : --i) t = n === e.length ? "start" : "middle", this.formats[t] == null && (t = "middle"), r = this.compose(this.formats[t] || "", [e[e.length - n], r]);
      return r
    }, t.prototype.compose = function(t, n) {
      var r, i;
      return n = function() {
        var e, t, i;
        i = [];
        for (e = 0, t = n.length; e < t; e++) r = n[e], r !== null && i.push(r);
        return i
      }(), n.length > 1 ? (i = t.replace(/\{(\d+)\}/g, function() {
        return RegExp.$1
      }), e.is_rtl && (i = e.Bidi.from_string(i, {
        direction: "RTL"
      }).reorder_visually().toString()), i.replace(/(\d+)/g, function() {
        return n[parseInt(RegExp.$1)]
      })) : n[0] || ""
    }, t
  }(), e.Bidi = function() {
    function n(e) {
      e == null && (e = {}), this.bidi_classes = {
        BN: {
          8: [0],
          13: [14],
          5: [127, 8298],
          25: [134],
          0: [173, 65279, 917505],
          2: [8203],
          4: [8288],
          7: [119155],
          95: [917536]
        },
        S: {
          0: [9, 11, 31]
        },
        B: {
          0: [10, 13, 133, 8233],
          2: [28]
        },
        WS: {
          0: [12, 32, 5760, 6158, 8232, 8287, 12288],
          10: [8192]
        },
        ON: {
          1: [33, 171, 174, 697, 884, 900, 1542, 1550, 5787, 6468, 8189, 8448, 8456, 8506, 12342, 12443, 12829, 13278, 42622, 64830, 65120, 65281, 126704, 127338],
          4: [38, 187, 8512, 65286, 65529, 127942],
          5: [59, 91, 3059, 8478, 11493, 65307, 65339, 127792],
          3: [123, 166, 2038, 3898, 8451, 8522, 12289, 13004, 13175, 43048, 43124, 128249, 128320],
          0: [161, 180, 215, 247, 894, 903, 1014, 1418, 1758, 1769, 3066, 5120, 6464, 8125, 8468, 8485, 8487, 8489, 8585, 12336, 12448, 12539, 13311, 42611, 42888, 65021, 65105, 65108, 65128, 65131, 65793, 67871, 119365, 120539, 120597, 120655, 120713, 120771, 128064],
          2: [182, 8127, 8141, 8157, 8173, 8316, 8332, 8470, 12349, 12924, 42509, 65124, 65506],
          13: [706, 722, 127153],
          8: [741, 65110],
          16: [751, 127968],
          6: [3192, 11513, 65512, 68409],
          9: [5008, 6128, 11088, 65040],
          10: [6144, 9280, 65371, 128581],
          33: [6622, 42752],
          23: [8208, 128336],
          14: [8245, 12977, 127136, 127169, 127185],
          25: [8261, 9083, 11904],
          15: [8528, 12880],
          129: [8592],
          289: [8724],
          93: [9110],
          38: [9216],
          39: [9312],
          449: [9450],
          82: [9901],
          254: [9985],
          588: [10496],
          59: [11776],
          88: [11931],
          213: [12032],
          11: [12272, 65936],
          24: [12296],
          35: [12736],
          63: [19904],
          54: [42128],
          31: [65072],
          74: [65856],
          19: [69714, 127872],
          65: [119296],
          86: [119552],
          43: [126976],
          99: [127024],
          32: [127744],
          69: [127799, 128507, 128640],
          36: [127904],
          62: [128e3],
          181: [128066],
          61: [128256],
          115: [128768]
        },
        ET: {
          2: [35, 65283],
          3: [162],
          1: [176, 1545, 2546, 43064, 65129, 65504, 65509],
          0: [1423, 1642, 2555, 2801, 3065, 3647, 6107, 8494, 8723, 65119],
          4: [8240],
          25: [8352]
        },
        ES: {
          0: [43, 45, 8722, 64297, 65291, 65293],
          1: [8314, 8330, 65122]
        },
        CS: {
          0: [44, 58, 160, 1548, 8239, 8260, 65104, 65106, 65109, 65292, 65306],
          1: [46, 65294]
        },
        EN: {
          9: [48, 1776, 8320, 65296],
          1: [178],
          0: [185, 8304],
          5: [8308],
          19: [9352],
          49: [120782],
          10: [127232]
        },
        L: {
          25: [65, 97, 5761, 6576, 65313, 65345, 65549],
          0: [170, 181, 186, 750, 902, 908, 1417, 2363, 2482, 2510, 2519, 2563, 2654, 2691, 2761, 2768, 2880, 2903, 2947, 2972, 3024, 3031, 3133, 3199, 3294, 3406, 3415, 3517, 3716, 3722, 3725, 3749, 3751, 3773, 3782, 3894, 3896, 3967, 3973, 4145, 4152, 4295, 4301, 4696, 4800, 6070, 6108, 6314, 6743, 6753, 6965, 6971, 7082, 7143, 7150, 7379, 7393, 8025, 8027, 8029, 8126, 8206, 8305, 8319, 8450, 8455, 8469, 8484, 8486, 8488, 9109, 9900, 11559, 11565, 43047, 43597, 43697, 43712, 43714, 65792, 65794, 69632, 69932, 71340, 71350, 119970, 119995, 120134],
          22: [192, 3090, 3218, 6656, 11648],
          30: [216, 8031, 13280, 66304, 127248],
          448: [248],
          6: [699, 1369, 2425, 2474, 2548, 2602, 2730, 2858, 3449, 3520, 3648, 3737, 4688, 4792, 6100, 8118, 8134, 8182, 11680, 11688, 11696, 11704, 11712, 11720, 11728, 11736, 43808, 43816, 64256, 69703, 69819, 119997, 120086, 120138],
          1: [720, 886, 2434, 2447, 2503, 2507, 2524, 2575, 2610, 2613, 2616, 2738, 2763, 2784, 2818, 2831, 2866, 2877, 2887, 2891, 2908, 2969, 2974, 2979, 3006, 3009, 3160, 3168, 3202, 3274, 3285, 3296, 3313, 3330, 3424, 3458, 3634, 3713, 3719, 3754, 3762, 4155, 4227, 5941, 6087, 6448, 6755, 7078, 7154, 7220, 7413, 8526, 11506, 11631, 12334, 43346, 43444, 43450, 43486, 43567, 43571, 43701, 44006, 65596, 69815, 71342, 110592, 119171, 119966, 119973, 127568],
          4: [736, 2741, 2869, 3125, 3253, 3776, 3976, 6512, 6973, 8473, 8517, 12337, 12344, 43705, 64275, 120128],
          3: [880, 890, 2365, 2377, 2486, 2493, 2649, 2749, 2962, 3137, 3389, 3732, 3757, 3804, 4186, 4682, 4698, 4746, 4786, 4802, 4882, 5902, 6435, 7401, 8144, 8490, 8508, 11499, 12540, 42896, 43015, 44009, 66336, 74864, 119977, 120071, 120123],
          2: [904, 2382, 2527, 2622, 2674, 2703, 2911, 2958, 2984, 3014, 3018, 3073, 3086, 3214, 3270, 3342, 3398, 3402, 3535, 3570, 3745, 5998, 6441, 6681, 7146, 8130, 8178, 12293, 12445, 43011, 43584, 65498],
          19: [910, 2404],
          82: [931],
          139: [1015],
          157: [1162, 66560],
          37: [1329, 7968, 11520, 43264],
          38: [1377, 119040],
          54: [2307],
          9: [2392, 2662, 3114, 3174, 3242, 3302, 3792, 3902, 6112, 6160, 6784, 6800, 8458, 43e3, 43250, 43600, 44016, 66720, 69734, 69872, 70079, 70096, 71360],
          7: [2437, 2821, 3077, 3205, 3261, 3333, 3544, 4030, 6078, 7360, 8016, 43056, 43588, 43758, 120077, 120772],
          21: [2451, 2579, 2707, 2835],
          11: [2534, 2990, 12992, 43214, 65536, 119982],
          5: [2565, 2949, 4039, 4231, 6451, 6765, 7406, 7960, 8008, 8150, 42738, 42889, 43777, 43785, 43793, 65474, 65482, 65490],
          8: [2693, 3507, 6979, 7028, 12321, 65847, 119146, 127552],
          10: [2790, 6608, 8495, 42912, 43471],
          17: [2918, 3461, 5920, 5952, 119648],
          12: [3046, 3663, 4046, 4213, 5888, 5984, 8160, 8336, 94099],
          40: [3346, 4704, 6272, 8544, 12549, 43520],
          15: [3430, 4193, 4992],
          23: [3482, 3840, 42624],
          47: [3585, 6916, 7164, 12832, 43395, 43648, 119214],
          26: [3866, 6992, 66352],
          35: [3913, 69891],
          44: [4096, 12784, 65799, 66e3],
          24: [4159, 43020, 43310, 69840],
          14: [4238, 4808, 7227, 65599],
          39: [4254, 6470],
          376: [4304],
          32: [4752],
          56: [4824, 120540, 120598, 120656, 120714],
          66: [4888],
          28: [4960, 6400, 66176, 127462],
          84: [5024, 119808],
          638: [5121],
          80: [5792],
          51: [6016, 43072, 70018],
          87: [6176],
          69: [6320],
          43: [6528],
          55: [6686, 11568],
          13: [6816, 65616, 66504, 69942],
          31: [7042, 43612],
          57: [7084, 127280],
          50: [7245, 120488],
          191: [7424],
          277: [7680],
          52: [8064],
          68: [9014, 93952],
          77: [9372],
          255: [10240],
          46: [11264, 11312, 13008, 42560, 94032],
          132: [11360],
          85: [12353],
          89: [12449],
          93: [12593],
          42: [12688, 71296, 127344, 127504],
          27: [12896, 42512, 120094],
          49: [12927],
          118: [13056],
          98: [13179, 74752],
          6591: [13312],
          22156: [19968],
          316: [42192],
          79: [42656],
          101: [42786],
          67: [43136],
          29: [43359, 66432, 119180],
          16: [43453, 43739],
          36: [43968, 66463],
          11206: [44032],
          48: [55243, 66208, 69762],
          8813: [55296],
          105: [64112],
          88: [65382],
          18: [65576],
          122: [65664],
          53: [69634],
          878: [73728],
          1070: [77824],
          568: [92160],
          245: [118784],
          61: [119081],
          70: [119894],
          64: [120005],
          339: [120146],
          42719: [131072],
          4383: [173824],
          541: [194560],
          131071: [983040]
        },
        NSM: {
          111: [768],
          6: [1155, 1750, 2385, 3636, 6071, 6744, 7394, 65056, 119173],
          44: [1425],
          0: [1471, 1479, 1648, 1809, 2362, 2364, 2381, 2433, 2492, 2509, 2620, 2641, 2677, 2748, 2765, 2817, 2876, 2879, 2893, 2902, 2946, 3008, 3021, 3260, 3405, 3530, 3542, 3633, 3761, 3893, 3895, 3897, 4038, 4226, 4237, 4253, 6086, 6109, 6313, 6450, 6742, 6752, 6754, 6783, 6964, 6972, 6978, 7083, 7142, 7149, 7405, 7412, 11647, 42655, 43010, 43014, 43019, 43204, 43443, 43452, 43587, 43596, 43696, 43713, 43766, 44005, 44008, 44013, 64286, 66045, 68159, 69633, 71339, 71341, 71351],
          1: [1473, 1476, 1767, 2402, 2530, 2561, 2625, 2631, 2672, 2689, 2759, 2786, 2914, 3157, 3170, 3276, 3298, 3426, 3771, 3864, 3974, 4153, 4157, 4184, 4229, 5970, 6002, 6068, 6439, 6679, 7040, 7080, 7144, 7222, 12441, 42736, 43045, 43569, 43573, 43703, 43710, 43756, 68101, 69760, 69817, 70016],
          10: [1552, 1958, 3981, 6089, 43335],
          20: [1611],
          5: [1759, 3764, 3784, 4146, 43561, 71344],
          3: [1770, 2070, 2497, 2881, 3146, 3393, 4141, 4209, 6912, 7074, 7676, 12330, 42607, 43446, 68108, 69811, 94095, 119210],
          26: [1840, 2276],
          8: [2027, 2075, 7019, 70070],
          2: [2085, 2137, 2304, 2635, 3134, 3142, 3538, 4190, 4957, 5906, 5938, 6155, 6432, 6457, 7151, 7376, 11503, 43392, 43698, 68097, 68152, 69888, 119143, 119362],
          4: [2089, 2753, 3968, 6966, 69927],
          7: [2369, 3655, 6757, 7212, 43302, 69933, 119163],
          13: [3953],
          35: [3993],
          9: [6771, 42612],
          12: [7380],
          38: [7616],
          32: [8400],
          31: [11744],
          17: [43232],
          15: [65024],
          14: [69688],
          239: [917760]
        },
        R: {
          0: [1470, 1472, 1475, 1478, 2042, 2074, 2084, 2088, 2142, 8207, 64285, 64318, 67592, 67644, 67903, 68096],
          26: [1488, 68121, 68440],
          4: [1520, 64312],
          42: [1984],
          1: [2036, 64320, 64323, 67639, 68030],
          21: [2048, 68416],
          14: [2096],
          24: [2112],
          9: [64287, 64326],
          12: [64298],
          5: [67584],
          43: [67594],
          22: [67647],
          8: [67671, 68176],
          27: [67840],
          25: [67872],
          55: [67968],
          3: [68112],
          2: [68117],
          7: [68160, 68472],
          31: [68192],
          53: [68352],
          72: [68608]
        },
        AN: {
          4: [1536],
          9: [1632],
          1: [1643],
          0: [1757],
          30: [69216]
        },
        AL: {
          0: [1544, 1547, 1549, 1563, 1969, 2208, 126500, 126503, 126521, 126523, 126530, 126535, 126537, 126539, 126548, 126551, 126553, 126555, 126557, 126559, 126564, 126590],
          44: [1566],
          2: [1645, 126541, 126625],
          100: [1649],
          1: [1765, 1774, 1807, 126497, 126545, 126561],
          19: [1786],
          29: [1810],
          88: [1869],
          10: [2210],
          113: [64336],
          362: [64467],
          63: [64848],
          53: [64914],
          12: [65008],
          4: [65136, 126629],
          134: [65142],
          3: [126464, 126516, 126567, 126580, 126585],
          26: [126469],
          9: [126505, 126592],
          6: [126572],
          16: [126603, 126635]
        },
        LRE: {
          0: [8234]
        },
        RLE: {
          0: [8235]
        },
        PDF: {
          0: [8236]
        },
        LRO: {
          0: [8237]
        },
        RLO: {
          0: [8238]
        }
      }, this.string_arr = e.string_arr || e.types, this.types = e.types || [], this.levels = [], this.runs = [], this.direction = e.direction, this.default_direction = e.default_direction || "LTR", this.length = this.types.length, this.run_bidi()
    }
    var t;
    return t = 62, n.bidi_class_for = function(e) {
      var t, n, r, i, s, o, u, a, f, l;
      l = this.bidi_classes;
      for (t in l) {
        o = l[t];
        for (s in o) {
          i = o[s];
          for (a = 0, f = i.length; a < f; a++) {
            r = i[a], u = r, n = u + parseInt(s);
            if (e >= u && e <= n) return t
          }
        }
      }
      return null
    }, n.from_string = function(t, n) {
      var r;
      return n == null && (n = {}), r = e.Utilities.unpack_string(t), n.types || (n.types = this.compute_types(r)), n.string_arr || (n.string_arr = r), new e.Bidi(n)
    }, n.from_type_array = function(t, n) {
      return n == null && (n = {}), n.types || (n.types = t), new e.Bidi(n)
    }, n.compute_types = function(t) {
      var n, r, i, s;
      s = [];
      for (r = 0, i = t.length; r < i; r++) n = t[r], s.push(e.Bidi.bidi_class_for(n));
      return s
    }, n.prototype.toString = function() {
      return e.Utilities.pack_array(this.string_arr)
    }, n.prototype.reorder_visually = function() {
      var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m;
      if (!this.string_arr) throw "No string given!";
      u = 0, o = t + 1, v = this.levels;
      for (c = 0, d = v.length; c < d; c++) s = v[c], u = e.Utilities.max([s, u]), e.Utilities.is_even(s) || (o = e.Utilities.min([o, s]));
      for (n = h = u; u <= 0 ? h < 0 : h > 0; n = u <= 0 ? ++h : --h) {
        a = 0;
        while (a < this.levels.length) {
          while (a < this.levels.length && this.levels[a] < n) a += 1;
          if (a === this.levels.length) break;
          r = a + 1;
          while (r < this.levels.length && this.levels[r] >= n) r += 1;
          for (i = p = 0, m = (r - a) / 2; 0 <= m ? p < m : p > m; i = 0 <= m ? ++p : --p) f = this.levels[r - i - 1], this.levels[r - i - 1] = this.levels[a + i], this.levels[a + i] = f, l = this.string_arr[r - i - 1], this.string_arr[r - i - 1] = this.string_arr[a + i], this.string_arr[a + i] = l;
          a = r + 1
        }
      }
      return this
    }, n.prototype.compute_paragraph_embedding_level = function() {
      var e, t, n, r;
      if (["LTR", "RTL"].indexOf(this.direction) > -1) return this.direction === "LTR" ? 0 : 1;
      r = this.types;
      for (t = 0, n = r.length; t < n; t++) {
        e = r[t];
        if (e === "L") return 0;
        if (e === "R") return 1
      }
      return this.default_direction === "LTR" ? 0 : 1
    }, n.prototype.compute_explicit_levels = function() {
      var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y;
      n = this.base_embedding, r = -1, i = [], this.formatter_indices || (this.formatter_indices = []), d = 0;
      for (s = v = 0, g = this.length; 0 <= g ? v < g : v > g; s = 0 <= g ? ++v : --v) {
        u = !1, a = !0, u = this.types[s] === "LRE" || this.types[s] === "LRO";
        switch (this.types[s]) {
          case "RLE":
          case "RLO":
          case "LRE":
          case "LRO":
            l = u ? (n & -2) + 2 : n + 1 | 1, l < t && (r !== -1 && (n |= -128), i[d] = n, n = l, d += 1, r = this.types[s] === "LRO" ? "L" : this.types[s] === "RLO" ? "R" : -1);
            break;
          case "PDF":
            d > 0 && (d -= 1, l = i[d], n = l & 127, r = l < 0 ? (y = (l & 1) === 0) != null ? y : {
              L: "R"
            } : -1);
            break;
          default:
            a = !1
        }
        this.levels[s] = n, a ? this.formatter_indices.push(s) : r !== -1 && (this.types[s] = r)
      }
      h = 0, o = 0, p = this.formatter_indices.length;
      for (s = m = 0; 0 <= p ? m <= p : m >= p; s = 0 <= p ? ++m : --m) c = s === p ? this.length : this.formatter_indices[s], f = c - o, e.Utilities.arraycopy(this.levels, o, this.levels, h, f), e.Utilities.arraycopy(this.types, o, this.types, h, f), h += f, o = c + 1;
      return this.length -= this.formatter_indices.length
    }, n.prototype.compute_runs = function() {
      var e, t, n, r, i, s, o, u, a;
      r = 0, e = this.base_embedding;
      for (t = s = 0, u = this.length; 0 <= u ? s < u : s > u; t = 0 <= u ? ++s : --s) this.levels[t] !== e && (e = this.levels[t], r += 1);
      i = 0, n = 0, e = this.base_embedding;
      for (t = o = 0, a = this.length; 0 <= a ? o < a : o > a; t = 0 <= a ? ++o : --o) this.levels[t] !== e && (this.runs[i] = n, i += 1, n = t, e = this.levels[t]);
      return this.runs[i] = n
    }, n.prototype.resolve_weak_types = function() {
      var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y;
      h = this.runs.length, c = this.base_embedding;
      for (p = m = 0; 0 <= h ? m < h : m > h; p = 0 <= h ? ++m : --m) {
        v = this.get_run_start(p), n = this.get_run_limit(p), o = this.get_run_level(p) || 0, d = e.Utilities.is_even(e.Utilities.max([c, o])) ? "L" : "R", u = p === h - 1 ? this.base_embedding : this.get_run_level(p + 1) || 0, t = e.Utilities.is_even(e.Utilities.max([o, u])) ? "L" : "R", l = d, f = d;
        for (r = g = v; v <= n ? g < n : g > n; r = v <= n ? ++g : --g) {
          a = r === n - 1 ? t : this.types[r + 1], this.types[r] === "NSM" ? this.types[r] = l : l = this.types[r];
          if (this.types[r] === "EN") f === "AL" && (this.types[r] = "AN");
          else if (this.types[r] === "L" || this.types[r] === "R" || this.types[r] === "AL") f = this.types[r];
          this.types[r] === "AL" && (this.types[r] = "R");
          if (l === "EN" && a === "EN") {
            if (this.types[r] === "ES" || this.types[r] === "CS") this.types[r] = nextType
          } else l === "AN" && a === "AN" && this.types[r] === "CS" && (this.types[r] = a); if (this.types[r] === "ET" || this.types[r] === "BN")
            if (l === "EN") this.types[r] = l;
            else {
              i = r + 1;
              while (i < n && this.types[i] === "ET" || this.types[i] === "BN") i += 1;
              if (i < n && this.types[i] === "EN")
                for (s = y = r; r <= i ? y < i : y > i; s = r <= i ? ++y : --y) this.types[s] = "EN"
            }
          if (this.types[r] === "ET" || this.types[r] === "CS" || this.types[r] === "BN") this.types[r] = "ON";
          f === "L" && this.types[r] === "EN" && (this.types[r] = f)
        }
        c = o
      }
    }, n.prototype.get_run_count = function() {
      return this.runs.length
    }, n.prototype.get_run_level = function(e) {
      return this.levels[this.runs[e]]
    }, n.prototype.get_run_limit = function(e) {
      return e === this.runs.length - 1 ? this.length : this.runs[e + 1]
    }, n.prototype.get_run_start = function(e) {
      return this.runs[e]
    }, n.prototype.resolve_implicit_levels = function() {
      var e, t, n;
      for (e = t = 0, n = this.length; 0 <= n ? t < n : t > n; e = 0 <= n ? ++t : --t)
        if ((this.levels[e] & 1) === 0) {
          if (this.types[e] === "R") this.levels[e] += 1;
          else if (this.types[e] === "AN" || this.types[e] === "EN") this.levels[e] += 2
        } else
      if (this.types[e] === "L" || this.types[e] === "AN" || this.types[e] === "EN") this.levels[e] += 1
    }, n.prototype.resolve_neutral_types = function() {
      var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w;
      d = this.get_run_count(), h = this.base_embedding;
      for (p = y = 0; 0 <= d ? y < d : y > d; p = 0 <= d ? ++y : --y) {
        m = this.get_run_start(p), r = this.get_run_limit(p), o = this.get_run_level(p);
        if (o == null) continue;
        t = e.Utilities.is_even(o) ? "L" : "R", v = e.Utilities.is_even(e.Utilities.max([h, o])) ? "L" : "R", f = p === d - 1 ? this.base_embedding : this.get_run_level(p + 1), n = e.Utilities.is_even(e.Utilities.max([o, f])) ? "L" : "R", c = v, u = -1;
        for (i = b = m; m <= r ? b <= r : b >= r; i = m <= r ? ++b : --b) {
          a = -1, g = i === r ? n : this.types[i];
          switch (g) {
            case "L":
              a = "L";
              break;
            case "R":
            case "AN":
            case "EN":
              a = "R";
              break;
            case "BN":
            case "ON":
            case "S":
            case "B":
            case "WS":
              u === -1 && (u = i)
          }
          if (a !== -1) {
            if (u !== -1) {
              l = c === a ? c : t;
              for (s = w = u; u <= i ? w < i : w > i; s = u <= i ? ++w : --w) this.types[s] = l
            }
            c = a, u = -1
          }
        }
        h = o
      }
    }, n.prototype.reinsert_formatting_codes = function() {
      var t, n, r, i, s, o, u, a, f;
      if (this.formatter_indices != null && this.formatter_indices.length > 0) {
        n = this.length, o = this.levels.length;
        for (t = a = f = this.formatter_indices.length - 1; f <= 0 ? a <= 0 : a >= 0; t = f <= 0 ? ++a : --a) s = this.formatter_indices[t], i = o - s - 1, o = s, n -= i, s + 1 < this.levels.length && e.Utilities.arraycopy(this.levels, n, this.levels, s + 1, i), u = o === this.levels.length - 1 ? this.base_embedding : this.levels[o + 1] != null ? this.levels[o + 1] : 0, r = n === 0 ? this.base_embedding : this.levels[n] != null ? this.levels[n] : 0, this.levels[o] = e.Utilities.max([r, u])
      }
      return this.length = this.levels.length
    }, n.prototype.run_bidi = function() {
      this.base_embedding = this.compute_paragraph_embedding_level(), this.compute_explicit_levels(), this.compute_runs(), this.resolve_weak_types(), this.resolve_neutral_types(), this.resolve_implicit_levels(), this.reinsert_formatting_codes(), this.compute_runs()
    }, n
  }(), e.Calendar = function() {
    function e() {}
    return e.calendar = {
      additional_formats: {
        EHm: "E HH:mm",
        EHms: "E HH:mm:ss",
        Ed: "d E",
        Ehm: "E h:mm a",
        Ehms: "E h:mm:ss a",
        Gy: "y G",
        H: "HH",
        Hm: "HH:mm",
        Hms: "HH:mm:ss",
        M: "L",
        MEd: "E, M/d",
        MMM: "LLL",
        MMMEd: "E, MMM d",
        MMMd: "MMM d",
        Md: "M/d",
        d: "d",
        h: "h a",
        hm: "h:mm a",
        hms: "h:mm:ss a",
        ms: "mm:ss",
        y: "y",
        yM: "M/y",
        yMEd: "E, M/d/y",
        yMMM: "MMM y",
        yMMMEd: "E, MMM d, y",
        yMMMd: "MMM d, y",
        yMd: "M/d/y",
        yQQQ: "QQQ y",
        yQQQQ: "QQQQ y"
      },
      days: {
        format: {
          abbreviated: {
            fri: "Fri",
            mon: "Mon",
            sat: "Sat",
            sun: "Sun",
            thu: "Thu",
            tue: "Tue",
            wed: "Wed"
          },
          narrow: {
            fri: "F",
            mon: "M",
            sat: "S",
            sun: "S",
            thu: "T",
            tue: "T",
            wed: "W"
          },
          "short": {
            fri: "Fr",
            mon: "Mo",
            sat: "Sa",
            sun: "Su",
            thu: "Th",
            tue: "Tu",
            wed: "We"
          },
          wide: {
            fri: "Friday",
            mon: "Monday",
            sat: "Saturday",
            sun: "Sunday",
            thu: "Thursday",
            tue: "Tuesday",
            wed: "Wednesday"
          }
        },
        "stand-alone": {
          abbreviated: {
            fri: "Fri",
            mon: "Mon",
            sat: "Sat",
            sun: "Sun",
            thu: "Thu",
            tue: "Tue",
            wed: "Wed"
          },
          narrow: {
            fri: "F",
            mon: "M",
            sat: "S",
            sun: "S",
            thu: "T",
            tue: "T",
            wed: "W"
          },
          "short": {
            fri: "Fr",
            mon: "Mo",
            sat: "Sa",
            sun: "Su",
            thu: "Th",
            tue: "Tu",
            wed: "We"
          },
          wide: {
            fri: "Friday",
            mon: "Monday",
            sat: "Saturday",
            sun: "Sunday",
            thu: "Thursday",
            tue: "Tuesday",
            wed: "Wednesday"
          }
        }
      },
      eras: {
        abbr: {
          0: "BC",
          1: "AD"
        },
        name: {
          0: "Before Christ",
          1: "Anno Domini"
        },
        narrow: {
          0: "B",
          1: "A"
        }
      },
      fields: {
        day: "Day",
        dayperiod: "AM/PM",
        era: "Era",
        hour: "Hour",
        minute: "Minute",
        month: "Month",
        second: "Second",
        week: "Week",
        weekday: "Day of the Week",
        year: "Year",
        zone: "Time Zone"
      },
      formats: {
        date: {
          "default": {
            pattern: "MMM d, y"
          },
          full: {
            pattern: "EEEE, MMMM d, y"
          },
          "long": {
            pattern: "MMMM d, y"
          },
          medium: {
            pattern: "MMM d, y"
          },
          "short": {
            pattern: "M/d/yy"
          }
        },
        datetime: {
          "default": {
            pattern: "{{date}}, {{time}}"
          },
          full: {
            pattern: "{{date}} 'at' {{time}}"
          },
          "long": {
            pattern: "{{date}} 'at' {{time}}"
          },
          medium: {
            pattern: "{{date}}, {{time}}"
          },
          "short": {
            pattern: "{{date}}, {{time}}"
          }
        },
        time: {
          "default": {
            pattern: "h:mm:ss a"
          },
          full: {
            pattern: "h:mm:ss a zzzz"
          },
          "long": {
            pattern: "h:mm:ss a z"
          },
          medium: {
            pattern: "h:mm:ss a"
          },
          "short": {
            pattern: "h:mm a"
          }
        }
      },
      months: {
        format: {
          abbreviated: {
            1: "Jan",
            10: "Oct",
            11: "Nov",
            12: "Dec",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep"
          },
          narrow: {
            1: "J",
            10: "O",
            11: "N",
            12: "D",
            2: "F",
            3: "M",
            4: "A",
            5: "M",
            6: "J",
            7: "J",
            8: "A",
            9: "S"
          },
          wide: {
            1: "January",
            10: "October",
            11: "November",
            12: "December",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September"
          }
        },
        "stand-alone": {
          abbreviated: {
            1: "Jan",
            10: "Oct",
            11: "Nov",
            12: "Dec",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep"
          },
          narrow: {
            1: "J",
            10: "O",
            11: "N",
            12: "D",
            2: "F",
            3: "M",
            4: "A",
            5: "M",
            6: "J",
            7: "J",
            8: "A",
            9: "S"
          },
          wide: {
            1: "January",
            10: "October",
            11: "November",
            12: "December",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September"
          }
        }
      },
      periods: {
        format: {
          abbreviated: null,
          narrow: {
            am: "a",
            noon: "n",
            pm: "p"
          },
          wide: {
            am: "a.m.",
            noon: "noon",
            pm: "p.m."
          }
        },
        "stand-alone": {}
      },
      quarters: {
        format: {
          abbreviated: {
            1: "Q1",
            2: "Q2",
            3: "Q3",
            4: "Q4"
          },
          narrow: {
            1: 1,
            2: 2,
            3: 3,
            4: 4
          },
          wide: {
            1: "1st quarter",
            2: "2nd quarter",
            3: "3rd quarter",
            4: "4th quarter"
          }
        },
        "stand-alone": {
          abbreviated: {
            1: "Q1",
            2: "Q2",
            3: "Q3",
            4: "Q4"
          },
          narrow: {
            1: 1,
            2: 2,
            3: 3,
            4: 4
          },
          wide: {
            1: "1st quarter",
            2: "2nd quarter",
            3: "3rd quarter",
            4: "4th quarter"
          }
        }
      }
    }, e.months = function(e) {
      var t, n, r, i;
      e == null && (e = {}), r = this.get_root("months", e), n = [];
      for (t in r) i = r[t], n[parseInt(t) - 1] = i;
      return n
    }, e.weekdays = function(e) {
      return e == null && (e = {}), this.get_root("days", e)
    }, e.get_root = function(e, t) {
      var n, r, i, s;
      return t == null && (t = {}), i = this.calendar[e], r = t.names_form || "wide", n = t.format || ((i != null ? (s = i["stand-alone"]) != null ? s[r] : void 0 : void 0) != null ? "stand-alone" : "format"), i[n][r]
    }, e
  }(), r = typeof exports != "undefined" && exports !== null ? exports : (this.TwitterCldr = {}, this.TwitterCldr);
  for (t in e) n = e[t], r[t] = n
}).call(this);
