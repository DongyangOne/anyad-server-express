const models = require("../../models"),
  fs = require("fs")

exports.upload = async (req, res) => {
  const { id: user_id } = req.body.user,
    { id: access_id } = req.params,
    { filename } = req.file
  try {
    await models.Video.create({
      user_id: user_id,
      access_id: access_id,
      path: filename,
    })
    res.json({ result: true })
  } catch (err) {
    console.log(err)
  }
}

exports.stream = async (req, res) => {
  const { id } = req.params
  try {
    const { path: fileName } = await models.Video.findOne({ where: { id } })
    const path = `source/video/${fileName}`
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunksize = end - start + 1
      const file = fs.createReadStream(path, { start, end })
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      }
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = { "Content-Length": fileSize, "Content-Type": "video/mp4" }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  } catch (err) {}
}
