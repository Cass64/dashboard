document.addEventListener("DOMContentLoaded", async () => {
    const fragment = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = fragment.get("access_token");

    if (!accessToken) {
        window.location.href = "index.html";
        return;
    }

    try {
        const userResponse = await fetch("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const user = await userResponse.json();

        const guildResponse = await fetch("https://discord.com/api/users/@me/guilds", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const guilds = await guildResponse.json();

        const adminGuilds = guilds.filter(g => (g.permissions & 0x20) === 0x20);
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
        console.error("Erreur :", error);
        window.location.href = "index.html";
    }
});
