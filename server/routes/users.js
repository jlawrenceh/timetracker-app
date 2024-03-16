const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} =  require("jsonwebtoken");
const {validateToken} = require("../middlewares/AuthMiddleware");


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

router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match)
            {
                res.json({
                    error: "Wrong username or password."
                });
            } else {

                const accessToken = sign(
                    {username: user.username, id: user.id},
                    "secret" 
                );

                res.json({
                    token: accessToken,
                    username: username,
                    id: user.id});
            }
        })
    }
});

router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;