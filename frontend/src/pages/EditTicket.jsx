import React, {useEffect} from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {updateUserTicket, getUserTicket, resetFunc} from "../features/tickets/ticketSlice";
import {toast} from "react-toastify";
import BackButton from "../components/BackButton";
import Select from "react-select";



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

    const handleChange = (selectedOption) => {
        setProduct(selectedOption.value);
    };
    const options = [
        {value: "iPhone", label: "iPhone"},
        {value: "iPad", label: "iPad"},
        {value: "iMac", label: "iMac"},
        {value: "Macbook Air", label: "Macbook Air"},
        {value: "Macbook Pro", label: "Macbook Pro"},
    ];

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
                        <Select className={"text-start"} placeholder={`${ticket.product}`} options={options} onChange={handleChange}/>
                    </div>

                    <div className={"mb-3"}>
                        <label htmlFor="description" className="form-label">Description of issue</label>
                        <textarea
                            rows={7}
                            autoComplete={"off"}
                            id={"description"}
                            className={"form-control"}
                            value={description === undefined ? ticket.description : description}
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