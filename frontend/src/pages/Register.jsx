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
                <h1>
                    <FaUser/>Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section>
                <form onSubmit={registerUser}>
                    <div>
                        <input
                        type={"text"}
                        value={name}
                        name={"name"}
                        onChange={onChange}
                        placeholder={"John Doe"}
                        required
                        />
                    </div>
                    <div>
                        <input
                            type={"email"}
                            value={email}
                            name={"email"}
                            onChange={onChange}
                            placeholder={"email@gmail.com"}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type={"password"}
                            value={password}
                            name={"password"}
                            onChange={onChange}
                            placeholder={"Enter password"}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type={"password2"}
                            value={password2}
                            name={"password2"}
                            onChange={onChange}
                            placeholder={"Confirm password"}
                            required
                        />
                    </div>
                    <div>
                        <button
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