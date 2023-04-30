import React, {useEffect} from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {updateUserTicket, getUserTicket, resetFunc} from "../features/tickets/ticketSlice";
import {toast} from "react-toastify";
import BackButton from "../components/BackButton";


const EditTicket = () => {


    const {ticket, isLoading, isError, message } = useSelector((state) => {
        return state.tickets;
    });

    const [product, setProduct] = useState(ticket.product);
    const [description, setDescription] = useState(ticket.description);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {ticketId} = useParams();

    useEffect(function () {
        dispatch(getUserTicket(ticketId));

        if (ticket.status === "closed") {
            toast.error("This ticket is closed");
            navigate("/tickets");

        }
        if (isError) {
            toast.error(message);
        }
        dispatch(resetFunc());
    }, [dispatch, isError, navigate, ticketId, ticket.status, message]);


    const submitEditTicketForm = (e) => {
        e.preventDefault();
        const ticketData = {
            product,
            description,
        }
        dispatch(updateUserTicket({ticketData, ticketId}));
        dispatch(resetFunc());
        toast.success("Ticket Updated")
        navigate("/tickets");
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className={"w-100 d-flex mb-3"}>
                <BackButton url={"/tickets"}/>
            </div>
            <section className={"mx-auto"}>
                <h1 className={"fw-bold"}>Edit Ticket</h1>
                <p className={"my-4 fs-3 fw-bold text-black-50"}>Please fill out the form below</p>
            </section>
            <section className={"mx-md-5 px-lg-5"}>
                <form onSubmit={submitEditTicketForm}>
                    <div className={"mb-3"}>
                        <label htmlFor="product" className="form-label">Product Type</label>
                        <select
                            autoComplete={"off"}
                            id={"product"}
                            className={"form-select"}
                            value={product === undefined ? ticket.product : product}
                            name={"product"}
                            onChange={(e) => {
                                setProduct(e.target.value);
                            }}
                            required
                        >
                            <option value={"iPhone"}>
                                iPhone
                            </option>
                            <option value={"iPad"}>
                                iPad
                            </option>
                            <option value={"iMac"}>
                                iMac
                            </option>
                            <option value={"Macbook Air"}>
                                Macbook Air
                            </option>
                            <option value={"Macbook Pro"}>
                                Macbook Pro
                            </option>
                        </select>
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="description" className="form-label">Description of issue</label>
                        <textarea
                            rows={7}
                            autoComplete={"off"}
                            id={"description"}
                            className={"form-control"}
                            value={description === undefined ? ticket.description : description}
                            placeholder={"Please describe the nature of your issue"}
                            name={"description"}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            required

                        />
                    </div>
                    <div>
                        <button
                            className={"btn btn-dark mt-4"}
                            type={"submit"}
                        >
                            Edit Ticket
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditTicket;