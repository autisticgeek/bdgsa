const express = require('express');
const userRoute = express.Router()
const UserModel = require("../model/userModel")

userRoute.route("/")
    .get((req, res) => {
        UserModel.find(req.query)
            .exec((err, foundUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (foundUser) {
                    res.status(200).send(foundUser)
                } else {
                    res.status(404).send("User Not found")
                }
            })
    })
    .post((req, res) => {
        const newData = new UserModel(req.body)
        newData.save((err, addedData) => err ? res.status(400).send(err) : res.status(201).send(addedData))
    })
userRoute.route("/:id")
    .get((req, res) => {
        UserModel.findOne({ _id: req.params.id })
            .exec((err, foundUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (foundUser) {
                    res.status(200).send(foundUser)
                } else {
                    res.status(404).send("User Not found")
                }
            })
    })
    .delete((req, res) => {
        UserModel.findOneAndRemove({ _id: req.params.id })
            .exec(((err, delUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (delUser) {
                    res.status(204).send()
                } else {
                    res.status(404).send("404 --- User Not found")
                }
            }))
    })
    .put((req, res) => {
        UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec(((err, updateUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (updateUser) {
                    res.status(200).send(updateUser)
                } else {
                    res.status(404).send("404 --- User Not found")
                }
            }))
    })

module.exports = userRoute