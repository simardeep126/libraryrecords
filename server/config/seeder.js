const pupilmodel= require("../api/pupils/pupilmodel")
const bcrypt=require("bcrypt")
const adminreg=()=>{
    pupilmodel.findOne({number:"7527945759"})
    .then((data)=>{
        if(data==null){
            let userobj= new pupilmodel()
            userobj.name="admin",
            userobj.number="7527945759"
            userobj.password=bcrypt.hashSync("admin@",10)
            userobj.usertype=1
            userobj.save()
            .then((saveddata)=>{
                console.log("admin added successfully")
                

            })
            .catch((err)=>{
                console.log(err);
                
                console.log("something went wrong  ")

            })

        }else{
            console.log("admin already exist")
        }
    })
    .catch((err)=>{
        console.log("something went wrong!!!",err)
    })
}
module.exports={adminreg}