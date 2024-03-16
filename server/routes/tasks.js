const express = require('express');
const router = express.Router();
const { Tasks } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");


router.post("/new", validateToken, async(req, res) => {
    const task = req.body;
    task.UserId = req.user.id;
    const newTask = await Tasks.create(task);
    res.json(newTask);
})

router.get("/byProjectId/:projectId", validateToken, async(req, res) => {
    const projectId = req.params.projectId;
    const listOfTasks = await Tasks.findAll({
        where: { ProjectId: projectId }
    });
    res.json(listOfTasks);
})






module.exports = router;