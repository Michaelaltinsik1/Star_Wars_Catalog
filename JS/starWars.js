// let test = document.querySelector(".test");
//     test.addEventListener("click", () => {
//         main();
// });  
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
        document.querySelector(".loader-characters").classList.add("removeloader")
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
                    /*planetDetails.innerHTML = `<div class="loader-planets loadplanets"></div>`;
                    let loadplanets = document.querySelector(".loader-planets");
                    
                    let request = fetch(character.homeworld);
                    request.then(response => response.json()).then(data =>{
                        planetDetails.innerHTML = `
                        <h3>${data.name}</h3>
                        <p>Rotation period: ${data.rotation_period}</p>
                        <p>Orbital period: ${data.orbital_period}</p>
                        <p>Diameter: ${data.diameter}</p>
                        <p>Climate: ${data.climate}</p>
                        <p>Gravity: ${data.gravity}</p>
                        <p>Terrain: ${data.terrain}</p>                
                    `
                    });*/
                }
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
                        
                    }
                }

            });
            starshipsInfoButton.addEventListener("click",() =>{
                let name = document.querySelector(".person-details h3").innerText;
                
                for(let character of characters){
                    if(character.name === name){
                        
                    }
                }

            });
        });
    }
}

function getPlanetData(character){
    let planetDetails = document.querySelector(".planet-details");
    planetDetails.innerHTML = `<div class="loader-planets loadplanets"></div>`;
    let loadplanets = document.querySelector(".loader-planets");
                    
    let request = fetch(character.homeworld);
    request.then(response => response.json()).then(data =>{
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
function getSpeciesData(character){
    let planetDetails = document.querySelector(".planet-details");
    planetDetails.innerHTML = `<div class="loader-planets loadplanets"></div>`;
    let loadplanets = document.querySelector(".loader-planets");;
    if(character.species.length > 0){
        let request = fetch(character.species);
        request.then(response => response.json()).then(data =>{
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
        planetDetails.innerHTML = `
            <p>Race Not Found </p>
        `
    }                
    
}