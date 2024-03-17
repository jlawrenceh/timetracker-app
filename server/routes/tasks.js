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

router.delete("/delete/:taskId", validateToken, async(req, res) => {
    const taskId = req.params.taskId

    await Tasks.destroy({
        where: {
            id: taskId,
        },
    });

    res.json("Deleted Succesfully");
})

router.put("/edit/hours", validateToken, async (req, res) => {
    const {newhours, id } = req.body;
    await Tasks.update({hours: newhours}, {where: {id: id}});
    res.json("hours updated Succesfully");
});

router.put("/edit/taskname", validateToken, async (req, res) => {
    const {newtaskname, id } = req.body;
    await Tasks.update({taskname: newtaskname}, {where: {id: id}});
    res.json("task name updated Succesfully");
});

router.put("/edit/description", validateToken, async (req, res) => {
    const {newdescription, id } = req.body;
    await Tasks.update({description: newdescription}, {where: {id: id}});
    res.json("description updated Succesfully");
});









module.exports = router;
