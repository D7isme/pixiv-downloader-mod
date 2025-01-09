document.addEventListener("DOMContentLoaded", async function () {
  async function e() {
    var a = "";
    for (key in b)
      a +=
        '<div class="st-list"><div class="list-con left-button" data-key="' +
        key +
        '"><div class="st-txt st-txt-con">' +
        key +
        '</div><div class="yajirushi">\u2192</div><div class="st-txt st-txt-con">' +
        b[key] +
        '</div></div> <div class="list-con right-button" data-key="' +
        key +
        '"><div class="st-txt">Delete</div></div></div>';
    $("#list-view").html(a);
    $(".right-button")
      .off()
      .click(async function () {
        var c = $(".right-button").index(this),
          f = $(this).data("key");
        delete b[f];
        await d.setItem("memozed", JSON.stringify(b));
        $(".st-list:eq(" + c + ")").slideUp(100, function () {
          e();
        });
      });
    $(".left-button")
      .off()
      .click(function () {
        var c = $(this).data("key");
        $("#pid").val(c);
        $("#ptxt").val(b[c]);
      });
    "" == a &&
      $("#list-view").html(
        '<div style="text-align: center;padding: 10px;border: 1px #ccc solid;border-radius: 5px;color: #555;margin-right: 10px;background: #f7f7f7;">\u767b\u9332\u3055\u308c\u3066\u3044\u307e\u305b\u3093</div>'
      );
  }
  const d = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async (a) => (await chrome.storage.local.get(a))[a],
    setItem: (a, c) => chrome.storage.local.set({ [a]: c }),
    removeItems: (a) => chrome.storage.local.remove(a),
  };
  var b = JSON.parse(await d.getItem("memozed"));
  $("#subm").click(async function () {
    if ("" != $("#pid").val() && "" != $("#ptxt").val()) {
      var a = $("#pid")
        .val()
        .replace(/^\s+|\s+$/g, "");
      a.match(/^\d+$/)
        ? ((b[a] = $("#ptxt").val()),
          await d.setItem("memozed", JSON.stringify(b)),
          e(),
          $(".st-list:last").hide().slideDown(100),
          $("#pid,#ptxt").val(""))
        : (alert(
            "PixivID\u306f\u6570\u5b57\u3092\u5165\u529b\u3092\u3057\u3066\u4e0b\u3055\u3044\nPlease enter a numeric PixivID"
          ),
          alert(
            "\u767b\u9332\u3057\u305f\u3044\u30e6\u30fc\u30b6\u30fc\u306e\u30c8\u30c3\u30d7\u30da\u30fc\u30b8\u306eURL\u6b04\u306ehttps://www.pixiv.net/users/***\u306e***\u306e\u90e8\u5206\u306e\u6570\u5b57\u304cPixivID\u3067\u3059\nThe number in the *** part of the URL https://www.pixiv.net/users/*** on the user's homepage you want to register is the PixivID"
          ));
    } else alert("PixivID\u307e\u305f\u306f\u6587\u5b57\u5217\u3092\u5165\u529b\u3057\u3066\u4e0b\u3055\u3044\nPlease enter either a PixivID or a string");
  });
  e();
  $("#deftxt").val(await d.getItem("memozedDef"));
  $("#save").click(async function () {
    await d.setItem("memozedDef", $("#deftxt").val());
    alert("\u4fdd\u5b58\u3057\u307e\u3057\u305f\nSaved successfully");
  });
});
