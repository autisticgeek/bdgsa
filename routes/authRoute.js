const express = require("express");
const authRouter = express.Router();
const User = require("../model/userModel.js");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res) => {
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if (err) return res.status(500).send({success: false, err});
        if (existingUser !== null) {
            return res.status(400).send({success: false, err: "That username already exists!"});
        }
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) return res.status(500).send({success: false, err});
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(201).send({success: true, user: user.toObject(), token});
        });
    });
});

authRouter.post("/login", (req, res) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user || user.password !== req.body.password) {
            return res.status(403).send({success: false, message: "Email or password are incorrect"})
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET, {expiresIn: "24h"});
        return res.send({token: token, user: user.toObject(), success: true, message: "Here's your token!"})
    });
});


module.exports = authRouter