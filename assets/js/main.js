const pokemonList = document.getElementById("pokemonList");
const liPokemon = document.getElementsByClassName("pokemon");
const loadMoreButton = document.getElementById("loadMoreButton");
const content2 = document.getElementsByClassName("content-2");
const content = document.getElementsByClassName("content");
const pagination = document.getElementsByClassName("pagination");

const maxRecords = 151;

const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
    <div id="${
      pokemon.number
    }" class="divPokemons"  onClick="exibePokemon(id)";>
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}" >${type} </li>`)
                      .join("")}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function exibePokemon(idPokemon) {
  pokeApi.getPokemons(idPokemon - 1, 1).then((pokemons = []) => {
    // let id = pokemons[idPokemon - 1];
    console.log(pokemons);
    // console.log(idPokemon);

    let newHtml = pokemons.map(convertPokemonToPage).join("");
    // const newHtml = pokemons.map(convertPokemonToLi).join('')

    content[0].style.display = "none";
    content2[0].style.display = "block";
    content2[0].innerHTML += newHtml;
  });

  function convertPokemonToPage(pokemon) {
    return `
        ${pokemon.types
          .map((type) => ` <div class="divPokemon ${type}">`)
          .join("")}

             <!-- ..... Pokemons here ..... -->
            
                <li class="pokemon ${pokemon.type}">
                <a href="index.html">
                    <img src="./assets/img/png-clipart-metrostation-white-arrow-thumbnail.png"
                                alt="voltar" id="voltar">
                </a>
                    <H1 class="name">${pokemon.name}</H1>
                    <span class="number">#${pokemon.number}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}" >${type} </li>`
                              )
                              .join("")}
                        </ol>
                    </div>
                </li>
            </div>
       
        <div class="boxDetalhes">
            <img src="${pokemon.photo}"
                            alt="${pokemon.name}">

                <div class="menu">
                    <a href="#" active>About</a>
                    <a href="#">Base Stats</a>
                    <a href="#">Evolution</a>
                    <a href="#">Moves</a>
               
                <div class="detalhesEspecificos">
                    <div class="titulos">
                        <span>Species</span>
                        <span>Height</span>
                        <span>Weight</span>
                         <span>Abilities</span>
                    </div>
                    <div class="valores">
                        <span>Specie 1</span>
                        <span>90</span>
                        <span>80</span>
                        <span>Fly</span>
                    </div>
                </div>
            </div>
        </div>
        `;
  }
}
