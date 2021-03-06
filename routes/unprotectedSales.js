const express = require("express");
const saleRoute = express.Router();
const SaleModel = require("../model/saleModel");

saleRoute.route("/")
    .get((req, res) => {
        let today = new Date();
        let before = new Date().setDate(today.getDate() - 1);


        SaleModel.find(
            {
                "date": { "$gte": before },
                "lat": {
                    "$gte": Number(req.query.lat) - 0.18,
                    "$lte": Number(req.query.lat) + 0.18
                },
                "lng": {
                    "$gte": Number(req.query.lng) - 0.18,
                    "$lte": Number(req.query.lng) + 0.18
                }
            }
        )
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

saleRoute.route("/:id")
    .get((req, res) => {
        SaleModel.findOne({ _id: req.params.id })
            // .populate("sellerId")
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



module.exports = saleRoute