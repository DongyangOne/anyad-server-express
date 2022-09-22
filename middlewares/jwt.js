const jwt = require("jsonwebtoken"),
  secretKey = "Secret_Key"

exports.check = (req, res, next) => {
  const token = req.headers.accesstoken

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })

  p.then((decoded) => {
    req.body.token = token
    req.body.user = decoded
    console.log(true)
    next()
  }).catch((err) => {
    res.send({
      success: false,
      message: err.message,
    })
  })
}
