const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/itemrecords")
    .then(() => {
        console.log("database is connected ")
    })
    .catch((err) => {
        console.log("database is not connected !!!", err)

    })

