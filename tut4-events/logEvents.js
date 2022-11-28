const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromise = require("fs").promises;

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logTime = `${dateTime}\t${uuid()}\t${message} \n`;
  console.log(logTime);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromise.appendFile(
      path.join(__dirname, "logs", "evetnLog.txt"),
      logTime
    );
  } catch (error) {
    console.error(error);
  }
};

// console.log(format(new Date(), "yyyy/MM/dd\tHH:mm:ss"));

// console.log(uuid());

module.exports = logEvents;
