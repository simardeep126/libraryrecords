const { model, default: mongoose } = require("mongoose")
const pupilSchema = require("./pupilmodel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const secret = "123##"



const addpupil = (req, res) => {

    const err = []
    if (!req.body.pupilname) {
        err.push("pupilname is required")
    }
    if (!req.body.address) {
        err.push("address is required")
    }

    if (!req.body.proof) {
        err.push("proof is required")
    }
    if (!req.body.parentsphnno) {
        err.push("parentsphnno is required")

    }
    if (!req.body.password) {
        err.push("password is password")
    } if (!req.body.number) {
        err.push("number is number")
    }



    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })
    } else {
        pupilSchema.findOne({ number: req.body.number })
            .then((data) => {
                if (data == null) {

                    const pupilobj = new pupilSchema()

                    pupilobj.pupilname = req.body.pupilname,
                        pupilobj.address = req.body.address,
                        pupilobj.number = req.body.number,
                        pupilobj.proof = req.body.proof,
                        pupilobj.parentsphnno = req.body.proof,
                        pupilobj.usertype = 2,
                        pupilobj.password = bcrypt.hashSync(req.body.password, 10)
                    pupilobj.save()
                        .then((data) => {
                            res.send({
                                status: 200,
                                success: true,
                                data: data,
                                message: "regestered successfully"



                            })
                        })
                        .catch(() => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "something went wrong!!!"



                            })
                        })




                } else {
                    res.send({
                        status: 500,
                        success: false,
                        message: "pupil number is already exist"

                    })
                }
            })
            .catch((err) => {
                res.send({
                    status: 500,
                    successs: false,
                    message: "something went wrong"
                })
            })



    }
}


const updatepupil = (req, res) => {

    const err = []
    if (!req.body.number) {
        err.push("number is required")
    }

    if (!req.body.password) {
        err.push("password is password")
    }



    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })
    } else {
        pupilSchema.findOne({ number: req.body.number })
            .then((data) => {





                bcrypt.compare(req.body.password, data.password, function (irr, ismatch) {
                    if (ismatch) {

                        if (req.body.pupilname) {
                            data.pupilname = req.body.pupilname
                        }
                        if (req.body.address) {

                            data.address = req.body.address
                        }

                        if (req.body.proof) {

                            data.proof = req.body.proof
                        }

                        data.save()
                            .then((data) => {

                                res.send({
                                    status: 200,
                                    success: true,
                                    data: data



                                })
                            })

                    } else {
                        res.send({
                            status: 500,
                            success: false,
                            message: "please use correct password"
                        })
                    }
                })






            })
            .catch((err) => {
                res.send({
                    status: 500,
                    successs: false,
                    message: "something went wrong"
                })
            })



    }
}



const allpupil = (req, res) => {

    pupilSchema.find()
        .then((data) => {
            res.send({

                status: 200,
                success: true,
                message: "data loaded successfully",
                data: data

            })
        })
        .catch((err) => {
            res.send({

                status: 500,
                success: false,
                message: "something went wrongy"

            })
        })


}


const deletepupil = (req, res) => {

    const err = []
    if (!req.body.number) {
        err.push("number is required")
    }




    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })
    } else {
        pupilSchema.findOne({ number: req.body.number })
            .then((data) => {
                if (data == null) {
                    res.send({
                        status: 404,
                        successs: false,
                        message: "data not found"
                    })
                } else {
                    data.status = !data.status
                    data.save()
                        .then((data) => {

                            res.send({
                                status: 500,
                                successs: data,
                                message: "something went wrong !!!"
                            })

                        })
                        .catch((err) => {
                            res.send({
                                status: 500,
                                successs: false,
                                message: "something went wrong !!"
                            })
                        })



                }









            })
            .catch((err) => {
                console.log(err)
                res.send({
                    status: 500,
                    successs: false,
                    message: "something went wrong !"
                })
            })



    }
}


const login = (req, res) => {
    const err = []
    if (!req.body.number) {
        err.push(" to login number is required ")
    }

    if (!req.body.password) {
        err.push(" to login password is required ")
    }

    if (err.length > 0) {
        res.send({
            status: 404,
            success: true,
            message: err
        })

    }


    pupilSchema.findOne({ number: req.body.number })
        .then((data) => {
            console.log("simar")
            if (data == null) {
                res.send({
                    status: 404,
                    success: true,
                    message: "number does not exist use correct number to login in"
                })
            } else {

                bcrypt.compare(req.body.password, data.password, function (err, ismatch) {
                    if (ismatch) {
                        let payload = {
                            userId: data._id,
                            name: data.name,
                            email: data.number,
                            usertype: data.usertype

                        }
                        let token = jwt.sign(payload, secret, { expiresIn: "24hr" })
                        res.send({
                            status: 200,
                            success: true,
                            message: 'Login Successfull!',
                            token: token,
                            data: payload
                        })

                    } else {
                        res.send({
                            status: 500,
                            success: false,
                            message: " wrong password"
                        })
                    }
                })


            }


        })
        .catch((err) => {
            res.send({
                status: 500,
                success: false,
                message: "something wemt wrong"
            })
        })



}



const changepassword = (req, res) => {
    const err = []
    if (!req.body.number) {
        err.push(" number is rquired")
    }
    if (!req.body.password) {
        err.push(" passeord is rquired")
    }
    if (!req.body.newpassword) {
        err.push(" newpassword is rquired")
    }
    if (!req.body.confirmpassword) {
        err.push(" confirmpassword is rquired")
    }


    if (err.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: err
        })
    } else {
        pupilSchema.findOne({ number: req.body.number })
            .then((data) => {
                if (data == null) {
                    res.send({
                        status: 404,
                        success: false,
                        message: "data not found"
                    })
                } else {
                    bcrypt.compare(req.body.password, data.password, function (err, ismatch) {
                        if (ismatch) {
                            if (req.body.newpassword == req.body.confirmpassword) {
                                data.password = bcrypt.hashSync(req.body.newpassword, 10)
                                data.save()
                                res.send({
                                    status: 200,
                                    success: true,
                                    message: " password updated successfully"
                                })
                            } else {
                                res.send({
                                    status: 404,
                                    success: false,
                                    message: " new password and confirm password is not matched "
                                })
                            }

                        } else {
                            res.send({
                                status: 500,
                                success: false,
                                message: "password is incorrect pls use correct password to update "
                            })
                        }
                    })
                }
            })
            .catch(() => {
                res.send({
                    status: 500,
                    success: false,
                    message: "something went wrong"
                })
            })
    }





}


module.exports = { addpupil, updatepupil, allpupil, deletepupil, login, changepassword }
