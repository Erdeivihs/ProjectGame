import { getData, getFileRequest, getEliminar } from "../services/http.js";

export { indiegame};

    async function borrar(dato) {
        await getEliminar("indie", dato, localStorage.getItem("access_token"));
    }

async function indiegame() {
  let access_token = localStorage.getItem("access_token");
  let games = await getData('indie?select=*', access_token);
  let divPrincipal = document.querySelector("#principal");

  divPrincipal.innerHTML = `
    <link rel="stylesheet" type="text/css" href="./assets/css/game.css"> 
    <div class="container" id="container">
    </div>
    <button type="button" id="exit" href="#/menu" ><i class="fa-solid fa-xmark"></i></button>
  `;

  games.forEach(async game => {
    async function getCaratula(game) {
      console.log(game.id);
      let img = game.img;
      game.image_blob = false;
      if (img) {
        let imageBlob = await getFileRequest(img, access_token);
        if (imageBlob instanceof Blob) {
          game.image_blob = URL.createObjectURL(imageBlob);
        }
      }
      return game.image_blob;
    }

    let card = document.createElement("div");

    card.innerHTML = `
      <div class="card">
        <button type="button" id="borrar" data-gameid="${game.id}"><i class="fa-solid fa-trash"></i></button>
        <figure class="card__thumb">
          <img src="${await getCaratula(game)}" alt="Resoldre imatge" class="card__image">
          <figcaption class="card__caption">
            <h2 class="card__title">${game.name}</h2>
            <p class="card__snippet">${game.descripcio}</p>
            <a href="${game.steam}" class="card__button"><img src="./assets/img/steam.png" /></a>
          </figcaption>
        </figure>
      </div>
      <p id="demo"></p>
    `;

   
    card.querySelector("#borrar").addEventListener("click", function() {
      let gameid = this.getAttribute("data-gameid");
      borrar(gameid);
    });

    divPrincipal.querySelector("#container").append(card);
  });

  document.querySelector("#exit").addEventListener("click", function() {
    window.location.hash = '#/menu'
  })
}