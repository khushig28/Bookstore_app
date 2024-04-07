import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';
import { BOOK } from '../../../helper/endPoints';
import { TOAST_FAILURE } from '../../../helper/helperFunctions';

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
    <div className="card">
      <div className="card-header">
        Featured
      </div>
      <div className="card-body">
        <div className='d-flex justify-contentp-between'>
        image
        <div>
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.description}</p>
        </div>

        </div>
      
      </div>
    </div>
  )
}

export default BookDetail