const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { usern, pwd } = req.body;
  if (!usern || !pwd)
    return res
      .status(400)
      .json({ message: "Username or password is not Valid" });

  const duplicate = await User.findOne({ username: usern }).exec();

  if (duplicate) return res.sendStatus(409); // Conflict
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: usern,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: "New user created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
