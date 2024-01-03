// Terminal Interface

// Expect ES6


const $ = (e) => document.getElementById(e);

function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}

const TerminalContainer = $("terminal-container");
const TerminalPrompt = $("terminal-prompt");
const TerminalPromptTyped = $("terminal-prompt-typed");
const TerminalPromptInput = $("terminal-prompt-input");

// Clear input before starting
// to prevent issues.
// - The browser remembers the input.
TerminalPromptInput.value = "";

function TerminalPromptFocus() {
    /*
     If the terminal prompt is clicked,
     focus on `TerminalPromptInput`
    */
    TerminalPromptInput.focus();
}
TerminalPrompt.addEventListener("click", TerminalPromptFocus);

function TerminalPromptOnKey(event = window.event) {
    if (event.key == "Enter") {
        /*
        If the user hit Enter prevent default behavior,
        clear the input and process it.
        */
        event.preventDefault();
        let input = TerminalPromptInput.value;
        TerminalPromptInput.value = TerminalPromptTyped.innerText = "";
        if (input) {
            TerminalProcessInput(input);
        }
    } else if (/^Arrow/.test(event.key)) {
        // if event.key starts with "Arrow"

        event.preventDefault();
    } else {
        TerminalScrollBottom();
        TerminalPromptTyped.innerText = TerminalPromptInput.value;
    }
}

TerminalPromptInput.addEventListener("keyup", TerminalPromptOnKey);
TerminalPromptInput.addEventListener("keydown", TerminalPromptOnKey);
TerminalPromptInput.addEventListener("keypress", TerminalPromptOnKey);

// Keep the browser from scrolling back
history.scrollRestoration = "manual";

function TerminalScrollBottom() {
    TerminalContainer.scrollTop = TerminalContainer.scrollHeight;
}

class TerminalCommand {
    // A simple structure for commands
    constructor(name, action){
        this.name = name;
        this.action = action;
    }
}
/**
 * @type {TerminalCommand[]}
 */
let TerminalCommands = [];

/**
 * @param {String} name 
 * @param {Function} action
 */
function TerminalCreateCommand (name, action){
    TerminalCommands.push(
        new TerminalCommand(name, action)
    );
}

function TerminalProcessInput(input) {
    TerminalPrompt.removeEventListener("click", TerminalPromptFocus);

    if (input.trim() === "" || input.substring(0, 1) === " ") {
        TerminalWriteStatic("Empty input.", "error");
        console.log("INPUT: Empty input.");
        return;
    }

    TerminalPromptSuggestCommand(input);

    let CommandSuccess = false;
    let args = input.split(" ");// ["echo", "XZ08"]

    TerminalCommands.forEach((command) => {
        if (new RegExp(`^${command.name}`, "i").test(input)) {
            // Example : >echo XZ08

            CommandSuccess = true;// Set success flag.

            command.action(args.slice(1, args.length));// ["XZ08"]
            return;
        }
    });
    if (!CommandSuccess) {
        TerminalWriteStatic(`The command "${args[0]}" is invalid.`, "error");
    }
    TerminalScrollBottom();
    TerminalPrompt.addEventListener("click", TerminalPromptFocus);
}

// SUGGESTIONS

let TerminalSuggestions = [];

let TerminalCurrentSuggestion = 0;

function TerminalSuggestionOnKey(event){
    switch(event.key){
        case "ArrowUp":
            TerminalPromptSuggestUp();
            break;
        case "ArrowDown":
            TerminalPromptSuggestDown();
            break;
        default:
            break;
    }
}

TerminalPromptInput.addEventListener("keydown", TerminalSuggestionOnKey);

function TerminalPromptSuggestUp(){
    if (1 <= TerminalCurrentSuggestion) {
        TerminalCurrentSuggestion--;// Go to the previous suggestion
    }
    // Update the input
    TerminalPromptInput.value = TerminalSuggestions[TerminalCurrentSuggestion];
    TerminalPromptTyped.innerText = TerminalPromptInput.value;
}

function TerminalPromptSuggestDown(){
    if (TerminalCurrentSuggestion < TerminalSuggestions.length) {
        TerminalCurrentSuggestion++;// Go to the next suggestion
    }
    // Update the input
    TerminalPromptInput.value = TerminalSuggestions[TerminalCurrentSuggestion] || "";
    TerminalPromptTyped.innerText = TerminalPromptInput.value;
}

function TerminalPromptSuggestCommand(command){
    if (TerminalSuggestions.length >= 5) {
        // The maximum number of suggestions is 5

        TerminalSuggestions.shift();
    }
        TerminalSuggestions.push(command);
    TerminalCurrentSuggestion = TerminalSuggestions.length - 1;
}

// OUTPUT

function TerminalCreateLine(lineClass = "output") {
    let output = document.createElement("pre");
    output.classList.add(lineClass);
    TerminalContainer.insertBefore(output, TerminalPrompt);
    return output;
}

/**
 * @param {String} output
 * @param {String} [type]
 */
function TerminalWriteStatic(output = "", type) {
    output += "\n";
    let outputParagraph = TerminalCreateLine(type);
    outputParagraph.innerText = output;
    return outputParagraph;
}

let TerminalWriteAnimationSpeed = 100;

/**
 * @param {String} output
 * @param {String} [type]
 */
function TerminalWriteAnimated(output = "", type) {
    output += "\n";
	let outputParagraph = TerminalCreateLine(type);
	let completedLength = 0;

	for (let i = 0; i < output.length; i++) {
        // Any solution?
		setTimeout(()=>{
			outputParagraph.innerText = output.substring(0, completedLength++);
		}, i*(TerminalWriteAnimationSpeed || 20));
	}
    return outputParagraph;
}

function TerminalClear() {
	for (let i = 0; i < TerminalContainer.children.length - 1; "" ) {
		TerminalContainer.children[i].remove();
	}
}

function TerminalHidePrompt() {
    TerminalPrompt.style.visibility = "hidden";
    TerminalPromptInput.blur();
}

function TerminalShowPrompt() {
    TerminalPrompt.style.visibility = "visible";
    TerminalPromptInput.focus();
}