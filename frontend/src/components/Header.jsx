import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutFunc, resetFunc} from "../features/auth/authSlice";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    
    const onClickLogout = () => {
        dispatch(logoutFunc());
        dispatch(resetFunc());
        navigate('/');
    }


    return (
        <header className={"header"}>
            <div className={"logo"}>
                <Link to={"/"}>Support Desk</Link>
            </div>
                <ul>
                    {user ? (
                        <li>
                            <button className={"btn"} type={"button"} onClick={onClickLogout}>
                                <FaSignOutAlt/>Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to={"/login"}>
                                    <FaSignInAlt/> Login
                                </Link>
                            </li>
                            <li>
                                <Link to={"/register"}>
                                    <FaUser/> Register
                                </Link>
                            </li>
                        </>
                    )}

                </ul>

        </header>
    );
};

export default Header;