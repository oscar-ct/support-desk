import React, { useState } from 'react';
import {FaSignInAlt} from "react-icons/fa";
// import {toast} from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const LoginUser = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <section>
                <h1 className={"fw-bold d-flex justify-content-center"}>
                    <FaSignInAlt/><span className={"ps-1"}>Login</span>
                </h1>
                <p className={"my-4 fs-3 fw-bold text-black-50"}>

                Please login to get support
                </p>
            </section>
            <section>
                <form onSubmit={LoginUser}>
                    <div className={"mb-3"}>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            id={"email"}
                            className={"form-control"}
                            type={"email"}
                            value={email}
                            name={"email"}
                            onChange={onChange}
                            placeholder={"Enter email"}
                            required
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="password" className="form-label">Password</label>
                            <input
                            id={"password"}
                            className={"form-control"}
                            type={"password"}
                            value={password}
                            name={"password"}
                            onChange={onChange}
                            placeholder={"Enter password"}
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