const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client side, also delete the access token.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204) // Request successful, no content to send back
  const refreshToken = cookies.jwt;

  // Check if refresh token is in database
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204); // Request successful, no content to send back
  }

  // Delete the refresh token in database
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  console.log(result)

  res.clearCookie("jwt", { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }) // add secure: true - which serves on https.
  res.sendStatus(204);
};


module.exports = { handleLogout }