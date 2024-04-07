import React, { useState } from 'react';
import "../../styles/register.css";
import axios from 'axios';
import { LOGIN } from '../../helper/endPoints';
import { Link, useNavigate } from 'react-router-dom';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../helper/helperFunctions';
import { BOOK_LISTINGS } from '../../helper/routeConstants';


const Login = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const submitForm = () => {
    localStorage.setItem('isAdmin', false);
    axios.post(LOGIN, data)
    .then(response => {
      TOAST_SUCCESS(`User logged in successfully.`);
      if(response.data.isAdmin === true){
        localStorage.setItem('isAdmin', true);
      }
      navigate(BOOK_LISTINGS);
    })
    .catch(error => {
      console.error('There was an error!', error);
      TOAST_FAILURE("Unable to login");
    });
  }
    

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login to your account</h2>
                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">Your Email</label>
                      <input type="email" id="email" className="form-control form-control-lg" onChange={handleChange} />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" id="password" className="form-control form-control-lg" onChange={handleChange} />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="button" onClick={submitForm} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/register" className="fw-bold text-body"><u>Register here</u></Link></p>                                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Login;
