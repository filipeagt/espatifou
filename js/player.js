const estadoPlayer = {

    audio: document.getElementById("audio"),

    playlist: "Todas as músicas",

    indice: 0,

    musica: null,

    tocando: false

};

const btnPlay = document.getElementById("btn-play");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTitle = document.getElementById("current-title");

const currentPlaylist = document.getElementById("current-playlist");

function carregarMusica(musica) {

    const playlist = playlists[estadoPlayer.playlist];

    if (!playlist)
        return;

    estadoPlayer.indice = playlist.musicas.indexOf(musica);
    estadoPlayer.musica = musica;

    currentTitle.textContent = musica.nome;
    currentPlaylist.textContent = musica.playlist;

    atualizarMusicaAtual(estadoPlayer.indice);

    estadoPlayer.audio.pause();

    estadoPlayer.audio.src = musica.arquivo;

    estadoPlayer.tocando = false;

    btnPlay.textContent = "▶";

}

function tocarMusica(musica) {

    carregarMusica(musica);

    estadoPlayer.audio.play();

    estadoPlayer.tocando = true;

    btnPlay.textContent = "II";

}

function playPause() {

    if (!estadoPlayer.musica)
        return;

    if (estadoPlayer.audio.paused) {

        estadoPlayer.audio.play();
        btnPlay.textContent = "II";

    } else {

        estadoPlayer.audio.pause();
        btnPlay.textContent = "▶";

    }

}

function proximaMusica() {

    const lista = playlists[estadoPlayer.playlist].musicas;

    let indice = estadoPlayer.indice + 1;

    if (indice >= lista.length)
        indice = 0;

    tocarMusica(lista[indice]);

}

function musicaAnterior() {

    const lista = playlists[estadoPlayer.playlist].musicas;

    let indice = estadoPlayer.indice - 1;

    if (indice < 0)
        indice = lista.length - 1;

    tocarMusica(lista[indice]);

}

function selecionarPlaylist(nome) {

    estadoPlayer.playlist = nome;

    estadoPlayer.indice = 0;

    mostrarPlaylist(nome);

}

btnPlay.onclick = playPause;

btnNext.onclick = proximaMusica;

btnPrev.onclick = musicaAnterior;

estadoPlayer.audio.addEventListener(

    "ended",

    proximaMusica

);

estadoPlayer.audio.addEventListener(

    "timeupdate",

    () => {

        progress.value =
            estadoPlayer.audio.currentTime;

        progress.max =
            estadoPlayer.audio.duration || 0;

    }

);

progress.addEventListener(

    "input",

    () => {

        estadoPlayer.audio.currentTime = progress.value;

    }

);

volume.addEventListener(

    "input",

    () => {

        estadoPlayer.audio.volume =
            volume.value / 100;

    }

);

estadoPlayer.audio.volume = 1;

estadoPlayer.audio.addEventListener("play", () => {
    btnPlay.textContent = "II";
});

estadoPlayer.audio.addEventListener("pause", () => {
    btnPlay.textContent = "▶";
});