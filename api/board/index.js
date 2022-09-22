const router = require("express").Router(),
  board = require("./board.controller"),
  jwt = require("../../middlewares/jwt"),
  { uploadImg } = require("../../middlewares/multer")

router.post("/:id", uploadImg.single("image"), jwt.check, board.newBoard)
router.get("/", board.getBoardList)
router.get("/search", board.searchBoard)
router.get("/:id", board.getBoard)

module.exports = router
