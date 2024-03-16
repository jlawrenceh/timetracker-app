const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());

app.get("/test", (req, res) => {
    res.json("test ok");
});

app.listen(3005, () => {
    console.log("Server running on port 3005");
});