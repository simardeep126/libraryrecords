const routes = require("express").Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const use=require("../api/pupils/pupilcontroller")


routes.post("/login",use.login)

module.exports = routes
