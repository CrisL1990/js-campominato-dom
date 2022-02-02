//Aquisisce il div con id playGroundContainer da HTML
let playGround = document.getElementById("playGroundContainer");

//Contiene il valore della selezione della difficoltà
let selection = "Easy";

//Crea riferimento al button
let optn = document.getElementById('startGame');

let start = document.getElementById('inizioPartita');

const BOMB_NUMBER = 16;

//Crea event listener del click su pulsante Play
optn.addEventListener('click', function(){

    playGround.classList.remove('dNone');
    start.classList.add('dNone');
    start.classList.remove('dFlex');

    //Aquisisce la selezione della difficoltà da html
    selection = document.getElementById("Difficult").value;

    //Crea variabile cells e la setta di default a Easy
    let cells = "Easy";

    //Resetta griglia campo di gioco
    resetPlayground();
    
   //Seleziona livello di difficoltà
    if(selection == "Easy"){
        cells = 100;
    }
    else if(selection == "Medium"){
        cells = 81;
    }
    else if(selection == "Hard"){
        cells = 49;
    }

    //Si riferisce alla funzione che crea la lista delle bombe
    let bombsPosition = bombNumbers();

    //Contiene i numeri celle celle cliccate prima di trovare la bomba
    let clickedCells = [];

    //Gestisce le istruzuini da eseguire al momento del click sulla cella
    //Poi toglie event listener da cella cliccata
    //Se la bomba non c'è colora la cella di blu e inserisce il numero della cella in clickedCells
    //Altrimenti lancia la funzione terminaGioco
    function clicked(){
        let boxContent = parseInt(this.innerHTML);
        if(bombsPosition.includes(boxContent) || clickedCells.length == cells - BOMB_NUMBER -1){
            terminaGioco();  
            console.log(clickedCells);
        }
        else{
            this.classList.add("bkgBlue");
            clickedCells.push(boxContent);       
        } 
        this.removeEventListener('click', clicked);
    }

    //Questa funzione toglie gli event listener da tutte le caselle una volta trovata la bomba
    //Poi assegna la classe bkgRed alle bombe in modo che lo sfondo sia rosso
    function terminaGioco(){

        let bomba = document.getElementsByClassName("box");
        
        for(let i = 0; i < bomba.length; i++){
            if(bombsPosition.includes(parseInt(bomba[i].innerText))){
                bomba[i].classList.add("bkgRed")
            }

            bomba[i].removeEventListener('click', clicked);
        }
        
        let tentativi = clickedCells.length;
        let message = document.createElement("div");
        message.classList.add("endGame");

        if(clickedCells.length == cells - BOMB_NUMBER -1){
            message.innerHTML="Hai vinto";
        }
        else{
            message.innerHTML="Hai effettuato " + tentativi + " tentativi";
        }
        console.log(message);
        playGround.appendChild(message)
       
        
    }

    //Questa Funzione crea la singola cella e ne assegna la classe box
    const createBox = () => {
    //Crea il div della singola casella
        const box = document.createElement("div");  
        box.addEventListener('click', clicked) 
        //Aggiunge classe "box" a box
        box.classList.add('box');
        //Ritorna il div box con classe box
        return box
    }

    //Crea griglie nel campo di gioco
    playGroundMaker(cells);

    //Funzione che crea un array di 16 numeri unici e casuali compresi tra 1 e cells
    function bombNumbers(){
        let bombList = [];
        let number = randomNumber(1, cells);
        for(let i = 0; i < BOMB_NUMBER; i++){
            if(bombList.includes(number)){
                number = randomNumber(1, cells);
                i--;
            }
            else{
                bombList.push(parseInt(number));
            }        
        }
        return bombList;   
    }

    console.log(bombsPosition);

    //Questa funzione aquisisce il numero di celle da creare come parametro e inserisce al suo interno il numero
    //Cambia colore di sfondo alla cella quando viene cliccata
    //In base al numero di celle passate come parametro ne modifica la dimensione
    function playGroundMaker(cellsNumber){
        for(let i = 1; i <= cellsNumber; i++){
            const box = createBox();
            box.innerText = parseInt(i);
            
            if(cellsNumber == 100){
                box.classList.add('game100');
                box.classList.remove('game81');
                box.classList.remove('game49');
            }

            else if(cellsNumber == 81){
                box.classList.remove('game100');
                box.classList.add('game81');
                box.classList.remove('game49');
            }

            else if(cellsNumber == 49){
                box.classList.remove('game100');
                box.classList.remove('game81');
                box.classList.add('game49');
            }
            
            playGround.appendChild(box);
        }
    }

    //Questa funzione riporta il plauyground alla condizione di partenza con 0 celle al suo interno
    function resetPlayground(){
        let playGroundReset = document.getElementById("playGroundContainer").innerHTML = '';
        return playGroundReset
    }

    //Ritorna numero di celle
    return cells
})

//Questa funzione genera un numero intero randomico compreso tra min e max
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


