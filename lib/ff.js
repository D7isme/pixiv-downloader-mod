let sessions = {};
async function createFFmpegInstance() {
  const a = FFmpeg.createFFmpeg({
    mainName: "main",
    corePath: chrome.runtime.getURL("lib/ffmpeg-core.js"),
  });
  await a.load();
  return a;
}
function base64ToUint8Array(a) {
  a = atob(a);
  const d = a.length,
    b = new Uint8Array(d);
  for (let c = 0; c < d; c++) b[c] = a.charCodeAt(c);
  return b;
}
window.addEventListener("message", async (a) => {
  a = a.data;
  const { cmd: d, requestId: b } = a;
  if (("start" === d || "frameAdd" === d || "finish" === d) && !b)
    console.warn("No requestId specified.");
  else if ("start" === d)
    (a = {
      ffmpeg: await createFFmpegInstance(),
      frames: [],
      canvasSize: { w: a.width || 640, h: a.height || 480 },
      frameCount: 0,
    }),
      (sessions[b] = a),
      window.parent.postMessage({ cmd: "setup_comp", requestId: b }, "*");
  else if ("frameAdd" === d) {
    var c = sessions[b];
    if (c) {
      var { ffmpeg: e, frameCount: f } = c,
        g = `frame${f}.jpg`,
        l = base64ToUint8Array(a.imgData);
      await e.FS("writeFile", g, l);
      c.frames.push({ name: g, delay: a.delay });
      c.frameCount++;
      window.parent.postMessage(
        { cmd: "percent", requestId: b, percent: c.frameCount },
        "*"
      );
    } else console.warn("No session found for requestId:", b);
  } else if ("finish" === d) {
    var h = sessions[b];
    if (h) {
      var { ffmpeg: m, frames: n } = h;
      h = "";
      for (let k = 0; k < n.length; k++)
        (h += `file '${n[k].name}'\n`),
          (h += `duration ${(n[k].delay / 1e3).toFixed(3)}\n`);
      await m.FS("writeFile", "input.txt", new TextEncoder().encode(h));
      try {
        (g = parseCommandLine(a.ffcmd)),
          await m.run(...g),
          (l = m.FS("readFile", "output.mp4")),
          (c = new Uint8Array(l)),
          window.parent.postMessage(
            { cmd: "finish", requestId: b, output: c },
            "*"
          );
      } catch (k) {
        console.error("FFmpeg processing error:", k),
          window.parent.postMessage(
            { cmd: "error", message: "FFmpeg processing error" },
            "*"
          );
      }
      delete sessions[b];
    } else console.warn("No session found for requestId:", b);
  }
});
function parseCommandLine(a) {
  a = a.trim();
  let d = [],
    b = "",
    c = !1,
    e = 0;
  for (; e < a.length; ) {
    var f = a[e];
    if ('"' === f) {
      f = 0;
      for (let g = e - 1; 0 <= g && "\\" === a[g]; g--) f++;
      0 === f % 2
        ? (c = !c)
        : (b = b.slice(0, b.length - (Math.floor(f / 2) + 1)) + '"');
      e++;
    } else if (!c && /\s/.test(f))
      for (
        0 < b.length && (d.push(b), (b = "")), e++;
        e < a.length && /\s/.test(a[e]);

      )
        e++;
    else (b += f), e++;
  }
  0 < b.length && d.push(b);
  return d;
}
