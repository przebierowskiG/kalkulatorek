
//pobieranie elementów

const currentNumber = document.querySelector(".currentNumber");         //<--- Liczba wpisywana na ekran

const previousNumber = document.querySelector(".previousNumber p");     //<---Liczba na której wykonuje działanie

const mathSign = document.querySelector(".mathSign");                   //<--- Znak matematyczny

const numbersButtons = document.querySelectorAll(".number");            //<--- Liczby-przyciski

const operatorsButtons = document.querySelectorAll(".operator");        //<---Operatory przyciski

const equalButton = document.querySelector(".equals");                  //<--- Znak równości

const clearButton = document.querySelector(".clear");                   //<---Przycisk C

const calculatorHistory = document.querySelector(".history");           //<---Historia kalkulatora

const historyBtn = document.querySelector(".history-btn");              //<--- Przycisk do czyszczenia historii

let result = "";                                                        //<--- Zmienna do przechowywania wyniku


/// FUNKCJE ///


function displayNumbers() { //<---wyświetlanie liczb
        if (this.textContent ==="." && currentNumber.innerHTML.includes(".")) return; //jeśli klikam kropkę i liczba już zawiera kropkę - nic nie rób
        if (this.textContent ==="." && currentNumber.innerHTML === "") return currentNumber.innerHTML = ".0" //klikam najpierw kropkę i nie ma liczby - zwróć liczbę poprzedzoną kropką
            currentNumber.innerHTML += this.textContent; // dopisz do innerHTML
}

function operate(){ //<--- wykonywanie działań
        if (currentNumber.innerHTML === "0" && this.textContent === "-"){   //brak liczby i klikniecie minusa ma działać jako ujemne liczby
            currentNumber.innerHTML = "-";                                  //wstawia tego minuska do wyświetlacza
            return;
        }
        else if (currentNumber.innerHTML === ""){ //jeśli current number pusty - zwracaj - nie pozwalaj wyświetlać innych operatorów niż (-)
            return;
        }
        if(mathSign.innerHTML !== ""){ //oblicza działanie po PONOWNYM kliknięciu znaku matematycznego 
            showResult()
        }
        previousNumber.innerHTML = currentNumber.innerHTML; 
        mathSign.innerHTML = this.textContent;
        currentNumber.innerHTML = "";
}

function showResult(){ //<--- pokazywanie wyniku
        if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "") return; //brak drugiej liczby nie wykona działania!

        let a = Number(currentNumber.innerHTML);        //przypisanie do skrócenia kodu (tylko w tym SCOPE!)
        let b = Number(previousNumber.innerHTML);       //przypisanie do skrócenia kodu (tylko w tym SCOPE!)
        let operator = mathSign.innerHTML               //przypisanie do skrócenia kodu (tylko w tym SCOPE!)

        switch(operator) {
            case "+":           //co wykonuje (+) dodaj dwie liczny
                result = a+b;
                break
            case "-":           //co wykonuje (-) odejmij dwie liczby
                result = b-a;
                break;
            case "x":           //co wykonuje (*) przemnóż dwie liczby
                result = a*b;
                break;
            case ":":           //co wykonuje (/) podziel dwie liczby
                result = b/a;
                break;
            case "2^":          //co wykonuje potęgowanie
                result = b**a;
                break;

        }
        addToHistory(); //co się dzieje w dodawaniu do historii (gdy działanie skończone)
        historyBtn.classList.add("active"); // dodanie do historii działań aktywuje przycisk czyszczenia
        currentNumber.innerHTML = result;   
        previousNumber.innerHTML = "";
        mathSign.innerHTML = "";

}

function addToHistory(){ //<--- dodawanie do historii
        const newHistoryItem = document.createElement("li"); //dodaj nowy element do listy "li"
        newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}` //co wrzuca w historię
        newHistoryItem.classList.add("history-item"); //nadawanie klasy "history-item" po stworzeniu li
        calculatorHistory.appendChild(newHistoryItem); //
}

function clearScreen(){ //<--- czyszczenie ekranu kalk
        result = ""; //pusty kasuje ekranik
        currentNumber.innerHTML = ""; //obecna liczba i  kasuje ekranik
        previousNumber.innerHTML = ""; //poprzednia liczba i kasuje ekranik
        mathSign.innerHTML = ""; //znak działania i kasuje ekranik


}

function clearHistory(){ //<--- dodawanie działań do historii
        calculatorHistory.textContent= "";
        if (calculatorHistory.textContent === ""){ // jeśli wyczyszczona historia to usuwa przycisk "remove"
            historyBtn.classList.remove("active");
        }
}

//nasłuchiwanie przyecisków

operatorsButtons.forEach((button) => button.addEventListener("click", operate)); //<---nasłuchuje przyciski wszystkie na kliknięcie - wyk działanie

equalButton.addEventListener("click", showResult);                               //<--- nasłuchuje znak równości na klik - pokaż wynik

clearButton.addEventListener("click", clearScreen);                             //<--- nsłuchuje przycisk czyszczący klik - czyść

numbersButtons.forEach((button)=> {                                             //<--- nasłuchuje przyciski liczb kliknięcie - wyświetla
    button.addEventListener("click", displayNumbers)
})

historyBtn.addEventListener("click", clearHistory);                             //<---nasłuch czyszczenie historii - klik wyczyść historię


