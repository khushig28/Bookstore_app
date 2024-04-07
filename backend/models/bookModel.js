const mongoose = require("mongoose");


const bookSchema = mongoose.Schema(
 {
   title: {
     type: String,
     required: [true, "Please add the book title"],
   },
   author: {
     type: String,
     required: [true, "Please add the book author"],
   },
   isbn: {
     type: String,
     unique: true,
     required: [true, "Please add the book ISBN"],
   },
   description: {
     type: String,
     required: [true, "Please add a description for the book"],
   },
   imageUrl: {
     type: String
   },
 },
 {
   timestamps: true,
 }
);


module.exports = mongoose.model("Book", bookSchema);