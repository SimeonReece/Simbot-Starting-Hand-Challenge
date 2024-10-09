// build a deck of vards, then, shuffle instanceof, and deal a hand.
//card class, deck class 


class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.deck = [];
    }

    createDeck(suits, values) {
        for (let suit of suits) {
            for(let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
        return this.deck;
    }

    shuffle() {
        let counter = this.deck.length, temp, i;

        while(counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }

    //we want to deal a whole 52 deck and give it to the dealer
    deal(){
        let hand = [];
        while(hand.length <2) {
            hand.push(this.deck.pop());
        }
        return hand;
    }
}

let suits = ['hearts', 'diams', 'clubs', 'spades'];
let values = [2,3,4,5,6,7,8,9,'T', 'J', 'Q', 'K', 'A'];

let deck = new Deck();
deck.createDeck(suits, values);
deck.shuffle()
console.log(deck.deal());