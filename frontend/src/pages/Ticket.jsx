import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getUserTicket, updateUserTicket} from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import {toast} from "react-toastify";
import {createTicketNote, getTicketNotes,} from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";
import Modal from "react-modal";
import {useState} from "react";
import {FaPlus} from "react-icons/fa";


const customModalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(44,44,44,0.64)'
    },
    content: {
        maxWidth: "600px",
        position: 'absolute',
        margin: "auto",
        top: '25%',
        bottom: '42%',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    },
}

Modal.setAppElement("#root");

const Ticket = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
    const {ticket, isLoading, isError, message} = useSelector((state) => {
        return state.tickets;
    });

    const {notes, isLoading: notesIsLoading, isError: notesIsError, message: notesMessage} = useSelector((state) => {
        return state.notes;
    })

    const dispatch = useDispatch();
    const {ticketId} = useParams();
    const navigate = useNavigate();


    useEffect(function () {
        if (isError) {
            toast.error(message);
        }
        if (notesIsError) {
            toast.error(notesMessage);
        }

        dispatch(getUserTicket(ticketId));
        dispatch(getTicketNotes(ticketId));
        // resetFunc();
        // notesResetFunc();

    }, [isError, notesIsError, dispatch, ticketId, message, notesMessage]);

    const ticketStatusColor = (status) => {
        if (status === "new") {
            return "bg-success"
        } else if (status === "open") {
            return "bg-primary"
        } else if (status === "closed") {
            return "bg-dark"
        }
    }
    const openModal = () => {
        setModalIsOpen(true);
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    const closeTicket = () => {
        dispatch(updateUserTicket(ticketId));
        toast.success("Ticket has been closed");
        navigate("/tickets");
    }

    const onNoteSubmitForm = (e) => {
        e.preventDefault();
        dispatch(createTicketNote({noteText, ticketId}))
        closeModal();
    }

    if (isLoading || notesIsLoading) {
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
            </section>

            <section>
                <div className={"p-3 w-100 bg-light d-flex flex-column align-items-start"}>
                    <div className={"fw-bold fs-6 mb-2"}>
                        Description of issue
                    </div>
                    <div>
                        {ticket.description}
                    </div>
                </div>
            </section>

            <section>
                <div className={"mt-3 w-100 d-flex flex-column align-items-start"}>
                    <div className={"fw-bold fs-5 mb-2"}>
                        Notes
                    </div>
                    {
                        ticket.status !== "closed" && (
                            <button onClick={openModal} className={"btn"}><FaPlus/> Add Note</button>
                        )
                    }

                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel={"Add Note"}>
                        <div className={"pb-4 w-100 d-flex justify-content-between border-bottom"}>
                            <div className={"fs-2"}>Add Note</div>
                            <button className={"btn btn-close"} onClick={closeModal}/>
                        </div>

                        <form onSubmit={onNoteSubmitForm}>
                            <div className={"mt-4 p-2"}>
                                <textarea
                                    rows={5}
                                    className={"form-control bg-light"}
                                    name={"noteText"}
                                    id={"noteText"}
                                    placeholder={"Type note here"}
                                    onChange={(e) => setNoteText(e.target.value)}
                                />
                            </div>
                            <div className={"border-top d-flex justify-content-end mt-4"}>
                                <div className={"mt-4"}>
                                    <button onClick={closeModal} className={"btn btn-secondary"}>
                                        Close
                                    </button>
                                    <button className={"ms-2 btn btn-primary"}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>

                    </Modal>

                    {
                        notes.map(function (note) {
                            return <NoteItem key={note._id} note={note}/>
                        })
                    }

                </div>
            </section>

            <div className={"mt-5"}>
                {
                    ticket.status !== "closed" && (
                        <div className={"d-flex justify-content-end"}>
                            <button onClick={closeTicket} className={"btn btn-danger"}>
                                Close Ticket
                            </button>
                        </div>
                    )

                }
            </div>
        </>
    );
};

export default Ticket;