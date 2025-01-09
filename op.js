document.addEventListener("DOMContentLoaded", async function () {
  async function v() {
    function h(a) {
      var b = a.find(".text_input:first").val();
      b = k(b, !0);
      0 < a.find("#dir_name").size() &&
        (b =
          "ja" === f
            ? "/" + b + "/\u4fdd\u5b58\u3059\u308b\u30d5\u30a1\u30a4\u30eb"
            : "/" + b + "/Save the file");
      a.find(".sample:first").html("<b style='color:#555;'>SAMPLE</b> " + b);
    }
    function k(a, b) {
      if (b) {
        b = '<span style="background-color:#89b4f6;padding:2px;height:18px;">';
        var c = "</span>";
      } else varet = b = "";
      var d = [
          { ja: "\u30bf\u30a4\u30c8\u30eb", en: "Title" },
          { ja: "\u4f5c\u8005ID", en: "Author ID" },
          { ja: "\u4f5c\u8005\u540d", en: "Author Name" },
          {
            ja: "\u4f5c\u8005\u540d(\u7f6e\u63db)",
            en: "Author Name (Replaced)",
          },
          { ja: "\u30bf\u30b0", en: "Tags" },
          { ja: "\u77ed\u3044\u30bf\u30b0\u306e\u307f", en: "Short Tags Only" },
          { ja: "\u4f7f\u7528\u30c4\u30fc\u30eb", en: "Tools Used" },
          { ja: "PixivID", en: "Pixiv ID" },
          {
            ja: "\u30a4\u30e9\u30b9\u30c8ID(\u5c0f\u8aacID)",
            en: "Illustration ID (Novel ID)",
          },
          { ja: "\u30b7\u30ea\u30fc\u30ba\u540d", en: "Series Name" },
          { ja: "\u30b7\u30ea\u30fc\u30baID", en: "Series ID" },
          { ja: "\u30b7\u30ea\u30fc\u30ba\u756a\u53f7", en: "Series Number" },
          { ja: "\u6295\u7a3f\u3057\u305f\u5e74", en: "Posted Year" },
          { ja: "\u6295\u7a3f\u3057\u305f\u6708", en: "Posted Month" },
          { ja: "\u6295\u7a3f\u3057\u305f\u65e5", en: "Posted Day" },
          { ja: "\u6295\u7a3f\u3057\u305f\u6642", en: "Posted Hour" },
          { ja: "\u6295\u7a3f\u3057\u305f\u5206", en: "Posted Minute" },
          { ja: "\u6295\u7a3f\u3057\u305f\u79d2", en: "Posted Second" },
          { ja: "\u6295\u7a3f\u3057\u305f\u6708(0)", en: "Posted Month (0)" },
          { ja: "\u6295\u7a3f\u3057\u305f\u65e5(0)", en: "Posted Day (0)" },
          { ja: "\u6295\u7a3f\u3057\u305f\u6642(0)", en: "Posted Hour (0)" },
          { ja: "\u6295\u7a3f\u3057\u305f\u5206(0)", en: "Posted Minute (0)" },
          { ja: "\u6295\u7a3f\u3057\u305f\u79d2(0)", en: "Posted Second (0)" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u5e74", en: "Saved Year" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u6708", en: "Saved Month" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u65e5", en: "Saved Day" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u6642", en: "Saved Hour" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u5206", en: "Saved Minute" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u79d2", en: "Saved Second" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u66dc\u65e5", en: "Saved Weekday" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u6708(0)", en: "Saved Month (0)" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u65e5(0)", en: "Saved Day (0)" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u6642(0)", en: "Saved Hour (0)" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u5206(0)", en: "Saved Minute (0)" },
          { ja: "\u4fdd\u5b58\u3057\u305f\u79d2(0)", en: "Saved Second (0)" },
          {
            ja: "\u30da\u30fc\u30b8\u756a\u53f7(01,02,03\u2026)",
            en: "Page Number (01,02,03\u2026)",
          },
          {
            ja: "\u30da\u30fc\u30b8\u756a\u53f7(00,01,02\u2026)",
            en: "Page Number (00,01,02\u2026)",
          },
          {
            ja: "\u30da\u30fc\u30b8\u756a\u53f7(1,2,3\u2026)",
            en: "Page Number (1,2,3\u2026)",
          },
          {
            ja: "\u30da\u30fc\u30b8\u756a\u53f7(0,1,2\u2026)",
            en: "Page Number (0,1,2\u2026)",
          },
          { ja: "\u7dcf\u30da\u30fc\u30b8\u6570", en: "Total Pages" },
          { ja: "$1(\u6f2b\u753b\u306e\u307f)", en: "$1(Comics Only)" },
          {
            ja: "$1(\u30a4\u30e9\u30b9\u30c8\u306e\u307f)",
            en: "$1(Illustrations Only)",
          },
          {
            ja: "$1(\u3046\u3054\u30a4\u30e9\u306e\u307f)",
            en: "$1(Animated Illustrations Only)",
          },
          { ja: "$1(\u6f2b\u753b\u306e\u307f)", en: "$1(Comics Only)" },
          { ja: "$1(\u5c0f\u8aac\u306e\u307f)", en: "$1(Novels Only)" },
          {
            ja: "$1($2\u6841\u4ee5\u4e0a\u306b\u5909\u63db)",
            en: "$1 (converted to at least $2 digits)",
          },
          {
            ja: "\u3010\u6587\u5b57\u5217\u3092\u7f6e\u63db\u3011",
            en: "[Replace string]",
          },
          {
            ja: "\u3010\u6587\u5b57\u5217\u3092\u30c1\u30a7\u30c3\u30af\u3011",
            en: "[Check string]",
          },
          {
            ja: "\u3010\u6b63\u898f\u8868\u73fe\u3067\u7f6e\u63db\u3011",
            en: "[Replace with Regular Expression]",
          },
          {
            ja: "\u3010\u6b63\u898f\u8868\u73fe\u3067\u6587\u5b57\u5217\u3092\u30c1\u30a7\u30c3\u30af\u3011",
            en: "[Check string with Regular Expression]",
          },
          { ja: "$1(AI\u4f5c\u54c1\u306e\u307f)", en: "$1(AI Contents Only)" },
          {
            ja: "$1(R-18\u4f5c\u54c1\u306e\u307f)",
            en: "$1(R-18 Contents Only)",
          },
          {
            ja: "\u7dcf\u30da\u30fc\u30b8\u6570(\u5c0f\u8aac)",
            en: "Total Pages (Novels Only)",
          },
          {
            ja: "\u6587\u5b57\u6570(\u5c0f\u8aac)",
            en: "Character Count (Novels Only)",
          },
          {
            ja: "\u30ef\u30fc\u30c9\u6570(\u5c0f\u8aac)",
            en: "Word Count (Novels Only)",
          },
          {
            ja: "\u5c0f\u8aac\u306e\u8aad\u4e86\u76ee\u5b89(\u79d2\u5358\u4f4d)",
            en: "Reading Time Estimate (Seconds, Novels Only)",
          },
          {
            ja: "\u5c0f\u8aac\u306e\u8aad\u4e86\u76ee\u5b89(\u5206\u5358\u4f4d)",
            en: "Reading Time Estimate (Minutes, Novels Only)",
          },
          {
            ja: "$1(\u30aa\u30ea\u30b8\u30ca\u30eb\u4f5c\u54c1\u306e\u307f)",
            en: "$1(Original Contents Only)",
          },
        ],
        e = 0;
      a = a.replace(/\?title\?/g, b + d[e++][f] + c);
      a = a.replace(/\?member-id\?/g, b + d[e++][f] + c);
      a = a.replace(/\?member-name\?/g, b + d[e++][f] + c);
      a = a.replace(/\?memoized-name\?/g, b + d[e++][f] + c);
      a = a.replace(/\?tags\?/g, b + d[e++][f] + c);
      a = a.replace(/\?short-tags\?/g, b + d[e++][f] + c);
      a = a.replace(/\?tools\?/g, b + d[e++][f] + c);
      a = a.replace(/\?pixiv-id\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-id\?/g, b + d[e++][f] + c);
      a = a.replace(/\?series\?/g, b + d[e++][f] + c);
      a = a.replace(/\?series-id\?/g, b + d[e++][f] + c);
      a = a.replace(/\?series-no\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-year\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-month\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-day\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-hour\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-minute\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-second\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-month-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-day-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-hour-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-minute-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?illust-second-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-year\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-month\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-day\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-hour\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-minute\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-second\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-week\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-month-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-day-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-hour-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-minute-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?saved-second-p\?/g, b + d[e++][f] + c);
      a = a.replace(/\?page-zeroformat\?/g, b + d[e++][f] + c);
      a = a.replace(/\?page-zeroformat-original\?/g, b + d[e++][f] + c);
      a = a.replace(/\?page\?/g, b + d[e++][f] + c);
      a = a.replace(/\?page-original\?/g, b + d[e++][f] + c);
      a = a.replace(/\?page-all\?/g, b + d[e++][f] + c);
      a = a.replace(/\?\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?i\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?u\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?m\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?n\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?\{(.+?),(\d+?)\}\?/g, b + d[e++][f] + c);
      a = a.replace(/\?rep\{'(.*?)','(.*?)','(.*?)'\}\?/g, b + d[e++][f] + c);
      a = a.replace(
        /\?mat\{'(.*?)','(.*?)','(.*?)','(.*?)'\}\?/g,
        b + d[e++][f] + c
      );
      a = a.replace(
        /\?reg\{'(.*?)','(.*?)','(.*?)','([a-zA-Z]*?)'\}\?/g,
        b + d[e++][f] + c
      );
      a = a.replace(
        /\?regmat\{'(.*?)','(.*?)','(.*?)','(.*?)','([a-zA-Z]*?)'\}\?/g,
        b + d[e++][f] + c
      );
      a = a.replace(/\?a\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?r\[(.+?)\]\?/g, b + d[e++][f] + c);
      a = a.replace(/\?novel-page-all\?/g, b + d[e++][f] + c);
      a = a.replace(/\?novel-cnt\?/g, b + d[e++][f] + c);
      a = a.replace(/\?novel-wcnt\?/g, b + d[e++][f] + c);
      a = a.replace(/\?novel-rtime-sec\?/g, b + d[e++][f] + c);
      a = a.replace(/\?novel-rtime-min\?/g, b + d[e++][f] + c);
      return (a = a.replace(/\?o\[(.+?)\]\?/g, b + d[e++][f] + c));
    }
    async function t() {
      confirm(chrome.i18n.getMessage("option_reset_confirm")) &&
        chrome.runtime.sendMessage({ mode: "reset" }, function (a) {
          alert(chrome.i18n.getMessage("option_reset_ok"));
          n = 1;
          location.reload();
        });
    }
    async function D() {
      confirm(chrome.i18n.getMessage("option_rireki_reset_confirm")) &&
        (alert(chrome.i18n.getMessage("option_rireki_reset_ok")),
        await g.setItem("illustid", ""));
    }
    async function E(a) {
      if (k(document.getElementById("file_name").value).match(/[\/:*?"<>|]/))
        alert(chrome.i18n.getMessage("option_filename_error"));
      else if (k(document.getElementById("dir_name").value).match(/[:*?"<>|]/))
        alert(chrome.i18n.getMessage("option_dirname_error"));
      else if (k(document.getElementById("dir_name").value).match(/\.\//))
        alert(chrome.i18n.getMessage("option_pass_error"));
      else if (
        $("#gif_resize")
          .val()
          .match(/^\d+(%|px)$/i)
      ) {
        try {
          var b = $("#gif_resize")
            .val()
            .match(/^(\d+)%$/)[1];
          if (100 < b) {
            alert(
              "100%\u3088\u308a\u5927\u304d\u306a\u5024\u306f\u6307\u5b9a\u3067\u304d\u307e\u305b\u3093\nYou cannot specify a value larger than 100%"
            );
            return;
          }
        } catch (d) {}
        if ($("#gif_quality").val().match(/^\d+$/)) {
          var c = $("#gif_quality")
            .val()
            .match(/^(\d+)$/)[1];
          if (1 > c || 20 < c)
            alert(
              "GIF\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u306e\u54c1\u8cea\u306f1\uff5e20\u306e\u9593\u3067\u8a2d\u5b9a\u3057\u3066\u4e0b\u3055\u3044\nPlease set the GIF animation quality between 1 and 20"
            );
          else if (
            !$("#gif_thread").val() ||
            10 < $("#gif_thread").val() ||
            0 >= $("#gif_thread").val()
          )
            alert(
              "GIF\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u306e\u30b9\u30ec\u30c3\u30c9\u6570\u306e\u6570\u5024\u304c\u4e0d\u6b63\u306a\u5024\u3067\u3059\nThe value for the number of GIF animation threads is invalid"
            );
          else if (
            $("#apng_resize")
              .val()
              .match(/^\d+(%|px)$/i)
          ) {
            try {
              if (
                ((b = $("#apng_resize")
                  .val()
                  .match(/^(\d+)%$/)[1]),
                100 < b)
              ) {
                alert(
                  "100%\u3088\u308a\u5927\u304d\u306a\u5024\u306f\u6307\u5b9a\u3067\u304d\u307e\u305b\u3093\nYou cannot specify a value larger than 100%"
                );
                return;
              }
            } catch (d) {}
            $.isNumeric($("#auto_dl_wait").val())
              ? $.isNumeric($("#def_dl_wait").val())
                ? $("#syncId")
                    .val()
                    .match(/^[a-f0-9]{10,25}$/)
                  ? ((b = JSON.parse(await g.getItem("data"))),
                    (b = p(b)),
                    await g.setItem("data", JSON.stringify(b)),
                    clearTimeout(w),
                    $(a.currentTarget).removeClass("save_push"),
                    chrome.runtime.sendMessage(
                      { mode: "new_load" },
                      function (d) {
                        $(a.currentTarget).addClass("save_push");
                        $(a.currentTarget).html(
                          chrome.i18n.getMessage("option_save_ok")
                        );
                        w = setTimeout(function () {
                          $(a.currentTarget).html(
                            chrome.i18n.getMessage("save")
                          );
                          $(a.currentTarget).removeClass("save_push");
                        }, 8e3);
                      }
                    ))
                  : alert(
                      "SyncID\u304c\u4e0d\u6b63\u3067\u3059\nThe SyncID is invalid"
                    )
                : alert(
                    "\u6f2b\u753b\u306e\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u306eDL\u9593\u9694\u306b\u306f\u6570\u5024\u4ee5\u5916\u5165\u529b\u3067\u304d\u307e\u305b\u3093\u3002\n\nYou cannot enter non-numeric values for the manga download interval."
                  )
              : alert(
                  "\u4e00\u62ec\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u306eDL\u9593\u9694\u306b\u306f\u6570\u5024\u4ee5\u5916\u5165\u529b\u3067\u304d\u307e\u305b\u3093\u3002\n\nYou cannot enter non-numeric values for the batch download interval."
                );
          } else
            alert(
              "APNG\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u306e\u30ea\u30b5\u30a4\u30ba\u306e\u5024\u304c\u4e0d\u6b63\u3067\u3059\nThe value for APNG animation resizing is invalid"
            );
        } else
          alert(
            "GIF\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u306e\u54c1\u8cea\u8a2d\u5b9a\u306b\u6570\u5b57\u4ee5\u5916\u304c\u5165\u529b\u3055\u308c\u3066\u3044\u307e\u3059\nNon-numeric values have been entered for the GIF animation quality setting"
          );
      } else
        alert(
          "GIF\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u306e\u30ea\u30b5\u30a4\u30ba\u306e\u5024\u304c\u4e0d\u6b63\u3067\u3059\nThe value for GIF animation resizing is invalid"
        );
    }
    function p(a) {
      a.filename = $("#file_name").val();
      a.dirname = $("#dir_name").val();
      a.star = $("#star").val();
      a.captionTxt = $("#captionTxt").val().replace(/\n/g, "\r\n");
      a.novel_captionTxt = $("#novel_captionTxt").val().replace(/\n/g, "\r\n");
      a.novel_captionTxtAfter = $("#novel_captionTxtAfter")
        .val()
        .replace(/\n/g, "\r\n");
      a.dl_shortcut_key = $("#dl_shortcut_key").val();
      a.dl_shortcut_abc = $("#dl_shortcut_abc").val();
      a.illust_zoom_select = $("#illust_zoom_select").val();
      a.manga_zoom_select = $("#manga_zoom_select").val();
      a.select_language = $("#select_language").val();
      $(".option")
        .find("input")
        .each(function () {
          if ($(this).data("nosave")) return !0;
          if ("checkbox" === $(this).attr("type")) {
            var b = $(this).attr("id");
            a[b] = $(this).prop("checked");
          } else if ("radio" === $(this).attr("type"))
            $(this).prop("checked") &&
              ((b = $(this).attr("class")), (a[b] = $(this).val()));
          else if (
            "text" === $(this).attr("type") ||
            "number" === $(this).attr("type")
          )
            (b = $(this).attr("id")), (a[b] = $(this).val());
        });
      return a;
    }
    async function F(a, b) {
      var c =
        0 < $(a.currentTarget).parent().parent().find("#file_name").size()
          ? $("#box1")
          : $("#box3");
      a = c.find(".text_input:first");
      var d = a.get(0),
        e = a.val(),
        q = e.length;
      d = d.selectionStart;
      var r = e.substr(0, d);
      e = e.substr(d, q);
      a.val(r + b + e);
      h(c);
      b = d + b.length;
      a.focus();
      a.get(0).setSelectionRange(b, b);
      a.trigger("input");
    }
    async function G() {
      $("#box1").fadeOut(0, function () {
        $("#box2").fadeIn(0);
      });
      $("#imgdata").val(await g.getItem("illustid"));
    }
    async function H() {
      "" == $("#imgdata").val() || $("#imgdata").val().match(/,$/)
        ? $("#imgdata")
            .val()
            .match(/^[\d,]*$/)
          ? (await g.setItem("illustid", $("#imgdata").val()),
            $("#box2").fadeOut(0, function () {
              $("#box1").fadeIn(0);
            }),
            $("#file_name,#dir_name").trigger("input"))
          : alert(
              "\u6570\u5b57\u4ee5\u5916\u306e\u6587\u5b57\u5217\u306e\u5165\u529b\u306f\u51fa\u6765\u307e\u305b\u3093"
            )
        : alert(
            "\u6700\u5f8c\u306b\u5fc5\u305a,\u3092\u4ed8\u3051\u3066\u4e0b\u3055\u3044"
          );
    }
    function x() {
      $(".dl_select[value='2']").prop("checked")
        ? y(
            "#dir_pass",
            "#box3",
            '\u30d5\u30a9\u30eb\u30c0\u3092\u6307\u5b9a\u3059\u308b\u5834\u5408\u306f"\u8a2d\u5b9a\u306b\u5f93\u3063\u3066\u30d5\u30a9\u30eb\u30c0\u306b\u4fdd\u5b58\u3059\u308b"\u306b\u30c1\u30a7\u30c3\u30af\u3092\u5165\u308c\u3066\u304f\u3060\u3055\u3044'
          )
        : 0 < $("#disable").size() &&
          ($("#disable").remove(), $("#disable_txt").remove());
    }
    function y(a, b, c) {
      $obj = $(a);
      $appendObj = $(b);
      0 == $("#disable").size() &&
        $appendObj.prepend(
          '<div id="disable"><div id="disable-inner"><span id="disable_txt"></span></div></div>'
        );
      $("#disable_txt").html(c);
      $("#disable").css("position", "absolute");
      $("#disable-inner").css({
        position: "relative",
        top: 0,
        left: 0,
        width: $obj.width(),
        height: $obj.height(),
        zIndex: 1e3,
        background: "rgba(255,255,255,0.5)",
      });
      $(window)
        .unbind("resize")
        .resize(function () {
          $("#disable-inner").css({
            width: $obj.width(),
            height: $obj.height(),
          });
        });
    }
    function z(a) {
      a
        ? $("#keikoku").html(
            '<div style="border-top: solid 2px #ccc;color: #f00;padding: 10px;font-weight: bold;">"\u30b5\u30fc\u30d0\u30fc\u7d4c\u7531\u3067\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3059\u308b"\u304cON\u306b\u306a\u3063\u3066\u3044\u307e\u3059\u3002\u3053\u306e\u9805\u76ee\u304cON\u3060\u3068\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u6307\u5b9a\u3084\u6f2b\u753b\u306eZIP\u5727\u7e2e\u3001\u3046\u3054\u304f\u30a4\u30e9\u30b9\u30c8\u306e\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u304c\u3067\u304d\u306a\u304f\u306a\u308a\u307e\u3059\u3002</div>'
          )
        : $("#keikoku").html("");
    }
    function u() {
      var a = $(window).height(),
        b = $("body").height();
      a > b
        ? ($(".footer-wrap").css({
            position: "relative",
            "box-shadow": "none",
          }),
          $("#main").css("padding-bottom", 10))
        : 50 < I++
        ? setTimeout(u, 1e3)
        : setTimeout(u, 100);
    }
    function J(a) {
      return btoa(
        encodeURIComponent(a).replace(/%([0-9A-F]{2})/g, function (b, c) {
          return String.fromCharCode("0x" + c);
        })
      );
    }
    function A(a) {
      return decodeURIComponent(
        atob(a)
          .split("")
          .map(function (b) {
            return "%" + ("00" + b.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    }
    var w,
      f = chrome.i18n.getUILanguage().split("-")[0];
    "ja" !== f && (f = "en");
    var l = new Date(Number(await g.getItem("syncTime")));
    l =
      l.getFullYear() +
      "/" +
      ("0" + (l.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + l.getDate()).slice(-2) +
      " " +
      ("0" + l.getHours()).slice(-2) +
      ":" +
      ("0" + l.getMinutes()).slice(-2);
    $("#lastSyncTime").html(l);
    $("#sync_force_button").click(async function (a) {
      chrome.runtime.sendMessage({ mode: "syncTime" });
      var b = "",
        c = 0,
        d = "," + (await g.getItem("illustid"));
      a = $("#syncId").val();
      $.ajax({
        url: "https://orca-soft.net/chrome/pd/sync/" + a + ".txt",
        cache: !1,
        timeout: 3e4,
        success: function (e) {
          var q = new Date();
          e = e.split(",");
          for (var r = e.length, m = 0; m < r; m++)
            "" != e[m] &&
              -1 == d.indexOf("," + e[m] + ",") &&
              ((b += e[m] + ","), (d += e[m] + ","), c++);
          "" != b
            ? (chrome.runtime.sendMessage({ mode: "id", data: b }),
              alert(
                "\u540c\u671f\u306b\u3088\u308a\u5c65\u6b74\u304c" +
                  c +
                  "\u4ef6\u8ffd\u52a0\u3055\u308c\u307e\u3057\u305f"
              ))
            : alert(
                "\u540c\u671f\u3067\u65b0\u898f\u306b\u8ffd\u52a0\u3059\u308b\u5c65\u6b74\u306f\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f"
              );
          5e3 < new Date() - q &&
            alert(
              "DL\u5c65\u6b74\u304c\u591a\u3059\u304e\u308b\u305f\u3081\u540c\u671f\u51e6\u7406\u306b\u6642\u9593\u304c\u304b\u304b\u3063\u3066\u3044\u307e\u3059\u3002\n\u5c65\u6b74\u3092\u524a\u9664\u3059\u308b\u304b\u540c\u671f\u3092\u30aa\u30d5\u306b\u3057\u3066\u4e0b\u3055\u3044"
            );
        },
        error: function (e, q, r) {
          alert(
            "\u540c\u671f\u3067\u65b0\u898f\u306b\u8ffd\u52a0\u3059\u308b\u5c65\u6b74\u306f\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f"
          );
        },
      });
      return !1;
    });
    $("#sync_reset_button").click(function (a) {
      window.confirm(
        "\u540c\u671f\u7528\u306e\u30c7\u30fc\u30bf\u3092\u521d\u671f\u5316\u3057\u307e\u3059\u304b\uff1f"
      ) &&
        ((a = $("#syncId").val()),
        $.ajax({
          url: "https://orca-soft.net/chrome/pd/sync.php",
          cache: !1,
          timeout: 3e4,
          data: "m=3&u=" + a + "&i=00000000",
          type: "GET",
          success: function (b) {
            "error" === b
              ? alert(
                  "SyncID\u304c\u4e0d\u6b63\u3067\u3059\u3002\u3082\u3046\u4e00\u5ea6\u304a\u78ba\u304b\u3081\u4e0b\u3055\u3044"
                )
              : alert(
                  "\u540c\u671f\u7528\u306e\u30c7\u30fc\u30bf\u3092\u521d\u671f\u5316\u3057\u307e\u3057\u305f"
                );
          },
          error: function (b, c, d) {
            alert(
              "\u540c\u671f\u7528\u306e\u30c7\u30fc\u30bf\u306e\u521d\u671f\u5316\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u518d\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002"
            );
          },
        }));
      return !1;
    });
    $("#sync_idcl_button").click(function (a) {
      if (
        window.confirm("SyncID\u3092\u5909\u66f4\u3057\u307e\u3059\u304b\uff1f")
      ) {
        alert("SyncID\u3092\u5909\u66f4\u3057\u307e\u3057\u305f");
        a = $("#syncId");
        var b = a.val;
        var c =
          new Date().getTime().toString(16) +
          Math.floor(1e3 * Math.random()).toString(16);
        b.call(a, c);
        return !1;
      }
    });
    $(".select_back").click(async function (a) {
      await F(a, $(this).html());
    });
    $("#file_name,#dir_name").bind("blur", function (a) {
      a = "file_name" === $(a.target).attr("id") ? $("#box1") : $("#box3");
      h(a);
    });
    $("#file_name,#dir_name").bind("keyup", function (a) {
      a = "file_name" === $(a.target).attr("id") ? $("#box1") : $("#box3");
      h(a);
    });
    var B =
      '<div style="text-align:right;margin-right:15px;"><a href="benri.html" target="_blank">' +
      chrome.i18n.getMessage("benri") +
      "</a></div>";
    $(".setsumei").html(B);
    $(".select_back")
      .mouseover(function () {
        var a = $(this).attr("data-title"),
          b = $(this).html();
        $(".setsumei").html(
          '<span style="background-color:#bdd7ff;padding-right:5px;padding-left:5px;border-radius:3px;">' +
            b +
            "</span> " +
            a
        );
      })
      .mouseout(function () {
        $(".setsumei").html(B);
      });
    $(".save").click(async function (a) {
      await E(a);
      C = p({});
    });
    $("#reset").click(async function () {
      await t();
    });
    $("#editout").click(async function () {
      await H();
    });
    $(".link_label:first").click(async function () {
      await G();
    });
    $(".next_setting:first").click(function () {
      $("#box1").hide();
      $("#box3").show(0, function () {
        function a() {
          chrome.runtime.sendMessage({ mode: "l" }, function (c) {
            if (/*c.l.f && (clearInterval(b), 0 >= c.l.d || !c.l.result)*/ false) {
              y(
                "#expansion",
                "#box3",
                chrome.i18n.getMessage("option_ninsyogo")
              );
              c = $(window).height();
              var d = $("body").height();
              c < d && $("#disable_txt").css({ position: "fixed" });
              $("#box3").find("input").attr("tabindex", "-1");
            }
          });
        }
        x();
        var b = setInterval(function () {
          a();
        }, 100);
      });
      $("#file_name,#dir_name").trigger("input");
    });
    $(".back_setting:first").click(function () {
      $("#box3").hide();
      $("#box1").show();
      $("#file_name,#dir_name").trigger("input");
    });
    $("#dl_history,#dl_alert,#dl_message").click(function () {
      $(this).get(0);
    });
    $("#server_dl").click(function () {
      var a = $(this);
      $(a).prop("checked") &&
        (window.confirm(
          "\u3053\u306e\u9805\u76ee\u306fOFF\u3092\u63a8\u5968\u3057\u307e\u3059\u3002\n\u3069\u3046\u3057\u3066\u3082\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3067\u304d\u306a\u3044\u5834\u5408\u306e\u307f\u3053\u306e\u9805\u76ee\u3092ON\u306b\u3057\u3066\u304f\u3060\u3055\u3044\u3002\n\u307e\u305f\u3001\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306e\u6307\u5b9a\u3001\u6f2b\u753b\u306eZIP\u5727\u7e2e\u3084\u3046\u3054\u304f\u30a4\u30e9\u30b9\u30c8\u306e\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u306f\u3067\u304d\u306a\u304f\u306a\u308a\u307e\u3059\u3002\nON\u306b\u3057\u307e\u3059\u304b\uff1f"
        ) ||
          $(a).prop("checked", !1));
    });
    $("#avi_ecomode").click(function () {
      $(this).prop("checked") &&
        (window.confirm(
          "\u3053\u306e\u9805\u76ee\u306fOFF\u3092\u63a8\u5968\u3057\u307e\u3059\u3002\n\u30d5\u30ec\u30fc\u30e0\u30ec\u30fc\u30c8\u306e\u524a\u6e1b\u3092\u884c\u3046\u3068\u518d\u751f\u901f\u5ea6\u306b\u5fae\u5999\u306a\u30ba\u30ec\u304c\u751f\u3058\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002\n\u3069\u3046\u3057\u3066\u3082\u518d\u751f\u304c\u3046\u307e\u304f\u3044\u304b\u306a\u3044\u5834\u5408\u306e\u307fON\u306b\u3057\u3066\u304f\u3060\u3055\u3044\u3002\nWe recommend turning this feature OFF.\nReducing the frame rate may cause a subtle discrepancy in playback speed.\nPlease turn it ON only if you are unable to play back properly."
        ) ||
          $(this).prop("checked", !1));
    });
    $("#dl_history_erase").click(function () {
      $(this).prop("checked") ||
        window.confirm(
          "\u3053\u306e\u9805\u76ee\u3092\u30aa\u30d5\u306b\u3059\u308b\u3068\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u5c65\u6b74\u304c\u5897\u3048\u3059\u304e\u305f\u6642\u3001\u52d5\u4f5c\u304c\u9045\u304f\u306a\u308b\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002\u305d\u306e\u5834\u5408\u306f\u30aa\u30f3\u306b\u3057\u3066\u4e0b\u3055\u3044\nTurning this feature off may slow down operations if your download history becomes too large. If this happens, please turn it on."
        ) ||
        $(this).prop("checked", !0);
    });
    $("#server_dl").click(function () {
      z($(this).prop("checked"));
    });
    $(".link_label:eq(1)").click(async function () {
      await D();
    });
    $(".dl_select").click(function () {
      x();
    });
    $("#apng_readme").click(function () {
      window.open(
        "apng_readme.html",
        "report",
        "width=540,height=380,left=" +
          (window.screen.width - 540) / 2 +
          ",top=" +
          (window.screen.height - 380 - 100) / 2
      );
    });
    $("#xng_readme").click(function () {
      window.open(
        "xng_readme.html",
        "report",
        "width=540,height=380,left=" +
          (window.screen.width - 540) / 2 +
          ",top=" +
          (window.screen.height - 380 - 100) / 2
      );
    });
    $("#player_dl").click(function () {
      setting = {
        url: "https://orca-soft.net/chrome/pd/player/player.html",
        filename:
          "\u3046\u3054\u304f\u30a4\u30e9\u30b9\u30c8\u30d7\u30ec\u30a4\u30e4\u30fc.html",
        saveAs: !0,
      };
      try {
        chrome.downloads.download(setting);
      } catch (a) {
        alert(chrome.i18n.getMessage("unknown_error"));
      }
    });
    $(window).unload(async function () {
      $("#box1").is(":visible")
        ? await g.setItem("page", 1)
        : $("#box2").is(":visible")
        ? await g.setItem("page", 2)
        : $("#box3").is(":visible") && (await g.setItem("page", 3));
    });
    $("#hint").click(function () {
      "ja" === f
        ? alert(
            "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3059\u308b\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u3092\u8a2d\u5b9a\u3059\u308b\u5165\u529b\u6b04\u306b?[\u6587\u5b57\u5217]?\u3068\u3044\u3046\u30bf\u30b0\u304c\u3042\u308a\u307e\u3059\u3002\n\u3053\u308c\u3092\u5229\u7528\u3057\u3066?[/?title?]?\u306a\u3069\u3068\u5165\u529b\u3059\u308b\u3068\u6f2b\u753b\u306e\u6642\u3060\u3051\u5225\u306e\u30c7\u30a3\u30ec\u30af\u30c8\u30ea\u306b\u4fdd\u5b58\u3059\u308b\u3053\u3068\u304c\u51fa\u6765\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3059\u3002\n\n\u30b5\u30f3\u30d7\u30eb\uff1apixiv/?member-name??[/?title?]?"
          )
        : alert(
            "There is a tag called ?[string]? in the input field where you set the directory to download files. \nBy using this tag and entering something like ?[/?title?]?, you can save to a different directory only when it is a manga. \n\nSample: pixiv/?member-name??[/?title?]?"
          );
      return !1;
    });
    $("#report").click(async function (a) {
      a.preventDefault();
      window.open(
        "https://orca-soft.net/info/support.php?service=1&content=0&ver=" +
          (await g.getItem("version"))
      );
      return !1;
    });
    $("#memozed_list").click(function () {
      window.open(
        chrome.i18n.getMessage("memozed_list_url"),
        "memozed_list",
        "width=820,height=500,left=" +
          (window.screen.width - 820) / 2 +
          ",top=" +
          (window.screen.height - 380 - 100) / 2
      );
    });
    $.ajax({
      url: "https://orca-soft.net/chrome/pd/message/option_page_topic.txt",
      cache: !1,
      timeout: 5e3,
      success: function (a) {
        (async function () {
          a &&
            "" != a &&
            ((a = a.replace(/%version%/g, await g.getItem("version"))),
            $("#freadme_show").html(a),
            $("a.freadme_slidebox").click(function (b) {
              b.preventDefault();
              b = $(this).attr("data-label");
              b.startsWith("label_") &&
                ((b = b.split("_")[1]),
                (b = $('div.freadme_slidebox[data-label="open_' + b + '"]')),
                b.is(":hidden") ? b.slideDown(200) : b.slideUp(200));
            }));
        })();
      },
      error: function (a, b, c) {},
    });
    if (-1 != location.hash.indexOf("freadme")) {
      1 != (await g.getItem("page")) && (await g.setItem("page", 1));
      $("html, body").animate(
        { scrollTop: $("#freadme_show").position().top - 100 },
        500,
        "swing"
      );
      var K = setInterval(function () {
        0 < $("#dl_error_view").length &&
          (setTimeout(function () {
            $("#dl_error_view").click();
          }, 100),
          clearInterval(K));
      }, 100);
      $("#freadme_show").css({ backgroundColor: "#ffcccc", opacity: 0.3 });
      $("#freadme_show").animate({ opacity: 1 }, 500, function () {
        $("#freadme_show").animate({ opacity: 0.3 }, 500, function () {
          $("#freadme_show").animate({ opacity: 1 }, 500, function () {
            $("#freadme_show").animate({ opacity: 0.3 }, 500, function () {
              $("#freadme_show").animate({ opacity: 1 }, 500);
            });
          });
        });
      });
    }
    $("input").change(function () {
      var a = $(this).attr("class");
      $("." + a).each(function () {
        var b = $(this);
        b.prop("checked")
          ? b.parent().next().hasClass("hidden_contents") &&
            b.parent().next().show()
          : b.parent().next().hasClass("hidden_contents") &&
            b.parent().next().hide();
      });
    });
    var I = 0;
    u();
    try {
      function a(b) {
        30 < b.scrollHeight &&
          ((b.style.height = "auto"), (b.style.height = b.scrollHeight + "px"));
      }
      setTimeout(function () {
        $("#file_name, #dir_name")
          .each(function () {
            a(this);
          })
          .on("input", function () {
            a(this);
          });
      }, 0);
      $("#file_name, #dir_name").on("input", function () {
        var b = $(this).val();
        b = b.replace(/(\r\n|\n|\r)/gm, "");
        $(this).val(b);
      });
    } catch (a) {}
    await (async function () {
      var a = JSON.parse(await g.getItem("data"));
      $("#file_name").val(a.filename);
      $("#dir_name").val(a.dirname);
      $("#star").val(a.star);
      $("#captionTxt").val(a.captionTxt);
      $("#novel_captionTxt").val(a.novel_captionTxt);
      $("#novel_captionTxtAfter").val(a.novel_captionTxtAfter);
      $("#dl_shortcut_key").val(a.dl_shortcut_key);
      $("#dl_shortcut_abc").val(a.dl_shortcut_abc);
      $("#illust_zoom_select").val(a.illust_zoom_select);
      $("#manga_zoom_select").val(a.manga_zoom_select);
      $("#select_language").val(a.select_language);
      $("#file_name,#dir_name").trigger("input");
      $(".option")
        .find("input")
        .each(function () {
          "checkbox" === $(this).attr("type")
            ? "toggleOption" === $(this).attr("class")
              ? a[$(this).attr("id")] && $(this).click()
              : $(this).prop("checked", a[$(this).attr("id")])
            : "radio" === $(this).attr("type")
            ? a[$(this).attr("class")] === $(this).val() && $(this).click()
            : ("text" === $(this).attr("type") ||
                "number" === $(this).attr("type")) &&
              $(this).val(a[$(this).attr("id")]);
        });
      $("#imgdata").css({ height: $("#main").height() - 120 });
      $("#version").html("version " + (await g.getItem("version")));
      1e6 < (await g.getItem("illustid")).length &&
        $("#illust_alert").html(
          "<strong>\u52d5\u4f5c\u304c\u91cd\u3044\u5834\u5408\u306f\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u5c65\u6b74\u3092\u6d88\u53bb\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002</storong>"
        );
      a.server_dl && z(!0);
    })();
    h($("#box1"));
    h($("#box3"));
    1 != (await g.getItem("page")) &&
      (2 == (await g.getItem("page"))
        ? $(".link_label:eq(0)").click()
        : 3 == (await g.getItem("page")) && $(".next_setting:first").click());
    var L = setInterval(async function () {
      chrome.runtime.sendMessage({ mode: "l" }, async function (a) {
        if (a.l.f) {
          clearInterval(L);
          if (
            1 == a.l.s &&
            1e3 < (await g.getItem("illustid")).length &&
            !(await g.getItem("rev_req"))
          ) {
            var b =
              "badokdmekghdolcnjiadnpabneleekcp" === chrome.runtime.id
                ? "https://microsoftedge.microsoft.com/addons/detail/" +
                  chrome.runtime.id
                : "https://chromewebstore.google.com/detail/" +
                  chrome.runtime.id;
            $("#hyoka_mes").html(
              '<a href="' +
                b +
                '" target="_blank" id="hyoka_onegai">\u3053\u306e\u62e1\u5f35\u6a5f\u80fd\u304c\u4fbf\u5229\u3060\u3068\u601d\u308f\u308c\u307e\u3057\u305f\u3089\u3001\u3053\u3061\u3089\u304b\u3089\u3054\u8a55\u4fa1\u3092\u3044\u305f\u3060\u3051\u307e\u3059\u304b\uff1f<br>If you find this extension useful, could you please leave a review here?</a><br><a href="#" id="hyoka_onegai_close">[\u9589\u3058\u308b][Close]</a><br><br>'
            );
            $("#hyoka_onegai,#hyoka_onegai_close").click(async function () {
              await g.setItem("rev_req", 1);
              $("#hyoka_mes").html("");
            });
          }
          if (0 >= a.l.d || !a.l.result)
            $("#hozonzi_free_container").show(),
              $("#manga_free_container").show(),
              (a = JSON.parse(await g.getItem("data"))),
              $("#def_dl_wait_free").html(a.def_dl_wait),
              $("#def_dl_wait_free").click(function () {
                var c = prompt(
                  "\u8a2d\u5b9a\u3059\u308b\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u306e\u5f85\u3061\u6642\u9593\u3092\u30df\u30ea\u79d2\u3067\u5165\u529b\u3057\u3066\u4e0b\u3055\u3044\u3002\nPlease enter the download waiting time in milliseconds."
                );
                c &&
                  ($.isNumeric(c)
                    ? ($("#def_dl_wait").val(c), $("#def_dl_wait_free").html(c))
                    : alert(
                        "\u6f2b\u753b\u306e\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u306eDL\u9593\u9694\u306b\u306f\u6570\u5024\u4ee5\u5916\u5165\u529b\u3067\u304d\u307e\u305b\u3093\u3002\n\nYou cannot enter non-numeric values for the manga download interval."
                      ));
                return !1;
              });
        }
      });
    }, 100);
    $("#options_read").click(function () {
      var a = window.prompt(chrome.i18n.getMessage("options_read_prom"), "");
      null !== a &&
        confirm(chrome.i18n.getMessage("options_read_conf")) &&
        chrome.runtime.sendMessage(
          { mode: "setting_read", option: a },
          function (b) {
            b.result
              ? (alert(chrome.i18n.getMessage("options_read_mes")),
                (n = 1),
                location.reload())
              : alert(chrome.i18n.getMessage("options_read_error"));
          }
        );
    });
    $("#options_read_new").click(function () {
      $("body").append(
        '<div id="b_window_close" style="display:none;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:10000;background:rgba(255,255,255,0.5);"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);border: 2px solid #93cdff;border-radius: 10px;padding: 15px;background: #f1fffe;text-align: center;box-shadow: 2px 2px 10px rgba(0,0,0,0.5);">' +
          chrome.i18n.getMessage("options_dl_conf_file_select") +
          '<br><br><input type="file" id="backupfile"></div></div>'
      );
      $("#b_window_close").fadeIn(200);
      $("#b_window_close").on("click", function () {
        $("#b_window_close").fadeOut(200, function () {
          $(this).remove();
        });
      });
      $("#b_window_close > div").on("click", function (a) {
        a.stopPropagation();
      });
      $("#backupfile").on("change", function (a) {
        a = a.target.files[0];
        var b = new FileReader();
        b.onload = async function (c) {
          c = c.target.result;
          try {
            var d = JSON.parse(A(c));
            d.option
              ? (JSON.stringify(d.option),
                JSON.stringify(d.option).length + d.illustid.length ==
                d.optionLength
                  ? confirm(chrome.i18n.getMessage("options_read_conf"))
                    ? (await g.setItem("data", JSON.stringify(d.option)),
                      d.memozed &&
                        (await g.setItem("memozed", JSON.stringify(d.memozed)),
                        await g.setItem("memozedDef", d.memozedDef)),
                      d.illustid &&
                        "" != d.illustid &&
                        confirm(
                          chrome.i18n.getMessage("options_read_illust_ref_new")
                        ) &&
                        (await g.setItem("illustid", d.illustid)),
                      alert(chrome.i18n.getMessage("options_read_mes")),
                      (n = 1),
                      location.reload())
                    : $("#backupfile").val("")
                  : (alert(chrome.i18n.getMessage("options_read_error_new")),
                    $("#backupfile").val("")))
              : (alert(chrome.i18n.getMessage("options_read_error_new")),
                $("#backupfile").val(""));
          } catch (e) {
            alert(chrome.i18n.getMessage("options_read_error_new")),
              $("#backupfile").val("");
          }
        };
        b.readAsText(a);
      });
    });
    $("#options_copy").click(async function () {
      if (confirm(chrome.i18n.getMessage("options_dl_conf_new"))) {
        var a = confirm(chrome.i18n.getMessage("options_dl_illust_bak_new"))
            ? await g.getItem("illustid")
            : "",
          b = (await g.getItem("data")).length + a.length;
        a =
          '{"option":' +
          (await g.getItem("data")) +
          ',"illustid":"' +
          c(a) +
          '","memozed":' +
          (await g.getItem("memozed")) +
          ',"memozedDef":"' +
          c(await g.getItem("memozedDef")) +
          '","optionLength":' +
          b +
          "}";
        b = J(a);
        a == A(b)
          ? ((a = new Blob([b], { type: "application/octet-stream" })),
            (a = URL.createObjectURL(a)),
            (b = document.createElement("a")),
            (b.href = a),
            (b.download = chrome.i18n.getMessage("options_dl_conf_filename")),
            b.click())
          : alert(chrome.i18n.getMessage("options_copy_error"));
        function c(d) {
          return d
            .replace(/\\/g, "\\\\")
            .replace(/"/g, '\\"')
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\t/g, "\\t");
        }
      }
    });
    var n = 0,
      C = p({});
    window.addEventListener("beforeunload", function (a) {
      var b = p({});
      if (JSON.stringify(C) != JSON.stringify(b) && !n)
        return ((a || window.event).returnValue =
          "\u884c\u3063\u305f\u5909\u66f4\u304c\u4fdd\u5b58\u3055\u308c\u306a\u3044\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u3002If you leave before saving, your changes will be lost.");
    });
    $(".hint-pop").click(function () {
      alert($(this).data("hint").replace(/\\n/g, "\n"));
      return !1;
    });
  }
  const g = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async (h) => (await chrome.storage.local.get(h))[h],
    setItem: (h, k) => chrome.storage.local.set({ [h]: k }),
    removeItems: (h) => chrome.storage.local.remove(h),
  };
  try {
    const h = await g.getItem("data"),
      k = h ? JSON.parse(h) : null;
    if ("default" !== k.select_language)
      try {
        await initializeLocalization(k);
      } catch (t) {
        console.error(
          "An error occurred during localization initialization:",
          t
        );
      }
    await v();
  } catch (h) {
    console.error('Error processing "option":', h), await v();
  }
});
