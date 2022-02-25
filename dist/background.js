!(function(e) {
  var t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    var r = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            i,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return i;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 19));
})({
  19: function(e, t) {
    let n = chrome.runtime.id,
      i = JSON.parse(window.localStorage.getItem(n)) || { enabled: !1 },
      r = [],
      o = {};
    async function a() {
      if ((r.forEach(e => clearInterval(e)), (r = []), i.enabledApp))
        for (let e of i.projects)
          if (e.enabled) {
            let t = await s(e.url);
            t.ok ? (o[e.url] = t.pipelines) : (o[e.url] = []),
              o[e.url].length > 100 && o[e.url].splice(100, o.length),
              r.push(await l(e));
          }
    }
    async function s(e) {
      try {
        let t = await fetch(e + "/pipelines.json?scope=all&page=1");
        if (t.ok) {
          return { ok: !0, message: "", pipelines: (await t.json()).pipelines };
        }
        return {
          ok: !1,
          message: "Don't have access to project",
          pipelines: []
        };
      } catch (e) {
        return console.log(e), { ok: !1, message: e.message, pipelines: [] };
      }
    }
    async function l(e, t = 5e3) {
      return setInterval(async function() {
        try {
          let t = await s(e.url);
          if (t.ok) {
            0 === o[e.url].length && (o[e.url] = t.pipelines);
            for (let n of t.pipelines)
              if (
                o[e.url].every(
                  e =>
                    e.id !== n.id ||
                    (e.id === n.id && e.updated_at !== n.updated_at)
                )
              ) {
                let t = o[e.url].findIndex(e => e.id === n.id);
                ~t && (o[e.url].splice(t, 1), o[e.url].unshift(n)),
                  o[e.url].length > 100 &&
                    o[e.url].splice(100, o[e.url].length),
                  e.enabled && c(e, n) && f(e, n);
              }
          }
        } catch (e) {
          console.log(e);
        }
      }, t);
    }
    function c(e, t) {
      if (0 === e.members.length) return !0;
      let n = e.members.find(e => {
        return (
          ((n = e.nickname).length && "@" === n[0]
            ? n.substring(1, n.length)
            : n) === t.user.username
        );
        var n;
      });
      if (n) {
        if (!n.enabled) return !1;
        if (t.ref.tag && ~n.tags.indexOf("*")) return !0;
        if (t.ref.branch && ~n.branches.indexOf("*")) return !0;
        if (t.ref.merge_request && ~n.merge.indexOf("*")) return !0;
      }
      return !1;
    }
    function u(e) {
      return 1 === e.toString().length ? "0" + e : e;
    }
    function f(e, t) {
      let r = "",
        o = [],
        a = new Date(t.updated_at);
      (a = `${u(a.getHours())}:${u(a.getMinutes())}-${u(a.getDate())}.${u(
        a.getMonth() + 1
      )}.${a.getFullYear()}`),
        o.push({ title: "Time", message: a }),
        o.push({ title: "Author", message: t.user.username }),
        t.ref.tag && o.push({ title: "Type", message: "tag" }),
        t.ref.merge_request &&
          o.push({ title: "Type", message: "merge request" }),
        t.ref.branch && o.push({ title: "Type", message: "branch" }),
        t.commit && o.push({ title: "Message", message: t.commit.message }),
        (r = t.ref.name);
      let s = ~t.details.status.favicon.indexOf("http")
        ? t.details.status.favicon
        : e.url.substring(0, e.url.indexOf(e.host)) +
          e.host +
          t.details.status.favicon;
      if (
        (~window.navigator.platform.indexOf("Win")
          ? chrome.notifications.create(
              t.id.toString() + t.commit.committed_date,
              {
                type: "basic",
                title: t.project.name + "/" + r,
                message: o.map(e => e.title + ": " + e.message).join("\n"),
                iconUrl: s,
                requireInteraction: !0
              }
            )
          : chrome.notifications.create(
              t.id.toString() + t.commit.committed_date,
              {
                type: "basic",
                title: t.project.name + "/" + r,
                message: "@" + t.user.username + " " + a,
                iconUrl: s,
                requireInteraction: !0
              }
            ),
        i.notifications)
      ) {
        let r = i.notifications.findIndex(e => e.id === t.id);
        ~r && i.notifications.splice(r, 1),
          (t.project.protocol = e.url.substring(0, e.url.indexOf(e.host))),
          (t.project.host = e.host),
          i.notifications.unshift({
            id: t.id,
            project: t.project,
            branch: t.ref.name,
            author: t.user,
            details: t.details,
            path:
              "/" === t.path[0]
                ? t.project.protocol + t.project.host + t.path
                : t.path,
            commit: {
              title: t.commit ? t.commit.title : "Not commit",
              message: t.commit ? t.commit.message : "Not commit"
            }
          }),
          i.notifications.length > 10 &&
            i.notifications.splice(10, i.notifications.length),
          window.localStorage.setItem(n, JSON.stringify(i));
      }
    }
    chrome.runtime.onMessage.addListener(async function(e) {
      "update" === e &&
        ((i = JSON.parse(window.localStorage.getItem(n)) || { enabled: !1 }),
        await a());
    }),
      chrome.notifications.onClicked.addListener(function(e) {
        for (let t of Object.keys(o)) {
          if (o[t].find(t => t.id === e)) {
            let e = i.projects.find(e => e.url === e);
            e &&
              chrome.tabs.create({
                url: e.url.substring(0, e.url.indexOf(e.host)) + e.host + e.path
              });
          }
        }
      }),
      (async () => {
        try {
          await a();
        } catch (e) {
          console.log(e);
        }
      })();
  }
});
