const playlistList = document.getElementById("playlist-list");

const musicTable = document.getElementById("music-table");

const playlistTitle = document.getElementById("playlist-title");

const musicCount = document.getElementById("music-count");

const campoBusca =
    document.getElementById("search");

campoBusca.addEventListener("input", pesquisar);

let playlistAtual = "Todas as músicas";

function criarMenuPlaylists() {

    playlistList.innerHTML = "";

    Object.values(playlists).forEach(playlist => {

        const li = document.createElement("li");

        li.className = "playlist";

        if (playlist.nome == estadoPlayer.playlist)
            li.classList.add("active");

        li.textContent = playlist.nome;

        li.onclick = () => {

            selecionarPlaylist(playlist.nome);

        };

        playlistList.appendChild(li);

    });

}

function mostrarPlaylist(nome) {

    playlistAtual = nome;

    criarMenuPlaylists();

    const playlist = playlists[nome];

    playlistTitle.textContent = playlist.nome;

    musicCount.textContent =
        playlist.musicas.length + " músicas";

    preencherTabela(playlist.musicas);

    if (playlist.musicas.length > 0) {

        carregarMusica(playlist.musicas[0]);

    } else {

        estadoPlayer.audio.removeAttribute("src");
        estadoPlayer.audio.load();

        currentTitle.textContent = "Nenhuma música";
        currentPlaylist.textContent = "-";

    }

}

function preencherTabela(musicas) {

    musicTable.innerHTML = "";

    musicas.forEach((musica, indice) => {

        const tr = document.createElement("tr");

        tr.dataset.indice = indice;
        tr.dataset.arquivo = musica.arquivo;

        tr.innerHTML = `            

            <td><i class="col-icon">♪</i>${musica.nome}</td>

            <td>${musica.playlist}</td>

        `;

        tr.onclick = () => {

            tocarMusica(musica);

        };

        musicTable.appendChild(tr);

    });

}

function atualizarMusicaAtual(indice) {

    document.querySelectorAll("#music-table tr")
        .forEach(tr => {

            tr.classList.remove("playing");

            tr.querySelector(".col-icon").textContent = "♪";

        });

    const linha = document.querySelector(
        `#music-table tr[data-arquivo="${estadoPlayer.musica.arquivo}"]`
    );

    if (!linha)
        return;

    linha.classList.add("playing");

    linha.querySelector(".col-icon").textContent = "🔊";

}

function pesquisar() {

    const texto =
        campoBusca.value.toLowerCase();

    const lista =
        playlists[estadoPlayer.playlist].musicas;

    const filtradas = lista.filter(m => {

        return (

            m.nome.toLowerCase().includes(texto)

            ||

            m.pasta.toLowerCase().includes(texto)

            ||

            m.playlist.toLowerCase().includes(texto)

        );

    });

    preencherTabela(filtradas);

}