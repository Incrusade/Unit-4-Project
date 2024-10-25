const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const items = []; // in-memory data structure
app.post("/item", (req, res)  => {
    const item  = {id:items.length + 1,...req.body};
    items.push(item);
    res.status(201).json(items);
})
app.get("/item", (req, res) => {
    res.json(items);
});
app.put("/item/:id", (req,res)  => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = {id, ...req.nody};
        res.json(items[index]);
    } else {
        res.status(404).send("item not Found");
    }
})
const PORT  = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
app.delete("/items/id", (req, res) => {
    const id = parseInt(req.params.id);
    const index  = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send("item not Found");
    }
});