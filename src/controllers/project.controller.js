const db = require("../models")
const getPagination = require("../utils/pagination")
const getPaginationData = require("../utils/pagination")
const Project = db.project
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    //Validate not empty
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty"
        })
        return
    }

    //Create 
    const project = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    //Save project in database
    Project.create(project)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occurred while creating the Note"
        })
    })
}

exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    let condition = title ? {title: { [Op.like]: `%${title}%`}}: null
    const { limit, offset } = getPagination(page, size)
    Project.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPaginationData(data, page, limit)
            res.send(response)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error occurred while retrieving Note"
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Project.findByPk(id)
        .then(data => {
            if (data){
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find Note with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrievin Note with id=" + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    Project.update(req.body,{
        where: { id: id }
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Note was updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update Note with id=${id}`
                })
            }
        })
        .catch(err => {
           res.status(500).send({
                message: "Error updating Note with id=" + id
           })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Project.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Note was deleted successfully"
            })
        } else {
            res.send({
                message: `Cannot delete Note with id=${id}`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Note with id=" + id
        })
    })
}

exports.deleteAll = (req, res) => {
    Project.destroy({
        where: {},
        truncate: false
    })
    .then(numbs => {
        res.send({message: `${numbs} Note were deleted successfully`})
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error ocurred while removing all Notes"
        })
    })
}


exports.findAllPublished = (req, res) => {
    const { page, size } = req.query
    const { limit, offset } = getPagination(page, size)
    Project.findAndCountAll({
        limit,
        offset, 
        where: { published: true }
    })
        .then(data => {
            const response = getPaginationData(data, page, limit)
            res.send(response)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving Notes"
            })
        })
}

