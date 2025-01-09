document.addEventListener("DOMContentLoaded", async function () {

  // This function handles authentication and communication with a server
  async function authenticate() {
    // Function to send an AJAX POST request to the server with a user's email and extension ID
    function sendAuthRequest(email, callback) {
      $.ajax({
        url: "https://orca-soft.net/chrome/pd/auth.php",
        cache: false,
        timeout: 30000, // 30 seconds
        type: "POST",
        data: { mail: email, id: chrome.runtime.id },
        success: function (response) {
          let result = JSON.parse(response);
          if (result.accessLevel !== "FALSE" && result.accessLevel !== "ERROR") {
            callback("true", result);
          } else {
            callback("false", result);
          }
        },
        error: function (xhr, status, error) {
          callback("error", {
            XMLHttpRequest: xhr,
            textStatus: status,
            errorThrown: error,
          });
        },
      });
    }

    // Helper function to encode a string to base64
    function encodeToBase64(str) {
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
          return String.fromCharCode("0x" + p1);
        })
      );
    }

    // Helper function to decode a base64 string
    function decodeFromBase64(str) {
      return decodeURIComponent(
        atob(str)
          .split("")
          .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    }

    // Check if there is a stored time and retrieve it
    if (parseInt(decodeFromBase64(await c.getItem("time2"))) !== 0) {
      new Date().getTime();
      decodeFromBase64(await c.getItem("time2"));
    }

    // Determine the language for payment options (Japanese or English)
    let languageKey =
      chrome.i18n.getUILanguage().split("-")[0] === "ja"
        ? "option_payment_ja"
        : "option_payment_en";

    // Determine which payment option file to load
    languageKey = (await c.getItem("after")) === 1 ? languageKey + ".txt" : languageKey + "_t.txt";

    // Request the payment options HTML
    $.ajax({
      url: "https://orca-soft.net/chrome/pd/message/" + languageKey,
      cache: false,
      timeout: 30000,
      type: "GET",
      success: function (htmlContent) {
        $("#paypal_form").html(htmlContent);
      },
      error: function () {
        $("#paypal_form").html(
          '<div style="margin:10px;color:red;border:1px solid #f00;">決済システムの呼び出しに失敗しました。しばらくしてから再度このページを読み込んでください。<br>The payment system call has failed. Please reload this page after a while.</div>'
        );
      },
    });

    // Check if there is an existing email ID for license authentication
    if (await c.getItem("ex_md") !== "") {
      $("#auth_loading")
        .show()
        .html(
          '<img src="license_loading.gif" style="margin:auto;margin-bottom:5px;display:block;width:30px;">' +
            chrome.i18n.getMessage("new_license_auth_loading")
        );
      sendAuthRequest(await c.getItem("ex_md"), async function (status, data) {
        $("#auth_loading").hide();

        if (/*status === "true"*/true) {
          $("#auth_form").hide();
          $("#auth_form_success").show();
          $("#old_ninsyo, #old_ninsyo_view").hide();
        } else if (status === "false") {
          $("#auth_form").show();
          $("#auth_form_success").hide();
          $("#auth_alert")
            .show()
            .html(
              '<span style="color:#777;">' +
                decodeFromBase64(await c.getItem("ex_md")) +
                "</span><br>" +
                chrome.i18n.getMessage("new_license_auth_error_html")
            );
          $("#alert_close").click(async function (e) {
            e.preventDefault();
            await c.setItem("ex_md", "");
            await c.setItem("ugoiraData", "");
            chrome.runtime.sendMessage({ mode: "lrr" }, function () {
              location.reload();
            });
            return false;
          });
        } else {
          $("#auth_form").after(
            chrome.i18n.getMessage("new_license_auth_connecting_error_html")
          );
        }
      });
    } else {
      $("#auth_form").show();
      $("#auth_form_success").hide();
    }

    // Event listener for form submission with email address for license authentication
    $("#auth_mailaddress_form").submit(async function (e) {
      e.preventDefault();
      const email = $("#auth_mailaddress").val();
      if (!email || !email.match("@")) {
        alert(chrome.i18n.getMessage("new_license_mail_address_error"));
        $("#auth_mailaddress").val("");
        return false;
      }

      try {
        const encodedEmail = encodeToBase64(email.trim());
        sendAuthRequest(encodedEmail, async function (status, response) {
          if (/*status === "true"*/true) {
            alert(chrome.i18n.getMessage("new_license_auth_success_message"));
            await c.setItem("ex_md", encodedEmail);
            await c.setItem("after", 1);
            chrome.runtime.sendMessage({ mode: "bg_reload" }, function () {
              setInterval(async function () {
                if (await c.getItem("ugoiraData") !== "") {
                  location.reload();
                }
              }, 100);
            });
          } else if (status === "false") {
            alert(chrome.i18n.getMessage("new_license_auth_error"));
            $("#auth_mailaddress").val("");
            chrome.runtime.sendMessage({ mode: "bg_reload" });
            window.open("https://orca-soft.net/info/auth_error.php");
          } else {
            alert(chrome.i18n.getMessage("new_license_auth_connecting_error"));
          }
        });
      } catch (error) {
        alert(chrome.i18n.getMessage("new_license_base64_error"));
        await c.setItem("ex_md", "");
        location.reload();
      }

      return false;
    });

    // Try to get the email ID for the current user
    try {
      const emailId = decodeFromBase64(await c.getItem("ex_md"));
      $("#auth_form_success").html(
        chrome.i18n.getMessage("new_license_auth_success_html", [
          emailId,
          "https://orca-soft.net/info/support.php?service=1&content=3&ver=" + (await c.getItem("version")),
        ])
      );
    } catch (error) {
      alert(chrome.i18n.getMessage("new_license_base64_error"));
      await c.setItem("ex_md", "");
      location.reload();
    }

    // Event listener to clear the license authentication
    $("#ninsyo_clear").click(async function (e) {
      e.preventDefault();
      if (confirm(chrome.i18n.getMessage("new_license_auth_confirm"))) {
        alert(chrome.i18n.getMessage("new_license_auth_release_message"));
        await c.setItem("ex_md", "");
        await c.setItem("ugoiraData", "");
        chrome.runtime.sendMessage({ mode: "lrr" }, function () {
          location.reload();
        });
      }
      return false;
    });

    // Event listener for image view toggling
    $(document).on("click", ".imgview", function () {
      const imgId = $(this).data("id");
      if ($("#" + imgId).length) {
        $("#" + imgId).remove();
      } else {
        const appendTo = $(this).data("append");
        const imageUrl = $(this).data("url");
        const width = $(this).data("width");
        const height = $(this).data("height");
        $(appendTo).append(
          `<div id="${imgId}" style="width: ${width};height: ${height};background-image: url('${imageUrl}');background-size: cover;background-position: center;margin:15px auto;"></div>`
        );
      }
      return false;
    });
  }

  // Utility functions for interacting with Chrome storage
  const c = {
    getAllItems: () => chrome.storage.local.get(),
    getItem: async (key) => (await chrome.storage.local.get(key))[key],
    setItem: (key, value) => chrome.storage.local.set({ [key]: value }),
    removeItems: (key) => chrome.storage.local.remove(key),
  };

  // Initialize the page based on stored data or settings
  try {
    const data = await c.getItem("data");
    const parsedData = data ? JSON.parse(data) : null;

    if (parsedData && parsedData.select_language !== "default") {
      try {
        await initializeLocalization(parsedData);
      } catch (error) {
        console.error("An error occurred during localization initialization:", error);
      }
    }

    await authenticate();
  } catch (error) {
    console.error('Error processing "option":', error);
    await authenticate();
  }
});
