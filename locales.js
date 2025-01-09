document.addEventListener("DOMContentLoaded", async function () {
  async function e() {
    function b(a) {
      return c ? a.replace(/(Pixiv ?Downloader ?)EX/gi, "$1") : a;
    }
    if (
      "fnbkeopcpjainobjebddfcnnknmfipid" === chrome.runtime.id ||
      "badokdmekghdolcnjiadnpabneleekcp" === chrome.runtime.id ||
      "khjggnfmcmkomdolhckecjnlphfajfld" === chrome.runtime.id
    )
      if (!(await d.getItem("ex_md")) || "" == (await d.getItem("ex_md"))) {
        var c = !0;
        $(".logo:first").length
          ? $(".logo:first").attr("src", "logo_free.png").attr("width", 484)
          : $("img[src='logo.png']")
              .attr("src", "logo_free.png")
              .attr("width", 484);
        $("div[locales='new_license_main_message']").length &&
          setTimeout(function () {
            "ja" === chrome.i18n.getUILanguage().split("-")[0]
              ? $("div[locales='new_license_main_message']").html(
                  "\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u8cfc\u5165\u3059\u308b\u3068Pixiv Downloader EX\u306b\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8\u3055\u308c\u3001<br>\u66f4\u306b\u4fbf\u5229\u306a\u6a5f\u80fd\u3092\u3054\u5229\u7528\u3044\u305f\u3060\u304f\u3053\u3068\u304c\u53ef\u80fd\u3067\u3059\u3002"
                )
              : $("div[locales='new_license_main_message']").html(
                  "When you purchase a license, it will upgrade to Pixiv Downloader EX,<br> and you will be able to use even more convenient features."
                );
          }, 100);
      }
    (function () {
      $("*[locales]").each(function () {
        var a = chrome.i18n.getMessage($(this).attr("locales"));
        (a = b(a)) && "" != a
          ? $(this).html(a)
          : console.log("locales error:" + $(this).attr("locales"));
      });
      $("*[locales_next]").each(function () {
        var a = chrome.i18n.getMessage($(this).attr("locales_next"));
        (a = b(a)) && "" != a ? $(this).html(a) : console.log("locales error");
      });
      $("*[locales_title]").each(function () {
        var a = chrome.i18n.getMessage($(this).attr("locales_title"));
        (a = b(a)) && "" != a
          ? $(this).attr("data-title", a)
          : console.log("locales error");
      });
      $("*[locales_placeholder]").each(function () {
        var a = chrome.i18n.getMessage($(this).attr("locales_placeholder"));
        (a = b(a)) && "" != a
          ? $(this).attr("placeholder", a)
          : console.log("locales error");
      });
    })();
  }
  const d = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async (b) => (await chrome.storage.local.get(b))[b],
    setItem: (b, c) => chrome.storage.local.set({ [b]: c }),
    removeItems: (b) => chrome.storage.local.remove(b),
  };
  try {
    const b = await d.getItem("data"),
      c = b ? JSON.parse(b) : null;
    if ("default" !== c.select_language)
      try {
        await initializeLocalization(c);
      } catch (a) {
        console.error(
          "An error occurred during localization initialization:",
          a
        );
      }
    await e();
  } catch (b) {
    console.error('Error processing "option":', b), await e();
  }
});
