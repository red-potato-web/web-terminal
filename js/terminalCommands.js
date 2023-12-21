TerminalCommands.push(new TerminalCommand("help", function (subject) {
    if (subject[0]) {
        TerminalWriteStatic(`No help for "${subject[0]}" is available yet.`);
    } else {
        TerminalWriteStatic();
        TerminalWriteStatic("List of valid commands :", "important");
        TerminalCommands.forEach((command, i) => {
            TerminalWriteStatic(` ${i + 1}. ${command.name}`);
        });
    }
}));

TerminalCommands.push(new TerminalCommand("write", function (output) {
    TerminalWriteStatic(output.join(" "));
}));

TerminalCommands.push(new TerminalCommand("clear", function () {
    TerminalClear();
}));

TerminalCommands.push(new TerminalCommand("license", function () {
    // Go to the license file.
    location.assign("LICENSE.md");
}));

TerminalCommands.push(new TerminalCommand("osver", function () {
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
}));

TerminalCommands.push(new TerminalCommand("nav", function (target) {
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
}));

TerminalCommands.push(new TerminalCommand("exit", async function () {
	let shutDown = TerminalWriteStatic(`Shutting down ...`);
	await sleep(300);
	for(let i = 5; i > 0;i--){
		shutDown.innerText = `Shutting down in ${i}`;
		await sleep(1000);
	}
    location.assign("about:blank");
}));

TerminalCommands.push(new TerminalCommand("restart", async function (params) {
	if(/(-|\/)soft/.test(params[0])){
		(function (){
			TerminalClear();
			bootAnimation();
		}());
		return;
	}
	TerminalWriteStatic('Restarting ...');
	await sleep(500);
    location.reload();
}));