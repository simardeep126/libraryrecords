const routes = require("express").Router()
const categories = require("../api/category/categorycontroller")
const item = require("../api/item/itemcontroller")
const pupil = require("../api/pupils/pupilcontroller")



routes.use(require('../middleware/token'))


routes.post("/allcat", categories.allcat)



routes.post("/allitem", item.allitem)



routes.post("/changepassword", pupil.changepassword)








module.exports = routes





