const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");
const fs = require("fs");
console.log("Answer the questions to generate a README file");

const questions = [
  //query Title
  {
    type: "input",
    name: "title",
    message: "What is the Title of your project?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
  //query description
  {
    type: "input",
    name: "description",
    message: "Describe your project.",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
  //query screenshot
  {
    type: "confirm",
    name: "qscreenshot",
    message: "Do you have a screenshot?",
  },
  {
    type: "input",
    name: "screenshot",
    message: "Where is it located?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        screenshot = "";
        console.log("A screenshot was not added");
        return true;
      }
    },
    when: (answer) => answer.qscreenshot === true,
  },
  //query deplyment
  {
    type: "confirm",
    name: "qdeployment",
    message: "Is this project deployed somewhere?",
  },
  {
    type: "input",
    name: "deployment",
    message: "Where is it located?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        deployment = "";
        console.log("A link was not added");
      }
    },
    when: (answer) => answer.qdeployment === true,
  },
  //query github
  {
    type: "confirm",
    name: "qrepository",
    message: "Is there a repository available for this project?",
  },
  {
    type: "input",
    name: "repository",
    message: "Where is it located?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        repository = "";
        console.log("A link was not added.");
      }
    },
    when: (answer) => answer.qrepository === true,
  },
  //query install required
  {
    type: "confirm",
    name: "qinstall",
    message: "Do you need to install this project?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
      if (userInput === false) {
        install = "No installation needed.";
      }
    },
  },
  //query install instruction
  {
    type: "input",
    name: "install",
    message: "How do you install it?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
    when: (answer) => answer.qinstall === true,
  },
  //query how to use
  {
    type: "input",
    name: "usage",
    message: "How do you use it?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
  //query credits
  {
    type: "input",
    name: "credits",
    message: "Who worked on the project?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },

  {
    type: "input",
    name: "github",
    message: "What is your github username?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },

  //query license
  {
    type: "list",
    name: "license",
    message: "What license is the project under?",
    choices: [
      "Apache 2.0",
      "Boost",
      "BSD",
      "Creative Commons",
      "Eclipse",
      "GNU",
      "The Organization for Ethical Source",
      "IBM",
      "ISC",
      "MIT",
      "Mozilla",
      "Open Data Commons",
      "Perl",
      "SIL",
      "Unlicense",
      "WTFPL",
      "Zlib",
      "None",
    ],
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },

  {
    type: "list",
    name: "license",
    message: "Which BSD license are you using?",
    choices: ["BSD 3-Clause", "BSD 2-Clause"],
    when: (userInput) => userInput.license === "BSD",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },

  {
    type: "list",
    name: "license",
    message: "Which Creative Commons license are you using?",
    when: (userInput) => userInput.license === "Creative Commons",
    choices: [
      "1.0",
      "Attribution 4.0 International",
      "Attribution-ShareAlike 4.0 International",
      "Attribution-NonCommercial 4.0 International",
      "Attribution-NoDerivates 4.0 International",
      "Attribution-NonCommmercial-ShareAlike 4.0 International",
      "Attribution-NonCommercial-NoDerivatives 4.0 International",
    ],
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },

  {
    type: "list",
    name: "license",
    message: "Which GNU license are you using?",
    choices: ["GPL v3", "GPL v2", "AGPL v3", "LGPL v3", "FDL v1.3"],
    when: (userInput) => userInput.license === "GNU",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "Which Organization for Ethical Source license are you using?",
    choices: ["The Hippocratic License 2.1", "The Hippocratic License 3.0"],
    when: (userInput) =>
      userInput.license === "The Organization for Ethical Source",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "Which Open Data Commons license are you using?",
    when: (userInput) => userInput.license === "Open Data Commons",
    choices: [
      "Attribution License (BY)",
      "Open Database License (ODbL)",
      "Public Domain Dedication and License (PDDL)",
    ],
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
  {
    type: "list",
    name: "license",
    message: "Which Perl license are you using?",
    when: (userInput) => userInput.license === "Perl",
    choices: ["The Perl License", "The Artistic License 2.0"],
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },

  //query features
  {
    type: "input",
    name: "features",
    message: "What features does your project contain?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        features = "None listed.";
        console.log("No features will be listed.");
        return true;
      }
    },
  },
  //query how to contribute
  {
    type: "input",
    name: "contribute",
    message: "How can people contribute?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        contribute = "Unavailable";
        console.log("No contribution info will be listed.");
        return true;
      }
    },
  },
  //query tests
  {
    type: "input",
    name: "tests",
    message: "How can you test it?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        tests = "No tests available";
        console.log("No tests will be listed.");
        return true;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "What email can people reach you at?",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("This step is required.");
      }
    },
  },
];

//write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
}

//initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => generateMarkdown(answers))
    .then((readme) => writeToFile("YOURNEWREADME.md", readme));
}

//initialize app
init();
