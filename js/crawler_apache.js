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

    if (!resposta.ok) {
        console.error("Erro ao acessar:", url);
        return [];
    }

    const html = await resposta.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const linhas = [...doc.querySelectorAll("table tr")];

    let musicas = [];

    for (const linha of linhas) {

        const img = linha.querySelector("img");
        const link = linha.querySelector("a");

        if (!img || !link)
            continue;

        const tipo = img.alt;
        const href = link.getAttribute("href");

        if (!href)
            continue;

        // -------------------------
        // Pasta pai
        // -------------------------
        if (tipo === "[PARENTDIR]")
            continue;

        // -------------------------
        // Arquivo MP3
        // -------------------------
        if (tipo === "[SND]") {

            const arquivo = new URL(
                href,
                window.location.origin + url + "/"
            ).pathname;

            musicas.push({

                nome: removerExtensao(
                    decodeURIComponent(link.textContent.trim())
                ),

                arquivo,

                playlist: nomePlaylist,

                pasta: url

            });

            continue;
        }

        // -------------------------
        // Diretório
        // -------------------------
        if (tipo === "[DIR]") {

            const proximaPasta = new URL(
                href,
                window.location.origin + url + "/"
            ).pathname;

            const nome = decodeURIComponent(
                href.replace(/\/$/, "")
            );

            const musicasFilhas = await explorarPasta(
                proximaPasta,
                nome,
                false
            );

            musicas.push(...musicasFilhas);
        }

    }

    if (!raiz && musicas.length > 0) {

        playlists[nomePlaylist] = {

            nome: nomePlaylist,

            pasta: url,

            musicas: [...musicas]

        };

        console.log(
            "Playlist criada:",
            nomePlaylist,
            musicas.length
        );
    }

    return musicas;
}


function criarMusica(link, playlist, pasta) {

    return {

        nome: removerExtensao(
            decodeURIComponent(link.textContent.trim())
        ),

        arquivo: link.getAttribute("href"),

        playlist: playlist,

        pasta: pasta

    };

}

function removerExtensao(nome) {

    return nome.replace(/\.mp3$/i, "");

}
