document.addEventListener("DOMContentLoaded", async function () {
  async function d() {
    var a = chrome.i18n.getUILanguage().split("-")[0];
    "ja" !== a && (a = "en");
    "ja" === a ? $(".browser_en").remove() : $(".browser_ja").remove();
    document
      .querySelector("#permission_button")
      .addEventListener("click", function (b) {
        chrome.permissions.request(
          {
            permissions: [
              "downloads",
              "declarativeNetRequest",
              "declarativeNetRequestWithHostAccess",
              "notifications",
            ],
            origins:
              "http://*.pixiv.net/ https://*.pixiv.net/ http://*.pximg.net/ https://*.pximg.net/ http://orca-soft.net/ https://orca-soft.net/".split(
                " "
              ),
          },
          function (c) {
            c &&
              (alert(chrome.i18n.getMessage("kengen_kyoka_seiko")),
              chrome.runtime.sendMessage({ mode: "bg_reload" }, function () {
                window.close();
              }));
          }
        );
      });
    document.querySelectorAll(".permission-del").forEach(function (b) {
      b.addEventListener("click", function () {
        if (
          confirm(
            "\u4eca\u5f8c\u3001\u3053\u306e\u30a6\u30a3\u30f3\u30c9\u30a6\u3092\u8868\u793a\u3057\u306a\u3044\u3088\u3046\u306b\u8a2d\u5b9a\u3057\u307e\u3059\u304b\uff1f\nWould you like to stop displaying this window in the future?"
          )
        ) {
          var c = Math.floor(new Date().getTime() / 1e3);
          chrome.storage.local.set({ p_check: c });
          alert(
            "\u6a29\u9650\u306e\u8a31\u53ef\u753b\u9762\u304c\u8868\u793a\u3055\u308c\u306a\u3044\u3088\u3046\u306b\u8a2d\u5b9a\u3057\u307e\u3057\u305f\u3002\u4eca\u5f8c\u3001\u8a2d\u5b9a\u3092\u5909\u66f4\u3059\u308b\u5fc5\u8981\u304c\u751f\u3058\u305f\u5834\u5408\u306f\u3001\u62e1\u5f35\u6a5f\u80fd\u306e\u8a2d\u5b9a\u304b\u3089\u5909\u66f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u307e\u305f\u3001\u65b0\u305f\u306a\u6a29\u9650\u304c\u5fc5\u8981\u3068\u306a\u3063\u305f\u5834\u5408\u3001\u518d\u5ea6\u8a31\u53ef\u753b\u9762\u304c\u8868\u793a\u3055\u308c\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\n\nYou have configured the settings to disable the permission window. If you need to make changes in the future, please do so from the extension's settings. Note that if new permissions are required, the permission prompts may appear again."
          );
        }
        return !1;
      });
    });
  }
  const e = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async (a) => (await chrome.storage.local.get(a))[a],
    setItem: (a, b) => chrome.storage.local.set({ [a]: b }),
    removeItems: (a) => chrome.storage.local.remove(a),
  };
  try {
    const a = await e.getItem("data"),
      b = a ? JSON.parse(a) : null;
    if ("default" !== b.select_language)
      try {
        await initializeLocalization(b);
      } catch (c) {
        console.error(
          "An error occurred during localization initialization:",
          c
        );
      }
    await d();
  } catch (a) {
    console.error('Error processing "option":', a), await d();
  }
});
