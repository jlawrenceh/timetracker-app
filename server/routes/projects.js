const express = require('express');
const router = express.Router();
const { Projects } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.post("/new", validateToken, async(req, res) => {
    const project = req.body;
    project.UserId = req.user.id; 
    
    await Projects.create(project);
    res.json(project);
})

router.get("/", validateToken, async(req, res) => {
    const listOfProjects = await Projects.findAll({
        where: { UserId: req.user.id }
    });
    res.json(listOfProjects);
})

module.exports = router;