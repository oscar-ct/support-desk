import React from 'react';
import {FaArrowCircleLeft} from "react-icons/fa";
import {Link} from "react-router-dom";


const BackButton = ({url}) => {
    return (
        <Link to={url} className={"btn btn-light px-4"}>
            <FaArrowCircleLeft/> Back
        </Link>
    );
};

export default BackButton;