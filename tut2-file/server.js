const fs = require("fs");
const path = require("path");

// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
//   //   console.log(data.toString());
// });

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data.toString());
    //   console.log(data.toString());
  }
);

console.log("Hello ...");

/// create a new file and write some text to it
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "how are you ?",
  (err) => {
    if (err) throw err;
    console.log("write complete");

    fs.rename(
      path.join(__dirname, "files", "reply.txt"),
      path.join(__dirname, "files", "reply1.txt"),
      (err) => {
        if (err) throw err;
        console.log("renane complete");
      }
    );
  }
);

/// Append a existing file or create a new file
fs.appendFile(
  path.join(__dirname, "files", "test.txt"),
  "testing append again ",
  (err) => {
    if (err) throw err;
    console.log("append complete");
  }
);

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error : ${err}`);
  process.exit(1);
});
