const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //res.send(JSON.stringify(books, null, 4));
    //res.send(books);
    return res.status(300).json({message: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.status(300).json({isbn: isbn, message: books[isbn]});
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filteredBooks = Object.values(books).filter((book) => {
        return book.author === author;
    });
    return res.status(300).json({message: filteredBooks});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filteredBooks = Object.values(books).filter((book) => {
        return book.title === title;
    });
    return res.status(300).json({message: filteredBooks});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    return res.status(300).json({message: book.reviews});
});

module.exports.general = public_users;
