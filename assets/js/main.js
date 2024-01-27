const pokemonList = document.getElementById('pokemonList')
const butCarregarMais = document.getElementById('butCarregarMais')

const maxRegistros = 151 //Maximo de pokemons a mostrar
const limit = 5
let offset = 0

function loadPokemonItens(offset, limit){
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                </div>
            </li>
        `
    }

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })    
}

loadPokemonItens(offset, limit)

butCarregarMais.addEventListener('click', () => {
    offset += limit

    const qtdRegistros = offset + limit

    if (qtdRegistros >= maxRegistros) {
        const newLimit = maxRegistros - offset

        loadPokemonItens(offset, limit)
        butCarregarMais.parentElement.removeChild(butCarregarMais)

    }else{
        loadPokemonItens(offset, limit)
    }
})




