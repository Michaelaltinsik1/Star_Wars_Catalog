let test = document.querySelector(".test");
    test.addEventListener("click", () => {
        main();
});  

function main(){
    
        getFirstPage();
        getPages();   
}

function getFirstPage(){
    const request = fetch("https://swapi.dev/api/people/?page=1");
    let characters = document.querySelector(".characters")
    request.then(response => response.json()).then(data =>{
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
        if(currentPage > 1){
            document.querySelector(".current-page").innerText = --currentPage;
            const request = fetch("https://swapi.dev/api/people/?page="+ currentPage);
            let characters = document.querySelector(".characters")
            characters.innerHTML = "";
            request.then(response => response.json()).then(data =>{
            for(let character of data.results){
                let button = document.createElement("button");
                button.innerText = character.name;
                characters.append(button);

            }
            displayCharacters(data.results);
        });
            
            
        }
    });
    nextPage.addEventListener("click", () =>{
        if(currentPage < 9){
            document.querySelector(".current-page").innerText = ++currentPage;
            const request = fetch("https://swapi.dev/api/people/?page="+ currentPage);
            let characters = document.querySelector(".characters")
            characters.innerHTML = "";
            request.then(response => response.json()).then(data =>{
            for(let character of data.results){
                let button = document.createElement("button");
                button.innerText = character.name;
                characters.append(button);
            }
            displayCharacters(data.results);
        });
        
            
        }

    });
}
function displayCharacters(characters){
    let buttons = document.querySelectorAll(".characters button");
    let details = document.querySelector(".person-details");
    for(let button of buttons){
        button.addEventListener("click", () =>{                     
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
                    
                }
            }
        });
    }
}