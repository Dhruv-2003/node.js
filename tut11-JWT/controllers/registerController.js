const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const bcrypt = require("bcrypt");
const path = require("path");

const handleNewUser = async (req, res) => {
  const { usern, pwd } = req.body;
  if (!usern || !pwd)
    return res
      .status(400)
      .json({ message: "Username or password is not Valid" });

  const duplicate = usersDB.users.find((user) => user.username === usern);
  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = {
      username: usern,
      password: hashedPwd,
    };

    usersDB.setUsers([...usersDB.users, newUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    console.log(usersDB.users);
    res.status(201).json({ success: "New user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
