const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");


const handleLogout = async (req, res) => {
  // On client side, also delete the access token.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204) // Request successful, no content to send back
  const refreshToken = cookies.jwt;

  // Check if refresh token is in database
  const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204); // Request successful, no content to send back
  }

  // Delete the refresh token in database
  const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  const currentUser = {...foundUser, refreshToken: '' };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  )

  res.clearCookie("jwt", { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }) // add secure: true - which serves on https.
  res.sendStatus(204);
};


module.exports = { handleLogout }