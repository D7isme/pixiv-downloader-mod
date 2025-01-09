window.initializeLocalization = async function (k) {
  try {
    if (chrome.i18n.getMessage._isOverriddenStart)
      return (
        await new Promise((b) => {
          const a = setInterval(() => {
            chrome.i18n.getMessage._isOverridden && (clearInterval(a), b());
          }, 10);
        }),
        !1
      );
    chrome.i18n.getMessage._isOverriddenStart = !0;
    const e = chrome.i18n.getMessage,
      q = chrome.i18n.getUILanguage,
      f = {};
    function r(b, a) {
      try {
        let c = b.message;
        const l = b.placeholders || {},
          g = {};
        a ? Array.isArray(a) || (a = [a]) : (a = []);
        for (const [d, t] of Object.entries(l)) {
          const m = t.content;
          if (m.match(/^\$\d+$/)) {
            const n = parseInt(m.replace("$", "")) - 1;
            g[d] = void 0 !== a[n] ? a[n] : "";
          } else g[d] = m;
        }
        return (c = c.replace(/\$\$|\$[a-zA-Z0-9_]+\$/g, (d) => {
          if ("$$" === d) return "$";
          d = d.slice(1, -1);
          return void 0 !== g[d] ? g[d] : "";
        }));
      } catch (c) {
        throw (console.error("Error in substitutePlaceholders:", c), c);
      }
    }
    let p = !1;
    if (!k.select_language) return !1;
    const h = k.select_language;
    (await (async function (b) {
      try {
        const a = chrome.runtime.getURL(`_locales/${b}/messages.json`),
          c = await fetch(a);
        if (!c.ok) throw Error(`Failed to load messages for language: ${b}`);
        const l = await c.json();
        f[b] = l;
        return !0;
      } catch (a) {
        return console.warn(a.message), (f[b] = null), !1;
      }
    })(h)) && f[h]
      ? ((chrome.i18n.getMessage = function (b, a) {
          try {
            const c = f[h];
            return c && c[b] ? r(c[b], a) : e(b, a);
          } catch (c) {
            return console.error("Error in getMessage override:", c), e(b, a);
          }
        }),
        (chrome.i18n.getUILanguage = function () {
          return k.select_language || q();
        }),
        (p = !0))
      : console.warn(
          `Failed to override i18n for language: ${h}. Using default behavior.`
        );
    chrome.i18n.getMessage._isOverridden = !0;
    return p;
  } catch (e) {
    return (
      (chrome.i18n.getMessage._isOverridden = !0),
      console.error("An error occurred:", e),
      !1
    );
  }
};
