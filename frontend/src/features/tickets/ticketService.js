import axios from "axios";

const API_URL = "/api/tickets/"

const commitTicketCreation = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, ticketData, config);
    return response.data;
}


const commitGetTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data;
}

const commitGetTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + ticketId, config);
    return response.data;
}

const commitUpdateTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + ticketId, {status: "closed"}, config);
    return response.data;
}

const ticketService = {
    commitTicketCreation,
    commitGetTickets,
    commitGetTicket,
    commitUpdateTicket
}

export default ticketService;