const playlists = {};

playlists["Todas as músicas"] = {

    nome: "Todas as músicas",

    pasta: "/musicas",

    musicas: []

};

// Contadores
let totalMusicas = 0;
let totalPlaylists = 0;

//----------------------------------------

async function iniciarCrawler() {

    console.log("Iniciando crawler...");

    const todas = await explorarPasta(
        "/musicas",
        "Todas as músicas",
        true
    );

    playlists["Todas as músicas"].musicas = todas;

    totalMusicas = todas.length;
    totalPlaylists = Object.keys(playlists).length;

    console.log(playlists);

}

async function explorarPasta(url, nomePlaylist, raiz = false) {

    console.log("Explorando:", url);

    const resposta = await fetch(url);

    const html = await resposta.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(html, "text/html");

    const links = [...doc.querySelectorAll("li a")];

    let musicas = [];

    //----------------------------------------
    // Primeiro adiciona os mp3 desta pasta
    //----------------------------------------

    for (const link of links) {

        if (link.classList.contains("icon-mp3")) {

            musicas.push(
                criarMusica(
                    link,
                    nomePlaylist,
                    url
                )
            );

        }

    }

    //----------------------------------------
    // Agora percorre as subpastas
    //----------------------------------------

    for (const link of links) {

        if (!link.classList.contains("icon-directory"))
            continue;

        const nome = link.title.trim();

        if (nome == "..")
            continue;

        const href = link.getAttribute("href");

        const musicasFilhas = await explorarPasta(
            href,
            nome,
            false
        );

        musicas.push(...musicasFilhas);

    }

    //----------------------------------------
    // Cria playlist apenas se houver músicas
    //----------------------------------------

    if (!raiz && musicas.length > 0) {

        playlists[nomePlaylist] = {

            nome: nomePlaylist,

            pasta: url,

            musicas: [...musicas]

        };

        console.log(
            "Playlist:",
            nomePlaylist,
            musicas.length,
            "músicas"
        );

    }

    return musicas;

}

function criarMusica(link, playlist, pasta) {

    return {

        nome: removerExtensao(link.title),

        arquivo: link.getAttribute("href"),

        playlist: playlist,

        pasta: pasta

    };

}

function removerExtensao(nome) {

    return nome.replace(/\.mp3$/i, "");

}