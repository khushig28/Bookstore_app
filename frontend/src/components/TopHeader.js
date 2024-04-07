import React from 'react';
import logo from '../public/booklogo.jpg';
import "../styles/navbar.css"
import { ADD_BOOK } from '../helper/routeConstants';
import { Link } from 'react-router-dom';

const TopHeader = ({ isAdmin }) => {
  return (
    <div className="navbar navbar-container">
      <div className="navbar-brand brand-name__container" href="#">
        <div className='logo-container'>
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          <span className='brand-name'>BOOKSTORE</span>
        </div>
        {
          isAdmin && <div>
            <Link to={ADD_BOOK}><button className='btn btn-dark'>+ Add New Book</button></Link>
          </div>
        }

      </div>
    </div>
  )
}

export default TopHeader;
