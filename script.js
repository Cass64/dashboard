document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/discord/user"); // Récupère les infos depuis le serveur
        const data = await response.json();

        if (data.error) {
            console.error("Erreur :", data.error);
            window.location.href = "index.html";
            return;
        }

        // Affichage du nom d'utilisateur
        document.getElementById("username").innerText = `Bonjour, ${data.username}#${data.discriminator}`;

        // Filtrer les serveurs où l'utilisateur est admin
        const adminGuilds = data.guilds.filter(g => (g.permissions & 0x20) === 0x20);
        const serverList = document.getElementById("serverList");

        if (adminGuilds.length === 0) {
            serverList.innerHTML = "<li>❌ Aucun serveur où vous êtes admin</li>";
        } else {
            adminGuilds.forEach(g => {
                let listItem = document.createElement("li");
                listItem.innerHTML = `<img src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png" width="32"> ${g.name}`;
                listItem.addEventListener("click", () => {
                    window.location.href = `dashboard.html?guild=${g.id}`;
                });
                serverList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        window.location.href = "index.html";
    }
});
