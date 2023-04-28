import React from 'react';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {resetFunc, getUserTickets} from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {

    const {tickets, isLoading, isSuccess} = useSelector((state) => {
        return state.tickets;
    });
    const dispatch = useDispatch();

    useEffect(function() {
        dispatch(getUserTickets());
    }, [dispatch]);

    /// preventing unmounting errors
    useEffect(function() {
       return () => {
           if(isSuccess) {
               dispatch(resetFunc())
           }
       }
    }, [dispatch, isSuccess]);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className={"d-flex mb-3"}>
                <BackButton url={"/"}/>
            </div>
            <section>
                <h1 className={"fw-bold"}>Tickets</h1>
            </section>

            {tickets.length !== 0 ?
                <section>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Status</th>
                            <th/>
                        </tr>
                        </thead>
                        {tickets.map(function(ticket) {
                            return <TicketItem key={ticket._id} ticket={ticket}/>
                        })}
                    </table>
                </section>
                :
                <div className={"mt-4"}>
                    <h3>No Tickets Found</h3>
                </div>
            }
        </>
    );
};

export default Tickets;