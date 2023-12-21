async function bootAnimation() {
    // Startup animation here
    TerminalWriteAnimationSpeed = 20;
    // speed up writing speed

    let message =`
WEB TERMINAL INTERFACE v0.3



                     *%&/
                     *%&(,
 *%&/           *%&/   *#@#,
   ,#@#,        *%&(,   (@#,     .(@#,
      /&&/        ,#@#,         .*#@#,
        .(@#,                  *%&/.
      /&&/                 .*#@#*
   ,#@#,              .*#@@@&/.
 *%&/           *%@@@@@&(,.




`.split(`
`);//                        It should say "Terminal v0.3"
    for (let i = 0; i < message.length; i++) {
        // for each line
        TerminalWriteAnimated(message[i]);
        await sleep(100);
    }
    console.log("bootAnimation : message.", message);
    await sleep(500);
    TerminalWriteStatic();
    TerminalWriteStatic("type 'license' to view the license.");
    TerminalWriteStatic();
    TerminalWriteStatic("As you may know, this is a terminal.");
    TerminalWriteStatic();

    if (screen.height > screen.width && screen.width < 1024) {
        // warn phone and tablet users >:)
      TerminalWriteStatic("Terminals generally work on computers !!", "error")
    }
}

bootAnimation();