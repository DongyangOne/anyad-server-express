const router = require("express").Router(),
  modulePi = require("./module.controller"),
  jwt = require("../../middlewares/jwt")

router.get("/", jwt.check, modulePi.getModuleList)
router.get("/new", modulePi.newModule)
router.get("/:id", modulePi.getModule)

module.exports = router
