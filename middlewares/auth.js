var { expressjwt } = require("express-jwt");

const requireSignIn = expressjwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
});
module.exports = requireSignIn;
