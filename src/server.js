const express = require("express")
const cors = require("cors")
const app = express()

//Database
const db = require("./models")
db.sequelize.sync({ force: true }).then(() => {
    console.log("re-sync db")
})
    

/* let corsOptions = {
    origin: "http//localhost:8081"
}  */

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
require("./routes/project.routes")(app)

//set port, listen for server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})