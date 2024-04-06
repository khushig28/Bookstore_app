import React, { useEffect, useState } from 'react';
import { BOOKS } from '../../../helper/endPoints';
import "../../../styles/bookcard.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TOAST_FAILURE } from '../../../helper/helperFunctions';
import { VIEW_BOOK } from '../../../helper/routeConstants';

const BookListing = () => {
const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    const getBooks = () => {
        axios.get(BOOKS)
        .then(response => {
            console.log(response);
            setBooks(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
          TOAST_FAILURE("Unable to fetch books");
        });
    };

    useEffect(()=>{
        getBooks();
    },[]);
    const handleUpdateClick = (id) => {
        navigate(`/books/add/${id}`);
    };

    return (
        <div className="container">
            <div className="row mt-5">
                {books && books.length > 0 && books.map((book, index) => {
                    return (
                        <div className="preview-card" key={index}>
                            <div className='d-flex justify-content-end w-100'>
                                <span className='cursor-pointer' onClick={() => handleUpdateClick(book._id)}>Update this Book</span>
                                    </div>
                            <div className="preview-card__wrp">
                                <div className="preview-card__item">
                                    <div className="preview-card__img">
                                        <img src={book.imageUrl} alt="" />
                                    </div>
                                    
                                    <div className="preview-card__content">
                                        <span className="preview-card__code">{book.isbn}</span>
                                        <div className="preview-card__title">{book.title}</div>
                                        <div className="preview-card__text">~written by: {book.author}</div>
                                        <div className="preview-card__text">{book.description}</div>
                                        <Link to={`${VIEW_BOOK}/${book._id}`} className="preview-card__button">READ MORE</Link>                                    </div>
                                </div>
                            </div>
                        </div> 
                    );
                })}
            </div>
        </div>
    );
};

export default BookListing;
