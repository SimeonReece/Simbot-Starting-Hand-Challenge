//Cards hidden before pressing button

card1 = document.getElementById('card1');
card1Children = card1.children;
card2 = document.getElementById('card2');
card2Children = card2.children;
displayCards();
//Displaying the card in the html:

function hideHint() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }



  if(localStorage.getItem('counter')=='125'){
    console.log('you got to a 100 hands starting a new round');
    //showScore();
    localStorage.clear();
  }
    



function endGame(){
    var end = new Date().getTime();
    localStorage.setItem('endTime', end);
  } 







//html and css already has symbol and we can have better control with them so we want to 
//do get ride of the images and display html. this will also make this code selfcontained and non dependant

function returnGap(x,y){
//this is where we need to find and use a switch case to set x or y and set the value there then do the 

if(x == 'A'){ x = 14;}
if(x == 'K'){ x = 13;}
if(x == 'Q'){ x = 12;}
if(x == 'J'){ x = 11;}
if(x == 'T'){ x = 10;}

if(y == 'A'){ x = 14;}
if(y == 'K'){ x = 13;}
if(y == 'Q'){ x = 12;}
if(y == 'J'){ x = 11;}
if(y == 'T'){ x = 10;}
if(x > y){
        return x - y
        }else {
        return y - x
        }
    
}

function displayCards(){
    let deck = new Deck();
    deck.createDeck(suits, values);
    deck.shuffle()
    var cards = deck.deal();

   
    

    cardOne = cards[0];
    card1Children[0].src = `img/${visualCard(cardOne)}.png`
    card1Children[1].innerHTML = cardOne.value
    
    cardTwo = cards[1];
    card2Children[0].src = `img/${visualCard(cardTwo)}.png`
    card2Children[1].innerHTML = cardTwo.value
    
 //console.log(cards);
 
 var card1Suit = cardOne.suit;
 var card1Value = cardOne.value;
 var card2Suit = cardTwo.suit;
 var card2Value = cardTwo.value;


//model talk:these are the always hand that is well aboce 50 and represet all of you money in any session missing these hands are missing future #moneyLines


// initialize array
var cardArr = [];
var simAbove50=false
// append multiple values to the array


/*
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
*/


 if(card1Value == card2Value){
   cardArr.push('PocketPairs');
}
 
 
if((Number.isInteger(card1Value) == false || Number.isInteger(card2Value)  == false) && (card1Suit == card2Suit)){
    cardArr.push('Bflush');
 }

 if((returnGap(card1Value,card2Value) <3) && (card1Suit == card2Suit)){
    
    cardArr.push('suitedConnected');
}

//model talk: these are the bottom tear of the always hands that fall in the fold 10% of spots
 if((Number.isInteger(card1Value) == false && Number.isInteger(card2Value)  == false) ){
    cardArr.push('BroadwayBroadway');
 }


//model talk:price must be no more than 3-5 bb for 6 its a neutral sometime spot based on how you feel but if done over 90% then you will fail 

if( (Number.isInteger(card1Value) == false || Number.isInteger(card2Value)  == false) && (card1Value || card2Value > 8) && (returnGap(card1Value,card2Value) <5)){
    cardArr.push('pEvStr8');
 }
 
 if((card1Value == 'A' || card2Value == 'A') && (card1Value || card2Value <=4 )){
    cardArr.push('wheel/nutStr8/S2pair');
 }


//model talk:These are the situation and price must be write with. better playeed polarized to aviod reverse spots

 if( (Number.isInteger(card1Value) == false || Number.isInteger(card2Value)  == false) && (card1Value || card2Value > 7) && (returnGap(card1Value,card2Value) <=3)){
    cardArr.push('mEvStr8');
 }

//model talk:everything above this should aim to limp,call or add more money in the spot looking to be sticky where you can at all times 
 if((returnGap(card1Value,card2Value) >=3) && (card1Suit == card2Suit) && (returnGap(card1Value,card2Value) <=5)){
    cardArr.push('WeaksuitedConnected');
 }

 //model talk:unplayable in most spots
 if(card1Suit == card2Suit){
    cardArr.push('suited');
 }

 if((returnGap(card1Value,card2Value) <=3) ){
    cardArr.push('connected');
 }

 if( (Number.isInteger(card1Value) == false || Number.isInteger(card2Value)  == false) && (returnGap(card1Value,card2Value) <=4)){
    cardArr.push('SbroadwayKicker');
 }


 if( Number.isInteger(card1Value) == false || Number.isInteger(card2Value)  == false){
    cardArr.push('broadway');
 }


 //not just being suited isnt enough there are some flushes that are not a part of out game


 /*this is the logic to set the game */
//console.log(cardArr);
if (cardArr.includes("PocketPairs") || cardArr.includes("Bflush")  || cardArr.includes("suitedConnected")  || cardArr.includes("BroadwayBroadway")  || cardArr.includes('pEvStr8')){
    localStorage.setItem('answer', 'true');
}else if (cardArr.includes('wheel/nutStr8/S2pair') && cardArr.includes('broadway')){
    localStorage.setItem('answer', 'true');
}else{
    localStorage.setItem('answer', 'false');
}

//add more here



var yesCheckbox = document.querySelector("input[name=yes]");
yesCheckbox.addEventListener( 'change', function() {
    if(this.checked) {
        answer=yesCheckbox.value;
        localStorage.setItem('uAnswer', answer);
        if (answer==localStorage.getItem("answer")){
            console.log("%c CORRECT:the answer is true","color:green");
            newCounter=Number(localStorage.getItem('correct'))+1;
            localStorage.setItem('correct', newCounter);

        }else{
            console.log("%c WRONG:the answer is false","color:red");
            newCounter=Number(localStorage.getItem('wrong'))+1;
            localStorage.setItem('wrong', newCounter);
        }
        localStorage.removeItem('answer');
        localStorage.removeItem('uAnswer');
        displayCards();
        //you might want to place a delay or prompt them
        yesCheckbox.checked=false;
        newCounter=Number(localStorage.getItem('counter'))+1;
        localStorage.setItem('counter', newCounter)
    } 
 
});

var NoCheckbox = document.querySelector("input[name=no]");
NoCheckbox.addEventListener( 'change', function() {
    if(this.checked) {
        answer=NoCheckbox.value;
        localStorage.setItem('uAnswer', answer);
        if (answer==localStorage.getItem("answer")){
            console.log("%c CORRECT:the answer is false","color:green");
            newCounter=Number(localStorage.getItem('correct'))+1;
            localStorage.setItem('correct', newCounter);
    }else{
        console.log("%c WRONG:the answer is true","color:red");
        newCounter=Number(localStorage.getItem('wrong'))+1;
        localStorage.setItem('wrong', newCounter);

    }
        localStorage.removeItem('answer');
        localStorage.removeItem('uAnswer');
        displayCards();
        //you might want to place a delay or prompt them
        NoCheckbox.checked=false;
        newCounter=Number(localStorage.getItem('counter'))+1;
        localStorage.setItem('counter', newCounter);

    } 

});





    //well store these value and read them over time we wont run out becuase we use the answe as ram and not persistenet mem

function visualCard(card) { 
    switch(card.suit){
        case "hearts":
            return("heart");
        case "diams":
            return("diam");
        case "clubs":
            return("club");
        case "spades":
            return("spade");    }
}

}

//the best version of object creation 
/*
let personFactory = (function() { 
        let personPrototype = {
                    greet: function(person) { 
                            return "Hello, " + person.firstName;
                    }
                };
 
                return function(firstName, lastName){
                    let person = Object.create(personPrototype, {
                        firstName: {writable:false,value: firstName},
                        lastName: {writable:false,value: firstName}
                    });
                    return person; 
            };
})();

let johnDoe = personFactory("john", "doe");
let janeSmith = personFactory("jane", "smith");

console.log("this is the same ? " +johnDoe.greet === janeSmith.greet);
console.log(johnDoe.greet(janeSmith));



//second best version based on what we are attempting to do 
let personPrototype = {
    greet: function(person) { 
    return "Hello, " + person.firstName;
    }
};

function personFactory(firstName, lastName){
        let person = Object.create(personPrototype, {
        firstName: {writable:false,value: firstName},
        lastName: {writable:false,value: firstName}
        });
        return person; 
}

let johnDoe = personFactory("john", "doe");
let janeSmith = personFactory("jane", "smith");

console.log(johnDoe.greet === janeSmith.greet);
console.log(johnDoe.greet(janeSmith));

*/
//that memery hungry verson of object creation 

/*
function personFactory(firstName, lastName){
    return {
        firstName,
        lastName,
        greet: function(person){
            return "Hello, " + person.firstName;
        }
    };
}

let johnDoe = personFactory("John", "Doe");
let janeSmith = personFactory("jane", "Smith");

console.log(johnDoe.greet === janeSmith.greet);

*/


