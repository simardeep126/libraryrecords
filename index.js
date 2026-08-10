const express = require("express")
const app = express()
const db = require("./server/config/db")
const manager = require("./server/router/manager")
const student = require("./server/router/student")
const login=require("./server/router/api")

app.use(express.json())
app.use(express.json({ limit: "40mb" }))
app.use(express.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors());

app.use("/manager", manager)
app.use("/student", student)
app.use("/api",login)
const seeder = require("./server/config/seeder")
seeder.adminreg()
app.listen(5000, (err) => {
    if (err) {
        console.log("server is not working please check !!...")
    } else {
        console.log("woow server is working ...")
    }
})
