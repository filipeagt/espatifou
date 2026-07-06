# 🎵 Espatifou

O **Espatifou** é um player de música para streaming em rede local desenvolvido apenas com **HTML, CSS e JavaScript**. O projeto não utiliza linguagens de backend nem banco de dados. Toda a indexação da biblioteca musical é realizada no navegador através de um crawler desenvolvido em JavaScript.

## Funcionalidades

* 🎵 Reprodução de arquivos MP3 diretamente pelo navegador.
* 📂 Indexação automática e recursiva de pastas.
* 📁 Criação automática de playlists com base na estrutura de diretórios.
* 🔍 Busca por músicas, artistas e playlists.
* ▶️ Controles de reprodução (Play/Pause, Próxima e Anterior).
* 📱 Interface responsiva para desktop e dispositivos móveis.
* 🌐 Streaming das músicas na rede local utilizando apenas um servidor HTTP simples.

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/espatifou.git
```

ou faça o download do projeto.

### 2. Adicione sua biblioteca de músicas

Copie todas as músicas e pastas que deseja disponibilizar para streaming dentro da pasta:

```text
musicas/
```

O Espatifou identifica automaticamente todos os arquivos **.mp3**, independentemente da profundidade das pastas.

Exemplo:

```text
musicas/
│
├── Rock/
│   ├── ACDC/
│   │   ├── Highway to Hell.mp3
│   │   └── Thunderstruck.mp3
│   │
│   └── Pink Floyd/
│       ├── Time.mp3
│       └── Money.mp3
│
├── Metal/
│   ├── Iron Maiden/
│   └── Judas Priest/
│
└── Blues/
    └── ZZ Top/
```

Cada pasta que contiver músicas será automaticamente transformada em uma playlist.

## Executando o projeto

O projeto foi desenvolvido para funcionar utilizando a extensão **Live Server** do Visual Studio Code.

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, caso ainda não possua.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione **Open with Live Server**.

O navegador será aberto automaticamente.

## Acessando pela rede local

Após iniciar o Live Server, outros dispositivos conectados à mesma rede poderão acessar o player utilizando o endereço IP do computador onde o projeto está sendo executado.

Exemplo:

```text
http://192.168.0.10:5500
```

Assim, celulares, tablets, notebooks e outros computadores poderão reproduzir as músicas diretamente pelo navegador, sem necessidade de instalar qualquer aplicativo.

## Como funciona

Todo o processamento é realizado no **frontend**.

Ao iniciar a aplicação, um crawler desenvolvido em JavaScript percorre recursivamente a pasta `musicas`, identificando:

* diretórios (utilizados para criação das playlists);
* arquivos `.mp3` (adicionados automaticamente à biblioteca).

Não é necessário criar listas de reprodução manualmente nem manter um banco de dados. Sempre que novos arquivos forem adicionados à pasta `musicas`, eles serão detectados automaticamente na próxima atualização da página.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* Live Server (Visual Studio Code)

## Estrutura do projeto

```text
Espatifou/
│
├── css/
├── js/
├── musicas/
├── favicon.ico
├── index.html
└── README.md
```

## Acesso pela Internet com Ngrok

Embora o Espatifou tenha sido projetado para uso em rede local, também é possível disponibilizá-lo pela Internet utilizando ferramentas de tunelamento como o **Ngrok**.

Basta iniciar o servidor local (por exemplo, utilizando o Live Server do Visual Studio Code) e criar um túnel HTTP apontando para a porta utilizada pela aplicação. O Ngrok fornecerá uma URL pública que poderá ser acessada de qualquer lugar, permitindo o streaming da sua biblioteca de músicas diretamente pelo navegador, sem a necessidade de configurar roteadores, abrir portas no firewall ou contratar um serviço de hospedagem.

Essa abordagem é ideal para testes, demonstrações ou para acessar sua biblioteca musical remotamente. Vale lembrar que a velocidade de reprodução dependerá da qualidade da conexão de Internet do computador que está hospedando o Espatifou, já que os arquivos de áudio continuam sendo servidos diretamente a partir da sua máquina.


## Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado sobre desenvolvimento Front-end, manipulação do DOM, indexação de arquivos e reprodução de mídia utilizando apenas tecnologias nativas da web.
