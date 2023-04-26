import {useEffect, useState,} from "react";
import {useSelector} from "react-redux";

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const {user} = useSelector((state) => {
        return state.auth;
    });

    useEffect(function () {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [user]);

    return { loggedIn, checkingStatus }

}