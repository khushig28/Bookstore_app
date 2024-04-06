 const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
//@desc Get all books
//@route GET /api/books
//@access private
const getBooks =  asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});


//@desc Create New book
//@route POST /api/books
//@access private
const createBook = asyncHandler(async (req, res) => {
 console.log("The request body is :", req.body);
 const { title, author, isbn, description, imageUrl } = req.body; //destructuring
 if (!title || !author || !isbn || !description ) {
   res.status(400);
   throw new Error("All fields are mandatory !");
 }
 console.log("hre--------------------------")
 try{
   const book = await Book.create({
     title, author, isbn, description
    });
    res.status(201).json(book);
 }catch(error){
  console.error(error)
  return res.status(500).json("Unable to create book.")
 }

console.log(book, "book-----------------")
});


//@desc Get book
//@route GET /api/books/:id
//@access private
const getBook = asyncHandler(async (req, res) => {
 const {bookId} = req.query
 const book = await Book.findById(bookId);
 console.log("🚀 ~ getBook ~ book:", book)
 if (!book) {
   res.status(404);
   throw new Error("Book not found");
 }
 res.status(200).json(book);
});


//@desc Update book
//@route PUT /api/books/:id
//@access private
const updateBook = asyncHandler(async (req, res) => {
 console.log("here");
 const {_id : bookId} = req.body
 console.log("🚀 ~ updateBook ~ bookId:", bookId)
 const book = await Book.findById(bookId);
 console.log("🚀 ~ updateBook ~ book:", book)
 if (!book) {
   res.status(404);
   throw new Error("Book not found");
 }


 // if (contact.user_id.toString() !== req.user.id) {
 //   res.status(403);
 //   throw new Error("User don't have permission to update other user books");
 // }


 const updatedBook = await Book.findByIdAndUpdate(
   bookId,
   req.body,
   { new: true }
 );


 res.status(200).json(updatedBook);
});


//@desc Delete book
//@route DELETE /api/books/:id
//@access private
const deleteBook = asyncHandler(async (req, res) => {
 const {bookId} = req.query;
 console.log("🚀 ~ deleteBook ~ bookId:", bookId)
 const book = await Book.findById(bookId);
 if (!book) {
   res.status(404);
   throw new Error("Book not found");
 }
 await Book.deleteOne({ _id:bookId });
 res.status(200).json(book);
});


module.exports = {
 getBooks,
 createBook,
 getBook,
 updateBook,
 deleteBook,
};
