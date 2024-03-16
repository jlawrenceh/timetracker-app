const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");


app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => {
    res.json("test ok");
});


const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const projectsRouter = require("./routes/projects");
app.use("/projects", projectsRouter);

const tasksRouter = require("./routes/tasks");
app.use("/tasks", tasksRouter);


db.sequelize.sync().then(() => {
    app.listen(3005, () => {
        console.log("Server running on port 3005");
    });
});