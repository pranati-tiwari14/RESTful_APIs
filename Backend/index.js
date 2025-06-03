const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

let posts = [
    {
        id: uuidv4(),
        username: "KhushiSingh",
        Followers: "1500",
        Following: "300",
        Caption: "Live your Life with full of Happiness and Smile"
    },
    {
        id: uuidv4(),
        username: "AmanSingh",
        Followers: "8k",
        Following: "250",
        Caption: "I love to travel Countries"
    },
    {
        id: uuidv4(),
        username: "Roshini",
        Followers: "50k",
        Following: "100",
        Caption: "Just Believe in Yourself"
    }

];

app.get("/posts", (req, res) => {
    res.render("Index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("Create.ejs");
});

app.post("/posts", (req, res) => {
    let newPost = req.body;
    posts.push(newPost);
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("view.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("update.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newCaption = req.body.Caption;
    post.Caption = newCaption;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
});