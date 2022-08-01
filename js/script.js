const urlApi = 'https://pokeapi.co/api/v2/pokemon'


async function getPokemon() {
    let response = await returnResponse()
    let dbPokemon = await returnList(response)

    document.getElementById('content').innerHTML = dbPokemon.map(e => e).join('')
}


async function returnResponse() {
    let response = await fetch(urlApi)
    let pokemonData = await  response.json()
    let pokemonResults = await pokemonData.results
    let pokemonUrl = await pokemonResults.map(e => e.url)
    return pokemonUrl
}


async function returnList(response) {
    const dbPokemon = []
    for (const pokemon of response) {
        let responseFor = await fetch(pokemon)
        let pokemonData = await responseFor.json()

        dbPokemon.push(`
                <a href="#" class="col-3 ">
                    <h3>${pokemonData.name}</h3>
                    <img src="${pokemonData.sprites.other.home.front_default}"./img/1.png" alt=${pokemonData.name}>
                    <p>Habilidades:</p>
                    <ul>
                        ${pokemonData.abilities.map(e => `<li>${e.ability.name}</li>`).join('')}
                    </ul>
                </a>
        `)
    }
    return dbPokemon
}

window.onload = getPokemon()


async function searchPokemon() {
    let search = document.getElementById('search-pokemon').value
    let response = await returnResponse()
    let dbPokemon = await returnList(response)
    let searchPokemon = dbPokemon.filter(e => e.includes(search))

    document.getElementById('content').innerHTML = searchPokemon.map(e => e).join('')
}