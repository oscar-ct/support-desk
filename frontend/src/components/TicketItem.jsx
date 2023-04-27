import React from 'react';
import {Link} from "react-router-dom";


const ticketStatusColor = (status) => {
    if (status === "new") {
        return "bg-success"
    } else if (status === "open") {
        return "bg-primary"
    } else if (status === "closed") {
        return "bg-dark"
    }
}


const TicketItem = ({ ticket }) => {
    return (

        <tbody className={"bg-light"}>
            <tr>
                <td className={"py-3"}>
                    {new Date(ticket.createdAt).toLocaleString("en-US")}
                </td>
                <td className={"py-3"}>
                    {ticket.product}
                </td>
                <td className={"py-3"}>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className={`${ticketStatusColor(ticket.status)} rounded-pill text w-100`}>
                            {ticket.status}
                        </div>
                    </div>
                </td>
                <td className={"py-3"}>
                    <Link className={"custom-link border border-secondary bg-white py-1 px-2 px-md-5 rounded"} to={`/ticket/${ticket._id}`}>
                        View
                    </Link>
                </td>
            </tr>
        </tbody>
    );
};

export default TicketItem;