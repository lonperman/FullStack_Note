module.exports = app => {
    const project = require("../controllers/project.controller")
    let router = require("express").Router()

    //Create
    router.post("/", project.create)
    //Find All
    router.get("/", project.findAll)
    //Find All For Published
    router.get("/published", project.findAllPublished)
    //Find One For Id
    router.get("/:id", project.findOne)
    //Update One For Id
    router.put("/:id", project.update)
    //Delete One For Id
    router.delete("/:id", project.delete)
    //Delete All Notes
    router.delete("/", project.deleteAll)
    app.use("/api/notes", router)
}