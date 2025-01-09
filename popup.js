document.addEventListener("DOMContentLoaded", async function () {
  async function g() {
    function a() {
      alert(
        "Pixiv\u306e\u30da\u30fc\u30b8\u304c\u8868\u793a\u3055\u308c\u3066\u3044\u306a\u3044\u304b\u3001PixivDownloader\u304c\u518d\u8d77\u52d5\u3055\u308c\u305f\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002\u30da\u30fc\u30b8\u3092\u518d\u8aad\u8fbc\u3057\u3066\u518d\u5ea6\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nPixiv may not be displayed, or PixivDownloader might have been restarted. Please reload the page and press the download button again."
      );
    }
    var c = [];
    c.push({
      icon: "dl-icon",
      name: chrome.i18n.getMessage("popup_illust_download"),
      url: "#",
      callback: function () {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (b) {
          (b = b[0])
            ? chrome.tabs.sendMessage(
                b.id,
                { mode: "directDownload", tabId: b.id },
                function (d) {
                  void 0 !== d
                    ? d.result
                      ? window.close()
                      : alert(
                          chrome.i18n.getMessage("popup_illust_download_error")
                        )
                    : a();
                }
              )
            : a();
        });
      },
    });
    c.push({
      icon: "dl-icon",
      name: chrome.i18n.getMessage("popup_author_download_all"),
      url: "#",
      callback: function () {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (b) {
          (b = b[0])
            ? chrome.tabs.sendMessage(
                b.id,
                { mode: "creatorDownloadAll", tabId: b.id },
                function (d) {
                  void 0 !== d
                    ? d.result
                      ? window.close()
                      : alert(
                          chrome.i18n.getMessage(
                            "popup_illust_download_all_error"
                          )
                        )
                    : a();
                }
              )
            : a();
        });
      },
    });
    c.push({
      icon: "dl-icon",
      name: chrome.i18n.getMessage("popup_illust_download_all"),
      url: "#",
      callback: function () {
        chrome.tabs.query({ active: !0, currentWindow: !0 }, function (b) {
          (b = b[0])
            ? chrome.tabs.sendMessage(
                b.id,
                { mode: "directDownloadAll", tabId: b.id },
                function (d) {
                  void 0 !== d
                    ? d.result
                      ? window.close()
                      : alert(
                          chrome.i18n.getMessage(
                            "popup_illust_download_all_error"
                          )
                        )
                    : a();
                }
              )
            : a();
        });
      },
    });
    c.push({
      icon: "setting-icon",
      name: chrome.i18n.getMessage("popup_setting"),
      url: "#",
      callback: function () {
        chrome.tabs.create({ url: "options.html" });
        window.close();
      },
    });
    var f = c.length;
    $("body").html('<div id="wrap"></div>');
    for (var e = 0; e < f; e++)
      $("#wrap").append(
        '<a href="' +
          c[e].url +
          '" id="label' +
          e +
          '" target="_blank"><div class="icon ' +
          c[e].icon +
          '"></div>' +
          c[e].name +
          "</a>"
      ),
        c[e].callback &&
          $("#label" + e).click(function () {
            var b = $(this)
              .attr("id")
              .match(/^label(\d+$)/)[1];
            c[b].callback();
            return !1;
          });
  }
  const h = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async (a) => (await chrome.storage.local.get(a))[a],
    setItem: (a, c) => chrome.storage.local.set({ [a]: c }),
    removeItems: (a) => chrome.storage.local.remove(a),
  };
  try {
    const a = await h.getItem("data"),
      c = a ? JSON.parse(a) : null;
    if ("default" !== c.select_language)
      try {
        await initializeLocalization(c);
      } catch (f) {
        console.error(
          "An error occurred during localization initialization:",
          f
        );
      }
    await g();
  } catch (a) {
    console.error('Error processing "option":', a), await g();
  }
});
