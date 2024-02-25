var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
let commandHistory = [];
let commandIndex = -1;

setTimeout(function () {
    loopLines(banner, "", 130);
  }, 100);

  // set prompt display to inline after banner is done loading 

  setPrompt = setTimeout(function () {
    document.getElementById("prompt").style.display = "inline";
  }, 1000);

   
 banner = [
  "<span class=\"heading\">---------------------------------------------</span>",
  "<span class=\"heading\">Welcome to my interactive portfolio Terminal!</span>",
  "<span class=\"heading\">---------------------------------------------</span>",
  "<span class=\"infos\">For a list of available commands, type</span> <span class=\"color1\">'help'</span><span class=\"color2\">.</span>",
  ];


  window.onload = function() {
    const commandInput = document.getElementById('command-input');
    const terminal = document.getElementById('terminal');
    const prompt = document.getElementById('prompt');
    const commandLine = document.getElementsByClassName('command-line');

    // Function to handle user input
    function handleUserInput() {
        // Get the user input from the command input element
        const userInput = commandInput.textContent.trim();

        // Check if the user input is not empty
        if (userInput !== '') {
            // Create a new paragraph element to display the command
            const commandOutput = document.createElement('p');
            commandOutput.textContent = `${prompt.textContent} ${userInput}`;
            commandOutput.classList.add('command');

            // Process the user input
            commander(userInput, commandOutput);

            // Clear the command input after processing
            commandInput.textContent = '';
        }
    }


    // Event listener for handling Enter key press
    commandInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleUserInput();
        }
    });

    // Set focus to the command input for user convenience
    commandInput.focus();

    // focus on the command input when the user clicks on the line with the command input 
    document.addEventListener('click', function() {
        commandInput.focus();
    });

};

function commander(cmd, currentinput) {



  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "whoami":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "education":
      loopLines(education, "color2 margin", 80);
      break;
    case "sudo":
      addLine("Oh no, you're not admin...", "color2", 80);
      setTimeout(function() {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      }, 1000); 
      break;
    case "skills":
      loopLines(skills, "color2 margin", 80);
      break;
    case "secret":
      liner.classList.add("password");
      pw = true;
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "password":
      addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!😂</span>", "error", 100);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commandHistory, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "email":
      addLine('Opening mailto:<a href="mailto:sr10codes@gmail.com">sr10codes@gmail.com</a>...', "color2", 80);
      newTab(email);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    case "linkedin":
      addLine("Opening LinkedIn...", "color2", 0);
      newTab(linkedin);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }

  // Add the current command to the terminal
  document.getElementById('before').parentNode.insertBefore(currentinput, before);

  // Clear the command input after processing
  document.getElementById('command-input').textContent = '';

}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

  function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
        t += "&nbsp;&nbsp;";
        i++;
      } else {
        t += text.charAt(i);
      }
    }
    setTimeout(function () {
      var next = document.createElement("p");
      next.innerHTML = t;
      next.className = style;
  
      before.parentNode.insertBefore(next, before);
  
      window.scrollTo(0, document.body.offsetHeight);
    }, time);
  }

  function loopLines(name, style, time) {
    name.forEach(function (item, index) {
      addLine(item, style, index * time);
    });
  }


document.getElementById('command-input').addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        // Prevent the cursor from moving to the start of the input
        e.preventDefault();

        // If there are no commands in the history, do nothing
        if (!commandHistory.length) return;

        // If we're not already at the oldest command in the history, go back one
        if (commandIndex > 0) commandIndex--;

        // Update the input value with the command from the history
        this.textContent = commandHistory[commandIndex];
    } else if (e.key === 'ArrowDown') {
        // Prevent the cursor from moving to the end of the input
        e.preventDefault();

        // If we're at the newest command in the history, clear the input
        if (commandIndex === -1 || commandIndex === commandHistory.length - 1) {
            commandIndex = commandHistory.length;
            this.textContent = '';
        } else {
            // Otherwise, go forward one command in the history
            commandIndex++;
            this.textContent = commandHistory[commandIndex];
        }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      let command = this.textContent;
      commandHistory.push(command);
      commandIndex = commandHistory.length;
  }
});

