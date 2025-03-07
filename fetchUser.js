const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

console.log("Code obtenu: ", code);  // Ajoute cette ligne pour vérifier le code

if (!code) {
    alert("Erreur d'authentification.");
    window.location.href = "index.html";
} else {
    fetchToken(code);
}

async function fetchToken(code) {
    const API_URL = "https://casseco-6sa8.onrender.com/auth/callback";

    try {
        const response = await fetch(`${API_URL}?code=${code}`);
        if (!response.ok) throw new Error("Erreur lors de l'obtention du token.");

        const tokenData = await response.json();
        console.log("Token reçu: ", tokenData);  // Vérifie si le token est bien reçu
        localStorage.setItem("access_token", tokenData.access_token);

        fetchUser(tokenData.access_token);
    } catch (error) {
        console.error(error);
        alert("Échec de l'authentification.");
        window.location.href = "index.html";
    }
}

async function fetchUser(accessToken) {
    const API_URL = "https://casseco-6sa8.onrender.com/auth/user";

    try {
        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des infos utilisateur.");

        const userData = await response.json();
        console.log("Données utilisateur: ", userData);  // Vérifie si les données sont reçues
        localStorage.setItem("user_data", JSON.stringify(userData));

        // Optionnel : Afficher les données de l'utilisateur dans la console pour déboguer
        console.log(userData);

        // Rediriger vers la page des serveurs
        window.location.href = "servers.html";
    } catch (error) {
        console.error(error);
        alert("Échec de la récupération des données.");
        window.location.href = "index.html";
    }
}
