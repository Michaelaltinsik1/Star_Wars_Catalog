let isLoading = false;

function main(){
    
        getFirstPage();
        getPages();  
}
main()

function getFirstPage(){
    const request = fetch("https://swapi.dev/api/people/?page=1");
    let characters = document.querySelector(".characters")
    request.then(response => response.json()).then(data =>{
        document.querySelector(".loader-characters").classList.add("removeloader");
        for(let character of data.results){
            let button = document.createElement("button");
            button.innerText = character.name;
            characters.append(button);
        }
        displayCharacters(data.results);
    });
}

function getPages(){
    let previousPage = document.querySelector(".previous");
    let nextPage = document.querySelector(".next");
    let currentPage = Number(document.querySelector(".current-page").innerText);
    console.log(currentPage);
   
    previousPage.addEventListener("click", () => {
        if(!isLoading){
            if(currentPage > 1){
                document.querySelector(".loader-characters").classList.remove("removeloader");
                document.querySelector(".current-page").innerText = --currentPage;
                isLoading = true;
                const request = fetch("https://swapi.dev/api/people/?page="+ currentPage);
                let characters = document.querySelector(".characters")
                characters.innerHTML = "";
                request.then(response => response.json()).then(data =>{
                    isLoading = false;
                    document.querySelector(".loader-characters").classList.add("removeloader")
                    for(let character of data.results){
                        let button = document.createElement("button");
                        button.innerText = character.name;
                        characters.append(button);         
    
                    }
                    displayCharacters(data.results);
                });
                
                
            }
        }   
    
    });
    nextPage.addEventListener("click", () =>{
        if(!isLoading){
            if(currentPage < 9){
                document.querySelector(".loader-characters").classList.remove("removeloader");
                document.querySelector(".current-page").innerText = ++currentPage;
                isLoading = true;
                const request = fetch("https://swapi.dev/api/people/?page="+ currentPage);
            
                let characters = document.querySelector(".characters")
                characters.innerHTML = "";
                request.then(response => response.json())
                
                .then(data =>{
                    isLoading = false
                    document.querySelector(".loader-characters").classList.add("removeloader")
                    for(let character of data.results){
                        let button = document.createElement("button");
                        button.innerText = character.name;
                        characters.append(button);
                        }
                    displayCharacters(data.results);
                });
        }
        
            
        }

    });
}
function displayCharacters(characters){

    let buttons = document.querySelectorAll(".characters button");
    let details = document.querySelector(".person-details");
    let detailsNav = document.querySelector(".details-nav");
    let planetInfoButton = document.querySelector(".details-nav button:nth-of-type(1)");
    let speciesInfoButton = document.querySelector(".details-nav button:nth-of-type(2)");
    let vehiclesInfoButton = document.querySelector(".details-nav button:nth-of-type(3)");
    let starshipsInfoButton = document.querySelector(".details-nav button:nth-of-type(4)");
    
    for(let button of buttons){
        button.addEventListener("click", () =>{ 
            planetInfoButton.setAttribute("class", "show");
            speciesInfoButton.setAttribute("class", "show");
            vehiclesInfoButton.setAttribute("class", "show");
            starshipsInfoButton.setAttribute("class", "show");
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
                    getPlanetData(character);
                }
            }
            
        });
    }
    planetInfoButton.addEventListener("click", ()=> {
        let name = document.querySelector(".person-details h3").innerText;
        
        for(let character of characters){
            if(character.name === name){
                getPlanetData(character);
            }
        }
    });
    speciesInfoButton.addEventListener("click",() =>{
        let name = document.querySelector(".person-details h3").innerText;
        
        for(let character of characters){
            if(character.name === name){
                getSpeciesData(character);
            }
        }

    });
    vehiclesInfoButton.addEventListener("click",() =>{
        let name = document.querySelector(".person-details h3").innerText;
        
        for(let character of characters){
            if(character.name === name){
                getData(character, "vehicles");
            }
        }

    });
    starshipsInfoButton.addEventListener("click",() =>{
        let name = document.querySelector(".person-details h3").innerText;
        
        for(let character of characters){
            if(character.name === name){
                getData(character, "starships");
            }
        }

    });
}

function getPlanetData(character){
    if(!isLoading){
        let planetDetails = document.querySelector(".planet-details");
        planetDetails.innerHTML = `<div class="loader-planets loadplanets"></div>`;
        isLoading = true               
        let request = fetch(character.homeworld);
        request.then(response => response.json()).then(data =>{
            isLoading = false
        planetDetails.innerHTML = `
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
function getSpeciesData(character){
     if(!isLoading){
        let planetDetails = document.querySelector(".planet-details");
        planetDetails.innerHTML = `<div class="loader-planets loadplanets"></div>`;
        isLoading = true
        if(character.species.length > 0){
            let request = fetch(character.species);
            request.then(response => response.json()).then(data =>{
                isLoading = false
                planetDetails.innerHTML = `
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
            planetDetails.innerHTML = `
                <p>Probably hooman</p>
            `
        }
    }                
    
}

function getNav(length,currentPage){
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
function getData(character, transport){
    if(!isLoading){
    let nav = getNav(character[transport].length, "1");
        let planetDetails = document.querySelector(".planet-details");
        planetDetails.innerHTML = ""
        planetDetails.innerHTML += nav; 
        isLoading = true
        if(character[transport].length > 0){
         
            let request = fetch(character[transport][0]);
        
                let div3 = document.createElement("div");
                div3.setAttribute("class", "transportation");
                planetDetails.append(div3);
                div3.innerHTML = `<div class="loader-planets loadplanets"></div>`
                request.then(response => response.json()).then(data =>{
                    isLoading = false;
                    div3.innerHTML = `
                        <h3>${data.name}</h3>
                        <p>Model: ${data.model}</p>
                        <p>Manufacturer: ${data.manufacturer}</p>
                        <p>Cost: ${data.cost_in_credits}</p>
                        <p>Length: ${data.length}</p>
                        <p>Crew: ${data.crew}</p>
                        <p>Passengers: ${data.passengers}</p>                
                    ` 
                
                    detailsNavigation(character,transport);            
                })
        }   
        else{
            isLoading = false
            planetDetails.innerHTML = `
                <p>No ${transport} owned </p>
            `
        }
    }
}

function detailsNavigation(character,fetchObject){
    console.log(character[fetchObject].length);
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
                        fetchDetails(div,character,currentPage,fetchObject);             
                    }       
                }
                else{
                    if(currentPage < character[fetchObject].length){
                        document.querySelector(".paging .current-page").innerText = ++currentPage;
                        isLoading = true; 
                        div.innerHTML = `<div class="loader-planets loadplanets"></div>`
                        fetchDetails(div,character,currentPage,fetchObject);
                    }
                }
            } 
        });
    }   
}

function fetchDetails(div,character,currentPage,fetchObject){
    let request = fetch(character[fetchObject][currentPage - 1]);
    request.then(response => response.json()).then(data =>{
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


