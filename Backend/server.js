const express = require("express")
const database = require("../Backend/Config/mysql")
const cors = require("cors")
const userRoute = require("../Backend/routes/userRoute")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/user",userRoute)

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


app.listen(5000)