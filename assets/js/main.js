console.log('Sucesso!')


function main() {

    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20").then(resposta => {
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
                            <span class="name">${respostaPokemonObjeto.name}</span>
                        
                            <div class="detail">
                                <ol class="types">
                                    <li class="type">${respostaPokemonObjeto.types[0].type.name}</li>
                                    ${respostaPokemonObjeto.types.length > 1 ? `<li class="type">${respostaPokemonObjeto.types[1].type.name}</li>` : ''}
                                </ol>
                        
                                <img src="${respostaPokemonObjeto.sprites.front_default}"
                                    alt="${respostaPokemonObjeto.name}">
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