const router = require("express").Router(),
  auth = require("./auth.controller")

router.post("/", auth.login)
router.post("/register", auth.register)
router.post("/check", auth.checkEmail)
router.post("/pwreset", auth.pwreset)
router.post("/pwchange", auth.pwChange)

module.exports = router
