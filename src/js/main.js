"use strict";

import "../css/main.scss";

// Hämtar DOM-element
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const logoutButton = document.getElementById("logga-ut-btn");

// Funktionalitet för att registrera en användare
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hämtar användarnamn och lösenord från formuläret
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    // Skickar en POST-förfrågan till APIet för att registrera en ny användare
    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        // Visar ett meddelande baserat på svaret från servern
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

// Funktionalitet för att logga in en användare
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hämtar användarnamn och lösenord från formuläret
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Skickar en POST-förfrågan till APIet för att logga in användaren
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        // Om inloggningen lyckas, sparas token i localStorage och användaren kommer till den skyddade sidan
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