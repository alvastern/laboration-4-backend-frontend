"use strict";

import "../css/main.scss";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/index.html";
}

const response = await fetch("http://localhost:3000/api/protected", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
});

const data = await response.json();
document.getElementById("message").textContent = data.message;