"use strict";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const response = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
    } catch (error) {
        console.error("Något gick fel vid registrering", error);
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
    } catch (error) {
        console.error("Något gick fel vid inloggning", error);
    }

    const data = await response.json();
    
    localStorage.setItem("token", data.token);
    window.location.href = "/protected.html";
});