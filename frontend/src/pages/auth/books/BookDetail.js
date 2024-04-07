import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BOOK } from '../../../helper/endPoints';
import { TOAST_FAILURE } from '../../../helper/helperFunctions';
import TopHeader from '../../../components/TopHeader';
import "../../../styles/bookcard.css"
import bookImage from '../../../public/book.jpg';



const BookDetail = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({})

  const getBook = () => {
    const bookId = id;
    axios.get(`${BOOK}`, { params: { bookId } })
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        TOAST_FAILURE("Unable to fetch book");
      });
  };

  useEffect(() => {
    getBook()
  }, [])

  return (
    <>
      <TopHeader />
      <div className="detail-card__container">

        <div className="preview-card__img">
          <img src={bookImage} alt="" />
        </div>
        <div className="detail-card__header">
          <div className='detail-card__detail-container'>
            <span className='text-gray book-details__key'>TITLE: </span>
            <span className='book-details__property'>
              {book.title}
            </span>
          </div>
          <div className='detail-card__detail-container'>
            <span className='text-gray book-details__key'>AUTHOR: </span>
            <span className='book-details__property'>
              {book.author}
            </span>
          </div>
          <div className='detail-card__detail-container'>
            <span className='text-gray book-details__key'>ISBN: </span>
            <span className='book-details__property'>
              {book.isbn}
            </span>
          </div>
          <div className='detail-card__detail-container'>
            <span className='text-gray book-details__key'>Description: </span>
            <span className='book-details__property'>
              {book.description}
            </span>
          </div>
        </div>

      </div>
    </>
  )
}

export default BookDetail