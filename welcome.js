$(function () {
  $("#wel_form").submit(function () {
    $this = $("#wel_form").find("button");
    $this.html("please wait...");
    setTimeout(function () {
      $("#contents").fadeOut(1e3);
      setTimeout(function () {
        location.href = "options.html";
      }, 1300);
    }, 2e3);
    return !1;
  });
});
