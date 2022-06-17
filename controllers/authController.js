const User = require("../model/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required.",
    });
  }

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401);
  const match = await bcrypt.compare(password, foundUser.password)

  if (match) {
    const roles = Object.values(foundUser.roles)
    // Create JWTs
    const accessToken = jwt.sign(
      { "UserInfo": {
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )
    const refreshToken = jwt.sign(
      {"username": foundUser.username},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    
    // Saving refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }) // secure: true, in prod.
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
};


module.exports = { handleLogin }