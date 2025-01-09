document.addEventListener("DOMContentLoaded", function () {
  if (location.href.match(/https?:\/\/imp\.pixiv\.net/i)) {
    return false;
  }
  sh_new();
});
function sh_new() {
  function va() {
    T = location.href.match(/\/artworks\/([0-9]{1,})/i);
    if (null == T) {
      T = location.href.match(/show.php.*?\?id=([0-9]{1,})/i);
      if (null != T) {
        N = true;
      }
    }
    if (location.href.match(/\/unlisted\//)) {
      oa = true;
      T = ["unlisted", "1234567890"];
    }
  }
  function Ka() {
    va();
    if (null != T) {
      runFlag = true;
      html = $("html").html();
    } else {
      runFlag = false;
    }
  }
  function La() {
    var b = false;
    var q = 0;
    wa = oa ? "section figcaption:first" : "section section:first";
    var g = setInterval(function () {
      if (0 < $(wa).length || b) {
        clearInterval(g);
        if (b) {
          $("body").prepend("<div style=\"text-align: center;background: #eee;font-size:12px;border-bottom: 1px solid #ccc;color:#333;\"><div id=\"pxvdwn_dl_button_kyosei\"></div>Pixivの仕様が変更されたため、DLボタン表示できませんでした。Pixiv downloaderが対応するまで一時的に上部に表示します。<br>The DL button could not be displayed because the specifications of Pixiv were changed. Displayed temporarily at the top until Pixiv downloader completes the update.</div>");
          wa = "#pxvdwn_dl_button_kyosei";
        }
        Ma(wa, location.href, 1, false);
        $(".pxvdwn_menu").css({
          "margin-left": 20,
          "margin-top": 5,
          "margin-right": -3
        });
        if (option.comment_open) {
          location.href.match(/[?&]?c_open=1/);
        }
        Na();
        if ("true" == update) {
          $(window).load(function () {
            $("body").append("<span id=\"update_popup\"><img title=\"新しい機能が追加されました\" src=\"" + chrome.runtime.getURL("update_icon.png") + "\"></span>");
            $("#update_popup").css({
              left: $(".pxvdwn_l:first").offset().left + 70,
              top: $(".pxvdwn_l:first").offset().top - 20
            });
            $("#update_popup").hide().fadeIn(500);
            chrome.runtime.sendMessage({
              mode: "up"
            });
            setTimeout(function () {
              $("#update_popup").fadeOut(500);
            }, 1e4);
          });
        } else if (0 < ni && lspop) {
          $(window).load(function () {
            chrome.runtime.sendMessage({
              mode: "lspop"
            });
          });
        }
        if (-1 != location.href.indexOf("p_expand")) {
          $("main:first").find("section:first").find("button").each(function () {
            if ("64px 0px 8px" == $(this).css("padding")) {
              $(this).click();
              return false;
            }
          });
        }
      } else if (1e4 < q++) {
        clearInterval(g);
      } else if (86400 > (new Date().getTime() - dlButtonSettingError) / 1e3) {
        b = true;
      } else if (500 == q) {
        $.ajax({
          url: "https://orca-soft.net/chrome/pd/message/download_button_setting_error.txt",
          cache: false,
          timeout: 5e3,
          success: function (a) {
            if ("true" === a) {
              b = true;
              chrome.runtime.sendMessage({
                mode: "download_button_setting_error_time_refresh"
              });
            }
          },
          error: function (a, y, f) {}
        });
      }
    }, 10);
  }
  function Ma(b, q, g, a) {
    function y(L) {
      $("a.pxvdwn_c_u[data-num=" + f + "]").bind("click", function (R) {
        R.preventDefault();
        $(".pxvdwn_c_u_context-menu").remove();
        var p = "";
        if (3 === L) {
          p = "<ul class=\"pxvdwn_c_u_context-menu\"><li data-id=\"0\">" + chrome.i18n.getMessage("dl_ugoira_0") + "</li><li data-id=\"1\">" + chrome.i18n.getMessage("dl_ugoira_1") + "</li><li data-id=\"2\">" + chrome.i18n.getMessage("dl_ugoira_2") + "</li><li data-id=\"3\">" + chrome.i18n.getMessage("dl_ugoira_3") + "</li><li data-id=\"4\">" + chrome.i18n.getMessage("dl_ugoira_4") + "</li><li data-id=\"5\">" + chrome.i18n.getMessage("dl_ugoira_5") + "</li><li data-id=\"6\">" + chrome.i18n.getMessage("dl_ugoira_6") + "</li><li data-id=\"7\">" + chrome.i18n.getMessage("dl_ugoira_7") + "</li><li data-id=\"8\">" + chrome.i18n.getMessage("dl_ugoira_8") + "</li><li data-id=\"9\">" + chrome.i18n.getMessage("dl_ugoira_9") + "</li></ul>";
        } else if (4 === L) {
          p = "<ul class=\"pxvdwn_c_u_context-menu\"><li data-id=\"1\">" + chrome.i18n.getMessage("novel_ext_1") + "</li><li data-id=\"2\">" + chrome.i18n.getMessage("novel_ext_2") + "</li></ul>";
        }
        $("body").append(p);
        const x = $(".pxvdwn_c_u_context-menu");
        p = R.clientX;
        let Q = R.clientY;
        const K = document.documentElement.clientWidth;
        const u = document.documentElement.clientHeight;
        const w = x.outerWidth();
        const c = x.outerHeight();
        if (p + w > K) {
          p = K - w - 10;
        }
        if (Q + c > u) {
          Q = u - c - 10;
        }
        x.css({
          top: Q + "px",
          left: p + "px"
        }).fadeIn(200);
        x.on("click", "li", function (d) {
          d.stopPropagation();
          d = $(this).data("id");
          if (3 === L) {
            xa = true;
            Oa = d;
            $(R.currentTarget).parent().parent().find("a.pxvdwn_l[data-num=" + f + "]").click();
            (function () {
              var m = setInterval(function () {
                if (!fa) {
                  clearInterval(m);
                  xa = false;
                }
              }, 100);
            })();
          } else if (4 === L) {
            ya = true;
            Pa = d;
            $(R.currentTarget).parent().parent().find("a.pxvdwn_l[data-num=" + f + "]").click();
            (function () {
              var m = setInterval(function () {
                if (!fa) {
                  clearInterval(m);
                  ya = false;
                }
              }, 100);
            })();
          }
          x.fadeOut(200, function () {
            x.remove();
          });
        });
        x.on("click", function (d) {
          d.stopPropagation();
        });
        setTimeout(function () {
          $(document).on("click.pxvdwn_c_u_contextMenu", function () {
            x.fadeOut(200, function () {
              x.remove();
            });
            $(document).off("click.pxvdwn_c_u_contextMenu");
          });
        }, 0);
      });
      $("a.pxvdwn_c_m[data-num=" + f + "]").bind("click", function (R) {
        R.preventDefault();
        if (0 < $("#pxvdwn_illust_selector").length) {
          return false;
        }
        $("body").append("<div id=\"pxvdwn_illust_selector\" style=\"display:none;\"><div id=\"pxvdwn_illust_selector_loader\" class=\"pxvdwn_loader_anim\" style=\"width:30px;height:30px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);\"></div></div>");
        $("#pxvdwn_illust_selector").fadeIn(200);
        $.ajax({
          url: q,
          cache: false,
          success: function (p) {
            function x(e, B) {
              e.removeClass("pxvdwn_illust_selector_selected");
              c = c.filter(C => C !== B);
              e.find(".pxvdwn_illust_selector_selected_now").remove();
            }
            function Q(e, B) {
              e.addClass("pxvdwn_illust_selector_selected");
              if (!c.includes(B)) {
                c.push(B);
              }
              if (0 === e.find(".pxvdwn_illust_selector_selected_now").length) {
                e.append("<div class=\"pxvdwn_illust_selector_selected_now\"></div>");
              }
            }
            function K(e) {
              var B = setInterval(function () {
                if (!fa) {
                  clearInterval(B);
                  pa = false;
                }
              }, 100);
            }
            la("dummy", p, q, false, T, function (e) {
              $("body").css("overflow", "hidden");
              if ("ja" === chrome.i18n.getUILanguage().split("-")[0]) {
                $("#pxvdwn_illust_selector").html("<div class=\"pxvdwn_illust_selector_controls_container\"><div id=\"pxvdwn_illust_selector_title\">選択したイラストをダウンロード <label style=\"font-size:14px;margin-left:10px;\" id=\"pxvdwn_manga_renban_label\"><input type=\"checkbox\" id=\"pxvdwn_manga_renban\">ファイル名をページ番号にする(0.jpg 1.jpg...)</label><div id=\"pxvdwn_illust_selector_setting_button\"></div></div><button id=\"pxvdwn_illust_selector_select_all_button\">すべて選択</button><button id=\"pxvdwn_illust_selector_deselect_all_button\">すべて解除</button><button id=\"pxvdwn_illust_selector_invert_button\">選択項目を反転</button><div class=\"pxvdwn_illust_selector_separator\"></div><button id=\"pxvdwn_illust_selector_dl\">ダウンロード</button><button id=\"pxvdwn_illust_selector_dl_zip\">ZIPでダウンロード</button><div class=\"pxvdwn_illust_selector_separator\"></div><button id=\"pxvdwn_illust_selector_zoomout\">サムネイル縮小</button><button id=\"pxvdwn_illust_selector_zoomin\">サムネイル拡大</button><div class=\"pxvdwn_illust_selector_separator\"></div><button id=\"pxvdwn_illust_selector_dl_close\">閉じる</button></div><div id=\"pxvdwn_illust_selector_images_list\"></div>");
              } else {
                $("#pxvdwn_illust_selector").html("<div class=\"pxvdwn_illust_selector_controls_container\"><div id=\"pxvdwn_illust_selector_title\">Download Selected Illustrations <label style=\"font-size:14px;margin-left:10px;\" id=\"pxvdwn_manga_renban_label\"><input type=\"checkbox\" id=\"pxvdwn_manga_renban\"> Use Page Numbers for File Names (0.jpg, 1.jpg...)</label><div id=\"pxvdwn_illust_selector_setting_button\"></div></div><button id=\"pxvdwn_illust_selector_select_all_button\">Select All</button><button id=\"pxvdwn_illust_selector_deselect_all_button\">Deselect All</button><button id=\"pxvdwn_illust_selector_invert_button\">Invert Selection</button><div class=\"pxvdwn_illust_selector_separator\"></div><button id=\"pxvdwn_illust_selector_dl\">Download</button><button id=\"pxvdwn_illust_selector_dl_zip\">Download as ZIP</button><div class=\"pxvdwn_illust_selector_separator\"></div><button id=\"pxvdwn_illust_selector_zoomout\">Thumbnail Zoom Out</button><button id=\"pxvdwn_illust_selector_zoomin\">Thumbnail Zoom In</button><div class=\"pxvdwn_illust_selector_separator\"></div><button id=\"pxvdwn_illust_selector_dl_close\">Close</button></div><div id=\"pxvdwn_illust_selector_images_list\"></div>");
              }
              $("#pxvdwn_illust_selector_setting_button").click(function () {
                Ba(chrome.runtime.getURL("options.html"), "option_window", 860, 840, true);
                return false;
              });
              if (2 == ni) {
                $("#pxvdwn_manga_renban_label").remove();
              } else if (1 == ni) {
                $("#pxvdwn_manga_renban_label").remove();
              }
              var B = e.length;
              for (var C = 0; C < B; C++) {
                var H = e[C].s + "/c/1200x1200/img-master/img/" + e[C].f + "_" + e[C].m + "_master1200.jpg";
                $("#pxvdwn_illust_selector_images_list").append("<div data-index=\"" + C + "\" class=\"pxvdwn_illust_selector_selectable\" style=\"background-image:url(" + H + ");width:120px;height:120px;margin:5px;\"></div>");
              }
            });
            const u = $("#pxvdwn_illust_selector");
            const w = u.find("div.pxvdwn_illust_selector_selectable");
            let c = [];
            let d = false;
            let m = false;
            let r;
            let A;
            let J = $("<div id=\"pxvdwn_illust_selector_selection-box\"></div>");
            $(window).on("keydown keyup", function (e) {});
            w.on("mousedown", function (e) {
              d = true;
              m = false;
              r = e.pageX - u.offset().left;
              A = e.pageY - u.offset().top;
              e.preventDefault();
            });
            w.on("click", function (e) {
              if (!m) {
                e = $(this);
                var B = e.data("index");
                if (e.hasClass("pxvdwn_illust_selector_selected")) {
                  x(e, B);
                } else {
                  Q(e, B);
                }
              }
            });
            u.on("mousedown", function (e) {
              if (!(0 < $(e.target).closest(".pxvdwn_illust_selector_selectable").length)) {
                d = true;
                m = false;
                r = e.pageX - u.offset().left;
                A = e.pageY - u.offset().top;
                e.preventDefault();
              }
            });
            $(document).on("mousemove", function (e) {
              if (d) {
                const B = e.pageX - u.offset().left;
                e = e.pageY - u.offset().top;
                const C = B - r;
                const H = e - A;
                const S = Math.sqrt(C * C + H * H);
                if (!m && 10 <= S) {
                  m = true;
                  J.css({
                    left: r,
                    top: A,
                    width: 0,
                    height: 0
                  });
                  u.append(J);
                }
                if (m) {
                  const z = Math.min(r, B);
                  const h = Math.min(A, e);
                  const v = Math.abs(C);
                  const I = Math.abs(H);
                  J.css({
                    left: z,
                    top: h,
                    width: v,
                    height: I
                  });
                  w.each(function () {
                    const k = $(this);
                    var n = k.position();
                    const D = n.left;
                    n = n.top;
                    const G = k.outerWidth();
                    const E = k.outerHeight();
                    if (!(D > z + v || D + G < z || n > h + I || n + E < h || k.hasClass("pxvdwn_illust_selector_selected"))) {
                      Q(k, k.data("index"));
                    }
                  });
                }
              }
            });
            $(document).on("mouseup", function () {
              if (d) {
                d = false;
                J.detach();
              }
            });
            $("#pxvdwn_illust_selector_select_all_button").on("click", function () {
              w.each(function () {
                const e = $(this);
                const B = e.data("index");
                if (!e.hasClass("pxvdwn_illust_selector_selected")) {
                  Q(e, B);
                }
              });
            });
            $("#pxvdwn_illust_selector_deselect_all_button").on("click", function () {
              w.each(function () {
                const e = $(this);
                const B = e.data("index");
                if (e.hasClass("pxvdwn_illust_selector_selected")) {
                  x(e, B);
                }
              });
            });
            $("#pxvdwn_illust_selector_invert_button").on("click", function () {
              w.each(function () {
                const e = $(this);
                const B = e.data("index");
                if (e.hasClass("pxvdwn_illust_selector_selected")) {
                  x(e, B);
                } else {
                  Q(e, B);
                }
              });
            });
            $("#pxvdwn_illust_selector_dl").on("click", function () {
              if (fa) {
                alert(chrome.i18n.getMessage("select_dl_already"));
              } else if (0 === c.length) {
                alert(chrome.i18n.getMessage("download_all_noitem"));
              } else {
                ra = pa = true;
                Ca = c;
                Da = "0";
                $(R.currentTarget).parent().parent().find("a.pxvdwn_l[data-num=" + f + "]").click();
                K();
              }
            });
            $("#pxvdwn_illust_selector_dl_zip").on("click", function () {
              if (fa) {
                alert(chrome.i18n.getMessage("select_dl_already"));
              } else if (0 === c.length) {
                alert(chrome.i18n.getMessage("download_all_noitem"))
                /*: 2 == ni
                ? (alert(chrome.i18n.getMessage("no_licence")),
                  window.open(chrome.runtime.getURL("license.html")))
                : 1 == ni
                ? (alert(chrome.i18n.getMessage("no_licence")),
                  window.open(chrome.runtime.getURL("license.html")))
                */;
              } else {
                ra = pa = true;
                Ca = c;
                Da = "1";
                $(R.currentTarget).parent().parent().find("a.pxvdwn_l[data-num=" + f + "]").click();
                K();
              }
            });
            $("#pxvdwn_illust_selector_dl_close").on("click", function () {
              if (fa) {
                alert(chrome.i18n.getMessage("cannot_close_during_download"));
              } else {
                $("#pxvdwn_illust_selector").remove();
                pa = false;
                $("body").css("overflow", "");
              }
            });
            $("#pxvdwn_illust_selector_zoomin").on("click", function () {
              $(".pxvdwn_illust_selector_selectable").each(function () {
                const e = $(this);
                const B = e.width();
                const C = e.height();
                e.css({
                  width: B + 50 + "px",
                  height: C + 50 + "px"
                });
              });
            });
            $("#pxvdwn_illust_selector_zoomout").on("click", function () {
              $(".pxvdwn_illust_selector_selectable").each(function () {
                const e = $(this);
                const B = e.width();
                const C = e.height();
                e.css({
                  width: Math.max(B - 50, 10) + "px",
                  height: Math.max(C - 50, 10) + "px"
                });
              });
            });
          },
          error: function (p, x, Q) {
            alert(chrome.i18n.getMessage("page_load_error"));
            $("#pxvdwn_illust_selector").remove();
          }
        });
        return false;
      });
    }
    var f = function (L) {
      var R = 1e3;
      if (L) {
        R = L;
      }
      return new Date().getTime().toString(16) + Math.floor(R * Math.random()).toString(16);
    }();
    var t = "<li><a class=\"pxvdwn_c pxvdwn_c_m\" data-num=\"" + f + "\" href=\"javascript:void(0);\" title=\"" + chrome.i18n.getMessage("select_button_manga_title") + "\" target=\"_blank\"><div class=\"pxvdwn_thumbnail_select_download_icon\"></div></a></li>";
    var M = "<li><a class=\"pxvdwn_c pxvdwn_c_u\" data-num=\"" + f + "\" href=\"javascript:void(0);\" title=\"" + chrome.i18n.getMessage("select_button_ugoira_title") + "\" target=\"_blank\"><div class=\"pxvdwn_menu_select_download_icon\"></div></a></li>";
    var O = "<li><a class=\"pxvdwn_c pxvdwn_c_u\" data-num=\"" + f + "\" href=\"javascript:void(0);\" title=\"" + chrome.i18n.getMessage("select_button_ugoira_title") + "\" target=\"_blank\"><div class=\"pxvdwn_menu_select_download_icon\"></div></a></li>";
    if (a) {
      P = "";
      if (2 === a) {
        P = t;
      } else if (3 === a) {
        P = M;
      } else if (4 === a) {
        P = O;
      }
    } else {
      var P = "";
      fetch(q).then(L => {
        if (!L.ok) {
          throw Error(`HTTP error! status: ${L.status}`);
        }
        return L.text();
      }).then(L => {
        va();
        if (N) {
          a = 4;
          P = O;
        } else {
          L = Ea(L, 0);
          var R = x(L.preload.illust);
          x(L.preload.user);
          var p = L.preload.illust[R].illustType;
          if (0 == p || 1 == p) {
            if (1 < L.preload.illust[R].pageCount) {
              a = 2;
              P = t;
            } else {
              a = 1;
            }
          } else {
            a = 3;
            P = M;
          }
          function x(Q) {
            for (var K in Q) return K;
            return null;
          }
        }
        if (1 !== a) {
          $(".pxvdwn_menu[data-num='" + f + "']").find("li:eq(0)").after(P);
          y(a);
        }
      }).catch(L => {});
    }
    $(b).prepend("<ul class=\"pxvdwn_menu\" data-num=\"" + f + "\"><li><a class=\"pxvdwn_r\" data-num=\"" + f + "\" href=\"javascript:void(0);\" title=\"" + chrome.i18n.getMessage("setting_button_title") + "\" target=\"_blank\"><div class=\"pxvdwn_setting_icon\"></div></a></li>" + P + "<li><a class=\"pxvdwn_l\" data-num=\"" + f + "\" href=\"javascript:void(0);\" title=\"" + chrome.i18n.getMessage("download_button_title") + "\"><div class=\"pxvdwn_download_icon\"></div></a></li></ul>");
    if ("" !== P) {
      y(a);
    }
    $("a.pxvdwn_r[data-num=" + f + "]").bind("click", function () {
      Ba(chrome.runtime.getURL("options.html"), "option_window", 860, 840, true);
      return false;
    });
    if (ex_md && "" != ex_md && "FULL" !== l.accessLevel) {
      if (window.localStorage) {
        if (b = window.localStorage.getItem("li_time")) {
          if (86400 < new Date().getTime() / 1e3 - b) {
            L();
            window.localStorage.setItem("li_time", new Date().getTime() / 1e3);
          }
        } else {
          L();
          window.localStorage.setItem("li_time", new Date().getTime() / 1e3);
        }
      } else {
        L();
      }
      function L() {
        $("body").append("<span id=\"update_popup\" style=\"cursor: pointer; background: rgb(217 246 255); display: inline; color: #333; padding: 5px; height: 32px; line-height: 16px; border-radius: 10px;font-weight: bold;padding-left: 13px;padding-right: 13px;filter: drop-shadow(-1px 1px 5px rgba(0,0,0,0.7));z-index: 1000000003;font-size:12px;\"><div style=\"position: absolute;top: 50%;left: -20px;margin-top: -8px;border: 8px solid transparent;border-right: 15px solid rgb(217 246 255);\"></div>ライセンスの有効期限が切れました<br>License has expired.</span>");
        var R = setInterval(function () {
          if (0 < $(".pxvdwn_l").length) {
            $("#update_popup").css({
              left: $(".pxvdwn_l").offset().left + 157,
              top: $(".pxvdwn_l").offset().top - 10
            });
          } else {
            $("#update_popup").remove();
            clearInterval(R);
            clearTimeout(p);
          }
        }, 50);
        $("#update_popup").hide().fadeIn(300);
        $("#update_popup").click(function () {
          window.open(chrome.runtime.getURL("license.html"));
        });
        var p = setTimeout(function () {
          $("#update_popup").fadeOut(300, function () {
            $(this).remove();
          });
          clearInterval(R);
          clearTimeout(p);
        }, 1e4);
      }
    }
    if (1 == g) {
      $("a.pxvdwn_l[data-num=" + f + "]").bind("click", function () {
        var L = location.href;
        Qa(f);
        va();
        ma(L);
      });
    } else {
      $("a.pxvdwn_l[data-num=" + f + "]").bind("click", function () {
        Qa(f);
        ma(q);
      });
    }
    if (option.iine_dl) {
      var V = $("section section").find("button > svg[viewBox='0 0 12 12']").parent().parent();
      V.click(function () {
        if ("disabled" != V.find("button").attr("disabled")) {
          $("a.pxvdwn_l[data-num=" + f + "]").click();
        }
      });
      $("html").keydown(function (L) {
        if (76 == L.keyCode && "disabled" != V.find("button").attr("disabled")) {
          $("a.pxvdwn_l[data-num=" + f + "]").click();
        }
      });
    }
  }
  function Qa(b) {
    $("a.pxvdwn_l[data-num=" + b + "]").css({
      "pointer-events": "none",
      opacity: 0.5
    });
  }
  function ma(b) {
    if ((xa || ya) && fa) {
      alert(chrome.i18n.getMessage("download_in_progress"));
    } else {
      fa = true;
      var q = T;
      try {
        chrome.runtime.sendMessage({
          mode: "permissions_check"
        }, function (g) {
          if (1 == g.result) {
            chrome.runtime.sendMessage({
              mode: "op"
            }, function (a) {
              try {
                option = JSON.parse(a.option);
                version = a.version;
                update = a.update;
                gdata = "," + a.gdata;
                l = a.l;
                lspop = a.lspop;
                ni = a.n;
                syncTime = a.syncTime;
                memozed = JSON.parse(a.memozed);
                memozedDef = a.memozedDef;
                ex_md = a.md;
                after_flag = a.after;
                sa = 0;
                Va();
                $.ajax({
                  url: b,
                  cache: false,
                  success: function (y) {
                    Wa(y, b, q);
                  },
                  error: function (y, f, t) {
                    if (ia) {
                      if (option.alldl_errskip) {
                        U.push("[" + f + "] " + b);
                      } else {
                        U.push("[" + f + "] " + b);
                        retryMsg = chrome.i18n.getMessage("alldl_append_msg");
                        if ("error" === f) {
                          alert(chrome.i18n.getMessage("dl_sippai") + retryMsg);
                        } else if ("timeout" === f) {
                          alert(chrome.i18n.getMessage("dl_timeout") + retryMsg);
                        } else {
                          alert(chrome.i18n.getMessage("dl_sippai") + retryMsg);
                        }
                      }
                    } else if ("error" === f) {
                      alert(chrome.i18n.getMessage("dl_sippai"));
                    } else if ("timeout" === f) {
                      alert(chrome.i18n.getMessage("dl_timeout"));
                    } else {
                      alert(chrome.i18n.getMessage("dl_sippai"));
                    }
                    ea();
                    W(false, q);
                  }
                });
              } catch (y) {
                alert(chrome.i18n.getMessage("unknown_error"));
              }
            });
          } else {
            ea();
          }
        });
      } catch (g) {
        alert(chrome.i18n.getMessage("pivex_error"));
      }
    }
  }
  function Va() {
    Ra = setTimeout(function () {
      Y(chrome.i18n.getMessage("outou_machi"), true);
    }, 2e3);
  }
  function ea() {
    clearTimeout(Ra);
    Y();
    $("a.pxvdwn_l").attr("style", "");
  }
  function W(b, q) {
    fa = false;
    if (b) {
      Xa(q);
    }
  }
  function Xa(b) {
    if (-1 == gdata.indexOf("," + b[1] + ",") && option.dl_history && !oa) {
      try {
        chrome.runtime.sendMessage({
          mode: "id",
          data: b[1] + ","
        });
      } catch (q) {
        za();
        return;
      }
      gdata += b[1] + ",";
      Na();
    }
    if (option.syncPC && option.dl_history && !oa && l.result) {
      try {
        $.ajax({
          url: "https://orca-soft.net/chrome/pd/sync.php",
          cache: false,
          timeout: 3e4,
          data: "m=1&u=" + option.syncId + "&i=" + b[1],
          type: "GET",
          success: function (q) {
            if ("error" === q) {
              alert(chrome.i18n.getMessage("sync_id_error"));
            }
          },
          error: function (q, g, a) {}
        });
      } catch (q) {
        aa(mouseX, mouseY, chrome.i18n.getMessage("sync_error"), 1);
      }
    }
  }
  function Wa(b, q, g) {
    normal_dl_wait = 0;
    if (pa) {
      option.manga_select = Da;
      if ($("#pxvdwn_manga_renban").length) {
        option.manga_renban = $("#pxvdwn_manga_renban").prop("checked");
      }
    }
    if (xa) {
      option.dl_ugoira = Oa;
    }
    if (ya) {
      option.novel_ext = String(Pa);
    }
    la(option.filename, b, q, false, g, function (a) {
      if ("undefined" == typeof a) {
        ea();
        W(false, g);
      } else {
        la(option.dirname, b, q, true, g, function (y) {
          if ("undefined" == typeof y) {
            ea();
            W(false, g);
          } else if (!option.dl_alert || -1 == gdata.indexOf("," + g[1] + ",") || ta || confirm(chrome.i18n.getMessage("hozon_zumi_alert"))) {
            if ("" == a[0].n || "manga" == a[0].type && "" == a[0].filename_tmp_del_page && "1" === option.manga_select) {
              alert(chrome.i18n.getMessage("file_empty_error"));
              ea();
              W(false, g);
            } else if (option.server_dl) {
              if (option.debug) {
                console.log("ServerDL");
              }
              if ("ugoira" === a[0].type) {
                alert("サーバーダウンロードの場合、うごくイラストはダウンロードできません。\r\n設定のサーバー経由でダウンロードするをオフにしてください");
              } else {
                var f = "";
                if (N) {
                  f += "<form method=\"post\" action=\"https://orca-soft.net/chrome/pd/pd_novel.php" + a[0].result + "&version=" + encodeURIComponent(version) + "\" target=\"pxvdwn_novel\" name=\"pddwn\" id=\"pddwn\"><input type=\"hidden\" name=\"c\" value=\"" + a[0].text + "\"></form>";
                  f = f + "<iframe src=\"about:blank\" width=\"10\" height=\"10\" style=\"opacity:0;\" name=\"pxvdwn_novel\"></iframe><iframe src=\"https://orca-soft.net/chrome/pd/pd_novel.php" + (a[0].result + "&m=1&version=" + encodeURIComponent(version) + "\" width=\"10\" height=\"10\" style=\"opacity:0;\" name=\"pxvdwn_novel\"></iframe>");
                  $("#_pxvdwnfr").html(f);
                  $("#pddwn").submit();
                } else {
                  for (p = 0; p < a.length; p++) {
                    if (option.big_img) {
                      a[p].result += "&o=1";
                    }
                    f += "<iframe src=\"https://orca-soft.net/chrome/pd/pd.php" + a[p].result + "&version=" + encodeURIComponent(version) + "\" width=\"10\" height=\"10\" style=\"opacity:0;\"></iframe>";
                  }
                  $("#_pxvdwnfr").html(f);
                }
              }
            } else {
              if (option.debug) {
                console.log("ClientDL");
              }
              if (option.captionDL) {
                if (!(option.captionDLZIP && "manga" == a[0].type && "1" === option.manga_select)) {
                  la(option.captionTxt, b, q, true, g, function (c) {
                    c[0].n = Fa(c[0].n);
                    w(a[0].n + option.captionFileName + ".txt", c[0].n, y[0].n);
                  }, true);
                }
              }
              if (N) {
                ea();
                Z.takeTimeStart();
                var t = a[0].text;
                var M = false;
                p = a[0].illustData;
                var O = c(p.preload.novel);
                c(p.preload.user);
                f = [];
                function c(m) {
                  for (var r in m) return r;
                  return null;
                }
                p = p.preload.novel[O].textEmbeddedImages;
                for (var P in p) f[f.length] = {
                  key: P,
                  url: p[P].urls.original,
                  type: "uploadIllust"
                };
                if (0 == f.length) {
                  M = true;
                }
                if ("2" === option.novel_dl) {
                  M = true;
                }
                if ("2" === option.novel_ext && "0" === option.novel_dl) {
                  M = true;
                }
                if (M) {
                  d();
                } else {
                  O = "";
                  var V = f.length;
                  var L = 0;
                  for (p = 0; p < V; p++) {
                    console.log(p,V,M,f);
                    O = f[p].url;
                    if (!O.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
                      O = O.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
                    }
                    u(O, function (m, r) {
                      var A = "";
                      var J = new RegExp("\\[uploadedimage:" + r.key + "\\]");
                      try {
                        var e = r.url.match(/\.([^.]+?$)/)[1];
                        var B = e.replace(/jpg/i, "jpeg");
                      } catch (C) {
                        B = e = "";
                      }
                      if ("0" === option.novel_dl) {
                        m = Ga(m);
                        A = A + "<p><figure class=\"pixivimage_container\"><a class=\"pixivimage_image_container\"><img id=\"illust_list_" + (r.key + "\" src=\"data:image/" + (B + ";base64," + m) + "\">");
                        t = t.replace(J, A + "</a></figure></p>");
                      } else {
                        B = r.key + "." + e;
                        if ("2" !== option.novel_ext) {
                          A = A + "<p><figure class=\"pixivimage_container\"><a class=\"pixivimage_image_container\"><img id=\"illust_list_" + (r.key + "\" src=\"" + B + "\">");
                          t = t.replace(J, A + "</a></figure></p>");
                        }
                        w(B, m, y[0].n);
                      }
                      if (L++ >= V - 1) {
                        d();
                      }
                    }, function (m, r) {
                      K();
                      if (L++ >= V - 1) {
                        d();
                      }
                    }, {
                      i: p,
                      key: f[p].key,
                      url: f[p].url
                    }, false);
                  }
                }
                function d() {
                  function m() {
                    function C() {
                      var z = 1;
                      if (!H) {
                        var h = "";
                        if (S) {
                          h = "<div class=\"border\"></div>";
                        }
                        t = S + "<h1>" + a[0].title + "</h1>" + h + "<div class=\"newpage\"><a name=\"page" + z++ + "\"></a>" + t;
                      }
                      t = t.replace(/\[chapter:([^\]]+)\](<br>)?/g, function (k, n, D) {
                        return H ? "Chapter:" + n : "<h2 class=\"chapter\">" + n + "</h2>";
                      });
                      t = t.replace(/\[\[rb:([^\]]+)\s*(>|&gt;)\s*([^\]]+)\]\]/g, function (k, n, D, G) {
                        n = $.trim(n);
                        G = $.trim(G);
                        return n && G ? H ? n + "(" + G + ")" : "<ruby><rb>" + n + "</rb><rp>(<rt>" + G + "</rt><rp>)</ruby>" : k;
                      });
                      t = t.replace(/\[\[jumpuri:([^\]]+)(&gt;|>) *([^\]]+)\]\]/g, function (k, n, D, G) {
                        if (null === n || "" === n || null === G || "" === G) {
                          return k;
                        }
                        n = n.replace(/^ +| +$/g, "");
                        if (!(D = "" === n || "" === G)) {
                          D = !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(G);
                        }
                        return D ? k : /(http|https):\/\/(\w+\.pixiv\.net.*|p\.tl\/i\/\d+|p\.tl\/e\/\d+|p\.tl\/t\/\d+)/.test(G) ? H ? n + ":" + G : "<a href=\"" + G + "\">" + n + "</a> " : H ? n + ":" + G : "<a href=\"" + G + "\" target=\"_blank\">" + n + "</a> ";
                      });
                      if (!H) {
                        for (;;) {
                          try {
                            if (t.match(/\[newpage\]/)) {
                              t = t.replace(/\[newpage\]/, "\r\n</div><div class=\"border\"></div><div class=\"newpage\"><a name=\"page" + z + "\"></a><div class=\"page-no\">p." + z++ + "</div>\r\n");
                            } else {
                              break;
                            }
                          } catch (k) {
                            break;
                          }
                        }
                        if (21 < l.t && 1 < l.s) {
                          return;
                        }
                      }
                      if (!H) {
                        t = t.replace(/\[jump:([1-9][0-9]*)\]/g, k);
                        function k(n, D) {
                          n = parseInt(D, 10);
                          return n > z || 1 > n ? "<span class=\"preview_page\" style=\"color:#ff0000;font-weight:bold;\">[エラー : 小説内リンクに指定できないページです]</span>" : "<a href=\"#page" + n + "\">" + n + "ページへ</a> ";
                        }
                      }
                      if (!H) {
                        t += "</div>";
                      }
                      if (option.novel_captionDL) {
                        la(option.novel_captionTxt, b, q, true, g, function (k) {
                          t = k[0].n + t;
                          la(option.novel_captionTxtAfter, b, q, true, g, function (n) {
                            t += n[0].n;
                          }, true);
                        }, true);
                      }
                      if (H) {
                        t = Fa(t);
                      }
                      if (option.novel_tag) {
                        t = t.replace(/\[newpage\]|\[chapter:[^\]]+?\]|\[pixivimage:[0-9-]+?\]|\[uploadedimage:[0-9-]+?\]|\[jump:[^\]]+?\]|\[\[jumpuri:[^\]]+?]]|[[rb:[^\]]+?\]\]/g, "");
                      }
                      if (!H) {
                        h = t.split("\r\n");
                        t = "";
                        var v = h.length;
                        for (var I = 0; I < v; I++) {
                          t = h[I].match(/^\s*?$/) ? t + "<br />\r\n" : h[I].match(/^</) ? t + (h[I] + "\r\n") : t + ("<p>" + h[I] + "</p>\r\n");
                        }
                      }
                      if (H) {
                        w(a[0].n + ".txt", t, y[0].n);
                      } else {
                        if (undefined == l.result) {
                          return;
                        }
                        w(a[0].n + ".html", "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>" + a[0].title + "</title><style>.border{border-bottom:1px solid #000;margin-top:0px;margin-bottom:10px;}.page-no{border-radius:5px;background:#aaa;font-size:10px;padding:3px;color:#fff;display:inline-block;}</style></head><body>" + t + "</body></html>", y[0].n);
                      }
                      Z.takeTimeClear();
                      W(true, g);
                    }
                    var H = "0" === option.novel_ext ? !!(r && M) : !("1" === option.novel_ext);
                    var S = "";
                    if (!a[0].b.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
                      a[0].b = a[0].b.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
                    }
                    if (option.novel_def && a[0].b.match(/\/common\//)) {
                      C();
                    } else if (H && !option.novel_txtimg) {
                      C();
                    } else if ("2" === option.novel_top) {
                      C();
                    } else {
                      u(a[0].b + "." + a[0].t, function (z, h) {
                        if ("0" === option.novel_top) {
                          if (H) {
                            if (option.novel_txtimg) {
                              w(a[0].n + " 表紙." + a[0].t, z, y[0].n);
                            }
                          } else {
                            z = Ga(z);
                            z = "data:image/" + a[0].t.replace(/jpg/i, "jpeg") + ";base64," + z;
                            S = "<img src=\"" + z + "\" style=\"max-width:480px;max-height:960px;\" />";
                          }
                          C();
                        } else if ("1" === option.novel_top) {
                          if (H) {
                            w(a[0].n + " 表紙." + a[0].t, z, y[0].n);
                          } else {
                            h = "top" + g[1] + "." + a[0].t;
                            w(h, z, y[0].n);
                            S = "<img src=\"" + h + "\" style=\"max-width:480px;max-height:960px;\" />";
                          }
                          C();
                        }
                      }, function () {
                        K();
                        C();
                      }, e, false);
                    }
                  }
                  var r = false;
                  try {
                    var A = a[0].text.match(/\[pixivimage:([0-9-]+?)\]/g);
                    var J = A.length;
                    for (var e = 0; e < J; e++) {
                      A[e] = A[e].match(/\[pixivimage:([0-9-]+?)\]/)[1];
                    }
                  } catch (C) {
                    r = true;
                  }
                  if (!A) {
                    r = true;
                  }
                  if ("2" === option.novel_dl) {
                    r = true;
                  }
                  if ("2" === option.novel_ext && "0" === option.novel_dl) {
                    r = true;
                  }
                  if (r) {
                    m();
                  } else if (!(l.t > l.p && 1 < l.s)) {
                    J = A.length;
                    var B = "";
                    for (e = 0; e < J; e++) {
                      B = B + "&id%5B%5D=" + A[e];
                    }
                    $.ajax({
                      url: "https://www.pixiv.net/ajax/novel/" + g[1] + "/insert_illusts?" + B,
                      cache: false,
                      type: "GET",
                      dataType: "json",
                      timeout: 6e4,
                      success: function (C) {
                        var H = Object.keys(C.body).length;
                        var S = 0;
                        var z = 0;
                        var h;
                        for (h in C.body) {
                          try {
                            var v = C.body[h].illust.images.original;
                          } catch (I) {
                            v = null;
                          }
                          if (!v) {
                            aa(mouseX, mouseY, "一部の画像のダウンロードに失敗しました。再度お試しください", 1);
                            v = "null";
                          }
                          if (!v.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
                            v = v.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
                          }
                          u(v, function (I, k) {
                            var n = "";
                            var D = new RegExp("\\[pixivimage:" + k.key + "\\]");
                            try {
                              var G = k.body.illust.images.original.match(/\.([^.]+?$)/)[1];
                              var E = G.replace(/jpg/i, "jpeg");
                            } catch (F) {
                              E = G = "";
                            }
                            if ("0" === option.novel_dl) {
                              I = Ga(I);
                              n += "<p><figure class=\"pixivimage_container\"><a class=\"pixivimage_image_container\" href=\"https://www.pixiv.net/artworks/" + k.body.id + "\">";
                              n += "<img id=\"illust_list_" + k.key + "\" src=\"data:image/" + (E + ";base64," + I) + "\" alt=\"" + k.body.illust.title + "\" title=\"" + k.body.illust.title + "\">";
                              t = t.replace(D, n + "</a></figure></p>");
                            } else {
                              E = k.key + "." + G;
                              if ("2" !== option.novel_ext) {
                                n += "<p><figure class=\"pixivimage_container\"><a class=\"pixivimage_image_container\" href=\"https://www.pixiv.net/artworks/" + k.body.id + "\">";
                                n += "<img id=\"illust_list_" + k.key + "\" src=\"" + E + "\" alt=\"" + k.body.illust.title + "\" title=\"" + k.body.illust.title + "\">";
                                t = t.replace(D, n + "</a></figure></p>");
                              }
                              w(E, I, y[0].n);
                            }
                            if (z++ >= H - 1) {
                              m();
                            }
                          }, function (I, k) {
                            K();
                            if (z++ >= H - 1) {
                              m();
                            }
                          }, {
                            i: S++,
                            key: h,
                            body: C.body[h]
                          }, false);
                        }
                      },
                      error: function (C, H, S) {
                        aa(mouseX, mouseY, "挿絵データの取得に失敗しました\n一度ページを読み込みなおしてから再度お試しください", 1);
                        m();
                      }
                    });
                  }
                }
              } else {
                if ("1" === option.manga_select) {
                  var R = new JSZip();
                }
                for (var p = 0; p < a.length; p++) {
                  console.log(p, a, l , ni, option);
                  if ("ugoira" === a[p].type) {
                    ea();
                    if (2 == ni) {
                      alert(chrome.i18n.getMessage("no_licence"));
                      window.open(chrome.runtime.getURL("license.html"));
                      W(!1, g);
                      // break;
                    } else if (1 == ni) {
                      alert(chrome.i18n.getMessage("no_licence"));
                      window.open(chrome.runtime.getURL("license.html"));
                      W(!1, g);
                      // break;
                    }
                    if (!(2 != option.dl_ugoira && 3 != option.dl_ugoira && 4 != option.dl_ugoira && 5 != option.dl_ugoira && 6 != option.dl_ugoira && 7 != option.dl_ugoira && 8 != option.dl_ugoira && 9 != option.dl_ugoira)) {
                      Z.takeTimeStart();
                    }
                    if (option.full_ugoira) {
                      f = a[p].ugoira.ugokuIllustFullscreenData.src;
                      var x = {
                        width: a[p].ugoira.illustSize[0],
                        height: a[p].ugoira.illustSize[1]
                      };
                    } else {
                      f = a[p].ugoira.ugokuIllustData.src;
                      x = {
                        width: a[p].ugoira.illustSize[0],
                        height: a[p].ugoira.illustSize[1]
                      };
                    }
                    console.log('braked ', 0 > l.d && "FULL" !== l.accessLevel || undefined == l.result);
                    if (0 > l.d && "FULL" !== l.accessLevel || undefined == l.result) {
                      break;
                    }
                    if (!f.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
                      f = f.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
                    }
                    if (f.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
                      f = f.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
                    }
                    u(f, function (c, d) {
                      if (0 == option.dl_ugoira) {
                        w(a[d].n + ".zip", c, y[d].n);
                        Z.takeTimeClear();
                        W(true, g);
                      } else {
                        if (2 == option.dl_ugoira || 3 == option.dl_ugoira) {
                          var m = new JSZip();
                          m.file("animation.json", JSON.stringify(a[d].ugoira));
                        }
                        var r = new JSZip();
                        r.load(c, {
                          base64: false
                        });
                        var A = r.files;
                        c = null;
                        for (var J in A) if (A.hasOwnProperty(J)) {
                          var e = A[J];
                          if (!e.dir) {
                            c = e;
                            break;
                          }
                        }
                        if (c) {
                          function H() {
                            for (P in r.files) {
                              var S = r.file(P).asUint8Array();
                              if (1 == option.dl_ugoira) {
                                w(P, S, y[d].n);
                              } else if (2 == option.dl_ugoira || 3 == option.dl_ugoira) {
                                m.file(P, S, {
                                  binary: true
                                });
                              }
                            }
                            if (1 == option.dl_ugoira) {
                              Z.takeTimeClear();
                              W(true, g);
                            } else if (2 == option.dl_ugoira) {
                              var z = m.generate({
                                type: "uint8array"
                              });
                              w(a[d].n + ".zip", z, y[d].n);
                              Ya();
                              Z.takeTimeClear();
                              W(true, g);
                            } else if (3 == option.dl_ugoira) {
                              z = m.generate({
                                type: "base64"
                              });
                              $.ajax({
                                url: "https://orca-soft.net/chrome/pd/player/player.html",
                                cache: false,
                                success: function (D) {
                                  D = D.replace(/\/\*ImageDataReplace\*\//, "var zipFile = \"" + z + "\";");
                                  w(a[d].n + ".html", D, y[d].n);
                                  Z.takeTimeClear();
                                  W(true, g);
                                },
                                error: function (D, G, E) {
                                  alert(chrome.i18n.getMessage("player_dl_error"));
                                }
                              });
                            } else if (4 == option.dl_ugoira || 7 == option.dl_ugoira || 9 == option.dl_ugoira) {
                              if (!(l.t > l.p && 1 < l.s)) {
                                var h = a[d].ugoira.ugokuIllustData.frames.length;
                                for (var v = 0; v < h; v++) {
                                  S = r.file(a[d].ugoira.ugokuIllustData.frames[v].file).asBinary();
                                  a[d].ugoira.ugokuIllustData.frames[v].imgData = btoa(S);
                                }
                                if (4 == option.dl_ugoira) {
                                  Aa(chrome.runtime.getURL("ex/mj.js"), function (D) {
                                    D.onmessage = function (X) {
                                      X = X.data;
                                      if ("percent" === X.cmd) {
                                        Y(chrome.i18n.getMessage("create_now") + "\t" + Math.round(X.percent / h * 100) + "%", true);
                                      } else if ("finish" === X.cmd) {
                                        w(a[d].n + ".avi", X.byteArray, y[d].n, true);
                                        Z.takeTimeClear();
                                        D.terminate();
                                        W(true, g);
                                      }
                                    };
                                    if (!(2 < l.s)) {
                                      if (option.avi_ecomode) {
                                        var G = a[d].ugoira.ugokuIllustData.frames.length;
                                        var E = 9999;
                                        for (var F = 0; F < G; F++) {
                                          var ca = a[d].ugoira.ugokuIllustData.frames[F].delay;
                                          if (ca < E) {
                                            E = ca;
                                          }
                                        }
                                        var ja = 1 / (E / 1e3);
                                      } else {
                                        ja = 100;
                                      }
                                      D.postMessage({
                                        cmd: "start",
                                        canvasSize: {
                                          w: x.width,
                                          h: x.height
                                        },
                                        fps: ja
                                      });
                                      if (undefined != l.result) {
                                        var qa = 0;
                                        var ba = setInterval(function () {
                                          D.postMessage({
                                            cmd: "frameAdd",
                                            imgData: a[d].ugoira.ugokuIllustData.frames[qa].imgData,
                                            delay: a[d].ugoira.ugokuIllustData.frames[qa].delay,
                                            fps: ja
                                          });
                                          a[d].ugoira.ugokuIllustData.frames[qa].imgData = "";
                                          if (++qa >= h) {
                                            D.postMessage({
                                              cmd: "finish"
                                            });
                                            clearInterval(ba);
                                          }
                                        }, 0);
                                      }
                                    }
                                  });
                                } else if (7 == option.dl_ugoira) {
                                  Aa(chrome.runtime.getURL("ex/xn.js"), function (D) {
                                    D.onmessage = function (F) {
                                      F = F.data;
                                      if ("percent" === F.cmd) {
                                        Y(chrome.i18n.getMessage("create_now") + "\t" + Math.round(F.percent / h * 100) + "%", true);
                                      } else if ("finish" === F.cmd) {
                                        w(a[d].n + "." + (0 == option.xng_ext ? "svg" : "xng"), F.svg, y[d].n, false);
                                        Z.takeTimeClear();
                                        D.terminate();
                                        W(true, g);
                                      }
                                    };
                                    if (l.result) {
                                      D.postMessage({
                                        cmd: "start",
                                        frame: h,
                                        play: 0,
                                        width: x.width,
                                        height: x.height
                                      });
                                      var G = 0;
                                      var E = setInterval(function () {
                                        D.postMessage({
                                          cmd: "frameAdd",
                                          frame: h,
                                          imgData: a[d].ugoira.ugokuIllustData.frames[G].imgData,
                                          width: x.width,
                                          height: x.height,
                                          delay: a[d].ugoira.ugokuIllustData.frames[G].delay
                                        });
                                        a[d].ugoira.ugokuIllustData.frames[G].imgData = "";
                                        if (++G >= h) {
                                          D.postMessage({
                                            cmd: "finish"
                                          });
                                          clearInterval(E);
                                        }
                                      }, 0);
                                    }
                                  });
                                } else if (9 == option.dl_ugoira) {
                                  let D = document.getElementById("pixivDownloaderIframe");
                                  var I = "req_" + Math.random().toString(36).substr(2, 9);
                                  if (D) {
                                    G();
                                  } else {
                                    v = chrome.runtime.getURL("lib/ff.html");
                                    D = document.createElement("iframe");
                                    D.id = "pixivDownloaderIframe";
                                    D.style.display = "none";
                                    D.addEventListener("load", () => {
                                      G();
                                    });
                                    D.src = v;
                                    document.body.appendChild(D);
                                  }
                                  window.addEventListener("message", E => {
                                    if (E.source === D.contentWindow && E.data) {
                                      E = E.data;
                                      if ("setup_comp" === E.cmd && E.requestId === I) {
                                        var F = 0;
                                        var ca = setInterval(function () {
                                          D.contentWindow.postMessage({
                                            cmd: "frameAdd",
                                            requestId: I,
                                            imgData: a[d].ugoira.ugokuIllustData.frames[F].imgData,
                                            width: x.width,
                                            height: x.height,
                                            delay: a[d].ugoira.ugokuIllustData.frames[F].delay
                                          }, "*");
                                          if (++F >= h) {
                                            D.contentWindow.postMessage({
                                              cmd: "finish",
                                              ffcmd: "-f concat -i input.txt -safe 0 -c copy output.mp4",
                                              requestId: I
                                            }, "*");
                                            clearInterval(ca);
                                          }
                                        }, 0);
                                      } else if ("percent" === E.cmd && E.requestId === I) {
                                        Y(chrome.i18n.getMessage("create_now") + " " + Math.round(E.percent / h * 100) + "%", true);
                                      } else if ("finish" === E.cmd && E.requestId === I) {
                                        w(a[d].n + ".mp4", E.output, y[d].n, false);
                                        Z.takeTimeClear();
                                        W(true, g);
                                      } else if ("error" === E.cmd) {
                                        if ("FFmpeg processing error" === E.message) {
                                          alert("エンコード中にエラーが発生しました。コマンドを見直しても改善されない場合は開発者にお問い合わせください。");
                                        } else {
                                          alert(chrome.i18n.getMessage("unknown_error"));
                                        }
                                      }
                                    }
                                  });
                                  function G() {
                                    D.contentWindow.postMessage({
                                      cmd: "start",
                                      requestId: I,
                                      width: x.width,
                                      height: x.height
                                    }, "*");
                                  }
                                }
                              }
                            } else if (!(5 != option.dl_ugoira && 6 != option.dl_ugoira && 8 != option.dl_ugoira || !l.result || l.t > l.p && "FULL" !== l.accessLevel)) {
                              var k = 0;
                              h = a[d].ugoira.ugokuIllustData.frames.length;
                              for (v = 0; v < h; v++) {
                                S = r.file(a[d].ugoira.ugokuIllustData.frames[v].file).asUint8Array();
                                S = new Blob([S]);
                                S = URL.createObjectURL(S);
                                var n = new Image();
                                n.src = S;
                                a[d].ugoira.ugokuIllustData.frames[v].imgData = n;
                                n.onload = function () {
                                  k++;
                                  if (k >= h) {
                                    var D = document.createElement("canvas");
                                    D.setAttribute("width", x.width);
                                    D.setAttribute("height", x.height);
                                    var G = D.getContext("2d");
                                    G.fillStyle = "rgb(255,255,255)";
                                    G.fillRect(0, 0, x.width, x.height);
                                    if (5 == option.dl_ugoira) {
                                      pxvdwn_PsuYdhw35721();
                                      Y(chrome.i18n.getMessage("create_now") + "\t", true);
                                      var E = option.gif_resize;
                                      if (E.match(/^(\d+)px$/)) {
                                        E = E.match(/^(\d+)px$/)[1];
                                        var F = Sa(x, E, E);
                                      } else if (E.match(/^(\d+)%$/)) {
                                        E = E.match(/^(\d+)%$/)[1];
                                        F = {};
                                        F.width = Math.round(E / 100 * x.width);
                                        F.height = Math.round(E / 100 * x.height);
                                      } else {
                                        alert("GIFのリサイズの設定が不正です。設定画面を開き見なおしてください");
                                        location.reload();
                                      }
                                      D.width = F.width;
                                      D.height = F.height;
                                      var ca = new GIF({
                                        workers: option.gif_thread,
                                        quality: option.gif_quality,
                                        workerScript: URL.createObjectURL(new Blob([pxvdwn_PsuYdhw_worker]))
                                      });
                                      ca.on("progress", function (ba) {
                                        Y(chrome.i18n.getMessage("create_now") + "\t" + (100 * ba | 0) + "%", true);
                                      });
                                      ca.on("finished", function (ba) {
                                        w(a[d].n + ".gif", ba, y[d].n);
                                        Z.takeTimeClear();
                                        W(true, g);
                                      });
                                      var ja = 0;
                                      var qa = setInterval(function () {
                                        G.drawImage(a[d].ugoira.ugokuIllustData.frames[ja].imgData, 0, 0, F.width, F.height);
                                        ca.addFrame(D, {
                                          delay: a[d].ugoira.ugokuIllustData.frames[ja].delay,
                                          copy: true
                                        });
                                        window.URL.revokeObjectURL(a[d].ugoira.ugokuIllustData.frames[ja].imgData.src);
                                        if (++ja >= h) {
                                          ca.render();
                                          clearInterval(qa);
                                        }
                                      }, 0);
                                    } else if (6 == option.dl_ugoira) {
                                      Aa(chrome.runtime.getURL("ex/ap.js"), function (ba) {
                                        ba.onmessage = function (ka) {
                                          ka = ka.data;
                                          if ("percent" === ka.cmd) {
                                            Y(chrome.i18n.getMessage("create_now") + "\t" + Math.round(ka.percent / h * 100) + "%", true);
                                          } else if ("finish" === ka.cmd) {
                                            w(a[d].n + ".png", ka.byteArray, y[d].n, true);
                                            Z.takeTimeClear();
                                            ba.terminate();
                                            W(true, g);
                                          }
                                        };
                                        var X = option.apng_resize;
                                        if (X.match(/^(\d+)px$/)) {
                                          X = X.match(/^(\d+)px$/)[1];
                                          var ha = Sa(x, X, X);
                                        } else if (X.match(/^(\d+)%$/)) {
                                          X = X.match(/^(\d+)%$/)[1];
                                          ha = {};
                                          ha.width = Math.round(X / 100 * x.width);
                                          ha.height = Math.round(X / 100 * x.height);
                                        } else {
                                          alert("APNGのリサイズの設定が不正です。設定画面を開き見なおしてください");
                                          location.reload();
                                        }
                                        D.width = ha.width;
                                        D.height = ha.height;
                                        var da = 0;
                                        var Za = setInterval(function () {
                                          G.drawImage(a[d].ugoira.ugokuIllustData.frames[da].imgData, 0, 0, ha.width, ha.height);
                                          var ka = D.toDataURL("image/png");
                                          ba.postMessage({
                                            cmd: "frameAdd",
                                            imgData: ka,
                                            width: ha.width,
                                            height: ha.height,
                                            delay: a[d].ugoira.ugokuIllustData.frames[da].delay
                                          });
                                          window.URL.revokeObjectURL(a[d].ugoira.ugokuIllustData.frames[da].imgData.src);
                                          if (++da >= h) {
                                            ba.postMessage({
                                              cmd: "finish"
                                            });
                                            clearInterval(Za);
                                          }
                                        }, 0);
                                      });
                                    } else if (8 == option.dl_ugoira) {
                                      Aa(chrome.runtime.getURL("ex/wh.js"), function (ba) {
                                        ba.onmessage = function (da) {
                                          da = da.data;
                                          if ("percent" === da.cmd) {
                                            Y(chrome.i18n.getMessage("create_now") + "\t" + Math.round(da.percent / h * 100) + "%", true);
                                          } else if ("finish" === da.cmd) {
                                            w(a[d].n + ".webm", da.output, y[d].n, false);
                                            Z.takeTimeClear();
                                            ba.terminate();
                                            W(true, g);
                                          }
                                        };
                                        if (l.result) {
                                          var X = 0;
                                          var ha = setInterval(function () {
                                            G.drawImage(a[d].ugoira.ugokuIllustData.frames[X].imgData, 0, 0, D.width, D.height);
                                            var da = D.toDataURL("image/webp");
                                            ba.postMessage({
                                              cmd: "frameAdd",
                                              imgData: da,
                                              width: x.width,
                                              height: x.height,
                                              delay: a[d].ugoira.ugokuIllustData.frames[X].delay
                                            });
                                            window.URL.revokeObjectURL(a[d].ugoira.ugokuIllustData.frames[X].imgData.src);
                                            if (++X >= h) {
                                              ba.postMessage({
                                                cmd: "finish"
                                              });
                                              clearInterval(ha);
                                            }
                                          }, 0);
                                        }
                                      });
                                    }
                                  }
                                };
                              }
                            }
                          }
                          J = c.asUint8Array();
                          c = new Blob([J], {
                            type: {
                              png: "image/png",
                              jpg: "image/jpeg",
                              jpeg: "image/jpeg",
                              gif: "image/gif",
                              bmp: "image/bmp",
                              webp: "image/webp"
                            }[c.name.split(".").pop().toLowerCase()] || "application/octet-stream"
                          });
                          var B = URL.createObjectURL(c);
                          var C = new Image();
                          C.onload = function () {
                            x = {
                              width: C.width,
                              height: C.height
                            };
                            a[d].ugoira.illustSize[0] = x.width;
                            a[d].ugoira.illustSize[1] = x.height;
                            URL.revokeObjectURL(B);
                            H();
                          };
                          C.onerror = function () {
                            alert("画像サイズの取得に失敗しました。\nFailed to obtain the image size.");
                            URL.revokeObjectURL(B);
                          };
                          C.src = B;
                        } else {
                          alert("画像ファイルの取得に失敗しました。\nFailed to retrieve the image file.");
                        }
                      }
                    }, K, p, true);
                  } else if (a[p].m) {
                    if (0 == p) {
                      ea();
                      Z.takeTimeStart();
                      var Q = 0;
                    }
                    if ("1" === option.manga_select && (2 < l.s || undefined == l.result)) {
                      break;
                    }
                    function c(d, m, r) {
                      if (option.manga_renban) {
                        function J(e, B) {
                          for (e = "" + e; e.length < B;) {
                            e = "0" + e;
                          }
                          return e;
                        }
                        var A = option.manga_st_one ? J(m + 1, String(a.length).length) + "." + r : J(m, String(a.length).length) + "." + r;
                      } else {
                        A = a[m].n + "." + r;
                      }
                      if ("1" === option.manga_select) {
                        if (option.captionDL && option.captionDLZIP) {
                          if (0 == Q) {
                            la(option.captionTxt, b, q, true, g, function (e) {
                              e[0].n = Fa(e[0].n);
                              R.file(option.captionFileName + ".txt", e[0].n);
                              J();
                            }, true);
                          } else {
                            J();
                          }
                        } else {
                          J();
                        }
                        function J() {
                          if (d) {
                            Y(chrome.i18n.getMessage("dl_now") + "\t" + (Q + 1) + "ページ", true);
                            R.file(A, d);
                          }
                          if (++Q >= a.length) {
                            var e = R.generate({
                              type: "uint8array"
                            });
                            w(a[0].filename_tmp_del_page + ".zip", e, y[0].n);
                            Z.takeTimeClear();
                            W(true, g);
                          }
                        }
                      } else {
                        function J() {
                          if (m == Q) {
                            var e = 0 == m ? 0 : option.def_dl_wait;
                            if (!d || ra) {
                              e = 0;
                              if (d && ra) {
                                ra = false;
                              }
                            }
                            setTimeout(function () {
                              if (d) {
                                Y(chrome.i18n.getMessage("dl_now") + "\t" + (Q + 1) + "ページ", true);
                                w(A, d, y[m].n);
                              }
                              if (++Q >= a.length) {
                                Z.takeTimeClear();
                                W(true, g);
                              }
                            }, e);
                          } else {
                            setTimeout(function () {
                              J();
                            }, 1);
                          }
                        }
                        J();
                      }
                    }
                    if (pa && !Ca.includes(p)) {
                      c(false, p, "");
                    } else if (a[p].newIllustFlag) {
                      if (option.big_img) {
                        u(a[p].s + "/img-original/img/" + a[p].f + "_" + a[p].m + "." + a[p].fileType, function (d, m) {
                          c(d, m, a[m].fileType);
                        }, function (d, m) {
                          if (404 != d.status) {
                            if (!sa) {
                              aa(mouseX, mouseY, "オリジナルサイズのダウンロードに失敗した可能性があります\nThe original size download may have failed\nstatusCode:" + d.status, 1);
                            }
                            K();
                          }
                          u(a[m].s + "/c/1200x1200/img-master/img/" + a[m].f + "_" + a[m].m + "_master1200.jpg", function (r, A) {
                            c(r, A, "jpg");
                          }, K, m, false);
                        }, p, false);
                      } else {
                        u(a[p].s + "/c/1200x1200/img-master/img/" + a[p].f + "_" + a[p].m + "_master1200.jpg", function (d, m) {
                          c(d, m, "jpg");
                        }, K, p, false);
                      }
                    } else if (option.big_img) {
                      u(a[p].s + "/img" + a[p].s2 + "/img/" + a[p].f + "_big_" + a[p].m + "." + a[p].t, function (d, m) {
                        c(d, m, a[m].t);
                      }, function (d, m) {
                        if (404 != d.status) {
                          if (!sa) {
                            aa(mouseX, mouseY, "オリジナルサイズのダウンロードに失敗した可能性があります\nThe original size download may have failed\nstatusCode:" + d.status, 1);
                          }
                          K();
                        }
                        u(a[m].s + "/img" + a[m].s2 + "/img/" + a[m].f + "_" + a[m].m + "." + a[m].t, function (r, A) {
                          c(r, A, a[A].t);
                        }, K, m, false);
                      }, p, false);
                    } else {
                      u(a[p].s + "/img" + a[p].s2 + "/img/" + a[p].f + "_" + a[p].m + "." + a[p].t, function (d, m) {
                        c(d, m, a[m].t);
                      }, K, p, false);
                    }
                  } else if (a[p].newIllustFlag) {
                    u(a[p].s + "/img-original/img/" + a[p].f + "_p0." + a[p].fileType, function (c, d) {
                      w(a[d].n + "." + a[d].fileType, c, y[d].n);
                      ea();
                      W(true, g);
                    }, K, p, true);
                  } else {
                    u(a[p].s + "/img" + a[p].s2 + "/img/" + a[p].f + "." + a[p].t, function (c, d) {
                      w(a[d].n + "." + a[d].t, c, y[d].n);
                      ea();
                      W(true, g);
                    }, K, p, true);
                  }
                  console.log('making full loop');
                }
              }


              function K() {
                if (!sa) {
                  aa(mouseX, mouseY, chrome.i18n.getMessage("img_dl_error"), 1);
                  sa = 1;
                }
                if (ia) {
                  try {
                    var c = new URL(T[0], location.href).href;
                  } catch (d) {
                    c = T[0];
                  }
                  if (option.alldl_errskip) {
                    U.push("[DLError] " + c);
                  } else {
                    U.push("[DLError] " + c);
                    retryMsg = chrome.i18n.getMessage("alldl_append_msg");
                    alert(chrome.i18n.getMessage("dl_sippai") + retryMsg);
                  }
                }
                ea();
                W(false, g);
              }
              function u(c, d, m, r, A) {
                var J = false;
                if (A) {
                  setTimeout(function () {
                    J = true;
                  }, 3e3);
                }
                var e = new XMLHttpRequest();
                e.open("GET", c, true);
                e.responseType = "arraybuffer";
                e.addEventListener("progress", function (B) {
                  if (J) {
                    if (0 < B.total) {
                      Y(chrome.i18n.getMessage("dl_now") + "\t" + Math.round(B.loaded / B.total * 100) + "%", true);
                    } else {
                      Y(chrome.i18n.getMessage("dl_now"), true);
                    }
                  }
                });
                e.addEventListener("loadend", function () {
                  if (200 === e.status) {
                    if (option.debug) {
                      console.log("byteTransfer:" + c);
                    }
                    if ("function" === typeof d) {
                      d(e.response, r);
                    }
                  } else if (0 === e.status) {
                    var B = new Date().getTime() + "_" + Math.floor(1e18 * Math.random());
                    B = -1 != c.indexOf("?") ? "&" + B : "?" + B;
                    e = new XMLHttpRequest();
                    e.open("GET", c + "" + B, true);
                    e.responseType = "arraybuffer";
                    e.addEventListener("progress", function (C) {
                      if (J) {
                        if (0 < C.total) {
                          Y(chrome.i18n.getMessage("dl_now") + "\t" + Math.round(C.loaded / C.total * 100) + "%", true);
                        } else {
                          Y(chrome.i18n.getMessage("dl_now"), true);
                        }
                      }
                    });
                    e.addEventListener("loadend", function () {
                      if (200 === e.status) {
                        if (option.debug) {
                          console.log("byteTransfer:" + c);
                        }
                        if ("function" === typeof d) {
                          d(e.response, r);
                        }
                      } else {
                        if (option.debug) {
                          console.log("ERROR(" + e.status + " " + e.statusText + "):" + c);
                        }
                        if ("function" === typeof m) {
                          m({
                            status: e.status,
                            statusText: e.statusText
                          }, r);
                        }
                      }
                    });
                    e.send();
                  } else {
                    if (option.debug) {
                      console.log("ERROR(" + e.status + " " + e.statusText + "):" + c);
                    }
                    if ("function" === typeof m) {
                      m({
                        status: e.status,
                        statusText: e.statusText
                      }, r);
                    }
                  }
                });
                e.send();
              }
              function w(c, d, m, r) {
                function A(C, H) {
                  setTimeout(function () {
                    var S = document.createElement("a");
                    S.download = C;
                    S.href = H;
                    S.dataset.downloadurl = ["application/octet-stream", S.download, S.href].join(":");
                    S.click();
                    setTimeout(function () {
                      window.URL.revokeObjectURL(H);
                    }, 1e4);
                  }, 150 * normal_dl_wait++);
                }
                try {
                  var J = c.match(/\.([a-zA-Z0-9]+?)(\?|&|$)/)[1];
                  if (mimeTypeArray[J]) {
                    var e = mimeTypeArray[J];
                  } else {
                    e = "application/octet-stream";
                    if (option.debug) {
                      console.log("mimeType matchError");
                    }
                  }
                } catch (C) {
                  e = "application/octet-stream";
                  if (option.debug) {
                    console.log("mimeType notMatch");
                  }
                }
                if (r) {
                  B = URL.createObjectURL(d);
                } else {
                  d = new Blob([d], {
                    type: e
                  });
                  var B = URL.createObjectURL(d);
                }
                if ("2" !== option.dl_select) {
                  if (!(2 < l.s || undefined == l.result || (d = "", r = false, "0" === option.file_overwrite ? d = "prompt" : "1" === option.file_overwrite ? d = "uniquify" : "2" === option.file_overwrite && (d = "overwrite"), "1" === option.dl_select && (r = true), 21 < l.t && 1 < l.s))) {
                    try {
                      chrome.runtime.sendMessage({
                        mode: "fileDownload",
                        downloadFileName: c,
                        downloadFilePass: m,
                        blobURL: B,
                        writeSetting: d,
                        saveAs: r
                      }, function (C) {
                        if (C.errorNomalDownload) {
                          A(c, B);
                        }
                        if (C.errorFlag) {
                          aa(mouseX, mouseY, chrome.i18n.getMessage("filename_rewrite_message"), 1);
                        }
                      });
                    } catch (C) {
                      za();
                    }
                  }
                } else if (2 == ni || 1 == ni) {
                  if (2 == option.free_download_mode) {
                    setTimeout(function () {
                      var C = document.createElement("a");
                      C.download = c;
                      C.href = B;
                      C.dataset.downloadurl = ["application/octet-stream", C.download, C.href].join(":");
                      C.click();
                      setTimeout(function () {
                        window.URL.revokeObjectURL(B);
                      }, 1e4);
                    }, 150 * normal_dl_wait++);
                  } else {
                    r = !!(1 == option.free_download_mode);
                    try {
                      chrome.runtime.sendMessage({
                        mode: "fileDownload",
                        downloadFileName: c,
                        downloadFilePass: "",
                        blobURL: B,
                        writeSetting: "",
                        saveAs: r
                      }, function (C) {
                        if (C.errorNomalDownload) {
                          A(c, B);
                        }
                        if (C.errorFlag) {
                          aa(mouseX, mouseY, chrome.i18n.getMessage("filename_rewrite_message"), 1);
                        }
                      });
                    } catch (C) {
                      za();
                    }
                  }
                } else {
                  A(c, B);
                }
              }
            }
          } else {
            ea();
            W(false, g);
          }
        });
      }
    });
  }
  function Ya() {
    chrome.runtime.sendMessage({
      mode: "localStorage_read",
      name: "ugoiraZIP"
    }, function (b) {
      if ("false" === b.data) {
        $("body").append("<iframe id=\"pxvdwn_ex\" src=\"https://orca-soft.net/chrome/pd/html/whatplayer.html\" style=\"width: 800px;height: 600px;position: fixed;z-index: 1000000005;top: 50%;left: 50%;background: #fff;margin-top: -300px;margin-left: -400px;box-shadow: rgba(0, 0, 0, 0.65098) 0px 0px 10px 3px;   -webkit-box-shadow: rgba(0, 0, 0, 0.65098) 0px 0px 10px 3px;display:none;\"></iframe>");
        $("#pxvdwn_ex").fadeIn(500);
        $("body").append("<div id=\"pxvdwn_cls\" style=\"width:100%;height:100%;position:fixed;top:0px;left:0px;z-index: 1000000004\"></div>");
        $("#pxvdwn_cls").css({
          width: window.innerWidth,
          height: window.innerHeight
        });
        $("#pxvdwn_cls").click(function () {
          $("#pxvdwn_ex").fadeOut(500, function () {
            $("#pxvdwn_cls").remove();
          });
        });
        chrome.runtime.sendMessage({
          mode: "localStorage_rewrite",
          name: "ugoiraZIP",
          data: true
        });
      }
    });
  }
  function za() {
    alert(chrome.i18n.getMessage("pivex_error"));
  }
  function Y(b, q) {
    Ha = true;
    if (b) {
      if (0 === $("#pxvdwn_making").size()) {
        $("body").append("<div id=\"pxvdwn_making\" style=\"display:none;position: fixed;top: 0px;left: 0px;width: 100%;height: 30px;background: rgba(0,0,0,0.5);color: #fff;z-index: 1000000010;text-align: center;padding-top: 5px;padding-bottom: 5px;font-size: 15px;\"><span id=\"pxvdwn_loader\" class=\"pxvdwn_loader_anim\"></span><span id=\"pxvdwn_message\" style=\"display: inline-block;margin-top:5px;\"></span></div>");
        $("#pxvdwn_making").slideDown(300);
      }
      $("#pxvdwn_message").html(b);
      if (q) {
        $("#pxvdwn_loader").show();
      } else {
        $("#pxvdwn_loader").hide();
      }
    } else if (0 < $("#pxvdwn_making").size()) {
      Ha = false;
      $("#pxvdwn_making").slideUp(300, function () {
        if (Ha) {
          $("#pxvdwn_making").slideDown(300);
        } else {
          $(this).remove();
        }
      });
    }
  }
  function Na() {
    if (!(0 < $("#menu_container").length || 0 < $("#_pxvseal").length || !option.dl_message || -1 == gdata.indexOf("," + T[1] + ",") || !runFlag)) {
      $("section section:first").append("<div id=\"_pxvlabel\" style=\"line-height: 32px;margin-right: 20px;\"><a href=\"javascript:void(0);\" id=\"_pxvseal\"><svg style=\"stroke-linecap:round;stroke-width:2;position: relative;top: 2px;left: 2px;\" viewBox=\"0 0 10 10\" width=\"14\" height=\"14\"><line x1=\"2\" y1=\"2\" x2=\"8\" y2=\"8\" stroke=\"#fff\" stroke-width=\"3\"></line><line x1=\"8\" y1=\"2\" x2=\"2\" y2=\"8\" stroke=\"#fff\" stroke-width=\"3\"></line><line x1=\"2\" y1=\"2\" x2=\"8\" y2=\"8\" stroke=\"#555\"></line><line x1=\"8\" y1=\"2\" x2=\"2\" y2=\"8\" stroke=\"#555\"></line></svg></a> <font color=\"#ff5555\" style=\"font-size:12px;\"><b>" + chrome.i18n.getMessage("hozon_zumi") + "</b></font></div>");
      $("#_pxvseal").click(function () {
        chrome.runtime.sendMessage({
          mode: "wr",
          data: T[1]
        });
        gdata = gdata.replace(new RegExp("," + T[1] + ","), ",");
        $("#_pxvlabel").remove();
        if (option.syncPC && option.dl_history && !oa && l.result) {
          try {
            $.ajax({
              url: "https://orca-soft.net/chrome/pd/sync.php",
              cache: false,
              timeout: 3e4,
              data: "m=2&u=" + option.syncId + "&i=" + T[1],
              type: "GET",
              success: function (b) {
                if ("error" === b) {
                  alert(chrome.i18n.getMessage("sync_id_error"));
                }
              },
              error: function (b, q, g) {}
            });
          } catch (b) {
            aa(mouseX, mouseY, chrome.i18n.getMessage("sync_error"), 1);
          }
        }
      });
    }
  }
  function Ta() {
    function b(a) {
      if (0 == g) {
        $("body").find("a[data-gtm-value],span[data-gtm-value],a[href*='/artworks/'],a[href*='/novel/show.php']").each(function () {
          q($(this));
        });
        g = 1;
        setTimeout(function () {
          $("body").find("a[data-gtm-value],span[data-gtm-value],a[href*='/artworks/'],a[href*='/novel/show.php']").each(function () {
            q($(this));
          });
          g = 0;
        }, 500);
      }
    }
    function q(a) {
      var y = a.data("gtm-value");
      if (!y) {
        try {
          y = a.attr("href").match(/(artworks\/|novel\/show\.php\?id=)(\d+)/)[2];
        } catch (f) {}
      }
      if (y) {
        try {
          if (-1 != gdata.indexOf("," + y + ",")) {
            a.addClass("pxvdwn_bxsdw");
          }
        } catch (f) {}
      }
    }
    var g = 0;
    if (!(2 < l.s || !l.result)) {
      new MutationObserver(function (a) {
        a.forEach(function (y) {
          b(y.addedNodes);
        });
      }).observe(document.body, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        attributeFilter: ["data"]
      });
      $(window).on("load", function () {
        $("body").find("a[data-gtm-value],span[data-gtm-value],a[href*='/artworks/'],a[href*='/novel/show.php']").each(function () {
          q($(this));
        });
      });
      $("body").find("a[data-gtm-value],span[data-gtm-value],a[href*='/artworks/'],a[href*='/novel/show.php']").each(function () {
        q($(this));
      });
      $("body").bind("click", function (a) {
        if ("pxv_onlick_download_icon" === $(a.target).attr("id")) {
          setTimeout(function () {
            $("body").find("a[data-gtm-value],span[data-gtm-value],a[href*='/artworks/'],a[href*='/novel/show.php']").each(function () {
              q($(this));
            });
          }, 500);
        }
      });
    }
  }
  function la(b, q, g, a, y, f, t) {
    function M(z) {
      for (var h in z) return h;
      return null;
    }
    function O(z) {
      return z = z.replace(/\?rep\{'(.*?)','(.*?)','(.*?)'\}\?/g, function () {
        try {
          return arguments[1].replace(arguments[2], arguments[3]);
        } catch (v) {
          return "";
        }
      });
    }
    function P(z) {
      return z = z.replace(/\?mat\{'(.*?)','(.*?)','(.*?)','(.*?)'\}\?/g, function () {
        try {
          return -1 !== arguments[1].indexOf(arguments[2]) ? arguments[3] : arguments[4];
        } catch (v) {
          return "";
        }
      });
    }
    function V(z) {
      return z = z.replace(/\?reg\{'(.*?)','(.*?)','(.*?)','([a-zA-Z]*?)'\}\?/g, function () {
        try {
          return arguments[1].replace(new RegExp(arguments[2], arguments[4]), arguments[3]);
        } catch (v) {
          return "";
        }
      });
    }
    function L(z) {
      return z = z.replace(/\?regmat\{'(.*?)','(.*?)','(.*?)','(.*?)','([a-zA-Z]*?)'\}\?/g, function () {
        try {
          return arguments[1].match(new RegExp(arguments[2], arguments[5])) ? arguments[3] : arguments[4];
        } catch (v) {
          return "";
        }
      });
    }
    function R(z) {
      return z.replace(/\?\{(.*?),(\d+?)\}\?/g, function (h, v, I) {
        if (!v.match(/^\d+$/)) {
          return "";
        }
        for (h = "" + v; h.length < I;) {
          h = "0" + h;
        }
        return h;
      });
    }
    function p(z, h) {
      return z.replace(/([.\/:?*"<>\\|']|&lt;|&gt;|&amp;|&quot;|&#039;|~)/g, function (v, I) {
        switch (I) {
          case ".":
            return ".";
          case "/":
            return h ? l.t > l.p && 1 < l.s ? undefined : "/" : "／";
          case ":":
            return "：";
          case "?":
            return "？";
          case "*":
            return "＊";
          case "\"":
            return "”";
          case "<":
            return "＜";
          case ">":
            return "＞";
          case "\\":
            return "￥";
          case "|":
            return "｜";
          case "&lt;":
            return "＜";
          case "&gt;":
            return "＞";
          case "&amp;":
            return "&";
          case "&quot;":
            return "”";
          case "&#039;":
            return "'";
          case "'":
            return "'";
          case "~":
            return "～";
        }
        return "";
      });
    }
    function x(z, h, v, I) {
      switch (z) {
        case 0:
          return N ? u.preload.novel[c].title : u.preload.illust[c].illustTitle;
        case 1:
          return u.preload.user[d].userId;
        case 2:
          return u.preload.user[d].name;
        case 3:
          return "";
        case 4:
          z = "";
          h = N ? u.preload.novel[c].tags.tags : u.preload.illust[c].tags.tags;
          for (var k in h) z += h[k].tag + " ";
          return z;
        case 5:
          z = "";
          h = N ? u.preload.novel[c].tags.tags : u.preload.illust[c].tags.tags;
          for (k in h) if (10 > h[k].tag.length) {
            z += h[k].tag + " ";
          }
          return z;
        case 6:
          return N ? "小説" : "";
        case 7:
          return N ? "incompatible" : u.preload.illust[c].userAccount;
        case 8:
          z = N ? v.match(/show\.php\?id=(\d+)/i) : v.match(/\/artworks\/([0-9]{1,})/i);
          return z[1];
        case 9:
          return N ? K(u.preload.novel[c].createDate, 0) : K(u.preload.illust[c].createDate, 0);
        case 10:
          return N ? K(u.preload.novel[c].createDate, 1) : K(u.preload.illust[c].createDate, 1);
        case 11:
          return N ? Number(K(u.preload.novel[c].createDate, 2)).toString() : Number(K(u.preload.illust[c].createDate, 2)).toString();
        case 12:
          return N ? Number(K(u.preload.novel[c].createDate, 3)).toString() : Number(K(u.preload.illust[c].createDate, 3)).toString();
        case 13:
          return N ? Number(K(u.preload.novel[c].createDate, 4)).toString() : Number(K(u.preload.illust[c].createDate, 4)).toString();
        case 14:
          k = new Date();
          k = k.getYear();
          return 2e3 > k ? k + 1900 : k;
        case 15:
          k = new Date();
          return k.getMonth() + 1;
        case 16:
          k = new Date();
          return k.getDate();
        case 17:
          k = new Date();
          return k.getHours();
        case 18:
          k = new Date();
          return k.getMinutes();
        case 19:
          k = new Date();
          return k.getSeconds();
        case 20:
          k = new Date();
          myTbl = "日月火水木金土".split("");
          return myTbl[k.getDay()];
        case 21:
          return w[1] ? w[1] : "";
        case 22:
          k = N ? u.preload.novel[c].description : u.preload.illust[c].illustComment;
          k = k.replace(/&lt;/g, "<");
          k = k.replace(/&gt;/g, ">");
          k = k.replace(/<br.*?>/g, "\r\n");
          return k = k.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
        case 23:
          return N ? u.preload.novel[c].description : u.preload.illust[c].illustComment;
        case 24:
          k = x(8, h, v, I);
          return Q(k, false, false);
        case 25:
          k = x(8, h, v, I);
          return Q(k, false, false);
        case 26:
          try {
            return N ? u.preload.novel[c].seriesNavData.title : u.preload.illust[c].seriesNavData.title;
          } catch (n) {
            return "";
          }
        case 27:
          try {
            return N ? u.preload.novel[c].seriesNavData.seriesId : u.preload.illust[c].seriesNavData.seriesId;
          } catch (n) {
            return "";
          }
        case 28:
          return N ? Number(K(u.preload.novel[c].createDate, 5)).toString() : u.preload.illust[c].userIllusts[c].createDate ? Number(K(u.preload.illust[c].userIllusts[c].createDate, 5)).toString() : Number(K(u.preload.illust[c].createDate, 5)).toString();
        case 29:
          try {
            return N ? u.preload.novel[c].seriesNavData.order : u.preload.illust[c].seriesNavData.order;
          } catch (n) {
            return "";
          }
        case 30:
          k = x(8, h, v, I);
          return Q(k, true, false);
        case 31:
          k = x(8, h, v, I);
          return Q(k, false, true);
        case 32:
          k = x(8, h, v, I);
          return Q(k, true, true);
        case 33:
          k = x(10, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 34:
          k = x(11, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 35:
          k = x(12, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 36:
          k = x(13, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 37:
          k = x(28, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 38:
          k = x(15, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 39:
          k = x(16, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 40:
          k = x(17, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 41:
          k = x(18, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 42:
          k = x(19, h, v, I);
          return (10 > k ? "0" : "") + k;
        case 43:
          try {
            return N ? u.preload.novel[c].pageCount : "";
          } catch (n) {
            return "";
          }
        case 44:
          try {
            return N ? u.preload.novel[c].characterCount : "";
          } catch (n) {
            return "";
          }
        case 45:
          try {
            return N ? u.preload.novel[c].wordCount : "";
          } catch (n) {
            return "";
          }
        case 46:
          try {
            return N ? u.preload.novel[c].readingTime : "";
          } catch (n) {
            return "";
          }
        case 47:
          try {
            return N ? Math.floor(Number(u.preload.novel[c].readingTime) / 60) : "";
          } catch (n) {
            return "";
          }
      }
    }
    function Q(z, h, v) {
      function I(D) {
        $.ajax({
          url: N ? "https://www.pixiv.net/ajax/novels/comments/roots?novel_id=" + z + "&offset=" + D + "&limit=50" : "https://www.pixiv.net/ajax/illusts/comments/roots?illust_id=" + z + "&offset=" + D + "&limit=50",
          type: "GET",
          dataType: "json",
          async: false,
          timeout: 3e4,
          success: function (G) {
            var E = G.body.comments.length;
            for (var F = 0; F < E; F++) {
              if ("" != G.body.comments[F].comment) {
                n = v ? n + ("comments,\"" + G.body.comments[F].userName.replace(/"/g, "\\\"") + "\"," + G.body.comments[F].commentDate + ",\"" + G.body.comments[F].comment.replace(/"/g, "\\\"") + "\"\r\n") : n + ("■" + G.body.comments[F].userName + " " + G.body.comments[F].commentDate + "\r\n" + G.body.comments[F].comment + "\r\n\r\n");
              }
              if (h && G.body.comments[F].hasReplies) {
                k(G.body.comments[F].id, 1);
              }
            }
            if (G.body.hasNext) {
              if (500 <= D) {
                aa(mouseX, mouseY, "コメント数が多すぎるため古いコメントは省略されました<br>Older comments omitted due to too many comments.", 1);
              } else {
                return I(D + 50);
              }
            }
          },
          error: function (G, E, F) {
            aa(mouseX, mouseY, "コメントデータが存在しない、または取得に失敗したため一部が省略されました<br>Part of the acquisition was omitted because the comment data did not exist or acquisition failed.", 1);
          }
        });
      }
      function k(D, G) {
        $.ajax({
          url: N ? "https://www.pixiv.net/ajax/novels/comments/replies?comment_id=" + D + "&page=" + G : "https://www.pixiv.net/ajax/illusts/comments/replies?comment_id=" + D + "&page=" + G,
          type: "GET",
          dataType: "json",
          async: false,
          timeout: 3e4,
          success: function (E) {
            for (var F = E.body.comments.length - 1; 0 <= F; F--) {
              if ("" != E.body.comments[F].comment) {
                n = v ? n + ("replies,\"" + E.body.comments[F].userName.replace(/"/g, "\\\"") + "\"," + E.body.comments[F].commentDate + ",\"" + E.body.comments[F].comment.replace(/"/g, "\\\"") + "\"\r\n") : n + ("→" + E.body.comments[F].userName + " " + E.body.comments[F].commentDate + "\r\n" + E.body.comments[F].comment + "\r\n\r\n");
              }
            }
            if (E.body.hasNext) {
              if (200 <= G) {
                aa(mouseX, mouseY, "コメントの返信数が多すぎるため一部の返信は省略されました<br>Some replies have been omitted because the number of comment responses is too large.", 1);
              } else {
                return k(D, G++);
              }
            }
          },
          error: function (E, F, ca) {
            aa(mouseX, mouseY, "コメントデータの取得に失敗したため一部省略されました<br>Some comments have been omitted due to a failure in retrieving the data.", 1);
          }
        });
      }
      var n = "";
      I(0);
      return n;
    }
    function K(z, h) {
      try {
        var v = new Date(z);
        z = [];
        z[0] = v.getFullYear();
        z[1] = v.getMonth() + 1;
        z[2] = v.getDate();
        z[3] = ("0" + v.getHours()).slice(-2);
        z[4] = ("0" + v.getMinutes()).slice(-2);
        z[5] = ("0" + v.getSeconds()).slice(-2);
        return z[h];
      } catch (I) {
        return "";
      }
    }
    var u = Ea(q, 1);
    var w = [, ""];
    if (N) {
      c = M(u.preload.novel);
      d = M(u.preload.user);
      m = "novel";
      r = false;
      try {
        if (1 === u.preload.novel[c].xRestrict) {
          r = true;
        }
      } catch (z) {}
      A = false;
      try {
        if (2 === u.preload.novel[c].aiType) {
          A = true;
        }
      } catch (z) {}
      J = false;
      try {
        if (true === u.preload.novel[c].isOriginal) {
          J = true;
        }
      } catch (z) {}
    } else {
      var c = M(u.preload.illust);
      var d = M(u.preload.user);
      var m = u.preload.illust[c].illustType;
      if ((0 == m || 1 == m) && 1 < u.preload.illust[c].pageCount) {
        w[1] = u.preload.illust[c].pageCount;
      }
      var r = false;
      try {
        if (1 === u.preload.illust[c].xRestrict) {
          r = true;
        }
      } catch (z) {}
      var A = false;
      try {
        if (2 === u.preload.illust[c].aiType) {
          A = true;
        }
      } catch (z) {}
      var J = false;
      try {
        if (true === u.preload.illust[c].isOriginal) {
          J = true;
        }
      } catch (z) {}
    }
    var e = "title member-id member-name memoized-name tags short-tags tools pixiv-id illust-id illust-year illust-month illust-day illust-hour illust-minute saved-year saved-month saved-day saved-hour saved-minute saved-second saved-week page-all caption caption-html comment comment-html series series-id illust-second series-no comment-rep comment-csv comment-repcsv ?illust-month-p? ?illust-day-p? ?illust-hour-p? ?illust-minute-p? ?illust-second-p? ?saved-month-p? ?saved-day-p? ?saved-hour-p? ?saved-minute-p? ?saved-second-p? ?novel-page-all? ?novel-cnt? ?novel-wcnt? ?novel-rtime-sec? ?novel-rtime-min?".split(" ");
    if (b.match(/\?memoized-name\?/)) {
      var B = x(1, q, g, "");
      b = b.replace(/\?memoized-name\?/g, memozed[B] ? memozed[B] : memozedDef);
    }
    b = r ? b.replace(/\?r\[(.+?)\]\?/g, "$1") : b.replace(/\?r\[(.+?)\]\?/g, "");
    b = A ? b.replace(/\?a\[(.+?)\]\?/g, "$1") : b.replace(/\?a\[(.+?)\]\?/g, "");
    b = J ? b.replace(/\?o\[(.+?)\]\?/g, "$1") : b.replace(/\?o\[(.+?)\]\?/g, "");
    if (t) {
      for (r = 0; r < e.length; r++) {
        try {
          mat = new RegExp("\\?" + e[r] + "\\?", "g");
          if (b.match(mat)) {
            b = b.replace(mat, x(r, q, g, ""));
          }
        } catch (z) {
          console.log("error skip ");
        }
      }
    } else {
      for (r = 0; r < e.length; r++) {
        try {
          mat = new RegExp("\\?" + e[r] + "\\?", "g");
          if (b.match(mat)) {
            b = b.replace(mat, String(x(r, q, g, "")).replace(/\//g, "／"));
          }
        } catch (z) {
          console.log("error skip ");
        }
      }
    }
    if (option.erase_emoji) {
      b = b.replace(/(?![*#0-9]+)[\p{Emoji}\p{Emoji_Modifier}\p{Emoji_Component}\p{Emoji_Modifier_Base}\p{Emoji_Presentation}]/gu, "");
    }
    if (!(2 < l.s || undefined == l.result) || !a || "" == b) {
      if (option.debug) {
        try {
          for (r = 0; r < e.length; r++) {
            console.log(e[r] + ":" + x(r, q, g, ""));
          }
          console.log("complete");
        } catch (z) {
          console.log("error");
          console.log(z.stack);
        }
      }
      if (N) {
        e = u.preload.novel[c].coverUrl;
        e = e.match(/(^.+?)\.([^.]+$)/);
        H = [];
        H[1] = e[1];
        H[2] = e[2];
        f(z());
        function z() {
          var h = [];
          h[1] = u.preload.novel[c].content;
          h[1] = h[1].replace(/(\r\n|\r|\n)/g, "\r\n");
          var v = b.replace(/(\?page\?|\?page-original\?|\?page-zeroformat\?|\?page-zeroformat-original\?)/g, "").replace(/\?\[(.+?)\]\?/g, "");
          v = v.replace(/\?[imu]\[(.+?)\]\?/g, "");
          v = v.replace(/\?n\[(.+?)\]\?/g, "$1");
          v = R(v);
          v = O(v);
          v = P(v);
          v = V(v);
          v = L(v);
          if (!t) {
            v = p(v, a);
          }
          var I = [];
          I[0] = {
            b: H[1],
            n: v,
            t: H[2],
            text: h[1],
            result: "?b=" + encodeURIComponent(H[1]) + "&n=" + encodeURIComponent(v) + "&t=" + encodeURIComponent(H[2]),
            title: x(0, q, g, ""),
            illustData: u,
            illustKey: c
          };
          return I;
        }
      } else {
        var C = "";
        if (2 != m) {
          var H = q.match(/<img.+?src="(http:\/\/i[0-9]{1,}\.pixiv\.net)\/img([0-9]{1,})\/img\/(.*?)_m\.([a-zA-Z]{1,})/i);
          var S = false;
          if (!H) {
            H = u.preload.illust[c].urls.regular;
            if (!H.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
              H = H.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
            }
            H = H.match(/(https?:\/\/[^.]*\.?pximg\.net)\/()img-master\/img\/(\d+?\/\d+?\/\d+?\/\d+?\/\d+?\/\d+?\/\d+?(-[a-zA-Z0-9]+)?)_p\d+?_master\d*?\.([a-zA-Z]{1,})/i);
            S = true;
            if (a && "function" === typeof f) {
              return f(z());
            }
            C = u.preload.illust[c].urls.original.match(/_p0\.([A-Za-z]+)/)[1];
          }
        }
        if ("function" === typeof f) {
          return f(z());
        }
        function z() {
          if (w[1]) {
            var h = [];
            var v = b.replace(/(\?page\?|\?page-original\?|\?page-zeroformat\?|\?page-zeroformat-original\?)/g, "").replace(/\?\[(.+?)\]\?/g, "");
            v = v.replace(/\?[inu]\[(.+?)\]\?/g, "");
            v = v.replace(/\?m\[(.+?)\]\?/g, "$1");
            v = R(v);
            v = O(v);
            v = P(v);
            v = V(v);
            v = L(v);
            if (!t) {
              v = p(v, a);
            }
            for (var I = 0; I < w[1]; I++) {
              var k = "";
              if (b.match(/(\?page\?|\?page-original\?|\?page-zeroformat\?|\?page-zeroformat-original\?)/g)) {
                k = "&w=1";
              }
              n = b.replace(/(\?page\?|\?page-original\?|\?page-zeroformat\?|\?page-zeroformat-original\?)/g, function (G, E) {
                return "?page-zeroformat?" === E ? function (F, ca) {
                  for (F = "" + F; F.length < ca;) {
                    F = "0" + F;
                  }
                  return F;
                }(I + 1, String(w[1]).length) : "?page-zeroformat-original?" === E ? function (F, ca) {
                  for (F = "" + F; F.length < ca;) {
                    F = "0" + F;
                  }
                  return F;
                }(I, String(w[1]).length) : "?page?" === E ? I + 1 : I;
              });
              n = n.replace(/\?\[(.+?)\]\?/g, "$1");
              n = n.replace(/\?[inu]\[(.+?)\]\?/g, "");
              n = n.replace(/\?m\[(.+?)\]\?/g, "$1");
              n = R(n);
              n = O(n);
              n = P(n);
              n = V(n);
              n = L(n);
              if (!t) {
                n = p(n, a);
              }
              h[I] = {
                type: "manga",
                s: H[1],
                s2: H[2],
                f: H[3],
                t: H[4],
                n,
                m: "p" + I,
                result: "?s=" + encodeURIComponent(H[1]) + "&s2=" + encodeURIComponent(H[2]) + "&f=" + encodeURIComponent(H[3]) + "&t=" + encodeURIComponent(H[4]) + "&n=" + encodeURIComponent(n) + "&m=p" + I + k,
                filename_tmp_del_page: v,
                newIllustFlag: S,
                fileType: C
              };
            }
            return h;
          }
          h = 2 == m ? "ugoira" : "illust";
          var n = b.replace(/(\?page\?|\?page-original\?|\?page-zeroformat\?|\?page-zeroformat-original\?)/g, "").replace(/\?\[(.+?)\]\?/g, "");
          if ("ugoira" === h) {
            n = n.replace(/\?[imn]\[(.+?)\]\?/g, "");
            n = n.replace(/\?u\[(.+?)\]\?/g, "$1");
          } else {
            n = n.replace(/\?[umn]\[(.+?)\]\?/g, "");
            n = n.replace(/\?i\[(.+?)\]\?/g, "$1");
          }
          n = R(n);
          n = O(n);
          n = P(n);
          n = V(n);
          n = L(n);
          if (!t) {
            n = p(n, a);
          }
          var D = {
            type: h
          };
          if ("ugoira" === h) {
            $.ajax({
              url: "https://www.pixiv.net/ajax/illust/" + y[1] + "/ugoira_meta",
              dataType: "json",
              async: false,
              success: function (G) {
                var E = {
                  illustSize: []
                };
                E.illustSize[0] = u.preload.illust[c].width;
                E.illustSize[1] = u.preload.illust[c].height;
                var F = JSON.parse(JSON.stringify(G));
                E.ugokuIllustData = F.body;
                G.body.src = G.body.src.replace(/600x600/, "1920x1080");
                E.ugokuIllustFullscreenData = G.body;
                $.extend(D, {
                  ugoira: E,
                  n
                });
              },
              error: function (G, E, F) {
                alert(chrome.i18n.getMessage("img_load_error"));
              }
            });
          } else {
            $.extend(D, {
              s: H[1],
              s2: H[2],
              f: H[3],
              t: H[4],
              n,
              result: "?s=" + encodeURIComponent(H[1]) + "&s2=" + encodeURIComponent(H[2]) + "&f=" + encodeURIComponent(H[3]) + "&t=" + encodeURIComponent(H[4]) + "&n=" + encodeURIComponent(n),
              newIllustFlag: S,
              fileType: C
            });
          }
          h = [];
          h[0] = D;
          return h;
        }
      }
    }
  }
  function Fa(b) {
    return b = b.replace(/(&lt;|&gt;|&amp;|&quot;|&#039;)/g, function (q, g) {
      switch (g) {
        case "&lt;":
          return "<";
        case "&gt;":
          return ">";
        case "&amp;":
          return "&";
        case "&quot;":
          return "\"";
        case "'":
          return "'";
        case "&#039;":
          return "'";
      }
      return "";
    });
  }
  function $a() {
    var b = [];
    var q = true;
    $("html").keydown(function (g) {
      b[g.keyCode] = true;
      g.none = true;
      if (b[option.dl_shortcut_abc] && g[option.dl_shortcut_key]) {
        if (0 < $("a.pxvdwn_l").length && q) {
          $("a.pxvdwn_l:last").click();
          q = false;
        }
        b = [];
      }
    });
    $("html").keyup(function (g) {
      b[g.keyCode] = false;
      q = true;
    });
  }
  function Ua() {
    $(document).on("mouseenter", "._work, figure > div, div[width=184][height=184], div[width=288][height=288], div:has(> a[data-ga4-label='thumbnail_link']), div[type='illust'], img[src*='/common/images/novel_thumb/novel_thumb'], img[src*='/novel-cover-master/img/']", function (b) {
      function q(M) {
        if (d_l - d_w_s / 2 - 1 > M.pageX || d_l + d_w + 1 < M.pageX || d_t - d_h_s / 2 - 1 > M.pageY || d_t + d_h + 1 < M.pageY) {
          $("body").unbind("mousemove", q);
          $("#pxv_bigicon").unbind("click", g);
          $("#pxv_bigicon").remove();
        }
      }
      function g(M) {
        var O = $(t).closest("a").attr("href");
        O ||= $(t).find("a:first").attr("href");
        if (0 == $("#pxvdwn_bigimage").size()) {
          $("body").append("<img id=\"pxvdwn_bigimage\" src=\"\" />");
        }
        $("body").append("<div id=\"pxv_white\"></div>");
        $("#pxv_white").unbind().click(function () {
          $("#pxv_white,#pxvdwn_loader_popup").remove();
          V.abort();
        });
        $("#pxv_white").css({
          background: "rgba(0,0,0,0.5)",
          position: "fixed",
          "z-index": 1e5,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        });
        $("body").append("<div id=\"pxvdwn_loader_popup\" class=\"pxvdwn_loader_anim\"></div>");
        $("#pxvdwn_loader_popup").css({
          position: "fixed",
          width: 30,
          height: 30,
          left: window.innerWidth / 2 - 15,
          top: window.innerHeight / 2 - 15,
          "z-index": "1000000000",
          border: "8px solid #eee",
          "border-right-color": "transparent"
        });
        var P = {};
        var V = $.ajax({
          url: O,
          cache: true,
          timeout: 1e4,
          success: function (L) {
            function R(d) {
              for (var m in d) return m;
              return null;
            }
            var p = Ea(L, 1);
            var x = R(p.preload.illust);
            R(p.preload.user);
            var Q = p.preload.illust[x].illustType;
            var K = 0;
            if (0 == Q || 1 == Q) {
              if (1 < p.preload.illust[x].pageCount) {
                illustManga = 1;
                K = "manga";
              } else {
                illustManga = 0;
                K = "illust";
              }
            } else {
              illustManga = 2;
              K = "ugoira";
            }
            if (2 > option[K + "_zoom_select"]) {
              try {
                var u = L.match(/"regular":"(https?[^"]+?)"/i)[1];
                u = u.replace(/\\\//, "/");
                u = u.replace(/c\/\d+x\d+\//, "");
                $("#pxvdwn_bigimage").attr("src", u);
                $("#pxvdwn_bigimage").load(function () {
                  if (0 == $("#pxv_white").length) {
                    $("#pxvdwn_bigimage").remove();
                    return false;
                  }
                  $("#pxvdwn_loader_popup").remove();
                  P = ab($("#pxvdwn_bigimage").get(0));
                  $("#pxvdwn_loading").remove();
                  $img = y;
                  max_width = window.innerWidth / 1.1;
                  max_height = window.innerHeight / 1.1 - 50;
                  d_w = $img.width();
                  d_h = $img.height();
                  d_l = $img.offset().left - $(document).scrollLeft();
                  d_t = $img.offset().top - $(document).scrollTop();
                  d_w = P.width;
                  d_h = P.height;
                  $("body").append("<div id=\"pxv_del\"></div>");
                  $("#pxv_del").show();
                  $("#pxv_del").css({
                    opacity: 0
                  });
                  $("#pxv_del").bind("click", function () {
                    if (0 < $("#pxvdwn_loading").size()) {
                      $("#pxvdwn_loading").remove();
                    }
                    if (!$("#pxvdwn_bigimage").is(":animated")) {
                      $("#pxvdwn_bigimage,#pxv_white").css({
                        opacity: 1
                      }).animate({
                        opacity: 0
                      }, 100, "swing", function () {
                        $("#menu_container").remove();
                        $("#pxv_del").unbind();
                        $("#pxv_del").remove();
                        $("#pxvdwn_bigimage").remove();
                        $("#pxv_white,#pxvdwn_loader_popup").remove();
                      });
                    }
                  });
                  $("#pxv_bigicon").remove();
                  if (d_w / max_width > d_h / max_height) {
                    w = max_width;
                    c = Math.round(w / d_w * d_h);
                  } else {
                    c = max_height;
                    w = Math.round(c / d_h * d_w);
                  }
                  var d = 0.8 * w;
                  var m = 0.8 * c;
                  $("#pxvdwn_bigimage").css({
                    position: "fixed",
                    width: d,
                    height: m,
                    left: window.innerWidth / 2 - d / 2,
                    top: window.innerHeight / 2 - m / 2,
                    "z-index": "1000000000",
                    "max-height": "none",
                    "max-width": "none",
                    opacity: 0,
                    "box-shadow": "3px 3px 10px 0px rgba(0,0,0,0.3)"
                  });
                  $("#pxvdwn_bigimage").animate({
                    width: w,
                    height: c,
                    left: window.innerWidth / 2 - w / 2,
                    top: window.innerHeight / 2 - c / 2,
                    opacity: 1
                  }, 100, "swing", function () {
                    a($("#pxvdwn_bigimage"), t, K);
                  });
                  M.stopPropagation();
                  M.preventDefault();
                });
              } catch (d) {}
            } else if (1 < option[K + "_zoom_select"]) {
              $("#pxvdwn_loading").remove();
              if (3 == option[K + "_zoom_select"]) {
                O = d(O, "p_expand", "1");
                function d(m, r, A) {
                  var J = new RegExp("([?&])" + r + "=.*?(&|$)", "i");
                  var e = -1 !== m.indexOf("?") ? "&" : "?";
                  return m.match(J) ? m.replace(J, "$1" + r + "=" + A + "$2") : m + e + r + "=" + A;
                }
              }
              if (0 == $("#pxvdwn_iframe").size()) {
                $("body").append("<div id=\"pxvdwn_iframe\"></div>");
                max_width = window.innerWidth - 200;
                max_height = window.innerHeight - 200;
                d_w = $(t).width();
                d_h = $(t).height();
                d_l = $(t).offset().left - $(document).scrollLeft();
                d_t = $(t).offset().top - $(document).scrollTop();
                $("html").css("overflow", "hidden");
                $("body").append("<div id=\"pxv_del\"></div>");
                $("#pxv_del").show();
                $("#pxv_del").css({
                  opacity: 0
                });
                $("#pxv_del").bind("click", function () {
                  $("#pxvdwn_iframe_f").attr("src", "about:blank");
                  $("#pxvdwn_iframe_f").load(function () {
                    if (!$("#pxvdwn_iframe").is(":animated")) {
                      $("#menu_container").remove();
                      $("#pxv_del").unbind();
                      $("#pxv_del").remove();
                      $("#pxvdwn_iframe").remove();
                      $("html").css("overflow", "auto");
                      $("#pxv_white,#pxvdwn_loader_popup").remove();
                    }
                  });
                });
                var w = 1020;
                if (w > window.innerWidth) {
                  w = window.innerWidth / 1.1;
                }
                var c = window.innerHeight / 1.1 - 50;
                L = 0.8 * w;
                p = 0.8 * c;
                $("#pxvdwn_iframe").css({
                  position: "fixed",
                  width: L,
                  height: p,
                  left: window.innerWidth / 2 - L / 2,
                  top: window.innerHeight / 2 - p / 2,
                  "z-index": "1000000005",
                  "max-height": "none",
                  "max-width": "none",
                  opacity: 0,
                  "background-color": "#fff",
                  "box-shadow": "3px 3px 10px 0px rgba(0,0,0,0.3)"
                });
                $("#pxvdwn_iframe").animate({
                  width: w,
                  height: c,
                  left: window.innerWidth / 2 - w / 2,
                  top: window.innerHeight / 2 - c / 2,
                  opacity: 1
                }, 300, "swing", function () {
                  $(this).append("<iframe id=\"pxvdwn_iframe_f\" src=\"" + O + "\" style=\"width:100%;height:100%;border:none;\"></iframe>");
                  a($("#pxvdwn_iframe"), t, K);
                  if (3 == option[K + "_zoom_select"]) {
                    $(".pxvpopup_menu:first").prepend("<a href=\"javascript:void(0);\" id=\"pxvdwn_expand\">" + chrome.i18n.getMessage("pxvdwn_expand") + "</a>　");
                    $("#pxvdwn_expand").off().click(function () {
                      window.open(O);
                    });
                    $("#menu_container").css({
                      left: $("#pxvdwn_iframe").position().left + $("#pxvdwn_iframe").outerWidth() - $("#menu_container").outerWidth()
                    });
                  }
                });
              }
            }
          },
          error: function (L, R, p) {
            if ("abort" != p) {
              aa(mouseX, mouseY, "拡大画像の読み込みに失敗しました", 1);
              $("#pxv_white,#pxvdwn_loader_popup").remove();
            }
          }
        });
      }
      function a(M, O, P) {
        var V = $(O).attr("href");
        V ||= $(O).find("a").attr("href");
        O = V.replace(/^.*?\/artworks\/([0-9]{1,}).*$/, "/bookmark_add.php?type=illust&illust_id=$1");
        T = V.match(/\/artworks\/([0-9]{1,})/i);
        if (null != T) {
          $("body").append("<div id=\"menu_container\"></div>");
          $("#menu_container").css({
            position: "fixed",
            "z-index": "1000000003"
          });
          if (N) {
            L = 4;
          } else {
            var L = 1;
            if ("manga" === P) {
              L = 2;
            } else if ("ugoira" === P) {
              L = 3;
            }
          }
          Ma("#menu_container", V, 0, L);
          $("#menu_container").prepend("<span class=\"pxvpopup_menu\"><a href=\"" + O + "\" target=\"_blank\" id=\"pxv_pop_bookmark\">" + chrome.i18n.getMessage("bookmark_illust_button") + "</a>　<a href=\"" + V + "\">" + chrome.i18n.getMessage("jump_illust_button") + "</a></span>");
          $("#menu_container").css({
            left: M.position().left + M.outerWidth() - $("#menu_container").outerWidth(),
            top: M.position().top - $("#menu_container").outerHeight() - 6
          });
        }
        if (option.illust_zoom_bm_win) {
          $("#pxv_pop_bookmark").click(function () {
            Ba($(this).attr("href"), "bookmark_window", 1180, 600, false);
            return false;
          });
        }
      }
      if (!$(this).attr("writing-mode") && !$(this).find("img").attr("writing-mode")) {
        novel_flag = 0;
        try {
          if (0 < $(this).find("img[src^='http']").length) {
            var y = $(this).find("img");
            var f = $(this).find("img").attr("src");
          } else {
            y = 0 < $(this).find("div[style*='background-image']").length ? $(this).find("div[style*='background-image']") : $(this);
            f = y.attr("style").match(/(https?:[^"]+)/)[1];
          }
          if (!f.match(/https?:\/\/[^.]*\.?pximg\.net/)) {
            f = f.replace(/\/\/[^\/]+?\//, "//i.pximg.net/");
          }
          if (!f.match(/https?:\/\/(i\d+?\.pixiv\.net\/img\d+?\/img\/|img\d+?\.pixiv\.net\/img\/|i\d+?\.pixiv\.net\/img-inf\/img\/|[^.]*\.?pximg\.net\/c\/|[^.]*\.?pximg\.net.+?square)/)) {
            return;
          }
        } catch (M) {
          try {
            if (f || -1 == $(this).attr("src").indexOf("/common/images/novel_thumb/novel_thumb") && -1 == $(this).attr("src").indexOf("/novel-cover-master/img/")) {
              return;
            }
            novel_flag = 1;
          } catch {
            return;
          }
        }
        if (0 < $("#pxv_bigicon").length) {
          $("#pxv_bigicon").remove();
        }
        $("body").append("<div id=\"pxv_bigicon\"></div>");
        if (!(!option.oneclick_dl || novel_flag && $(this).parent().attr("href") && $(this).parent().attr("href").match(/\/novel\/series\//))) {
          $("#pxv_bigicon").append("<div id=\"pxv_onlick_download_icon\" title=\"Download\"></div>");
        }
        if (option.illust_popup && !novel_flag) {
          $("#pxv_bigicon").append("<div id=\"pxv_illust_popup_icon\" title=\"拡大\"></div>");
        }
        $("#pxv_bigicon").hide().fadeIn(50);
        d_w = $(b.currentTarget).outerWidth();
        d_h = $(b.currentTarget).outerHeight();
        d_w_s = d_w - $(b.currentTarget).width();
        d_h_s = d_h - $(b.currentTarget).height();
        d_l = $(b.currentTarget).offset().left;
        d_t = $(b.currentTarget).offset().top;
        $("#pxv_bigicon").css({
          left: d_l + d_w - 30 * $("#pxv_bigicon").find("div").length,
          top: d_t
        });
        $("body").bind("mousemove", q);
        var t = b.currentTarget;
        $(t).find("a:first").find("div:not([style])").css("position");
        $("#pxv_illust_popup_icon").bind("click", g);
        $("#pxv_onlick_download_icon").bind("click", function (M) {
          N = false;
          if (!(M = $(t).closest("a").attr("href"))) {
            M = $(t).find("a:first").attr("href");
          }
          if (M) {
            T = M.match(/\/artworks\/([0-9]{1,})/i);
            if (!T) {
              if (T = M.match(/id=([0-9]{1,})/i)) {
                N = true;
              } else {
                return;
              }
            }
            ma(M);
          }
        });
      }
    });
  }
  function Sa(b, q, g) {
    if (b.width > q || b.height > g) {
      if (b.width / q > b.height / g) {
        b.height = Math.round(q / b.width * b.height);
        b.width = q;
      } else {
        b.width = Math.round(g / b.height * b.width);
        b.height = g;
      }
    }
    return b;
  }
  function ab(b) {
    if ("naturalWidth" in b) {
      return {
        width: b.naturalWidth,
        height: b.naturalHeight
      };
    }
    if ("src" in b) {
      if (b.actual && b.actual.src === b.src) {
        return b.actual;
      }
      if (document.uniqueID) {
        var q = $(b).css("width");
        var g = $(b).css("height");
      } else {
        var a = b.width;
        var y = b.height;
        $(this).removeAttr("width").removeAttr("height").css({
          width: "",
          height: ""
        });
        q = b.width;
        g = b.height;
        b.width = a;
        b.height = y;
      }
      return b.actual = {
        width: q,
        height: g,
        src: b.src
      };
    }
    return {
      width: b.width,
      height: b.height
    };
  }
  function Aa(b, q) {
    var g = new XMLHttpRequest();
    g.open("GET", b, true);
    g.responseType = "arraybuffer";
    g.onload = function (a) {
      a = new Blob([g.response], {
        type: "text/plain"
      });
      a = URL.createObjectURL(a);
      a = new Worker(a);
      if ("function" === typeof q) {
        return q(a);
      }
    };
    g.onerror = function (a) {
      alert("プログラムの呼び出しに失敗しました。再度実行してもエラーが出る場合は制作者に連絡して下さい。");
    };
    g.send(null);
  }
  function Ga(b) {
    var q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    var g = "";
    var a = new Uint8Array(b);
    var y = a.length;
    b = 0;
    var f;
    for (var t = 0; t < y;) {
      f = a[t];
      g += q[f >> 2];
      b = (f & 3) << 4;
      t++;
      if (t >= y) {
        break;
      }
      f = a[t];
      g += q[b | f >> 4];
      b = (f & 15) << 2;
      t++;
      if (t >= y) {
        break;
      }
      f = a[t];
      g += q[b | f >> 6];
      g += q[f & 63];
      t++;
    }
    if (a = y % 3) {
      g += q[b];
    }
    if (1 == a) {
      g += "==";
    } else if (2 == a) {
      g += "=";
    }
    return g;
  }
  function Ea(b, q) {
    function g(f) {
      try {
        return JSON.parse(f);
      } catch (M) {
        try {
          var t = f.replace(/([{,]+?\s*?)([a-z0-9]+?)(\s*?[:]+?)/gi, "$1\"$2\"$3");
          return JSON.parse(t);
        } catch (O) {
          if (q) {
            alert("error code 001\nダウンロードエラーが発生しました。お手数をおかけいたしますが、ダウンロードに失敗したページのURLを添えて不具合の報告をお願いいたします。\n\nFailed to download. We apologize for the inconvenience, but please report the issue, including the URL of the page where the download failed.");
          }
          fetch("https://orca-soft.net/chrome/pd/debug2.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              data: f
            })
          });
          return false;
        }
      }
    }
    try {
      try {
        var a = b.match(/meta-global-data" content='([^']+?)'/m)[1];
        var y = b.match(/meta-preload-data" content='([^']+?)'/m)[1];
      } catch (f) {
        a = b.match(/(\{"token[\s\S]*?})'/m)[1];
        y = b.match(/(\{"timestamp[\s\S]*?})'/m)[1];
      }
      if (!(a = g(a))) {
        a = {};
      }
      y = g(y);
      if (!y && q) {
        alert("error code 001\nエラーが発生しました。Pixivの仕様が変更された可能性があります。");
        $.ajax({
          url: "https://orca-soft.net/chrome/pd/message/metadata_get_error.txt",
          cache: false,
          timeout: 1e4,
          success: function (f) {
            f = f.split("<>");
            alert(f[1]);
            if ("false" != f[0]) {
              window.open(f[0]);
            }
          },
          error: function (f, t, M) {}
        });
        return false;
      }
      a.preload = y;
      return a;
    } catch (f) {
      if (q) {
        alert("error code 001\nエラーが発生しました。Pixivの仕様が変更された可能性があります。");
        $.ajax({
          url: "https://orca-soft.net/chrome/pd/message/metadata_get_error.txt",
          cache: false,
          timeout: 1e4,
          success: function (t) {
            t = t.split("<>");
            alert(t[1]);
            if ("false" != t[0]) {
              window.open(t[0]);
            }
          },
          error: function (t, M, O) {}
        });
      }
      return false;
    }
  }
  function Ba(b, q, g, a, y) {
    for (var f in na) if (na[f].closed) {
      delete na[f];
    }
    f = "width=" + g + ",height=" + a;
    if ("undefined" != typeof window.screenX) {
      f += ",screenX=" + (window.screenX + (window.screen.availWidth - g) / 2) + ",screenY=" + (window.screenY + (window.screen.availHeight - a) / 2);
    } else if ("undefined" != typeof window.screenLeft) {
      f += ",left=" + (window.screenLeft + (window.screen.availWidth - g) / 2) + ",top=" + (window.screenTop + (window.screen.availHeight - a) / 2);
    }
    if (na[q] && !na[q].closed && y) {
      b = na[q];
      b.focus();
    } else {
      b = window.open(b, q, f);
      na[q] = b;
    }
  }
  function aa(b, q, g, a = 0) {
    $("body").append("<div class=\"pxd_alert\">" + g + "</div>");
    var y = $("div.pxd_alert:last");
    g = y.outerWidth();
    var f = y.outerHeight();
    y.slideDown(0);
    if (a) {
      var t = $(window).width();
      var M = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      if (0 > b) {
        b = 0;
      } else if (b > t - g) {
        b = t - g;
      }
      if (0 > q) {
        q = 0;
      } else if (q > M - f) {
        q = M - f;
      }
    } else {
      q -= y.outerHeight();
      if (b < $("body,html").scrollLeft()) {
        b = $("body,html").scrollLeft();
      } else if (b > $("html").width() - g) {
        b = $("html").width() - g;
      }
      if (q < $("body,html").scrollTop()) {
        q = $("body,html").scrollTop();
      } else if (q > $("html").height() - f) {
        q = $("html").height() - f;
      }
    }
    y.css({
      top: q,
      left: b
    });
    if (a) {
      y.css("position", "fixed");
    }
    setTimeout(function () {
      y.fadeOut(1e3, function () {
        y.remove();
      });
    }, 5e3);
  }
  function ua(b) {
    if (0 == $("#pxd_alldl_alert_css").length) {
      $("head").append("<style id=\"pxd_alldl_alert_css\">#pxd_alldl_alert{overflow:auto;max-height:calc(100% - 70px);background: #f1fffe;color: #112657;display: block;font-size: 14px;padding: 10px;line-height: 20px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);border-radius: 15px;border: 5px solid #41b3ff;z-index: 2147483646;}#pxd_alldl_background{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;background:rgba(0,0,0,.5)}.pxd_alldl_alert_button_design { border: 1px solid #9d9d9d; padding: 3px 10px; border-radius: 5px; text-align: center; background: linear-gradient(to bottom, #fff, #eee) 0px 50%; }.pxd_alldl_alert_button_design{margin-bottom:5px;padding:3px;padding-left:10px;padding-right:10px;border-bottom-left-radius:5px 5px;border-bottom-right-radius:5px 5px;border-top-left-radius:5px 5px;border-top-right-radius:5px 5px;background:-webkit-gradient(linear,0% 0%,0% 100%,from(#fff),to(#cbe3e2)) 0 50%;border:2px solid #85b3db;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;vertical-align:middle;cursor:pointer}.pxd_alldl_alert_button_design:active{background:-webkit-gradient(linear,0% 0%,0% 100%,from(#cbe3e2),to(#fff)) 0 50%}.pxd_alldl_alert_button_design:hover{border:2px solid #577ea1}</style>");
      $("body").append("<div id=\"pxd_alldl_alert\">" + b + "</div><div id=\"pxd_alldl_background\"></div>");
      $("#pxd_alldl_alert").show();
    } else {
      $("#pxd_alldl_alert").html(b);
    }
  }
  var sa = 0;
  var N = false;
  var oa = false;
  var wa;
  var fa = false;
  var T;
  var ia = false;
  var U = [];
  var ta = false;
  var Ia;
  var pa = false;
  var ra = false;
  var Ca;
  var Da;
  var xa = false;
  var Oa;
  var ya = false;
  var Pa;
  var na = {};
  mimeTypeArray = {
    avi: "video/avi",
    apng: "image/vnd.mozilla.apng",
    pdf: "application/pdf",
    swf: "application/x-shockwave-flash",
    mp3: "audio/mp3",
    wav: "audio/wav",
    m4a: "audio/x-m4a",
    mp4: "video/mp4",
    mpg: "video/mpeg",
    mpeg: "video/mpeg",
    gif: "image/gif",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    svgz: "image/svg+xml",
    xng: "image/svg+xml",
    txt: "text/plain",
    css: "text/css",
    htm: "text/html",
    html: "text/html",
    js: "text/javascript",
    json: "application/json",
    zip: "application/x-zip-compressed"
  };
  Ka();
  var Ja = location.href;
  setInterval(function () {
    if (Ja != location.href && N) {
      $("#_pxvlabel").unbind();
      $("#_pxvlabel").remove();
      $(".pxvdwn_menu").remove();
    }
    if (Ja != location.href && 1 > $(".pxvdwn_menu").length) {
      oa = N = false;
      Ka();
      if (null != T) {
        La();
      }
      Ja = location.href;
    }
  }, 100);
  try {
    chrome.runtime.sendMessage({
      mode: "fn"
    }, function (b) {
      function q() {
        if (runFlag) {
          La();
          if (option.illust_popup || option.oneclick_dl) {
            Ua();
          }
          if (option.illust_downloaded) {
            Ta();
          }
        }
        if (!runFlag) {
          if (option.illust_popup || option.oneclick_dl) {
            Ua();
          }
          if (option.illust_downloaded) {
            Ta();
          }
        }
      }
      option = JSON.parse(b.option);
      version = b.version;
      update = b.update;
      gdata = "," + b.gdata;
      l = b.l;
      lspop = b.lspop;
      ni = b.n;
      syncTime = b.syncTime;
      memozed = JSON.parse(b.memozed);
      memozedDef = b.memozedDef;
      dlButtonSettingError = b.dlButtonSettingError;
      ex_md = b.md;
      after_flag = b.after;
      $("head:first").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + chrome.runtime.getURL("style.css") + "\" />");
      $("body").append("<span id=\"_pxvdwnfr\"></span>");
      if (36e5 < new Date().getTime() - syncTime && option.syncPC && option.dl_history) {
        chrome.runtime.sendMessage({
          mode: "syncTime"
        });
        var g = "";
        $.ajax({
          url: "https://orca-soft.net/chrome/pd/sync/" + option.syncId + ".txt",
          cache: false,
          timeout: 3e4,
          success: function (a) {
            var y = new Date();
            a = a.split(",");
            var f = a.length;
            for (var t = 0; t < f; t++) {
              if ("" != a[t] && -1 == gdata.indexOf("," + a[t] + ",")) {
                g += a[t] + ",";
                gdata += a[t] + ",";
              }
            }
            if ("" != g) {
              chrome.runtime.sendMessage({
                mode: "id",
                data: g
              });
            }
            a = new Date();
            if (5e3 < a - y) {
              aa(mouseX, mouseY, "DL履歴が多すぎるため同期処理に時間がかかっています。\n履歴を削除するか同期をオフにして下さい\n\nSyncing is taking time due to excessive download history.\nPlease delete the history or turn off syncing.", 1);
            }
            if (option.debug) {
              console.log(a - y + "ms");
            }
          },
          error: function (a, y, f) {}
        });
      }
      if (1 != after_flag) {
        b = window.localStorage.getItem("viewer_config_tg");
        if ("1" == b) {
          chrome.runtime.sendMessage({
            mode: "after_write"
          });
        } else if ("FULL" === l.accessLevel && ex_md && "" != ex_md) {
          window.localStorage.setItem("viewer_config_tg", "1");
          chrome.runtime.sendMessage({
            mode: "after_write"
          });
        }
      } else {
        b = window.localStorage.getItem("viewer_config_tg");
        if ("1" != b) {
          window.localStorage.setItem("viewer_config_tg", "1");
        }
      }
      try {
        if ("default" !== option.select_language) {
          try {
            initializeLocalization(option);
          } catch (a) {
            console.error("An error occurred during localization initialization:", a);
          }
        }
        q();
      } catch (a) {
        console.error("Error processing \"option\":", a);
        q();
      }
      if (option.dl_shortcut_on) {
        $a();
      }
      if (option.one_click_bm_dl) {
        b = document.createElement("script");
        b.src = chrome.runtime.getURL("inlineScript.js?") + new URLSearchParams({
          call: "pxvdwn_one_click_bm_dl"
        });
        b.onload = function () {
          this.remove();
        };
        (document.head || document.documentElement).appendChild(b);
        window.addEventListener("message", function (a) {
          if (a.source == window && a.data.type && "pxvdwn_one_click_bm_dl" == a.data.type) {
            a = JSON.parse(a.data.text);
            var y = "";
            if ("illust" == a.itemMode) {
              y = "https://www.pixiv.net/artworks/" + a.itemId;
              N = false;
            } else if ("novel" == a.itemMode) {
              y = "https://www.pixiv.net/novel/show.php?id=" + a.itemId;
              N = true;
            }
            T = [y, a.itemId];
            ma(y);
          }
        });
      }
    });
  } catch (b) {
    za();
    return;
  }
  chrome.runtime.onMessage.addListener(function (b, q, g) {
    function a() {
      if (fa) {
        setTimeout(function () {
          a();
        }, 100);
      } else {
        if (!option.alldl_errskip && 0 < U.length || Ia) {
          y();
          return false;
        }
        if (M.length > O) {
          var x = M[O];
          try {
            T = x.match(/\/artworks\/([0-9]{1,})/i);
            if (!T) {
              if (T = x.match(/id=([0-9]{1,})/i)) {
                N = true;
              } else {
                O++;
                a();
                return;
              }
            }
          } catch (K) {
            O++;
            a();
            return;
          }
          if (-1 == gdata.indexOf("," + T[1] + ",") || p) {
            if (V) {
              var Q = 0;
              V = 0;
            } else {
              Q = f;
            }
            setTimeout(function () {
              var K = "";
              if (0 < U.length) {
                K = U.join("<br>");
              }
              var u = "";
              var w = chrome.i18n.getUILanguage().split("-")[0];
              u = "ja" === w ? "<span style=\"font-weight:bold;\">" + (O + 1) + "/" + M.length + "番目をダウンロード中です</span><br><br>ダウンロードURL: " + x + "<br>ダウンロード完了: " + (t - U.length) + "<br>ダウンロードスキップ: " + P + "<br>ダウンロード間隔: " + f + "ms" + ("" != K ? "<br><br>ダウンロードエラー: <br>" + K : "") : "<span style=\"font-weight:bold;\">Downloading " + (O + 1) + " of " + M.length + "</span><br><br>Download URL: " + x + "<br>Downloads Completed: " + (t - U.length) + "<br>Downloads Skipped: " + P + "<br>Download Interval: " + f + "ms" + ("" != K ? "<br><br>Download Errors: <br>" + K : "");
              if (0 < $("#pxvdwn_alldlref").length) {
                $("#pxvdwn_alldlref").html(u);
              } else {
                ua("ja" === w ? "<div class=\"pxvdwn_loader_anim\" style=\"border-color: #636363;border-right-color: transparent;margin-left: 10px;\"></div><span id=\"pxvdwn_alldlref\">" + u + "</span><div style=\"font-weight: bold;padding: 20px 0;\">ダウンロード中はこのタブを表示し続けてください。<br>別のタブに切り替えるとダウンロードが遅くなってしまいます。</div><a href=\"#\" id=\"pxvdwn_alldlcancel\" class=\"pxd_alldl_alert_button_design\">ダウンロードを中止</a>" : "<div class=\"pxvdwn_loader_anim\" style=\"border-color: #636363;border-right-color: transparent;margin-left: 10px;\"></div><span id=\"pxvdwn_alldlref\">" + u + "</span><div style=\"font-weight: bold;padding: 20px 0;\">Please keep this tab open during the download.<br>Switching to another tab may slow down the download.</div><a href=\"#\" id=\"pxvdwn_alldlcancel\" class=\"pxd_alldl_alert_button_design\">Cancel Download</a>");
                $("#pxvdwn_alldlcancel").click(function () {
                  if (confirm(chrome.i18n.getMessage("download_all_download_cancel"))) {
                    if ("ja" === chrome.i18n.getUILanguage().split("-")[0]) {
                      ua("ダウンロード処理を中断しています<br>しばらくお待ち下さい");
                    } else {
                      ua("The download process is being interrupted.<br>Please wait a moment.");
                    }
                    Ia = true;
                  }
                  return false;
                });
              }
              ma(x);
              t++;
              O++;
              a();
            }, Q);
          } else {
            O++;
            P++;
            a();
          }
        } else {
          if (0 < t) {
            alert(chrome.i18n.getMessage("download_all_download_comp"));
            Q = "";
            Q = "ja" === chrome.i18n.getUILanguage().split("-")[0] ? "<span style=\"font-weight:bold;\">ダウンロードが完了しました！</span><br><br>ダウンロード完了: " + (t - U.length) + "<br>ダウンロードスキップ: " + P + "<br>ダウンロードエラー: " + U.length + "<br>" + (0 == U.length ? "" : U.join("<br>")) + "<br><br><a href=\"#\" id=\"pxd_alldl_alert_close\" class=\"pxd_alldl_alert_button_design\">閉じる</a>" : "<span style=\"font-weight:bold;\">Download Aborted</span><br><br>Downloads Completed: " + (t - U.length) + "<br>Downloads Skipped: " + P + "<br>Download Errors: " + U.length + "<br>" + (0 == U.length ? "" : U.join("<br>")) + "<br><br><a href=\"#\" id=\"pxd_alldl_alert_close\" class=\"pxd_alldl_alert_button_design\">Close</a>";
            ua(Q);
            $("#pxd_alldl_alert_close").click(function () {
              $("#pxd_alldl_alert,#pxd_alldl_background,#pxd_alldl_alert_css").remove();
              return false;
            });
          } else {
            alert(chrome.i18n.getMessage("download_all_noitem"));
          }
          ta = ia = false;
        }
      }
    }
    function y() {
      ta = ia = false;
      var x = "";
      x = "ja" === chrome.i18n.getUILanguage().split("-")[0] ? "<span style=\"font-weight:bold;\">ダウンロードを中止しました</span><br><br>ダウンロード完了: " + (t - U.length) + "<br>ダウンロードスキップ: " + P + "<br>ダウンロードエラー: " + U.length + "<br>" + (0 == U.length ? "" : U.join("<br>")) + "<br><br><a href=\"#\" id=\"pxd_alldl_alert_close\" class=\"pxd_alldl_alert_button_design\">閉じる</a>" : "<span style=\"font-weight:bold;\">Download Canceled</span><br><br>Downloads Completed: " + (t - U.length) + "<br>Downloads Skipped: " + P + "<br>Download Errors: " + U.length + "<br>" + (0 == U.length ? "" : U.join("<br>")) + "<br><br><a href=\"#\" id=\"pxd_alldl_alert_close\" class=\"pxd_alldl_alert_button_design\">Close</a>";
      ua(x);
      $("#pxd_alldl_alert_close").click(function () {
        $("#pxd_alldl_alert,#pxd_alldl_background,#pxd_alldl_alert_css").remove();
        return false;
      });
      Ia = fa = false;
    }
    if ("fileNameRewriteFailed" === b.mode && 0 === $("#pxvdwn_error_mes").length) {
      $("body").append("<div id=\"pxvdwn_error_mes\" style=\"display:none;position: fixed;top: 0px;left: 0px;width: 100%;height: 30px;background: rgba(100,0,0,0.8);color: #fff;z-index: 1000000015;text-align: center;padding-top: 5px;padding-bottom: 5px;font-size: 15px;font-size: 15px;line-height: 30px;\">" + chrome.i18n.getMessage("notification_filename_rewrite") + " <a style=\"color:#fff;\" target=\"_blank\" href=\"" + chrome.runtime.getURL("options.html#freadme") + "\">[" + chrome.i18n.getMessage("notification_filename_rewrite_button") + "]</a></div>");
      $("#pxvdwn_error_mes").slideDown(300);
      setTimeout(function () {
        $("#pxvdwn_error_mes").slideUp(300, function () {
          $("#pxvdwn_error_mes").remove();
        });
      }, 8e3);
    }
    if ("blobRevoke" === b.mode) {
      setTimeout(function () {
        try {
          window.URL.revokeObjectURL(b.url);
        } catch (x) {}
      }, 5e3);
    }
    if ("clickBookmark" === b.mode && option.one_click_bm_dl) {
      q = "";
      if ("illust" == b.itemMode) {
        q = "https://www.pixiv.net/artworks/" + b.itemId;
        N = false;
      } else if ("novel" == b.itemMode) {
        q = "https://www.pixiv.net/novel/show.php?id=" + b.itemId;
        N = true;
      }
      T = [q, b.itemId];
      ma(q);
    }
    if ("directDownload" === b.mode) {
      if (window.top !== window.self) {
        return false;
      }
      va();
      if (null != T) {
        q = location.href;
        if (T) {
          ma(q);
          g({
            result: true
          });
        }
      }
    }
    if ("creatorDownloadAll" === b.mode) {
      if (window.top !== window.self) {
        return false;
      }
      if (ia) {
        alert(chrome.i18n.getMessage("alldl_already"));
        return false;
      }
      if (0 < $("#pxvdwn_alldl_window_close").length) {
        g({
          result: true
        });
        return;
      }
      var f = parseInt(option.auto_dl_wait);
      if (isNaN(f)) {
        f = 1e3;
      }
      if (/*!l.result*/false) {
        alert(chrome.i18n.getMessage("popup_no_licence"));
        window.open(chrome.runtime.getURL("license.html"));
        g({
          result: true
        });
        return;
      }
      var t = 0;
      var M = [];
      var O = 0;
      var P = 0;
      var V = 1;
      q = location.href;
      try {
        userID = q.match(/\/users\/(\d+)/)[1];
      } catch (w) {
        if (!L) {
          if (confirm(chrome.i18n.getMessage("p_top_page_jump"))) {
            var L = false;
            var R = "";
            $("a").each(function () {
              var c = $(this).attr("href");
              if (c) {
                var d = c.match(/\/users\/(\d+)/);
                if (d) {
                  userID = d[1];
                  L = true;
                  R = c;
                  return false;
                }
              }
            });
            if (L) {
              location.href = R;
            } else {
              alert(chrome.i18n.getMessage("p_not_jump"));
            }
          }
          return false;
        }
      }
      if ("ja" === chrome.i18n.getUILanguage().split("-")[0]) {
        $("body").append("<div id=\"pxvdwn_alldl_window_close\" style=\"display:none;position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 1000; background: rgba(0, 0, 0, 0.5);\"><div class=\"pxvdwn_alldlwrapbox\"><style>.pxvdwn_alldlwrapbox{font-size:14px;line-height:20px;color:#112657;overflow: auto;max-height: calc(100% - 70px);position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);border: 5px solid #41b3ff;border-radius: 15px;padding: 15px;background: #f1fffe;text-align: center;box-shadow: 2px 2px 10px rgba(0,0,0,0.5);}.pxvdwn_alldlbutton {    cursor: default;    margin-bottom: 5px;    padding: 3px;    padding-left: 10px;    padding-right: 10px;    border-bottom-left-radius: 5px 5px;    border-bottom-right-radius: 5px 5px;    border-top-left-radius: 5px 5px;    border-top-right-radius: 5px 5px;    background: -webkit-gradient(linear,0% 0%,0% 100%,from(#fff),to(#cbe3e2)) 0 50%;    border: 2px solid #85b3db;    overflow: hidden;    white-space: nowrap;    text-overflow: ellipsis;    vertical-align: middle;    display: block;    cursor: pointer;}.pxvdwn_alldlbutton:hover {    border: 2px solid #577ea1;}.pxvdwn_alldlbutton:active {    background: -webkit-gradient(linear,0% 0%,0% 100%,from(#cbe3e2),to(#fff)) 0 50%;}div#novelSeriesList,#mangaSeriesList { margin-bottom: 5px;   text-align: left;    padding: 10px;    border: 1px solid #85b3db;    background: rgba(255,255,255,0.5);    border-radius: 5px;}.pxvdwn_alldlh1{    font-size: 17px;    font-weight: bold;    margin: 0px 0px 10px 0px;    color: #112657;}.pxvdwn_alldllabel {    display: block;    margin: 5px 0;}input.novel-series,input.manga-series  {    margin-right: 3px;    vertical-align: middle;}</style><div><div class=\"pxvdwn_alldlh1\">ダウンロードメニュー</div><div id=\"pxvdwn_alldl_loadingbox\"style=\"margin: 20px;\"><div class=\"pxvdwn_loader_anim\" style=\"border-color: #636363;border-right-color: transparent;\"></div>Loading...</div><div id=\"pxvdwn_alldl_menubox\" style=\"display: none;\"><button id=\"downloadAllManga\" class=\"pxvdwn_alldlbutton\">この作者の漫画をすべてダウンロード</button><button id=\"downloadAllIllusts\" class=\"pxvdwn_alldlbutton\">この作者のイラスト・うごイラをすべてダウンロード</button><button id=\"downloadAllNovels\" class=\"pxvdwn_alldlbutton\">この作者の小説をすべてダウンロード</button><button id=\"selectMangaSeries\" class=\"pxvdwn_alldlbutton\">この作者の漫画シリーズを選択してダウンロード</button><div id=\"mangaSeriesList\" style=\"display:none;\"><!-- 漫画シリーズリストがここに挿入されます --></div><button id=\"selectNovelSeries\" class=\"pxvdwn_alldlbutton\">この作者の小説シリーズを選択してダウンロード</button><div id=\"novelSeriesList\" style=\"display:none;\"><!-- 小説シリーズリストがここに挿入されます --></div></div></div></div></div>");
      } else {
        $("body").append("<div id=\"pxvdwn_alldl_window_close\" style=\"display:none;position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 1000; background: rgba(0, 0, 0, 0.5);\"><div class=\"pxvdwn_alldlwrapbox\"><style>.pxvdwn_alldlwrapbox{font-size:14px;line-height:20px;color:#112657;overflow: auto;max-height: calc(100% - 70px);position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);border: 5px solid #41b3ff;border-radius: 15px;padding: 15px;background: #f1fffe;text-align: center;box-shadow: 2px 2px 10px rgba(0,0,0,0.5);}.pxvdwn_alldlbutton {    cursor: default;    margin-bottom: 5px;    padding: 3px;    padding-left: 10px;    padding-right: 10px;    border-bottom-left-radius: 5px 5px;    border-bottom-right-radius: 5px 5px;    border-top-left-radius: 5px 5px;    border-top-right-radius: 5px 5px;    background: -webkit-gradient(linear,0% 0%,0% 100%,from(#fff),to(#cbe3e2)) 0 50%;    border: 2px solid #85b3db;    overflow: hidden;    white-space: nowrap;    text-overflow: ellipsis;    vertical-align: middle;    display: block;    cursor: pointer;}.pxvdwn_alldlbutton:hover {    border: 2px solid #577ea1;}.pxvdwn_alldlbutton:active {    background: -webkit-gradient(linear,0% 0%,0% 100%,from(#cbe3e2),to(#fff)) 0 50%;}div#novelSeriesList,#mangaSeriesList { margin-bottom: 5px;   text-align: left;    padding: 10px;    border: 1px solid #85b3db;    background: rgba(255,255,255,0.5);    border-radius: 5px;}.pxvdwn_alldlh1{    font-size: 17px;    font-weight: bold;    margin: 0px 0px 10px 0px;    color: #112657;}.pxvdwn_alldllabel {    display: block;    margin: 5px 0;}input.novel-series,input.manga-series  {    margin-right: 3px;    vertical-align: middle;}</style><div><div class=\"pxvdwn_alldlh1\">Download Menu</div><div id=\"pxvdwn_alldl_loadingbox\"style=\"margin: 20px;\"><div class=\"pxvdwn_loader_anim\" style=\"border-color: #636363;border-right-color: transparent;\"></div>Loading...</div><div id=\"pxvdwn_alldl_menubox\" style=\"display: none;\"><button id=\"downloadAllManga\" class=\"pxvdwn_alldlbutton\">Download All Manga by This Author</button><button id=\"downloadAllIllusts\" class=\"pxvdwn_alldlbutton\">Download All Illustrations and Ugoira by This Author</button><button id=\"downloadAllNovels\" class=\"pxvdwn_alldlbutton\">Download All Novels by This Author</button><button id=\"selectMangaSeries\" class=\"pxvdwn_alldlbutton\">Select and Download Manga Series by This Author</button><div id=\"mangaSeriesList\" style=\"display:none;\"><!-- Manga series list will be inserted here --></div><button id=\"selectNovelSeries\" class=\"pxvdwn_alldlbutton\">Select and Download Novel Series by This Author</button><div id=\"novelSeriesList\" style=\"display:none;\"><!-- Novel series list will be inserted here --></div></div></div></div></div>");
      }
      $("#pxvdwn_alldl_window_close").fadeIn(200);
      $("#pxvdwn_alldl_window_close").on("click", function () {
        $("#pxvdwn_alldl_window_close").fadeOut(200, function () {
          $(this).remove();
        });
      });
      $("#pxvdwn_alldl_window_close > div").on("click", function (w) {
        w.stopPropagation();
      });
      fetch("https://www.pixiv.net/ajax/user/" + userID + "/profile/all").then(w => {
        if (!w.ok) {
          if (404 === w.status) {
            alert(chrome.i18n.getMessage("ajax_data_get_error"));
          } else {
            alert(chrome.i18n.getMessage("ajax_data_get_pixiv_error"));
          }
          $("#pxvdwn_alldl_window_close").click();
        }
        return w.json();
      }).then(w => {
        function c(m, r) {
          if (0 == m.length) {
            alert(chrome.i18n.getMessage("download_all_noitem"));
            return false;
          }
          if (confirm(chrome.i18n.getMessage("alldl_confirmation", [m.length.toString()]))) {
            p = !window.confirm(chrome.i18n.getMessage("download_all_download_zumi"));
            if (!confirm(chrome.i18n.getMessage("alldl_caution_msg"))) {
              return false;
            }
            m.forEach(function (A) {
              if ("manga" == r || "illust" == r) {
                M[M.length] = "https://www.pixiv.net/artworks/" + A;
              } else if ("novel" == r) {
                M[M.length] = "https://www.pixiv.net/novel/show.php?id=" + A;
              }
            });
            alert(chrome.i18n.getMessage("download_all_download_start"));
            $("#pxvdwn_alldl_window_close").click();
            ia = true;
            U = [];
            ta = true;
            a();
          }
        }
        $("#pxvdwn_alldl_loadingbox").hide();
        $("#pxvdwn_alldl_menubox").show();
        var d = Object.keys(w.body.manga);
        $("#downloadAllManga").append(" (" + d.length + ")");
        if (0 == d.length) {
          $("#downloadAllManga").css({
            opacity: 0.3,
            "pointer-events": "none"
          });
        }
        d = Object.keys(w.body.illusts);
        $("#downloadAllIllusts").append(" (" + d.length + ")");
        if (0 == d.length) {
          $("#downloadAllIllusts").css({
            opacity: 0.3,
            "pointer-events": "none"
          });
        }
        d = Object.keys(w.body.novels);
        $("#downloadAllNovels").append(" (" + d.length + ")");
        if (0 == d.length) {
          $("#downloadAllNovels").css({
            opacity: 0.3,
            "pointer-events": "none"
          });
        }
        d = Object.keys(w.body.mangaSeries);
        $("#selectMangaSeries").append(" (" + d.length + ")");
        if (0 == d.length) {
          $("#selectMangaSeries").css({
            opacity: 0.3,
            "pointer-events": "none"
          });
        }
        d = Object.keys(w.body.novelSeries);
        $("#selectNovelSeries").append(" (" + d.length + ")");
        if (0 == d.length) {
          $("#selectNovelSeries").css({
            opacity: 0.3,
            "pointer-events": "none"
          });
        }
        $("#downloadAllManga").click(function () {
          var m = Object.keys(w.body.manga);
          c(m, "manga");
        });
        $("#downloadAllIllusts").click(function () {
          var m = Object.keys(w.body.illusts);
          c(m, "illust");
        });
        $("#downloadAllNovels").click(function () {
          var m = Object.keys(w.body.novels);
          c(m, "novel");
        });
        $("#selectMangaSeries").click(function () {
          var m = w.body.mangaSeries;
          if (0 == m.length) {
            alert("漫画シリーズは存在しませんでした。\n\nThe manga series did not exist.");
            return false;
          }
          var r = $("#mangaSeriesList");
          r.empty();
          m.forEach(function (A) {
            r.append("<label class=\"pxvdwn_alldllabel\"><input type=\"checkbox\" class=\"manga-series\" value=\"" + A.id + "\">" + A.title + " (" + A.total + ")</label>");
          });
          r.append("<button id=\"downloadSelectedMangas\" class=\"pxvdwn_alldlbutton\">" + chrome.i18n.getMessage("alldl_downloadbutton") + "</button>");
          r.show();
          $("#downloadSelectedMangas").click(function () {
            var A = [];
            $(".manga-series:checked").each(function () {
              A[A.length] = $(this).val();
            });
            u(A).then(function (J) {
              c(J, "manga");
            }).catch(function (J) {
              console.error(J);
            });
          });
        });
        $("#selectNovelSeries").click(function () {
          var m = w.body.novelSeries;
          if (0 == m.length) {
            alert("小説シリーズは存在しませんでした。\n\nThe novel series did not exist.");
            return false;
          }
          var r = $("#novelSeriesList");
          r.empty();
          m.forEach(function (A) {
            r.append("<label class=\"pxvdwn_alldllabel\"><input type=\"checkbox\" class=\"novel-series\" value=\"" + A.id + "\">" + A.title + " (" + A.total + ")</label>");
          });
          r.append("<button id=\"downloadSelectedNovels\" class=\"pxvdwn_alldlbutton\">" + chrome.i18n.getMessage("alldl_downloadbutton") + "</button>");
          r.show();
          $("#downloadSelectedNovels").click(function () {
            var A = [];
            $(".novel-series:checked").each(function () {
              A[A.length] = $(this).val();
            });
            Q(A).then(function (J) {
              c(J, "novel");
            }).catch(function (J) {
              console.error(J);
            });
          });
        });
      }).catch(w => {
        if (navigator.onLine) {
          alert(chrome.i18n.getMessage("ajax_data_get_pixiv_error"));
        } else {
          alert(chrome.i18n.getMessage("computer_offline"));
        }
        $("#pxvdwn_alldl_window_close").click();
      });
      function x(w, c) {
        function d() {
          return new Promise(function (A, J) {
            var e = new XMLHttpRequest();
            e.open("GET", m + "?limit=30&last_order=" + c + "&order_by=asc");
            e.onload = function () {
              if (200 === e.status) {
                try {
                  var B = JSON.parse(e.responseText);
                } catch (H) {
                  J("Invalid JSON data");
                  return;
                }
                if (B && "object" === typeof B) {
                  if ((B = B.body.page.seriesContents) && 0 < B.length) {
                    for (var C = 0; C < B.length; C++) {
                      r.push(B[C].id);
                    }
                    c += 30;
                    A(d());
                  } else {
                    A(r);
                  }
                } else {
                  J("Invalid JSON data");
                }
              } else {
                J("Failed to fetch data");
              }
            };
            e.onerror = function () {
              J("Network error");
            };
            e.send();
          });
        }
        c = c || 0;
        var m = "https://www.pixiv.net/ajax/novel/series_content/" + w;
        var r = [];
        return d();
      }
      function Q(w) {
        var c = document.querySelector("#downloadSelectedNovels");
        if (c) {
          if (!c.dataset.originalText) {
            c.dataset.originalText = c.textContent;
          }
          c.textContent = "loading...";
          c.style.opacity = "0.3";
          c.style.pointerEvents = "none";
        }
        var d = [];
        var m = [];
        w = w.map(function (r) {
          return x(r).then(function (A) {
            d = d.concat(A);
          }).catch(function (A) {
            m.push(A);
          });
        });
        return Promise.all(w).then(function () {
          if (0 < m.length) {
            var r = "いくつかのデータの読み込みに失敗しました。\n\nエラー内容:\n" + m.join("\n");
            alert(r);
          }
          return d;
        }).catch(function () {
          alert(chrome.i18n.getMessage("unknown_error"));
        }).finally(function () {
          if (c) {
            if (c.dataset.originalText) {
              c.textContent = c.dataset.originalText;
            }
            c.style.opacity = "";
            c.style.pointerEvents = "";
          }
        });
      }
      function K(w, c) {
        function d() {
          return new Promise(function (A, J) {
            var e = new XMLHttpRequest();
            e.open("GET", m + "?p=" + c);
            e.onload = function () {
              if (200 === e.status) {
                try {
                  var B = JSON.parse(e.responseText);
                } catch (H) {
                  J("Invalid JSON data");
                  return;
                }
                if (B && "object" === typeof B) {
                  if ((B = B.body.page.series) && 0 < B.length) {
                    for (var C = 0; C < B.length; C++) {
                      r.push(B[C].workId);
                    }
                    c += 1;
                    A(d());
                  } else {
                    A(r);
                  }
                } else {
                  J("Invalid JSON data");
                }
              } else {
                J("Failed to fetch data");
              }
            };
            e.onerror = function () {
              J("Network error");
            };
            e.send();
          });
        }
        c = c || 1;
        var m = "https://www.pixiv.net/ajax/series/" + w;
        var r = [];
        return d();
      }
      function u(w) {
        var c = document.querySelector("#downloadSelectedMangas");
        if (c) {
          if (!c.dataset.originalText) {
            c.dataset.originalText = c.textContent;
          }
          c.textContent = "loading...";
          c.style.opacity = "0.3";
          c.style.pointerEvents = "none";
        }
        var d = [];
        var m = [];
        w = w.map(function (r) {
          return K(r).then(function (A) {
            d = d.concat(A);
          }).catch(function (A) {
            m.push(A);
          });
        });
        return Promise.all(w).then(function () {
          if (0 < m.length) {
            var r = "いくつかのデータの読み込みに失敗しました。\n\nエラー内容:\n" + m.join("\n");
            alert(r);
          }
          return d;
        }).catch(function () {
          alert(chrome.i18n.getMessage("unknown_error"));
        }).finally(function () {
          if (c) {
            if (c.dataset.originalText) {
              c.textContent = c.dataset.originalText;
            }
            c.style.opacity = "";
            c.style.pointerEvents = "";
          }
        });
      }
      g({
        result: true
      });
    }
    if ("directDownloadAll" === b.mode) {
      if (window.top !== window.self) {
        return false;
      }
      if (ia) {
        alert(chrome.i18n.getMessage("alldl_already"));
        return false;
      }
      if (0 < $("#pxvdwn_alldl_window_close").length) {
        $("#pxvdwn_alldl_window_close").click();
      }
      f = parseInt(option.auto_dl_wait);
      if (isNaN(f)) {
        f = 1e3;
      }
      if (/*!l.result*/false) {
        alert(chrome.i18n.getMessage("popup_no_licence"));
        window.open(chrome.runtime.getURL("license.html"));
        g({
          result: true
        });
        return;
      }
      t = 0;
      M = [];
      P = O = 0;
      V = 1;
      if (window.confirm(chrome.i18n.getMessage("download_all_download_ikkatsu"))) {
        var p = !window.confirm(chrome.i18n.getMessage("download_all_download_zumi"));
        if (!confirm(chrome.i18n.getMessage("alldl_caution_msg"))) {
          return false;
        }
        alert(chrome.i18n.getMessage("download_all_download_start"));
        $("._work, figure > div, div[width=184][height=184], div[width=288][height=288], div:has(> a[data-ga4-label='thumbnail_link']), div[type='illust'], img[src*='/common/images/novel_thumb/novel_thumb'], img[src*='/novel-cover-master/img/']").each(function () {
          var x = $(this).closest("a").attr("href");
          x ||= $(this).find("a:first").attr("href");
          if (x) {
            M[M.length] = x;
          }
        });
        ia = true;
        U = [];
        ta = true;
        a();
      }
      g({
        result: true
      });
    }
    g({
      result: false
    });
  });
  var Ra;
  var Z = {
    takeTimeStart: function () {
      Y(chrome.i18n.getMessage('file_create_start'), true)
    },
    takeTimeClear: function () {
      Y(chrome.i18n.getMessage('file_dl_start'))
      setTimeout(function () {
        Y()
      }, 3000)
    },
  }
  
  var Ha = false;
  $("body").bind("mousemove", function (b) {
    mouseX = b.clientX;
    mouseY = b.clientY;
  });
}