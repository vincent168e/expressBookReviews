const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const session = require('express-session');
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}



const authenticatedUser = (username, password)=>{
    let validUsers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    if(validUsers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({message: "Error logging in."});
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60*60});
        req.session.authorization = {accessToken, username};
        return res.status(200).json({message: "User successfully logged in."});
    }
    return res.status(208).json({message: "Invalid Login. Check username and password."});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;

    let book = books[isbn];
    book.reviews.push({username: username, review: review});

    return res.status(300).json({message: book.reviews});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    let book = books[isbn];
    book.reviews = book.reviews.filter(review => review.username !== username);
    return res.status(300).json({message: book.reviews});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
