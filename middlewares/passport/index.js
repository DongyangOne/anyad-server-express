const passport = require("passport"),
  { JWTStrategy, ExtractJWT } = require("passport-jwt"),
  LocalStrategy = require("passport-local").Strategy,
  user = require("../../models").User,
  local = require("./localStrategy")

module.exports = () => {
  local()
}
