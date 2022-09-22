const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcryptjs"),
  models = require("../../models"),
  { JWTStrategy, ExtractJWT } = require("passport-jwt")

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "pw", // req.body.password
      },
      async (email, pw, done) => {
        try {
          const exUser = await models.User.findOne({ where: { email: email } })
          !exUser &&
            done(null, false, { message: "가입되지 않은 회원 입니다." })
          const result = await bcrypt.compare(pw, exUser.pw)
          !result && done(null, false, { message: "비밀번호가 일치 하지 않음" })
          done(null, exUser)
        } catch (err) {
          console.error(err)
          done(err)
        }
      }
    )
  )
}
