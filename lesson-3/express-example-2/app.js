const express = require("express");

const books = require("./books")

const app = express();

app.set("json spaces", 8);

app.get("/books", (req, res)=> {
    const databaseREsponse = null;
    // res.send(databaseREsponse)
    // res.json(databaseREsponse)
    res.json(books)
})

app.listen(3000);