const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

searchButton.addEventListener("click", async() => {
    const pokemonId = searchInput.value;
    const formattedName = formatPokemonName(pokemonId);
    const apiUrl = `${url}/${formattedName}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            alert("Pokémon not found");
            return;
        }
        const data = await response.json();
        //console.log(data);
        // Extract data
        displayPokemonData(data);
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


// Function to format Pokémon name
function formatPokemonName(rawName) {
    // Remove special characters except ♂ and ♀
    let formattedName = rawName.toLowerCase().replace(/[^\w♀♂-]/g, "");
    // Handle gender-specific names
    if (formattedName.includes("♀")) {
        formattedName = formattedName.replace("♀", "-f");
    } else if (formattedName.includes("♂")) {
        formattedName = formattedName.replace("♂", "-m");
    }
    // Replace spaces or underscores with dashes
    formattedName = formattedName.replace(/[\s_]+/g, "-");
    return formattedName;
}

function displayPokemonData(data) {
    pokemonName.textContent = data.name.toUpperCase(); // Capitalize name
    pokemonId.textContent = `#${data.id}`; // ID with #
    weight.textContent = `Weight: ${data.weight}`; // Weight
    height.textContent = `Height: ${data.height}`; // Height
    //console.log(data.types[0].type.name);
    
    hp.textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;
    attack.textContent = data.stats.find(stat => stat.stat.name === "attack").base_stat;
    defense.textContent = data.stats.find(stat => stat.stat.name === "defense").base_stat;
    specialAttack.textContent = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
    specialDefense.textContent = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
    speed.textContent = data.stats.find(stat => stat.stat.name === "speed").base_stat;
    
     // Clear and populate types
     types.innerHTML = ""; // Clear previous content
     data.types.forEach(typeInfo => {
         const typeElement = document.createElement("div");
         typeElement.textContent = typeInfo.type.name.toUpperCase(); // Add type name
         types.appendChild(typeElement); // Append to the #types element
     });

    // Add sprite image
    let sprite = document.getElementById("sprite");
    if (!sprite) {
        sprite = document.createElement("img");
        sprite.id = "sprite";
        document.body.appendChild(sprite); // Append sprite to the body
    }
    sprite.src = data.sprites.front_default; // Set sprite source
    sprite.alt = `${data.name} sprite`; // Set alternative text
}