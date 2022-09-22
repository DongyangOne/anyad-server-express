const models = require("../../models")

exports.newModule = async (req, res) => {
  const param = req.param("name")
  // uid = 1
  // { id: uid } = req.body.user
  // console.log(param, uid)
  try {
    const { id } = await models.Module.create({
      name: param,
      user_id: 1,
    })
    for (i = 0; i < 12; i++) {
      await models.Access.create({
        user_id: 1,
        module_id: id,
      })
    }
    res.json({ result: true })
  } catch (err) {
    console.log(err)
  }
}

exports.getModuleList = async (req, res) => {
  const { id } = req.body.user
  try {
    const data = await models.Module.findAll({ where: { user_id: id } })
    console.log(data)
    res.json({ result: true, data: data })
  } catch (err) {
    console.log(err)
  }
}

exports.getModule = async (req, res) => {
  const param = req.params.id
  try {
    const data = await models.Module.findOne({ where: { id: param } })
    res.json({ result: true, data: data })
  } catch (err) {
    console.log(err)
  }
}
