document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Récupérer les données de l'utilisateur depuis localStorage
        const userData = JSON.parse(localStorage.getItem("user_data"));

        // Si aucune donnée utilisateur n'est trouvée, rediriger vers la page de connexion
        if (!userData) {
            window.location.href = "index.html";
            return;
        }

        // Affichage du nom d'utilisateur dans le DOM
        document.getElementById("username").innerText = `Bonjour, ${userData.username}#${userData.discriminator}`;

        // Filtrer les serveurs où l'utilisateur est administrateur (permissions & 0x20)
        const adminGuilds = userData.guilds.filter(g => (g.permissions & 0x20) === 0x20);
        const serverList = document.getElementById("serverList");

        // Vérifier s'il y a des serveurs où l'utilisateur est admin
        if (adminGuilds.length === 0) {
            serverList.innerHTML = "<li>❌ Aucun serveur où vous êtes admin</li>";
        } else {
            adminGuilds.forEach(g => {
                // Si le serveur a une icône, l'afficher, sinon utiliser une image par défaut
                const iconUrl = g.icon 
                    ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`
                    : "default-server-icon.png";  // Remplace par ton image par défaut

                // Créer un élément de liste pour chaque serveur
                let listItem = document.createElement("li");
                listItem.innerHTML = `<img src="${iconUrl}" width="32"> ${g.name}`;
                
                // Ajouter un événement de clic pour rediriger vers le dashboard du serveur
                listItem.addEventListener("click", () => {
                    window.location.href = `dashboard.html?guild=${g.id}`;
                });

                // Ajouter l'élément à la liste des serveurs
                serverList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        window.location.href = "index.html";
    }
});
