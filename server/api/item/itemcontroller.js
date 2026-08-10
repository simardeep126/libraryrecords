const recordsmodel = require("./itemmodel");
const categorymodel = require("../category/categorymodel");
const { uploadImg } = require("../../Utilities/helper")


const additem = (req, res) => {
    const err = [];
    console.log(req.body);
    console.log("req.body =", req.body);
    console.log("category_id =", req.body.category_id);

    if (!req.body.itemname) {
        err.push(" itemname is required")

    }
    if (!req.body.category_id) {
        err.push(" category_id is required")

    }
    if (!req.body.series_no) {
        err.push(" series_no name is required")

    } if (err.length > 0) {
        res.send({
            status: 500,
            success: false,
            message: err
        })

    } else {

        recordsmodel.findOne({ series_no: req.body.series_no })
            .then(async (data) => {
                if (data == null) {
                    const itemobj = new recordsmodel()
                    itemobj.itemname = req.body.itemname,
                        itemobj.series_no = req.body.series_no,
                        itemobj.category_id = req.body.category_id
                    console.log("check", req.body.category_id)
                    if (req.file) {
                        // cloud
                        try {
                            let url = await uploadImg(req.file.buffer)
                            console.log(url);

                            itemobj.itemimage = url
                        }

                        catch (err) {
                            console.log(err)
                            res.send({
                                status: 400,
                                success: false,
                                message: "cloudnairy error!!"
                            })
                        }
                    }

                    itemobj.save()
                        .then((itemdata) => {
                            res.send({
                                status: 200,
                                success: true,
                                data: itemdata,
                                message: "item added successfully"
                            })
                            console.log(itemdata)
                        })

                } else {

                    res.send({
                        status: 500,
                        success: false,
                        message: "series_no alredy exist"
                    })

                }

            })

            .catch((error) => {
                res.send({
                    status: 500,
                    success: false,
                    message: "Something went wrong!",
                    error: error.message
                });
            });

    }
}

const allitem = (req, res) => {

    recordsmodel.find()
        .populate("category_id")
        .populate("issued_to")
        .then((data) => {
            console.log(data)
            res.send({
                status: 200,
                success: true,
                data: data,
                message: "All items fetched successfully"
            });
        })
        .catch(() => {
            res.send({
                status: 500,
                success: false,
                message: "something went wrong !!!!"

            })
        })

}

const delitem = (req, res) => {
    const err = []

    if (!req.body.series_no) {
        err.push(" series_no is required")

    }


    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })

    } else {
        categorymodel.findOne({ series_no: req.body.series_no })
            .then((data) => {
                if (data == null) {
                    res.send({
                        status: false,
                        success: false,
                        message: "Data not exist!!"
                    })
                } else {

                    categorymodel.deleteOne({ series_no: req.body.series_no })
                        .then((data) => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "item  deleted successfully !!!!"

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

const updateitem = (req, res) => {
    const err = []
    if (!req.body.series_no) {
        err.push("series_no is required")
    }
    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })
    } else {

        recordsmodel.findOne({ series_no: req.body.series_no })
            .then((data) => {
                if (data == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "data was not found !!!"
                    })
                } else {
                    if (req.body.itemname) {
                        data.itemname = req.body.itemname
                    }
                    if (req.body.description) {
                        data.description = req.body.description
                    }
                    if (req.body.issued_to) {
                        data.issued_to = req.body.issued_to
                    }
                    if (req.body.issued_on) {
                        data.issued_on = req.body.issued_on
                    }
                    if (req.body.return_on) {
                        data.return_on = req.body.return_on
                    }
                    if (req.body.avaliable_on) {
                        data.avaliable_on = req.body.avaliable_on
                    }
                    data.save()
                        .then((data) => {
                            res.send({
                                status: 200,
                                success: true,
                                data: data,
                                messaage: "data updated successfully"
                            })

                        })
                        .catch((err) => {
                            res.send({

                                status: 500,
                                success: false,
                                messaage: "something went wrong "


                            })
                        })
                }
            })

    }
}

const avaliableitem = (req, res) => {
    const err = []
    if (!req.body.series_no) {
        err.push("series_no is required")
    }
    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })
    } else {

        recordsmodel.findOne({ series_no: req.body.series_no })
            .then((data) => {
                if (data == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "data was not found !!!"
                    })
                } else {


                    data.avaliable = !data.avaliable

                    data.save()
                        .then((data) => {
                            res.send({
                                status: 200,
                                success: true,
                                data: data,
                                messaage: "data updated successfully"
                            })

                        })
                        .catch((err) => {
                            res.send({

                                status: 500,
                                success: false,
                                messaage: "something went wrong "


                            })
                        })
                }
            })

    }

}




module.exports = { additem, allitem, delitem, updateitem, avaliableitem }

