"use strict";

import "../css/main.scss";

// Kollar om användaren är inloggad genom att kolla efter token i localStorage
const token = localStorage.getItem("token");

// Om ingen token finns, omdirigera till inloggningssidan
if (!token) {
    window.location.href = "/index.html";
}

// Om en token finns görs en förfrågan till den skyddade sidan
const response = await fetch("http://localhost:3000/api/protected", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
});

const data = await response.json();
document.getElementById("message").textContent = data.message;