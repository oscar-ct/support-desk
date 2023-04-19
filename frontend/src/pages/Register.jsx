import React, { useState } from 'react';
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    const registerUser = (e) => {
        e.preventDefault();
        if (password2 !== password) {
            toast.error("Passwords do not match")
        } else {

        }
    }

    return (
        <>
            <section>
                <h1 className={"fw-bold d-flex justify-content-center"}>
                    <FaUser/><span className={"ps-1"}>Register</span>
                </h1>
                <p className={"my-4 fs-3 fw-bold text-black-50"}>
                    Please create an account
                </p>
            </section>
            <section>
                <form onSubmit={registerUser}>
                    <div className={"mb-3"}>
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                        className={"form-control"}
                        type={"text"}
                        value={name}
                        name={"name"}
                        onChange={onChange}
                        placeholder={"John Doe"}
                        required
                        id={"name"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            id={"email"}
                            className={"form-control"}
                            type={"email"}
                            value={email}
                            name={"email"}
                            onChange={onChange}
                            placeholder={"email@gmail.com"}
                            required
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            className={"form-control"}
                            type={"password"}
                            value={password}
                            name={"password"}
                            onChange={onChange}
                            placeholder={"Enter password"}
                            required
                            id={"password"}
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="password2" className="form-label">Confirm Password</label>
                        <input
                            className={"form-control"}
                            type={"password2"}
                            value={password2}
                            name={"password2"}
                            onChange={onChange}
                            placeholder={"Confirm password"}
                            required
                            id={"password2"}
                        />
                    </div>
                    <div>
                        <button
                        className={"btn btn-dark mt-4"}
                        type={"submit"}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;