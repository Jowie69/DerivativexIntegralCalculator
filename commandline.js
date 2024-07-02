// import calculus code
import calculus from "./calculus.js";

// selectors
const inputArea = document.querySelector(".input textarea");
const outputArea = document.querySelector(".output");
const universal = document.querySelector(".universal");

// detect enter
inputArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        // get input
        const input = inputArea.value.trim();
        e.preventDefault();
        inputArea.value = "";
        constructLine(input, "user");

        // compute output
        let output;
        if (input.startsWith("d ")) {
            output = calculus.derive(input.replace("d", "").trim());
        } else if (input.startsWith("i ")) {
            output = calculus.integrate(input.replace("i", "").trim());
        } else if (input.startsWith("c ") || input.startsWith("bg ")) {
            const target = input.startsWith("c ") ? "Text" : "Background";
            let color =
                target === "Text"
                    ? input.replace("c", "")
                    : input.replace("bg", "");
            color = color.trim();

            if (target === "Text") {
                universal.innerHTML = `*{color:${color};}`;
            } else {
                document.body.style.backgroundColor = color;
            }

            output = `${target} color set to ${color}`;
        } else if (input.startsWith("print ")) {
            output = input.replace("print", "").trim();
        } else if (input.startsWith("help")) {
            output =
                "Use the following commands:\n" +
                "d -expression to derive-\n" +
                "i -expression to integrate (anti-derive)-\n" +
                "c -new text color*\n" +
                "bg -new background color-\n" +
                "print -text to print-\n" +
                "clear *clears CLI*\n" +
                "contact *prints author's discord id*\n" +
                "facebook *opens author's discord profile*\n" +
                "test *testing command*\n" +
                "help *show commands list*";
        } else if (input.startsWith("test")) {
            output = "success";
        } else if (input.startsWith("clear")) {
            const outputElement = document.querySelector(".output");
            while (outputElement.firstChild) {
                outputElement.firstChild.remove();
            }
            output = "CLI cleared";
        } else if (input.startsWith("contact")) {
            output = "Mary Grace A. Asis";
        } else if (input.startsWith("facebook")) {
            output = "Opening in 2 seconds";
            setTimeout(() => {
                window.open("https://www.facebook.com/ms.asis123");
            }, 2000);
        } else {
            output =
                "Error: undefined command, use *help* command to view available commands list";
        }

        constructLine(output, "system");
    }
});

// construct new line
function constructLine(text, type) {
    const line = document.createElement("li");

    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.style.color = type === "system" ? "lime" : "green";
    icon.innerText = type === "system" ? "<" : ">";

    const content = document.createElement("p");
    content.innerText = text;

    line.appendChild(icon);
    line.appendChild(content);

    outputArea.appendChild(line);

    scrollDown();
}

// set inputArea height
inputArea.addEventListener("input", (e) => {
    inputArea.style.height = "0px";
    const scrollHeight = inputArea.scrollHeight;
    inputArea.style.height = scrollHeight + "px";

    scrollDown();
});

// scroll down
function scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
}

// focus
window.addEventListener("click", () => {
    inputArea.focus();
});