const categorymodel = require("./categorymodel")
const { uploadImg } = require("../../Utilities/helper")

const addcat = (req, res) => {

    const err = []

    if (!req.body.category_name) {
        err.push("  category name is required")
    }


    if (err.length > 0) {
        res.send({
            status: 200,
            success: false,
            message: err

        })
    } else {
        categorymodel.findOne({ category_name: req.body.category_name })
            .then(async (data) => {
                if (data == null) {
                    const catobj = new categorymodel()
                    catobj.category_name = req.body.category_name
                    if (req.file) {

                        console.log("FILE RECEIVED:", req.file.originalname)
                        console.log("BUFFER SIZE:", req.file.buffer.length)

                        try {

                            let url = await uploadImg(req.file.buffer)

                            console.log("CLOUDINARY URL:", url)

                            catobj.catimage = url

                        } catch (err) {

                            console.log("CLOUDINARY ERROR:", err)

                            return res.send({
                                status: 400,
                                success: false,
                                message: "cloudinary error!!"
                            })
                        }
                    }
                    catobj.save()
                        .then((savedata) => {
                            res.send({
                                status: false,
                                success: true,
                                message: savedata
                            })

                        })
                        .catch((err_) => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "something went wrong"
                            })
                        })





                } else {
                    res.send({
                        status: 500,
                        success: false,
                        message: " opps category already exist "
                    })
                }

            })
            .catch((err_) => {
                res.send({
                    status: 500,
                    success: false,
                    message: "something went wrong"
                })
            })
    }

}

const allcat = (req, res) => {

    categorymodel.find()
        .then((data) => {
            res.send({
                status: 200,
                success: true,
                data: data,
                message: "all categories loaded"


            })

        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "somethiing went wrong !!!"


            })
        })
}


const delcat = (req, res) => {
    const err = []

    if (!req.body.category_name) {
        err.push("category_name")

    }


    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })

    } else {
        categorymodel.findOne({ category_name: req.body.category_name })
            .then((data) => {
                if (data == null) {
                    res.send({
                        status: false,
                        success: false,
                        message: "Data not exist!!"
                    })

                } else {
                    categorymodel.deleteOne({ category_name: req.body.category_name })
                        .then((data) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "category deleted successfully !!!!"

                            })
                        })
                        .catch(() => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "something went wrong !!!!"

                            })
                        })

                }
            })
            .catch(() => {
                res.send({
                    status: 500,
                    success: false,
                    message: "something went wrong !!!!"

                })
            })





    }
}




module.exports = { addcat, allcat, delcat }


