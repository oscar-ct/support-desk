import React, {useEffect} from 'react';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createTicket, resetFunc} from "../features/tickets/ticketSlice";
import {toast} from "react-toastify";
import BackButton from "../components/BackButton";


const CreateTicket = () => {

    const {user} = useSelector((state) => {
        return state.auth;
    });
    const {isLoading, isError, isSuccess, message} = useSelector((state) => {
        return state.ticket;
    })
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(function () {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            dispatch(resetFunc());
            navigate("/");
        }
        dispatch(resetFunc());
    }, [isSuccess, isError, message, navigate, dispatch,])

    const submitTicketForm = (e) => {
        e.preventDefault();
        dispatch(createTicket({
            product, description
        }));
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className={"w-100 d-flex mb-3"}>
                <BackButton url={"/"}/>
            </div>
            <section className={"mx-auto"}>
                <h1 className={"fw-bold"}>Create New Ticket</h1>
                <p className={"my-4 fs-3 fw-bold text-black-50"}>Please fill out the form below</p>
            </section>
            <section className={"mx-md-5 px-lg-5"}>
                    <div className={"mb-3"}>
                        <label htmlFor="name" className="form-label">Customer Name</label>
                        <input
                            autoComplete={"off"}
                            id={"name"}
                            className={"form-control"}
                            type={"text"}
                            value={name}
                            name={"email"}
                            required
                            disabled
                        />
                    </div>
                    <div className={"mb-3"}>
                        <label htmlFor="email" className="form-label">Customer Email</label>
                        <input
                            autoComplete={"off"}
                            id={"email"}
                            className={"form-control"}
                            type={"text"}
                            value={email}
                            name={"email"}
                            required
                            disabled
                        />
                    </div>
                <form onSubmit={submitTicketForm}>
                    <div className={"mb-3"}>
                        <label htmlFor="product" className="form-label">Product Type</label>
                        <select
                            autoComplete={"off"}
                            id={"product"}
                            className={"form-select"}
                            value={product}
                            name={"product"}
                            onChange={(e) => {
                                setProduct(e.target.value);
                            }}
                            required
                        >
                            <option value={""} disabled={true}>
                                --Please select an option--
                            </option>
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
                            autoComplete={"off"}
                            id={"description"}
                            className={"form-control"}
                            value={description}
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
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default CreateTicket;