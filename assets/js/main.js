let offset = 0;
let pagina = 0;
const limit = 20;

function avancarPagina() {
    pagina = pagina + 1;
    offset = pagina * limit;
    const divLista = document.getElementById('lista-pokemons');
    divLista.innerHTML = ""
    main();
}

function main() {

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then(resposta => {
        resposta.json().then(respostaObjetoJavascript => {
            console.log(respostaObjetoJavascript)
            const listaPokemons = respostaObjetoJavascript.results;
            console.log(listaPokemons);
            // Pegar dados de cada pokemon
            listaPokemons.forEach(pokemon => {
                console.log(pokemon)
                fetch(pokemon.url).then(pokemonResposta => {
                    pokemonResposta.json().then(respostaPokemonObjeto => {
                        console.log(respostaPokemonObjeto);
                        const divLista = document.getElementById('lista-pokemons')
                        const htmlPokemon = `
                            <li class="pokemon ${respostaPokemonObjeto.types[0].type.name}">
                                <span class="number">#${respostaPokemonObjeto.id}</span>
                                <span class="name primeira-maiuscula">${respostaPokemonObjeto.name}</span>

                                <div class="detail">
                                    <ol class="types">
                                        <li class="type">${respostaPokemonObjeto.types[0].type.name}</li>
                                        ${respostaPokemonObjeto.types.length > 1 ? `<li class="type">${respostaPokemonObjeto.types[1].type.name}</li>` : ''}
                                    </ol>

                                    <img src="${respostaPokemonObjeto.sprites.front_default}"
                                        alt="${respostaPokemonObjeto.name}">
                                </div>
                                <div class="info-adicional">
                                    <span><strong>HP:</strong> ${respostaPokemonObjeto.stats[0].base_stat}</span>
                                    <span><strong>Attack:</strong> ${respostaPokemonObjeto.stats[1].base_stat}</span>
                                    <span><strong>Defense:</strong> ${respostaPokemonObjeto.stats[2].base_stat}</span>
                                    <span><strong>Special Attack:</strong> ${respostaPokemonObjeto.stats[3].base_stat}</span>
                                    <span><strong>Special Defense:</strong> ${respostaPokemonObjeto.stats[4].base_stat}</span>
                                    <span><strong>Speed:</strong> ${respostaPokemonObjeto.stats[5].base_stat}</span>
                                    <span><strong>Base Experience:</strong> ${respostaPokemonObjeto.base_experience}</span>
                                    <span class="primeira-maiuscula"><strong>Specie:</strong> ${respostaPokemonObjeto.species.name}</span>
                                </div>
                            </li>
                        `
                        divLista.innerHTML = divLista.innerHTML + htmlPokemon
                    });
                });
            });
        })
    })
}

main();