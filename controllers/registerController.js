const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleUser = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required.",
    });
  }

  // Check for duplicate usernames in the database
  const duplicate = usersDB.users.find(
    (person) => person.username === username
  );
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { "username": username, "password": hashedPassword }
    usersDB.setUsers([...usersDB.users, newUser])
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    )
    console.log(usersDB.users)
  } catch (error) {
    res.status(500).json({
      "message": "hello world"
    })
  }
};

module.exports = { handleUser }