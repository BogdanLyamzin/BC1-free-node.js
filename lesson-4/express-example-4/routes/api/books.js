const express = require("express")

const books = require("../../data/books")

const router = express.Router()

router.get("/", async(req, res)=> {
    res.json(books)
})

router.get("/:id", async(req, res)=> {
    res.json(books)
})

router.post("/", async(req, res)=> {
    res.json(books)
})

router.put("/:id", async(req, res)=> {
    res.json(books)
})

router.delete("/:id", async(req, res)=> {
    res.json(books)
})

module.exports = router;