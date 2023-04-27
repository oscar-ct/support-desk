import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getUserTicket, resetFunc, updateUserTicket} from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import {toast} from "react-toastify";

const Ticket = () => {

    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => {
        return state.tickets;
    });

    const dispatch = useDispatch();
    const {ticketId} = useParams();
    const navigate = useNavigate();


    useEffect(function () {
        if (isError) {
            toast.error(message);
        }

        dispatch(getUserTicket(ticketId));
        resetFunc();

    }, [isSuccess, isError, dispatch, ticketId, message]);

    const ticketStatusColor = (status) => {
        if (status === "new") {
            return "bg-success"
        } else if (status === "open") {
            return "bg-primary"
        } else if (status === "closed") {
            return "bg-dark"
        }
    }

    const closeTicket = () => {
        dispatch(updateUserTicket(ticketId));
        toast.success("Ticket has been closed");
        navigate("/tickets");
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <>
            <div className={"d-flex mb-3"}>
                <BackButton url={"/tickets"}/>
            </div>
            <section>
                <div className={"d-flex align-items-center justify-content-between mb-3"}>
                    <div className={"fw-bold fs-3"}>Ticket ID: {ticket._id}</div>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className={`${ticketStatusColor(ticket.status)} rounded-pill text w-100`}>
                            {ticket.status}
                        </div>
                    </div>
                </div>
                <div className={"mb-3 d-flex align-items-center justify-content-between"}>
                    <div className={"fw-bold fs-5"}>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}</div>
                </div>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <div className={"fw-bold fs-5"}>Product: {ticket.product}</div>
                </div>
                <div className={"border-bottom mb-3 mt-2"}/>
                <div className={"p-3 w-100 bg-light d-flex flex-column align-items-start"}>
                    <div className={"fw-bold fs-6 mb-2"}>
                        Description of issue
                    </div>
                    <div>
                        {ticket.description}
                    </div>
                </div>
                <div className={"mt-3"}>
                {
                    ticket.status !== "closed" && (
                        <button onClick={closeTicket} className={"btn btn-danger"}>
                            Close Ticket
                        </button>
                    )

                }
                </div>
            </section>
        </>
    );
};

export default Ticket;