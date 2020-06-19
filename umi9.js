#!/usr/bin/env node
const colors = require("colors");
const fs = require("fs");

const [, , ...args] = process.argv;

const basePath = process.cwd();

if (!args[0]) {
  return console.log("Please input arguments".cyan);
}

if (args[0] === "make:controller") {
  if (!args[1]) {
    return console.log("Please input controller name".cyan);
  }
  fs.copyFile(
    `${basePath}/Templates/Controller.js`,
    `${basePath}/Controllers/${args[1]}.js`,
    () => {
      return console.log(`Created controller ${args[1]}`.cyan);
    }
  );
}

/**--------------------------------------------------------------------------
 * Making model
 *---------------------------------------------------------------------------*/
if (args[0] === "make:model") {
  if (!args[1]) {
    return console.log("Please input model name".cyan);
  }

  fs.readFile(`${basePath}/Templates/Model.js`, "utf-8", (err, result) => {
    result = result.split("$Model$").join(args[1]);
    fs.writeFile(`${basePath}/Models/${args[1]}.js`, result, "utf-8", () => {
      console.log(`Model ${args[1]} created`.cyan);
    });
  });
}
