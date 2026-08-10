const routes = require("express").Router()
const categories = require("../api/category/categorycontroller")
const item = require("../api/item/itemcontroller")
const pupil = require("../api/pupils/pupilcontroller")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


routes.use(require('../middleware/admintoken'))



routes.post("/addcat",upload.single("catimage"), categories.addcat)
routes.post("/allcat", categories.allcat)
routes.post("/delcat", categories.delcat)



routes.post("/additem",upload.single("itemimage"),item.additem)
routes.post("/allitem", item.allitem)
routes.post("/delitem", item.delitem)
routes.post("/updateitem", item.updateitem)
routes.post("/avaliableitem", item.avaliableitem)




routes.post("/addpupil", pupil.addpupil)
routes.post("/allpupil", pupil.allpupil)
routes.post("/delpupil", pupil.deletepupil)
routes.post("/updatepupil", pupil.updatepupil)








module.exports = routes