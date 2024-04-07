// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import BookListing from './pages/auth/books/BookListing';
import { BOOK_LISTINGS, LOGIN, REGISTER, ADD_BOOK, UPDATE_BOOK, VIEW_BOOK } from './helper/routeConstants';
import AddUpdateBook from './pages/auth/books/AddUpdateBook';
import BookDetail from './pages/auth/books/BookDetail';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path={REGISTER} element={<Register />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={BOOK_LISTINGS} element={<BookListing />} />
          <Route path={ADD_BOOK} element={<AddUpdateBook/>} />
          <Route path={UPDATE_BOOK} element={<AddUpdateBook/>} />
          <Route path={`${VIEW_BOOK}/:id`} element={<BookDetail/>} />
        </Routes>
    </div>
  );
}

export default App;
