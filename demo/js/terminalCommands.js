TerminalCreateCommand("help", function (subject) {
    if (subject[0]) {
        TerminalWriteStatic(`No help for "${subject[0]}" is available yet.`);
    } else {
        TerminalWriteStatic();
        TerminalWriteStatic("List of valid commands :", "important");
        TerminalCommands.forEach((command, i) => {
            TerminalWriteStatic(` ${i + 1}. ${command.name}`);
        });
    }
});

TerminalCreateCommand("write", function (output) {
    TerminalWriteStatic(output.join(" "));
});

TerminalCreateCommand("clear", function () {
    TerminalClear();
});

TerminalCreateCommand("license", function () {
    // Go to the license file.
    location.assign("LICENSE");
});

TerminalCreateCommand("osver", function () {
    TerminalWriteAnimationSpeed = 100;
    TerminalWriteStatic();
    TerminalWriteStatic("Terminal Interface v0.3", "info");
    TerminalWriteStatic();
    TerminalWriteStatic("Hello World!");
    TerminalWriteStatic("type 'help' !");
    (async function(){
        /* 
                  ALERT
            IT IS IMPRACTICAL TO
            CALL OTHER SCRIPTS'     ||
            FUNCTION IF UNNECESSARY \/
        */
        await sleep(500);
        TerminalWriteAnimated("Good Luck!");
    }());
});

TerminalCreateCommand("nav", function (target) {
	target = target.map((w)=>escape(w)).join(" ");
	let message = TerminalWriteStatic(`Navigating to ${target}`);
	try {
		location.href = `https://${encodeURIComponent(target)}`;
	}catch(error){
		console.log("Navigation Error : this might be the user's fault.");
		message.remove();
		TerminalWriteStatic("The URL is invalid.", "error");
		TerminalWriteStatic("Valid URLs : example.org or www.example.org", "error");
	}
});

TerminalCreateCommand("exit", async function () {
	let shutDown = TerminalWriteStatic(`Shutting down ...`);
	await sleep(300);
	for(let i = 5; i > 0;i--){
		shutDown.innerText = `Shutting down in ${i}`;
		await sleep(1000);
	}
    location.assign("about:blank");
});

TerminalCreateCommand("restart", async function () {
	TerminalWriteStatic('Restarting ...');
	await sleep(500);
    location.reload();
});