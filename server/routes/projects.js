const express = require('express');
const router = express.Router();
const { Projects, Tasks } = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.post("/new", validateToken, async(req, res) => {
    const project = req.body;
    project.UserId = req.user.id; 
    
    await Projects.create(project);
    res.json(project);
})
/*
router.get("/", validateToken, async(req, res) => {
    const listOfProjects = await Projects.findAll({
        where: { UserId: req.user.id }
    });
    res.json(listOfProjects);
})
*/


router.get('/', validateToken,  async(req, res) => {
    const listOfProjects = await Projects.findAll({
        where: { UserId: req.user.id },
        include: [{
            model: Tasks,
            attributes: ['hours']
        }]
    });

    const projectsWithTotalHours = listOfProjects.map(project => {
        let totalHours = 0;
        project.Tasks.forEach(task => {
            totalHours += task.hours;
        });
        
        const { Tasks, ...rest } = project.toJSON();
        return {
            ...rest, 
            totalHours
        };
    });

    res.json(projectsWithTotalHours);
 });


module.exports = router;