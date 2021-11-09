let isLoading = false;
let charactersCache = {};
let planetsCache = {};
let speciesCache = {};
let vehiclesCache = {};
let starshipsCache = {};

function main(){
        animation();
        getFirstPage();
        getPages();  
        
}
main();
function animation(){
    let path = anime.path(".path path");
    anime({   
        targets: ".x-wing",
        translateX: path("x"),
        translateY: path("y"),
        easing: "linear",
        duration: 12000,
        rotate: path("angle"),
        loop: true
    });
    anime({
        targets: ".star-wars path",
        strokeDashoffset: [anime.setDashoffset,0], 
        easing:"easeInOutCirc",
        duration: 3000,
        direction: "alternate",
        loop: true
    });    
}

function getFirstPage(){
    const request = fetch("https://swapi.dev/api/people/?page=1");
    let characters = document.querySelector(".characters")
    let currentPage = 1
    request.then(response => response.json()).then(data =>{
        charactersCache[currentPage] = data.results      
        document.querySelector(".loader-characters").classList.add("removeloader");
        for(let character of data.results){
            let button = document.createElement("button");
            button.innerText = character.name;
            characters.append(button);
        }
        renderCharacterInfo(data.results);
    });
 
}

function getPages(){
    let currentPage = Number(document.querySelector(".current-page").innerText);
    let navButtons = document.querySelectorAll(".page-nav button");
    
    for(let navButton of navButtons){
        navButton.addEventListener("click", () => {
        
            if(!isLoading){
                if(navButton.getAttribute("class").includes("previous")){
                    if(currentPage > 1){
                        document.querySelector(".current-page").innerText = --currentPage;
                        updatePage(currentPage);
                    }
                }
                else if(currentPage < 9){
                        document.querySelector(".current-page").innerText = 
                        ++currentPage;
                        updatePage(currentPage);
                }
            }         
        });
    }   
}

function updatePage(currentPage){
    let characters = document.querySelector(".characters")
    if(charactersCache[currentPage]){
        characters.innerHTML = "";
       
        for(let character of charactersCache[currentPage]){
            let button = document.createElement("button");
            button.innerText = character.name;
            characters.append(button);
        }
        renderCharacterInfo(charactersCache[currentPage]);
    }
    else{
        document.querySelector(".loader-characters").classList.remove("removeloader");
        isLoading = true;
        const request = fetch("https://swapi.dev/api/people/?page="+ currentPage);
        characters.innerHTML = "";
        request.then(response => response.json())
        .then(data =>{
            charactersCache[currentPage] = data.results
            isLoading = false
            document.querySelector(".loader-characters").classList.add("removeloader")
            for(let character of data.results){
                let button = document.createElement("button");
                button.innerText = character.name;
                characters.append(button);
            }
           
            renderCharacterInfo(data.results);
        });
    }
    
}
function renderCharacterInfo(characters){
    
    let buttons = document.querySelectorAll(".characters button");
    let details = document.querySelector(".person-details");
    let detailsButtons = document.querySelectorAll(".details-nav button");
    
    for(let button of buttons){
        button.addEventListener("click", () =>{ 
            removeActive(detailsButtons);
            detailsButtons.item(0).classList.add("active")
            for(let detailsButton of detailsButtons){
                detailsButton.classList.add("show")
            }

            for(let character of characters){
                if(character.name === button.innerText){
                    details.innerHTML = `
                        <h3>${character.name}</h3>
                        <p>Height: ${character.height}</p>
                        <p>Mass: ${character.mass}</p>
                        <p>Hair color: ${character.hair_color}</p>
                        <p>Skin color: ${character.skin_color}</p>
                        <p>Eye color: ${character.eye_color}</p>
                        <p>Birth year: ${character.birth_year}</p>
                        <p>Gender: ${character.gender}</p>                   
                    `
                    renderPlanetData(character);
                }
            }
            
        });
    }

    for(let detailsButton of detailsButtons){
        
        detailsButton.addEventListener("click", () => {
            removeActive(detailsButtons);
            let name = document.querySelector(".person-details h3").innerText;
            for(let character of characters){
                if(detailsButton.innerText === "Planet"){
                    if(character.name === name){
                        detailsButton.classList.add("active")
                        renderPlanetData(character);
                    }
                }
                else if(detailsButton.innerText === "Species"){
                    if(character.name === name){
                        detailsButton.classList.add("active")
                        renderSpeciesData(character);
                    }
                }
                else if(detailsButton.innerText === "Vehicles"){
                    if(character.name === name){
                        detailsButton.classList.add("active")
                        renderTransportFirstPage(character, "vehicles");
                    }
                }
                else{
                    if(character.name === name){
                        detailsButton.classList.add("active")
                        renderTransportFirstPage(character, "starships");
                    }
                }
            }

        })
        
    }
    
}

function removeActive(detailsButtons){
    for(button of detailsButtons){
        button.classList.remove("active");
    }

}

function renderPlanetData(character){
    let detailsContainer = document.querySelector(".planet-details");
    if(planetsCache[character.homeworld]){

        detailsContainer.innerHTML = `
                <h3>${planetsCache[character.homeworld].name}</h3>
                <p>Rotation period: ${planetsCache[character.homeworld].rotation_period}</p>
                <p>Orbital period: ${planetsCache[character.homeworld].orbital_period}</p>
                <p>Diameter: ${planetsCache[character.homeworld].diameter}</p>
                <p>Climate: ${planetsCache[character.homeworld].climate}</p>
                <p>Gravity: ${planetsCache[character.homeworld].gravity}</p>
                <p>Terrain: ${planetsCache[character.homeworld].terrain}</p>                
            ` 
    }
    else{
        if(!isLoading){
            detailsContainer.innerHTML = `<div class="loader-planets loadplanets"></div>`;
            isLoading = true               
            let request = fetch(character.homeworld);
            request.then(response => response.json()).then(data =>{
                planetsCache[character.homeworld] = data
                
                isLoading = false
            detailsContainer.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Rotation period: ${data.rotation_period}</p>
                    <p>Orbital period: ${data.orbital_period}</p>
                    <p>Diameter: ${data.diameter}</p>
                    <p>Climate: ${data.climate}</p>
                    <p>Gravity: ${data.gravity}</p>
                    <p>Terrain: ${data.terrain}</p>                
                ` 
            });
        }
    }
    
}
function renderSpeciesData(character){
    let detailsContainer = document.querySelector(".planet-details");
    if(speciesCache[character.species]){
            detailsContainer.innerHTML = `
                    <h3>${speciesCache[character.species].name}</h3>
                    <p>Classification: ${speciesCache[character.species].classification}</p>
                    <p>Designation: ${speciesCache[character.species].designation}</p>
                    <p>Average height: ${speciesCache[character.species].average_height}</p>
                    <p>Skin color: ${speciesCache[character.species].skin_colors}</p>
                    <p>Average lifespan: ${speciesCache[character.species].average_lifespan}</p>
                    <p>Language: ${speciesCache[character.species].language}</p>                
                `
    }
    else{
        if(!isLoading){
            detailsContainer.innerHTML = `<div class="loader-planets loadplanets"></div>`;
            isLoading = true
            if(character.species.length > 0){
                let request = fetch(character.species);
                request.then(response => response.json()).then(data =>{
                    speciesCache[character.species] = data
                    isLoading = false
                    detailsContainer.innerHTML = `
                        <h3>${data.name}</h3>
                        <p>Classification: ${data.classification}</p>
                        <p>Designation: ${data.designation}</p>
                        <p>Average height: ${data.average_height}</p>
                        <p>Skin color: ${data.skin_colors}</p>
                        <p>Average lifespan: ${data.average_lifespan}</p>
                        <p>Language: ${data.language}</p>                
                    `
                });
            }
            else{
                isLoading = false;
                detailsContainer.innerHTML = `
                    <p>Probably hooman</p>
                `
            }
        }         
    }    
}


function renderTransportFirstPage(character, transport){
      
    let detailsContainer = document.querySelector(".planet-details");
    let nav = renderNav(character[transport].length, "1");
    let transportDataContainer = document.createElement("div");
    transportDataContainer.setAttribute("class", "transportation");
    if(!isLoading){
        detailsContainer.innerHTML = ""
        detailsContainer.innerHTML += nav; 
    
        if(starshipsCache[character[transport][0]] && transport === "starships"){
            detailsContainer.append(transportDataContainer);           
            renderTransportFromCache(starshipsCache, character, transport,transportDataContainer,0);                      
            transportNavigation(character,transport);
        }
        else if(vehiclesCache[character[transport][0]] && transport === "vehicles"){
            detailsContainer.append(transportDataContainer);
            renderTransportFromCache(vehiclesCache,character,transport,transportDataContainer,0);         
            transportNavigation(character,transport);
        }
        else{
            let nav = renderNav(character[transport].length, "1");
            isLoading = true
            if(character[transport].length > 0){
                let request = fetch(character[transport][0]);
                detailsContainer.append(transportDataContainer);
                transportDataContainer.innerHTML = `<div class="loader-planets loadplanets"></div>`
                request.then(response => response.json()).then(data =>{
                    if(transport === "starships"){                        
                        starshipsCache[character[transport][0]] = data;
                    }
                    else{
                        vehiclesCache[character[transport][0]] = data
                    }
                    isLoading = false;
                    transportDataContainer.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Model: ${data.model}</p>
                    <p>Manufacturer: ${data.manufacturer}</p>
                    <p>Cost: ${data.cost_in_credits}</p>
                    <p>Length: ${data.length}</p>
                    <p>Crew: ${data.crew}</p>
                    <p>Passengers: ${data.passengers}</p>                
                    ` 
                    transportNavigation(character,transport);            
                })
            }   
            else{
                isLoading = false
                detailsContainer.innerHTML = `
                <p>No ${transport} owned </p>
                `
            }
                    
        }
    }   
}

function renderNav(length,currentPage){
    return ` <nav class="paging">
                <button class="previous-1">
                    <img src="images/chevron_left_black_24dp.svg" alt="left-arrow">
                </button>
                <p class="current-page">1</p>
                <p>/</p>
                <p class="total-pages">${length}</p>
                <button class="next-1">
                    <img src="images/chevron_right_black_24dp.svg" alt="right-arrow">
                </button>
            </nav>
        `
}



function transportNavigation(character,fetchObject){
    
    let div = document.querySelector(".transportation");
    let currentPage = document.querySelector(".paging .current-page").innerText;
    let buttons = document.querySelectorAll(".paging button");
    for(let button of buttons){
        button.addEventListener("click", () =>{
            currentPage = document.querySelector(".paging .current-page").innerText;
            if(!isLoading){
                if(button.getAttribute("class") === "previous-1"){
                    if(currentPage > 1){
                        document.querySelector(".paging .current-page").innerText = --currentPage;
                        isLoading = true; 
                        div.innerHTML = `<div class="loader-planets loadplanets"></div>`  
                                                     
                        if(!isCached(div,character,fetchObject,currentPage)){
                            fetchDetails(div,character,fetchObject,currentPage);
                        }            
                    }       
                }
                else{
                    if(currentPage < character[fetchObject].length){
                        document.querySelector(".paging .current-page").innerText = ++currentPage;
                        isLoading = true; 
                        div.innerHTML = `<div class="loader-planets loadplanets"></div>`
                        if(!isCached(div,character, fetchObject,currentPage)){
                            fetchDetails(div,character,fetchObject,currentPage);
                        }
                        
                    }
                }
            } 
        });
    }   
}



function fetchDetails(div,character,fetchObject,currentPage){
    
    let request = fetch(character[fetchObject][currentPage - 1]);

    request.then(response => response.json()).then(data =>{
        if(fetchObject === "starships"){
            starshipsCache[character[fetchObject][currentPage - 1]] = data
        }
        else{
            vehiclesCache[character[fetchObject][currentPage - 1]] = data
        }
        isLoading = false;
            div.innerHTML = `
            <h3>${data.name}</h3>
            <p>Model: ${data.model}</p>
            <p>Manufacturer: ${data.manufacturer}</p>
            <p>Cost: ${data.cost_in_credits}</p>
            <p>Length: ${data.length}</p>
            <p>Crew: ${data.crew}</p>
            <p>Passengers: ${data.passengers}</p>                
            `
    });
}

function renderTransportFromCache(cache, character, transport,div,index){
    div.innerHTML = `
        <h3>${cache[character[transport][index]].name}</h3>
        <p>Model: ${cache[character[transport][index]].model}</p>
        <p>Manufacturer: ${cache[character[transport][index]].manufacturer}</p>
        <p>Cost: ${cache[character[transport][index]].cost_in_credits}</p>
        <p>Length: ${cache[character[transport][index]].length}</p>
        <p>Crew: ${cache[character[transport][index]].crew}</p>
        <p>Passengers: ${cache[character[transport][index]].passengers}</p>                
    `

}

function isCached(div,character,fetchObject,currentPage){
    
    if(character[fetchObject][currentPage - 1] in starshipsCache && fetchObject === "starships"){
        isLoading = false;
        renderTransportFromCache(starshipsCache, character, fetchObject,div,currentPage-1);
        return true;
    }
    else if(character[fetchObject][currentPage - 1] in vehiclesCache && fetchObject === "vehicles"){
        isLoading = false;
        renderTransportFromCache(vehiclesCache, character, fetchObject,div,currentPage-1);
        return true;
    }
    else{
        return false;
    }
}


