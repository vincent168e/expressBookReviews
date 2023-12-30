const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let userWithSameName = users.filter((user) => {
        return (user.username === username);
    });
    if (userWithSameName.length > 0) {
        return true;
    } else {
        return false;
    }
}

// 6. Register user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if(!doesExist(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registred. Now you can login."});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "Unable to register user."});
});

/*
// 1. Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(300).json({message: books});
});
*/

// 10. Get the book list available in the shop (promise callback)
public_users.get('/', function (req, res) {
    new Promise(function (resolve, reject) {
        resolve({status: 300, message: books});
    }).then(function (data) {
        return res.status(300).json(data);
    }).catch(function (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    });
});

/*
// 2. Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    return res.status(300).json({isbn: isbn, message: books[isbn]});
});
*/

// 11. Get book details based on ISBN (promise callback)
public_users.get('/isbn/:isbn',function (req, res) {
    new Promise(function (resolve, reject) {
        const isbn = req.params.isbn;
        resolve({status: 300, isbn: isbn, message: books[isbn]});
    }).then(function (data) {
        return res.status(300).json(data);
    }).catch(function (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    });
});

/*
// 3. Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let filteredBooks = Object.values(books).filter((book) => {
        return book.author === author;
    });
    return res.status(300).json({message: filteredBooks});
});
*/

// 12. Get book details based on author (promise callback)
public_users.get('/author/:author',function (req, res) {
    new Promise(function (resolve, reject) {
        const author = req.params.author;
        let filteredBooks = Object.values(books).filter((book) => {
            return book.author === author;
        });
        resolve({status: 300, message: filteredBooks});
    }).then(function (data) {
        return res.status(300).json(data);
    }).catch(function (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    });  
});

/*
// 4. Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filteredBooks = Object.values(books).filter((book) => {
        return book.title === title;
    });
    return res.status(300).json({message: filteredBooks});
});
*/

//13. Get all books based on title (promise callback)
public_users.get('/title/:title', function (req, res) {
    new Promise(function (resolve, reject) {
        const title = req.params.title;
        let filteredBooks = Object.values(books).filter((book) => {
            return book.title === title;
        });
        resolve({status: 300, message: filteredBooks});
    }).then(function (data) {
        return res.status(300).json(data);
    }).catch(function (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    });
});

//  5. Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    return res.status(300).json({message: book.reviews});
});

module.exports.general = public_users;
