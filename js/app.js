window.addEventListener("load", async () => {

    await iniciarCrawler();

    criarMenuPlaylists();

    mostrarPlaylist("Todas as músicas");

});