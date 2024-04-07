import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CREATE_BOOK, BOOK, UPDATE_BOOK } from '../../../helper/endPoints';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../../helper/helperFunctions';
import { BOOK_LISTINGS } from "../../../helper/routeConstants";
import "../../../styles/register.css";

const AddUpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({ title: "", author: "", isbn: "", description: "", imageUrl: "" });
    const [book, setBook] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const submitForm = async () => {
        if (data.password !== data.confirmPassword) {
            return;
        } else {
            if(id){
                axios.put(UPDATE_BOOK, data)
                .then(response => {
                    TOAST_SUCCESS(`Book updated successfully.`);
                    navigate(BOOK_LISTINGS);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    TOAST_FAILURE("Unable to update the book.");
                });
            }else{
                axios.post(CREATE_BOOK, data)
                .then(response => {
                    TOAST_SUCCESS(`Book added successfully.`);
                    navigate(BOOK_LISTINGS);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    TOAST_FAILURE("Unable to add book.");
                });
            }
          
        }
    };

    const getBook = () => {
        const bookId = id;
        axios.get(`${BOOK}`, { params: { bookId } })
            .then(response => {
                console.log(response);
                setBook(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                TOAST_FAILURE("Unable to fetch book");
            });
    };

    useEffect(() => {
        if (id) {
            getBook();
        }
    }, [id]);

    useEffect(() => {
        if (book) {
            setData(book);
        }
    }, [book]);
    
    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">{id ? "UPDATE BOOK": "ADD BOOK"}</h2>
                                    <form>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="title">Title</label>
                                            <input type="text" id="title" className="form-control form-control-lg" value={data.title} onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="author">Author</label>
                                            <input type="text" id="author" className="form-control form-control-lg" value={data.author} onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="isbn">ISBN</label>
                                            <input type="text" id="isbn" className="form-control form-control-lg" value={data.isbn} onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="description">Description</label>
                                            <input type="text" id="description" className="form-control form-control-lg" value={data.description} onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="description">Image URL</label>
                                            <input type="text" id="imageUrl" className="form-control form-control-lg" value={data.imageUrl} onChange={handleChange} />
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={submitForm} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">{id ? "Update Book" : "Add Book"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddUpdateBook;

