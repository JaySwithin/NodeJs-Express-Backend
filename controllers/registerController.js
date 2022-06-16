const User = require("./../model/User")
const bcrypt = require("bcrypt");

const handleUser = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required.",
    });
  }

  // Check for duplicate usernames in the database
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) return res.sendStatus(409);
  try {
    // Encrypt the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ 
      username, 
      password: hashedPassword 
    })

    console.log(result)

    res.status(201).json({
      "success": "New user created."
    })
  } catch (error) {
    res.status(500).json({
      "message": error.message
    })
  }
};

module.exports = { handleUser }