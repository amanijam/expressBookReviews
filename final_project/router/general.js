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
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn];
    res.send(book);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let param = req.params.author;
    let tokens = param.split("-");
    let author = tokens[0] + " " + tokens[1];
    let result = [];
    for (let i = 1; i <= 10; i++){
        let b = books[i];
        if (b["author"].toLowerCase() === author.toLowerCase()){
            result.push(b);
        }
    }

    if (result.length > 0){
        res.send(result);
    } else {
        res.status(404).json({message: "No book(s) found by given author"});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let param = req.params.title;
    let tokens = param.split("-");
    let title = "";
    for (let i = 0; i < tokens.length; i++){
        if (i < tokens.length-1){
            title = title + tokens[i] + " ";
        } else{
            title += tokens[i]
        } 
    }
    let result = [];
    for (let i = 1; i <= 10; i++){
        let b = books[i];
        if (b["title"].toLowerCase() === title.toLowerCase()){
            result.push(b);
        }
    }

    if (result.length > 0){
        res.send(result);
    } else {
        res.status(404).json({message: "No book(s) found with given title"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
