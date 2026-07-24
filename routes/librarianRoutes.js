const express = require("express");
const router = express.Router();

router.use(express.json());

let books = [];
function validation(book, title, author, category, price, available, checkDuplicate) {
    let errors = [];

    if (checkDuplicate && book) {
        errors.push("Book ID already exists");
    }

    if (!title || title.trim() == "") {
        errors.push("Title cannot be empty");
    }

    if (!author || author.trim() == "") {
        errors.push("Author cannot be empty");
    }

    if (!category || category.trim() == "") {
        errors.push("Category cannot be empty");
    }

    if (price <= 0) {
        errors.push("Invalid book price");
    }

    if (typeof available !== "boolean") {
        errors.push("Invalid availability status");
    }

    return errors;
}

router.get("/", (req, res) => {
    res.json(books);
});


router.get("/:id", (req, res) => {
    let book = books.find(function (b) {
        return b.id == req.params.id;
    });

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

router.post("/", (req, res) => {

    let id = req.body.id;
    let title = req.body.title;
    let author = req.body.author;
    let category = req.body.category;
    let price = req.body.price;
    let available = req.body.available;

    let book = books.find(function (b) {
        return b.id == id;
    });

    let errors = validation(
        book,
        title,
        author,
        category,
        price,
        available,
        true
    );

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors
        });
    }

    let newBook = {
        id: id,
        title: title,
        author: author,
        category: category,
        price: price,
        available: available
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully"
    });
});


router.put("/:id", (req, res) => {

    let book = books.find(function (b) {
        return b.id == req.params.id;
    });

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    let title = req.body.title;
    let author = req.body.author;
    let category = req.body.category;
    let price = req.body.price;
    let available = req.body.available;

    let errors = validation(
        null,
        title,
        author,
        category,
        price,
        available,
        false
    );

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors
        });
    }

    book.title = title;
    book.author = author;
    book.category = category;
    book.price = price;
    book.available = available;

    res.json({
        message: "Book updated successfully"
    });
});

router.delete("/:id", (req, res) => {

    let index = books.findIndex(function (b) {
        return b.id == req.params.id;
    });

    if (index == -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(index, 1);

    res.json({
        message: "Book deleted successfully"
    });
});

module.exports = router;