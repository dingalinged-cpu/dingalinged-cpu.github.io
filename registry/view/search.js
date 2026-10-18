/* Keyword lookup for view/search.html. Data: kw/n.json (names) + kw/s/<xx>.json (shards). Pure lookup functions are exported for tests. */
(function (root) {
  "use strict";
  var STATES = {al:"alabama",ak:"alaska",az:"arizona",ar:"arkansas",ca:"california",co:"colorado",ct:"connecticut",de:"delaware",dc:"district of columbia",fl:"florida",ga:"georgia",hi:"hawaii",id:"idaho",il:"illinois",in:"indiana",ia:"iowa",ks:"kansas",ky:"kentucky",la:"louisiana",me:"maine",md:"maryland",ma:"massachusetts",mi:"michigan",mn:"minnesota",ms:"mississippi",mo:"missouri",mt:"montana",ne:"nebraska",nv:"nevada",nh:"new hampshire",nj:"new jersey",nm:"new mexico",ny:"new york",nc:"north carolina",nd:"north dakota",oh:"ohio",ok:"oklahoma",or:"oregon",pa:"pennsylvania",ri:"rhode island",sc:"south carolina",sd:"south dakota",tn:"tennessee",tx:"texas",ut:"utah",vt:"vermont",va:"virginia",wa:"washington",wv:"west virginia",wi:"wisconsin",wy:"wyoming"};
  var FILLER = {near:1,me:1,nearby:1,around:1,"in":1,at:1,"for":1,the:1,a:1,an:1,closest:1,close:1,to:1,my:1,area:1,local:1,best:1,top:1,cheap:1,affordable:1,good:1,service:1,company:1,companie:1,of:1,and:1,city:1,usa:1,us:1,online:1,open:1,now:1};
  // abbreviations shared by queries and place names
  var CANON = {saint:"st",ste:"st",mount:"mt",fort:"ft",attorney:"lawyer",attorneys:"lawyer"};
  function norm(s) { return String(s || "").toLowerCase().replace(/&/g, " and ").replace(/['\u2019.]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
  function stem(w) {
    if (w.length <= 3) return w;
    if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + "y";
    if (/(ss|us|is)$/.test(w)) return w;
    if (/(ches|shes|xes|sses|zes)$/.test(w)) return w.slice(0, -2);
    if (/s$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function toks(s, canon) { return norm(s).split(" ").filter(Boolean).map(function (w) { return stem(canon && CANON[w] ? CANON[w] : w); }); }

  function Lookup(names) {
    this.names = names;
    // bases: exact tokens (b) for matching; lawyer/attorney folded only as a fallback (c)
    this.bases = names.b.map(function (b) { return { name: b, t: toks(b, false), c: toks(b, true) }; });
    var self = this;
    this.places = names.p.map(function (p) { var a = p.split("|"); return { city: a[0], st: a[1], t: toks(a[0], true) }; });
    this.stateNames = Object.keys(STATES).map(function (ab) { return { ab: ab, t: toks(STATES[ab], true) }; });
  }
  function containsAll(q, t) { // multiset containment; returns indexes used or null
    var used = [], i, j;
    for (i = 0; i < t.length; i++) { for (j = 0; j < q.length; j++) if (used.indexOf(j) < 0 && q[j] === t[i]) break; if (j === q.length) return null; used.push(j); }
    return used;
  }
  function contiguous(used) { var s = used.slice().sort(function (a, b) { return a - b; }); for (var i = 1; i < s.length; i++) if (s[i] !== s[i - 1] + 1) return false; return true; }
  Lookup.prototype.matchBase = function (q) {
    var best = null;
    for (var pass = 0; pass < 2; pass++) { // pass 1 folds attorney/lawyer and saint/st; exact wording wins ties
      var qq = pass ? q.map(function (w) { return CANON[w] ? stem(CANON[w]) : w; }) : q;
      this.bases.forEach(function (b) {
        var t = pass ? b.c : b.t, used = containsAll(qq, t); if (!used) return;
        var sc = t.length * 10 + (contiguous(used) ? 5 : 0) - (Math.min.apply(null, used) > 0 ? 1 : 0) - pass * 2;
        if (!best || sc > best.sc || (sc === best.sc && b.name.length < best.base.length)) best = { base: b.name, used: used, sc: sc };
      });
    }
    return best;
  };
  Lookup.prototype.matchPlace = function (rest) { // rest: stemmed+canon tokens left after the service
    var st = null, used = [], self = this, i;
    // state: 2-letter code (last occurrence wins) or full state name
    for (i = rest.length - 1; i >= 0; i--) if (rest[i].length === 2 && STATES[rest[i]] && !FILLER[rest[i]]) { st = rest[i]; used.push(i); break; }
    if (rest.length && rest[rest.length - 1] === "in" && !st) { /* "in" is filler, not Indiana */ }
    var cityBest = null;
    this.places.forEach(function (p) {
      var u = containsAll(rest.map(function (w, k) { return used.indexOf(k) >= 0 ? "\u0000" : w; }), p.t); if (!u) return;
      var sc = p.t.length * 10 + (st && p.st === st ? 3 : 0);
      if (!cityBest || sc > cityBest.sc) cityBest = { city: p.city, sc: sc, u: u, tl: p.t.length };
    });
    if (!st) {
      this.stateNames.forEach(function (s) {
        var u = containsAll(rest.map(function (w, k) { return (cityBest && cityBest.u.indexOf(k) >= 0) ? "\u0000" : w; }), s.t);
        if (u && (!st || s.t.length > st.l)) st = { ab: s.ab, l: s.t.length, u: u };
      });
      if (st) { used = used.concat(st.u); st = st.ab; }
    }
    var cands = [];
    if (cityBest) { used = used.concat(cityBest.u); cands = this.places.filter(function (p) { return p.city === cityBest.city; }).map(function (p) { return p.st; }); }
    var left = rest.filter(function (w, k) { return used.indexOf(k) < 0 && !FILLER[w]; });
    return { city: cityBest ? cityBest.city : null, cityStates: cands, state: st, ignored: left };
  };
  // parse a query -> {base, place info} or {base:null}
  Lookup.prototype.parse = function (query) {
    var raw = norm(query), q = toks(raw, false);
    if (!q.length) return { empty: true };
    var b = this.matchBase(q);
    if (!b) return { base: null, q: q, raw: raw };
    var rest = q.filter(function (w, k) { return b.used.indexOf(k) < 0; }).map(function (w) { return CANON[w] ? stem(CANON[w]) : w; });
    var pl = this.matchPlace(rest);
    return { base: b.base, place: pl, raw: raw, q: q };
  };
  // choose the keyword variant inside a base entry ({k:{"":..,"mn":..,"minneapolis|mn":..}})
  function pickVariant(entry, pl) {
    var k = entry.k, note = null, key = "";
    if (pl && pl.city) {
      var sts = pl.state ? [pl.state].concat(pl.cityStates.filter(function (s) { return s !== pl.state; })) : pl.cityStates.slice();
      var have = sts.filter(function (s) { return k[pl.city + "|" + s]; });
      if (pl.state && have[0] && have[0] !== pl.state) have = []; // asked for a city in a specific state that we do not cover
      if (have.length) {
        if (!pl.state && have.length > 1) { have.sort(function (a, b) { return (k[pl.city + "|" + b][0] || 0) - (k[pl.city + "|" + a][0] || 0); }); note = "Several places are called " + title(pl.city) + "; showing " + title(pl.city) + ", " + have[0].toUpperCase() + ". Add the state to pick another."; }
        key = pl.city + "|" + have[0];
      } else if (pl.state && k[pl.state]) { key = pl.state; note = "No city-level estimate for " + title(pl.city) + "; showing " + pl.state.toUpperCase() + " statewide."; }
      else note = "No local estimate for " + title(pl.city) + (pl.state ? ", " + pl.state.toUpperCase() : "") + " yet; showing US national figures.";
    } else if (pl && pl.state) {
      if (k[pl.state]) key = pl.state; else note = "No statewide estimate for " + pl.state.toUpperCase() + " yet; showing US national figures.";
    }
    if (!k[key]) key = "";
    return { key: key, row: k[key], note: note };
  }
  function title(s) { return String(s).replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }); }
  // closest services for an unmatched query: token overlap + prefix + trigram similarity (typos)
  function grams(s) { s = "  " + s + " "; var g = {}; for (var i = 0; i < s.length - 2; i++) g[s.substr(i, 3)] = 1; return g; }
  function dice(a, b) { var ga = grams(a), gb = grams(b), n = 0, x = 0, y = 0, k; for (k in ga) { x++; if (gb[k]) n++; } for (k in gb) y++; return 2 * n / (x + y || 1); }
  Lookup.prototype.closest = function (query, n) {
    var q = toks(query, true).filter(function (w) { return !FILLER[w]; }), qs = q.join(" ");
    if (!qs) return [];
    return this.bases.map(function (b) {
      var hit = 0; q.forEach(function (w) { if (b.c.indexOf(w) >= 0) hit += 1; else if (w.length > 2 && b.c.some(function (t) { return t.indexOf(w) === 0 || w.indexOf(t) === 0 && t.length > 3; })) hit += 0.6; });
      var best = 0; q.forEach(function (w) { b.c.forEach(function (t) { var d = dice(w, t); if (d > best) best = d; }); });
      return { base: b.name, sc: hit / Math.max(q.length, 1) + 0.5 * dice(qs, b.c.join(" ")) + 0.3 * best };
    }).filter(function (x) { return x.sc > 0.35; }).sort(function (a, b) { return b.sc - a.sc || a.base.length - b.base.length; }).slice(0, n || 6).map(function (x) { return x.base; });
  };
  // typeahead suggestions (strings)
  Lookup.prototype.suggest = function (query, shardEntry, n) {
    n = n || 8; var raw = norm(query); if (!raw) return [];
    var p = this.parse(query), out = [];
    if (p.base) {
      var rest = raw.split(" ").filter(function (w) { return toks(p.base, false).indexOf(stem(w)) < 0; });
      var frag = rest.filter(function (w) { return !FILLER[w]; }).join(" ");
      var keys = shardEntry ? Object.keys(shardEntry.k) : this.names.p.concat(this.names.s);
      if (!frag) {
        out = [p.base];
        if (shardEntry) keys.filter(function (k) { return k.indexOf("|") > 0; }).sort(function (a, b) { var A = shardEntry.k[a], B = shardEntry.k[b]; return ((A[2] === 1) - (B[2] === 1)) || (B[0] || 0) - (A[0] || 0); })
          .slice(0, n - 1).forEach(function (k) { var a = k.split("|"); out.push(p.base + " " + a[0] + " " + a[1]); });
        return out;
      }
      keys.forEach(function (k) {
        if (!k || out.length >= 40) return; var a = k.split("|"), label = a[1] ? a[0] + " " + a[1] : a[0];
        if (!a[1]) { if (k === frag || STATES[k].indexOf(frag) === 0) out.push(p.base + " " + k); return; }
        if (label.indexOf(frag) === 0 || (" " + label).indexOf(" " + frag) >= 0) out.push(p.base + " " + label);
      });
      if (out.length) return out.slice(0, n);
    }
    var self = this, starts = [], words = [];
    this.bases.forEach(function (b) {
      if (b.name.indexOf(raw) === 0) starts.push(b.name);
      else { var qw = raw.split(" "), bw = b.name.split(" "); if (qw.every(function (w) { return bw.some(function (x) { return x.indexOf(w) === 0; }); })) words.push(b.name); }
    });
    var byLen = function (a, b) { return a.length - b.length || (a < b ? -1 : 1); };
    out = starts.sort(byLen).concat(words.sort(byLen));
    if (out.length < 3) self.closest(query, 5).forEach(function (b) { if (out.indexOf(b) < 0) out.push(b); });
    return out.slice(0, n);
  };
  function nextAuction(today) {
    var d = today || new Date();
    var y = d.getFullYear(), m = d.getMonth(), last = new Date(y, m + 1, 0).getDate();
    var day = d.getDate();
    var ws = last - 6, fmt = function (dd) { return dd.toISOString().slice(0, 10); };
    var mk = function (y2, m2) { var L = new Date(y2, m2 + 1, 0).getDate(); return { f1: new Date(Date.UTC(y2, m2, L - 6)), f2: new Date(Date.UTC(y2, m2, L - 2)), r1: new Date(Date.UTC(y2, m2, L - 1)), r2: new Date(Date.UTC(y2, m2, L)), disp: new Date(Date.UTC(y2, m2 + 1, 1)) }; };
    var w = mk(y, m);
    return { featured: [fmt(w.f1), fmt(w.f2)], spots: [fmt(w.r1), fmt(w.r2)], display: w.disp.toISOString().slice(0, 7), open: day >= ws };
  }
  var api = { Lookup: Lookup, pickVariant: pickVariant, norm: norm, stem: stem, toks: toks, title: title, nextAuction: nextAuction, shardKey: function (b) { return (b.toLowerCase().replace(/[^a-z0-9]/g, "") + "__").slice(0, 2); } };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.KW = api;
})(this);
