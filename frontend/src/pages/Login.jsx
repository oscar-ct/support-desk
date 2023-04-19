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
                <h1>
                    <FaSignInAlt/>Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section>
                <form onSubmit={LoginUser}>
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
                        <button
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