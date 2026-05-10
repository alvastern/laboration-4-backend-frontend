"use strict";

import "../css/main.scss";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const logoutButton = document.getElementById("logga-ut-btn");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Konto skapat!";
        } else {
            message.textContent = data.error || "Kunde inte skapa konto.";
        }

    } catch (error) {
        message.textContent = "Något gick fel vid registrering.";
        console.error(error);
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {

            message.textContent = "Inloggning lyckades!";

            localStorage.setItem("token", data.token);

            window.location.href = "/protected.html";

        } else {

            message.textContent = data.error || "Fel användarnamn eller lösenord.";
        }

    } catch (error) {
        message.textContent = "Något gick fel vid inloggning.";
        console.error(error);
    }
});