const asyncHandler = require("express-async-handler");
const axios = require('axios');
const fs = require('fs');
const express = require('express')
const path = require('path');
const Book = require("../models/bookModel");
//@desc Get all books
//@route GET /api/books
//@access private
const app = express();
app.use('/images', express.static(path.join(__dirname, '../../frontend/src/public/book-images')));

// Your createBook route remains the same...

// Now for the getBooks route
const getBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find();
    
    // Update the imageUrl for each book to the full path
    const booksWithFullPath = books.map(book => ({
      ...book._doc,
      imageUrl: `http://localhost:3001/frontend/src/public/book-images/${path.basename(book.imageUrl)}`
    }));
    
    res.status(200).json(booksWithFullPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



//@desc Create New book
//@route POST /api/books
//@access private

const createBook = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);
  const { title, author, isbn, description, imageUrl } = req.body;
 
 
  if (!title || !author || !isbn || !description || !imageUrl) {
    res.status(400);
    throw new Error("All fields are mandatory, including imageUrl!");
  }
 
 
  try {
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });
 
 
    const imageFileName = `${isbn}}.jpg`;
    const imagePath = path.join(__dirname, '../../frontend/src/public/book-images', imageFileName);
 
 
    fs.writeFileSync(imagePath, imageResponse.data);
 
 
    const book = await Book.create({
      title,
      author,
      isbn,
      description,
      imageUrl: `../../frontend/src/public/book-images/${imageFileName}`
    });
 
 
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create book" });
  }
 });
 


//@desc Get book
//@route GET /api/books/:id
//@access private
const getBook = asyncHandler(async (req, res) => {
 const { id } = req.params;
  try {
   const book = await Book.findById(id);
    if (!book) {
     res.status(404);
     throw new Error("Book not found");
   }
  
   res.status(200).json(book);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Server Error" });
 }
});


//@desc Update book
//@route PUT /api/books/:id
//@access private
const updateBook = asyncHandler(async (req, res) => {
 const { id } = req.params;
  try {
   const book = await Book.findById(id);
    if (!book) {
     res.status(404);
     throw new Error("Book not found");
   }
  
   const updatedBook = await Book.findByIdAndUpdate(
     id,
     req.body,
     { new: true }
   );
  
   res.status(200).json(updatedBook);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Unable to update book" });
 }
});


//@desc Delete book
//@route DELETE /api/books/:id
//@access private
const deleteBook = asyncHandler(async (req, res) => {
 const { id } = req.params;
  try {
   const book = await Book.findById(id);
    if (!book) {
     res.status(404);
     throw new Error("Book not found");
   }
  
   await Book.deleteOne({ _id: id });
  
   res.status(200).json(book);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Unable to delete book" });
 }
});


module.exports = {
 getBooks,
 createBook,
 getBook,
 updateBook,
 deleteBook,
};


