import axios from "axios";

const API_URL = "/api/users"

const commitRegister = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

const commitLogin = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}

const logoutUserFromLocalStorage = () => {
    localStorage.removeItem("user");
}


// const commitRegister = async (userData) => {
//     const options = {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json;charset=UTF-8",
//         },
//         body: JSON.stringify(userData),
//     };
//     const response = await fetch(API_URL, options);
//     // if (data) {
//     //     localStorage.setItem("user", JSON.stringify(data));
//     // }
//     const data = await response.json()
//     return data;
// }

const authService = {
    commitRegister, logoutUserFromLocalStorage, commitLogin
}

export default authService;
