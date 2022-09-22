const models = require("../../models"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  secretKey = "Secret_Key",
  nodemailer = require("nodemailer"),
  emailData = require("../../config/emailData")
// passport = require("passport")

exports.register = async (req, res) => {
  const { email, pw, name } = req.body,
    hash = await bcrypt.hash(pw, 10)
  try {
    await models.User.create({
      email: email,
      pw: hash,
      name: name,
    })
    res.json({ result: true })
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res) => {
  const { email, pw } = req.body
  try {
    const user = await models.User.findOne({ where: { email: email } })
    !user && res.send({ result: false })
    const logined = await bcrypt.compare(pw, user.pw)
    !logined && res.send({ result: false })
    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      secretKey,
      { expiresIn: "1h" }
    )
    res.json({ result: true, info: user, token: accessToken })
  } catch (err) {
    console.log(err)
  }
}

exports.checkEmail = async (req, res) => {
  try {
    const checkCode = String(emailData.number()),
      transporter = nodemailer.createTransport({
        service: "Naver",
        prot: 587,
        host: "smtp.naver.com",
        secure: false,
        requireTLS: true,
        auth: {
          user: emailData.user,
          pass: emailData.pw,
        },
      }),
      mailOptions = {
        from: emailData.user,
        to: req.body.email,
        subject: "[ANYAD Sign Up Check Code]",
        text: `Your Code : ${checkCode}`,
      }
    await transporter.sendMail(mailOptions)
    res.json({ code: checkCode })
  } catch (error) {
    console.log(error)
  }
}

exports.pwreset = async (req, res) => {
  const email = req.body.email
  const randPw = String(emailData.number()),
    transporter = nodemailer.createTransport({
      service: "Naver",
      prot: 587,
      host: "smtp.naver.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: emailData.user,
        pass: emailData.pw,
      },
    }),
    mailOptions = {
      from: emailData.user,
      to: email,
      subject: "[ANYAD PassWord Change]",
      text: `Your PassWord : ${randPw}`,
    },
    hash = await bcrypt.hash(randPw, 10)
  try {
    await models.User.update({ pw: hash }, { where: { email: email } })
    await transporter.sendMail(mailOptions)
    res.json({ result: true, pw: randPw })
  } catch (err) {
    console.log(err)
  }
}

exports.pwChange = async (req, res) => {
  const param = [req.body.pw, req.body.user.id],
    hash = await bcrypt.hash(param[0], 10)
  try {
    await models.User.update({ pw: hash }, { where: { id: param[1] } })
    res.json({ result: true, message: "비밀번호 변경 성공" })
  } catch {
    res.json({ result: false, message: "비밀번호 변경 실패" })
  }
}

// exports.passportLogin = (req, res, next) => {
//   passport.authenticate("local", (authError, user, info) => {
//     if (authError) {
//       console.error(authError)
//       return next(authError)
//     }

//     if (!user) {
//       return res.redirect(`/?loginError=${info.message}`)
//     }

//     return req.login(user, (loginError) => {
//       if (loginError) {
//         console.error(loginError)
//         return next(loginError)
//       }
//       const accessToken = jwt.sign(
//         { email: user.email, id: user.id },
//         secretKey,
//         { expiresIn: "1h" }
//       )
//       res.json({ result: true, info: user, token: accessToken })
//     })
//   })(req, res, next)
// }
