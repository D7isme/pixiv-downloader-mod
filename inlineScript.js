(function () {
  var params = new URLSearchParams(document.currentScript.src.split("?")[1]);
  var call = params.get("call");
  if (call === "pxvdwn_one_click_bm_dl")
    try {
      if (pxvdwn_one_click_bm_dl_start_flag);
    } catch (e) {
      pxvdwn_one_click_bm_dl_start_flag = true;
      var originalFetch = window.fetch;
      window.fetch = async (url, options) => {
        try {
          if (typeof url === "string")
            if (
              url.indexOf("/ajax/novels/bookmarks/add") != -1 ||
              url.indexOf("/ajax/illusts/bookmarks/add") != -1 ||
              url.indexOf("/rpc/index.php") != -1
            )
              if (options && options.body) {
                var postData = JSON.parse(options.body);
                var mode = "";
                var itemMode = "";
                if (postData.illust_id) {
                  if (postData.illust_id instanceof Array)
                    postData.illust_id = postData.illust_id[0];
                  itemId = postData.illust_id;
                  itemMode = "illust";
                } else if (postData.novel_id) {
                  if (postData.novel_id instanceof Array)
                    postData.novel_id = postData.novel_id[0];
                  itemId = postData.novel_id;
                  itemMode = "novel";
                }
                window.postMessage(
                  {
                    type: "pxvdwn_one_click_bm_dl",
                    text:
                      '{"itemId":"' +
                      itemId +
                      '","itemMode":"' +
                      itemMode +
                      '"}',
                  },
                  "*"
                );
              }
        } catch (e) {}
        return originalFetch(url, options);
      };
    }
})();
