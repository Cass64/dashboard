const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (!code) {
    alert("Erreur d'authentification.");
    window.location.href = "index.html";
} else {
    fetchToken(code);
}

async function fetchToken(code) {
    const API_URL = "https://ton-backend-sur-render.com/auth/callback";  // Remplace par ton URL Render

    try {
        const response = await fetch(`${API_URL}?code=${code}`);
        if (!response.ok) throw new Error("Erreur lors de l'obtention du token.");

        const tokenData = await response.json();
        localStorage.setItem("access_token", tokenData.access_token);

        // Récupérer les infos de l'utilisateur
        fetchUser(tokenData.access_token);
    } catch (error) {
        console.error(error);
        alert("Échec de l'authentification.");
        window.location.href = "index.html";
    }
}

async function fetchUser(accessToken) {
    const API_URL = "https://ton-backend-sur-render.com/auth/user";  // Remplace par ton URL Render

    try {
        const response = await fetch(API_URL, {
            headers: { "Authorization": accessToken }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des infos utilisateur.");

        const userData = await response.json();
        localStorage.setItem("user_data", JSON.stringify(userData));

        // Rediriger vers le dashboard
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error);
        alert("Échec de la récupération des données.");
        window.location.href = "index.html";
    }
}
