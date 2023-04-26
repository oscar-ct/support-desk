import React from 'react';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {resetFunc, getUserTickets} from "../features/tickets/ticketSlice";
import BackButton from "../components/BackButton";

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
            <BackButton url={"/"}/>
            Tickets
        </>
    );
};

export default Tickets;