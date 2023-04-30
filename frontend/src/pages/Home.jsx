import React from 'react';
import {Link} from "react-router-dom";
import {FaQuestionCircle, FaTicketAlt} from "react-icons/fa";
import {useSelector} from "react-redux";


const Home = () => {

    const {user} = useSelector((state) => {
        return state.auth;
    });

    return (
        <>
            <section className={"mx-auto"}>
                <h1 className={"fw-bold"}>What do you need help with?</h1>
                <p className={"my-4 fs-3 fw-bold text-black-50"}>Please choose from an option below</p>
            </section>


            <div className={"d-flex flex-column"}>
                <Link to={"/create-ticket"} className={"btn btn-light mt-3"}>
                    <FaQuestionCircle/> Create New Ticket
                </Link>
                <Link to={"/tickets"} className={"btn btn-dark mt-4"}>
                    <FaTicketAlt/> View My Tickets
                </Link>
            </div>
        </>
    );
};

export default Home;