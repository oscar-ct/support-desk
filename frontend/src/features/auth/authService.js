import axios from "axios";

const API_URL = "/api/users"

// const commitRegister = async (userData) => {
//     const response = await axios.post(API_URL, userData);
//     const data = response.json();
//     console.log(data);
//     // if (data) {
//     //     localStorage.setItem("user", JSON.stringify(data));
//     // }
//     return data;
// }


const commitRegister = async (userData) => {
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(userData),
    };
    const response = await fetch(API_URL, options);
    const data = response.json();
    // console.log(data);
    // if (data) {
    //     localStorage.setItem("user", JSON.stringify(data));
    // }
    return data;
}

const authService = {
    commitRegister
}

export default authService;
