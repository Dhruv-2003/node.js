const fs = require("fs");
const path = require("path");

//// streaming large data to avoid crashing, more efficient

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

const ws = fs.createWriteStream("./files/newlorem.txt");

// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

/// more efficient way to stream

rs.pipe(ws);
