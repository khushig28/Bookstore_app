const express = require("express");
const {
   createBook,
   getBook,
   updateBook,
   deleteBook,
   getBooks,
} = require("../controllers/bookController");
const validateToken = require("../middleware/validateTokenHandler");


const router = express.Router();

router.get("/get", getBook);
router.put("/update", updateBook);
router.get("/getAll", getBooks);
router.delete("/delete", deleteBook);
router.post("/create", createBook);



module.exports = router;