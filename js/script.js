const urlApi = 'https://pokeapi.co/api/v2/pokemon'


async function testeApi() {
    const response = await returnResponse()
    const dbPokemon = await returnList(response)

    document.getElementById('content').innerHTML = dbPokemon.map(e => e).join('')
}


async function returnResponse() {
    const response = await fetch(urlApi)
        .then(e => e.json())
        .then(e => e.results)
        .then(e => e.map(e => e.url))
    return response
}


async function returnList(response) {
    const dbPokemon = []
    for (const pokemon of response) {
        const responseFor = await fetch(pokemon)
            .then(e => e.json())

        dbPokemon.push(`
                <a href="#" class="col-3 ">
                    <h3>${responseFor.name}</h3>
                    <img src="${responseFor.sprites.other.home.front_default}"./img/1.png" alt=${responseFor.name}>
                    <p>Habilidades:</p>
                    <ul>
                        ${responseFor.abilities.map(e => `<li>${e.ability.name}</li>`).join('')}
                    </ul>
                </a>
        `)
    }
    return dbPokemon
}

window.onload = testeApi()


async function searchPokemon() {
    const search = document.getElementById('search-pokemon').value
    const response = await returnResponse()
    const dbPokemon = await returnList(response)
    const searchPokemon = dbPokemon.filter(e => e.includes(search))

    document.getElementById('content').innerHTML = searchPokemon.map(e => e).join('')
}