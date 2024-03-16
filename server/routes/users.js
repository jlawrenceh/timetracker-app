const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hashed) => {
        Users.create({
            username: username,
            password: hashed
        })
        .then(() => {
            res.json("user registered.")
        })
        .catch((err) => {
            res.json({error: err.errors[0].message});
        });
    });
});

module.exports = router;