import React from 'react';
import {useNavigate} from "react-router-dom";




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

    const navigate = useNavigate();


    return (

        <tbody style={{cursor: "pointer"}} className={"cursor bg-light"}>
            <tr>
                <td onClick={() => navigate("/ticket/" + ticket._id)} className={"py-4"}>
                    {new Date(ticket.createdAt).toLocaleString("en-US")}
                </td>
                <td onClick={() => navigate("/ticket/" + ticket._id)} className={"py-4"}>
                    {ticket.product}
                </td>
                <td onClick={() => navigate("/ticket/" + ticket._id)} className={"py-4"}>
                    <div className="d-flex align-items-center justify-content-center">
                        <div className={`${ticketStatusColor(ticket.status)} rounded-pill text py-1 w-100`}>
                            {ticket.status}
                        </div>
                    </div>
                </td>
                <td className={"py-4"}>
                    <div className={"d-flex justify-content-center"}>
                        {/*<Link className={"custom-link border border-secondary bg-white py-1 px-2 px-md-5 rounded"} to={`/ticket/${ticket._id}`}>*/}
                        {/*    View*/}
                        {/*</Link>*/}

                        {
                            ticket.createdAt !== ticket.updatedAt ? (
                                <div className={"px-3"}>
                                    {new Date(ticket.updatedAt).toLocaleString("en-US")}
                                </div>
                            ) : (
                                <div>
                                    <span className={"text-secondary"}>No updates</span>
                                </div>
                            )
                        }

                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default TicketItem;