import React, { useState } from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {loginUser, resetFunc} from "../features/auth/authSlice"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    // GLOBAL STATE TOOLS
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth);

    const navigate = useNavigate();
    useEffect(function () {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate("/");
        }
        dispatch(resetFunc());
    }, [user, isLoading, isError, isSuccess, navigate, message, dispatch]);



    const onChange = (e) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const loginUserFormSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        }
        dispatch(loginUser(userData));
    }

    return (
        <>
            <section>
                <h1 className={"fw-bold d-flex justify-content-center align-items-center"}>
                    <FaSignInAlt/><span className={"ps-1"}>Login</span>
                </h1>
                <p className={"my-4 fs-3 fw-bold text-black-50"}>

                Please login to get support
                </p>
            </section>
            <section>
                <form onSubmit={loginUserFormSubmit
                }>
                    <div className={"mb-3"}>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            autoComplete={"email"}
                            id={"email"}
                            className={"form-control"}
                            type={"email"}
                            value={email}
                            name={"email"}
                            onChange={onChange}
                            placeholder={"Enter your email"}
                            required
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="password" className="form-label">Password</label>
                            <input
                                autoComplete={"password"}
                            id={"password"}
                            className={"form-control"}
                            type={"password"}
                            value={password}
                            name={"password"}
                            onChange={onChange}
                            placeholder={"Enter your password"}
                            required
                        />
                    </div>
                    <div>
                        <button
                            className={"btn btn-dark mt-4"}
                            type={"submit"}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;