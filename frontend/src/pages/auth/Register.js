import React, { useState } from 'react';
import "../../styles/register.css";
import axios from 'axios';
import { REGISTER } from '../../helper/endPoints';
import { Link, useNavigate   } from 'react-router-dom';
import { TOAST_FAILURE, TOAST_SUCCESS } from '../../helper/helperFunctions';


const Register = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [passwordError, setPasswordError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };


    const submitForm = () => {
        if (data.password !== data.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError("");
            axios.post(REGISTER, data)
                .then(response => {
                    TOAST_SUCCESS(`User registered successfully.`);
                    navigate('/');
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    TOAST_FAILURE("Unable to create user.");
                });
        }
    };
    return (
        <section className="h-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="username">Your Name</label>
                                            <input type="text" id="username" className="form-control form-control-lg" onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="email">Your Email</label>
                                            <input type="email" id="email" className="form-control form-control-lg" onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <input type="password" id="password" className="form-control form-control-lg" onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
                                            <input type="password" id="confirmPassword" className="form-control form-control-lg" onChange={handleChange} />
                                            {passwordError && <div className="text-danger">{passwordError}</div>}
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={submitForm} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/" className="fw-bold text-body"><u>Login here</u></Link></p>                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;
