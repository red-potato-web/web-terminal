(async function() {
    // Startup animation here
    TerminalWriteAnimationSpeed = 20;
    // speed up writing speed

    let message = `
 ________                                __                   __                 ______      ______
|        \\                              |  \\                 |  \\               /      \\    /      \\
 \\▓▓▓▓▓▓▓▓ ______   ______  ______ ____  \\▓▓_______   ______ | ▓▓     __     __|  ▓▓▓▓▓▓\\  |  ▓▓▓▓▓▓\\
   | ▓▓   /      \\ /      \\|      \\    \\|  \\       \\ |      \\| ▓▓    |  \\   /  \\ ▓▓▓\\| ▓▓   \\▓▓__| ▓▓
   | ▓▓  |  ▓▓▓▓▓▓\\  ▓▓▓▓▓▓\\ ▓▓▓▓▓▓\\▓▓▓▓\\ ▓▓ ▓▓▓▓▓▓▓\\ \\▓▓▓▓▓▓\\ ▓▓     \\▓▓\\ /  ▓▓ ▓▓▓▓\\ ▓▓    |     ▓▓
   | ▓▓  | ▓▓    ▓▓ ▓▓   \\▓▓ ▓▓ | ▓▓ | ▓▓ ▓▓ ▓▓  | ▓▓/      ▓▓ ▓▓      \\▓▓\\  ▓▓| ▓▓\\▓▓\\▓▓   __\\▓▓▓▓▓\\
   | ▓▓  | ▓▓▓▓▓▓▓▓ ▓▓     | ▓▓ | ▓▓ | ▓▓ ▓▓ ▓▓  | ▓▓  ▓▓▓▓▓▓▓ ▓▓       \\▓▓ ▓▓ | ▓▓_\\▓▓▓▓__|  \\__| ▓▓
   | ▓▓   \\▓▓     \\ ▓▓     | ▓▓ | ▓▓ | ▓▓ ▓▓ ▓▓  | ▓▓\\▓▓    ▓▓ ▓▓        \\▓▓▓   \\▓▓  \\▓▓▓  \\\\▓▓    ▓▓
    \\▓▓    \\▓▓▓▓▓▓▓\\▓▓      \\▓▓  \\▓▓  \\▓▓\\▓▓\\▓▓   \\▓▓ \\▓▓▓▓▓▓▓\\▓▓         \\▓     \\▓▓▓▓▓▓ \\▓▓ \\▓▓▓▓▓▓`
.split(`
`);//       It says "Terminal v0.3"
    for (let i = 0; i < message.length; i++) {
        // for every line
        TerminalWriteAnimated(message[i]);
        await sleep(100);
    }
    await sleep(500);
    TerminalWriteStatic();
    TerminalWriteStatic("type 'license' to view the license.");
    TerminalWriteStatic();
    TerminalWriteStatic("Welcome to the terminal!");
    TerminalWriteStatic();

    if (screen.height > screen.width && screen.width < 1024) {
        // warn phone and tablet users >:)
      TerminalWriteStatic("Terminals generally run on computers !!", "error")
    }
}());