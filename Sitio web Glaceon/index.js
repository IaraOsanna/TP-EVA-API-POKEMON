const pokemonContainer = document.getElementById("pokemon-container");
const botonInformacion = document.getElementById("cambiar-informacion");

let pokemonData;
let mostrarEstadisticas = false;

fetch("https://pokeapi.co/api/v2/pokemon/glaceon")
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo obtener la informacion del Pokemon.");
        }

        return response.json();
    })
    .then(data => {
        pokemonData = data;

        mostrarPokemon(data);
    })
    .catch(error => {
        pokemonContainer.innerHTML = `
            <div class="pokemon-card">
                <h2>Error</h2>
                <p>${error.message}</p>
            </div>
        `;
    });

function mostrarPokemon(pokemon) {

    let tipos = "";

    pokemon.types.forEach(tipoPokemon => {
        tipos += `
            <span class="tipo">
                ${tipoPokemon.type.name}
            </span>
        `;
    });

    let estadisticas = "";

    pokemon.stats.forEach(estadistica => {
        estadisticas += `
            <p>
                <strong>${estadistica.stat.name}:</strong>
                ${estadistica.base_stat}
            </p>
        `;
    });

    pokemonContainer.innerHTML = `
        <div class="pokemon-card">

            <img 
                src="${pokemon.sprites.other["official-artwork"].front_default}" 
                alt="Imagen de ${pokemon.name}"
            >

            <h2>${pokemon.name.toUpperCase()}</h2>

            <div>
                ${tipos}
            </div>

            <div class="info">

                <p>
                    <strong>Numero:</strong>
                    #${pokemon.id}
                </p>

                <p>
                    <strong>Altura:</strong>
                    ${pokemon.height / 10} m
                </p>

                <p>
                    <strong>Peso:</strong>
                    ${pokemon.weight / 10} kg
                </p>

                <div id="estadisticas">
                    ${mostrarEstadisticas ? estadisticas : ""}
                </div>

            </div>

        </div>
    `;
}

botonInformacion.addEventListener("click", () => {

    mostrarEstadisticas = !mostrarEstadisticas;

    mostrarPokemon(pokemonData);

    if (mostrarEstadisticas) {
        botonInformacion.textContent = "Ocultar estadísticas";
    } else {
        botonInformacion.textContent = "Mostrar estadísticas";
    }
});