const express = require("express");
const saleRoute = express.Router();
const SaleModel = require("../model/saleModel");

saleRoute.route("/")
    .get((req, res) => {
        SaleModel.find(req.query)
            .exec((err, foundSale) => {
                if (err) {
                    res.status(400).send(err)
                } else if (foundSale) {
                    res.status(200).send(foundSale)
                } else {
                    res.status(404).send("Sale not found")
                }
            })
    })
    .post((req, res) => {
        console.log(req.body);
        const newData = new SaleModel(req.body)
        newData.save((err, addedData) => err ? res.status(400).send(err) : res.status(201).send(addedData))
    })
saleRoute.route("/:id")
    .get((req, res) => {
        SaleModel.findOne({ _id: req.params.id })
            .exec((err, foundSale) => {
                if (err) {
                    res.status(400).send(err)
                } else if (foundSale) {
                    res.status(200).send(foundSale)
                } else {
                    res.status(404).send("Sale not found")
                }
            })
    })
    .delete((req, res)=>{
        SaleModel.findOneAndRemove({ _id: req.params.id })
            .exec(((err, delSale)=>{
                if (err) {
                    res.status(400).send(err)
                } else if (delSale) {
                    res.status(204).send()
                } else {
                    res.status(404).send("404 --- Sale not found")
                }
            }))
    })
    .put((req, res)=>{
        console.log(req.body);
        
        SaleModel.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true})
            .exec(((err, updateSale)=>{
                if (err) {
                    res.status(400).send(err)
                } else if (updateSale) {
                    res.status(200).send(updateSale)
                } else {
                    res.status(404).send("404 --- Sale not found")
                }
            }))
    })


module.exports = saleRoute