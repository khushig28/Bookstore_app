import React, { useEffect, useState } from 'react';
import { BOOKS, DELETE_BOOK } from '../../../helper/endPoints';
import "../../../styles/bookcard.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../../helper/helperFunctions';
import { ADD_BOOK, VIEW_BOOK } from '../../../helper/routeConstants';
import TopHeader from '../../../components/TopHeader';
import bookImage from '../../../public/book.jpg';


const BookListing = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)

    const getBooks = () => {
        axios.get(BOOKS)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                TOAST_FAILURE("Unable to fetch books");
            });
    };

    useEffect(() => {
        getBooks();
    }, []);

    useEffect(() => {
        const getData = localStorage.getItem("isAdmin");
        const isloginuseradmin = getData === "true" || getData === true ? true : false
        setIsAdmin(isloginuseradmin)
    }, [])

    const handleUpdateClick = (id) => {
        navigate(`/books/add/${id}`);
    };

    const handleDelete = (bookId) =>{
        axios.delete(DELETE_BOOK, { params: { bookId } })
        .then(response => {
            TOAST_SUCCESS(`Book deleted successfully.`);
            getBooks()
        })
        .catch(error => {
            console.error('There was an error!', error);
            TOAST_FAILURE("Unable to delete book.");
        });
    }

    return (
        <>
            <TopHeader isAdmin={isAdmin} />
            <div className="container">

                <div className="row mt-5">
                    <div className='d-flex justify-content-end mb-3'>
                    </div>
                    {books && books.length > 0 && books.map((book, index) => {
                        return (
                            <div className="preview-card" key={index}>
                                {isAdmin &&
                                <div className='d-flex justify-content-end w-100'>
                                    <div className=''>
                                        <span className='cursor-pointer mx-3' onClick={() => handleDelete(book._id)}><button className='btn btn-light'>Delete</button></span>
                                    </div>
                                    <div className=''>
                                        <span className='cursor-pointer' onClick={() => handleUpdateClick(book._id)}><button className='btn btn-primary'>Update</button></span>
                                    </div>
                                </div>
                                }
                                <div className="preview-card__wrp">
                                    <div className="preview-card__item">
                                        <div className="preview-card__img">
                                            <img src={bookImage} alt="" />                                        </div>

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
        </>
    );
};

export default BookListing;
