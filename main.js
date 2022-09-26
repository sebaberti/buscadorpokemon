//llamar a la api solo queremos que nos retorne data,  aca llamamos a la api y esperamos su repsuesta 

const requestApi = async (pokemon) => {
    const baseURL =  `https://pokeapi.co/api/v2/pokemon/`;
    const conexion = await fetch (baseURL + pokemon)
    .then(response =>response.json())
    .catch(reject=>console.log(reject) );

    return conexion;
}


// elementos html
const form =document.getElementById("form");
const input = document.getElementById("input");
const card = document.querySelector(".cardContainer");
const msgerror = document.querySelector(".msgError");

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

let pokemones = [];

  const saveLocalStorage =(pokemonList)=>{
     localStorage.setItem(`pokemones`, JSON.stringify(pokemonList))
  } 

const searchPokemon =  async e =>{
    e.preventDefault();
    const inputValue = input.value;
    const fetchedPokemon = await requestApi(inputValue);

    if(!fetchedPokemon){
        msgerror.textContent = `No existe el pokemon ingresado`
        msgerror.style.display ='block'
        return;
    }
       if (!inputValue){
        msgerror.textContent = `ingresa un numero de pokemon`
        msgerror.style.display ='block'
        return ;
    } else if (pokemones.some(pokemon => pokemon.id === fetchedPokemon.id)){
        msgerror.textContent = `ya buscaste ese pokemon`
        msgerror.style.display ='block'
        return;
    } 

    msgerror.style.display =`none`;
    pokemones = [fetchedPokemon];
    input.value= " ";
    renderCard(pokemones);
    saveLocalStorage(pokemones);
    setCardColor(pokemones)
    form.reset();
    
};

const setCardColor = array => {
    const color = typeColors[array[0].types[0].type.name];
    card.style.backgroundColor = `${color}`;
}; 

const renderCard = pokemonList => {
    card.innerHTML = pokemonList.map(pokemon => createHtml(pokemon)).join("");
};

//funciones para convertir peso y altura
const convertirHeigth = metro =>{
    let altura = metro / 10;
    return altura;
}

const convertirWeight = kilos =>{
    let peso = kilos / 10;
    return peso;
}

const createHtml = pokemon => {
    
const imgPokemon = pokemon.sprites.other.dream_world.front_default 
   return  `
   <div class="cardPokemon">
   <h3 class= "id">${pokemon.id}</h3>
   <div class = "card-header">
    <h2 class="pokemonName">${pokemon.name}</h2>
    <p class= "hp">HP ${pokemon.stats[0].base_stat}</P>
    </div>
    <div class = "card-img">
    <img src="${imgPokemon}" alt="pokemon" >
    </div>
    <div class= "card-info">
    <p class="type">Type: ${pokemon.types[0].type.name}</p>
    <p class="move">Moves: ${pokemon.moves[7].move.name}</p>
    <p class="p">Height: ${convertirHeigth(pokemon.height)} m</p>
    <p class="p">Weight: ${convertirWeight(pokemon.weight)} kg</p>
    </div>
</div>`
}



const init = () => {
    renderCard(pokemones);
    form.addEventListener(`submit`, searchPokemon);
    msgerror.style.display =`none`;
    
}

init();



